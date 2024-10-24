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
  const [rowInputValues, setRowInputValues] = useState({});
  const [outgoingList, setOutgoingList] = useState([]);
  const [focusedInputId, setFocusedInputId] = useState(null); // Tracks which input is focused

  const editorRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();  
  //console.log('outgoingList',outgoingList)
  const handleInputChange = useCallback((e, rowId) => {    
    const { value } = e.target;
    setRowInputValues((prevValues) => ({
      ...prevValues,
      [rowId]: value,
    }));
  }, []);

  const handleToggleCreateProductModal = (value) => {
    setNewProduct((prev) => value);

  };
  const onPartnerSelect = (data) => {
    setPartners(data.value);
  };
  const fetchDataByProduct = async (productListId) => {
    try {
      const respProductsList = await axiosPrivate.post('/productById',{
        productListId:productListId,

      });
      setFetchedProductsList(respProductsList?.data?.jsonString);

      setIsLoading(false);
      return respProductsList?.data?.jsonString
    } catch (err) {
      console.log(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
    
  };
  const handleOutgoingProductsList = async (e,row) => {
    console.log(row)
    e.preventDefault()
      
      //const inputValue = Object.keys(rowInputValues).filter((el)=>el===row.original.productId)
      const tmp = {}
      tmp.id=row.original.productId
      tmp.name=row.original.name
      tmp.outgoingCount=+rowInputValues[row.original.productId]
      tmp.warehouse=row.original.warehouseName
      //tmp.subWarehouse=row.original.name
  
      const tmpData = []
       tmpData.push(tmp)
       setOutgoingList((prev)=>[tmp,...prev])    
    };
  // const handleOutgoingProductsList = async (e, row) => {
  //   e.preventDefault();
  
  //   const { productId, name, warehouse } = row.original;
  //   const input = rowInputValues[productId];
  
  //   const tmp = {
  //     id: productId,
  //     name,
  //     input,
  //     warehouse,
  //     subWarehouse: name,
  //   };
  
  //   setOutgoingList(prev => [tmp, ...prev]);
  // };
  
  const onProductSelect = async(data) =>{
    console.log(data)
  const tmp = await fetchDataByProduct(data.currentProductId)
   setFetchedProductsList(tmp)
  }
  const handleDeleteselected = (deleteId) =>{
   const tmp = outgoingList.filter((el)=>el.id!==deleteId)
   setOutgoingList(tmp)
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
  

    try {
      await axiosPrivate.post(REGISTER_PRODUCT, {customer:data.partner.value,outgoingList:outgoingList}, {
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
        accessor: "warehouseName",
        width: 120,
        sortable: true,
        // Cell: ({ row }) => (
        //   <div className="d-flex align-items-center">
            
        //   </div>
        // ),
      },
      // {
      //   Header: (event) => (
      //     <>
      //       <div>Արտադրման ժամկետ</div>
      //     </>
      //   ),
      //   accessor: "phone",
      //   width: 180,
      //   Cell: ({ row }) => (
      //     <div className="d-flex align-items-center">
      //       {moment(row.original?.createdAt).format('DD-MM-YYYY')}
      //     </div>
      //   ),
        
      // },
      {
        Header: (event) => (
          <>
           
            <div  className="columnHeader">Մուտքի ամսաթիվ</div>
          </>
        ),
        accessor: "createdAt",
        style: {
           // Custom style for the 'description' column
        },
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            {moment(row.original?.createdAt).format('DD-MM-YYYY')}
          </div>
        ),
        width: 180,
        
      },
      {
        Header: (event) => (
          <>
           
            <div  className="columnHeader">Գին</div>
          </>
        ),
        accessor: "price",
        width: 100,
      },
      {
        Header: (event) => (
          <>
           
            <div  className="columnHeader">Մնացորդ</div>
          </>
        ),
        accessor: "quantity",
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
            <EditableInput
                rowId={row.original.productId}
                value={rowInputValues[row?.original?.productId] || ""}
                handleInputChange={handleInputChange}
                isFocused={focusedInputId === row.original.productId}
                onFocus={handleFocus}
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
  const handleFocus = (rowId) => {
    setFocusedInputId(rowId);
  };
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
                                      currentProductId:item.currentProductId
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
                            <div className="col-sm-12">
                                      <div className="d-flex justify-content-between me-2">
                                        <label
                                          className="form-label"
                                          htmlFor="partner"
                                        >
                                          Գնորդ
                                        </label>
                                        {methods.formState.errors.partner && (
                                          <span className="error text-red">
                                            <span>
                                              <img
                                                src={ErrorSvg}
                                                alt="errorSvg"
                                              />
                                            </span>{" "}
                                            պարտադիր
                                          </span>
                                        )}
                                      </div>
                                      <div className="form-control">
                                        <Controller
                                          name="partner"
                                          control={methods.control}
                                          defaultValue={null}
                                          rules={{ required: true }}
                                          render={({ field }) => (
                                            <Select
                                              {...field}
                                              // onChange={(val) => {
                                              //   field.onChange(val.value);
                                              //   onPartnerSelect(val);
                                              // }}
                                              // value={partners.find(
                                              //   (option) =>
                                              //     option.value === partnerName
                                              // )}
                                              options={partners.map((partner) => ({
                                                value: partner.partnerId,
                                                label: `${partner?.partnerId}․  ${partner?.name}`,
                                              }))}
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
                  {(!!fetchedProductsList && fetchedProductsList.length) ?
                  <>
                    <div className="separator-full"></div>
                    <div style={{border:'1px solid #edebeb', borderRadius:'10px', padding:'10px'}}>

                  <CustomTable column={fetchedDataColumn} data={fetchedProductsList} dataReceived={true}/>
                    </div>
                  </>:<></>
                  }
                    {(!!outgoingList && outgoingList.length) ?
                  <>
                    <div className="separator-full"></div>
                    <div style={{border:'1px solid #edebeb', borderRadius:'10px', padding:'10px'}}>
                      <header>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <h4>Դուրս գրվող ապրանքներ</h4>
                        </div>
                      </header>
                  {outgoingList.map((el,index)=>{
                    return<ul>
                      <li key = {el.id} ><FeatherIcon  icon={'minus'} style={{cursor:'pointer', border:'1px solid #edebeb', borderRadius:'10px',marginRight:'10px'}} onClick={()=>handleDeleteselected(el.id)}/>{'['+(el.id)+']' + "." + el.name+"- "+el.outgoingCount} </li>
                      
                      <div className="separator"></div>

                    </ul>
                  })}
                  <footer>
                    <div>

                    </div>
                  </footer>
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
const EditableInput = ({ rowId, value, handleInputChange, isFocused, onFocus }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <input
      ref={inputRef}
      className="form-control"
      style={{ width: "70px", height: "30px", padding: "1px" }}
      value={value}
      onChange={(e) => handleInputChange(e, rowId)}
      onFocus={() => onFocus(rowId)}
    />
  );
};