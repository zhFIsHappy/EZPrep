// "use client";
import "../assets/css/editor.css";
import React, { useState, useRef, useContext } from "react";
import Editor from "@monaco-editor/react";
import LanguageDropDown from "./LanguageDropDown";
import Button from "@mui/material/Button";
import axios from "axios";
import { MessagesContext } from "../contexts/MessagesContext";
import { SenderType } from "../types";
import { MessageTypes } from "../reducers/MessagesReducer";
import language from "../assets/static/language";
function CodeEditor() {
  const [languageChoice, setLanguageChoice] = useState(language[0]);
  const editorRef = useRef(null as any);
  const { dispatch } = useContext(MessagesContext);
  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }
  function submitValue() {
    console.log(languageChoice);
    // Can mock reply in developing test
    // dispatch({
    //   type: MessageTypes.RECEIVE,
    //   content: "test msg"
    // })
    // TODO: Extract network request into service
    axios
      .post("http://0.0.0.0:8080/api/submit", {
        problem_id: -1,
        code: editorRef.current?.getValue(),
        language: languageChoice,
      })
      .then((response) => {
        // console.log(response);
        dispatch({
          type: MessageTypes.RECEIVE,
          content: response.data.ai_response,
        });
      });
  }
  return (
    <div className="editor-wrapper">
      <div className="editor-layout-left-right">
        <div className="editor-layout-left-top">
          <LanguageDropDown setLanguageChoice={setLanguageChoice} />
          <Button
            variant="contained"
            onClick={submitValue}
            // style={{ float: "right" }}
            type="button"
          >
            Submit
          </Button>
        </div>

        <Editor
          height="94%"
          language={languageChoice}
          defaultValue="// Here's the playground you can start to code"
          // theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            minimap: {
              enabled: false,
            },
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
