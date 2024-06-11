import React from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';

function UserDeactivateModal({handleCloseEditModal,rowData,refreshData}) {
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate();
    const {userId,firstname,lastname,username,email,isActive} = rowData
    const handleDisableUser = (data) => {
   
      handleCloseEditModal(false);
    };
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
    const handleUserDetails = async (data) => {  
      console.log({id:userId,userStatus:isActive})
      try {
        const response = await axiosPrivate.post("/userStatusChange",{id:userId,userStatus:isActive?0:1},{
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        } );
        refreshData()
        handleDisableUser(true)
        notify(
          `Աշխատակցի կարգավիճակը փոխված է`
        );
        
      } catch (err) {
        console.log(err)
        // navigate(`/diagnostics/${diagnosticsId}`)
        // if (!err?.response) {
          //   setErrMsg("No Server Response");
          // } else if (err.response?.status === 409) {
            //   setErrMsg("Username Taken");
            // } else {
              //   setErrMsg(" Failed");
        // }
      }
    };
  return (
    <>
      <Modal
    show={() => true}
    size="xs"
    onHide={() =>handleCloseEditModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Աշխատակից
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Աշխատակցի նույնականացման համար։{" "+ userId}</p>
        <p>Աշխատակցի Անուն Ազգանուն։{" " + firstname + " " + lastname}</p>
        <p>Աշխատակցի Էլ․ հասցե։{" "+ email}</p>
        <p>Աշխատակցի Ծածկանուն։{" "+ username}</p>
      <div className="separator-full"></div>

<div className="modal-footer align-items-center d-flex">
{isActive ===1 && 
  <button
    type="button"
    onClick={()=>handleUserDetails('Cancelled')}
    className="btn btn-primary"
    data-bs-dismiss="modal"
  >
    Ապաակտիվացնել աշխատակցին
  </button>
}
{isActive ===0 && 
  <button
  type="button"
  onClick={()=>handleUserDetails()}
  className="btn btn-primary"
  data-bs-dismiss="modal"
  >
    Ակտիվացնել աշխատակցին
  </button>
  }
  <button
    type="button"
    className="btn btn-secondary"
    onClick={() => handleCloseEditModal(false)}
  >
    Փակել
  </button>
</div>
      </Modal.Body>
    </Modal>
    </>
  )
}

export default UserDeactivateModal
