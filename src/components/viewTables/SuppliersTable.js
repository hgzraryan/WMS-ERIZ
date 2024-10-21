/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from 'react'
import CustomTable from '../CustomTable';
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { BiSolidInfoCircle } from 'react-icons/bi';
import SuppliersInfoModal from '../infoModals/SuppliersInfoModal';

function SuppliersTable({suppliers,
    confirmRef,
    selectedItem,
    selectedItemId,
    handleDeleteItem,
    handleOpenModal,
    handleCloseModal,
    productCategories,
    dataReceived}) {
      const [modalInfo, setModalInfo] = useState(false);

      const handleOpenInfoModal = (data) => {
         
         setModalInfo((prev) => data);
       };
      console.log(suppliers)
    const columns = useMemo(
        () => [
          {
            Header: (event) => (
              <>
                
                <div  className="supplierId">ID</div>
              </>
            ),
            accessor: "supplierId",
            sortable: true,
            width: 80,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="supplierName">Անվանում</div>
              </>
            ),
            accessor: "name",
            sortable: true,
            width: 300,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="supplierEmail">Հասցե</div>
              </>
            ),
            accessor: "address",
            sortable: true,
            Cell: ({ row }) => (
              <div className="d-flex align-items-center">
               {row?.original?.contact?.address?.city + " "+row?.original?.contact?.address?.street}
                 
              </div>
            ),
            width: 300,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="supplierEmail">Տնօրեն</div>
              </>
            ),
            accessor: "director",
            sortable: true,
            Cell: ({ row }) => (
              <div className="d-flex align-items-center">
               {row?.original?.director}
                 
              </div>
            ),
            width: 250,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="supplierEmail">Էլ․ հասցե</div>
              </>
            ),
            accessor: "email",
            sortable: true,
            Cell: ({ row }) => (
              <div className="d-flex align-items-center">
               {row?.original?.contact?.email}
                 
              </div>
            ),
            width: 250,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="supplierPhone">Հեռախոս</div>
              </>
            ),
            accessor: "supplierPhone",
            sortable: true,
            Cell: ({ row }) => (
              <div className="d-flex align-items-center">
               {row?.original?.contact?.phone}
                 
              </div>
            ),
            width: 250,
            
          },
          {
            Header: "Գործողություններ",
            accessor: "actions",
            Cell: ( {row} ) => (
              <div className="d-flex align-items-center">
                   <div className="d-flex">
              <BiSolidInfoCircle
              cursor={"pointer"}
              size={"1.5rem"}
              onClick={() => handleOpenInfoModal(row.original)}
            />
            </div>
                <div className="d-flex">
                {/* <a
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
                  </a> */}
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
                  {/* <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                    data-bs-toggle="tooltip"
                    onClick={() => handleOpenDisableModal(row)}
                    data-placement="top"
                    title="Status"
                    data-bs-original-title="Activte"
                    href="#"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <FeatherIcon icon="power" style={{color: row?.original.isActive ? 'green' : 'red' }} />
                      </span>
                    </span>
                  </a> */}
                </div>
              </div>
            ),
            disableSortBy: true,
            width: 150,
            Filter: ({ column: { id } }) => <></>,
          },
          
        ],
        []
      );
  return (
    <>
     {!!modalInfo && (
        <SuppliersInfoModal modalInfo={modalInfo} setModalInfo={setModalInfo} dataReceived={dataReceived}/>
      )}
          <CustomTable data={suppliers} column={columns} dataReceived={dataReceived} />

    </>
  )
}

export default SuppliersTable
