import moment from 'moment'
import React from 'react'
import { Modal } from 'react-bootstrap'

function ProductsSummaryInfo({setModalInfo,modalInfo}) {
    return (
      <Modal
      show={() => true}
      size="md"
      onHide={() => setModalInfo(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
        {modalInfo?.name}
        {console.log(modalInfo)}
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
                       <div className="d-flex justify-content-between">  <span>ID </span> <span>{modalInfo?.warehouseBalanceId}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Անվանում </span> <span>{modalInfo?.name}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Քանակ </span> <span>{modalInfo?.balance}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Չափման միավոր</span> <span>{modalInfo?.unit==='weight'?'կգ':modalInfo?.unit==='volume'?'լիտր':''}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Ստեղծված է </span> <span>{modalInfo?.createdAt && moment.utc(modalInfo.createdAt).format('DD-MM-YYYY HH:mm')}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Թարմացվել է է </span> <span>{modalInfo?.updatedAt && moment.utc(modalInfo.updatedAt).format('DD-MM-YYYY HH:mm')}</span></div>
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
  

export default ProductsSummaryInfo
