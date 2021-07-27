# hydrogen-run

## Introduction

The package extends the available methods to computing with [hydrogen](https://atom.io/packages/hydrogen). The package introduce two new concepts of evaluation:

* `recalculate`: clear result + restart kernel + run calculation,
* `inline`: computing go one breakpoint after one (instead of pushing all text to python interpreter instantly), this way you got result next to breakpoints. Inline methods inherit all limitations of hydrogen package, e.g. in python the block `if ... else ...` need to be extended, but it's not.

  ![inline-gif](https://github.com/bacadra/hydrogen-run/blob/master/ppt-1.gif?raw=true)


## List of commands

The commands have been assigned to the function keys `F5` through `F9` with optional modifier keys. There are few method from [hydrogen](https://atom.io/packages/hydrogen) package which have been assigned unchanged. This is to create a complete command base for fast evaluation.

| Shortcut | Command | Description |
| -: | - | - |
| `f5`       | `hydrogen:run-all` | push all text in single run; standard method of Hydrogen |
| `alt-f5`   | `hydrogen-run:recalculate-all` | clear results, reset kernel and push all text in single run |
| `shift-f5` | `hydrogen:run-all-above` | push above text in single run |
| `ctrl-f5`  | `hydrogen-run:recalculate-all-above` | clear results, reset kernel and push above text in single run |
| `f6`      | `hydrogen-run:run-all-inline` | push all text in multiple runs |
| `alt-f6`  | `hydrogen-run:recalculate-all-inline` | clear results, reset kernel and push all text in multiple runs |
| `shift-f6`| `hydrogen-run:run-all-above-inline` | push above text in multiple runs |
| `ctrl-f6` | `hydrogen-run:recalculate-all-above-inline` | clear results, reset kernel and push above text in multiple runs  |
| `f7`      | `hydrogen:run` | run single statement in single run |
| `ctrl-f7` | `hydrogen:run-cell` | run cell in single run |
| `alt-f7`  | `hydrogen:clear-results` | clear results |
| `shift-f7`| `hydrogen:interrupt-kernel` | interrupt kernel |
| `f8`      | `hydrogen:run-and-move-down` | run single statement and go to next statement |
| `ctrl-f8` | `hydrogen:run-cell-and-move-down` | run single cell and go to next cell |
| `alt-f8`  | `hydrogen-run:clear-and-restart` | clear results and restart kernel |
| `shift-f8`| `hydrogen:shutdown-kernel` | shutdown kernel |
| `f9`      | `hydrogen:toggle-inspector` | toggle inspector pane |
