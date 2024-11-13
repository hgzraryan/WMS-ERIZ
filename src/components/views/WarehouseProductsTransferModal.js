import React, { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";
import { Controller, Form, FormProvider, useForm} from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import makeAnimated from "react-select/animated";
import ErrorSvg from "../../dist/svg/error.svg";
import Select from "react-select";
import { toast } from 'react-toastify';
import { TRANSFERPRODUCTS_URL, WAREHOUSES_URL, WARREHOUSESLIST_ROUTE } from '../../utils/constants';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Input } from '../Input';
import { count_validation, pallet_validation, Quantity_validation, volume_validation, Weight_validation } from '../../utils/inputValidations';
import moment from 'moment';
import CustomDateTimeComponent from '../CustomDateTimeComponent copy';
function WarehouseProductsTransferModal({transfer,setTransfer,refreshData}) {
    const navigate = useNavigate()
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
    const [warehouses, setWarehouses] = useState([]);
    const [warehouseProducts, setWarehouseProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productBalance, setProductBalance] = useState(0);
  const [currentProduct, setCurrentProduct] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const storedUserData = JSON.parse(localStorage.getItem('userData'));

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
  const onProductSelect = ({data}) => {
//debugger
    setCurrentProduct(data)
    setProductBalance(data?.balance)  
    };
    const methods = useForm({
        mode: "onChange",
      });
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
        //console.log(mon)
        console.log(data)
        console.log(currentProduct)
        const newTransfer = {
         // transCount: +data?.count|| null,
          fromWarehouseId: transfer.warehouseId || null,
          //destId: data?.impWarehouse?.value || null,
          //productID:data?.product?.value || null,
          //paymentPurpose:data?.paymentPurpose||null,
          userId:storedUserData?.userId||null,
          name: currentProduct?.name || null,
          currentProductId: data?.product?.value || null,
          productCategory: currentProduct?.productCategory || null,
          productIdent: currentProduct?.productIdent || null,
          countryOfOrigin:currentProduct.countryOfOrigin,
          stock: data?.impWarehouse?.value || null,
          supplier: currentProduct.supplier || null,
          driver: currentProduct.driver || null,
          quantity:data.quantity || null,
          balance:+data?.weight || +data?.volume || null,
          unit:data?.weight?'kg':data?.volume?"liter":'',
          dimensions:{
            weight: +data?.weight?+data?.weight : null,
            volume: +data?.volume?+data?.volume : null,
          },
          palletCount:data?.pallet,
          currency:currentProduct?.currency,
          price:currentProduct?.price,
          reorderLevel: currentProduct?.reorderLevel,
          producedDate:currentProduct?.producedDate,
          expiredAlertDay:currentProduct?.expiredAlertDay,
          expirationDate:currentProduct?.expirationDate,
          actionDate:moment(data?.actionDate).format('YYYY-MM-DD HH:mm'),
          barcode: currentProduct?.barcode,
        };
        console.log(newTransfer)

        //const updatedData = deleteNullProperties(newDiagnose)
        
    // if(data?.count<=productBalance){

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
            }  else {
                setErrMsg("Համակարգի սխալ");
            }
        }
    // }else if(data?.moneyTransfer>productBalance) {
    //     setErrMsg('Մուտքագրված գումարի չափսը սխալ է')
    // }
      });
  return (
    <Modal
    show={() => true}
    size="md"
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
                                          value={{value: transfer.warehouseId,
                                            label: `${transfer?.warehouseId} - ${transfer?.name} `}}
                                          isDisabled
                                          options={warehouses?.map((item) => {
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
                                          placeholder={"Պահեստ"}
                                        />
                                      )}
                                    />
                                    
                                  </div>
                                </div>
                                <div className="col-sm-12">
                                  <div className="d-flex justify-content-between me-2">
                                
                                    <label
                                      className="form-label d-flex justify-content-between w-100"
                                      htmlFor="product"
                                      placeholder={"Ընտրել"}
                                    >

                                      <div>Ապրանք</div>
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
                                      rules={{ required: false }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          onChange={(val) => {
                                            field.onChange(val);
                                            onProductSelect(val);
                                          }}
                                        //   value={{value: transfer.warehouseId,
                                        //     label: `${transfer?.warehouseId} - ${transfer?.name} `}}
                                          options={warehouseProducts?.map((item) => 
                                            
    
                                             { return { value: item.productId,
                                               label:item.productId+"․ "+item.name +"/ Մնացորդ-"+item?.balance,
                                               balance:item?.balance,
                                              data:item}
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
                                          placeholder={"Մուտքագրվող"}
                                        />
                                      )}
                                    />
                                    
                                  </div>
                                </div>
                              </div>

                              <div className="row gx-3 mt-2">
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
                            
                          </div>
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

                        <p style={{color:'red', fontSize:'12px'}}>{errMsg}</p>
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
