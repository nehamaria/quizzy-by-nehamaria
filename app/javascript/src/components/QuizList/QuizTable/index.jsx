import React from "react";

import { Delete } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui/v2";
import { useTable } from "react-table";

import Body from "./Body";
import Header from "./Header";

const QuizTable = ({ quizList, destroyQuiz }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        id: "Delete",
        accessor: "delete",
        Cell: ({ cell }) => {
          // console.log(cell.row.original.id);
          return (
            <Button
              icon={() => <Delete />}
              iconPosition="left"
              label={
                <Typography className="flex gap-x-2 p-1">Delete</Typography>
              }
              onClick={() => destroyQuiz(cell.row.original.id)}
            />
          );
        },
      },
    ],
    []
  );
  const data = React.useMemo(() => quizList, [quizList]);
  // console.log(quizList);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()} className="w-full max-w-6xl">
      <Header headerGroups={headerGroups} />

      <Body
        prepareRow={prepareRow}
        rows={rows}
        getTableBodyProps={getTableBodyProps}
      />
    </table>
  );
};

export default QuizTable;
