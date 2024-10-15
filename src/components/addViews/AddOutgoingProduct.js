import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import ErrorSvg from "../../dist/svg/error.svg";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { PARTNERS_URL, PRODUCTS_URL, REGISTER_PRODUCT, WAREHOUSES_URL } from "../../utils/constants";
import { deleteNullProperties } from "../../utils/helper";
import AddProductsList from "./AddProductsList";
import CustomTable from "../CustomTable";
import { BiSolidInfoCircle } from "react-icons/bi";
import moment from "moment";

function AddOutgoingProduct({
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
  const [partners, setPartners] = useState([]);
  const [newProduct, setNewProduct] = useState(false)
  const [productsList, setProductsList] = useState([])
  const [fetchedProductsList, setFetchedProductsList] = useState([])
  const [outgoingProductsList, setOutgoingProductsList] = useState([])
  const [rowInputValues, setRowInputValues] = useState({});
  const [asdasd, setasdasd] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  // useEffect(() => {
  //   if (fetchedProductsList) {
  //     const initialValues = fetchedProductsList.reduce((acc, row) => {
  //       acc[row.productId] = ''; // Initialize each input value with an empty string or default value
  //       return acc;
  //     }, {});
  
  //     setRowInputValues(initialValues);
  //   }
  // }, [fetchedProductsList]);

  const handleInputChange = useCallback((e, rowId) => {
    debugger
    const { value } = e.target;
    setRowInputValues((prevValues) => ({
      ...prevValues,
      [rowId]: value,
    }));
  }, []);

  const handleToggleCreateProductModal = (value) => {
    setNewProduct((prev) => value);

  };
  const fetchDataByProduct = async () => {
    try {
      const respProductsList = await axiosPrivate.get(PRODUCTS_URL);
      setFetchedProductsList(respProductsList?.data?.jsonString);

      setIsLoading(false);
      return respProductsList?.data?.jsonString
    } catch (err) {
      console.log(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
    
  };
  const handleOutgoingProductsList = async (e,row) => {
e.preventDefault()
    debugger
    //const inputValue = Object.keys(rowInputValues).filter((el)=>el===row.original.productId)
    const asd = {}
    asd.id=row.original.productId
    asd.name=row.original.name
    asd.input=rowInputValues[row.original.productId]
console.log(asd)
    const tmpData = []
     tmpData.push(asd)
    
    // try {
    //   const respProductsList = await axiosPrivate.get(PRODUCTS_URL);
    //   setFetchedProductsList(respProductsList?.data?.jsonString);

    //   setIsLoading(false);
    //   return respProductsList?.data?.jsonString
    // } catch (err) {
    //   console.log(err);
    //   navigate("/login", { state: { from: location }, replace: true });
    // }
    
  };
  
  const onProductSelect = async() =>{
   const asd = await fetchDataByProduct()
//debugger
    setFetchedProductsList(asd)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const partnersResp = await axiosPrivate.get(PARTNERS_URL);
        setPartners(partnersResp?.data?.jsonString);

        const respProductsList = await axiosPrivate.get(PRODUCTS_URL);
        setProductsList(respProductsList?.data?.jsonString);

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

  const methods = useForm({
    mode: "onChange",
  });
 
  const onSubmit = methods.handleSubmit(async (data) => {
    const newProd = {
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

    const updatedData = deleteNullProperties(newProd)

    try {
      await axiosPrivate.post(REGISTER_PRODUCT, updatedData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      handleToggleCreateModal(false);
      refreshData();
     
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

  const fetchedDataColumn = useMemo(
    () => [
      {
        Header: (event) => (
          <>                
            <div  className="columnHeader">ID</div>
          </>
        ),
        accessor: "productId",
        sortable: true,
        width: 60,
        
      },
      {
        Header: (event) => (
          <>                
            <div  className="columnHeader">Անվանում</div>
          </>
        ),
        accessor: "name",
        sortable: true,
        width: 100,
        
      },
      {
        Header: (event) => (
          <>
            <div>Պահեստ</div>
          </>
        ),
        accessor: "warehouse",
        width: 120,
        sortable: true,
        // Cell: ({ row }) => (
        //   <div className="d-flex align-items-center">
            
        //   </div>
        // ),
      },
      {
        Header: (event) => (
          <>
            <div>Արտադրման ժամկետ</div>
          </>
        ),
        accessor: "phone",
        width: 180,
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            {moment(row.original?.createdAt).format('DD-MM-YYYY')}
          </div>
        ),
        
      },
      {
        Header: (event) => (
          <>
           
            <div  className="columnHeader">Մուտքի ամսաթիվ</div>
          </>
        ),
        accessor: "mainCurrency",
        style: {
           // Custom style for the 'description' column
        },
        width: 180,
        
      },
      {
        Header: (event) => (
          <>
           
            <div  className="columnHeader">Մնացորդ</div>
          </>
        ),
        accessor: "balance",
        width: 100,
      },
      {
        Header: (event) => (
          <>
           
            <div  className="columnHeader">Գին</div>
          </>
        ),
        accessor: "priceList",
        width: 100,
      },
     
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Գործողություններ</div>
          </>
        ),
        accessor: "actions",
        width: 150,
        
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            
            <div className="d-flex">
              <BiSolidInfoCircle
              cursor={"pointer"}
              size={"1.5rem"}
              //onClick={() => handleOpenInfoModal(row.original)}
            />
            {console.log(rowInputValues)}
            <input className="form-control" style={{width:'70px', height:'30px',padding:'1px'}} 
              value={rowInputValues[row?.original?.productId] || ''} 
              onChange={(e) => handleInputChange(e, row.original.productId)} 
              autoFocus={true}
              />
            <button className="btn btn-primary" style={{marginLeft:'5px',width:'40px', height:'30px',padding:'1px'}} onClick={(e)=>handleOutgoingProductsList(e,row)}>Ելք</button>
            </div>
            {/* <div className="d-flex">
              <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                data-bs-toggle="tooltip"
                data-placement="top"
                title="Edit"
                href="#"
                onClick={() => handleOpenEditModal(row.original)}

              >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="edit" />
                  </span>
                </span>
              </a>
              <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                data-bs-toggle="tooltip"
                onClick={() => handleOpenModal(row.original)}
                data-placement="top"
                title=""
                data-bs-original-title="Delete"
                href="#"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="trash" />
                  </span>
                </span>
              </a>
            </div> */}
          </div>
        ),
        disableSortBy: true,
        
      },
    ],
    [rowInputValues]
  );
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
          Ապրանքի դուրս բերում
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
                          <div className="col-sm-12 ">
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
                                      value: item.productId,
                                      label: item.name,
                                    }))}
                                    placeholder={"Ընտրել"}
                                    onChange={(val) => {
                                        field.onChange(val);
                                        onProductSelect(val);
                                      }}
                                      />
                                    )}
                                    />
                                    </div>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  {(!!fetchedProductsList && fetchedProductsList.length) ?
                  <>
                    <div className="separator-full"></div>
                    <div style={{border:'1px solid #edebeb', borderRadius:'10px', padding:'10px'}}>

                  <CustomTable column={fetchedDataColumn} data={fetchedProductsList} />
                    </div>
                  </>:<></>
                  }
                    {(!!fetchedProductsList && fetchedProductsList.length) ?
                  <>
                    <div className="separator-full"></div>
                    <div style={{border:'1px solid #edebeb', borderRadius:'10px', padding:'10px'}}>

                  <CustomTable column={fetchedDataColumn} data={fetchedProductsList} />
                    </div>
                  </>:<></>
                  }

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
    </>
  );
}

export default AddOutgoingProduct;
