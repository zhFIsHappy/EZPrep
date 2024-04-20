import React from "react";
import { Table } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import { ProblemSubmissionInfo } from "../../reducers/ProblemInfo";

interface Props {
  submissions: ProblemSubmissionInfo[];
}

const RecentSubmissions: React.FC<Props> = ({ submissions }) => {
  const columns = [
    {
      title: "Problem_ID",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Problem_Name",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Submission_Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return <Table dataSource={submissions} columns={columns} />;
};

export default RecentSubmissions;
