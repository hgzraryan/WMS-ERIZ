/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from 'react'
import CustomTable from '../CustomTable';
import { BiSolidInfoCircle } from 'react-icons/bi';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';

function ProductsSummaryTable({
    confirmRef,
    selectedItem,
    selectedItemId,
    handleDeleteItem,
    handleOpenModal,
    handleCloseModal,
    productsSummary,
    dataReceived}) {

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
                Header: "Քանակ",
                accessor: "productCount",
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
      <CustomTable data={productsSummary} column={columns} dataReceived={dataReceived}/>
    </>
);

}


export default ProductsSummaryTable
