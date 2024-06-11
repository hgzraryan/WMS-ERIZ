/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from 'react'
import { CUSTOMERS_URL, LEGALFORMS_URL } from '../../utils/constants';
import useDeleteData from '../../hooks/useDeleteData';
import useGetData from '../../hooks/useGetData';
import ReactPaginate from 'react-paginate';
import { HelmetProvider,Helmet } from 'react-helmet-async'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { Dropdown } from "react-bootstrap";
import LegalFormsTable from '../viewTables/LegalFormsTable';
import AddLegalForm from '../addViews/AddLegalForm';
import { useNavigate, useParams } from 'react-router-dom';

function LegalForms() {
    const navigate = useNavigate();
    const { pageNumber } = useParams();
    const confirmLegalFormRef = useRef("");
    const [isOpen, setIsOpen] = useState(false);  
    const [selectedItem, setSelectedItem] = useState("");  
    const [selectedItemId, setSelectedItemId] = useState(null);  
    const [currentPage, setCurrentPage] = useState(0);    
    const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100))); 
    const [searchCount,setSearchCount] = useState(null)
    const [searchParams,setSearchParams] = useState(null)
    
    const {
      data: legalForms,
      setData: setLegalForms,
      refreshData,
      dataCount
    } = useGetData(LEGALFORMS_URL,currentPage,usersPerPage,searchCount,null,searchParams);
    const pageCount = searchCount?Math.ceil(searchCount/usersPerPage) : Math.ceil(dataCount/usersPerPage)
    const { handleDeleteItem,updateUsersCount } = useDeleteData(
        LEGALFORMS_URL,
        confirmLegalFormRef,
      selectedItem,
      setSelectedItemId,
      "name",
      refreshData
      
    );
    const handleSearchPageCount = (data) =>{
      setSearchCount(data.count)
      setSearchParams(data.params)
    }
    const handleToggleCreateModal = (value) => {
        setIsOpen((prev) => value);
      };
    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
        //updateUsersCount();
      }
    const handleOpenModal = (user) => {
        setSelectedItemId(true);
        setSelectedItem((prev) => user);
      };
      const handleCloseModal = () => {
        setSelectedItemId(null);
      };	
      const refreshPage = () => {
        let paglink = document.querySelectorAll(".page-item");
        paglink[0]?.firstChild.click();
        refreshData()
      };
      return (
        <HelmetProvider>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Explore Customers</title>
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
                        <h1>Կազմակերպաիրավական ձևեր</h1>
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
                          Կազմակերպաիրավական ձև
                          </Dropdown.Item>
                          {/* <Dropdown.Item onClick={() => setIsOpenRole(true)}>
                            Դեր
                          </Dropdown.Item> */}
                        </Dropdown.Menu>
                      </Dropdown>
    
                      {isOpen && (
                        <AddLegalForm
                        handleToggleCreateModal={handleToggleCreateModal}
                        refreshData={() => refreshData()}
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
                  </div>
                </header>
                <div className="contact-body">
                  <div data-simplebar className="nicescroll-bar">
                    <div className="contact-list-view">
                      <div
                        id="scrollableDiv"
                        style={{ height: "80vh", overflow: "auto" }}
                      >
                          <LegalFormsTable
                            confirmRef={confirmLegalFormRef}
                            selectedItem={selectedItem}
                            selectedItemId={selectedItemId}
                            handleDeleteItem={handleDeleteItem}
                            handleOpenModal={handleOpenModal}
                            handleCloseModal={handleCloseModal}
                            legalForms={legalForms}
                            setLegalForms={setLegalForms}
                            refreshData={refreshData}
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

export default LegalForms
