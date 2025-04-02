/* eslint-disable no-unsafe-optional-chaining */

import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Input } from "../Input";
import { name_validation} from "../../utils/inputValidations";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {  MANUFACTURERS_URL, REGISTER_MANUFACTURER } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { deleteNullProperties } from "../../utils/helper";
import { toast } from "react-toastify";
import ReactQuillEditor from "../ReactQuillEditor";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import Select from "react-select";
import ErrorSvg from "../../dist/svg/error.svg";
import { customStyles } from "../customStyles";

const companyTypes = [
    {
      label: "ԱՁ",
      value: "IE",//Individual Entrepreneur
    },
    {
      label: "ՍՊԸ",
      value: "LLC",
    },
    {
      label: "Այլ",
      value: "Other",
    },
  ];
function ManufacturerEdit({ manufacturer,setEditRow, refreshData }) {
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate();
    const [additionalData, setAdditionalData] = useState(manufacturer.additionalData || '')
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
      const onSubmit = methods.handleSubmit(async (data) => {
        const newManufacturer = {
          name: data?.name || null,
          companyType: data?.companyType?.value,
          description: additionalData,
        };
        const updatedFields = deleteNullProperties(newManufacturer)
         try {
                  await axiosPrivate.put(MANUFACTURERS_URL, { updatedFields, id: manufacturer.manufacturerId }, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                  });
       
    
          setEditRow(false);
          refreshData();
          notify(
            `${newManufacturer.name} Արտադրողը ավելացված է`
          );
        } catch (err) {
          if (!err?.response) {
            setErrMsg("No Server Response");
          } else if (err.response?.status === 409) {
            setErrMsg("Username Taken");
          } else {
            setErrMsg("Failed");
          }
        }
      });
  return (
<Modal
      show={() => true}
      size="xl"
      onHide={() => setEditRow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Ապրանքի տեսակ
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
                        <a href="#">Ապրանքի տվյալներ</a>
                      </div>
                      <div className="card-body">
                        <div className="modal-body">
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...name_validation}  defaultValue={manufacturer?.name}/>
                        
                            </div>
                            <div className="col-sm-6">
                              <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-label"
                                  htmlFor="companyType"
                                >
                                  Կազմակերպության տեսակը
                                </label>
                                {methods.formState.errors.companyType && (
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
                                  name="companyType"
                                  control={methods.control}
                                  defaultValue={companyTypes.find((el)=>el.value===manufacturer.companyType)}

                                  closeMenuOnSelect={false}
                                  isMulti
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      options={companyTypes}
                                      placeholder={"Ընտրել"}
                                      styles={customStyles}
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

export default ManufacturerEdit
