import express from "express";

let app = require("./server").server;

if (module.hot) {
  module.hot.accept("./server", () => {
    console.info("🔁  HMR Reloading ./server...");

    try {
      app = require("./server").server;
    } catch (error) {
      console.error(error);
    }
  });

  console.info("✅  HMR Enabled!");
}

const PORT = Number(process.env.PORT) ?? 5000;

const server = express();

server
  .disable("x-powered-by")
  .use((request, response) => app.handle(request, response))
  .listen(PORT, () => {
    console.info(`✅  Started on port ${PORT}`);
  });

export default server;
