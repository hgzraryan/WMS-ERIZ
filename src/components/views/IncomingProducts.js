/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'
import { Dropdown } from "react-bootstrap";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PRODUCTCATEGORIES_URL, PRODUCTS_URL } from '../../utils/constants';
import useRefreshData from '../../hooks/useRefreshData';
import useGetData from '../../hooks/useGetData';
import ProductsTable from '../viewTables/ProductsTable';
import ReactPaginate from 'react-paginate';
import useDeleteData from '../../hooks/useDeleteData';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import AddIncomingProduct from '../addViews/AddIncomingProduct';
function IncomingProducts() {
    const { pageNumber } = useParams();
    const navigate = useNavigate()
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const [isOpen, setIsOpen] = useState(false);
    const [searchCount,setSearchCount] = useState(null)
    const [searchId,setSearchId] = useState(null)
    const [searchTerms,setSearchTerms] = useState(null)
    const [searchParams,setSearchParams] = useState(null)
    const [toggleExport, setToggleExport] = useState(false);
    const [productCategories, setProductCategories] = useState([]);
    const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100)));
    const [currentPage, setCurrentPage] = useState(Number(pageNumber));
    const [selectedItem, setSelectedItem] = useState("");
  
    const [selectedItemId, setSelectedItemId] = useState(null);
  
    const confirmAgentsRef = useRef("");
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const productCategoriesResp = await axiosPrivate.get(PRODUCTCATEGORIES_URL);
          setProductCategories(productCategoriesResp?.data?.jsonString);
          //setIsLoading(false);
        } catch (err) {
          console.log(err);
          //navigate("/login", { state: { from: location }, replace: true });
        }
      };
      setTimeout(() => {
        fetchData();
      }, 500);
    }, [navigate]);
    const handleToggleCreateModal = (value) => {
      setIsOpen((prev) => value);
    };
    const handleOpenModal = (user) => {
      setSelectedItemId(true);
      setSelectedItem((prev) => user);
    };
    const handleCloseModal = () => {
      setSelectedItemId(null);
    };
  const handleToggleExportModal = (value) => {
      setToggleExport((prev) => value);
    };
    const handleSearchPageCount = (data) =>{
      setSearchCount(data.count)
      setSearchParams(data.params)
    }
    const {
      data: incomingProducts,
      setData: setIncomingProducts,
      //refreshData,
      dataCount
    } = useGetData(PRODUCTS_URL,currentPage,usersPerPage,searchCount,null,searchParams);
    const pageCount = searchCount?Math.ceil(searchCount/usersPerPage) :searchCount===0? 0:Math.ceil(dataCount/usersPerPage)
    const { refreshData,data } = useRefreshData(PRODUCTS_URL, usersPerPage);
    useEffect(()=>{
        setIncomingProducts(data)
      },[data])
      
    const { handleDeleteItem } = useDeleteData(
      PRODUCTS_URL,
      confirmAgentsRef,
      selectedItem,
      setSelectedItemId,
      incomingProducts,
      setIncomingProducts,
      "name",
      refreshData 
    );
      //-------------------------PAGINATION---------------------------//  
      useEffect(() => {
        setCurrentPage(Number(pageNumber));
      }, [pageNumber]);
      const handlePageClick = ({ selected: selectedPage }) => {
        navigate(`/products/page/${selectedPage+1}`);
    }
    const refreshPage = () => {
      let paglink = document.querySelectorAll(".page-item");
      paglink[0]?.firstChild.click();
      refreshData()
    };
    return (
      <HelmetProvider>
       <Helmet>
          <meta charSet="utf-8" />
          <title>Explore Incoming Products</title>
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
                      <h1>Պահեստի մուտքեր</h1>
                    </a>
                  </div>
                  <div className="dropdown ms-3">
                  <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="btn btn-sm btn-outline-secondary flex-shrink-0 dropdown-toggle d-lg-inline-block"
                  >
                  Մուտքագրել նոր
                </Dropdown.Toggle>
    
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setIsOpen(true)}>
                    Ապրանք
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {isOpen && (
              <AddIncomingProduct
              handleToggleCreateModal={handleToggleCreateModal}
              productCategories={productCategories}
              refreshData={() => refreshData()}
              />
            )}
                  </div>
                </div>
                <div className="contact-options-wrap">
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item active" href="contact.html">
                      <span className="feather-icon dropdown-icon">
                        <FeatherIcon icon="list" />
                      </span>
                      <span>List View</span>
                    </a>
                    <a className="dropdown-item" href="contact-cards.html">
                      <span className="feather-icon dropdown-icon">
                        <FeatherIcon icon="grid" />
                      </span>
                      <span>Grid View</span>
                    </a>
                    <a className="dropdown-item" href="#">
                      <span className="feather-icon dropdown-icon">
                        <FeatherIcon icon="server" />
                      </span>
                      <span>Compact View</span>
                    </a>
                  </div>
  
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
                        <ProductsTable
                          confirmRef={confirmAgentsRef}
                          selectedItem={selectedItem}
                          selectedItemId={selectedItemId}
                          //handleDeleteItem={handleDeleteItem}
                          handleOpenModal={handleOpenModal}
                          handleCloseModal={handleCloseModal}
                          products={incomingProducts}
                          setProducts={setIncomingProducts}
                          refreshData={refreshData}
                          handleSearchPageCount={(data)=>handleSearchPageCount(data)}
  
                        />
                          <ReactPaginate
                          previousLabel = {"Հետ"}    
                          nextLabel = {"Առաջ"}
                          pageCount = {pageCount}
                          onPageChange = {handlePageClick}
                          //initialPage = {Number(pageNumber)}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     
         
      </HelmetProvider>
    )
  }
  
export default IncomingProducts
