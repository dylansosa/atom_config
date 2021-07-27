import * as Immutable from "immutable";

import { ContentsRecordProps, makeContentsRecord } from "./contents";
import { HostsRecordProps, makeHostsRecord } from "./hosts";
import { KernelsRecordProps, makeKernelsRecord } from "./kernels";
import { KernelspecsRecordProps, makeKernelspecsRecord } from "./kernelspecs";
import { makeMessagesRecord, MessagesRecordProps } from "./messages";
import { makeModalsRecord, ModalsRecordProps } from "./modals";
import { makeSidebarRecord, SidebarRecordProps } from "./sidebar";
import { makeTransformsRecord, TransformsRecordProps } from "./transforms";
import { makeCommsRecord, CommsRecordProps } from "./comms";
import { makeEditorsRecord, EditorComponentProps} from "./editors"

export * from "./comms";
export * from "./contents";
export * from "./hosts";
export * from "./kernels";
export * from "./kernel-info";
export * from "./kernelspecs";
export * from "./messages";
export * from "./modals";
export * from "./transforms";
export * from "./sidebar";
export * from "./editors";

export interface EntitiesRecordProps {
  comms: Immutable.RecordOf<CommsRecordProps>;
  contents: Immutable.RecordOf<ContentsRecordProps>;
  hosts: Immutable.RecordOf<HostsRecordProps>;
  kernels: Immutable.RecordOf<KernelsRecordProps>;
  kernelspecs: Immutable.RecordOf<KernelspecsRecordProps>;
  modals: Immutable.RecordOf<ModalsRecordProps>;
  transforms: Immutable.RecordOf<TransformsRecordProps>;
  messages: Immutable.RecordOf<MessagesRecordProps>;
  sidebar: Immutable.RecordOf<SidebarRecordProps>;
  editors: Immutable.RecordOf<EditorComponentProps>;
}

export type EntitiesRecord = Immutable.RecordOf<EntitiesRecordProps>;

export const makeEntitiesRecord = Immutable.Record<EntitiesRecordProps>({
  comms: makeCommsRecord(),
  contents: makeContentsRecord(),
  hosts: makeHostsRecord(),
  kernels: makeKernelsRecord(),
  kernelspecs: makeKernelspecsRecord(),
  modals: makeModalsRecord(),
  transforms: makeTransformsRecord(),
  messages: makeMessagesRecord(),
  sidebar: makeSidebarRecord(),
  editors: makeEditorsRecord(),
});
