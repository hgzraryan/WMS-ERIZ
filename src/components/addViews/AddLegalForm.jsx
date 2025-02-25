import React, { useRef, useState } from 'react'
import ErrorSvg from "../../dist/svg/error.svg";
import { Modal } from "react-bootstrap";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { Input } from '../Input';
import { name_validation } from '../../utils/inputValidations';
import { Editor } from '@tinymce/tinymce-react';
import { REGISTER_LEGALFORM } from '../../utils/constants';
import { deleteNullProperties } from '../../utils/helper';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import ReactQuillEditor from '../views/ReactQuillEditor';

function AddLegalForm({handleToggleCreateModal,refreshData}) {
    const navigate = useNavigate()
    const [errMsg, setErrMsg] = useState("");
  const [additionalData, setAdditionalData] = useState('')

    const location = useLocation();

  const axiosPrivate = useAxiosPrivate();

    const methods = useForm({
        mode: "onChange",
      });
      const { trigger } = useForm();
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
          //data
          {
            name,
          }
        ) => {
          const newCustomer = {
            name,
            additional: additionalData,

          };
           const updatedData = deleteNullProperties(newCustomer);
    
          console.log(newCustomer);
          try {
            await axiosPrivate.post(REGISTER_LEGALFORM, updatedData, {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            });
    
            handleToggleCreateModal(false);
            refreshData();
            notify(`${newCustomer.name} հաճախորդը ավելացված է`);
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
    size="xl"
    onHide={() => handleToggleCreateModal(false)}
  >
    <Modal.Header closeButton>
      <Modal.Title style={{ width: "100%", textAlign: "center" }}>
        Ավելացնել նոր կազմակերպաիրավական ձև
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FormProvider {...methods}>
        <div className="contact-body contact-detail-body">
          <div data-simplebar className="nicescroll-bar">
            <div className="d-flex flex-xxl-nowrap flex-wrap">
              <div className="contact-info w-100">
                <Form
                  onSubmit={(e) => e.preventDefault()}
                  noValidate
                  autoComplete="off"
                  className="container"
                >
                  <div className="card">
                    <div className="card-header">
                      <a href="#">Կազմակերպաիրավական ձևի տվյալներ</a>
                      <button
                        className="btn btn-xs btn-icon btn-rounded btn-light"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title=""
                        data-bs-original-title="Edit"
                      >
                        <span
                          className="icon"
                          data-bs-toggle="modal"
                          data-bs-target="#editInfo"
                        >
                          <span class="feather-icon">
                            <FeatherIcon icon="edit-2" />
                          </span>
                        </span>
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="modal-body">
                        <div className="row gx-3">
                          <div className="col-sm-6">
                            <Input {...name_validation} />
                          </div>
                          
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  <div className="separator-full"></div>
                  <div className="card">
                    <div className="card-header">
                      <a href="#">Հավելյալ տվյալներ</a>
                      <button
                        className="btn btn-xs btn-icon btn-rounded btn-light"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title=""
                        data-bs-original-title="Edit"
                      >
                        <span
                          class="icon"
                          data-bs-toggle="modal"
                          data-bs-target="#moreContact"
                        >
                          <span class="feather-icon">
                            <FeatherIcon icon="edit-2" />
                          </span>
                        </span>
                      </button>
                    </div>
                    <div className="card-body" style={{ zIndex: "0" }}>
                      <div className="modal-body">
                        <form>
                          <div className="row gx-12">
                            <div className="col-sm-12">
                            <ReactQuillEditor
                                value={additionalData}
                                onChange={setAdditionalData}
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="separator-full"></div>

                  <div className="modal-footer align-items-center">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleToggleCreateModal(false)}
                    >
                      Չեղարկել
                    </button>
                    <button
                      type="button"
                      onClick={onSubmit}
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Ավելացնել
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </Modal.Body>
  </Modal>
  )
}

export default AddLegalForm
