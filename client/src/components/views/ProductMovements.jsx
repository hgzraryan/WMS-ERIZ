import React, { useEffect, useRef, useState } from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'
import { Dropdown } from "react-bootstrap";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGetData from '../../hooks/useGetData';
import { PRODUCTSMOVEMENTS_URL } from '../../utils/constants';
import useRefreshData from '../../hooks/useRefreshData';
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import ProductMovementsTable from '../viewTables/ProductMovementsTable';
import ReactPaginate from 'react-paginate';
import ExportData from '../ExportData';
import FilterPanel from '../FilterPanel';

function ProductMovements() {
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
    const [productMovements, setProductMovements] = useState([]);  
    const [dataCount, setDataCount] = useState(null);  
    const [dataReceived, setDataReceived] = useState(false);
    const [filter, setFilter] = useState({});
    const [handleSearch, setHandleSearch] = useState(false);
    const confirmAgentsRef = useRef("");
  
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const productCategoriesResp = await axiosPrivate.get(PR);
    //       setProductCategories(productCategoriesResp?.data?.jsonString);
    //       //setIsLoading(false);
    //     } catch (err) {
    //       console.log(err);
    //       //navigate("/login", { state: { from: location }, replace: true });
    //     }
    //   };
    //   setTimeout(() => {
    //     fetchData();
    //   }, 500);
    // }, [navigate]);

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
//-------------------------GetData---------------------------//  
    // const {
    //   data: productMovements,
    //   setData: setProductMovements,
    //   dataReceived,
    //   dataCount
    // } = useGetData(PRODUCTSMOVEMENTS_URL,currentPage,usersPerPage,searchCount,null,searchParams);
    const pageCount = searchCount?Math.ceil(searchCount/usersPerPage) :searchCount===0? 0:Math.ceil(dataCount/usersPerPage)
    const { refreshData,data } = useRefreshData(PRODUCTSMOVEMENTS_URL, usersPerPage);
    useEffect(()=>{
      setProductMovements(data)
      },[data])

      useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
    // if(!searchCount){

      const getData = async () => {
        try {
          const response = await axiosPrivate.post(PRODUCTSMOVEMENTS_URL,{
            signal: controller.signal,
            page: currentPage===0?1:currentPage,
            onPage: usersPerPage,
             params: filter 
          });
          //console.log(response);
          // if (
            //   response.data.jsonString.length === 0 ||
            //   response.data.jsonString.length < onPageCount
            // ) {
              //   setHasMore(false);
            // }
            isMounted &&
              setProductMovements((prevUsers) => response.data.jsonString);
              setDataCount(response.data.count)
              setDataReceived(true)
              //setCurrentPage((prev) => prev + 1);
            } catch (err) {
              console.error(err);
              navigate("/login", { state: { from: location }, replace: true });
            }
          };
          
          getData();
          
        // }else if(searchCount && searchUrl){
        //   const getData = async () => {
        //   try {
        //     const response = await axiosPrivate.post(searchUrl, {
        //       params: searchParams,
        //       page: currentPage===0?1:currentPage,
        //       onPage: usersPerPage,
        //       signal: controller.signal
        //     });
        //     //console.log('get search data')
        //     setData(response.data.jsonString);
        //     setDataReceived(true)
        //     //setToggleSearchModal(false)  
        //     //handleSearchPageCount(response.data.count)    
        //   }catch (err) {
        //     console.error(err);
        //   }  
        // }; 
        // getData()
        // }
          return () => {
          isMounted = false;
          controller.abort();
        };
      }, [currentPage,searchCount,searchParams,filter]);
//-------------------------PAGINATION---------------------------//  
      useEffect(() => {
        setCurrentPage(Number(pageNumber));
      }, [pageNumber]);
      const handlePageClick = ({ selected: selectedPage }) => {
        navigate(`/products/productsMovements/page/${selectedPage+1}`);
    }
//-------------------------refreshPage---------------------------//  

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
      section='productsMovements'
      />
       <Helmet>
          <meta charSet="utf-8" />
          <title>Explore Outgoing Products</title>
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
                      <h1>Պահեստի շարժ</h1>
                    </a>
                  </div>
                </div>
                <div className="contact-options-wrap">
                <a
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
                </a>
  
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
                      {/* <FilterPanel setFilter={setFilter} filter={filter}  /> */}
                        <ProductMovementsTable
                          confirmRef={confirmAgentsRef}
                          selectedItem={selectedItem}
                          selectedItemId={selectedItemId}
                          //handleDeleteItem={handleDeleteItem}
                          handleOpenModal={handleOpenModal}
                          handleCloseModal={handleCloseModal}
                          productMovements={productMovements}
                          setProductMovements={setProductMovements}
                          refreshData={refreshData}
                          dataReceived={dataReceived}
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


export default ProductMovements
