import { useForm } from "react-hook-form";
import useAxiosPrivate from "./useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';

const useSubmitForm = (REGISTER_URL,editorRef, getData,setErrMsg,handleToggleCreateModal) => {
    
    const axiosPrivate = useAxiosPrivate();  
    const navigate = useNavigate();  
    const location = useLocation();    
    const methods  = useForm({
        mode: "onChange",
      });
    const notify = (text) => toast.success(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

        const onSubmit = methods.handleSubmit(async (data) => {
            const newData = {
              ...data,
              additional: editorRef.current?.getContent({ format: "text" }),
            };
            try {
              await axiosPrivate.post(REGISTER_URL, newData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              });
              handleToggleCreateModal(false);
              getData();
              notify(`${newData.name} ավելացված է`);
            } catch (err) {
              if (!err?.response) {
                setErrMsg("No Server Response");
              } else if (err.response?.status === 409) {
                setErrMsg("Username Taken");
              } else {
                setErrMsg(" Failed");
              }
            }
          });
    
      return {
        onSubmit,methods
    }
}
export default useSubmitForm;