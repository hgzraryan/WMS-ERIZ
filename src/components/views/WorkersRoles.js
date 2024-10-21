import React, { useState, useRef, useMemo, useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import ReactPaginate from "react-paginate";
import { Dropdown } from "react-bootstrap";
import { HelmetProvider,Helmet } from 'react-helmet-async'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useRefreshData from "../../hooks/useRefreshData";
import useDeleteData from "../../hooks/useDeleteData";
import { WORKERSROLES_URL } from "../../utils/constants";
import useGetData from "../../hooks/useGetData";
import WorkersPositionsTable from "../viewTables/WorkersPositionsTable";
import AddWorkerRole from "../addViews/AddWorkerRole";

function WorkersRoles() {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(Number(pageNumber));
  const confirmWPRef = useRef("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRole, setIsOpenRole] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100)));
  const [searchCount,setSearchCount] = useState(null)
  const [searchId,setSearchId] = useState(null)
  const [searchTerms,setSearchTerms] = useState(null)
  const handleToggleCreateModal = (value) => {
    setIsOpen((prev) => value);
  };
  const handleSearchPageCount = ({count,searchTerms,id}) =>{
    setSearchCount(count)
    setSearchTerms(searchTerms)
    setSearchId(id)
  }
  const {
    data: workerRoles,
    setData: setWorkerRoles,
    dataCount,
    dataReceived
  } = useGetData(WORKERSROLES_URL,currentPage,usersPerPage,searchCount,null,searchId,searchTerms);
  const pageCount = searchCount?Math.ceil(searchCount/usersPerPage) :searchCount===0? 0:Math.ceil(dataCount/usersPerPage)
  const { refreshData,data } = useRefreshData(WORKERSROLES_URL, usersPerPage,pageNumber);
  useEffect(()=>{
    setWorkerRoles(data)
    },[data])
  //-------------------
  
  const { handleDeleteItem,updateUsersCount } = useDeleteData(
    WORKERSROLES_URL,
    confirmWPRef,
    selectedItem,
    setSelectedItemId,
    workerRoles,
    setWorkerRoles,
    "name",
    refreshData
    
  );
  
    //-------------------------PAGINATION---------------------------//  
    useEffect(() => {
      setCurrentPage(Number(pageNumber));
    }, [pageNumber]);
    const handlePageClick = ({ selected: selectedPage }) => {
      navigate(`/workersPositions/page/${selectedPage+1}`);
  }
  const refreshPage = () => {
    let paglink = document.querySelectorAll(".page-item");
    paglink[0]?.firstChild.click();
    //refreshData()
  };
  const handleOpenModal = (user) => {
    setSelectedItemId(true);
    setSelectedItem((prev) => user);
  };
  const handleCloseModal = () => {
    setSelectedItemId(null);
  };	
	//-------------------------
  return (
    <>
    <HelmetProvider>
       <div>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Workers Position</title>
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
                    <AddWorkerRole
                    handleToggleCreateModal={setIsOpen}
                      refreshData={() => refreshData()}
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
                    {/* <InfiniteScroll
                      dataLength={users.length}
                      next={() => checkData()}
                      hasMore={hasMore}
                      loader={<Loading />}
                      scrollableTarget="scrollableDiv"
                      endMessage={
                        <p>Տվյալներ չեն հայտնաբերվել բեռնելու համար:</p>
                      }
                    > */}
                    {console.log(workerRoles)}
                      <WorkersPositionsTable
                        confirmRef={confirmWPRef}
                        selectedItem={selectedItem}
                        selectedItemId={selectedItemId}
                         handleDeleteItem={handleDeleteItem}
                        handleOpenModal={handleOpenModal}
                        handleCloseModal={handleCloseModal}
                        workerRoles={workerRoles}
                        setWorkerRoles={setWorkerRoles}
                        dataReceived={dataReceived}

                        // refreshData={refreshData}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </HelmetProvider>
    </>
  )
}

export default WorkersRoles
