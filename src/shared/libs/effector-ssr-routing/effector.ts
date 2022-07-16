import { createEvent, Event, forward } from "effector";
import { matchRoutes, RouteMatch } from "react-router-dom";

import { routes } from "pages/routes";
import { getStart, StartEvent } from "shared/libs/page-routing";

import { ServerStarted } from "./types";

const serverStarted = createEvent<ServerStarted>();

const lookupStartEvent = (match: RouteMatch) => {
  if (!match.route.element) return;

  return getStart(match.route.element);
};

function routeWithEvent(event: Event<StartEvent>) {
  return function (route: RouteMatch) {
    return lookupStartEvent(route) === event;
  };
}

const pathRequested = serverStarted.map((server) => server.request);

const pathsMatched = pathRequested.map(({ protocol, hostname, url, originalUrl }) => {
  const path = `${protocol}://${hostname}${originalUrl}`;

  return {
    routes: matchRoutes(routes, url)?.filter(lookupStartEvent) || [],
    query: Object.fromEntries(new URL(path).searchParams),
  };
});

for (const route of routes) {
  const startPageEvent = getStart(route.element);

  if (!startPageEvent) continue;

  const matchedRoute = pathsMatched.filterMap(({ routes, query }) => {
    const route = routes.find(routeWithEvent(startPageEvent));

    if (route) {
      return {
        route,
        query,
      };
    }
  });

  forward({
    from: matchedRoute.map(({ route, query }) => ({
      path: route.pathname,
      params: route.params,
      query,
    })),
    to: startPageEvent,
  });
}

export { serverStarted };
