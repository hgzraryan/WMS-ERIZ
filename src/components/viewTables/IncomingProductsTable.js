/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from 'react'
import CustomTable from '../CustomTable';
import "../../dist/css/data-table.css";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { BiSolidInfoCircle } from 'react-icons/bi';
import IncomingProductsPrintModal from '../printModals/IncomingProductsPrintModal';

function IncomingProductsTable({
  confirmRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  products,
  setProducts,
  refreshData,
  dataReceived
}) {
  const [modalPrint, setModalPrint] = useState("");
  const [modalInfo, setModalInfo] = useState(false);
  const handleOpenInfoModal = (data) => {
    
    setModalInfo((prev) => data);
  };
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
            accessor: "productId",
            sortable: true,
            width: 100,
            
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
                
                <div  className="name">Դասակարգ</div>
              </>
            ),
            accessor: "productCategory",
            sortable: true,
            width: 200,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="name">Արժեք</div>
              </>
            ),
            accessor: "price",
            sortable: true,
            width: 100,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="name">Արժույթ</div>
              </>
            ),
            accessor: "currency",
            sortable: true,
            width: 80,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="name">Մատակարար</div>
              </>
            ),
            accessor: "supplierName",
            sortable: true,
            width: 200,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="name">Պահեստ</div>
              </>
            ),
            accessor: "warehouseName",
            sortable: true,
            width: 150,
            
          },
          {
            Header: (event) => (
              <>
                <div className="columnHeader">Գործողություններ</div>
              </>
            ),
            accessor: "actions",
            width: 250,
            Cell: ({ row }) => (
              <div className="d-flex align-items-center">
                {/* <BiSolidInfoCircle
              cursor={"pointer"}
              size={"1.5rem"}
              onClick={() => handleOpenInfoModal(row.original)}
            /> */}
                <div className="d-flex">
                
                <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title="Print"
                    href="#"
                    onClick={() => handleOpenPrintModal(row.original)}
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <FeatherIcon icon="printer" />
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
  return (
    <>
    {/* {!!modalInfo && (
        <IncomingsProductsInfoModal modalInfo={modalInfo} setModalInfo={setModalInfo}/>
      )} */}
       {!!modalPrint && (
        <IncomingProductsPrintModal modalPrint={modalPrint} setModalPrint={setModalPrint} />
      )}
          <CustomTable data={products} column={columns} dataReceived={dataReceived}/>

    </>
  )
}


export default IncomingProductsTable
