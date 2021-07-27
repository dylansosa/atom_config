import * as Immutable from "immutable";

export interface CommsRecordProps {
    targets: Immutable.Map<any, any>;
    info: Immutable.Map<any, any>;
    models: Immutable.Map<any, any>;
  }

export type CommsRecord = Immutable.RecordOf<CommsRecordProps>;

export const makeCommsRecord = Immutable.Record<CommsRecordProps>({
  targets: Immutable.Map(),
  info: Immutable.Map(),
  models: Immutable.Map()
});