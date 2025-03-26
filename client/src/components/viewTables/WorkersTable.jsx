import React, { useMemo, useState } from 'react'
import { BiSolidInfoCircle } from 'react-icons/bi';
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import WorkersEdit from '../editModals/WorkersEdit';
import WorkersInfoModal from '../infoModals/WorkersInfoModal';
import CustomTable from '../CustomTable';

function WorkersTable({
    confirmRef,
    selectedItem,
    selectedItemId,
    handleDeleteItem,
    handleOpenModal,
    handleCloseModal,
    workers,
    setWorkers,
    refreshData,
    dataReceived
  }) {
    const [editRow, setEditRow] = useState(false);
    const [modalInfo, setModalInfo] = useState(false);

    const handleOpenInfoModal = (data) => {
       
       setModalInfo((prev) => data);
     };
    const handleOpenEditModal = (value) => {
      setEditRow((prev) => value);
      console.log(value)
    };
      const columns = useMemo(
        () => [
          {
            Header: (event) => (
              <>                
                <div  className="columnHeader">Հ/Հ</div>
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
            Cell: ({ row }) => (
              <div className="d-flex align-items-center justify-content-center">
                {console.log(row)}
              {row.original?.isActive===1?'Ակտիվ':row.original?.isActive===0?'Պասիվ':'scsd'}
              </div>
            ),
            accessor: "status",
            width: 180,
          },
          {
            Header: (event) => (
              <>
                <div  className="columnHeader">Պաշտոն</div>
              </>
            ),
            Cell: ({ row }) => (
              <div >
              {
                row?.original?.workerRoleType === "driver"
                ? "Վարորդ"
                : row?.original?.workerRoleType === "keeper"
                ? "Պահեստապետ"
                : row?.original?.workerRoleType === "worker"
                ? "Աշխատակից"
                : "Unknown"
              }
            </div>
            ),
            accessor: "workerRoleType",
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
              <div className="d-flex align-items-center gap-2">
                <div className="d-flex">
                  <BiSolidInfoCircle
                  cursor={"pointer"}
                  size={"1.3rem"}
                  onClick={() => handleOpenInfoModal(row.original)}
                />
                </div>
                <div className="d-flex">
              <div style={{ cursor: "pointer" }}>

                <span className="icon"
                  onClick={() => handleOpenEditModal(row.original)}>
                  <span className="feather-icon">
                    <FeatherIcon icon="edit" size="6px" />
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
      
  return (
    <>
     {!!modalInfo && (
        <WorkersInfoModal modalInfo={modalInfo} setModalInfo={setModalInfo}/>
      )}
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
                <CustomTable data={workers} column={columns} dataReceived={dataReceived}/>
    </>
  )
}

export default WorkersTable
