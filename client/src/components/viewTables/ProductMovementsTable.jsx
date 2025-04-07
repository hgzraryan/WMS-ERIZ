import React, { useMemo, useState } from 'react'
import CustomTable from '../CustomTable';
import "../../dist/css/data-table.css";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import OutgoingProductsPrintModal from '../printModals/OutgoingProductsPrintModal';
import { BiSolidInfoCircle } from 'react-icons/bi';
import { ColumnFilter } from '../ColumnFilter';
import { PRODUCTSMOVEMENTS__SEARCH_URL, PRODUCTSMOVEMENTS_ROUTE, PRODUCTSMOVEMENTS_URL } from '../../utils/constants';
function ProductMovementsTable({
    confirmRef,
    selectedItem,
    selectedItemId,
    handleDeleteItem,
    handleOpenModal,
    handleCloseModal,
    productMovements,
    setProductMovements,
    refreshData,
    handleSearchPageCount,
    dataReceived
  }) {
    const [modalPrint, setModalPrint] = useState("");
    const [filterData, setFilterData] = useState({});
    const [filterDataJSON, setFilterDataJSON] = useState('');
    const handleOpenPrintModal = (data) => {
      setModalPrint((prev) => data);
      
    }; 
      const columns = useMemo(
          () => [
            {
              Header: (event) => (
                <>
                  <div  className="columnHeader">Հ/Հ</div>
                </>
              ),
              accessor: "outgoingProductId",
              sortable: true,
              Cell: ({ row }) => (
                <div className="d-flex align-items-center justify-content-center gap-2">
                 {row.original?.actionId }
                 {row.original?.actionType==='incoming'
                 ?<FeatherIcon icon='arrow-down'/>
                 :row.original?.actionType==='outgoing'
                 ?<FeatherIcon icon='arrow-up'/>
                 :'' }
                 {}
                </div>
              ),
              width: 80,
              
            },
            {
              Header: (event) => (
                <>
                  
                  <div  className="name">Անվանում</div>
                </>
              ),
              accessor: "productName",
              sortable: true,
              width: 250,
              // Filter: ({ column: { id } })=>(
              //   <ColumnFilter
              //     id={id}
              //     setData={setProductMovements}
              //     data={productMovements}
              //     placeholder={'Անվանում'}
              //     getUrl={PRODUCTSMOVEMENTS_URL}
              //     searchUrl={PRODUCTSMOVEMENTS__SEARCH_URL}
              //     handleSearchPageCount={(val)=>handleSearchPageCount(val)}
              //     filterData={filterData}
              //     setFilterData={(newFilterData) => {
              //         setFilterDataJSON(JSON.stringify({...filterData, ...newFilterData}))
              //         setFilterData(newFilterData)   
              //     }}
              //   />
              // ),    
                       },
            {
              Header: (event) => (
                <>
                  
                  <div  className="name">Ամսաթիվ</div>
                </>
              ),
              accessor: "actionDate",
              sortable: true,
              // Filter: ({ column: { id } })=>(
              //   <ColumnFilter
              //     id={id}
              //     setData={setProductMovements}
              //     data={productMovements}
              //     placeholder={['startDate','endDate']}
              //     getUrl={PRODUCTSMOVEMENTS_URL}
              //     searchUrl={PRODUCTSMOVEMENTS__SEARCH_URL}
              //     handleSearchPageCount={(val)=>handleSearchPageCount(val)}
              //     filterData={filterData}
              //     setFilterData={(newFilterData) => {
              //         setFilterDataJSON(JSON.stringify({...filterData, ...newFilterData}))
              //         setFilterData(newFilterData)   
              //     }}
              //   />
              // ),    
              width: 150,
              
            },
            {
              Header: (event) => (
                <>
                  
                  <div  className="name">Արտ․ ամսաթիվ</div>
                </>
              ),
              accessor: "producedDate",
              sortable: true,
              // Filter: ({ column: { id } })=>(
              //   <ColumnFilter
              //     id={id}
              //     setData={setProductMovements}
              //     data={productMovements}
              //     placeholder={['startDate','endDate']}
              //     getUrl={PRODUCTSMOVEMENTS_URL}
              //     searchUrl={PRODUCTSMOVEMENTS__SEARCH_URL}
              //     handleSearchPageCount={(val)=>handleSearchPageCount(val)}
              //     filterData={filterData}
              //     setFilterData={(newFilterData) => {
              //         setFilterDataJSON(JSON.stringify({...filterData, ...newFilterData}))
              //         setFilterData(newFilterData)   
              //     }}
              //   />
              // ),    
              width: 120,
              
            },
            {
                Header: (event) => (
                  <>
                    
                    <div  className="price">Առքի գին</div>
                  </>
                ),
                accessor: "price",
                sortable: true,
                Cell: ({ row }) => (
                  <div className="d-flex align-items-center justify-content-center">
                   {row.original?.price}
                  </div>
                ),
                width: 100,
                
              },
            {
                Header: (event) => (
                  <>
                    
                    <div  className="price">Վաճառքի գին</div>
                  </>
                ),
                accessor: "sellingPrice",
                sortable: true,
                width: 100,
                Cell: ({ row }) => (
                  <div className="d-flex align-items-center justify-content-center">
                   {row.original?.sellingPrice?row.original?.sellingPrice:'-'}
                  </div>
                ),
                
              },
            {
              Header: (event) => (
                <>
                  
                  <div  className="quantity">Քանակ</div>
                </>
              ),
              accessor: "quantity",
              sortable: true,
              Cell: ({ row }) => (
                <div className="">
                 {row.original?.quantity+" " +row.original?.unit}
                </div>
              ),
              width: 100,              
            },    
            {
              Header: (event) => (
                <>
                  
                  <div  className="quantity">Մնացորդ</div>
                </>
              ),
              accessor: "balance",
              sortable: true,
              Cell: ({ row }) => (
                <div className="d-flex align-items-center justify-content-center">
                 {row.original?.balance}
                </div>
              ),
              width: 100,              
            },    
            {
              Header: (event) => (
                <>
                  
                  <div  className="quantity1">Գործընկեր</div>
                </>
              ),
              accessor: "partnerName",
              sortable: true,
              Cell: ({ row }) => (
                <div className="d-flex align-items-center justify-content-center">
                 {row.original?.partnerName || row.original?.warehouse}
                </div>
              ),
              width: 200,              
            },        
            // {
            //   Header: (event) => (
            //     <>
                  
            //       <div  className="quantity">Վարորդ</div>
            //     </>
            //   ),
            //   accessor: "driver",
            //   sortable: true,
            //   width: 200,              
            // },    
            {
              Header: (event) => (
                <>
                  
                  <div  className="quantity">Պահեստ</div>
                </>
              ),
              accessor: "warehouse",
              sortable: true,
              width: 200,              
            },    
          ],
          []
        );
    return (
      <>
       {!!modalPrint && (
        <OutgoingProductsPrintModal modalPrint={modalPrint} setModalPrint={setModalPrint} />
      )}
            <CustomTable data={productMovements} column={columns} dataReceived={dataReceived}/>
  
      </>
    )
  }

export default ProductMovementsTable
