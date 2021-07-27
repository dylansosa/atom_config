import Immutable from "immutable";

export interface EditorComponentProps {
  byEditorType: Immutable.Map<string, any>;
}

export type EditorsRecord = Immutable.RecordOf<EditorComponentProps>;

export const makeEditorsRecord = Immutable.Record<EditorComponentProps>({
  byEditorType: Immutable.Map<string, any>()
});
