import React from "react";

import { Up, Down } from "@bigbinary/neeto-icons";

const Header = ({ headerGroups }) => {
  return (
    <thead className="text-left bg-gray-400 ">
      {headerGroups.map((headerGroup, index) => (
        <tr key={index} {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column, idx) => (
            <th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              key={idx}
              className="p-5 border border-black"
            >
              {column.render("Header")}
              <span className="inline">
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <Down size={16} className="inline" />
                  ) : (
                    <Up size={16} className="inline" />
                  )
                ) : (
                  ""
                )}
              </span>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default Header;
