import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import ErrorSvg from "../../dist/svg/error.svg";
import { Input } from "../Input";
import {
  volume_validation,
  pallet_validation,
  Quantity_validation,
  reorderLevel_validation,
  Weight_validation,
  barcode_validation,
} from "../../utils/inputValidations";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { PRODUCTSLIST_URL, REGISTER_PRODUCT, SUPPLIERS_URL, WAREHOUSES_URL } from "../../utils/constants";
import { deleteNullProperties } from "../../utils/helper";
import { toast } from "react-toastify";
import CustomDateComponent from "../CustomDateComponent";
import { CountryDropdown,CountryRegionData  } from 'react-country-region-selector';
import AddProductsList from "./AddProductsList";
import moment from "moment";

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
const productTypes = [
  {
    productTypeId: 13654,
    productTypeName: "Հավի բուդ ոսկորով",
  },
  {
    productTypeId: 13655,
    productTypeName: "Հավի բուդ առանց ոսկոր",
  },
  {
    productTypeId: 13656,
    productTypeName: "Հավի թև ոսկորով",
  },
  {
    productTypeId: 13657,
    productTypeName: "Հավի թև առանց ոսկոր",
  },
  
];
const currencies = [
  { value: "051", label: "AMD" },
  { value: "840", label: "USD" },
  { value: "978", label: "EUR" },
  { value: "643", label: "RUB" },
];
function AddIncomingProduct({
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
  const [country, setCountry] = useState('')
  const [newProduct, setNewProduct] = useState(false)
  const [productsList, setProductsList] = useState([])
  const [suppliersList, setSuppliersList] = useState([])
  const editorRef = useRef(null);
 useEffect(() => {
    if (CountryRegionData[11][0] === "Armenia") {
      CountryRegionData[11][0] = "Հայաստան"
      CountryRegionData[11][2] = "Արագածոտն~AG|Արարատ~AR|Արմավիր~AV|Գեղարքունիք~GR|Կոտայք~KT|Լոռի~LO|Շիրակ~SH|Սյունիք~SU|Տավուշ~TV|Վայոց Ձոր~VD|Երևան~ER";
    }
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const handleToggleCreateProductModal = (value) => {
    setNewProduct((prev) => value);

  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsList = await axiosPrivate.get(PRODUCTSLIST_URL);
        setProductsList(productsList?.data?.jsonString);

        const suppliersList = await axiosPrivate.get(SUPPLIERS_URL);
        setSuppliersList(suppliersList?.data?.jsonString);

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
  }, [navigate,newProduct]);
  const handleAmountChange = (e) => {
    setAmount((prev) => e.target.value);
  };
  const handleAddNewProduct = (e) => {
    e.stopPropagation()
    setNewProduct((prev) => true);
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
    const newProd = {
      name: data?.productName?.label || null,
      productIdent: data?.productName?.value || null,
      countryOfOrigin:data.countryOfOrigin,
      stock: +data?.warehouse?.value || null,
      supplier: +data.suppliers?.value || null,
      quantity: +data.quantity || null,
      volume: +data.volume || null,
      dimensions:{
        //height: +data.height || null,
        //length: +data.length || null,
        // width: +data.width || null,
        weight: +data.weight || null,
      },
      palletCount:+data?.pallet,
      currency:currency,
      price:+amount,
      reorderLevel: +data?.reorderLevel,
      producedDate:moment(data?.dateOfBirth).format('YYYY-MM-DD'),
      expiredAlertDay:moment(data?.expiredAlertDay).format('YYYY-MM-DD'),
      description: editorRef.current.getContent({ format: "text" }),
      barcode: data?.barcode,
      productCategory: 6,
      // SKU:'1',
      //  attributs:attributs.map((el,index)=>{return{
      //   'attributeName':el.attributeName,
      //   'attributeUnit':el.attributeUnit,
      //   'attributeUnitLabel':el.attributeUnitLabel
      //  }})
    };
console.log(newProd)
console.log(data)
    const updatedData = deleteNullProperties(newProd)

    try {
      await axiosPrivate.post(REGISTER_PRODUCT, updatedData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      handleToggleCreateModal(false);
      refreshData();
      notify(
        `${newProd.name}  ավելացված է`
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
    <>
    {newProduct && (
        <AddProductsList
          handleToggleCreateModal={handleToggleCreateProductModal}
          refreshData={() => refreshData()}
        />
      )}
    <Modal
      show={() => true}
      size="xl"
      onHide={() => handleToggleCreateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Ապրանքի ձեռքբերում
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
                    {/* <div className="card">
                      <div className="card-header">
                        <a href="#">Ապրանքի դասակարգը</a>
                      </div>
                      <div className="card-body">
                        <div className="modal-body">
                          <div className="row gx-3 mb-2">
                            <div className="col-sm-12">
                              <div className="d-flex justify-content-between me-2">
                                <label
                                     className="form-label"
                                     htmlFor="productCategory"
                                   >
                                     Ապրանքի դասակարգը
                                   </label>
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
                    </div> */}
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
                          <div className="col-sm-6 ">
                              <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-label"
                                  htmlFor="suppliers"
                                >
                                  Անվանում
                                </label>
                                {methods.formState.errors.productName && (
                                  <span className="error text-red">
                                    <span>
                                      <img src={ErrorSvg} alt="errorSvg" />
                                    </span>{" "}
                                    պարտադիր
                                  </span>
                                )}
                              </div>
                              <div className="form-control d-flex justify-content-between">
                                <div className="flex-grow-1 me-1">

                                <Controller
                                  name="productName"
                                  control={methods.control}
                                  defaultValue={null}
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <Select
                                    {...field}
                                    value={field.value}
                                    options={productsList?.map((item) => ({
                                      value: item.productListId,
                                      label: item.name,
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
                              <FeatherIcon icon="plus-circle" width='24'  style={{ cursor: 'pointer',marginTop:'7px',marginLeft:'8px', color:'#01945c' }}   onClick={(e)=>handleAddNewProduct(e)}/>
                              </div>
                            </div>
                            
                            <div className="col-sm-6">
                            <div className="d-flex justify-content-between me-2">
                              <label className="form-label" htmlFor="countryOfOrigin">
                                Արտադրող Երկիր
                              </label>
                              {methods?.formState.errors.countryOfOrigin && (
                                <span className="error text-red">
                                  <img src={ErrorSvg} alt="errorSvg" />
                                  Պարտադիր
                                </span>
                              )}
                              </div>
                              <Controller
                                name="countryOfOrigin"
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
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...barcode_validation} />
                            </div>
                                                      </div>

                          <div className="row gx-3">
                            {/* <div className="col-sm-6">
                              <Input {...barcode_validation} />
                            </div> */}
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
                                      // options={wareHouses?.map((item) => ({
                                      //   value: item.warehouseId,
                                      //   label: item.name,
                                      // }))}
                                      options={wareHouses?.map((item) => {
                                        if(item?.children?.length){
                                          return{
                                            label:item?.name,
                                            options:item.children.map((el)=>({
                                              value: el.warehouseId,
                                              label: el.name,
                                            }))
                                          }
                                        }else{
                                         return{

                                           value: item.warehouseId,
                                           label: item.name,
                                          }
                                        }
                                      })}
                                      placeholder={"Ընտրել"}
                                    />
                                  )}
                                />
                              </div>
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
                                      options={suppliersList?.map((item) => ({
                                        value: item.supplierId,
                                        label: item.name,
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
                              <Input {...volume_validation} />
                            </div>
                            
                          <div className="col-sm-6">
                              <Input {...pallet_validation} />
                            </div>
                          </div>

                          <div className="row gx-3">                           
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
                            <div className="col-sm-6">
                              <Input {...reorderLevel_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <div className="d-flex justify-content-between me-2">
                                  <label
                                    className="form-label"
                                    htmlFor="birthday"
                                  >
                                    Արտադրման ամսաթիվ
                                  </label>
                                  {methods.formState.errors.dateOfBirth && (
                                    <span className="error text-red">
                                      <span>
                                        <img src={ErrorSvg} alt="errorSvg" />
                                      </span>{" "}
                                      պարտադիր
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <CustomDateComponent
                                    name="dateOfBirth"
                                    control={methods.control}
                                  />
                                </div>
                              </div>
                            </div> 
                          <div className="col-sm-6">
                          <div className="col-sm-6">
                              <div className="form-group">
                                <div className="d-flex justify-content-between me-2">
                                  <label
                                    className="form-label"
                                    htmlFor="expiredAlertDay"
                                  >
                                    Զգուշացման ամսաթիվ
                                  </label>
                                  {methods.formState.errors.expiredAlertDay && (
                                    <span className="error text-red">
                                      <span>
                                        <img src={ErrorSvg} alt="errorSvg" />
                                      </span>{" "}
                                      պարտադիր
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <CustomDateComponent
                                    name="expiredAlertDay"
                                    control={methods.control}
                                  />
                                </div>
                              </div>
                            </div> 
                          </div>
                          </div>
                          {/* {attributs?.map((el) => {
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
                          })} */}
                        </div>
                      </div>
                    </div>
                    {/* <div className="card">
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
                    </div> */}
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
    </>
  );
}

export default AddIncomingProduct;
