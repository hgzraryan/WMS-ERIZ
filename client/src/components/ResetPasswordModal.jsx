import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import { Input } from './Input';
import { Form, FormProvider, useForm } from "react-hook-form";
import { confirmPassword_validation, newPassword_validation, password_validation,  } from '../utils/inputValidations';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { CHANGE_USERPASSWORD } from '../utils/constants';

function ResetPasswordModal({ resetPassword, setResetPassword,id }) {
    const axiosPrivate = useAxiosPrivate()
    const [errMsg, setErrMsg] = useState("");

    const methods = useForm({
        mode: "onChange",
    });
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
    const { handleSubmit, watch } = methods;

    // Watch the new password to validate confirm password
    const newPassword = watch('newPassword');

    const onSubmit = async ({confirmNewPassword,newPassword,oldPassword}) => {
        //console.log('Password Reset Data:', data);
        // Handle password reset logic
        try {
                  const resp = await axiosPrivate.post(CHANGE_USERPASSWORD, 
                    {
                        confirmNewPassword,
                        newPassword,
                        oldPassword,
                        userId:id
                  }, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                  });
                  console.log(resp)
                  if(!!resp?.data?.success){

                      setResetPassword(false)
                      notify(
                        `Գաղտնաբառը հաջողությամբ փոփոխվել է`
                      );
                  }else if(!resp?.data?.success){
                    setErrMsg('Գաղտնաբառը սխալ է')
                  }
                //   handleToggleCreateModal(false);
                //   refreshData();
                //   notify(
                //     `${newAgent.name} գործընկերը ավելացված է`
                //   );
                } catch (err) {
                  if (!err?.response) {
                    setErrMsg("No Server Response");
                  }  else {
                    setErrMsg(" Failed");
                  }
                }
    };

    return (
        <Modal
            show={resetPassword}
            size="md"
            onHide={() => setResetPassword(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ width: "100%", textAlign: "center" }}>
                    Գաղտնաբառի փոփոխություն
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="contact-body contact-detail-body">
                    <FormProvider {...methods}>
                        <Form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" className="container">
                            <div className="card">

                                <div className="card-body">
                                    <div className="modal-body">
                                        <div className="row gx-3">
                                            {/* Old Password Input */}
                                            <div className="col-sm-12">
                                                <Input
                                                    label="Գաղտնաբառ"
                                                    type="password"
                                                    name="oldPassword"
                                                    validation={password_validation}
                                                />
                                            </div>

                                            {/* New Password Input */}
                                            <div className="col-sm-12">
                                                <Input
                                                    label="Նոր գաղտնաբառ"
                                                    type="password"
                                                    name="newPassword"
                                                    validation={newPassword_validation}
                                                />
                                            </div>

                                            {/* Confirm New Password Input */}
                                            <div className="col-sm-12">
                                                <Input
                                                    label="Կրկնել"
                                                    type="password"
                                                    name="confirmNewPassword"
                                                    validation={{
                                                        ...confirmPassword_validation,
                                                        validate: value => value === newPassword || 'Գաղտնաբառերը չեն համընկնում',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {!!errMsg && (
                                        <div className='d-flex flex-row-reverse'>
                                            <p style={{color:'red', fontSize:'14px'}}>{errMsg}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="modal-footer align-items-center">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setResetPassword(false)}
                                    >
                                        Չեղարկել
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Ավելացնել
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </FormProvider>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ResetPasswordModal;
