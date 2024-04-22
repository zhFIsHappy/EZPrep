import React from "react";
import { Table } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import { SubmissionResponseInfo } from "../../types";
import { timestampFormatter } from "../../utils/DateFormatter";

interface Props {
  submissions: SubmissionResponseInfo[];
}

const RecentSubmissions: React.FC<Props> = ({ submissions }, index) => {
  const columns = [
    {
      title: "Problem_ID",
      dataIndex: "problemId",
      key: "problemId",
    },
    {
      title: "Problem_Title",
      dataIndex: "problemTitle",
      key: "problemTitle",
    },
    {
      title: "Submission_Date",
      dataIndex: "timeSubmitted",
      key: "timeSubmitted",
      render: timestampFormatter,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <Table dataSource={submissions} columns={columns} pagination={false} />
  );
};

export default RecentSubmissions;
