import React, { useState, useEffect, Suspense, useRef } from "react";
import { Modal } from "react-bootstrap";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { deleteNullProperties } from "../../utils/helper";
import { Editor } from "@tinymce/tinymce-react";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { balance_validation, city_validation, code_validation, email_validation, name_validation, storekeeper_validation, street_validation, subWarehouse_validation, type_validation, warehouseState_validation, zipCode_validation } from "../../utils/inputValidations";
import { Input } from "../Input";
import ErrorSvg from "../../dist/svg/error.svg";
import CustomPhoneComponent from "../CustomPhoneComponent";
import { WAREHOUSES_URL } from "../../utils/constants";
import Select from "react-select";
import { customStyles } from "../customStyles";

const storekeepers=[
  {
  label: " Arman Karapetyan",
  value:12001
},
  {
    label: " Levon Stepanyan",
    value:12002
},
]
const subWarehouses=[
  {
  label: "Abovyan",
  value:15001
},
  {
    label: "Armavir",
    value:15002
},
]
const warehouseType=[
  {
    value: "Main",
    label:"Հիմնական"
},
  {
    value: "Mobile",
    label:"Շրջիկ"
},
  {
    value: "Other",
    label:"Այլ"
},
]
const customWarehouseState=[
  {
  label: "Ակտիվ",
  value:1
},
  {
    label: "Ոչ ակտիվ",
    value:0
},
]
const salesAllowed=[
  {
  label: "Կարելի է",
  value:1
},
  {
    label: "Չի կարելի",
    value:0
},
]
function WarehouseEdit({ warehouse, setEditRow, refreshData }) {
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
    setCountry(warehouse?.contact?.address?.country);

  }, []);
  const methods = useForm({
    mode: "onChange",
  });
  const { trigger } = useForm();
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
      async ({
        warehouseId,
        code,
        email,
        street,
        city,
        warehouseState,
        country,
        state,
        zipCode,
        type,
        name,
        balance,
        storekeeper,
        subWirehouse,
        addPhone,
        phone,
      }) => {
        debugger
        const newWarehouse = {
          code:code?.trim() !== warehouse?.code ? code : null,
          warehouseState:warehouseState?.value !== warehouse?.warehouseState ? warehouseState : null,
          type:type?.trim() !== warehouse?.type.trim() ? type : null,
          name:name?.trim() !== warehouse?.name?.trim() ? name : null,
          balance:balance !== warehouse?.balance ? balance : null,
          storekeeper:storekeeper?.value !== warehouse?.storekeeper ? storekeeper : null,
          subWirehouse:subWirehouse?.trim() !== warehouse?.subWirehouse?.type.trim() ? subWirehouse : null,
          contact: {
            email:email?.trim() !== warehouse?.contact?.email?.trim() ? email : null,
            phone:phone?.trim() !== warehouse?.contact?.phone?.trim() ? phone : null,
            addPhone:addPhone === warehouse?.contact?.addPhone?.trim() ? null : addPhone,
            address: {
              street:
            street?.trim() !== warehouse?.contact?.address?.street?.trim()
            ? street
            : null,
            city:
            city?.trim() !== warehouse?.contact?.address?.city?.trim()
            ? city
            : null,
            state:
            state?.trim() !== warehouse?.contact?.address?.state?.trim()
            ? state
            : null,
            country:
            country?.trim() !== warehouse?.contact?.address?.country?.trim()
            ? country
            : null,
            zipCode:
            zipCode?.trim() !== warehouse?.contact?.address?.zipCode?.trim()
            ? zipCode
            : null,
          },
          },
          additional: editorRef.current.getContent({ format: "text" }).trim()!==warehouse?.additional?.trim()?editorRef.current.getContent({ format: "text" }):null,
        };
        const updatedFields = deleteNullProperties(newWarehouse)
        
        console.log(type)
      console.log(updatedFields);
      // try {
      //   await axiosPrivate.put(WAREHOUSES_URL, { updatedFields, id: warehouse.warehouseId }, {
      //     headers: { "Content-Type": "application/json" },
      //     withCredentials: true,
      //   });

      //   handleToggleCreateModal(false);
      //   refreshData();
      //   notify(`Տվյալները  թարմացված է`);
      // } catch (err) {
      //   if (!err?.response) {
      //     setErrMsg("No Server Response");
      //   } else {
      //     setErrMsg(" Failed");
      //   }
      // }
    }
  );
  return (
    <Modal
      show={() => true}
      size="xl"
      onHide={() => setEditRow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Թարմացնել պահեստի տվյալները
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
                        <a href="#">Պահեստի տվյալներ</a>
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
                      {console.log(warehouse)}
                      <div className="card-body">
                        <div className="modal-body">
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...code_validation} defaultValue={warehouse?.code} />
                            </div>
                            <div className="col-sm-6">
                                  <div className="d-flex justify-content-between me-2">
                                    <label
                                      className="form-label"
                                      htmlFor="warehouseState"
                                    >
                                      Կարգավիճակ
                                    </label>
                                    {methods.formState.errors
                                      .warehouseState && (
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
                                      name="warehouseState"
                                      control={methods.control}
                                      defaultValue={customWarehouseState.find((el)=>el.value===warehouse?.warehouseState)}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          options={customWarehouseState}
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
                                      htmlFor="warehouseType"
                                    >
                                      Տեսակ
                                    </label>
                                    {methods.formState.errors
                                      .warehouseType && (
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
                                      name="warehouseType"
                                      control={methods.control}
                                      defaultValue={warehouseType.find((el)=>el.value===warehouse?.type)}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          options={warehouseType}
                                          placeholder={"Ընտրել"}
                                          styles={customStyles}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                            <div className="col-sm-6">
                              <Input {...name_validation} defaultValue={warehouse?.name}/>
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...balance_validation} defaultValue={warehouse?.balance}/>
                            </div>
                            <div className="col-sm-6">
                                  <div className="d-flex justify-content-between me-2">
                                    <label
                                      className="form-label"
                                      htmlFor="storekeeper"
                                    >
                                      Պահեստապետ
                                    </label>
                                    {methods.formState.errors
                                      .storekeeper && (
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
                                      name="storekeeper"
                                      control={methods.control}
                                      defaultValue={storekeepers.find((el)=>el.value===warehouse?.storekeeper)}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          options={storekeepers}
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
                                      htmlFor="subWarehouse"
                                    >
                                      Ենթապահեստ
                                    </label>
                                    {methods.formState.errors
                                      .subWarehouse && (
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
                                      name="subWarehouse"
                                      control={methods.control}
                                      defaultValue={subWarehouses.find((el)=>el.value===warehouse?.subWarehouse)}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          options={subWarehouses}
                                          placeholder={"Ընտրել"}
                                          styles={customStyles}
                                        />
                                      )}
                                    />
                                  </div>
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
                                  defaultValue={warehouse?.contact?.phone}

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
                                        defaultValue={warehouse?.contact?.addPhone}

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
                          <div className="row gx-3 ">
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
                                        warehouse?.contact?.address?.country
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
                                        warehouse?.contact?.address?.state
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
                              <Input {...city_validation} defaultValue={warehouse?.contact?.address?.city}/>
                            </div>
                            <div className="col-sm-6">
                              <Input {...street_validation} defaultValue={warehouse?.contact?.address?.street}/>
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...zipCode_validation} defaultValue={warehouse?.contact?.address?.zipCode}/>
                            </div>
                            <div className="col-sm-6">
                              <Input {...email_validation} defaultValue={warehouse?.contact?.email}/>
                            </div>
                          </div>
                          <div className="row gx-3">
                          <div className="col-sm-6">
                                  <div className="d-flex justify-content-between me-2">
                                    <label
                                      className="form-label"
                                      htmlFor="salesAllowed"
                                    >
                                      Վաճառք պահեստից
                                    </label>
                                    {methods.formState.errors
                                      .salesAllowed && (
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
                                      name="salesAllowed"
                                      control={methods.control}
                                      defaultValue={salesAllowed.find((el)=>el.value===warehouse?.salesAllowed)}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          options={salesAllowed}
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
                                  initialValue={warehouse?.additional}
                                  init={{
                                    height: 300,
                                    plugins:"anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount pagembed linkchecker",
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
  );
}
export default WarehouseEdit
