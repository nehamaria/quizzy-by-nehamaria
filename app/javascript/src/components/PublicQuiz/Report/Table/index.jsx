import React, { useState } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Typography, Button, PageLoader } from "@bigbinary/neetoui/v2";
import { useTable, useSortBy } from "react-table";

import Body from "./Body";
import Header from "./Header";

import reportApi from "../../../../apis/report";

const Table = ({ reports }) => {
  const [downloading, setDownloading] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [jobId, setJobId] = useState("");
  const columns = React.useMemo(
    () => [
      {
        Header: "Quiz Name",
        accessor: "quiz_name",
      },
      {
        Header: "User Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Correct Answer",
        accessor: "correct",
      },
      {
        Header: "Incorrect Answer",
        accessor: "incorrect",
      },
    ],
    []
  );

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const response = await reportApi.exports();
      const jobId = response.data.jid;
      const interval = setInterval(async () => {
        const jobStatus = await reportApi.exports_status(jobId);
        if (jobStatus.data.status === "complete") {
          setDownloading(false);
          setShowDownload(true);
          setJobId(jobId);
          clearInterval(interval);
        }
      }, 800);
    } catch (error) {
      logger.error(error);
    }
  };

  const downloadReport = () => {
    window.location.href = `/export_download?id=${jobId}`;
  };
  const data = React.useMemo(() => {
    return reports.map(report => {
      return {
        quiz_name: report.quiz_name,
        name: `${report.first_name} ${report.last_name}`,
        email: report.email,
        correct: report.correct_answers,
        incorrect: report.incorrect_answers,
      };
    });
  }, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <div className="px-5">
      <div className="flex w-full justify-between mt-5 pb-10">
        <Typography style="h2" className="">
          Reports
        </Typography>
        {!downloading && !showDownload && (
          <Button
            label="Download"
            size="large"
            icon={Download}
            iconPosition="left"
            onClick={handleDownload}
          />
        )}
      </div>
      {downloading ? (
        <div className="py-24">
          <PageLoader text="Your report is being prepared for downloading" />
        </div>
      ) : showDownload ? (
        <div className="flex flex-col items-center mt-28 space-y-4">
          <Typography style="h4">Report is now ready for download</Typography>
          <Button
            label="Download Report"
            size="large"
            icon={Download}
            iconPosition="left"
            onClick={downloadReport}
          />
        </div>
      ) : (
        <table {...getTableProps()} className="w-full ">
          <Header headerGroups={headerGroups} />

          <Body
            prepareRow={prepareRow}
            rows={rows}
            getTableBodyProps={getTableBodyProps}
          />
        </table>
      )}
    </div>
  );
};

export default Table;
