import React from "react";

const Body = ({ prepareRow, rows, getTableBodyProps }) => {
  return (
    <tbody {...getTableBodyProps()}>
      {rows.map((row, i) => {
        prepareRow(row);

        return (
          <tr
            key={i}
            {...row.getRowProps()}
            className={`${i % 2 ? "bg-gray-200" : "bg-white"} `}
          >
            {row.cells.map((cell, index) => {
              return (
                <td
                  key={index}
                  {...cell.getCellProps()}
                  className="p-4 border border-black"
                >
                  {cell.render("Cell")}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default Body;
