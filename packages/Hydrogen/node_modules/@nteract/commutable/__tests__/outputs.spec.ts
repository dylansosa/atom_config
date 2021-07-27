import Immutable from "immutable";

import { createImmutableOutput, makeErrorOutput } from "../src/outputs";

describe("createImmutableOutput", () => {
  it("processes error types correctly", () => {
    const errorOutput = {
      output_type: "error",
      ename: "NameError",
      evalue: "x is undefined",
      traceback: ["x is undefined", "ipython_vm_325.py"]
    };
    const expectedOutput = makeErrorOutput({
      output_type: "error",
      ename: "NameError",
      evalue: "x is undefined",
      traceback: Immutable.List(["x is undefined", "ipython_vm_325.py"])
    });
    expect(createImmutableOutput(errorOutput)).toEqual(expectedOutput);
  });
  it("throws an error for unknown types", () => {
    const output = {
      output_type: "unkown_error_type"
    };
    const invocation = () => createImmutableOutput(output);
    expect(invocation).toThrowError("not recognized");
  });
  it("throws an error malformed outputs", () => {
    const output = "test";
    const invocation = () => createImmutableOutput(output);
    expect(invocation).toThrowError("Output structure not known");
  });
});
