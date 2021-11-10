import React from "react";

const Header = ({ headerGroups }) => {
  return (
    <thead className="text-left bg-gray-300 ">
      {headerGroups.map((headerGroup, index) => (
        <tr key={index} {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column, index) => (
            <th key={index} {...column.getHeaderProps()} className="p-4">
              {column.render("Header")}{" "}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default Header;
