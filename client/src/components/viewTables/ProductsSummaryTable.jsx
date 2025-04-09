import React, { useMemo, useState } from 'react'
import CustomTable from '../CustomTable';
import { BiSolidInfoCircle } from 'react-icons/bi';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import ProductsSummaryInfo from '../infoModals/ProductsSummaryInfo';

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
                Header: "Հ/Հ",
                accessor: "productIdent",
                width: 80,
              },
              {
                Header: "Անվանում",
                accessor: "name",
                width: 250,
              },
              {
                Header: "Հատաքանակ",
                accessor: "totalQuantityBalance",
                width: 250,
              },
              {
                Header: "Արկղերի քանակ",
                accessor: "totalBoxCountBalance",
                width: 250,
              },
              {
                Header: "Մնացորդ",
                accessor: "totalBalance",
                width: 250,
              },
              {
                Header: "Չափման միավոր",
                accessor: "unit",
                Cell: ({ row }) => (
                  <div className="d-flex align-items-center">
                   {row.original?.dimensions.weight?'կգ':row.original?.dimensions.volume?'Լիտր':''}
                  </div>
                ),
                width: 150,
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
     {!!modalInfo && (
        <ProductsSummaryInfo modalInfo={modalInfo} setModalInfo={setModalInfo}/>
      )}
      <CustomTable data={productsSummary} column={columns} dataReceived={dataReceived}/>
    </>
);

}


export default ProductsSummaryTable
