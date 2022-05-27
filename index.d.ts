export interface ComponentSettings {
  [key: string]: any;
}

export interface ClientSetOptions {
  readonly scope?: "page" | "session" | "infinite";
  readonly expiry?: Date | number | null;
}

type EmbedCallback = (context: {
  parameters: { [k: string]: unknown };
}) => Promise<string>;

type WidgetCallback = () => Promise<string>;

export interface MCEvent extends Event {
  readonly name?: string;
  readonly payload: any;
  client: Client;
  readonly type: string;
}

export interface MCEventListener {
  (event: MCEvent): void;
}

export interface Manager {
  readonly name: string;

  addEventListener(type: string, callback: MCEventListener): void;
  createEventListener(type: string, callback: MCEventListener): void;
  get(key: string): string;
  set(key: string, value: any): void;
  route(path: string, callback: (request: Request | any) => Response): string;
  proxy(path: string, target: string): string;
  serve(path: string, target: string): string;
  useCache(key: string, callback: Function, expiry?: number): any;
  invalidateCache(key: string): void;
  registerEmbed(name: string, callback: EmbedCallback): void;
  registerWidget(callback: WidgetCallback): void;
}

export interface Client {
  readonly emitter: string;
  readonly userAgent: string;
  readonly language: string;
  readonly referer: string;
  readonly ip: string;
  readonly title?: string;
  readonly timestamp?: number;
  readonly url: URL;

  fetch(resource: string, settings?: RequestInit): void;
  execute(code: string): void;
  return(value: unknown): void;
  set(key: string, value?: string | null, opts?: ClientSetOptions): void;
  get(key: string): string;
  attachEvent(event: string): void;
}
