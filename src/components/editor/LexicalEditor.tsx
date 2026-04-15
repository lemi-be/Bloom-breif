import React, { useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import type { EditorState } from "lexical";

const theme = {
  // Theme configuration for Lexical
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
  },
  list: {
    nested: {
      listitem: "nested-list-item",
    },
    ol: "list-ol",
    ul: "list-ul",
    listitem: "list-item",
  },
};

const onError = (error: Error) => {
  console.error(error);
};

const initialConfig = {
  namespace: "MyEditor",
  theme,
  onError,
  nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode],
};

function Toolbar() {
  const [editor] = useLexicalComposerContext();

  const formatBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  };

  const formatItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  };

  const formatBulletList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
  };

  const formatNumberedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
  };

  const exportJSON = () => {
    const json = editor.getEditorState().toJSON();
    console.log("Editor JSON:", json);
    alert("Check console for JSON output");
  };

  return (
    <div className="toolbar border-b border-gray-300 p-4 bg-gray-50 flex gap-2">
      <button
        onClick={formatBold}
        className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 font-bold"
      >
        B
      </button>
      <button
        onClick={formatItalic}
        className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 italic"
      >
        I
      </button>
      <button
        onClick={formatBulletList}
        className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
      >
        • List
      </button>
      <button
        onClick={formatNumberedList}
        className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
      >
        1. List
      </button>
      <button
        onClick={exportJSON}
        className="px-4 py-1 bg-primary text-white rounded hover:bg-primary/90 font-bold"
      >
        Export JSON
      </button>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
      Enter some rich text...
    </div>
  );
}

function LexicalErrorBoundary({
  children,
  onError,
}: {
  children: React.ReactNode;
  onError: (error: Error, errorInfo: any) => void;
}) {
  try {
    return <>{children}</>;
  } catch (error) {
    onError(error as Error, {});
    return <div>An error occurred in the editor.</div>;
  }
}

const LexicalEditor: React.FC = () => {
  const [editorState, setEditorState] = useState<EditorState | null>(null);

  const onChange = (state: EditorState) => {
    setEditorState(state);
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container border border-gray-300 rounded-lg overflow-hidden">
        <Toolbar />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[400px] p-4 outline-none" />
            }
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <OnChangePlugin onChange={onChange} />
        <ListPlugin />
      </div>
    </LexicalComposer>
  );
};

export default LexicalEditor;
