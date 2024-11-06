import React, { useMemo, useState } from 'react'
import CustomTable from '../CustomTable';
import "../../dist/css/data-table.css";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import OutgoingProductsPrintModal from '../printModals/OutgoingProductsPrintModal';
import { BiSolidInfoCircle } from 'react-icons/bi';
import { ColumnFilter } from '../ColumnFilter';
import { PRODUCTSMOVEMENTS__SEARCH_URL, PRODUCTSMOVEMENTS_URL } from '../../utils/constants';
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
                  
                  <div  className="columnHeader">ID</div>
                </>
              ),
              accessor: "outgoingProductId",
              sortable: true,
              Cell: ({ row }) => (
                <div className="d-flex align-items-center justify-content-center">
                 {row.original?.actionId }
                 {row.original?.actionType==='incoming'?<FeatherIcon icon='arrow-down'/>:row.original?.actionType==='outgoing'?<FeatherIcon icon='arrow-up'/>:'' }
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
              width: 350,
              
            },
            {
              Header: (event) => (
                <>
                  
                  <div  className="name">Ամսաթիվ</div>
                </>
              ),
              accessor: "actionDate",
              sortable: true,
              Filter: ({ column: { id } })=>(
                <ColumnFilter
                  id={id}
                  setData={setProductMovements}
                  data={productMovements}
                  placeholder={['startDate','endDate']}
                  getUrl={PRODUCTSMOVEMENTS_URL}
                  searchUrl={PRODUCTSMOVEMENTS__SEARCH_URL}
                  handleSearchPageCount={(val)=>handleSearchPageCount(val)}
                  filterData={filterData}
                  setFilterData={(newFilterData) => {
                      setFilterDataJSON(JSON.stringify({...filterData, ...newFilterData}))
                      setFilterData(newFilterData)   
                  }}
                />
              ),    
              width: 150,
              
            },
            {
                Header: (event) => (
                  <>
                    
                    <div  className="price">Գումար</div>
                  </>
                ),
                accessor: "price",
                sortable: true,
                width: 200,
                
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
                <div className="d-flex align-items-center justify-content-center">
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
                  
                  <div  className="quantity">Վարորդ</div>
                </>
              ),
              accessor: "driver",
              sortable: true,
              width: 200,              
            },    
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
