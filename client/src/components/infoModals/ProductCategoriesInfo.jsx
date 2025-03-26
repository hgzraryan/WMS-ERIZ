import React from 'react'
import { Modal } from 'react-bootstrap'
import moment from 'moment';

function ProductCategoriesInfo({setData,data}) {
  return (
    <Modal
    show={() => true}
    size="md"
    onHide={() => setData(false)}
  >
    <Modal.Header closeButton>
      <Modal.Title style={{ width: "100%", textAlign: "center" }}>
      {data?.name}
      {console.log(data)}
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
                     <div className="d-flex justify-content-between">  <span>ID </span> <span>{data?.categoryId}</span></div>
                     <div className="separator-full m-0"></div>
                     <div className="d-flex justify-content-between">  <span>Անվանում </span> <span>{data?.name}</span></div>
                     <div className="separator-full m-0"></div>
                     <div className="d-flex justify-content-between">  <span>Ստեղծված է </span> <span>{data?.createdAt && moment.utc(data.createdAt).format('DD-MM-YYYY HH:mm')}</span></div>
                     <div className="separator-full m-0"></div>
                    {data?.attributs?.map((el)=>(
                        <>
                        <div className="d-flex justify-content-between">  <span>{el?.attributeName} </span> <span>{el?.attributeUnitLabel}</span></div>
                        <div className="separator-full m-0"></div>
                        </>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      
                <div className="modal-footer ">                   
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setData(false)}
                  >
                    Փակել
                  </button>
                </div>
    </Modal.Body>
  </Modal>
  )
}

export default ProductCategoriesInfo
