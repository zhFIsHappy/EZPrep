// "use client";
import "../assets/css/editor.css";
import React, { useEffect, useState, useRef, useContext } from "react";
import Editor from "@monaco-editor/react";
import LanguageDropDown from "./LanguageDropDown";
import Button from "@mui/material/Button";
import axios, { AxiosError } from "axios";
import { MessagesContext } from "../contexts/MessagesContext";
import { MessageTypes } from "../reducers/MessagesReducer";
import language from "../assets/static/language";
import getProblemInfo from "../apis/CodeEditorAPI";
import { ProblemInfo } from "../reducers/ProblemInfo";

function CodeEditor() {
  const [languageChoice, setLanguageChoice] = useState(language[0]);
  const [problemInfo, setProblemInfo] = useState<ProblemInfo | null>(null);
  const editorRef = useRef(null as any);
  const { dispatch } = useContext(MessagesContext);
  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  getProblemInfo();

  function submitValue() {
    console.log(languageChoice);
    // Can mock reply in developing test
    // dispatch({
    //   type: MessageTypes.RECEIVE,
    //   content: "test msg"
    // })
    // TODO: Extract network request into service
    // problem_id
    // problem_statement

    // submit code editor value
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
  useEffect(() => {
    (async function () {
      try {
        const problem_info = await getProblemInfo();
        if ("problem_statement" in problem_info) {
          return setProblemInfo(problem_info);
        }
      } catch (error) {}
    })();
  }, []);
  return (
    <div className="editor-wrapper">
      <div className="editor-layout-left-right">
        <LanguageDropDown setLanguageChoice={setLanguageChoice} />
        <Editor
          height="88%"
          language={languageChoice}
          defaultValue={problemInfo?.problem_statement}
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
