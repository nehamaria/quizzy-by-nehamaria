import React from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { useTable, useSortBy } from "react-table";

import Body from "./Body";
import Header from "./Header";

const Table = ({ reports }) => {
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
        <Button
          label="Download"
          size="large"
          icon={Download}
          iconPosition="left"
        />
      </div>
      <table {...getTableProps()} className="w-full ">
        <Header headerGroups={headerGroups} />

        <Body
          prepareRow={prepareRow}
          rows={rows}
          getTableBodyProps={getTableBodyProps}
        />
      </table>
    </div>
  );
};

export default Table;
