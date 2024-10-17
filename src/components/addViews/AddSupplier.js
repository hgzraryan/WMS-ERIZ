import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Editor } from "@tinymce/tinymce-react";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, Form, FormProvider, useForm} from "react-hook-form";
import { Input } from "../Input";
import { name_validation, desc_validation, email_validation, director_validation, tin_validation, zipCode_validation, street_validation, city_validation,bankAccNumber_validation, bankName_validation } from "../../utils/inputValidations";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ErrorSvg from "../../dist/svg/error.svg";
import CustomPhoneComponent from "../CustomPhoneComponent";
import 'react-phone-number-input/style.css'
import { CountryDropdown, RegionDropdown,CountryRegionData  } from 'react-country-region-selector';
import { REGISTER_SUPPLIER } from "../../utils/constants";


function AddSupplier({ handleToggleCreateModal, refreshData }) {
    const [errMsg, setErrMsg] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')
  
  useEffect(() => {
      if (CountryRegionData[11][0] === "Armenia") {
        CountryRegionData[11][0] = "Հայաստան"
        CountryRegionData[11][2] = "Արագածոտն~AG|Արարատ~AR|Արմավիր~AV|Գեղարքունիք~GR|Կոտայք~KT|Լոռի~LO|Շիրակ~SH|Սյունիք~SU|Տավուշ~TV|Վայոց Ձոր~VD|Երևան~ER";
      }
    }, []);
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
    const onSubmit = methods.handleSubmit(async ({
      name,director,bankName,bankAccNumber,tin,email,address,description,country,
      state,
      street,
      city,
      zipCode,
      phone
    }) => {
      const newSupplier = {
         name: name,
         director:director,
         bankName:bankName,
         bankAccNumber:bankAccNumber,
         tin:tin,
         contact: {
           email:email,
           phone:phone,
          address: {
            street: street,
            city: city,
            state: state,
            country: country,
            zipCode: zipCode,
          },
         },
         description:description,
        additional: editorRef.current.getContent({ format: "text" }),
      };
  
      console.log(newSupplier);
      try {
        await axiosPrivate.post(REGISTER_SUPPLIER, newSupplier, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
  
        handleToggleCreateModal(false);
        refreshData();
        notify(
          `${newSupplier.name} մատակարարը ավելացված է`
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
            Ավելացնել նոր մատակարար
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
                          <a href="#">Մատակարարի տվյալներ</a>
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
                                <Input {...director_validation} />
                              </div>
                            </div>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <Input {...email_validation} />
                              </div>
                              <div className="col-sm-6">
                              <div className="d-flex justify-content-between me-2">
                                <label className="form-label" htmlFor="doctor">
                                  Հեռախոս
                                </label>
                                {methods.formState.errors.phone && (
                                      <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                      )}
                                      </div>
                                      <CustomPhoneComponent name="phone"  control={methods.control} />
  
                              </div>
                            </div>
                            <div className="row gx-3">
                            <div className="col-sm-6">
                              <div className="d-flex justify-content-between me-2">
                                <label className="form-label" htmlFor="country">
                                  Երկիր
                                </label>
                                {methods?.formState.errors.country && (
                                  <span className="error text-red">
                                    <img src={ErrorSvg} alt="errorSvg" />
                                    Պարտադիր
                                  </span>
                                )}
                                </div>
                                <Controller
                                  name="country"
                                  control={methods.control}
                                  defaultValue=""
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <CountryDropdown
                                      {...field}
                                      classes="form-control"
                                      defaultOptionLabel="Երկիր"
                                      value={country}
                                      priorityOptions={['Armenia']}
                                      onChange={(val) => {
                                        field.onChange(val);
                                        setCountry(val);
                                        methods.trigger("country");
                                        methods.setValue("state",'')
                                        methods.trigger("state")
                                      }}
                                      style={{
                                        appearance:'auto'
                                      }}
                                    />
                                  )}
                                />
                              </div>
                              <div className="col-sm-6">
                              <div className="d-flex justify-content-between me-2">
                              <label className="form-label" htmlFor="state">
                                    Մարզ
                                  </label>
                                  {methods?.formState.errors.state && (
                                    <span className="error text-red">
                                      <span>
                                        <img src={ErrorSvg} alt="errorSvg" />
                                      </span>
                                      պարտադիր
                                    </span>
                                  )}
                                  </div>
                                  <Controller
                                  name="state"
                                  control={methods.control}
                                  defaultValue=""
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <RegionDropdown
                                    blankOptionLabel="Մարզ"
                                    defaultOptionLabel="Մարզ"
                                    classes="form-control"
                                    country={country}
                                    value={region}
                                    onChange={(val) => {
                                      field.onChange(val);
                                      setRegion(val);
                                      trigger("state");
                                    }}
                                    style={{
                                      appearance:'auto'
                                    }}
                                  />                           
                            )}
                          />
                              </div>
                            </div>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <Input {...city_validation} />
                              </div>
                              <div className="col-sm-6">
                                <Input {...street_validation} />
                              </div>
                            </div>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <Input {...zipCode_validation} />
                              </div>
                            
                              <div className="col-sm-6">
                              <Input {...desc_validation} />
                              </div>
                            </div>
                            <div className="row gx-3">
                              
                              
                            </div>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <Input {...bankName_validation} />
                              </div>
                              <div className="col-sm-6">
                                <Input {...bankAccNumber_validation} />
                              </div>
                            </div>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <Input {...tin_validation} />
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
export default AddSupplier
