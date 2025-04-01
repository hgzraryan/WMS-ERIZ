import moment from 'moment'
import { Modal } from 'react-bootstrap'
function ManufacturersInfoModal({setModalInfo,modalInfo}) {
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
                  </div>
                  <div className="w-100">
                       <div className="d-flex justify-content-between">  <span>Հ/Հ </span> <span>{modalInfo?.manufacturerId}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Անվանում </span> <span>{modalInfo?.name}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Կազակերպության տեսակը </span> 
                       <span>
                        {modalInfo?.companyType==="IE"?'ԱՁ':modalInfo?.companyType==='LLC'?'ՍՊԸ':'Այլ'}
                        </span>
                        </div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Հավելյալ տվյալներ</span> <span>{modalInfo?.additionalData}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Ստեղծված է</span> <span>{modalInfo?.createdAt && moment.utc(modalInfo.createdAt).format('DD-MM-YYYY HH:mm')}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Թարմացվել է</span> <span>{modalInfo?.updatedAt && moment.utc(modalInfo.updatedAt).format('DD-MM-YYYY HH:mm')}</span></div>
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
export default ManufacturersInfoModal
