import React, { useMemo, useState } from 'react'
import CustomTable from '../CustomTable';
import "../../dist/css/data-table.css";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { BiSolidInfoCircle } from 'react-icons/bi';
import IncomingProductsPrintModal from '../printModals/IncomingProductsPrintModal';
import ConfirmIncomingModal from '../ConfirmIncomingModal';
import { ColumnFilter } from '../ColumnFilter';
import { INCOMINGPRODUCTS_SEARCH_URL, PRODUCTS_URL } from '../../utils/constants';
import IncomingProductsEdit from '../editModals/IncomingProductsEdit';

function IncomingProductsTable({
  confirmRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  incomingProducts,
  setIncomingProducts,
  refreshData,
  dataReceived,
  handleSearchPageCount
}) {
  const [modalPrint, setModalPrint] = useState("");
  const [modalInfo, setModalInfo] = useState(false);
  const [repeatIncoming, setRepeateIncoming] = useState("");
  const [filterData, setFilterData] = useState({});
  const [filterDataJSON, setFilterDataJSON] = useState('');
     const [editRow, setEditRow] = useState(false);
  
     const handleOpenEditModal = (value) => {
      setEditRow((prev) => value);
      console.log(value)
    };
  const handleOpenInfoModal = (data) => {
    
    setModalInfo((prev) => data);
  };
  const handleOpenPrintModal = (data) => {
    setModalPrint((prev) => data);
    
  }; 
  const handleOpenRepeatModal = (data) => {
    console.log(data)
    setRepeateIncoming((prev) => data);
  }; 
    const columns = useMemo(
        () => [
          {
            Header: (event) => (
              <>
                
                <div  className="columnHeader">ID</div>
              </>
            ),
            accessor: "incomingProductId",
            sortable: true,
            width: 100,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="name">Անվանում</div>
              </>
            ),
            accessor: "name",
            sortable: true,
            width: 300,
            Filter: ({ column: { id } })=>(
              <ColumnFilter
                id={id}
                setData={setIncomingProducts}
                data={incomingProducts}
                placeholder={'Անվանում'}
                getUrl={PRODUCTS_URL}
                searchUrl={INCOMINGPRODUCTS_SEARCH_URL}
                handleSearchPageCount={(val)=>handleSearchPageCount(val)}
                filterData={filterData}
                setFilterData={(newFilterData) => {
                    setFilterDataJSON(JSON.stringify({...filterData, ...newFilterData}))
                    setFilterData(newFilterData)   
                }}
              />
            ),    
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="name">Մուտքի ամսաթիվ</div>
              </>
            ),
            accessor: "actionDate",
            sortable: true,
            width: 150,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="name">Դասակարգ</div>
              </>
            ),
            accessor: "productCategoryName",
            sortable: true,
            width: 150,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="quantity">Քանակ</div>
              </>
            ),
            accessor: "quantity",
            sortable: true,
            Cell: ({ row }) => (
              <div className="d-flex align-items-center">
              {row.original?.dimensions?.weight ||  row.original?.dimensions?.volume}
              </div>
            ),
            width: 100,
            
          },
          {
            Header: (event) => (
              <>                
                <div  className="quantity">Մնացորդ</div>
              </>
            ),
            accessor: "balance",
            sortable: true,
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
            width: 100,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="name">Վաճառք</div>
              </>
            ),
            accessor: "sellingPrice",
            sortable: true,
            width: 100,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="name">Արժույթ</div>
              </>
            ),
            accessor: "currency",
            sortable: true,
            width: 80,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="name">Մատակարար</div>
              </>
            ),
            accessor: "partnerName",
            sortable: true,
            width: 200,
            Filter: ({ column: { id } })=>(
              <ColumnFilter
                id={id}
                setData={setIncomingProducts}
                data={incomingProducts}
                placeholder={'Մատակարար'}
                getUrl={PRODUCTS_URL}
                searchUrl={INCOMINGPRODUCTS_SEARCH_URL}
                handleSearchPageCount={(val)=>handleSearchPageCount(val)}
                filterData={filterData}
                setFilterData={(newFilterData) => {
                    setFilterDataJSON(JSON.stringify({...filterData, ...newFilterData}))
                    setFilterData(newFilterData)   
                }}
              />
            ),    
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="name">Պահեստ</div>
              </>
            ),
            accessor: "warehouseName",
            sortable: true,
            width: 150,
            
          },
          {
            Header: (event) => (
              <>
                <div className="columnHeader">Գործողություններ</div>
              </>
            ),
            accessor: "actions",
            width: 250,
            Cell: ({ row }) => (
              <div className="d-flex align-items-center">
                {/* <BiSolidInfoCircle
              cursor={"pointer"}
              size={"1.5rem"}
              onClick={() => handleOpenInfoModal(row.original)}
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
                  
                  <a
                      className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                      data-bs-toggle="tooltip"
                      data-placement="top"
                      title="Repeat"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default anchor behavior
                        e.stopPropagation(); // Stop event bubbling
                        handleOpenRepeatModal(row.original); // Call your function
                      }}
                    >
                      <span className="icon">
                        <span className="feather-icon">
                          <FeatherIcon icon="repeat" />
                        </span>
                      </span>
                    </a>
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
    {/* {!!modalInfo && (
        <IncomingsProductsInfoModal modalInfo={modalInfo} setModalInfo={setModalInfo}/>
      )} */}
          {!!editRow &&(
            <>
     <IncomingProductsEdit incomingProduct={editRow} setEditRow={setEditRow} refreshData={refreshData}/>
            </>
  )}
       {!!modalPrint && (
        <IncomingProductsPrintModal modalPrint={modalPrint} setModalPrint={setModalPrint} />
      )}
       {!!repeatIncoming && (
        <ConfirmIncomingModal modalData={repeatIncoming} setRepeateOutgoing={setRepeateIncoming} refreshData={refreshData}/>
      )}
          <CustomTable data={incomingProducts} column={columns} dataReceived={dataReceived}/>

    </>
  )
}


export default IncomingProductsTable
