import React, { useMemo, useState } from 'react'
import CustomTable from '../CustomTable';
import "../../dist/css/data-table.css";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import OutgoingProductsPrintModal from '../printModals/OutgoingProductsPrintModal';
import { BiSolidInfoCircle } from 'react-icons/bi';
function ProductMovementsTable({
    confirmRef,
    selectedItem,
    selectedItemId,
    handleDeleteItem,
    handleOpenModal,
    handleCloseModal,
    outgoingProducts,
    setProducts,
    refreshData,
    dataReceived
  }) {
    const [modalPrint, setModalPrint] = useState("");
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
                 {row.original?.outgoingProductId}
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
              accessor: "name",
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
              width: 150,
              
            },
            {
              Header: (event) => (
                <>
                  
                  <div  className="name">Շարժ</div>
                </>
              ),
              accessor: "action",
              sortable: true,
              width: 200,
              
            },
            {
                Header: (event) => (
                  <>
                    
                    <div  className="name">Շարժ</div>
                  </>
                ),
                accessor: "price",
                sortable: true,
                width: 200,
                
              },
            {
              Header: (event) => (
                <>
                  
                  <div  className="name">Քանակ</div>
                </>
              ),
              accessor: "quantity",
              sortable: true,
              Cell: ({ row }) => (
                <div className="d-flex align-items-center justify-content-center">
                 {row.original?.outgoingCount}
                </div>
              ),
              width: 100,
              
            },
           
           
          ],
          []
        );
    return (
      <>
       {!!modalPrint && (
        <OutgoingProductsPrintModal modalPrint={modalPrint} setModalPrint={setModalPrint} />
      )}
            <CustomTable data={outgoingProducts} column={columns} dataReceived={dataReceived}/>
  
      </>
    )
  }

export default ProductMovementsTable
