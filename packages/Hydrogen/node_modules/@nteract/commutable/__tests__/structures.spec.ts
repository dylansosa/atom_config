import Immutable from "immutable";

import { makeCodeCell, makeNotebookRecord } from "../src";
import { markCellDeleting, markCellNotDeleting } from "../src/structures";

describe("markCellNotDeleting", () => {
  it("set transient state for cell to note deleting", () => {
    const notebook = makeNotebookRecord({
      cellMap: Immutable.Map({
        cellId: makeCodeCell()
      })
    });
    const result = markCellNotDeleting(notebook, "cellId");
    expect(
      result.getIn([
        "cellMap",
        "cellId",
        "metadata",
        "nteract",
        "transient",
        "deleting"
      ])
    ).toBe(false);
  });
});

describe("markCellDeleting", () => {
  it("set transient state for cell to note deleting", () => {
    const notebook = makeNotebookRecord({
      cellMap: Immutable.Map({
        cellId: makeCodeCell()
      })
    });
    const result = markCellDeleting(notebook, "cellId");
    expect(
      result.getIn([
        "cellMap",
        "cellId",
        "metadata",
        "nteract",
        "transient",
        "deleting"
      ])
    ).toBe(true);
  });
});
