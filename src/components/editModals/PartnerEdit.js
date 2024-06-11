import React, { useEffect, useRef, useState } from "react";
import { deleteNullProperties } from "../../utils/helper";
import { PARTNERS_URL, REGISTER_PARTNER } from "../../utils/constants";
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
import {
  bankAccNumber_validation,
  bankName_validation,
  city_validation,
  email_validation,
  name_validation,
  respPersonFullName_validation,
  street_validation,
  zipCode_validation,
} from "../../utils/inputValidations";
import { Input } from "../Input";
import { Editor } from "@tinymce/tinymce-react";
import { customStyles } from "../customStyles";
const companyTypes = [
  {
    label: "Ֆիզիկական անձ",
    value: "Physical",
  },
  {
    label: "Իրավաբանական անձ",
    value: "Legal",
  },
  {
    label: "Այլ",
    value: "Other",
  },
];
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
const partnerTypes = [
  {
    label: "Վերավաճառող",
    value: "Reseller",
  },
  {
    label: "Արտադրող",
    value: "Producer",
  },
  {
    label: "Ներդրող",
    value: "Investor",
  },
];
const productCategories = [
  {
    label: "Մրգեր",
    value: "fruits",
  },
  {
    label: "Հյութեր",
    value: "յuices",
  },
  {
    label: "Մսամթերք",
    value: "meat",
  },
  {
    label: "Ծովամթերք",
    value: "seafood",
  },
];
function PartnerEdit({ partner, setEditRow, refreshData }) {
    const [additionalPhone, setAdditionalPhone] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const [country, setCountry] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const editorRef = useRef(null);
    const [region, setRegion] = useState("");
     useEffect(() => {
    if (CountryRegionData[11][0] === "Armenia") {
      CountryRegionData[11][0] = "Հայաստան";
      CountryRegionData[11][2] =
        "Արագածոտն~AG|Արարատ~AR|Արմավիր~AV|Գեղարքունիք~GR|Կոտայք~KT|Լոռի~LO|Շիրակ~SH|Սյունիք~SU|Տավուշ~TV|Վայոց Ձոր~VD|Երևան~ER";
    }
    setCountry(partner?.contact?.address?.country);
  }, []);
    const { trigger } = useForm();
    const methods = useForm({
      mode: "onChange",
    });
    const handleToggleCreateModal = (value) => {
        setEditRow((prev) => value);
    };
    const toggleAdditionalPhone = (e, value) => {
      e.stopPropagation();
      e.preventDefault();
      setAdditionalPhone(value);
    };
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
          companyType,
          respPersonFullName,
          phone,
          addPhone,
          bankName,
          bankAccNumber,
          currency,
          partnerType,
          email,
          country,
          state,
          city,
          street,
          zipCode,
          productCategories,
        }
      ) => {
        const newPartner = {
          name:name?.trim() !== partner?.name?.trim() ? name : null,
          companyType: companyType?.value?.trim()!== partner?.companyType?.trim()? companyType?.value : null,
          respPersonFullName:respPersonFullName?.trim() !== partner?.respPersonFullName?.trim() ? respPersonFullName : null,
          bankName:bankName?.trim() !== partner?.bankName?.trim() ? bankName : null,
          bankAccNumber:bankAccNumber?.toString().trim() !== partner?.bankAccNumber?.toString().trim() ? bankAccNumber : null,
          currency: currency?.value?.trim()!== partner?.currency?.trim()? currency?.value : null,
          partnerType:partnerType?.value?.trim()!== partner?.partnerType?.trim()? partnerType?.value : null,
          productCategories: productCategories.map((el) => el.value).toString()!==partner?.productCategories.toString()?productCategories.map((el) => el.value):null,
          contact: {
            email:email?.trim() !== partner?.contact?.email?.trim() ? email : null,
            phone:phone?.trim() !== partner?.contact?.phone?.trim() ? phone : null,
            addPhone:addPhone === partner?.contact?.addPhone?.trim() ? null : addPhone,
            address: {
              street:
                street?.trim() !== partner?.contact?.address?.street?.trim()
                  ? street
                  : null,
              city:
                city?.trim() !== partner?.contact?.address?.city?.trim()
                  ? city
                  : null,
              state:
                state?.trim() !== partner?.contact?.address?.state?.trim()
                  ? state
                  : null,
              country:
                country?.trim() !== partner?.contact?.address?.country?.trim()
                  ? country
                  : null,
              zipCode:
                zipCode?.trim() !== partner?.contact?.address?.zipCode?.trim()
                  ? zipCode
                  : null,
            },
          },
          additional: editorRef.current.getContent({ format: "text" }).trim()!==partner?.additional?.trim()?editorRef.current.getContent({ format: "text" }):null,
        };
        const updatedFields = deleteNullProperties(newPartner);
  
        console.log(newPartner);
        try {
          await axiosPrivate.put(PARTNERS_URL, { updatedFields, id: partner.partnerId }, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
  
          handleToggleCreateModal(false);
          refreshData();
          notify(`Տվյալները թարմացված են`);
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
        Թարմացնել գործընկերոջ տվյալները
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
                      <a href="#">Գործընկերոջ տվյալներ</a>
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
                            <Input {...name_validation} defaultValue={partner?.name}/>
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
                                defaultValue={companyTypes.find((el)=>el.value===partner.companyType)}
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
                        <div className="row gx-3">
                          <div className="col-sm-6">
                            <Input {...respPersonFullName_validation} defaultValue={partner?.respPersonFullName}/>
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
                                defaultValue={partner?.contact?.phone}

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
                                      defaultValue={partner?.contact?.addPhone}
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
                            <Input {...bankName_validation} defaultValue={partner?.bankName}/>
                          </div>
                          <div className="col-sm-6">
                            <Input {...bankAccNumber_validation} defaultValue={partner?.bankAccNumber}/>
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
                                defaultValue={currencies.find((el)=>el.value===partner?.currency)}
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
                            <div className="d-flex justify-content-between me-2">
                              <label
                                className="form-label"
                                htmlFor="partnerType"
                              >
                                Գործընկերոջ տեսակը
                              </label>
                              {methods.formState.errors.partnerType && (
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
                                name="partnerType"
                                control={methods.control}
                                defaultValue={partnerTypes.find((el)=>el.value===partner?.partnerType)}
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    options={partnerTypes}
                                    placeholder={"Ընտրել"}
                                    styles={customStyles}
                                  />
                                )}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row gx-3 mb-3 mt-3">
                        <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="country"
                                      >
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
                                        partner?.contact?.address?.country
                                      }
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <CountryDropdown
                                          {...field}
                                          classes="form-control"
                                          defaultOptionLabel="Երկիր"
                                          value={field.value}
                                          priorityOptions={["Armenia"]}
                                          onChange={(val) => {
                                            field.onChange(val);
                                            setCountry(val);
                                            methods.trigger("country");
                                            methods.setValue("state",'')
                                            methods.trigger("state")
                                          }}
                                          style={{
                                            appearance: "auto",
                                          }}
                                        />
                                      )}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="state"
                                      >
                                        Մարզ
                                      </label>
                                      {methods?.formState.errors.state && (
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
                                    <Controller
                                      name="state"
                                      control={methods.control}
                                      defaultValue={
                                        partner?.contact?.address?.state
                                      }
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <RegionDropdown
                                          {...field}
                                          classes="form-control"
                                          country={country}
                                          defaultOptionLabel="Մարզ"
                                          value={field.value}
                                          onChange={(val) => {
                                            field.onChange(val);
                                            setRegion(val);
                                            trigger("state");
                                          }}
                                          style={{
                                            appearance: "auto",
                                          }}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                        <div className="row gx-3 mt-2">
                          <div className="col-sm-6">
                            <Input {...city_validation} defaultValue={partner?.contact?.address?.city}/>
                          </div>
                          <div className="col-sm-6">
                            <Input {...street_validation} defaultValue={partner?.contact?.address?.street}/>
                          </div>
                        </div>
                        <div className="row gx-3">
                          <div className="col-sm-6">
                            <Input {...zipCode_validation} defaultValue={partner?.contact?.address?.zipCode} />
                          </div>
                          <div className="col-sm-6">
                            <Input {...email_validation} defaultValue={partner?.contact?.email}/>
                          </div>
                        </div>

                        <div className="row gx-3">
                          <div className="col-sm-6">
                            <div className="d-flex justify-content-between me-2">
                              <label
                                className="form-label"
                                htmlFor="productCategories"
                              >
                                Ապրանքի կատեգորիա
                              </label>
                              {methods.formState.errors.productCategories && (
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
                                name="productCategories"
                                control={methods.control}
                                defaultValue={partner?.productCategories.map((elem)=>productCategories.find((el)=>el.value===elem)).flat(1)}
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    isMulti
                                    closeMenuOnSelect={false}
                                    options={productCategories.map(
                                      (elem) => ({
                                        value: elem.value,
                                        label: elem?.label,
                                        //price: elem?.price
                                      })
                                    )}
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
                                initialValue={partner.additional}
                                init={{
                                  height: 300,
                                  plugins:
                                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
                                  toolbar:
                                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                                  tinycomments_mode: "embedded",
                                  tinycomments_author: "Author name",
                                  mergetags_list: [
                                    {
                                      value: "First.Name",
                                      title: "First Name",
                                    },
                                    { value: "Email", title: "Email" },
                                  ],
                                  ai_request: (request, respondWith) =>
                                    respondWith.string(() =>
                                      Promise.reject(
                                        "See docs to implement AI Assistant"
                                      )
                                    ),
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

export default PartnerEdit