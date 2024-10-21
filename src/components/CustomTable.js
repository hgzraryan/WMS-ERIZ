import React from 'react'
import { useBlockLayout, useFilters, useGlobalFilter,useResizeColumns, useRowSelect, useSortBy, useTable } from "react-table";
import { Checkbox } from './Checkbox';
import emptyTable from "../dist/svg/emptyTable.svg"
import "../dist/css/data-table.css";

function CustomTable({data,column,dataReceived}) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 20,
      maxWidth: 400,
      Filter: ({ column: { id } }) => <></>,
    }),
    []
  );  
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        state,
        prepareRow,
        selectedFlatRows,
        toggleHideColumn,
        setGlobalFilter,

      } = useTable(
        {
          columns:column,
          data: data,
          defaultColumn
        },
        useFilters,
        useGlobalFilter,  // Enable global filtering
        useBlockLayout,
        useResizeColumns,
        useSortBy,
        useRowSelect,
        (hooks) => {
          hooks.visibleColumns.push((columns) => [
            {
              id: "selection",
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <Checkbox {...getToggleAllRowsSelectedProps()} />
              ),
              Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
            },
            ...columns,
          ]);
        }
      );
  return (
    <>    
    <table className="table nowrap w-100 mb-5 dataTable no-footer" {...getTableProps()}>
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th  {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.id !== "selection" && (
                <div className="d-flex justify-content-between  align-items-center">
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                      <div style={{overflow:'hidden'}}>{column.render("Header")}</div>
                    
                        <div style={{ paddingTop: "40px" }}>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <span className="sorting_asc"></span>
                            ) : (
                              <span className="sorting_desc"></span>
                            )
                          ) : (
                            <span className="sorting"></span>
                          )}
                        </div>
                        

                      </div>
                  )}
                <div
                  {...column.getResizerProps({onClick(ev){ev.stopPropagation()}})}
                  className={`resizer ${
                  column.isResizing ? "isResizing" : ""
                }`}
                />
              </th>
          ))}
        </tr>
      ))}
    </thead>
      {data?.length > 0 ? (
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps({
                style: { width: '100%' },
               // onClick: () => handleRowClick(row) // Attach onClick event handler
              })}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps({
                    style: cell.column.style // Apply custom style to the column cells
                  })}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
       ):dataReceived?(
        <tr class="table-placeholder">
          <td class="table-cell" >
            <div class="empty-normal">
              <div class="empty-image d-flex justify-content-center align-items-center">
                <img src={emptyTable} alt='emptyTable'/>
              </div>
              <div class="empty-description d-flex justify-content-center align-items-center mb-2">Տվյալներ չկան</div>
            </div>
          </td>
        </tr>
       ):<></>}       
    </table>
    </>
  )
}

export default CustomTable
