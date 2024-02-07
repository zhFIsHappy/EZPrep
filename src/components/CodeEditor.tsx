"use client";
import "../assets/css/editor.css";
import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import LanguageDropDown from "./LanguageDropDown";
import Button from "@mui/material/Button";
import Axios from "axios";
function CodeEditor() {
  const [languageChoice, setLanguageChoice] = useState("apex");
  const editorRef = useRef(null as any);
  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }
  function submitValue() {
    console.log(languageChoice);
    Axios.post("http://0.0.0.0:8080/api/submit", {
      problem_id: -1,
      code: editorRef.current?.getValue(),
      language: languageChoice,
    }).then((response) => {
      console.log(response);
    });
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
