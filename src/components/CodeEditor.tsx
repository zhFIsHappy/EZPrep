"use client"
import "../assets/css/editor.css";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Editor from '@monaco-editor/react';
import LanguageDropDown from "./LanguageDropDown";
import * as monaco from 'monaco-editor';
import ReactAce from 'react-ace';
function CodeEditor() {
  const [languageChoice, setLanguageChoice] = useState("");
  
  console.log(languageChoice);
  return (
    <div className="editor-wrapper">
      <h1>Coding</h1>
      <p>
          「インタビュー」は、あなたのインタビューの準備を支援するためのツールです。

          <LanguageDropDown setLanguageChoice = {setLanguageChoice}/>
          <Editor height = "90vh" 
                defaultLanguage = {languageChoice} 
                language = {languageChoice} 
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
