"use client";
import "../assets/css/editor.css";
import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import LanguageDropDown from "./LanguageDropDown";
function CodeEditor() {
  const [languageChoice, setLanguageChoice] = useState("html");
  const editorRef = useRef(null as any);
  console.log(languageChoice);
  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }
  function submitValue() {
    alert(editorRef.current?.getValue());
  }
  return (
    <div className="editor-wrapper">
      <h1>Coding</h1>
      <p>
        「インタビュー」は、あなたのインタビューの準備を支援するためのツールです。
        <LanguageDropDown setLanguageChoice={setLanguageChoice} />
        <Editor
          height="90vh"
          language={languageChoice}
          defaultValue="// Here's the playground you can start to code"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            minimap: {
              enabled: false,
            },
          }}
        />
        <button onClick={submitValue} style={{ float: "right" }} type="button">
          Click Me!
        </button>
      </p>
    </div>
  );
}

export default CodeEditor;
