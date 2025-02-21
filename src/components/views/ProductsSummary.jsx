import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PRODUCTSLIST_URL } from '../../utils/constants';
import useRefreshData from '../../hooks/useRefreshData';
import useGetData from '../../hooks/useGetData';
import { HelmetProvider,Helmet } from 'react-helmet-async'
import ReactPaginate from 'react-paginate';
import ProductsSummaryTable from '../viewTables/ProductsSummaryTable';
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
     //-------------------------refreshPage-----------------------------------//  

     const refreshPage = () => {
      let paglink = document.querySelectorAll(".page-item");
      paglink[0]?.firstChild.click();
      refreshData()
    };
  return (
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
  </HelmetProvider>
  )
}


export default ProductsSummary
