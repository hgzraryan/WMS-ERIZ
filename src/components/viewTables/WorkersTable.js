/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from 'react'
import { BiSolidInfoCircle } from 'react-icons/bi';
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Table from '../Table';

function WorkersTable({
    confirmRef,
    selectedItem,
    selectedItemId,
    handleDeleteItem,
    handleOpenModal,
    handleCloseModal,
    workers,
    setWorkers,
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
            accessor: "workerId",
            sortable: true,
            width: 80,
            
          },
          {
            Header: (event) => (
              <>                
                <div  className="columnHeader">Անուն Ազգանուն</div>
              </>
            ),
            accessor: "name",
            sortable: true,
            width: 300,
            
          },
          {
            Header: (event) => (
              <>                
                <div  className="columnHeader">Հասցե</div>
              </>
            ),
            accessor: "address",
            sortable: true,
            width: 300,
            
          },
          {
            Header: (event) => (
              <>                
                <div  className="columnHeader">Հեռախոս</div>
              </>
            ),
            accessor: "phone",
            sortable: true,
            width: 300,
            
          },
          {
            Header: (event) => (
              <>                
                <div  className="columnHeader">Էլ․ հասցե</div>
              </>
            ),
            accessor: "email",
            sortable: true,
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
          {/* <ComponentToConfirm
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
              handleDeleteItem={handleDeleteItem}
              selectedItemId={selectedItemId}
              confirmRef={confirmRef}
              keyName={selectedItem.name}
              delId={selectedItem.customerId}
            /> */}
                <Table data={workers} column={columns}/>
    </>
  )
}

export default WorkersTable
