import React, { useRef, useState } from 'react'
import { PARTNERS_URL } from '../../utils/constants';
import useDeleteData from '../../hooks/useDeleteData';
import useGetData from '../../hooks/useGetData';
import ReactPaginate from 'react-paginate';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import AddPartner from '../addViews/AddPartner';
import { Dropdown } from "react-bootstrap";
import { HelmetProvider,Helmet } from 'react-helmet-async'
import PartnersTable from '../viewTables/PartnersTable';

function Partners() {
    const confirmUserRef = useRef("");
    const [isOpen, setIsOpen] = useState(false);  
    const [selectedItem, setSelectedItem] = useState("");  
    const [selectedItemId, setSelectedItemId] = useState(null);  
    const [currentPage, setCurrentPage] = useState(0);    
    const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100)));  
    // const [partners, setPartners] = useState([
    //     {
    //         partnerId:47001,
    //         name:'Կարեն Հարությունյան',
    //         companyType:'Ֆիզ անձ',
    //         respPersonFullName:'Կարեն Հարությունյան',
    //         contact:{
    //             phone:'+37485965823',
    //             addPhone:'+48979616669',
    //             email:'asd@asdasd.er',
    //             address:{
    //                 country:"Armenia",
    //                 state:"Yerevan",
    //                 city:"Yerevan",
    //                 street:"Abovyan 15-25",
    //                 zipCode:'1235',
    //             }
    //         },
    //         currency:'AMD',
    //         bankAccNumber:123456798,
    //         bankName:'InecoBank',
    //         partnerType:'Producer',
    //         productCategorie:'meat'
    //     },
    //     {
    //         partnerId:47002,
    //         name:'Աշոտ Հարությունյան',
    //         companyType:'Իրավ․ անձ',
    //         respPersonFullName:'Կարեն Հարությունյան',
    //         contact:{
    //             phone:'+37485965823',
    //             addPhone:'+48979616669',
    //             email:'asd@asdasd.er',
    //             address:{
    //                 country:"Armenia",
    //                 state:"Yerevan",
    //                 city:"Yerevan",
    //                 street:"Abovyan 15-25",
    //                 zipCode:'1235',
    //             }
    //         },
    //         currency:'AMD',
    //         bankAccNumber:123456798,
    //         bankName:'InecoBank',
    //         partnerType:'Producer',
    //         productCategorie:'meat'
    //     }
    // ]);  
    //const pageCount = Math.ceil(usersCount/usersPerPage)
  
  const {
      data: partners,
      setData: setPartners,
      // hasMore,
      // checkData,
      refreshData
    } = useGetData(PARTNERS_URL,currentPage,usersPerPage);
   //-------------------
    
    // const { handleDeleteItem,updateUsersCount } = useDeleteData(
    //   PARTNERS_URL,
    //   confirmUserRef,
    //   selectedItem,
    //   setSelectedItemId,
    //   "username",
    //   refreshData
      
    // );
   const handlePageClick = ({ selected: selectedPage }) => {
      setCurrentPage(selectedPage);
      //updateUsersCount();
  }
    const refreshPage = () => {
      let paglink = document.querySelectorAll(".page-item");
      paglink[0]?.firstChild.click();
      refreshData()
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
                    <h1>Գործընկերներ</h1>
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
                      Գործընկեր
                      </Dropdown.Item>
                      {/* <Dropdown.Item onClick={() => setIsOpenRole(true)}>
                        Դեր
                      </Dropdown.Item> */}
                    </Dropdown.Menu>
                  </Dropdown>

                  {isOpen && (
                    <AddPartner
                      setIsOpen={setIsOpen}
                      //refreshData={() => refreshData()}
                      //updateUsersCount={updateUsersCount}
                    />
                  )}
                 
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
                      <PartnersTable
                        confirmRef={confirmUserRef}
                       // selectedItem={selectedItem}
                        //selectedItemId={selectedItemId}
                        //handleDeleteItem={handleDeleteItem}
                        handleOpenModal={handleOpenModal}
                        handleCloseModal={handleCloseModal}
                        partners={partners}
                        setPartners={setPartners}
                        //getUsers={getUsers}
                        refreshData={refreshData}
                      />
                     <ReactPaginate
                      previousLabel = {"Հետ"}    
                      nextLabel = {"Առաջ"}
                      pageCount = {5}
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
    </div>
    </HelmetProvider>
  )
}

export default Partners
