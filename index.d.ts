interface ComponentSettings {
  [key: string]: any
}

interface ClientSetOptions {
  readonly scope?: 'page' | 'session' | 'infinite'
  readonly expiry?: Date | number | null
}

type EmbedCallback = (context: {
  parameters: { [k: string]: unknown }
  client: Client
}) => Promise<string>

type WidgetCallback = (context: { client: Client }) => Promise<string>

interface MCEvent {
  readonly name?: string
  readonly payload: any
  client: Client
  readonly type: string
}

interface MCEventListener {
  (event: MCEvent): void | Promise<void>
}

type ManagerEventType =
  | 'clientcreated'
  | 'pageview'
  | 'ecommerce'
  | 'event'
  | string

type ClientEventType =
  | 'mouseup'
  | 'mousedown'
  | 'mousemove'
  | 'visibilityChange'
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
  get(key: string): Promise<any>
  set(key: string, value: any): Promise<boolean>
  route(
    path: string,
    callback: (request: Request | any) => Promise<Response> | Response
  ): string | undefined
  proxy(path: string, target: string): string | undefined
  serve(path: string, target: string): string | undefined
  useCache(key: string, callback: Function, expiry?: number): Promise<any>
  invalidateCache(key: string): Promise<void>
  registerEmbed(name: string, callback: EmbedCallback): boolean | undefined
  registerWidget(callback: WidgetCallback): boolean | undefined
  fetch(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> | undefined
  ext?: Record<string, any>
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
  readonly timezoneOffset?: number
  readonly screenWidth?: number
  readonly screenHeight?: number
  readonly viewportWidth?: number
  readonly viewportHeight?: number

  fetch(resource: string, settings?: RequestInit): boolean | undefined
  execute(code: string): boolean | undefined
  return(value: unknown): void
  set(
    key: string,
    value?: string | null,
    opts?: ClientSetOptions
  ): boolean | undefined
  get(key: string, tool?: string): string | undefined
  attachEvent(event: ClientEventType): void
  detachEvent(event: ClientEventType): void
}

type ManagedComponent = (
  manager: Manager,
  settings: ComponentSettings
) => void | Promise<void>

type Permission =
  | 'access_client_kv'
  | 'access_extended_client_kv'
  | 'execute_unsafe_scripts'
  | 'client_network_requests'
  | 'serve_static_files'
  | 'provide_server_functionality'
  | 'server_network_requests'

export {
  ComponentSettings,
  ClientSetOptions,
  EmbedCallback,
  WidgetCallback,
  MCEvent,
  MCEventListener,
  Manager,
  Client,
  ManagedComponent,
  Permission,
}
