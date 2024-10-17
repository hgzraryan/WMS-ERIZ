/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from 'react'
import ComponentToConfirm from '../ComponentToConfirm';
import Table from "../Table";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { BiSolidInfoCircle } from 'react-icons/bi';
const asd = [
    {
        workerPositionId:11001,
        name:'Pahestapet',
        status:'Active',

    }
]
function WorkersPositionsTable({
    confirmRef,
    selectedItem,
    selectedItemId,
    handleDeleteItem,
    handleOpenModal,
    handleCloseModal,
    workerRoles,
    setWorkerRoles,
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
            accessor: "workerPositionId",
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
               
                <div  className="columnHeader">Կարգավիճակ</div>
              </>
            ),
            accessor: "isActive",
            Cell: ({ row }) => (
              <div className="d-flex align-items-center justify-content-center">
                {console.log(row)}
              {row.original?.isActive===1?'Ակտիվ':row.original?.isActive===0?'Պասիվ':'scsd'}
              </div>
            ),
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
      {/* {
      editRow &&(
        <CustomerEdit customer={editRow} setEditRow={setEditRow} refreshData={refreshData}/>
      )
    } */}
            <ComponentToConfirm
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
              handleDeleteItem={handleDeleteItem}
              selectedItemId={selectedItemId}
              confirmRef={confirmRef}
              keyName={selectedItem.name}
              delId={selectedItem.customerId}
            />
                <Table data={workerRoles} column={columns}/>

    </>
  )
}

export default WorkersPositionsTable
