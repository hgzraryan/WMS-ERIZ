import React, { useRef, useState } from 'react'
import ErrorSvg from "../../dist/svg/error.svg";
import { Modal } from "react-bootstrap";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { Input } from '../Input';
import { name_validation } from '../../utils/inputValidations';
import { Editor } from '@tinymce/tinymce-react';
import { LEGALFORMS_URL, REGISTER_LEGALFORM } from '../../utils/constants';
import { deleteNullProperties } from '../../utils/helper';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
function LegalFormEdit({ legalForm, setEditRow, refreshData }) {
    const navigate = useNavigate()
    const [errMsg, setErrMsg] = useState("");
    const editorRef = useRef(null);

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
          const newLegalForm = {
            name:name?.trim() !== legalForm?.name?.trim() ? name : null,
            additional: editorRef.current.getContent({ format: "text" }).trim()!==legalForm?.additional?.trim()?editorRef.current.getContent({ format: "text" }):null,
    

          };
           const updatedFields = deleteNullProperties(newLegalForm);
    
          console.log(newLegalForm);
          try {
            await axiosPrivate.put(LEGALFORMS_URL, { updatedFields, id: legalForm.customerId }, {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            });
            setEditRow(false);
            refreshData();
            notify(`${newLegalForm.name} տվյալները թարմացված են`);
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
    <Modal show={() => true} size="xl" onHide={() => setEditRow(false)}>
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
                            <Input {...name_validation} defaultValue={legalForm?.name}/>
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
                            <Editor
                                apiKey={process.env.REACT_APP_EDITOR_KEY}
                                onInit={(evt, editor) =>
                                  (editorRef.current = editor)
                                }
                                initialValue={legalForm?.additional}
                                init={{
                                  height: 300,
                                  plugins:"anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount pagembed linkchecker",
                                  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                  tinycomments_mode: 'embedded',
                                  tinycomments_author: 'Author name',
                                  mergetags_list: [
                                    { value: 'First.Name', title: 'First Name' },
                                    { value: 'Email', title: 'Email' },
                                  ],
                                  ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                }}
                                
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
                      onClick={() => setEditRow(false)}
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

export default LegalFormEdit
