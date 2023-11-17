import React, { useRef, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import FeatherIcon from "feather-icons-react";
import MissingAvatar from "../../dist/img/Missing.svg";
import axios from "./../../api/axios";
import { Form, FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import {
  firstName_validation,
  lastName_validation,
  email_validation,
  mobile_validation,
  pwd_validation,
  user_validation,
  position_validation,
  birthday_validation,
} from "../../utils/inputValidations";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {  toast } from 'react-toastify';

const REGISTER_URL = "/register";
function CreateUser({ setIsOpen,getUsers }) {
  const roles = useRef("");
  const multiselectRef = useRef("");
  const intupAvatarRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(MissingAvatar);
  const [rolesArray, setRolesArray] = useState([]);
  const [image, setImage] = useState("");
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const fileReader = new FileReader();
  const formData = new FormData();

  const methods = useForm({
    mode: "onChange",
  });
  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  /*------------------ Create user Component --------------------*/
  const handleToggleCreateModal = (value) => {
    setIsOpen((prev) => value);
  };
  /*------------------------------------------------*/
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
    const newUser = {
      ...data,
      roles: roles.current,
    };
    formData.append("text", JSON.stringify(newUser));
    formData.append("image", image);
    try {
      await axios.post(REGISTER_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      
      handleToggleCreateModal(false);
      getUsers("update");
      notify(`${newUser.firstName} ${newUser.lastName} աշխատակիցը ավելացված է`)

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
  const onRoleSelect = (data) => {
    let rolesArr = [];
    for (let role of data) {
      rolesArr.push(Object.values(role)[1]);
    }
    setRolesArray((prev) => (prev = rolesArr));
  };
  const onRoleDelete = (data) => {
    let rolesArr = [];
    for (let role of data) {
      rolesArr.push(Object.values(role)[0]);
    }
    setRolesArray((prev) => (prev = rolesArr));

    //reset selected options colors
    const elems = document.querySelectorAll(".chips");
    elems.forEach((element) => {
      element.classList.remove("chips");
    });
  };
  const onAdd = (e) => {
    roles.current = rolesArray;
    //multiselectRef.current.resetSelectedValues()
    const elems = document.querySelectorAll(".chip");
    elems.forEach((element) => {
      element.classList.add("chips");
    });
  };
  /*----------------ADD USER END---------------------*/
  fileReader.onloadend = () => {
    setImageUrl(fileReader.result);
  };

  const handleChangeFile = async (event) => {
    const image = event.target.files[0];
    if (!image.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setImage(image);
    try {
      formData.append("image", event.target.files[0]);
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (image) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setImageUrl(result);
        }
      };
      fileReader.readAsDataURL(image);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [image]);

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    if (event.dataTransfer.files && event.dataTransfer.files.length) {
      setImage(event.dataTransfer.files[0]);
      fileReader.readAsDataURL(event.dataTransfer.files[0]);
    }
  };
  const handleDragEmpty = (event) => {
    event.preventDefault();
    if (event.stopPropagation) {
      event.stopPropagation();
    }
  };
  let roleState = {
    options: [
      { name: "Admin", id: 1 },
      { name: "Editor", id: 2 },
      { name: "User", id: 3 },
    ],
  };

  return (
    <Modal
      show={() => handleToggleCreateModal(true)}
      size="xl"
      onHide={() => handleToggleCreateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Ավելացնել նոր աշխատակից
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
                    <div className="text-center mt-5">
                      <div className="dropify-circle edit-img">
                        <img
                          width={"100px"}
                          height={"100px"}
                          style={{
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                          onClick={() => intupAvatarRef.current.click()}
                          src={imageUrl}
                          className="avatar_upload_preview"
                          alt="preview"
                          onDrop={handleDrop}
                          onDragEnter={handleDragEmpty}
                          onDragOver={handleDragEmpty}
                        />
                        <input
                          hidden
                          type="file"
                          ref={intupAvatarRef}
                          onChange={handleChangeFile}
                          className="dropify-1"
                          //data-default-file="dist/img/avatar2.jpg"
                        />
                      </div>
                      <div className="cp-name text-truncate mt-3">
                        Աշխատակցի նկարը
                      </div>

                      <div
                        className="rating rating-yellow my-rating-4"
                        data-rating="3"
                      ></div>
                      <p>&nbsp;</p>
                    </div>

                    <div className="card">
                      <div className="card-header">
                        <a href="#">Անձնական տվյալներ</a>
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
                              <Input {...firstName_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...lastName_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...position_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...birthday_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...email_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...mobile_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...user_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...pwd_validation} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="separator-full"></div>
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
                      <div className="card-body">
                        <div className="modal-body">
                          <form>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    Designation
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value="Mandaline"
                                    placeholder="First Name"
                                    name="name1"
                                  />
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label className="form-label">Company</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value="Shane"
                                    placeholder="Last Name"
                                    name="lastname1"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label className="form-label">Language</label>
                                  <input
                                    className="form-control"
                                    type="email"
                                    value="contct@hencework.com"
                                    placeholder="Email Id"
                                    name="emailid1"
                                  />
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label className="form-label">Birthday</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value="10/24/1984"
                                    placeholder="Phone No"
                                    name="birthday1"
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div> */}

                    <div className="separator-full"></div>
                    <div className="card">
                      <div className="card-header">
                        <a href="#">Դերեր</a>
                        <button
                          className="btn btn-xs btn-icon btn-rounded btn-light"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Add Tags"
                        >
                          <span
                            className="icon"
                            data-bs-toggle="modal"
                            data-bs-target="#tagsInput"
                          >
                            <span className="feather-icon">
                              <FeatherIcon icon="edit-2" />
                            </span>
                          </span>
                        </button>
                      </div>
                      <div className="card-body">
                        <div className="modal-body">
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                          <h6 className="text-uppercase fw-bold mb-3">
                            Ավելացնել դերեր
                          </h6>
                          <form>
                            <div className="row gx-3">
                              <div className="col-sm-12">
                                <div className="form-group">
                                  <Multiselect
                                    options={roleState.options} // Options to display in the dropdown
                                    displayValue="name" // Property name to display in the dropdown options
                                    //selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    onSelect={onRoleSelect} // Function will trigger on select event
                                    onRemove={onRoleDelete} // Function will trigger on remove event
                                    closeOnSelect={true}
                                    id="input_tags_3"
                                    className="form-control"
                                    ref={multiselectRef}
                                    hidePlaceholder={true}
                                    placeholder="Ընտրել դերը"
                                  />
                                  {/* <select id="input_tags_3" className="form-control" multiple="multiple">
                                                                                  <option selected="selected">Collaborator</option>
                                                                                  <option selected="selected">Designer</option>
                                                                                  <option selected="selected">React Developer</option>
                                                                                  <option selected="selected">Promotion</option>
                                                                                  <option selected="selected">Advertisement</option>
                                                                              </select> */}
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="btn btn-primary float-end"
                              onClick={onAdd}
                              data-bs-dismiss="modal"
                            >
                              Ավելացնել
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>

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

export default CreateUser;
