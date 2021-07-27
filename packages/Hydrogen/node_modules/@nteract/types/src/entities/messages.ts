import * as Immutable from "immutable";
import { AnyAction } from "redux";

export interface MessagesRecordProps {
  messageQueue: Immutable.List<AnyAction>;
}

export type MessagesRecord = Immutable.RecordOf<MessagesRecordProps>;

export const makeMessagesRecord = Immutable.Record<MessagesRecordProps>({
  messageQueue: Immutable.List<AnyAction>()
});