import React from 'react'
import { Modal } from "react-bootstrap";
import moment from 'moment';
function WorkersInfoModal({setModalInfo,modalInfo}) {
    return (
        <Modal
          show={() => true}
          size="md"
          onHide={() => setModalInfo(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            {modalInfo.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>        
              <div className="contact-body contact-detail-body">
                <div data-simplebar className="nicescroll-bar">
                  <div className="d-flex flex-xxl-nowrap flex-wrap">
                    <div className="contact-info w-100">
                      <div className="d-flex justify-content-center align-items-center">
                        
                        {/* <img
                              width={"150px"}
                              height={"200px"}
                              style={{
                                borderRadius: "5px",
                              }}
                              src={infoModalImg}
                              className="infoImg"
                              alt="infoImg"
                            /> */}
                      </div>
                      <div className="w-100">
                           <div className="d-flex justify-content-between">  <span>ID </span> <span>{modalInfo.workerId}</span></div>
                           <div className="separator-full m-0"></div>
                           <div className="d-flex justify-content-between">  <span>ԱԱՀ </span> <span>{modalInfo.fullName}</span></div>
                           <div className="separator-full m-0"></div>
                           <div className="d-flex justify-content-between">  <span>Պաշտոն </span> <span>{modalInfo.workerRole}</span></div>
                           <div className="separator-full m-0"></div>
                           <div className="d-flex justify-content-between">  <span>Ծննդյան ամսաթիվ </span> <span>{modalInfo?.dateOfBirth}</span></div>
                           <div className="separator-full m-0"></div>
                           <div className="d-flex justify-content-between">  <span>Գրանցվել է </span> <span>{modalInfo.createdAt && moment.utc(modalInfo.createdAt).format('DD-MM-YYYY HH:mm')}</span></div>
                           <div className="separator-full m-0"></div>
                           <div className="d-flex justify-content-between">  <span>Վերջին թարմացում</span> <span>{modalInfo?.updatedAt && moment.utc(modalInfo?.updatedAt).format('DD-MM-YYYY HH:mm')}</span></div>
                           <div className="separator-full m-0"></div>
                           <div className="d-flex justify-content-between">  <span>Հասցե </span> <span>{modalInfo?.contact?.address?.country}, {modalInfo?.contact?.address?.state},{modalInfo?.contact?.address?.city},{modalInfo?.contact?.address?.street}</span></div>
                           <div className="separator-full m-0"></div>
                           <div className="d-flex justify-content-between">  <span>Փոստային համար </span> <span>{modalInfo?.contact?.address?.zipCode}</span></div>
                           <div className="separator-full m-0"></div>
                           <div className="d-flex justify-content-between">  <span>Էլ․ Հասցե </span> <span>{modalInfo?.contact?.email}</span></div>
                           <div className="separator-full m-0"></div>
                           <div className="d-flex justify-content-between">  <span>Հեռախոս </span> <span>{modalInfo?.contact?.phone}</span></div>
                           <div className="separator-full m-0"></div> 
                           <div className="d-flex justify-content-between">  <span>Կոնտակտային անձ </span> <span>{modalInfo?.emergencyContactName}</span></div>
                           <div className="separator-full m-0"></div> 
                           <div className="d-flex justify-content-between">  <span>Կոնտակտային անձի հեռախոս </span> <span>{modalInfo?.emergencyContactNumber}</span></div>
                           <div className="separator-full m-0"></div> 
                           <div className="d-flex justify-content-between">  <span>Հավելյալ տեղեկություն </span> <span>{modalInfo?.additional}</span></div>
                           <div className="separator-full m-0"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
                      <div className="modal-footer ">                   
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setModalInfo(false)}
                        >
                          Փակել
                        </button>
                      </div>
          </Modal.Body>
        </Modal>
      )
    }
export default WorkersInfoModal
