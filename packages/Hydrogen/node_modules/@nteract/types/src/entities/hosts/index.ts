import * as Immutable from "immutable";

import { HostRef } from "../../refs";

import { LocalHostRecord, LocalHostRecordProps } from "./local-jupyter";
import { JupyterHostRecord, JupyterHostRecordProps } from "./remote-jupyter";
import { EmptyHostRecord, EmptyHost } from "./empty";

/**
 * Re-export all types from the individual directories out
 * from this publicly-exposed interface.
 */
export * from "./base";
export * from "./remote-jupyter";
export * from "./local-jupyter";
export * from "./empty";

export interface Bookstore {
  version: string;
}

export type HostRecordProps =
  | LocalHostRecordProps
  | JupyterHostRecordProps
  | EmptyHost;

export type HostRecord = LocalHostRecord | JupyterHostRecord | EmptyHostRecord;

export interface HostsRecordProps {
  byRef: Immutable.Map<HostRef, HostRecord>;
  refs: Immutable.List<HostRef>;
}

export const makeHostsRecord = Immutable.Record<HostsRecordProps>({
  byRef: Immutable.Map(),
  refs: Immutable.List()
});
