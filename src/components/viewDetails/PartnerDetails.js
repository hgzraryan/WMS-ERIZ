 /* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import missingAvatar from "../../dist/img/Missing.svg";
import mobileSvg from "../../dist/svg/mobileSvg.svg";
import emailSvg from "../../dist/svg/emailSvg.svg";
import LoadingSpinner from "../LoadingSpinner";
import userSamplePhoto from "../../dist/img/Missing.svg";
import profileBgImg from "../../dist/img/profile-bg.jpg";
import moment from "moment";
import ResetPasswordModal from "../ResetPasswordModal";
import resetPassSVG from "../../dist/svg/resetPass.svg";
import { Checkbox } from "../Checkbox";
import {
  useBlockLayout,
  useFilters,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import CustomTable from "../CustomTable";
function PartnerDetails() {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate();
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const [activeLink, setActiveLink] = useState('tab_summery'); 
  const [pageTab, setPageTab] = useState('tab_summery')
  const handleOpenResetPassModal = (value) => {
    setResetPassword((prev) => value);
   };
  const handleLinkClick = (linkId) => {
    setActiveLink(linkId);
    setPageTab(linkId)
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPrivate.get(`/partners/${id}`);
        setIsLoading(false);
        setUserDetails((prevUsers) => response.data);
        // setCurrentPage((prev) => prev = 1);
      } catch (err) {
        console.error(err);
        //navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getData();
  }, []);
  const columns1 = useMemo(
    () => [
      {
        Header: (event) => (
          <>
            
            <div  className="columnHeader">ID</div>
          </>
        ),
        accessor: "outgoingProductId",
        sortable: true,
        Cell: ({ row }) => (
          <div className="d-flex align-items-center justify-content-center">
           {row.original?.actionId }
           {row.original?.actionType==='incoming'?<FeatherIcon icon='arrow-down'/>:row.original?.actionType==='outgoing'?<FeatherIcon icon='arrow-up'/>:'' }
           {}
          </div>
        ),
        width: 80,
        
      },
      {
        Header: (event) => (
          <>
            
            <div  className="name">Անվանում</div>
          </>
        ),
        accessor: "productName",
        sortable: true,
        width: 350,
        
      },
      {
        Header: (event) => (
          <>
            
            <div  className="name">Ամսաթիվ</div>
          </>
        ),
        accessor: "actionDate",
        sortable: true,
        // Filter: ({ column: { id } })=>(
        //   <ColumnFilter
        //     id={id}
        //     setData={setProductMovements}
        //     data={productMovements}
        //     placeholder={['startDate','endDate']}
        //     getUrl={PRODUCTSMOVEMENTS_URL}
        //     searchUrl={PRODUCTSMOVEMENTS__SEARCH_URL}
        //     handleSearchPageCount={(val)=>handleSearchPageCount(val)}
        //     filterData={filterData}
        //     setFilterData={(newFilterData) => {
        //         setFilterDataJSON(JSON.stringify({...filterData, ...newFilterData}))
        //         setFilterData(newFilterData)   
        //     }}
        //   />
        // ),    
        width: 150,
        
      },
      {
          Header: (event) => (
            <>
              
              <div  className="price">Գումար</div>
            </>
          ),
          accessor: "price",
          sortable: true,
          width: 200,
          
        },
      {
        Header: (event) => (
          <>
            
            <div  className="quantity">Քանակ</div>
          </>
        ),
        accessor: "quantity",
        sortable: true,
        Cell: ({ row }) => (
          <div className="d-flex align-items-center justify-content-center">
           {row.original?.quantity+" " +row.original?.unit}
          </div>
        ),
        width: 100,              
      },    
      {
        Header: (event) => (
          <>
            
            <div  className="quantity">Մնացորդ</div>
          </>
        ),
        accessor: "balance",
        sortable: true,
        Cell: ({ row }) => (
          <div className="d-flex align-items-center justify-content-center">
           {row.original?.balance}
          </div>
        ),
        width: 100,              
      },    
      {
        Header: (event) => (
          <>
            
            <div  className="quantity">Վարորդ</div>
          </>
        ),
        accessor: "driver",
        sortable: true,
        width: 200,              
      },    
      {
        Header: (event) => (
          <>
            
            <div  className="quantity">Պահեստ</div>
          </>
        ),
        accessor: "warehouse",
        sortable: true,
        width: 200,              
      },    
    ],
    []
  );

  return (
    <>
     {!!resetPassword && (
        <ResetPasswordModal
        id={userDetails?.userId}
        resetPassword={resetPassword}
        setResetPassword={setResetPassword}
        />
      )}
     <Suspense fallback={<LoadingSpinner />}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="hk-pg-body p-2">
            <div className="profile-wrap">
              <div className="profile-img-wrap">
                <img
                  className="img-fluid rounded-5"
                  src={profileBgImg}
                  alt="Description"
                />
              </div>
              <div className="profile-intro">
                <div className="card card-flush mw-400p bg-transparent">
                  <div className="card-body">
                    <div className="avatar avatar-xxl avatar-rounded position-relative mb-2">
                      <img
                        src={userSamplePhoto?userSamplePhoto:missingAvatar}
                        alt="user"
                        className="avatar-img border border-4 border-white"
                      />
                      <span className={`badge badge-indicator ${userDetails.isActive ? 'badge-success' : 'badge-danger'} badge-indicator-xl position-bottom-end-overflow-1 me-1`}></span>
                    </div>
                    <h4>
                      {userDetails?.name}
                         {/* <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                data-bs-toggle="tooltip"
                data-placement="top"
                title="Edit"
                href="#"
                onClick={() => handleOpenEditModal(userDetails)}
              >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="edit" />
                  </span>
             
                </span>
              </a> */}
              {/* password can be changed only by current useror superAdmin */}
              {/* {(superAdmin || storedUser?.userId === userDetails.userId) &&
                         <a
                         className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                         data-bs-toggle="tooltip"
                         data-placement="top"
                         title="Change password"
                         href="#"
                         onClick={() => handleOpenResetPassModal(userDetails)}
                         >
                <span className="icon">
                  <span className="feather-icon">
                  <img
                src={resetPassSVG}
                width="20px"
                height="20px"
                alt="resetPassSVG"
                className="me-2"
                />
                  </span>
             
                </span>
              </a>
               }  */}
                      {/* <i
                        className="bi-check-circle-fill fs-6 text-blue"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title=""
                        data-bs-original-title="Top endorsed"
                      ></i> */}
                    </h4>

                    <ul className="list-inline fs-7 mt-2 mb-0">
                      <li className="list-inline-item d-sm-inline-block d-block mb-sm-0 mb-1 me-3">
                        <img
                          src={mobileSvg}
                          width="15px"
                          height="15px"
                          alt="mobile"
                          className="me-2"
                        />
                        <span style={{ fontSize: "1.1rem" }}>
                          {userDetails?.contact?.phone || ""}
                        </span>
                      </li>

                      <li className="list-inline-item d-sm-inline-block d-block mb-sm-0 mb-1 me-3">
                        <img
                          src={emailSvg}
                          width="15px"
                          height="15px"
                          alt="email"
                          className="me-2"
                        />
                        <span style={{ fontSize: "1.1rem" }}>
                          {userDetails?.email || ""}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <header className="profile-header">
                <ul className="nav nav-line nav-tabs nav-icon nav-light h-100 d-md-flex d-none">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeLink === "tab_summery" ? "active" : ""
                      }`}
                      onClick={() => handleLinkClick("tab_summery")}
                      data-bs-toggle="tab"
                      href="#"
                    >
                      <span className="nav-icon-wrap">
                        <span className="feather-icon">
                          <FeatherIcon icon="zap" />
                        </span>
                      </span>
                      <span className="nav-link-text">Գլխավոր</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-toggle="tab"
                      href="#"
                      className={`nav-link ${
                        activeLink === "tab_movements" ? "active" : ""
                      }`}
                      onClick={() => handleLinkClick("tab_movements")}
                    >
                      <span className="nav-icon-wrap">
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                          <FeatherIcon icon="repeat" />
                          </span>
                        </span>
                      </span>
                      <span className="nav-link-text">Ապրանքների շարժ</span>
                    </a>
                  </li>
                </ul>
              </header>
              <div className="row mt-7">
                {pageTab === "tab_summery" && (
                  <>
                    <div className="col-lg-4 mb-lg-0 mb-3">
                      <div className="card card-border mb-lg-4 mb-3">
                        <div className="card-header card-header-action"></div>

                        <ul className="list-group list-group-flush">
                            <li className="list-group-item border-0">
                              <span>
                                <i className="bi bi-file-earmark-person text-disabled me-2"></i>
                                <span className="text-muted">Նույնականացման համար:</span>
                              </span>
                              <span className="ms-2">
                                {userDetails?.userId}
                              </span>
                            </li>
                            <li className="list-group-item border-0">
                              <span>
                                <i className="bi bi-geo-alt-fill text-disabled me-2"></i>
                                <span className="text-muted">Հասցե:</span>
                              </span>
                              <span className="ms-2">
                                {userDetails?.contact?.address?.country + ", " + userDetails?.contact?.address?.state
                                + ", " + userDetails?.contact?.address?.city+ ", " + userDetails?.contact?.address?.street
                                + ", " + userDetails?.contact?.address?.zipCode}
                              </span>
                            </li>
                            {/* <li className="list-group-item border-0">
                              <span>
                                <i className="bi bi-calendar-check-fill text-disabled me-2"></i>
                                <span className="text-muted">Սեռ:</span>
                              </span>
                              <span className="ms-2">{userDetails?.gender === 'Male' ? 'Արական' :userDetails?.gender === 'Female'? 'Իգական':''}</span>
                            </li> */}
                            <li className="list-group-item border-0">
                              <span>
                                <i className="bi bi-calendar-event text-disabled me-2"></i>
                                <span className="text-muted">Գրանցման ամսաթիվ:</span>
                              </span>
                              <span className="ms-2">{userDetails?.createdAt && moment.utc(userDetails?.createdAt).format('DD-MM-YYYY HH:mm')}</span>
                            </li>
                            <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-calendar-event text-disabled me-2"></i>
                              <span className="text-muted">
                                Վերջին թարմացում:
                              </span>
                            </span>
                            <span className="ms-2">
                            {userDetails?.updatedAt && moment.utc(userDetails?.updatedAt).format('DD-MM-YYYY HH:mm')}
                            </span>
                          </li>
                            <li className="list-group-item border-0">
                              <span>
                                <i className="bi bi-calendar-event text-disabled me-2"></i>
                                <span className="text-muted">Ծննդյան ամսաթիվ:</span>
                              </span>
                              <span className="ms-2">{userDetails?.birthday && moment.utc(userDetails?.birthday).format('DD-MM-YYYY')}</span>
                            </li>
                            <li className="list-group-item border-0">
                              <span>
                                <i className="bi bi-gender-ambiguous text-disabled me-2"></i>
                                <span className="text-muted">Սեռ:</span>
                              </span>
                              <span className="ms-2">{userDetails?.gender === 'Male' ? 'Արական' :userDetails?.gender === 'Female'? 'Իգական':''}</span>
                            </li>
                            <li className="list-group-item border-0">
                              <span>
                                <i className="bi bi-briefcase-fill text-disabled me-2"></i>
                                <span className="text-muted">Ընտանեկան կարգավիճակ:</span>
                              </span>
                              <span className="ms-2">{userDetails?.maritalStatus === 'married' ? 'Ամուսնացած' :'Չամուսնացած'}</span>
                            </li>
                            <li className="list-group-item border-0">
                              <span>
                                <i className="bi bi-briefcase-fill text-disabled me-2"></i>
                                <span className="text-muted">Դերեր:</span>
                              </span>
                              <span className="ms-2">{userDetails?.roles && Object.keys(userDetails?.roles).map((el)=>{
                                return el+", " 
                              })}</span>
                            </li>
                            <li className="list-group-item border-0">
                              <span>
                                <i className="bi bi-file-earmark-person text-disabled me-2"></i>
                                <span className="text-muted">Պատասխանատու անձ:</span>
                              </span>
                              <span className="ms-2">{userDetails?.respPersonFullName}</span>
                            </li>
                           
                            {/* <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-info text-disabled me-2"></i>
                              <span className="text-muted">
                                Հավելյալ տեղեկություն:
                              </span>
                            </span>
                            <span className="ms-2">
                              {userDetails?.additionalData}
                            </span>
                          </li> */}

                          </ul>
                      </div>

                      {/* <div className="card card-border mb-lg-4 mb-3">
                        <div className="card-header card-header-action">
                          <h6>
                            Links
                            <span className="badge badge-sm badge-light me-1">
                              5
                            </span>
                          </h6>
                          <div className="card-action-wrap">
                            <a href="#">View all</a>
                          </div>
                        </div>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item border-0">
                            <div className="media align-items-center">
                              <div className="media-head me-3">
                                <div className="avatar avatar-sm avatar-primary avatar-rounded">
                                  <span className="initial-wrap">G</span>
                                </div>
                              </div>
                              <div className="media-body">
                                <span className="d-block text-capitalize text-truncate mw-150p">
                                  Google
                                </span>
                                <span className="d-block text-muted fs-7 text-truncate mw-150p">
                                  google.com
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item border-0">
                            <div className="media align-items-center">
                              <div className="media-head me-3">
                                <div className="avatar avatar-sm avatar-pink avatar-rounded">
                                  <span className="initial-wrap">AR</span>
                                </div>
                              </div>
                              <div className="media-body">
                                <span className="d-block text-capitalize text-truncate mw-150p">
                                  Improve Your Business
                                </span>
                                <span className="d-block text-muted fs-7 text-truncate mw-150p">
                                  yahoo.com
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item border-0">
                            <div className="media align-items-center">
                              <div className="media-head me-3">
                                <div className="avatar avatar-sm avatar-warning avatar-rounded">
                                  <span className="initial-wrap">PR</span>
                                </div>
                              </div>
                              <div className="media-body">
                                <span className="d-block text-capitalize text-truncate mw-150p">
                                  Cast The Cookware
                                </span>
                                <span className="d-block text-muted fs-7 text-truncate mw-150p">
                                  yahoo.com
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item border-0">
                            <div className="media align-items-center">
                              <div className="media-head me-3">
                                <div className="avatar avatar-sm avatar-success avatar-rounded">
                                  <span className="initial-wrap">PR</span>
                                </div>
                              </div>
                              <div className="media-body">
                                <span className="d-block text-capitalize text-truncate mw-150p">
                                  The Universe Thought Sds
                                </span>
                                <span className="d-block text-muted fs-7 text-truncate mw-150p">
                                  facebook.com
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="card bg-primary text-center">
                        <div className="twitter-slider-wrap card-body">
                          <div className="twitter-icon text-center mb-3">
                            <i className="fab fa-twitter"></i>
                          </div>
                          <div
                            id="tweets_fetch"
                            className="owl-carousel light-owl-dots owl-theme"
                          ></div>
                        </div>
                      </div> */}
                    </div>
                    <div className="col-lg-8">
                      <div className="card card-border card-profile-feed mb-lg-4 mb-3">
                        <div className="card-header card-header-action">
                          <div className="media align-items-center">
                            <p>Հավելյալ տեղեկատվություն</p>
                          </div>
                          <div className="card-action-wrap"></div>
                        </div>
                        <div className="card-body">
                          <ol>
                            <li>
                              <p className="card-text mb-5">
                              {userDetails?.additionalData}
                              </p>
                            </li>
                          </ol>
                        </div>
                        <div className="card-footer justify-content-between"></div>
                      </div>
                    </div>
                  </>
                )}
                  {pageTab === "tab_movements" && (
                  <section className="d-flex flex-column">
                    {/* <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ border: "1px solid #000", borderRadius: "16px" }}
                    >
                      <h4>Ախտորոշումներ</h4>
                    </div> */}
                    <div>
                    <CustomTable data={[]} column={columns1} dataReceived={true} />
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        )}
      </Suspense>

    </>
  )
}

export default PartnerDetails
