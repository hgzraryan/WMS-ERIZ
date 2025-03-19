import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PRODUCTSLIST_URL } from '../../utils/constants';
import useRefreshData from '../../hooks/useRefreshData';
import useGetData from '../../hooks/useGetData';
import { HelmetProvider,Helmet } from 'react-helmet-async'
import ReactPaginate from 'react-paginate';
import ProductsSummaryTable from '../viewTables/ProductsSummaryTable';
import ExportData from '../ExportData';
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

function ProductsSummary() {

    const { pageNumber } = useParams();
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(Number(pageNumber));
    const [searchCount,setSearchCount] = useState(null)
       const [searchId,setSearchId] = useState(null)
       const [searchTerms,setSearchTerms] = useState(null)
       const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100)));
       const [selectedItem, setSelectedItem] = useState("");
       const [selectedItemId, setSelectedItemId] = useState(null);
       const confirmProductsListRef = useRef("");
    const [toggleExport, setToggleExport] = useState(false);

//-------------------------GetData---------------------------//  
    const {
      data: productsSummary,
      setData: setProductsSummary,
      dataCount,
      dataReceived
     } = useGetData('/warehouseBalance',currentPage,usersPerPage,searchCount,null,searchId,searchTerms);
     const pageCount = searchCount?Math.ceil(searchCount/usersPerPage) :searchCount===0? 0:Math.ceil(dataCount/usersPerPage)
     const { refreshData,data } = useRefreshData('/warehouseBalance', usersPerPage);
     useEffect(()=>{
        setProductsSummary(data)
       },[data])
       const handleOpenModal = (user) => {
        setSelectedItemId(true);
        setSelectedItem((prev) => user);
      };
      const handleCloseModal = () => {
        setSelectedItemId(null);
      };


    //-------------------------PAGINATION---------------------------//  
    useEffect(() => {
      setCurrentPage(Number(pageNumber));
    }, [pageNumber]);
    const handlePageClick = ({ selected: selectedPage }) => {
      navigate(`/products/productsSummary/${selectedPage+1}`);
    }
    const handleToggleExportModal = (value) => {
      setToggleExport((prev) => value);
    };    
     //-------------------------refreshPage-----------------------------------//  

     const refreshPage = () => {
      let paglink = document.querySelectorAll(".page-item");
      paglink[0]?.firstChild.click();
      refreshData()
    };
  return (
    <HelmetProvider>
    <ExportData 
  handleToggleExportModal = {handleToggleExportModal}
  toggleExport={toggleExport}
  section='productsSummary'
  />
   <Helmet>
      <meta charSet="utf-8" />
      <title>Ապրանքների Մնացորդներ</title>
      <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
    </Helmet>
    <div className="contactapp-wrap" style={{height:'100%'}}>
      <div className="contactapp-content">
        <div className="contactapp-detail-wrap w-100">
          <header className="contact-header">
            <div className="d-flex align-items-center">
              <div className="dropdown">
                <a
                  className="contactapp-title link-dark"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <h1>Ապրանքների Մնացորդներ</h1>
                </a>
              </div>
            </div>
            <div className="contact-options-wrap">
            {/* <a
              className="btn btn-icon btn-flush-dark flush-soft-hover dropdown-toggle no-caret active"
              href="#"
              data-bs-toggle="dropdown"
            >
              <span className="icon">
                <span className="feather-icon"
                onClick={handleToggleExportModal}>
                  <FeatherIcon icon="download" />
                </span>
              </span>
            </a> */}

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
          </header>
          <div className="contact-body">
            <div data-simplebar className="nicescroll-bar">
              <div className="contact-list-view">
                <div
                  id="scrollableDiv"
                  style={{overflow: "auto" }}
                >
                            <ProductsSummaryTable 
                  confirmRef={confirmProductsListRef}
                  selectedItem={selectedItem}
                  selectedItemId={selectedItemId}
                  //handleDeleteItem={handleDeleteItem}
                  handleOpenModal={handleOpenModal}
                  handleCloseModal={handleCloseModal}
                  productsSummary={productsSummary} 
                  setProductsList={setProductsSummary}
                  dataReceived={dataReceived}
                  />
                <ReactPaginate
                previousLabel = {"Հետ"}    
                nextLabel = {"Առաջ"}H
                pageCount = {pageCount}
                onPageChange = {handlePageClick}
                initialPage = {0}
                containerClassName={"pagination"}
                pageLinkClassName = {"page-link"}
                pageClassName = {"page-item"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                disabledLinkClassName={"disabled"}
                //activeLinkClassName={"active"}
                activeClassName={"active"}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 
     
  {/* </HelmetProvider>
    <HelmetProvider>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Products List</title>
      <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
    </Helmet>
  
    <section
      className="dropdown p-3"
      style={{ borderBottom: "3px solid #f6f6f6", display: "flex" }}
    >
      <div className="me-2">
        <h3>Ապրանքների Մնացորդներ</h3>
      </div>
      <div>
        
      </div>
    </section>
    <div className="productsClasses__Wrapper">
      <div className="productsClasses__table">
      {productsSummary ? (
        <>
                <ProductsSummaryTable 
                  confirmRef={confirmProductsListRef}
                  selectedItem={selectedItem}
                  selectedItemId={selectedItemId}
                  //handleDeleteItem={handleDeleteItem}
                  handleOpenModal={handleOpenModal}
                  handleCloseModal={handleCloseModal}
                  productsSummary={productsSummary} 
                  setProductsList={setProductsSummary}
                  dataReceived={dataReceived}
                  />
                <ReactPaginate
                previousLabel = {"Հետ"}    
                nextLabel = {"Առաջ"}H
                pageCount = {pageCount}
                onPageChange = {handlePageClick}
                initialPage = {0}
                containerClassName={"pagination"}
                pageLinkClassName = {"page-link"}
                pageClassName = {"page-item"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                disabledLinkClassName={"disabled"}
                //activeLinkClassName={"active"}
                activeClassName={"active"}
                />
                </>
        ) : (
          ""
        )}
          
      </div>
    </div>
    */}
  </HelmetProvider> 
  )
}


export default ProductsSummary
