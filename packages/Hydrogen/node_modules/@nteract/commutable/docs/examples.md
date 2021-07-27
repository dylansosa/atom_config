# @nteract/commutable Examples

## Create an in-memory model of a notebook

To create an in-memory model of a notebook, pass a string containing the serialized contents of the notebook to the `fromJS` function.

```js
import { fromJS } from "@nteract/commutable";

const notebookString = "{ cells: [...], metadata: {...} }";
const immutableNotebook = fromJS(notebookString);
```

In the example above, `notebookString` can be loaded from a Jupyter server via the Jupyter Contents API, retrieved from disk using a filesystem API, loaded from a cloud storage provider with their API, or anywhere else. As long as it is a string that follows the nbformat, it will be converted to the in-memory model.

### Create a code cell

To create a code cell, you can use the `makeCodeCell` function in the commutable API.

```js
import { makeCodeCell } from "@nteract/commutable";

const codeCell = makeCodeCell({
  source: "print(1)"
});
```

Note that you don't need to provide all the properties for a cell in the parameter passed to the `makeCodeCell` method. The package will use sensible defaults where appropriate. There are analogous functions to create other types of cells, such as `makeMarkdownCell` and `makeRawCell`.
