# An Overview of the @nteract/commutable Package

@nteract/commutable is a package that is used to create an in-memory Immutable representation of a Jupyter notebook.

This package follows the principles below, based on Tom MacWright's [outline for practical undo](http://www.macwright.org/2015/05/18/practical-undo.html).

- A notebook document is immutable. The notebook document's representation is never mutated in-place.
- Changes to a notebook document are encapsulated into operations that take a previous version and return a new version of the notebook without modifying the old version.
- History is represented as a list of states, with the past on one end, the present on the other, and an index that can back up into 'undo states'.
- Modifying a notebook document causes any future states to be thrown away.

@nteract/commutable guilds on top of the [ImmutableJS](https://immutable-js.github.io/immutable-js/) library.

## The Notebook Format

Jupyter notebooks are serialized into files with ipynb extensions. These files are JSON-based and follow a schema that is defined in the [nbformat specification](https://nbformat.readthedocs.io/en/latest/).

The top-level properties in the notebook have the following schema.

```
{
  "metadata" : {
    "kernel_info": {
        # if kernel_info is defined, its name field is required.
        "name" : "the name of the kernel"
    },
    "language_info": {
        # if language_info is defined, its name field is required.
        "name" : "the programming language of the kernel",
        "version": "the version of the language",
        "codemirror_mode": "The name of the codemirror mode to use [optional]"
    }
  },
  "nbformat": 4,
  "nbformat_minor": 0,
  "cells" : [
      # list of cell dictionaries, see below
  ],
}
```

The `cells` properties contains a list of cells that exist in the notebook. The fundamental structure for a cell obeys the following format.

```
{
  "cell_type" : "type",
  "metadata" : {},
  "source" : "single string or [list, of, strings]",
}
```

For examples of serialized Jupyter notebooks, you can view the raw JSON for an example notebook [here](https://raw.githubusercontent.com/nteract/examples/master/python/intro.ipynb).

## The @nteract/commutable In-Memory Format

As mentioned earlier, this package converts the serialized representation summarized above into an immutable in-memory representation. The structure of the in-memory representation is a little different. Most importantly, it is designed to make ti easier to use the in-memory format when developing interactive notebook UIs. The interface for a notebooks is follows.

```
export interface NotebookRecordParams {
  cellOrder: ImmutableList<CellId>;
  cellMap: ImmutableMap<CellId, ImmutableCell>;
  nbformat_minor: number;
  nbformat: number;
  metadata: ImmutableMap<string, any>;
}
```

Note that this package will generate a unique CellId for each cell it encounters when parsing the notebook. These CellIds are uuid-v4 identifiers that are used to refer to the cell in the in memory store.

- `cellOrder`: A list of CellIds in order of appearance in the notebook
- `cellMap`: An map that associates a CellId with the ImmutableCell it represents
- `nbformat`, `nbformat_minor`: The version of the nbformat that this notebook follows
- `metadata`: Top-level metadata stored in the notebook

This package includes strongly-typed interfaces and creators for each cell type that exists in the Jupyter nbformat specification: code cells, markdown cells, and raw cells. For more information on this, view the examples for this package.

### Transient nteract Data

The in-memory format includes an `nteract.transient` metadata field in each cell. This is used to enable UI-specific interactions for nteract-based interfaces. Metadata fields in the Jupyter nbformat are not strongly typed and can be safely ignored by UIs that don't understand how to interpret a particular metadata field.

This means that if a user opens a notebook in nteract, interacts with it in a fashion that stores state in the metadata property, then opens the notebook in another Jupyter UI, the notebook will still be usable.

### Where is the commutable package API documented?

You can find a list of all the support actions [in the API docs for this package](https://packages.nteract.io/modules/commutable.html).
