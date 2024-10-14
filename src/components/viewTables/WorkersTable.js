/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from 'react'
import { BiSolidInfoCircle } from 'react-icons/bi';
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Table from '../Table';
import WorkersEdit from '../editModals/WorkersEdit';

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
                <div  className="fullName">Անուն Ազգանուն</div>
              </>
            ),
            accessor: "fullName",
            sortable: true,
            width: 300,
            
          },
          {
            Header: (event) => (
              <>                
                <div  className="columnAddress">Հասցե</div>
              </>
            ),
            Cell: ({row}) => (
              <>        
              {console.log(row)}        
                <div  className="columnHeader">{row?.original?.contact?.address?.city + "," +row?.original?.contact?.address?.street}</div>
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
            Cell: ({row}) => (
              <>        
              {console.log(row)}        
                <div  className="phone">{row?.original?.contact?.phone}</div>
              </>
            ),
            accessor: "phone",
            sortable: true,
            width: 200,
            
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
            Cell: ({row}) => (
              <>        
              {console.log(row)}     
                <div  className="phone">{row?.original?.contact?.email}</div>
              </>
            ),
          },
          {
            Header: (event) => (
              <>
               
                <div  className="columnHeader">Կարգավիճակ</div>
              </>
            ),
            Cell: ({row}) => (
              <>        
              {console.log(row)}     
                <div  className="phone">{row?.original?.isActive}</div>
              </>
            ),
            accessor: "status",
            width: 180,
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
    {!!editRow &&(
    <WorkersEdit worker={editRow} setEditRow={setEditRow} refreshData={refreshData}/>
  )
}
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
