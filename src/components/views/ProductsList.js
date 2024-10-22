import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PRODUCTCATEGORIES_URL, PRODUCTSLIST_ROUTE, PRODUCTSLIST_URL } from '../../utils/constants';
import useRefreshData from '../../hooks/useRefreshData';
import useGetData from '../../hooks/useGetData';
import ProductsListTable from '../viewTables/ProductsListTable';
import { HelmetProvider,Helmet } from 'react-helmet-async'
import { Dropdown } from "react-bootstrap";
import useDeleteData from '../../hooks/useDeleteData';
import AddProductsList from '../addViews/AddProductsList';
import ComponentToConfirm from '../ComponentToConfirm';
import ReactPaginate from 'react-paginate';
function ProductsList() {
    const { pageNumber } = useParams();
    const navigate = useNavigate()
    //const [productsClasses,setProductsClasses] = useState(customproductsClasses)
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
      data: productsList,
      setData: setProductsList,
      dataCount,
      dataReceived
     } = useGetData(PRODUCTSLIST_URL,currentPage,usersPerPage,searchCount,null,searchId,searchTerms);
     const pageCount = searchCount?Math.ceil(searchCount/usersPerPage) :searchCount===0? 0:Math.ceil(dataCount/usersPerPage)
     const { refreshData,data } = useRefreshData(PRODUCTSLIST_URL, usersPerPage);
     useEffect(()=>{
        setProductsList(data)
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
//-------------------------DeleteData---------------------------// 
      const { handleDeleteItem } = useDeleteData(
        PRODUCTSLIST_URL,
        confirmProductsListRef,
        selectedItem,
        setSelectedItemId,
        productsList,
        setProductsList,
        "name",
        refreshData 
    );
    //-------------------------PAGINATION---------------------------//  
    useEffect(() => {
      setCurrentPage(Number(pageNumber));
    }, [pageNumber]);
    const handlePageClick = ({ selected: selectedPage }) => {
      navigate(`/products/productsList/${selectedPage+1}`);
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
        <h3>Ապրանքների տեսակներ</h3>
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
              Տեսակ
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {isOpen && (
        <AddProductsList
          handleToggleCreateModal={handleToggleCreateModal}
          refreshData={() => refreshData()}
        />
      )}

    </section>
    <div className="productsClasses__Wrapper">
      <div className="productsClasses__table">
      {productsList ? (
        <>
                <ProductsListTable 
                  confirmRef={confirmProductsListRef}
                  selectedItem={selectedItem}
                  selectedItemId={selectedItemId}
                  handleDeleteItem={handleDeleteItem}
                  handleOpenModal={handleOpenModal}
                  handleCloseModal={handleCloseModal}
                  productsList={productsList} 
                  setProductsList={setProductsList}
                  dataReceived={dataReceived}
                  />
                <ReactPaginate
                previousLabel = {"Հետ"}    
                nextLabel = {"Առաջ"}
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
           <ComponentToConfirm
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
        handleDeleteItem={handleDeleteItem}
        selectedItemId={selectedItemId}
        confirmRef={confirmProductsListRef}
        keyName={selectedItem.name}
        delId={selectedItem.productListId}
      />
      </div>
    </div>
  </HelmetProvider>
  )
}

export default ProductsList
