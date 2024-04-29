import React, {useEffect, useState} from "react";
import TabsHeader from "./TabsHeader";
import Editor from "@monaco-editor/react";
import {useLocation, useParams} from "react-router-dom";
import {getSubmissionById} from "../apis/modules/SubmissionAPI";
import {SubmissionResponseInfo} from "../types";

const SubmissionDetailPage = () => {
  const location = useLocation();
  const [submission, setSubmission] = useState<
    SubmissionResponseInfo & {code: string}
  >();
  let { submissionId} = useParams();
  const searchParams = new URLSearchParams(location.search);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    if (!submissionId) {
      return
    }
    const sub = await getSubmissionById(submissionId);
    setSubmission(sub);
  }

  return (
    <>
      <TabsHeader/>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "30px"}}>
        <span style={{ fontSize: "24px", fontWeight: "500" }}>Submission Detail</span>
        <hr/>
        <Editor
          height="800px"
          width="960px"
          language={submission?.language}
          value={submission?.code}
          theme="vs-dark"
          // onMount={handleEditorDidMount}
          options={{
            minimap: {
              enabled: false,
            },
            domReadOnly: true,
            readOnly: true,
          }}
        />
      </div>
    </>
  )
}

export default SubmissionDetailPage;