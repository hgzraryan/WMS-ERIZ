/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react'
import { Dropdown } from "react-bootstrap";
import { HelmetProvider,Helmet } from 'react-helmet-async'
import SuppliersTable from '../viewTables/SuppliersTable';
import { useNavigate, useParams } from 'react-router-dom';
import useDeleteData from '../../hooks/useDeleteData';
import AddSupplier from '../addViews/AddSupplier';
import useGetData from '../../hooks/useGetData';
import useRefreshData from '../../hooks/useRefreshData';
import { PRODUCTCATEGORIES_URL, SUPPLIERS_ROUTE, SUPPLIERS_URL } from '../../utils/constants';
import ReactPaginate from 'react-paginate';
import FeatherIcon from "feather-icons-react";

const customSuppliers = [
    {
        supplierId:13654,
        supplierName:'Karen Harutyunyan',
        supplierPhone: '088 55 55 55',
        supplierEmail:'adsf@sfas.rt'
    },
    {
        supplierId:13674,
        supplierName:'Stephan Harutyunyan',
        supplierPhone: '088 66 66 66',
        supplierEmail:'qqqqq@sfas.dsfdfd'
    }
]
function Suppliers() {
    const { pageNumber } = useParams();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    //const [suppliers, setSuppliers] = useState(customSuppliers);
    const [currentPage, setCurrentPage] = useState(Number(pageNumber));
    const [searchCount,setSearchCount] = useState(null)
       const [searchId,setSearchId] = useState(null)
       const [searchTerms,setSearchTerms] = useState(null)
       const [searchParams,setSearchParams] = useState(null)
       const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100)));
       const [selectedItem, setSelectedItem] = useState("");
       const [selectedItemId, setSelectedItemId] = useState(null);
       const confirmSuppliersRef = useRef("");

//-------------------------GetData---------------------------//  
       const {
        data: suppliers,
        setData: setSuppliers,
        dataReceived,
        dataCount 
      } = useGetData(SUPPLIERS_URL,currentPage,usersPerPage,searchCount,null,searchParams);
    const pageCount = searchCount?Math.ceil(searchCount/usersPerPage) :searchCount===0? 0:Math.ceil(dataCount/usersPerPage)
    const { refreshData,data } = useRefreshData(SUPPLIERS_URL, usersPerPage);
    useEffect(()=>{
      setSuppliers(data)
      },[data])

       const handleOpenModal = (user) => {
        setSelectedItemId(true);
        setSelectedItem((prev) => user);
      };
   const handleCloseModal = () => {
        setSelectedItemId(null);
      };
      const handleToggleCreateModal = (value) => {
        setIsOpen((prev) => value);
      };
//    const { handleDeleteItem } = useDeleteData(
//       PRODUCTCATEGORIES_URL,
//       confirmProductCategoriesRef,
//       selectedItem,
//       setSelectedItemId,
//       productCategories,
//       setProductCategories,
//       "name",
//       refreshData 
//     );

//-------------------------PAGINATION---------------------------//  
useEffect(() => {
  setCurrentPage(Number(pageNumber));
}, [pageNumber]);
const handlePageClick = ({ selected: selectedPage }) => {
  navigate(`/companies/suppliers/page/${selectedPage+1}`);
}

//-------------------------refreshPage---------------------------//  

const refreshPage = () => {
  let paglink = document.querySelectorAll(".page-item");
  paglink[0]?.firstChild.click();
  refreshData()
};
  return (
<>
    {isOpen && (
      <AddSupplier
      handleToggleCreateModal={handleToggleCreateModal}
      refreshData={() => refreshData()}
      />
    )}
    <HelmetProvider>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Explore Products Classes</title>
      <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
    </Helmet>
  
    <section
      className="dropdown p-3"
      style={{ borderBottom: "3px solid #f6f6f6", display: "flex",justifyContent:'space-between' }}
      >
        <div style={{display:'flex'}}>

      <div className="me-2">
        <h3>Մատակարարներ</h3>
      </div>
      <div>
        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className="btn btn-sm btn-outline-secondary flex-shrink-0 dropdown-toggle d-lg-inline-block"
            >
            Ավելացնել նոր
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setIsOpen(true)}>
              Մատակարար
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
        </div>
      <div>
      <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret d-sm-inline-block d-none"
                  href="#"
                  data-bs-toggle="tooltip"
                  data-placement="top"
                  onClick={refreshPage}
                  title=""
                  data-bs-original-title="Refresh"
                  >
                  <span className="icon">
                    <span className="feather-icon">
                      <FeatherIcon icon="refresh-cw" />
                    </span>
                  </span>
                </a>
      </div>
    </section>
    <div className="productsClasses__Wrapper">
      <div className="productsClasses__table">
      {suppliers ? (
        <>
        <div
                    id="scrollableDiv"
                    style={{ height: "80vh", overflow: "auto" }}
                    >
                <SuppliersTable 
                  confirmRef={confirmSuppliersRef}
                  selectedItem={selectedItem}
                  selectedItemId={selectedItemId}
                  //handleDeleteItem={handleDeleteItem}
                  handleOpenModal={handleOpenModal}
                  handleCloseModal={handleCloseModal}
                  suppliers={suppliers} 
                  setSuppliers={setSuppliers}
                  dataReceived={dataReceived}
                  />
<ReactPaginate
                      previousLabel = {"Հետ"}    
                      nextLabel = {"Առաջ"}
                      pageCount = {1}
                      onPageChange = {handlePageClick}
                      //initialPage = {0}
                      containerClassName={"pagination"}
                      pageLinkClassName = {"page-link"}
                      pageClassName = {"page-item"}
                      previousLinkClassName={"page-link"}
                      nextLinkClassName={"page-link"}
                      disabledLinkClassName={"disabled"}
                      //activeLinkClassName={"active"}
                      activeClassName={"active"}
                      forcePage={currentPage - 1}
                      
											/>
                      </div>
                      </>
        ) : (
          ""
        )}
      </div>
    </div>
  </HelmetProvider>
        </>
  )
}

export default Suppliers
