import React from 'react'
import { useBlockLayout, useFilters, useGlobalFilter, useRowSelect, useSortBy, useTable } from "react-table";

import emptyTable from "./../../dist/svg/emptyTable.svg"
import "../../dist/css/data-table.css";

function TotalView({data,column,dataReceived}) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 20,
      maxWidth: 200,
      Filter: ({ column: { id } }) => <></>,
    }),
    []
  );  
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,

      } = useTable(
        {
          columns:column,
          data: data,
          defaultColumn
        },
        useFilters,
        useGlobalFilter,  // Enable global filtering
        useBlockLayout,
        //useResizeColumns,
        useSortBy,
        useRowSelect,
        // (hooks) => {
        //   hooks.visibleColumns.push((columns) => [
        //     {
        //       id: "selection",
        //       Header: ({ getToggleAllRowsSelectedProps }) => (
        //         <Checkbox {...getToggleAllRowsSelectedProps()} />
        //       ),
        //       Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        //     },
        //     ...columns,
        //   ]);
        // }
      );
  return (
    <>    
    <table className="table  mb-5 dataTable no-footer total-view-table p-1 " style={{ }}{...getTableProps()}>
    <thead >
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      {data?.length > 0 ? (
       <tbody {...getTableBodyProps()}>
       {rows.map((row, i) => {
         prepareRow(row)
         return (
           <tr {...row.getRowProps()} style={{maxHeight:'35px !important'}}>
             {row.cells.map(cell => {
               return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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

export default TotalView

