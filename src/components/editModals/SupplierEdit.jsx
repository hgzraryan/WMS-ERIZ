import React, { useEffect, useRef, useState,Suspense } from "react";
import { deleteNullProperties } from "../../utils/helper";
import {  SUPPLIERS_URL } from "../../utils/constants";
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
import { toast } from "react-toastify";
import {
  bankAccNumber_validation,
  bankName_validation,
  city_validation,
  desc_validation,
  director_validation,
  email_validation,
  name_validation,
  street_validation,
  tin_validation,
  zipCode_validation,
} from "../../utils/inputValidations";
import LoadingSpinner from "../LoadingSpinner";
import ReactQuillEditor from "../ReactQuillEditor";
import { Input } from "../Input";
function SupplierEdit({ supplier, setEditRow, refreshData }) {
    const [errMsg, setErrMsg] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [additionalData, setAdditionalData] = useState('')

  useEffect(() => {
      if (CountryRegionData[11][0] === "Armenia") {
        CountryRegionData[11][0] = "Հայաստան"
        CountryRegionData[11][2] = "Արագածոտն~AG|Արարատ~AR|Արմավիր~AV|Գեղարքունիք~GR|Կոտայք~KT|Լոռի~LO|Շիրակ~SH|Սյունիք~SU|Տավուշ~TV|Վայոց Ձոր~VD|Երևան~ER";
      }
      setCountry(supplier?.contact?.address?.country);

    }, []);
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
    const onSubmit = methods.handleSubmit(async ({
      name,director,bankName,bankAccNumber,tin,email,address,description,country,
      state,
      street,
      city,
      zipCode,
      phone
    }) => {
      const updatedSupplier = {
        name:name?.trim() !== supplier?.name?.trim() ? name : null,
        director:director?.trim() !== supplier?.director?.trim() ? name : null,
         bankName:bankName?.trim() !== supplier?.bankName?.trim() ? bankName : null,
         bankAccNumber:bankAccNumber?.trim() !== supplier?.bankAccNumber?.trim() ? bankAccNumber : null,
         tin:tin !== supplier?.tin? tin : null,
         contact: {
            email:
              email?.trim() !== supplier?.contact?.email?.trim() ? email : null,
            phone:
              phone?.trim() !== supplier?.contact?.phone?.trim() ? phone : null,
            address: {
              street:
                street?.trim() !== supplier?.contact?.address?.street?.trim()
                  ? street
                  : null,
              city:
                city?.trim() !== supplier?.contact?.address?.city?.trim()
                  ? city
                  : null,
              state:
                state?.trim() !== supplier?.contact?.address?.state?.trim()
                  ? state
                  : null,
              country:
                country?.trim() !== supplier?.contact?.address?.country?.trim()
                  ? country
                  : null,
              zipCode:
                +zipCode.trim() !== +supplier?.contact?.address?.zipCode
                  ? zipCode
                  : null,
            },
          },
         description:description?.trim() !== supplier?.description?.trim() ? description : null,
         additional: additionalData!==supplier?.additional?.trim()?additionalData:null,
        };
        const updatedFields = deleteNullProperties(updatedSupplier);
      console.log(updatedSupplier);
      try {
        await axiosPrivate.put(SUPPLIERS_URL, { updatedFields, id: supplier.supplierId }, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
  
        setEditRow(false);
        refreshData();
        notify(
          `Մատակարարի տվյալները թարմեցված են`
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
        onHide={() => setEditRow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            Ավելացնել նոր մատակարար
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Suspense fallback={<LoadingSpinner />}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
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
                              <span className="feather-icon">
                                <FeatherIcon icon="edit-2" />
                              </span>
                            </span>
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="modal-body">
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <Input {...name_validation} defaultValue={supplier?.name}/>
                              </div>
                              <div className="col-sm-6">
                                <Input {...director_validation} defaultValue={supplier?.director}/>
                              </div>
                            </div>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <Input {...email_validation} defaultValue={supplier?.contact?.email}/>
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
                                      <CustomPhoneComponent name="phone"  control={methods.control}  defaultValue={supplier?.contact?.phone}/>
  
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
                                  defaultValue={
                                    supplier?.contact?.address?.country
                                  }
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
                                  defaultValue={
                                    supplier?.contact?.address?.country
                                  }
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <RegionDropdown
                                    blankOptionLabel="Մարզ"
                                    defaultOptionLabel="Մարզ"
                                    classes="form-control"
                                    country={country}
                                    value={field.value}
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
                                <Input {...city_validation} defaultValue={supplier?.contact?.address?.city} />
                              </div>
                              <div className="col-sm-6">
                                <Input {...street_validation} defaultValue={supplier?.contact?.address?.street} />
                              </div>
                            </div>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <Input {...zipCode_validation} defaultValue={supplier?.contact?.address?.zipCode} />
                              </div>
                            
                              <div className="col-sm-6">
                              <Input {...desc_validation} defaultValue={supplier?.description} />
                              </div>
                            </div>
                            <div className="row gx-3">
                              
                              
                            </div>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <Input {...bankName_validation} defaultValue={supplier?.bankName}/>
                              </div>
                              <div className="col-sm-6">
                                <Input {...bankAccNumber_validation} defaultValue={supplier?.bankAccNumber}/>
                              </div>
                            </div>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <Input {...tin_validation} defaultValue={supplier?.tin}/>
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
                              className="icon"
                              data-bs-toggle="modal"
                              data-bs-target="#moreContact"
                            >
                              <span className="feather-icon">
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
           )}
          </Suspense>
        </Modal.Body>
      </Modal>
    );
  }
  
export default SupplierEdit
