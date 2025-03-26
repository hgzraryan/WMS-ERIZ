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
  productCategories,
  dataReceived}) {
  const [modalData, setModalData] = useState(false);

  const handleOpenInfoModal = (data) => {
    
    setModalData((prev) => data);
  };
    const columns1 = useMemo(
        () => [
          // {
          //   Header: () => null, 
          //   id: 'expander',
          //   Cell: ({ row }) =>
          //     row.canExpand ? ( // Only show expand button if the row has subRows
          //       <span {...row.getToggleRowExpandedProps()} style={{ cursor: 'pointer' }}>
          //         {row.isExpanded ? <img alt='plus' src={minusCircle} style={{paddingLeft:'5px'}}/>: <img alt='plus' src={plusCircle} style={{paddingLeft:'5px'}}/>} {/* Show ▼ if expanded, ▶ if collapsed */}
          //       </span>
          //     ) : null, // Render nothing if no subRows
          // },
          {
            Header: (event) => (
              <>
                
                <div  className="columnHeader">Հ/Հ</div>
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
              <div className="d-flex align-items-center gap-2">
              <div className="d-flex">
           <BiSolidInfoCircle
           cursor={"pointer"}
           size={"1.3rem"}
           onClick={() => handleOpenInfoModal(row.original)}
         />
         </div>
         <div className="d-flex gap-2">
           <div style={{ cursor: "pointer" }}>

             <span className="icon"
               onClick={() => handleOpenModal(row.original)}                >
               <span className="feather-icon">
                 <FeatherIcon icon="trash" />
               </span>
             </span>
           </div>
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
          <CustomTable data={productCategories} column={columns1} dataReceived={dataReceived} />
        
    </>
  )
}

export default ProductsClassesTable
