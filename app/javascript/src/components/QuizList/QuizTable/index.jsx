import React from "react";

import { Delete, Edit } from "@bigbinary/neeto-icons";
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
        id: "Edit",
        accessor: "edit",
        Cell: ({ cell }) => (
          <Button
            style="link"
            to={{
              pathname: `/${cell.row.original.id}/update`,
              state: { title: cell.row.original.title },
            }}
            icon={() => <Edit />}
            iconPosition="left"
            label={<Typography className="flex gap-x-2 p-1">Edit</Typography>}
          />
        ),
      },
      {
        id: "Delete",
        accessor: "delete",
        Cell: ({ cell }) => (
          <Button
            style="text"
            icon={() => <Delete />}
            iconPosition="left"
            label={<Typography className="flex gap-x-2 p-1">Delete</Typography>}
            onClick={() => destroyQuiz(cell.row.original.id)}
          />
        ),
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
    <>
      <Typography style="h2">List of Quizzes</Typography>
      <table {...getTableProps()} className="w-full ">
        <Header headerGroups={headerGroups} />

        <Body
          prepareRow={prepareRow}
          rows={rows}
          getTableBodyProps={getTableBodyProps}
        />
      </table>
    </>
  );
};

export default QuizTable;
