import React, {useEffect} from "react";
import { Table } from "antd";
import { SubmissionResponseInfo } from "../../types";
import { timestampFormatter } from "../../utils/DateFormatter";
import DoneIcon from "@mui/icons-material/Done";
import AdjustIcon from "@mui/icons-material/Adjust";
import CloseIcon from "@mui/icons-material/Close";
import {Link, useNavigate} from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface Props {
  submissions: SubmissionResponseInfo[];
}

const RecentSubmissions: React.FC<Props> = ({ submissions }, index) => {

  const navigate  = useNavigate();

  const naviToSub = (submissionId: number) => {
    navigate(`/submission/${submissionId}`);
  }

  useEffect(() => {
  }, [submissions]);

  const iconDOM = (sub: SubmissionResponseInfo) => {
    switch (sub.result) {
      case "Optimal":
        return <DoneIcon onClick={() => naviToSub(sub.submissionId)} style={{cursor: "pointer"}}/>
      case "Sub-Optimal":
        return <AccessTimeIcon onClick={() => naviToSub(sub.submissionId)} style={{cursor: "pointer"}}/>
      default:
        return <CloseIcon onClick={() => naviToSub(sub.submissionId)} style={{cursor: "pointer"}}/>;
    }
  }

  const resultStatusDOM = (sub: SubmissionResponseInfo) => {
    const opt = ["Optimal", "Sub-Optimal"];
    const cls = opt.includes(sub.result);
    return (
      <div className={`${cls? sub.result.toLowerCase():"not-complete"}-status-dom`}>
        {iconDOM(sub)}
        <span
          onClick={() => naviToSub(sub.submissionId)}
          style={{cursor: "pointer"}}
        >{cls? sub.result:"Not Complete"}</span>
      </div>
    )
  }

  const columns = [
    // {
    //   title: "Problem ID",
    //   dataIndex: "problemId",
    //   key: "problemId",
    // },
    {
      title: "Problem Title",
      dataIndex: "problemTitle",
      key: "problemTitle",
      width: "47%",
      render: (text, record) => {
        return (
          <div>
            <Link
              to={`/problem/${record.problemId}`}
              style={{ color: "var(--hyperlink)", textDecoration: "none"}}
            >
              {`#${record.problemId}. ${record.problemTitle}`}
            </Link>
          </div>
        )
      }
    },
    {
      title: "Submission Date",
      dataIndex: "timeSubmitted",
      key: "timeSubmitted",
      render: timestampFormatter,
    },
    {
      title: "Status",
      dataIndex: "result",
      key: "result",
      render: (text, record) => resultStatusDOM(record),
    },
  ];

  return (
    <Table dataSource={submissions} columns={columns} pagination={false} />
  );
};

export default RecentSubmissions;
