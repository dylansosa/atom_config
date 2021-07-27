import { fromJS, isNotebookV3 } from "../src/v3";

describe("isNotebookV3", () => {
  it("returns true for nbformat v3 notebooks", () => {
    const notebook = {
      nbformat: 3,
      nbformat_minor: 0
    };
    expect(isNotebookV3(notebook)).toBe(true);
  });
  it("returns false for nbformat v4 notebooks", () => {
    const notebook = {
      nbformat: 4,
      nbformat_minor: 0
    };
    expect(isNotebookV3(notebook)).toBe(false);
  });
  it("returns false for non-notebook types", () => {
    const notebook = "not an object";
    expect(isNotebookV3(notebook)).toBe(false);
  });
});

describe("fromJS", () => {
  it("can create in-memory model for V3 notebook", () => {
    const notebook = {
      metadata: {
        name: ""
      },
      nbformat: 3,
      nbformat_minor: 0,
      worksheets: [
        {
          cells: [
            {
              cell_type: "heading",
              level: 1,
              metadata: {},
              source: ["nbconvert latex test"]
            },
            {
              cell_type: "markdown",
              metadata: {},
              source: [
                "**Lorem ipsum** dolor sit amet, consectetur adipiscing elit. Nunc luctus bibendum felis dictum sodales. Ut suscipit, orci ut interdum imperdiet, purus ligula mollis *justo*, non malesuada nisl augue eget lorem. Donec bibendum, erat sit amet porttitor aliquam, urna lorem ornare libero, in vehicula diam diam ut ante. Nam non urna rhoncus, accumsan elit sit amet, mollis tellus. Vestibulum nec tellus metus. Vestibulum tempor, ligula et vehicula rhoncus, sapien turpis faucibus lorem, id dapibus turpis mauris ac orci. Sed volutpat vestibulum venenatis."
              ]
            },
            {
              cell_type: "heading",
              level: 2,
              metadata: {},
              source: ["Printed Using Python"]
            },
            {
              cell_type: "code",
              collapsed: false,
              input: ['print("hello")'],
              language: "python",
              metadata: {},
              outputs: [
                {
                  output_type: "stream",
                  stream: "stdout",
                  text: ["hello\n"]
                }
              ],
              prompt_number: 1
            },
            {
              cell_type: "heading",
              level: 2,
              metadata: {},
              source: ["Pyout"]
            },
            {
              cell_type: "code",
              collapsed: false,
              input: [
                "from IPython.display import HTML\n",
                'HTML("""\n',
                "<script>\n",
                'console.log("hello");\n',
                "</script>\n",
                "<b>HTML</b>\n",
                '""")'
              ],
              language: "python",
              metadata: {},
              outputs: [
                {
                  html: [
                    "\n",
                    "<script>\n",
                    'console.log("hello");\n',
                    "</script>\n",
                    "<b>HTML</b>\n"
                  ],
                  metadata: {},
                  output_type: "pyout",
                  prompt_number: 3,
                  text: ["<IPython.core.display.HTML at 0x1112757d0>"]
                }
              ],
              prompt_number: 3
            },
            {
              cell_type: "code",
              collapsed: false,
              input: ["%%javascript\n", 'console.log("hi");'],
              language: "python",
              metadata: {},
              outputs: [
                {
                  javascript: ['console.log("hi");'],
                  metadata: {},
                  output_type: "display_data",
                  text: ["<IPython.core.display.Javascript at 0x1112b4b50>"]
                }
              ],
              prompt_number: 7
            },
            {
              cell_type: "heading",
              level: 3,
              metadata: {},
              source: ["Image"]
            },
            {
              cell_type: "code",
              collapsed: false,
              input: [
                "from IPython.display import Image\n",
                'Image("http://ipython.org/_static/IPy_header.png")'
              ],
              language: "python",
              metadata: {},
              outputs: [
                {
                  metadata: {},
                  output_type: "pyout",
                  png:
                    "iVBORw0KGgoAAAANSUhEUgAAAggAAABDCAYAAAD5/P3lAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz\nAAAH3AAAB9wBYvxo6AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURB\nVHic7",
                  prompt_number: 6,
                  text: ["<IPython.core.display.Image at 0x111275490>"]
                }
              ],
              prompt_number: 6
            }
          ],
          metadata: {}
        }
      ]
    };
    const result = fromJS(notebook);
    expect(result.cellOrder.size).toBe(9);
  });
});
