"use client";
import "../assets/css/editor.css";
import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import LanguageDropDown from "./LanguageDropDown";
import Button from "@mui/material/Button";
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
      <div className="editor-layout-left-right">
        <LanguageDropDown setLanguageChoice={setLanguageChoice} />
        <Editor
          height="88%"
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
        <Button
          variant="contained"
          onClick={submitValue}
          style={{ float: "right" }}
          type="button"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default CodeEditor;
