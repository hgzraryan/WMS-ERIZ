import React, { useState } from 'react'
import { Modal } from "react-bootstrap";
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { deleteNullProperties } from '../utils/helper';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
function ConfirmIncomingModal({modalData,
    setRepeateOutgoing,refreshData}) {
        const axiosPrivate = useAxiosPrivate()
          const [errMsg, setErrMsg] = useState("");
        
          const methods = useForm({
            mode: "onChange",
          });
        console.log(modalData)
          const notify = (text) =>
            toast.success(text, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          const onSubmit = methods.handleSubmit(
            async (
           
            ) => {
              const newOutgoingProduct = {
                ...modalData,
                incomingProductId:modalData.incomingProductId,
               
              };
              const updatedData = deleteNullProperties(newOutgoingProduct);
        
              console.log(newOutgoingProduct);
              try {
                await axiosPrivate.post('repeatIncoming', updatedData, {
                  headers: { "Content-Type": "application/json" },
                  withCredentials: true,
                });
        
                setRepeateOutgoing(false);
                refreshData();
                notify(`Գործարքը կրկնօրինակված է`);
              } catch (err) {
                if (!err?.response) {
                  setErrMsg("No Server Response");
                } else {
                  setErrMsg(" Failed");
                }
              }
            }
          );
  return (
     <Modal
             show={() => true}
             size="md"
             onHide={() => setRepeateOutgoing(false)}
           >
             <Modal.Header closeButton>
               <Modal.Title style={{ width: "100%", textAlign: "center" }}>
               {`Կրկնօրնակել <${modalData.incomingProductId}> համարի գործարքը`}
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
                         <div className="d-flex justify-content-between">  <span>Գործարքի համար </span> <span>{modalData.incomingProductId}</span></div>
                           <div className="separator-full m-0"></div>
                           <div className="d-flex justify-content-between">  <span>Ապրանքի անվանում </span> <span>{modalData.name}</span></div>
                           <div className="separator-full m-0"></div>
                           <div className="d-flex justify-content-between">  <span>Քանակ </span> <span>{modalData.quantity}</span></div>
                           <div className="separator-full m-0"></div>
                           <div className="d-flex justify-content-between">  <span>Գին </span> <span>{modalData.price}</span></div>
                           <div className="separator-full m-0"></div>
                           <div className="d-flex justify-content-between">  <span>Պահեստ</span> <span>{modalData.warehouseName}</span></div>
                           <div className="separator-full m-0"></div>
                           <div className="d-flex justify-content-between">  <span>Վարորդ</span> <span>{modalData.driverName}</span></div>
                           <div className="separator-full m-0"></div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div style={{display:'flex', flexDirection:'row-reverse'}}>
                        <p style={{color:'red'}}>{errMsg}</p>
                     </div>
                         <div className="modal-footer ">                   
                           <button
                             type="button"
                             className="btn btn-secondary"
                             onClick={() => setRepeateOutgoing(false)}
                           >
                             Փակել
                           </button>
                           <button
                        type="button"
                        onClick={onSubmit}
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Կրկնօրնակել
                      </button>
                         </div>
             </Modal.Body>
           </Modal>
  )
}

export default ConfirmIncomingModal
