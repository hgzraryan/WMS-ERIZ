import React, { useRef, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { Modal } from "react-bootstrap";
import { REGISTER_WORKERROLE } from '../../utils/constants';
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import { name_validation, status_validation } from '../../utils/inputValidations';
import { Input } from '../Input';
import { Editor } from '@tinymce/tinymce-react';
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Select from "react-select";
import ErrorSvg from "../../dist/svg/error.svg";
const StatusTypes = [
    { value: 1, label: "Ակտիվ" },
    { value: 0, label: "Ոչ ակտիվ" },
  ];
function AddWorkerRole({ handleToggleCreateModal, refreshData }) {
    const [errMsg, setErrMsg] = useState("");
    const axiosPrivate = useAxiosPrivate();
  

    const methods = useForm({
      mode: "onChange",
    });
    const { trigger } = useForm();
  
    const editorRef = useRef(null);

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
    const onSubmit = methods.handleSubmit(async ({name,StatusTypes}) => {
      const newWorkerRole = {
        isActive:StatusTypes.value,
        name:name,
        additional: editorRef.current.getContent({ format: "text" }),
      };
  
      console.log(newWorkerRole);
      try {
        await axiosPrivate.post(REGISTER_WORKERROLE, newWorkerRole, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
  
        handleToggleCreateModal(false);
        refreshData();
        notify(
          `${newWorkerRole.name} գործընկերը ավելացված է`
        );
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        }  else {
          setErrMsg(" Failed");
        }
      }
    }); 

      
    return (
      <Modal
        show={() => true}
        size="xl"
        onHide={() => handleToggleCreateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            Ավելացնել նոր պաշտոն
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
                          <a href="#">Աշխատակցի պաշտոնի տվյալներ</a>
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
                              <div className="col-sm-6">
                                        <div className="d-flex justify-content-between me-2">
                                          <label
                                            className="form-label"
                                            htmlFor="StatusTypes"
                                          >
                                            Կարգավիճակ
                                          </label>
                                          {methods.formState.errors
                                            .StatusTypes && (
                                            <span className="error text-red">
                                              <span>
                                                <img src={ErrorSvg} alt="errorSvg" />
                                              </span>{" "}
                                              պարտադիր
                                            </span>
                                          )}
                                        </div>
                                        <div className="form-control">
                                          <Controller
                                            name="StatusTypes"
                                            control={methods.control}
                                            defaultValue={null}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                              <Select
                                                {...field}
                                                options={StatusTypes}
                                                placeholder={"Ընտրել"}
                                              />
                                            )}
                                          />
                                        </div>
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
                        <div className="card-body"style={{zIndex:'0'}}>
                          <div className="modal-body">
                            <form>
                              <div className="row gx-12">
                                <div className="col-sm-12">
                                  {console.log()}
                                <Editor
                                  apiKey={process.env.REACT_APP_EDITOR_KEY}
                                  onInit={(evt, editor) =>
                                    (editorRef.current = editor)
                                  }
                                  init={{
                                    height:300,
                                    plugins:
                                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount pagembed linkchecker",                                  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
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
    );
  }

export default AddWorkerRole
