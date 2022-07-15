import express, {Request, Response} from "express";
import ReactDOM from "react-dom/server";
import mustache from "mustache";
import cookies from "cookie-parser";
import {createEvent, Event, forward, fork, serialize, allSettled} from "effector";

import {Application} from "./application";
import  {mustacheTemplate} from "./application/template.mustache";
import {StaticRouter} from 'react-router-dom/server';
import {CacheConfig} from './shared/configs/cache';
import {getStart, StartEvent} from 'shared/libs/page-routing';
import {routes} from 'pages/routes';
import {RouteMatch, matchRoutes} from 'react-router-dom';
import {Provider} from 'effector-react/scope';

export type ServerStarted = {
  request: Request;
  response: Response;
};

export type ApplicationAssets = {
  client: {
    css?: string;
    js?: string;
  };
};

export const server = express();

const assets: ApplicationAssets = require(process.env.RAZZLE_ASSETS_MANIFEST!);

const lookupStartEvent = (match: RouteMatch) => {
  if (!match.route.element) return

  return getStart(match.route.element);

}

function routeWithEvent(event: Event<StartEvent>) {
  return function (route: RouteMatch) {
    return lookupStartEvent(route) === event;
  };
}

const serverStarted = createEvent<ServerStarted>();
const pathRequested = serverStarted.map((server) => server.request);

const pathsMatched = pathRequested.map(({protocol, hostname, url, originalUrl}) => {
  const path = `${protocol}://${hostname}${originalUrl}`;

  return {
    routes: matchRoutes(routes, url)?.filter(lookupStartEvent) || [],
    query: Object.fromEntries(new URL(path).searchParams),
  };
});

for (const route of routes) {
  const startPageEvent = getStart(route.element);

  if (!startPageEvent) continue;

  const matchedRoute = pathsMatched.filterMap(({routes, query}) => {
    const route = routes.find(routeWithEvent(startPageEvent));

    if (route) {
      return {
        route,
        query,
      };
    }
  });

  forward({
    from: matchedRoute.map(({route, query}) => ({
      path: route.pathname,
      params: route.params,
      query,
    })),
    to: startPageEvent,
  });
}


server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .use(cookies())
  .get("/*", async (request, response) => {
    const values = new Map();
    const scope = fork({
      values,
    });

    try {
      await allSettled(serverStarted, {
        scope,
        params: {
          request,
          response,
        },
      });
    } catch (error) {
      console.error(error);
    }

    const application = (
      <StaticRouter location={request.url}>
        <Provider value={scope}>
          <Application />
        </Provider>
      </StaticRouter>
    );


    const html = mustache.render(mustacheTemplate, {
      markup: ReactDOM.renderToString(application),
      initialState: JSON.stringify(serialize(scope)),
      title: "Title",
      assets: assets.client,
    });

    response.cookie("entry-path", request.path, {
      maxAge: CacheConfig.time.unlimited,
    });

    response.send(html);
  });

  