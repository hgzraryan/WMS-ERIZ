import React, { useEffect, useRef, useState } from "react";
import { deleteNullProperties } from "../../utils/helper";
import { LEGALFORMS_URL, REGISTER_CUSTOMER } from "../../utils/constants";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Modal } from "react-bootstrap";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import CustomPhoneComponent from "../CustomPhoneComponent";
import ErrorSvg from "../../dist/svg/error.svg";

import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import Select from "react-select";
import { toast } from "react-toastify";
import { Input } from "../Input";
import { Editor } from '@tinymce/tinymce-react';
import { customStyles } from "../customStyles";
import { city_validation, code_validation, email_validation, name_validation, price_validation, street_validation, zipCode_validation } from "../../utils/inputValidations";
import { useLocation, useNavigate } from "react-router-dom";
const currencies = [
    {
      label: "ՀՀ դրամ",
      value: "AMD",
    },
    {
      label: "Ռուսական ռուբլի",
      value: "RUB",
    },
    {
      label: "ԱՄՆ դոլլար",
      value: "RUB",
    },
  ];
  const status = [
    {
      label: "Ակտիվ",
      value: "Active",
    },
    {
      label: "Չեղարկված",
      value: "Disabled",
    },
  ];
function AddCustomer({handleToggleCreateModal,refreshData}) {
    const navigate = useNavigate()
    const location = useLocation();
    const [additionalPhone, setAdditionalPhone] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [country, setCountry] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [legalForms, setLegalForms] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef(null);
  const [region, setRegion] = useState("");

  useEffect(() => {
    if (CountryRegionData[11][0] === "Armenia") {
      CountryRegionData[11][0] = "Հայաստան";
      CountryRegionData[11][2] =
        "Արագածոտն~AG|Արարատ~AR|Արմավիր~AV|Գեղարքունիք~GR|Կոտայք~KT|Լոռի~LO|Շիրակ~SH|Սյունիք~SU|Տավուշ~TV|Վայոց Ձոր~VD|Երևան~ER";
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const legalFormsResp = await axiosPrivate.get(LEGALFORMS_URL);
        setLegalForms(legalFormsResp?.data?.jsonString);     
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    setTimeout(() => {
      fetchData();
    }, 500);
  }, [navigate]);
  const toggleAdditionalPhone = (e, value) => {
    e.stopPropagation();
    e.preventDefault();
    setAdditionalPhone(value);
  };
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
        code,
        name,
        companyType,
        email,
        phone,
        addPhone,
        country,
        state,
        city,
        street,
        zipCode,
        currency,
        status,
        price
      }
    ) => {
      const newCustomer = {
        name,
        code,
        legalForm: companyType.value,
        mainCurrency: currency?.value,
        contact: {
          email: email,
          phone: phone,
          addPhone: addPhone ? addPhone : null,
          address: {
            street: street,
            city: city,
            state: state,
            country: country,
            zipCode: zipCode,
          },
        },
        status:status?.value,
        priceList:+price,
        additional: editorRef.current.getContent({ format: "text" }),
      };
       const updatedData = deleteNullProperties(newCustomer);

      console.log(newCustomer);
      try {
        await axiosPrivate.post(REGISTER_CUSTOMER, updatedData, {
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
        Ավելացնել նոր գործընկեր
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
                      <a href="#">Հաճախորդի տվյալներ</a>
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
                            <Input {...code_validation} />
                          </div>
                          
                        </div>
                        <div className="row gx-3">
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
                                defaultValue={null}
                                closeMenuOnSelect={false}
                                isMulti
                                rules={{ required: false }}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    options={legalForms && legalForms.map((el)=>({...el,value:el.legalformId,label:el.name}))}
                                    placeholder={"Ընտրել"}
                                    styles={customStyles}
                                  />
                                )}
                              />
                            </div>
                          </div>
                          
                          <div className="col-sm-6">
                            <div className="d-flex justify-content-between me-2">
                              <label
                                className="form-label"
                                htmlFor="status"
                              >
                                Կարգավիճակը
                              </label>
                              {methods.formState.errors.status && (
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
                                name="status"
                                control={methods.control}
                                defaultValue={null}
                                closeMenuOnSelect={false}
                                isMulti
                                rules={{ required: false }}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    options={status}
                                    placeholder={"Ընտրել"}
                                    styles={customStyles}
                                  />
                                )}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row gx-3">
                            <div className="col-sm-6">
                              <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-label"
                                  htmlFor="currency"
                                >
                                  Արժույթ
                                </label>
                                {methods.formState.errors.currency && (
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
                                  name="currency"
                                  control={methods.control}
                                  defaultValue={null}
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      options={currencies}
                                      placeholder={"Ընտրել"}
                                      styles={customStyles}

                                    />
                                  )}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                            <Input {...price_validation} />
                          </div>
                          </div>
                        <div className="row gx-3 mb-3">
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
                            
                          <div className="col-sm-6 d-flex">
                            <div className="col-sm-6">
                              <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-label"
                                  htmlFor="doctor"
                                >
                                  Հեռախոս
                                </label>
                                {methods?.formState.errors.phone && (
                                  <span className="error text-red">
                                    <span>
                                      <img src={ErrorSvg} alt="errorSvg" />
                                    </span>
                                    պարտադիր
                                  </span>
                                )}
                              </div>
                              <CustomPhoneComponent
                                name="phone"
                                control={methods.control}
                              />
                            </div>
                            {additionalPhone && (
                              <>
                                <div className="col-sm-6">
                                  <div className="d-flex justify-content-between ">
                                    <label
                                      className="form-label"
                                      htmlFor="addPhone"
                                    >
                                      Հեռախոս
                                    </label>
                                    {methods?.formState.errors.addPhone && (
                                      <span className="error text-red">
                                        <span>
                                          <img
                                            src={ErrorSvg}
                                            alt="errorSvg"
                                          />
                                        </span>
                                        պարտադիր
                                      </span>
                                    )}
                                  </div>
                                  <div className="d-flex">
                                    <CustomPhoneComponent
                                      name="addPhone"
                                      control={methods.control}
                                      required={false}
                                    />
                                    <div>
                                      <FeatherIcon
                                        icon="minus-circle"
                                        width="24"
                                        onClick={(e) =>
                                          toggleAdditionalPhone(e, false)
                                        }
                                        style={{
                                          cursor: "pointer",
                                          marginTop: "8px",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                paddingTop: "41px",
                              }}
                            >
                              {!additionalPhone && (
                                <FeatherIcon
                                  icon="plus-circle"
                                  width="35"
                                  onClick={(e) =>
                                    toggleAdditionalPhone(e, true)
                                  }
                                  style={{ cursor: "pointer" }}
                                />
                              )}
                            </div>
                          </div>
                          </div>
                        <div className="row gx-3">
                          <div className="col-sm-6">
                            <Input {...email_validation} />
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

export default AddCustomer
