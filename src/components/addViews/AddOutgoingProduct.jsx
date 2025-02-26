import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import ErrorSvg from "../../dist/svg/error.svg";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { PARTNERS_URL, PRODUCTS_URL, PRODUCTSLIST_URL, REGISTER_PRODUCT, WAREHOUSES_URL, WORKERS_URL } from "../../utils/constants";
import { deleteNullProperties } from "../../utils/helper";
import CustomTable from "../CustomTable";
import { BiSolidInfoCircle } from "react-icons/bi";
import moment from "moment";
import { toast } from "react-toastify";
import CustomDateTimeComponent from "../CustomDateTimeComponent copy";
import TotalView from "../viewTables/TotalView";
import { Input } from "../Input";
import { price_validation, sellingPrice_validation } from "../../utils/inputValidations";
import ReactQuillEditor from "../views/ReactQuillEditor";
const test = [
  {
    name: 'xozi bud',
    count: 5,
    price: 1200,
    totalPrice: 6000
  },
  {
    name: 'xozi glux',
    count: 3,
    price: 1500,
    totalPrice: 4500
  },
]
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
  const [workers, setWorkers] = useState([])
  const [additionalData, setAdditionalData] = useState('')

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
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
  // const handleInputChange = useCallback((e, rowId) => {
  //   const { value } = e.target;
  //   console.log(value)
  //   setRowInputValues((prevValues) => ({
  //     ...prevValues,
  //     [rowId]: value,
  //   }));
  // }, []);
  const handleInputChange = (e, rowId) => {
    const value = e.target.value;

    setRowInputValues((prevValues) => {
      // If input is empty, delete the key from state
      if (!value.trim()) {
        const updatedValues = { ...prevValues };
        delete updatedValues[rowId];
        return updatedValues;
      }
      return { ...prevValues, [rowId]: value };
    });
  };
  const onPartnerSelect = (data) => {
    setPartners(data.value);
  };
  const fetchDataByProduct = async (productListId) => {
    try {
      const respProductsList = await axiosPrivate.post('/productById', {
        productListId: productListId,

      });
      setFetchedProductsList(respProductsList?.data?.jsonString);

      setIsLoading(false);
      return respProductsList?.data?.jsonString
    } catch (err) {
      console.log(err);
      navigate("/login", { state: { from: location }, replace: true });
    }

  };
  const handleOutgoingProductsList = async (e, row) => {
    console.log(row)
    console.log(rowInputValues)
    e.preventDefault()

    const tmp = {}
    tmp.id = row.original.incomingProductId
    tmp.name = row.original.name
    tmp.productListId = row.original.currentProductId
    tmp.outgoingCount = +rowInputValues[row.original.incomingProductId]
    tmp.unit = row.original.dimensions.weight ? 'կգ' : row.original.dimensions.volume ? 'Լիտր' : ''
    tmp.warehouse = row.original.warehouseId
    tmp.price = row.original.price
    tmp.barcode = row.original.barcode
    tmp.balance = row.original.balance - (+rowInputValues[row.original.incomingProductId])
    tmp.currency = row.original.currency

    const tmpData = []
    tmpData.push(tmp)
    setOutgoingList((prev) => [tmp, ...prev])
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

  const onProductSelect = async (data) => {
    console.log(data)
    const tmp = await fetchDataByProduct(data.currentProductId)
    setFetchedProductsList(tmp)
  }
  const handleDeleteselected = (deleteId) => {
    const tmp = outgoingList.filter((el) => el.id !== deleteId)
    setOutgoingList(tmp)
    setRowInputValues((prevValues) => {
      if (deleteId) {
        // If input is empty, delete the key from state
        const updatedValues = { ...prevValues };
        delete updatedValues[deleteId];
        return updatedValues;
      }
    });
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const partnersResp = await axiosPrivate.get(PARTNERS_URL);
        setPartners(partnersResp?.data?.jsonString);

        const driversList = await axiosPrivate.get(WORKERS_URL);
        const tmp = driversList?.data?.jsonString.filter((el) => el.workerRoleType === 'driver')
        setWorkers(tmp);

        const respProductsList = await axiosPrivate.get(PRODUCTSLIST_URL);
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
  }, [navigate]);

  const methods = useForm({
    mode: "onChange",
  });

  const onSubmit = methods.handleSubmit(async (data) => {

    if (outgoingList.length) {
      try {
        await axiosPrivate.post('/registerOutgoing',
          {
            customer: data.partner.value,
            driver: data.driver.value,
            sellingPrice: +data.sellingPrice,
            actionDate: moment(data?.actionDate).format('YYYY-MM-DD HH:mm'),
            outgoingList: outgoingList,
            description: additionalData,
          }, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        handleToggleCreateModal(false);
        refreshData();
        notify(
          `Ապրանքը  ելքագրված է`
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
    } else if (!outgoingList.length) {
      setErrMsg("Մուտքագրեք դուրս գրվող ապրանքի քանակը")
    }
  });
  const fetchedDataColumn = useMemo(
    () => [
      {
        Header: (event) => (
          <>
            <div className="columnHeader">ID</div>
          </>
        ),
        accessor: "incomingProductId",
        sortable: true,
        width: 60,

      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Անվանում</div>
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
      {
        Header: (event) => (
          <>

            <div className="columnHeader">Մուտքի ամսաթիվ</div>
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
        width: 140,

      },
      {
        Header: (event) => (
          <>

            <div className="columnHeader">Գին</div>
          </>
        ),
        accessor: "price",
        width: 100,
      },
      {
        Header: (event) => (
          <>

            <div className="columnHeader">Պիտ. ամսաթիվ</div>
          </>
        ),
        accessor: "expirationDate",
        style: {
          // Custom style for the 'description' column
        },
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            {moment(row.original?.expirationDate).format('DD-MM-YYYY')}
          </div>
        ),
        width: 120,

      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Մնացորդ</div>
          </>
        ),
        accessor: "balance",
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

        Cell: ({ row }) => {
          const isInputEmpty = !rowInputValues[row.original.incomingProductId]?.trim();
          const handleButtonClick = (e, row) => {
            handleOutgoingProductsList(e, row); // Call your existing function
            setErrMsg('')

            // Clear the input for the current row
            setRowInputValues((prevValues) => ({
              ...prevValues,
              [row.original.incomingProductId]: "", // Reset input to empty string
            }));
          }
          return (

            <div className="d-flex align-items-center">

              <div className="d-flex">
                <EditableInput
                  rowId={row.original.incomingProductId}
                  value={rowInputValues[row?.original?.incomingProductId] || ""}
                  handleInputChange={handleInputChange}
                  isFocused={focusedInputId === row.original.incomingProductId}
                  onFocus={handleFocus}
                />
                {console.log(rowInputValues)}
                <button
                  disabled={isInputEmpty}
                  className="btn btn-primary"
                  style={{ marginLeft: '5px', width: '40px', height: '30px', padding: '1px' }}
                  onClick={(e) => handleButtonClick(e, row)}>
                  Ելք
                </button>
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
          )
        },
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
                      <section className="d-flex justify-content-between">
                        <div className="card w-100">
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
                                      htmlFor="productList"
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
                                              currentProductId: item.productListId
                                            }))}
                                            placeholder={"Ընտրել"}
                                            onChange={(val) => {
                                              field.onChange(val);
                                              onProductSelect(val);
                                              setOutgoingList([])
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
                                <div className="col-sm-12">
                                  <div className="d-flex justify-content-between me-2">
                                    <label
                                      className="form-label"
                                      htmlFor="driver"
                                    >
                                      Վարորդ
                                    </label>
                                    {methods.formState.errors
                                      .driver && (
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
                                      name="driver"
                                      control={methods.control}
                                      defaultValue={null}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          options={workers?.map((el) => (

                                            {
                                              value: el.workerId,
                                              label: `${el?.workerId}․  ${el?.fullName}`
                                            }
                                          )
                                          )}
                                          placeholder={"Ընտրել"}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <Input {...sellingPrice_validation} validation={{ required: { value: true, message: "պարտադիր" } }} />
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="actionDate"
                                      >
                                        Ելքի ամսաթիվ
                                      </label>
                                      {methods.formState.errors.actionDate && (
                                        <span className="error text-red">
                                          <span>
                                            <img src={ErrorSvg} alt="errorSvg" />
                                          </span>{" "}
                                          պարտադիր
                                        </span>
                                      )}
                                    </div>
                                    <div>
                                      <CustomDateTimeComponent
                                        name="actionDate"
                                        methods={methods}
                                        control={methods.control}
                                        defaultValue={new Date()}
                                        required={true}
                                      />
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="card w-35">
                          <div className="card-header d-flex" style={{ backgroundColor: '#018a54', fontSize: '24px', color: '#fff', borderRadius: '10px' }}>
                            <p>Դուրսբերում</p>
                            <p>{ }</p>

                          </div>
                          <div className="card-body p-0">
                            <div className="modal-body p-0">
                              <TotalView column={fetchedDataColumn1} data={test} dataReceived={true} />
                            </div>
                          </div>
                        </div> */}
                      </section>
                      {(!!fetchedProductsList && fetchedProductsList.length) ?
                        <>
                          <div className="separator-full"></div>
                          <div className="flex-center">
                            <h4 className="">Ընտրեք դուրս գրվող ապրանքը</h4>
                          </div>

                          <div style={{ border: '3px solid #edebeb', borderRadius: '10px', padding: '10px' }}>

                            <CustomTable column={fetchedDataColumn} data={fetchedProductsList} dataReceived={true} />
                          </div>
                        </> : <></>
                      }
                      {(!!outgoingList && outgoingList.length) ?
                        <>
                          <div className="separator-full"></div>
                          <div style={{ border: '1px solid #edebeb', borderRadius: '10px' }}>
                            <header style={{ backgroundColor: '#018a54', fontSize: '24px', color: '#fff', borderRadius: '10px 10px 0 0', padding: '10px', marginBottom: '20px' }}>
                              <div className="flex-center">
                                <h4>Դուրս գրվող ապրանքներ</h4>
                              </div>
                            </header>
                            <ul>
                              {outgoingList.map((el, index) => {
                                return (
                                  <>
                                    <div className="d-flex gap-5 mb-2 justify-content-between">
                                      <li key={el.id} >
                                        {(el.id) + '.' + el.name + "- " + el.outgoingCount + el.unit}
                                      </li>
                                      <div>
                                        <FeatherIcon icon={'trash'} style={{ color: 'red', cursor: 'pointer', border: '1px solid #edebeb', borderRadius: '10px', marginRight: '10px' }}
                                          onClick={() => handleDeleteselected(el.id)} />
                                      </div>
                                      <div className="separator m-0 p-0"></div>

                                    </div>
                                  </>
                                )

                              })}
                            </ul>
                            <footer>
                              <div>

                              </div>
                            </footer>
                          </div>
                        </> : <></>
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
                      {
                        (!Object.values(rowInputValues).length || errMsg.length) ?
                          <div className="error-wrapper">
                            <p style={{ color: 'orange', fontSize: '18px' }}>{errMsg}</p>
                          </div> : <></>
                      }
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
                          Ելքագրել
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