"use client"
import "../assets/css/editor.css";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Editor from '@monaco-editor/react';
import LanguageDropDown from "./LanguageDropDown";
function CodeEditor() {
  const [selected, setSelected] = useState("");
  return (
    <div className="editor-wrapper">
      <h1>Coding</h1>
      <p>
        「インタビュー」は、あなたのインタビューの準備を支援するためのツールです。
        
        {/* <LanguageDropDown selected = {selected} setSelected={setSelected}></LanguageDropDown> */}
          <Editor height = "90vh" 
                defaultLanguage = "javascript" 
                defaultValue = "// Here's the playground you can start to code" 
                theme = "vs-dark" 
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
