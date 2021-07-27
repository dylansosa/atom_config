import Immutable from "immutable";

import { fromJS, parseNotebook, toJS } from "../src/notebook";
import { makeNotebookRecord } from "../src/structures";

describe("parseNotebook", () => {
  it("parses a string notebook", () => {
    const notebook = `{
 "cells": [],
 "metadata": {
  "kernel_info": {
   "name": "python3"
  },
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.7.2"
  },
  "nteract": {
   "version": "nteract-on-jupyter@2.0.4"
  },
  "title": "Introduce nteract"
 },
 "nbformat": 4,
 "nbformat_minor": 0
}`;
    const result = parseNotebook(notebook);
    expect(result.nbformat).toBe(4);
    expect(result.nbformat_minor).toBe(0);
  });
});

describe("toJS", () => {
  it("throws an error if the notebook version is invalid", () => {
    const notebook = Immutable.Map({
      nbformat: 5,
      nbformat_minor: 0
    });
    const invocation = () => toJS(notebook);
    expect(invocation).toThrowError(
      "Only notebook formats 3 and 4 are supported!"
    );
  });
});

describe("fromJS", () => {
  it("throws an error if given notebook is not immutable structure", () => {
    const notebook = "";
    const invocation = () => fromJS(notebook);
    expect(invocation).toThrowError("This notebook format is not supported");
  });
  it("returns same notebook if it is already Immutable", () => {
    const notebook = makeNotebookRecord();
    const result = fromJS(notebook);
    expect(result).toEqual(notebook);
  });
});
