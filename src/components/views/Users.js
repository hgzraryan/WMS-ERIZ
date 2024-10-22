/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-lone-blocks */
import React, { useState, useRef, useMemo, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FeatherIcon from "feather-icons-react";
import LoadingSpinner from "../LoadingSpinner";
import ReactPaginate from "react-paginate";
import Loading from "../Loading";
import CreateUser from "../addViews/CreateUser";
import { Dropdown } from "react-bootstrap";
import useGetData from "../../hooks/useGetData";
import useDeleteData from "../../hooks/useDeleteData";
import useUpdateCount from "../../hooks/useUpdateCount";
import { checkUsersCount } from "../../redux/features/users/usersCountSlice";
import { HelmetProvider,Helmet } from 'react-helmet-async'
import { useSelector } from "react-redux";
import { USERS_URL } from "../../utils/constants";
import UsersTable from "../viewTables/UsersTable";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useRefreshData from "../../hooks/useRefreshData";

const Users = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const confirmUserRef = useRef("");
  const [isOpen, setIsOpen] = useState(false);
 // const [users, setUsers] = useState([]);
  const [isOpenRole, setIsOpenRole] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  //const usersCount = useSelector(selectUsersCount)
  const [currentPage, setCurrentPage] = useState(1);  
  const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100)));
  const [searchCount,setSearchCount] = useState(null)
  const [searchParams,setSearchParams] = useState(null)
  const axiosPrivate = useAxiosPrivate();   
  const location = useLocation();   
 // const [dataCount, setDataCount] = useState(null);

//-------------------------GetData-----------------------------------//  
  const {
    data: users,
    setData: setUsers,
   dataReceived,
    dataCount
  } = useGetData(USERS_URL,currentPage,usersPerPage,searchCount,null,searchParams);
  const pageCount = searchCount?Math.ceil(searchCount/usersPerPage) : Math.ceil(dataCount/usersPerPage)
  const { refreshData,data } = useRefreshData(USERS_URL, usersPerPage);
  useEffect(()=>{
    setUsers(data)
    },[data])
  //-------------------
  // const handleSearchPageCount = (data) =>{
  //   setSearchCount(data.count)
  //   setSearchParams(data.params)
  // }
//   useEffect(() => {
//     let isMounted = true;
//     const controller = new AbortController();
// if(!searchCount){

//   const getData = async () => {
//     try {
//       const response = await axiosPrivate.post(USERS_URL,{
//         signal: controller.signal,
//         page: currentPage===0?1:currentPage,
//         onPage: usersPerPage,
//       });
//       //console.log(response);
//       // if (
//         //   response.data.jsonString.length === 0 ||
//         //   response.data.jsonString.length < onPageCount
//         // ) {
//           //   setHasMore(false);
//         // }
//         isMounted &&
//           setUsers((prevUsers) => response.data.jsonString);
//           setDataCount(response.data.count)
//           //setCurrentPage((prev) => prev + 1);
//         } catch (err) {
//           console.error(err);
//           navigate("/login", { state: { from: location }, replace: true });
//         }
//       };
      
//       getData();
      
//     }else{
//       const getData = async () => {
//       // try {
//       //   const response = await axiosPrivate.post(searchUrl, {
//       //     params: searchParams,
//       //     page: currentPage===0?1:currentPage,
//       //     onPage: usersPerPage,
//       //     signal: controller.signal
//       //   });
//       //   //console.log('get search data')
//       //   setData(response.data.jsonString);
//       //   //setToggleSearchModal(false)  
//       //   //handleSearchPageCount(response.data.count)    
//       // }catch (err) {
//       //   console.error(err);
//       // }  
//     }; 
//     getData()
//     }
//       return () => {
//       isMounted = false;
//       controller.abort();
//     };
//   }, [currentPage,searchCount,searchParams,setUsers]);

//-------------------------DeleteData-----------------------------------//  
  const { handleDeleteItem,updateUsersCount } = useDeleteData(
    USERS_URL,
    confirmUserRef,
    selectedItem,
    setSelectedItemId,
    "username",
    refreshData
    
  );

  const handleOpenModal = (user) => {
    setSelectedItemId(true);
    setSelectedItem((prev) => user);
  };
  const handleCloseModal = () => {
    setSelectedItemId(null);
  };	
//-------------------------PAGINATION-----------------------------------//  

  useEffect(() => {
    setCurrentPage(Number(pageNumber));
  }, [pageNumber]);
  const handlePageClick = ({ selected: selectedPage }) => {
    navigate(`/users/users/page/${selectedPage+1}`);
}
 //-------------------------refreshPage-----------------------------------//  

  const refreshPage = () => {
    let paglink = document.querySelectorAll(".page-item");
    paglink[0]?.firstChild.click();
    refreshData()
  };   
  return (
    <HelmetProvider>

    <div>
	<Helmet>
		<meta charSet="utf-8" />
		<title>Vteam LIMS | Users</title>
		<link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
	</Helmet>
      <div className="contactapp-wrap">
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
                    <h1>Աշխատակիցներ</h1>
                  </a>
                </div>
                <div className="dropdown ms-3">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="btn btn-sm btn-outline-secondary flex-shrink-0 dropdown-toggle d-lg-inline-block"
                    >
                      Գրանցել նոր
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setIsOpen(true)}>
                        Աշխատակից
                      </Dropdown.Item>
                      {/* <Dropdown.Item onClick={() => setIsOpenRole(true)}>
                        Դեր
                      </Dropdown.Item> */}
                    </Dropdown.Menu>
                  </Dropdown>

                  {isOpen && (
                    <CreateUser
                      setIsOpen={setIsOpen}
                      refreshData={() => refreshData()}
                      updateUsersCount={updateUsersCount}
                    />
                  )}
                   {/* {isOpenRole && (
                    <AddUserRole
                    setIsOpenRole={setIsOpenRole}
                      getUsers={() => getUsers()}
                      updateUsersCount={updateUsersCount}
                    />)} */}
                  {/*
										<a className="dropdown-item" href="#">Type2</a>
										<a className="dropdown-item" href="#">Type3</a>
										<a className="dropdown-item" href="#">Type4</a>
										*/}
                </div>
              </div>
              <div className="contact-options-wrap">
                {/*
								<a className="btn btn-icon btn-flush-dark flush-soft-hover dropdown-toggle no-caret active" href="#" data-bs-toggle="dropdown">
									<span className="icon">
										<span className="feather-icon">
											<FeatherIcon icon="list" />
										</span>
									</span>
								</a>
							*/}
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
                {/*
									<div className="v-separator d-lg-block d-none"></div>
                                         
										 <a className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret  d-lg-inline-block d-none  ms-sm-0" href="#" data-bs-toggle="dropdown">
											<span className="icon" data-bs-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Manage Contact">
												<span className="feather-icon">
													<FeatherIcon icon="settings" />
												</span>
											</span>
										 </a>
										 
										<div className="dropdown-menu dropdown-menu-end">
                                             <a className="dropdown-item" href="#">Manage User</a>
                                             <a className="dropdown-item" href="#">Import</a>
                                             <a className="dropdown-item" href="#">Export</a>
                                             <div className="dropdown-divider"></div>
                                             <a className="dropdown-item" href="#">Send Messages</a>
                                             <a className="dropdown-item" href="#">Delegate Access</a>
                                         </div>
                                         <a className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret d-lg-inline-block d-none" href="#" data-bs-toggle="dropdown"><span className="icon" data-bs-toggle="tooltip" data-placement="top" title="" data-bs-original-title="More"><span className="feather-icon"><FeatherIcon icon="more-vertical" /></span></span></a>
                                         <div className="dropdown-menu dropdown-menu-end">
                                             <a className="dropdown-item" href="profile.html"><span className="feather-icon dropdown-icon"><FeatherIcon icon="star" /><i data-feather="star"></i></span><span>Stared Contacts</span></a>
                                             <a className="dropdown-item" href="#"><span className="feather-icon dropdown-icon"><FeatherIcon icon="archive" /><i data-feather="archive"></i></span><span>Archive Contacts</span></a>
                                             <div className="dropdown-divider"></div>
                                             <a className="dropdown-item" href="email.html"><span className="feather-icon dropdown-icon"><FeatherIcon icon="slash" /><i data-feather="slash"></i></span><span>Block Content</span></a>
                                             <a className="dropdown-item" href="email.html"><span className="feather-icon dropdown-icon"><FeatherIcon icon="external-link" /><i data-feather="external-link"></i></span><span>Feedback</span></a>
                                         </div>
                                         <a className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover hk-navbar-togglable d-sm-inline-block d-none" href="#" data-bs-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Collapse">
                                             <span className="icon">
                                                 <span className="feather-icon"><FeatherIcon icon="list" /><i data-feather="chevron-up"></i></span>
                                                 <span className="feather-icon d-none"><FeatherIcon icon="list" /><i data-feather="chevron-down"></i></span>
                                             </span>
                                         </a>
										 
										 */}
              </div>
            </header>
            <div className="contact-body">
              <div data-simplebar className="nicescroll-bar">
                <div className="contact-list-view">
                  <div
                    id="scrollableDiv"
                    style={{ height: "80vh", overflow: "auto" }}
                  >
                      <UsersTable
                        confirmRef={confirmUserRef}
                        selectedItem={selectedItem}
                        selectedItemId={selectedItemId}
                        handleDeleteItem={handleDeleteItem}
                        handleOpenModal={handleOpenModal}
                        handleCloseModal={handleCloseModal}
                        users={users}
                        setUsers={setUsers}
                        //getUsers={getUsers}
                        dataReceived={dataReceived}
                        refreshData={()=>refreshData()}
                      />
                     <ReactPaginate
                      previousLabel = {"Հետ"}    
                      nextLabel = {"Առաջ"}
                      pageCount = {pageCount}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </HelmetProvider>
  );
};

export default Users;
