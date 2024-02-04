"use client";
import "../assets/css/editor.css";
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Editor from "@monaco-editor/react";
import LanguageDropDown from "./LanguageDropDown";
import * as monaco from "monaco-editor";
import ReactAce from "react-ace";
function CodeEditor() {
  const [languageChoice, setLanguageChoice] = useState("html");
  //   var model = Editor.getModel(); // we'll create a model for you if the editor created from string value.
  // monaco.editor.setModelLanguage(model, "javascript")
  const defaultCode = `
<style>
.zoom {
overflow: hidden;
margin: 0 auto;
}
.zoom img {
width: 100%;
transition: 0.9s all ease-in-out;
cursor: pointer;
}
.zoom:hover img {
transform: scale(1.2);
}
.modal-fullscreen{
width:40vw !important;
max-width:none;
height:100%;
margin:0;
margin-right: 0 !important;
}
</style>
`;
  const editorCountainerRef = useRef(null);
  const editorRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (editorCountainerRef.current) {
  //     let aa  = monaco.editor.create(editorCountainerRef.current, {
  //         value: defaultCode,
  //         language: "html",
  //       });
  //     if(editorRef.current  !== null ){
  //       editorRef.current = aa;
  //     }

  //   }
  //   return () => {
  //     editorRef.current?.dispose();
  //   };
  // }, [editorCountainerRef]);

  console.log(languageChoice);
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
          options={{
            minimap: {
              enabled: false,
            },
          }}
        />
      </p>
    </div>
  );
}

export default CodeEditor;
