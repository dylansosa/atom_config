import {
  createFrozenMediaBundle,
  createOnDiskMediaBundle,
  remultiline
} from "../src";

// In order to make jest output read well, show 🇳🇱 instead of newlines
function flagNewlines(s: string): string {
  // NOTE: This function can be thought of mentally as Netherlines
  return s.replace(/\n/g, "🇳🇱");
}

describe("remultiline", () => {
  it("correctly splits strings by newline", () => {
    const testString = "this\nis\na\ntest\n";
    const multilined = remultiline(testString);
    expect(multilined).toEqual(["this\n", "is\n", "a\n", "test\n"]);
  });

  it("can handle repeated newlines", () => {
    expect(remultiline("test\n\n\nthis\n\nout").map(flagNewlines)).toEqual(
      ["test\n", "\n", "\n", "this\n", "\n", "out"].map(flagNewlines)
    );

    expect(
      remultiline("test\n\n\nthis\n\nout\n\n\n\n\n\nwhat").map(flagNewlines)
    ).toEqual(
      // tslint:disable-next-line:max-line-length
      [
        "test\n",
        "\n",
        "\n",
        "this\n",
        "\n",
        "out\n",
        "\n",
        "\n",
        "\n",
        "\n",
        "\n",
        "what"
      ].map(flagNewlines)
    );
  });

  it("keeps multiline arrays the same", () => {
    expect(remultiline(["test\n", "this"])).toEqual(["test\n", "this"]);
  });
});

describe("createFrozenMediaBundle", () => {
  it("correctly handles JSON with a string root object", () => {
    const mediaBundle = {
      "application/vnd.nteract+json": "Don't treat me like an object!"
    };

    expect(createFrozenMediaBundle(mediaBundle)).toEqual(mediaBundle);
  });

  it("correctly handles JSON with an array root object", () => {
    const mediaBundle = {
      "application/vnd.nteract+json": ["1", "2", "3"]
    };

    expect(createFrozenMediaBundle(mediaBundle)).toEqual(mediaBundle);
  });

  it("correctly handles non-JSON with an array root object", () => {
    const mediaBundle = {
      "application/vnd.nteract+nothing": ["1", "2", "3"]
    };
    const expectedResult = {
      "application/vnd.nteract+nothing": "123"
    };

    expect(createFrozenMediaBundle(mediaBundle)).toEqual(expectedResult);
  });
});

describe("createOnDiskMediaBundle", () => {
  it("parses vega formats as JSON payload", () => {
    const mediaBundle = {
      "application/vnd.vega.v2+json": '{ "test":"1, 2, 4"}'
    };

    // Uncomment the reformated result when we turn on the reformatting
    const expectedResult = mediaBundle;
    // const expectedResult = {
    //   "application/vnd.vega.v2+json": { test: "1, 2, 4" }
    // };

    expect(createOnDiskMediaBundle(mediaBundle)).toStrictEqual(expectedResult);
  });
  it("multilines string values into array of strings", () => {
    const mediaBundle = {
      "text/html": "test\n\n\nthis\n\nout"
    };

    // Uncomment the reformated result when we turn on the reformatting
    const expectedResult = mediaBundle;
    // const expectedResult = {
    //   "text/html": ["test\n", "\n", "\n", "this\n", "\n", "out"]
    // };

    expect(createOnDiskMediaBundle(mediaBundle)).toStrictEqual(expectedResult);
  });
  it("returns JSON values as is", () => {
    const mediaBundle = {
      "text/html": {
        test1: "a",
        test2: "b"
      }
    };

    expect(createOnDiskMediaBundle(mediaBundle)).toStrictEqual(mediaBundle);
  });
});
