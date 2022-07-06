interface ComponentSettings {
  [key: string]: any
}

interface ClientSetOptions {
  readonly scope?: 'page' | 'session' | 'infinite'
  readonly expiry?: Date | number | null
}

type EmbedCallback = (context: {
  parameters: { [k: string]: unknown }
}) => Promise<string>

type WidgetCallback = () => Promise<string>

interface MCEvent extends Event {
  readonly name?: string
  readonly payload: any
  client: Client
  readonly type: string
}

interface MCEventListener {
  (event: MCEvent): void
}

type ManagerEventType = 'clientcreated' | 'pageview' | 'ecommerce' | 'event'

type ClientEventType =
  | 'mouseup'
  | 'mousedown'
  | 'mousemove'
  | 'visiblityChange'
  | 'historyChange'
  | 'pageHide'
  | 'pageShow'
  | 'resize'
  | 'scroll'
  | 'resourcePerformanceEntry'

interface Manager {
  readonly name: string

  addEventListener(
    type: ManagerEventType,
    callback: MCEventListener
  ): boolean | undefined
  createEventListener(
    type: ClientEventType,
    callback: MCEventListener
  ): boolean | undefined
  get(key: string): string | undefined
  set(key: string, value: any): boolean | undefined
  route(
    path: string,
    callback: (request: Request | any) => Response
  ): string | undefined
  proxy(path: string, target: string): string | undefined
  serve(path: string, target: string): string | undefined
  useCache(key: string, callback: Function, expiry?: number): any
  invalidateCache(key: string): boolean | undefined
  registerEmbed(name: string, callback: EmbedCallback): boolean | undefined
  registerWidget(callback: WidgetCallback): boolean | undefined
}

interface Client {
  readonly emitter: string
  readonly userAgent: string
  readonly language: string
  readonly referer: string
  readonly ip: string
  readonly title?: string
  readonly timestamp?: number
  readonly url: URL

  fetch(resource: string, settings?: RequestInit): boolean | undefined
  execute(code: string): boolean | undefined
  return(value: unknown): void
  set(
    key: string,
    value?: string | null,
    opts?: ClientSetOptions
  ): boolean | undefined
  get(key: string): string | undefined
  attachEvent(event: ClientEventType): void
  detachEvent(event: ClientEventType): void
}

export {
  ComponentSettings,
  ClientSetOptions,
  EmbedCallback,
  WidgetCallback,
  MCEvent,
  MCEventListener,
  Manager,
  Client,
}
