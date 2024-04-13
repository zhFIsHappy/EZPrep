// "use client";
import "../assets/css/editor.css";
import React, { useEffect, useState, useRef, useContext } from "react";
import Editor from "@monaco-editor/react";
import LanguageDropDown from "./LanguageDropDown";
import Button from "@mui/material/Button";
import axios, { AxiosError } from "axios";
import { MessagesContext, TimerContext } from "../contexts/InterviewContext";
import { MessageTypes } from "../reducers/MessagesReducer";
import { languages, rMapLanguages } from "../assets/static/language";
import { ProblemStatement } from "../reducers/ProblemInfo";
import { commentProblemStatement } from "../utils/CodeFormatter";
import { RegisterContext } from "../contexts/RegisterContext";
import getProblemStatement from "../apis/CodeEditorAPI";

function CodeEditor() {
  const { messagesDispatch } = useContext(MessagesContext);
  const { onModifyCode } = useContext(TimerContext);
  const { selectedPreference } = useContext(RegisterContext);

  const [languageChoice, setLanguageChoice] = useState(
    rMapLanguages[selectedPreference.language] ?? "c"
  );
  const [problemStatement, setProblemInfo] = useState<ProblemStatement | null>(
    null
  );
  const editorRef = useRef(null as any);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  function submitValue() {
    // TODO: Extract network request into service
    // problem_id
    // problem_statement

    // submit code editor value
    axios
      .post("https://ezprep.discovery.cs.vt.edu/api/submit", {
        problem_id: -1,
        code: editorRef.current?.getValue(),
        language: languageChoice,
      })
      .then((response) => {
        messagesDispatch({
          type: MessageTypes.RECEIVE,
          content: response.data.ai_response,
        });
      });
  }

  useEffect(() => {
    (async function () {
      try {
        const problem_statement = await getProblemStatement(
          selectedPreference.difficulty.toLowerCase() ?? "easy"
        );
        if ("problem_statement" in problem_statement) {
          return setProblemInfo(problem_statement);
        }
      } catch (error) {}
    })();
    setLanguageChoice(rMapLanguages[selectedPreference.language] ?? "c");
  }, []);

  useEffect(() => {
    function postUpdatedValueBackend() {
      const date = new Date();
      const showTime =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      // axios post updated value back to backend
      // TODO: Impl this endpoint in backend
      axios
        .post("https://ezprep.discovery.cs.vt.edu/api/update-code-value", {
          problem_id: -1,
          code: editorRef.current?.getValue(),
          language: languageChoice,
          timestamp: showTime,
        })
        .then((response) => {
          messagesDispatch({
            type: MessageTypes.RECEIVE,
            content: response.data.ai_response,
          });
        });
      console.log("timestamp");
    }
    // postUpdatedValueBackend();
    const interval = setInterval(() => postUpdatedValueBackend(), 300000);
    return () => {
      clearInterval(interval);
    };
  }, []);

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
              onClick={submitValue}
              // style={{ float: "right" }}
              type="button"
            >
              Submit
            </Button>
          </div>

          <Editor
            height="94vh"
            language={languageChoice}
            value={commentProblemStatement(
              problemStatement?.problem_statement,
              languageChoice
            )}
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
