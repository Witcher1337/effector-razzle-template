import cookies from "cookie-parser";
import { fork, serialize, allSettled } from "effector";
import { Provider } from "effector-react/scope";
import express from "express";
import mustache from "mustache";
import ReactDOM from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { CacheConfig } from 'shared/configs/cache';

import { serverStarted } from "shared/libs/effector-ssr-routing/effector";
import { ApplicationAssets } from 'shared/libs/effector-ssr-routing/types';

import { Application } from "./application";
import { mustacheTemplate } from "./application/template.mustache";

export const server = express();

const assets: ApplicationAssets = require(process.env.RAZZLE_ASSETS_MANIFEST!);

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
      maxAge: CacheConfig.time.inlimited,
    });

    response.send(html);
  });
