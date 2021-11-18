import React, { useState } from "react";

import { Delete, Edit } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui/v2";
import { useTable } from "react-table";

import DeleteModal from "components/Common/DeleteModal";

import Body from "./Body";
import Header from "./Header";

const QuizTable = ({ quizzes, destroyQuiz }) => {
  const [id, setId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ cell }) => (
          <Button
            style="link"
            to={{
              pathname: `quizzes/${cell.row.original.id}/show`,
            }}
            label={
              <Typography className="text-black">
                {cell.row.original.title}
              </Typography>
            }
          />
        ),
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
            onClick={() => {
              setId(cell.row.original.id);
              setShowDeleteModal(true);
            }}
          />
        ),
      },
    ],
    []
  );
  const data = React.useMemo(() => quizzes, [quizzes]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <>
      <Typography style="h2" className="pb-10 ">
        List of Quizzes
      </Typography>
      <table {...getTableProps()} className="w-full ">
        <Header headerGroups={headerGroups} />

        <Body
          prepareRow={prepareRow}
          rows={rows}
          getTableBodyProps={getTableBodyProps}
        />
      </table>
      {showDeleteModal && (
        <DeleteModal
          id={id}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          destroyItem={destroyQuiz}
          item="quiz"
        />
      )}
    </>
  );
};

export default QuizTable;
