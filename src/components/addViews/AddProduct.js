import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import ErrorSvg from "../../dist/svg/error.svg";
import { Input } from "../Input";
import {
  barcode_validation,
  CountryOfOrigin_validation,
  height_validation,
  length_validation,
  minCountWarning_validation,
  name_validation,
  Quantity_validation,
  reorderLevel_validation,
  Weight_validation,
  width_validation,
} from "../../utils/inputValidations";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { REGISTER_PRODUCT, WAREHOUSES_URL } from "../../utils/constants";
import { deleteNullProperties } from "../../utils/helper";
import { toast } from "react-toastify";

const customproductsClasses = [
  {
    id: 1,
    name: "Electronics",
    value: "Electronics",
    label: "Էլեկտրոնիկա",
  },
  {
    id: 2,
    name: "Clothing",
    value: "Clothing",
    label: "Հագուստ",
  },
  {
    id: 3,
    name: "Food",
    value: "Food",
    label: "Սնունդ",
  },
  {
    id: 1,
    name: "Furniture",
    value: "Furniture",
    label: "Կահույք",
  },
  {
    id: 2,
    name: "Books",
    value: "Books",
    label: "Գրքեր",
  },
  {
    id: 3,
    name: "Beauty",
    value: "Beauty",
    label: "Խնամք",
  },
];
const customSuppliers = [
  {
    supplierId: 13654,
    supplierName: "Karen Harutyunyan",
    supplierPhone: "088 55 55 55",
    supplierEmail: "adsf@sfas.rt",
  },
  {
    supplierId: 13674,
    supplierName: "Stephan Harutyunyan",
    supplierPhone: "088 66 66 66",
    supplierEmail: "qqqqq@sfas.dsfdfd",
  },
];
const currencies = [
  { value: "051", label: "AMD" },
  { value: "840", label: "USD" },
  { value: "978", label: "EUR" },
  { value: "643", label: "RUB" },
];
function AddProduct({
  handleToggleCreateModal,
  productCategories,
  refreshData,
}) {
  const [productClassType, setProductClassType] = useState("");
  const [attributs, setAttributs] = useState([]);
  const [productClassId, setProductClassId] = useState([]);
  const [wareHouses, setWareHouses] = useState([]);
  const [VAT, setVAT] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState('051');
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const handleAmountChange = (e) => {
    setAmount((prev) => e.target.value);
  };
  const handleCurrencyChange = (e) => {
    const asd = currencies.filter((el)=>
      el.label===e.target?.value
    )
    console.log(asd)
    console.log(e.target?.value)
    setCurrency(e.target?.value)
  };
  // sproductCategories)
  const editorRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wareHousesReps = await axiosPrivate.get(WAREHOUSES_URL);
        setWareHouses(wareHousesReps?.data?.jsonString);

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

  const onProductsClassSelect = (data) => {
    console.log("data", data);

    const aaa = productCategories?.filter((el) => {
      return el.categoryId === data.value;
    });
    if (aaa.length > 0) {
      setAttributs(aaa[0].attributs);
    } else {
      setAttributs([]);
    }

    setProductClassId(data?.value);
  };
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
    const newProduct = {
      barcode: data?.barcode,
      reorderLevel: +data?.reorderLevel,
      name: data?.name || null,
      productCategory: data?.productCategory || 0,
      stock: +data?.warehouse?.value || null,
      quantity: +data.quantity || null,
      supplier: +data.suppliers?.value || null,
      countryOfOrigin:data.countryOfOrigin,
      SKU:'1',
      dimensions:{
        //height: +data.height || null,
        //length: +data.length || null,
        // width: +data.width || null,
        weight: +data.weight || null,
      },
      price:+amount,
      currency:currency,
      description: editorRef.current.getContent({ format: "text" }),
       attributs:attributs.map((el,index)=>{return{
        'attributeName':el.attributeName,
        'attributeUnit':el.attributeUnit,
        'attributeUnitLabel':el.attributeUnitLabel
       }})
    };

    console.log(attributs);
    console.log(newProduct);
    console.log(data);
    const updatedData = deleteNullProperties(newProduct)

    try {
      await axiosPrivate.post(REGISTER_PRODUCT, updatedData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      handleToggleCreateModal(false);
      refreshData();
      notify(
        `${newProduct.diagnosticsName} Ախտորոշումը ավելացված է`
      );
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
  return (
    <Modal
      show={() => true}
      size="xl"
      onHide={() => handleToggleCreateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Ավելացնել ապրանք
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
                        <a href="#">Ապրանքի դասակարգը</a>
                      </div>
                      <div className="card-body">
                        <div className="modal-body">
                          <div className="row gx-3 mb-2">
                            <div className="col-sm-12">
                              <div className="d-flex justify-content-between me-2">
                                {/* <label
                                     className="form-label"
                                     htmlFor="productCategory"
                                   >
                                     Ապրանքի դասակարգը
                                   </label> */}
                                {methods.formState.errors.productCategory && (
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
                                  name="productCategory"
                                  control={methods.control}
                                  defaultValue={null}
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      onChange={(val) => {
                                        field.onChange(val.value);
                                        onProductsClassSelect(val);
                                      }}
                                      value={customproductsClasses.find(
                                        (option) =>
                                          option.value === productClassType
                                      )}
                                      options={[
                                        {
                                          value: 0,
                                          label: "Առանց դասակարգ",
                                        },
                                        ...productCategories?.map((item) => ({
                                          value: item.categoryId,
                                          label: item.name,
                                        })),
                                      ]}
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
                    <div className="card">
                      <div className="card-header">
                        <a href="#">Ապրանքի տվյալներ</a>
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
                          <div className="row gx-3 mb-2">
                            <div className="col-sm-6">
                              <Input {...name_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...CountryOfOrigin_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...barcode_validation} />
                            </div>
                            <div className="col-sm-6">
                              <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-label"
                                  htmlFor="suppliers"
                                >
                                  Մատակարարներ
                                </label>
                                {methods.formState.errors.suppliers && (
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
                                  name="suppliers"
                                  control={methods.control}
                                  defaultValue={null}
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      value={field.value}
                                      options={customSuppliers?.map((item) => ({
                                        value: item.supplierId,
                                        label: item.supplierName,
                                      }))}
                                      placeholder={"Ընտրել"}
                                      // onChange={(val) => {
                                      //   field.onChange(val);
                                      //   onUnitSelect(val);
                                      // }}
                                    />
                                  )}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...Quantity_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...Weight_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-label"
                                  htmlFor="warehouse"
                                >
                                  Պահեստ
                                </label>
                                {methods.formState.errors.warehouse && (
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
                                  name="warehouse"
                                  control={methods.control}
                                  defaultValue={null}
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      //  onChange={(val) => {
                                      //    field.onChange(val.value);
                                      //    onProductsClassSelect(val);
                                      //  }}
                                      //  value={wareHouses.find(
                                      //    (option) =>
                                      //      option.value === productClassType
                                      //  )}
                                      options={wareHouses?.map((item) => ({
                                        value: item.warehouseId,
                                        label: item.name,
                                      }))}
                                      placeholder={"Ընտրել"}
                                    />
                                  )}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <label htmlFor="price" className="mb-2">
                                Արժեք
                              </label>
                              <div className="form-control d-flex ">
                                <select
                                  id="currency"
                                  value={currency}
                                  onChange={handleCurrencyChange}
                                  style={{ border: "none", outline: "none" }}
                                >
                                  {currencies.map((el) => (
                                    <option value={el.value}>{el.label}</option>
                                  ))}
                                </select>
                                <input
                                  type="number"
                                  id="amount"
                                  value={amount}
                                  onChange={handleAmountChange}
                                  placeholder="Արժեք"
                                  style={{
                                    border: "none",
                                    outline: "none",
                                    flex: 1,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row gx-3">

                          <div className="col-sm-6">
                              <Input {...reorderLevel_validation} />
                            </div>
                          </div>
                          {attributs?.map((el) => {
                            console.log("attributs", attributs);
                            return (
                              <div className="d-flex justify-content-center mt-3">
                                <div className="col-sm-12">
                                  <Input
                                    validation={{
                                      required: {
                                        value: false,
                                        message: "պարտադիր",
                                      },
                                    }}
                                    name={el.attributeName}
                                    placeholder={el.attributeUnitLabel}
                                    label={el.attributeName}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header">
                        <a href="#">Ապրանքի չափսերը</a>
                      </div>
                      <div className="card-body">
                        <div className="modal-body">
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...width_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...length_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...height_validation} />
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
                                    plugins:
                                      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount pagembed linkchecker",

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
  );
}

export default AddProduct;
