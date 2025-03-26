/* eslint-disable jsx-a11y/anchor-is-valid */
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import React, { useMemo, useState } from 'react'
import { BiSolidInfoCircle } from "react-icons/bi";
import ComponentToConfirm from '../ComponentToConfirm';
import CustomerEdit from '../editModals/CustomerEdit';
import CustomTable from '../CustomTable';

function CustomersTable({
    confirmRef,
    selectedItem,
    selectedItemId,
    handleDeleteItem,
    handleOpenModal,
    handleCloseModal,
    customers,
    setCustomers,
    refreshData
  }) {
    const [editRow, setEditRow] = useState(false);
    const handleOpenEditModal = (value) => {
      setEditRow((prev) => value);
      console.log(value)
    };
      const columns = useMemo(
        () => [
          {
            Header: (event) => (
              <>                
                <div  className="columnHeader">ID</div>
              </>
            ),
            accessor: "customerId",
            sortable: true,
            width: 80,
            
          },
          {
            Header: (event) => (
              <>                
                <div  className="columnHeader">Անվանում</div>
              </>
            ),
            accessor: "name",
            sortable: true,
            width: 300,
            
          },
          {
            Header: (event) => (
              <>
                <div>Կազմ․ Ձև</div>
              </>
            ),
            accessor: "legalForm",
            width: 200,
            sortable: true,
            // Cell: ({ row }) => (
            //   <div className="d-flex align-items-center">
                
            //   </div>
            // ),
          },
          {
            Header: (event) => (
              <>
                <div>Հեռախոս</div>
              </>
            ),
            accessor: "phone",
            width: 200,
            Cell: ({ row }) => (
              <div className="d-flex align-items-center">
                {row.original?.contact?.phone}
              </div>
            ),
            
          },
          {
            Header: (event) => (
              <>
               
                <div  className="columnHeader">Արժույթ</div>
              </>
            ),
            accessor: "mainCurrency",
            style: {
               // Custom style for the 'description' column
            },
            width: 300,
            
          },
          {
            Header: (event) => (
              <>
               
                <div  className="columnHeader">Գնացուցակ</div>
              </>
            ),
            accessor: "priceList",
            width: 300,
          },
          {
            Header: (event) => (
              <>
               
                <div  className="columnHeader">Կարգավիճակ</div>
              </>
            ),
            accessor: "status",
            width: 300,
          },
          {
            Header: (event) => (
              <>
                <div className="columnHeader">Գործողություններ</div>
              </>
            ),
            accessor: "actions",
            width: 300,
            Cell: ({ row }) => (
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <BiSolidInfoCircle
                  cursor={"pointer"}
                  size={"1.5rem"}
                  //onClick={() => handleOpenInfoModal(row.original)}
                />
                </div>
                <div className="d-flex">
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title="Edit"
                    href="#"
                    onClick={() => handleOpenEditModal(row.original)}
    
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <FeatherIcon icon="edit" />
                      </span>
                    </span>
                  </a>
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
      
  return (
    <>
      {
      editRow &&(
        <CustomerEdit customer={editRow} setEditRow={setEditRow} refreshData={refreshData}/>
      )
    }
            <ComponentToConfirm
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
              handleDeleteItem={handleDeleteItem}
              selectedItemId={selectedItemId}
              confirmRef={confirmRef}
              keyName={selectedItem.name}
              delId={selectedItem.customerId}
            />
                <CustomTable data={customers} column={columns} dataReceived={true}/>

    </>
  )
}

export default CustomersTable
