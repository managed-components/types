import Cookies from "cookies";
import { Request, Response } from "express";

interface ComponentSettings {
  [key: string]: any;
}

interface ClientSetOptions {
  scope?: "page" | "session" | "infinite";
  expiry?: Date | number | null;
}

type ComponentConfig = [string, ComponentSettings];

type EmbedCallback = (context: {
  parameters: { [k: string]: unknown };
  client: ClientGeneric;
}) => any;

type WidgetCallback = (context: { client: ClientGeneric }) => any;

declare abstract class MCEvent extends Event {
  name?: string;
  payload: any;
  client: Client;
  type: string;

  constructor(type: string, req: Request);
}

export interface MCEventListener {
  (event: MCEvent): void;
}

declare abstract class ManagerGeneric {
  components: (string | ComponentConfig)[];
  trackPath: string;
  name: string;
  ecommerceEventsPath: string;
  clientEventsPath: string;
  requiredSnippets: string[];
  mappedEndpoints: {
    [k: string]: (request: Request) => Response;
  };
  proxiedEndpoints: {
    [k: string]: {
      [k: string]: string;
    };
  };
  staticFiles: {
    [k: string]: string;
  };
  listeners: {
    [k: string]: {
      [k: string]: MCEventListener[];
    };
  };
  clientListeners: {
    [k: string]: MCEventListener;
  };
  registeredEmbeds: {
    [k: string]: EmbedCallback;
  };
  registeredWidgets: WidgetCallback[];

  constructor(Context: {
    components: (string | ComponentConfig)[];
    trackPath: string;
    clientEventsPath: string;
    ecommerceEventsPath: string;
  });
}

export class Manager {
  #generic: ManagerGeneric;
  #component: string;
  name: string;

  constructor(component: string, generic: ManagerGeneric);
  addEventListener(type: string, callback: MCEventListener): void;
  createEventListener(type: string, callback: MCEventListener): void;
  get(key: string): string;
  set(key: string, value: any): void;
  route(path: string, callback: (request: Request) => Response): string;
  proxy(path: string, target: string): string;
  serve(path: string, target: string): string;
  useCache(key: string, callback: Function, expiry?: number): any;
  invalidateCache(key: string): void;
  registerEmbed(name: string, callback: EmbedCallback): void;
  registerWidget(callback: WidgetCallback): void;
}

declare abstract class ClientGeneric {
  type: string;
  title?: string;
  timestamp?: number;
  offset?: number;
  request: Request;
  response: Response;
  manager: ManagerGeneric;
  url: URL;
  cookies: Cookies;
  pendingVariables: { [k: string]: string };
  pageVars: { [k: string]: string };
  webcmPrefs: {
    listeners: {
      [k: string]: string[];
    };
  };
  constructor(request: Request, response: Response, manager: ManagerGeneric);
  fetch(resource: string, settings?: RequestInit): void;
  execute(code: string): void;
  return(value: unknown): void;
  set(key: string, value?: string | null, opts?: ClientSetOptions): void;
  get(key: string): string;
  attachEvent(component: string, event: string): void;
}

declare abstract class Client {
  emitter: string;
  userAgent: string;
  language: string;
  referer: string;
  ip: string;
  title?: string;
  timestamp?: number;
  url: URL;

  constructor(component: string, generic: ClientGeneric);
  fetch(resource: string, settings?: RequestInit): void;
  execute(code: string): void;
  return(value: unknown): void;
  set(key: string, value?: string | null, opts?: ClientSetOptions): void;
  get(key: string): string;
  attachEvent(event: string): void;
}
