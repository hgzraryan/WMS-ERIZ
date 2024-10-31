/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from 'react'
import CustomTable from '../CustomTable';
import "../../dist/css/data-table.css";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import OutgoingProductsPrintModal from '../printModals/OutgoingProductsPrintModal';
import { BiSolidInfoCircle } from 'react-icons/bi';

function OutgoingProductsTable({
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
                  
                  <div  className="name">Ելքի ամսաթիվ</div>
                </>
              ),
              accessor: "actionDate",
              sortable: true,
              width: 150,
              
            },
            {
              Header: (event) => (
                <>
                  
                  <div  className="name">Հաճախորդ</div>
                </>
              ),
              accessor: "customer",
              sortable: true,
              width: 200,
              
            },
            {
              Header: (event) => (
                <>
                  
                  <div  className="name">Քանակ</div>
                </>
              ),
              accessor: "outgoingCount",
              sortable: true,
              Cell: ({ row }) => (
                <div className="d-flex align-items-center justify-content-center">
                 {row.original?.outgoingCount}
                </div>
              ),
              width: 100,
              
            },
            {
              Header: (event) => (
                <>
                  
                  <div  className="name">Մնացորդ</div>
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
                  
                  <div  className="name">Արժեք</div>
                </>
              ),
              accessor: "price",
              sortable: true,
              Cell: ({ row }) => (
                <div className="d-flex align-items-center justify-content-center">
                 {row.original?.price}
                </div>
              ),
              width: 150,
              
            },
            {
              Header: (event) => (
                <>
                  
                  <div  className="name">Արժույթ</div>
                </>
              ),
              accessor: "currency",
              sortable: true,
              width: 100,
              
            },
            {
              Header: (event) => (
                <>
                  
                  <div  className="name">Պահեստ</div>
                </>
              ),
              accessor: "warehouse",
              sortable: true,
              width: 200,
              
            },
            {
              Header: (event) => (
                <>
                  <div className="columnHeader">Գործողություններ</div>
                </>
              ),
              accessor: "actions",
              width: 150,
              Cell: ({ row }) => (
                <div className="d-flex align-items-center">
                  {/* <BiSolidInfoCircle
                cursor={"pointer"}
                size={"1.5rem"}
                //onClick={() => handleOpenInfoModal(row.original)}
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
       {!!modalPrint && (
        <OutgoingProductsPrintModal modalPrint={modalPrint} setModalPrint={setModalPrint} />
      )}
            <CustomTable data={outgoingProducts} column={columns} dataReceived={dataReceived}/>
  
      </>
    )
  }

export default OutgoingProductsTable
