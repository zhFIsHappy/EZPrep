// "use client";
import "../assets/css/editor.css";
import React, { useEffect, useState, useRef, useContext } from "react";
import Editor from "@monaco-editor/react";
import LanguageDropDown from "./LanguageDropDown";
import Button from "@mui/material/Button";
import axios, { AxiosError } from "axios";
import { TimerContext } from "../contexts/InterviewContext";
import { MessageTypes } from "../reducers/MessagesReducer";
import { languages, rMapLanguages } from "../assets/static/language";
import { ProblemStatement } from "../reducers/ProblemInfo";
import { commentProblemStatement } from "../utils/CodeFormatter";
import { RegisterContext } from "../contexts/RegisterContext";
import {
  getProblemStatementByDifficulty,
  getProblemStatementById
} from "../apis/modules/InterviewAPI";
import {useParams} from "react-router-dom";
import { appState } from "../appState";


const CodeEditor = ({
  problemStatement, problemId, submitCode, modifyCode
}) => {
  // TODO: temporary solution to get problem statement
  // let { problemId } = useParams();
  // const { messagesDispatch } = useContext(MessagesContext);
  // const { onModifyCode } = useContext(TimerContext);
  const { selectedPreference } = useContext(RegisterContext);

  const [languageChoice, setLanguageChoice] = useState(
    rMapLanguages[selectedPreference.language] ?? "c"
  );
  // const [problemStatement, setProblemInfo] = useState<ProblemStatement | null>(
  //   null
  // );
  const editorRef = useRef(null as any);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  // Manual submit
  function handleSubmit() {
    submitCode(editorRef.current?.getValue(), languageChoice);
  }

  useEffect(() => {
    // console.log(problemStatement);
  }, []);

  useEffect(() => {

    // Passive submit
    function postUpdatedValueBackend() {
      submitCode(editorRef.current?.getValue(), languageChoice);
    }
    postUpdatedValueBackend();
    const interval = setInterval(() => postUpdatedValueBackend(), 300000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const onModifyCode = () => {
    modifyCode(editorRef.current?.getValue(), languageChoice);
  }

  return (
    <>
      <div className="editor-wrapper">
        <div className="editor-layout-left-right">
          <div className="editor-layout-left-top">
            <div className="editor-language-choose">
              <p>Language:</p>
              <LanguageDropDown setLanguageChoice={setLanguageChoice} />
            </div>
            <Button
              variant="contained"
              onClick={handleSubmit}
              // style={{ float: "right" }}
              type="button"
            >
              Submit
            </Button>
          </div>

          <Editor
            height="94vh"
            language={languageChoice}
            value={problemStatement}
            onChange={onModifyCode}
            theme="vs-dark"
            onMount={handleEditorDidMount}
            options={{
              minimap: {
                enabled: false,
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

export default CodeEditor;
