import { Request, Response } from "express";

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
