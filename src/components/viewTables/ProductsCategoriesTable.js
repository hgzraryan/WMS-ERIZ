/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from 'react'
import CustomTable from '../CustomTable';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { BiSolidInfoCircle } from "react-icons/bi";
import ProductCategoriesInfo from '../infoModals/ProductCategoriesInfo';
import ComponentToConfirm from '../ComponentToConfirm';
import "./../../dist/css/data-table.css";
import minusCircle from './../../dist/svg/minus-circle.svg'
import plusCircle from './../../dist/svg/plus-circle.svg'

import {
  useTable,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination,
  useRowSelect,
} from 'react-table'

function ProductsClassesTable({
  confirmRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  productCategories}) {
  const [modalData, setModalData] = useState(false);

  const handleOpenInfoModal = (data) => {
    
    setModalData((prev) => data);
  };
    const columns1 = useMemo(
        () => [
          {
            Header: () => null, 
            id: 'expander',
            Cell: ({ row }) =>
              row.canExpand ? ( // Only show expand button if the row has subRows
                <span {...row.getToggleRowExpandedProps()} style={{ cursor: 'pointer' }}>
                  {row.isExpanded ? <img alt='plus' src={minusCircle} style={{paddingLeft:'5px'}}/>: <img alt='plus' src={plusCircle} style={{paddingLeft:'5px'}}/>} {/* Show ▼ if expanded, ▶ if collapsed */}
                </span>
              ) : null, // Render nothing if no subRows
          },
          {
            Header: (event) => (
              <>
                
                <div  className="columnHeader">ID</div>
              </>
            ),
            accessor: "categoryId",
            sortable: true,
            width: 60,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="name">Անվանում</div>
              </>
            ),
            accessor: "name",
            sortable: true,
            width: 300,
            
          },
          {
            Header: (event) => (
              <>
                <div className="columnHeader">Գործողություններ</div>
              </>
            ),
            accessor: "actions",
            width: 200,
            Cell: ({ row }) => (
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <BiSolidInfoCircle
                  cursor={"pointer"}
                  size={"1.5rem"}
                  onClick={() => handleOpenInfoModal(row.original)}
                />
                </div>
                <div className="d-flex">
                  {/* <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title="Edit"
                    href="#"
                    //onClick={() => handleOpenEditModal(row.original)}
    
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <FeatherIcon icon="edit" />
                      </span>
                    </span>
                  </a> */}
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                    data-bs-toggle="tooltip"
                    onClick={() => handleOpenModal(row.original)}
                    data-placement="top"
                    title=""
                    data-bs-original-title="Delete"
                    href="#"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <FeatherIcon icon="trash" />
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            ),
            disableSortBy: true,
            
          },
          
        ],
        []
      );
    
      // Use the useTable hook to set up the table instance
      const getInitialExpandedState = (data) => {
        const expandedState = {};
        const setExpanded = (rows, parentId = '') => {
          rows.forEach((row, index) => {
            const rowId = parentId ? `${parentId}.${index}` : `${index}`;
            if (row.subRows && row.subRows.length > 0) {
              expandedState[rowId] = true;
              setExpanded(row.subRows, rowId);
            }
          });
        };
        setExpanded(data);
        return expandedState;
      };
    
      const initialExpandedState = getInitialExpandedState(productCategories);
    
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable(
        {
          columns:columns1,
          data:productCategories,
          initialState: { expanded: initialExpandedState }, 
        },
        useExpanded // Use the useExpanded hook to add expand/collapse functionality
      );
    
  return (
    <>
    {!!modalData && (
        <ProductCategoriesInfo data={modalData} setData={setModalData}/>
      )}
      <ComponentToConfirm
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
        handleDeleteItem={handleDeleteItem}
        selectedItemId={selectedItemId}
        confirmRef={confirmRef}
        keyName={selectedItem.name}
        delId={selectedItem.categoryId}
      />
          {/* <CustomTable data={productCategories} column={columns} /> */}
          <table {...getTableProps()} style={{ width: '60%', borderCollapse: 'collapse' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} style={{ borderBottom: '1px solid #ddd' }}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} style={{ padding: '8px', textAlign: 'left' }}>
                {column.render('Header')}
              </th>
            ))} 
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <React.Fragment key={row.id}>
              <tr {...row.getRowProps()} style={{ borderBottom: '1px solid #ddd' }}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '8px',
                      paddingLeft: `${row.depth * 20}px`, // Indentation based on depth
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>

    </>
  )
}

export default ProductsClassesTable
