import * as Immutable from "immutable";

export interface SidebarRecordProps {
  isSidebarVisible: boolean;
}

export type SidebarRecord = Immutable.RecordOf<SidebarRecordProps>;

export const makeSidebarRecord = Immutable.Record<SidebarRecordProps>({
  isSidebarVisible: false,
});
