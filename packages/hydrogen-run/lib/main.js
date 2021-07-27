'use babel'

import { CompositeDisposable } from 'atom'

let subscriptions

export default {

  activate (_state) {
    subscriptions = new CompositeDisposable()
    subscriptions.add(atom.commands.add('atom-text-editor', {
      'hydrogen-run:clear-and-restart'
        : () => this.clear_and_restart(),
      'hydrogen-run:recalculate-all'
        : () => this.recalculate_all(),
      'hydrogen-run:recalculate-all-above'
        : () => this.recalculate_all_above(),
      'hydrogen-run:run-all-inline'
        : () => this.run_all_inline(),
      'hydrogen-run:recalculate-all-inline'
        : () => this.recalculate_all_inline(),
      'hydrogen-run:run-all-above-inline'
        : () => this.run_all_above_inline(),
      'hydrogen-run:run-all-below-inline'
        : () => this.run_all_below_inline(),
      'hydrogen-run:recalculate-all-above-inline'
        : () => this.recalculate_all_above_inline(),
    }))
  },

  clear_and_restart() {
    editor = atom.workspace.getActiveTextEditor();
    editorView = atom.views.getView(editor);
    atom.commands.dispatch(editorView, "hydrogen:clear-results");
    atom.commands.dispatch(editorView, "hydrogen:restart-kernel");
  },

  recalculate_all() {
    editor = atom.workspace.getActiveTextEditor();
    editorView = atom.views.getView(editor);
    this.clear_and_restart();
    atom.commands.dispatch( editorView, "hydrogen:run-all");
  },

  recalculate_all_above() {
    editor = atom.workspace.getActiveTextEditor();
    editorView = atom.views.getView(editor);
    atom.commands.dispatch( editorView, "hydrogen:clear-results");
    atom.commands.dispatch( editorView, "hydrogen:restart-kernel");
    atom.commands.dispatch( editorView, "hydrogen:run-all-above");
  },

  run_all_inline() {
    editor = atom.workspace.getActiveTextEditor();
    editorView = atom.views.getView(editor);
    lastRow = editor.getLastBufferRow()
    currPos = editor.getCursorBufferPosition()
    editor.setCursorBufferPosition([0,0])
    while (true) {
      currRow = editor.getCursorBufferPosition().row
      if (currRow<lastRow) {
        atom.commands.dispatch( editorView, "hydrogen:run-and-move-down");
        if (editor.getCursorBufferPosition().row==currRow) {
          editor.moveDown()
        }
      } else if (currRow==lastRow) {
        if (editor.lineTextForBufferRow(lastRow)!='') {
          atom.commands.dispatch( editorView, "hydrogen:run");
        }
        break
      } else {
        break
      }
    }
    editor.setCursorBufferPosition(currPos, {autoscroll:false})
    editor.scrollToBufferPosition(currPos, {center:true})
  },

  recalculate_all_inline() {
    editor = atom.workspace.getActiveTextEditor();
    editorView = atom.views.getView(editor);
    atom.commands.dispatch( editorView, "hydrogen:clear-results");
    atom.commands.dispatch( editorView, "hydrogen:restart-kernel");
    this.run_all_inline();
  },

  run_all_above_inline() {
    editor = atom.workspace.getActiveTextEditor();
    editorView = atom.views.getView(editor);
    lastCur = editor.getCursorBufferPosition()
    lastRow = lastCur.row
    editor.setCursorBufferPosition([0,0])
    while (true) {
      currRow = editor.getCursorBufferPosition().row
      if (currRow<lastRow) {
        atom.commands.dispatch( editorView, "hydrogen:run-and-move-down");
        if (editor.getCursorBufferPosition().row==currRow) {
          editor.moveDown()
        }
      } else if (currRow==lastRow) {
        if (editor.lineTextForBufferRow(lastRow)!='') {
          atom.commands.dispatch( editorView, "hydrogen:run");
        }
        break
      } else {
        break
      }
    }
    editor.setCursorBufferPosition(lastCur)
  },

  recalculate_all_above_inline() {
    editor = atom.workspace.getActiveTextEditor();
    editorView = atom.views.getView(editor);
    atom.commands.dispatch( editorView, "hydrogen:clear-results");
    atom.commands.dispatch( editorView, "hydrogen:restart-kernel");
  this.run_all_above_inline();
  },

  run_all_below_inline() {
    editor = atom.workspace.getActiveTextEditor();
    editorView = atom.views.getView(editor);
    lastRow = editor.getLastBufferRow()
    currPos = editor.getCursorBufferPosition()
    while (true) {
      currRow = editor.getCursorBufferPosition().row
      if (currRow<lastRow) {
        atom.commands.dispatch( editorView, "hydrogen:run-and-move-down");
        if (editor.getCursorBufferPosition().row==currRow) {
          editor.moveDown()
        }
      } else if (currRow==lastRow) {
        if (editor.lineTextForBufferRow(lastRow)!='') {
          atom.commands.dispatch( editorView, "hydrogen:run");
        }
        break
      } else {
        break
      }
    }
    editor.setCursorBufferPosition(currPos)
    editor.scrollToBufferPosition(currPos, {center:true})
  },

};
