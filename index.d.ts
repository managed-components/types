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
}) => Promise<string>;

type WidgetCallback = () => Promise<string>;

declare abstract class MCEvent extends Event {
  name?: string;
  payload: any;
  client: Client;
  type: string;
}

export interface MCEventListener {
  (event: MCEvent): void;
}

export class Manager {
  name: string;

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

declare abstract class Client {
  emitter: string;
  userAgent: string;
  language: string;
  referer: string;
  ip: string;
  title?: string;
  timestamp?: number;
  url: URL;

  fetch(resource: string, settings?: RequestInit): void;
  execute(code: string): void;
  return(value: unknown): void;
  set(key: string, value?: string | null, opts?: ClientSetOptions): void;
  get(key: string): string;
  attachEvent(event: string): void;
}
