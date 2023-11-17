import React from 'react'
import ComponentToConfirm from './ComponentToConfirm';
import { useSortBy, useTable } from 'react-table';

function CustomTable({confirmRef,
    selectedItem,
    selectedItemId,
    tableData,
    handleDeleteItem,
    handleOpenModal,
    handleCloseModal,
    columns,

    }) {
        const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: tableData,
      },
      useSortBy
    );
    return (
        <table className="table nowrap w-100 mb-5 dataTable no-footer">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th //className="sorting"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <span className="sorting_asc"></span>
                      ) : (
                        <span className="sorting_desc"></span>
                      )
                    ) : (
                      <span className="sorting"></span>
                    )}
    
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {tableData?.length && (
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
              <ComponentToConfirm
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
                handleDeleteItem={handleDeleteItem}
                selectedItemId={selectedItemId}
                confirmUserRef={confirmRef}
                userName={selectedItem.username}
                userId={selectedItem._id}
              />
            </tbody>
          )}{" "}
        </table>
      );
}

export default CustomTable
