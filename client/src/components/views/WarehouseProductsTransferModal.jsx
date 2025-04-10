import React, { useEffect, useMemo, useState } from 'react'
import { Modal } from "react-bootstrap";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import makeAnimated from "react-select/animated";
import ErrorSvg from "../../dist/svg/error.svg";
import Select from "react-select";
import { toast } from 'react-toastify';
import { TRANSFERPRODUCTS_URL, WAREHOUSES_URL } from '../../utils/constants';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Input } from '../Input';
import {  productCount_validation } from '../../utils/inputValidations';
import moment from 'moment';
import CustomDateTimeComponent from '../CustomDateTimeComponent copy';
function WarehouseProductsTransferModal({ transfer, setTransfer, refreshData }) {
  const navigate = useNavigate()
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const [warehouses, setWarehouses] = useState([]);
  const [warehouseProducts, setWarehouseProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productBalance, setProductBalance] = useState(0);
  const [currentProduct, setCurrentProduct] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [isBox, setIsBox] = useState(0);
  const storedUserData = JSON.parse(localStorage.getItem('userData'));
  const methods = useForm({
    mode: "onChange",
  });
  const { watch } = methods;
  const productCount = watch("productCount"); // Watch the count input
  console.log(productCount)
  const totalWeight = useMemo(() => {
    console.log(warehouseProducts)
    if (currentProduct) {
      const boxCapacity = currentProduct.boxCapacity
      const unitWeight = currentProduct.unitWeight
      const boxCount = currentProduct.boxCount
      //const count1 = parseFloat(boxCount) || 0;
      // const capacity = parseFloat(boxCapacity) || 0;
      const box = productCount % boxCapacity
      console.log(box)
      setIsBox(box)
      return productCount * boxCapacity * unitWeight;
    }
  }, [productCount, currentProduct]);
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
  //   const onWarehouseSelect = ({totalPayed}) => {

  //       setDiagnosticsPrice(totalPayed)  
  //     };
  const onProductSelect = ({ data }) => {
    setCurrentProduct(data)
    setProductBalance(data?.balance)
  };
  const animatedComponents = makeAnimated();
  const colourStyles = {
    control: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: "#fff",
      borderColor: isFocused ? "#fff" : "#e8e3e3",
      boxShadow: "#e8e3e3",
      ":hover": {
        borderColor: "#fff",
      },
    }),

    multiValueLabel: (styles, { data }) => ({
      ...styles,
      backgroundColor: "#4eafcb",
      color: "#000",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      backgroundColor: "#4eafcb",
      color: "#e8e3e3",
      ":hover": {
        backgroundColor: "#4eafcb",
        color: "#eb3434",
      },
    }),
  };
  console.log(transfer)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const warehousesResp = await axiosPrivate.get(WAREHOUSES_URL);
        setWarehouses(warehousesResp?.data?.jsonString);

        const warehousesProductsResp = await axiosPrivate.get(`/warehouseProducts/${transfer?.warehouseId}`);
        setWarehouseProducts(warehousesProductsResp?.data?.jsonString);


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
  const onSubmit = methods.handleSubmit(async (data) => {
    if (+transfer.warehouseId === +data?.impWarehouse?.value) {
      setErrMsg('Ընտրեք մեկ այլ պահեստ')
      return
    } else {
    const actionCount = parseFloat(productCount);
    const boxcalc = actionCount/+currentProduct.boxCapacity

    const newTransfer = {
      fromWarehouseId: transfer.warehouseId || null,
      userId: storedUserData?.userId || null,
      name: currentProduct?.name || null,
      currentProductId: data?.product?.value || null,
      productCategory: currentProduct?.productCategory || null,
      productIdent: currentProduct?.productIdent || null,
      countryOfOrigin: currentProduct.countryOfOrigin || null,
      stock: data?.impWarehouse?.value || null,
      partner: currentProduct.partnerId || null,
      driver: currentProduct.driver || null,
      quantity: +productCount || null,
      balance: +totalWeight || +data?.volume || null,
      unit: totalWeight ? 'kg' : data?.volume ? "liter" : '',
      dimensions: {
        weight: +totalWeight ? +totalWeight : null,
        volume: +data?.volume ? +data?.volume : null,
      },
      //palletCount: data?.pallet,
      currency: currentProduct?.currency,
      price: currentProduct?.price,
      producedDate: currentProduct?.producedDate,
      expiredAlertDay: currentProduct?.expiredAlertDay,
      expirationDate: currentProduct?.expirationDate,
      actionDate: moment(data?.actionDate).format('YYYY-MM-DD HH:mm'),
      barcode: currentProduct?.barcode,
      boxCount:currentProduct?.boxCount,
      unitWeight:currentProduct?.unitWeight,
      boxCapacity:currentProduct?.boxCapacity,
      manufacturer:currentProduct?.manufacturer,
      outgoingBoxCount:boxcalc,
      outgoingQuantityCount:+productCount,
    };
    console.log(newTransfer)

    //const updatedData = deleteNullProperties(newDiagnose)

    if(+totalWeight<=+productBalance){
    if (newTransfer?.fromWarehouseId == newTransfer?.stock) {
      setErrMsg('Ընտրեք մեկ այլ պահեստ')
      return
    } else {

      try {
        await axiosPrivate.post(TRANSFERPRODUCTS_URL, newTransfer, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        setTransfer(false);
        refreshData();
        notify(
          `Փոխանցումը կատարված է`
        );
      } catch (err) {
        if (!err?.response) {
          setErrMsg("Համակարգի սխալ");
        } else {
          setErrMsg("Համակարգի սխալ");
        }
      }
    }
    }else {
        setErrMsg('Մուտքագրված քանակը սխալ է')
    }
  }
  });
  console.log(warehouseProducts)
  return (
    <Modal
      show={() => true}
      size="lg"
      onHide={() => setTransfer(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          {transfer.name}
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
                        <a href="#">Փոխանցում</a>

                      </div>
                      <div className="card-body">
                        <div className="modal-body">
                          <div className="row gx-3 mt-2">
                            <div className="col-sm-12">
                              <div className="d-flex justify-content-between me-2">

                                <label
                                  className="form-label d-flex justify-content-between w-100"
                                  htmlFor="expWarehouse"
                                  placeholder={"Ընտրել"}
                                >
                                  Ելքագրվող պահեստ
                                </label>
                                {methods.formState.errors.expWarehouse && (
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
                                  name="expWarehouse"
                                  control={methods.control}
                                  isClearable={true}
                                  defaultValue={null}
                                  rules={{ required: false }}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      //   onChange={(val) => {
                                      //     field.onChange(val);
                                      //     onDiagnosticSelect(val);
                                      //   }}
                                      value={{
                                        value: transfer.warehouseId,
                                        label: `${transfer?.warehouseId} - ${transfer?.name} `
                                      }}
                                      isDisabled
                                      options={warehouses?.map((item) => {
                                        if (item?.children?.length) {
                                          return {
                                            label: item?.name,
                                            options: item.children.map((el) => ({
                                              value: el.warehouseId,
                                              label: el.name,
                                            }))
                                          }
                                        } else {
                                          return {
                                            value: item.warehouseId,
                                            label: item.name,
                                          }
                                        }
                                      })}
                                      placeholder={"Պահեստ"}
                                    />
                                  )}
                                />

                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="d-flex justify-content-between me-2">

                                <label
                                  className="form-label "
                                  htmlFor="product"
                                  placeholder={"Ընտրել"}
                                >

                                  Ապրանք
                                  {/* <div>Հասանելի քանակ: <span style={{color:'#4eafcb',}}>{transfer?.totalPayed}</span></div> */}
                                </label>
                                {methods.formState.errors.product && (
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
                                  name="product"
                                  control={methods.control}
                                  isClearable={true}
                                  defaultValue={null}
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      onChange={(val) => {
                                        field.onChange(val);
                                        onProductSelect(val);
                                      }}
                                      //   value={{value: transfer.warehouseId,
                                      //     label: `${transfer?.warehouseId} - ${transfer?.name} `}}
                                      options={warehouseProducts?.map((item) => {
                                        return {
                                          value: item.incomingProductId,
                                          label: `${item.incomingProductId}․ 
                                               ${item.name} 
                                               / Արտ․ ամսաթիվ-${item.producedDate}
                                               / Մնացորդ-${item?.balance}կգ`,
                                          balance: item?.balance,
                                          data: item
                                        }
                                      }

                                      )}
                                      placeholder={"Ընտրել ապրանք"}
                                    />
                                  )}
                                />

                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="d-flex justify-content-between me-2">
                                {/* {researchesPrice ? <div className="d-flex flex-row-reverse" ><p style={{color:'#4eafcb',}}>Ընդհանուր արժեք։ <span style={{fontWeight:'bold'}} >{researchesPrice}</span>դր․</p></div>:''} */}
                                <label
                                  className="form-label"
                                  htmlFor="impWarehouse"
                                  placeholder={"Ընտրել"}
                                >
                                  Մուտքագրվող պահեստ
                                </label>
                                {methods.formState.errors.impWarehouse && (
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
                                  name="impWarehouse"
                                  control={methods.control}
                                  isClearable={true}
                                  defaultValue={null}
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      value={field.value}
                                      components={animatedComponents}
                                      options={warehouses?.map((item) => {
                                        if (item?.children?.length) {
                                          return {
                                            label: item?.name,
                                            options: item.children.map((el) => ({
                                              value: el.warehouseId,
                                              label: el.name,
                                            }))
                                          }
                                        } else {
                                          return {
                                            value: item.warehouseId,
                                            label: item.name,
                                          }
                                        }
                                      })}
                                      placeholder={"Մուտքագրվող"}
                                    />
                                  )}
                                />

                              </div>
                            </div>
                          </div>

                          {/* <div className="row gx-3 mt-2">
                            <div className="col-sm-6">
                              <Input {...pallet_validation} />
                            </div>
                              <div className="col-sm-6">
                              <Input {...Quantity_validation}/>
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...Weight_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...volume_validation} />
                            </div>
                            
                          </div> */}
                          <div className="separator-full"></div>
                          <div className="row gx-3">
                            <div style={{border:isBox!==0 ?'1px dotted #fc9403':'', borderRadius:'10px'}}>

                            <Input {...productCount_validation} required={true} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <div className="d-flex justify-content-between">
                                  <label htmlFor="boxCount" className="form-label">Արկղերի քանակը</label>
                                </div>
                                <input
                                  id="boxCount"
                                  type="text"
                                  className="form-control"
                                  placeholder="Արկղերի քանակը"
                                  min="" name="boxCount"
                                  value={currentProduct?.boxCount}
                                  readOnly // Prevent manual editingboxCount*boxCapacity*unitWeight:0}
                                />
                              </div>
                            </div>
                            {/* <div className="col-sm-6">
                                                        <Input {...BoxCount_validation} 
                                                        //validation={{required:{ value:!volumeValue, message: "պարտադիր"}}}
                                                         />
                                                      </div> */}
                            {/* <div className="col-sm-6">
                                                        <Input {...BoxCapacity_validation} />
                                                      </div> */}
                            <div className="col-sm-6">
                              <div className="form-group">
                                <div className="d-flex justify-content-between">
                                  <label htmlFor="BoxCapacity" className="form-label">Արկղի տարող․(հատ)</label>
                                </div>
                                <div style={{border:isBox!==0 ?'1px dotted #fc9403':'', borderRadius:'10px'}}>

                                <input
                                  id="BoxCapacity"
                                  type="text"
                                  className="form-control"
                                  placeholder="Արկղի տարող․(հատ)"
                                  min="" name="BoxCapacity"
                                  value={currentProduct?.boxCapacity}
                                  readOnly // Prevent manual editingboxCount*boxCapacity*unitWeight:0}
                                  />
                                  </div>
                              </div>
                            </div>
                          </div>
                          <div className="row gx-3">

                            <div className="col-sm-6">
                              <div className="form-group">
                                <div className="d-flex justify-content-between">
                                  <label htmlFor="UnitWeight" className="form-label">Միավորի քաշը(կգ)</label>
                                </div>
                                <input
                                  id="UnitWeight"
                                  type="text"
                                  className="form-control"
                                  placeholder="Միավորի քաշը"
                                  min=""
                                  name="UnitWeight"
                                  value={currentProduct?.unitWeight}
                                  readOnly // Prevent manual editingboxCount*boxCapacity*unitWeight:0}
                                />
                              </div>
                            </div>
                            {/* <div className="col-sm-6">
                                                        <Input {...Weight_validation} 
                                                        name="weight" 
                                                        disabled={!!volumeValue}
                                                        validation={{required:{ value:!volumeValue, message: "պարտադիր"}}}
                                                         />
                                                      </div> */}
                            <div className="col-sm-6">
                              <div className="form-group">
                                <div className="d-flex justify-content-between">
                                  <label htmlFor="totalWeight" className="form-label">Ընդհանուր քաշը(Կգ)</label>
                                </div>
                                <input
                                  id="totalWeight"
                                  type="text"
                                  className="form-control"
                                  placeholder="Ընդհանուր քաշը"
                                  min="" name="totalWeight"
                                  value={totalWeight}
                                  readOnly // Prevent manual editingboxCount*boxCapacity*unitWeight:0}
                                />
                              </div>
                              {/* <label>
                                                          Ընդհանուր քաշը
                                                        </label>
                                                        <input 
                                                        className="form-control"
                                                        disabled={true}
                                                        value={(boxCount && boxCapacity && unitWeight)? boxCount*boxCapacity*unitWeight:0}
                                                        onChange={{}}
                                                         /> */}
                            </div>
                          </div>
                          <div className="row gx-3">

                          </div>
                          <div className="separator-full"></div>
                          <div className="row gx-3 mt-2">
                            <div className="col-sm-12">
                              <div className="form-group">
                                <div className="d-flex justify-content-between me-2">
                                  <label
                                    className="form-label"
                                    htmlFor="actionDate"
                                  >
                                    Գործողության ամսաթիվ
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
                        <div className='d-flex flex-row-reverse'>

                          <p style={{ color: 'red', fontSize: '12px' }}>{errMsg}</p>
                        </div>
                      </div>
                    </div>
                    <div className="separator-full"></div>

                    <div className="modal-footer align-items-center">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setTransfer(false)}
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

export default WarehouseProductsTransferModal
