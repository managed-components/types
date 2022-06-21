import {
  Client as CClient,
  Manager as CManager,
  ComponentSettings as CComponentSettings,
  ClientSetOptions as CClientSetOptions,
  EmbedCallback as CEmbedCallback,
  WidgetCallback as CWidgetCallback,
  MCEvent as CMCEvent,
  MCEventListener as CMCEventListener,
} from './index'

declare global {
  interface Client extends CClient {}
  interface Manager extends CManager {}
  type EmbedCallback = CEmbedCallback
  type WidgetCallback = CWidgetCallback
  interface ComponentSettings extends CComponentSettings {}
  interface ClientSetOptions extends CClientSetOptions {}
  interface MCEvent extends CMCEvent {}
  interface MCEventListener extends CMCEventListener {}
}

export {}
