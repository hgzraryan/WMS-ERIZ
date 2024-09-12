/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'
import { Dropdown } from "react-bootstrap";
import Table from '../Table';
import ComponentToConfirm from '../ComponentToConfirm';
import { BiSolidInfoCircle } from 'react-icons/bi';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';

function ProductsListTable({
    confirmRef,
    selectedItem,
    selectedItemId,
    handleDeleteItem,
    handleOpenModal,
    handleCloseModal,
    productsList}) {

        const [modalInfo, setModalInfo] = useState(false);
        const handleOpenInfoModal = (data) => {
          
          setModalInfo((prev) => data);
        };
        const columns = useMemo(
            () => [
              {
                Header: "ID",
                accessor: "productListId",
                width: 80,
              },
              {
                Header: "Անվանում",
                accessor: "name",
                width: 250,
              },
              {
                Header: "Դասակարգ",
                accessor: "ProductCategory",
                width: 250,
              },
              {
                Header: "Գործողություններ",
                accessor: "actions",
                Cell: ({ row }) => (
                    <div className="d-flex align-items-center">
                      <div className="d-flex">
                        <BiSolidInfoCircle
                        cursor={"pointer"}
                        size={"1.5rem"}
                        onClick={() => handleOpenInfoModal(row.original)}
                      />
                      </div>
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
                  ),
                disableSortBy: true,
                width: 150,
                Filter: ({ column: { id } }) => <></>,
              },
            ],
            []
          );
        //   const handleOpenEditModal = (value) => {
        //     setEditRow((prev) => value);
        //   };
  return (
    <>
      {/* {editRow && (
        <PartnerEdit
          partner={editRow}
          setEditRow={setEditRow}
          refreshData={refreshData}
        />
      )} */}
      <ComponentToConfirm
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
        handleDeleteItem={handleDeleteItem}
        selectedItemId={selectedItemId}
        confirmRef={confirmRef}
        keyName={selectedItem.name}
        delId={selectedItem.productsListId}
      />
      <Table data={productsList} column={columns} />
    </>
);

}

export default ProductsListTable
