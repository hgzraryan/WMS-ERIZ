import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import ErrorSvg from "../../dist/svg/error.svg";
import { Input } from "../Input";

import {
    volume_validation,
    pallet_validation,
    barcode_validation,
    BoxCount_validation,
    BoxCapacity_validation,
    UnitWeight_validation,
    manufacturer_validation,
} from "../../utils/inputValidations";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { PRODUCTSLIST_URL, REGISTER_PRODUCT, CURRENCIES, WAREHOUSES_URL, WORKERS_URL, PARTNERS_URL, MANUFACTURERS_URL } from "../../utils/constants";
import { deleteNullProperties } from "../../utils/helper";
import { toast } from "react-toastify";
import CustomDateComponent from "../CustomDateComponent";
import { CountryDropdown, CountryRegionData } from 'react-country-region-selector';
import moment from "moment";
import CustomDateTimeComponent from "../CustomDateTimeComponent copy";
import ReactQuillEditor from "../ReactQuillEditor";

function RepeatRegisterIncomingProduct({ incomingProduct, setEditRow, refreshData }) {
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const [additionalData, setAdditionalData] = useState(incomingProduct?.description)
    const [productClassType, setProductClassType] = useState("");
    const [attributs, setAttributs] = useState([]);
    const [productClassId, setProductClassId] = useState([]);
    const [wareHouses, setWareHouses] = useState([]);
    const [VAT, setVAT] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [amount, setAmount] = useState(incomingProduct?.price);
    const [currency, setCurrency] = useState(incomingProduct?.currency);
    const [newProduct, setNewProduct] = useState(false)
    const [productsList, setProductsList] = useState([])
    const [partnersList, setPartnersList] = useState([])
    const [workers, setWorkers] = useState([])
    const [manufacturers, setManufacturers] = useState([])

    const methods = useForm({
        mode: "onChange",
    });
    const { watch } = methods;
    const weightValue = watch("weight"); // Watch the weight input
  const volumeValue = watch("volume"); // Watch the volume input
  const boxCount = watch("boxCount"); // Watch the volume input
  const boxCapacity = watch("boxCapacity"); // Watch the volume input
  const unitWeight = watch("unitWeight"); // Watch the volume input"volume"); // Watch the volume input

      const totalWeight = useMemo(() => {
        const count = parseFloat(boxCount) || 0;
        const capacity = parseFloat(boxCapacity) || 0;
        const weight = parseFloat(unitWeight) || 0;
        return count * capacity * weight;
      }, [boxCount, boxCapacity, unitWeight]);
      const totalCount = useMemo(() => {
        const count = parseFloat(boxCount) || 0;
        const capacity = parseFloat(boxCapacity) || 0;
        return count * capacity;
      }, [boxCount, boxCapacity]);
    const { trigger } = useForm();
    console.log(incomingProduct)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsList = await axiosPrivate.get(PRODUCTSLIST_URL);
                setProductsList(productsList?.data?.jsonString);
                console.log(productsList?.data?.jsonString)

                const partnersList = await axiosPrivate.get(PARTNERS_URL);
                setPartnersList(partnersList?.data?.jsonString);
                
                const manufacturersList = await axiosPrivate.get(MANUFACTURERS_URL);
                setManufacturers(manufacturersList?.data?.jsonString);

                const workersList = await axiosPrivate.get(WORKERS_URL);
                setWorkers(workersList?.data?.jsonString);

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
    }, [navigate, newProduct]);

    const handleCurrencyChange = (e) => {
        const asd = CURRENCIES.filter((el) =>
            el.label === e.target?.value
        )
        console.log(asd)
        console.log(e.target?.value)
        setCurrency(e.target?.value)
    };
    const handleAmountChange = (e) => {
        setAmount((prev) => e.target.value);
    };
    useEffect(() => {
        if (CountryRegionData[11][0] === "Armenia") {
            CountryRegionData[11][0] = "Հայաստան";
            CountryRegionData[11][2] =
                "Արագածոտն~AG|Արարատ~AR|Արմավիր~AV|Գեղարքունիք~GR|Կոտայք~KT|Լոռի~LO|Շիրակ~SH|Սյունիք~SU|Տավուշ~TV|Վայոց Ձոր~VD|Երևան~ER";
        }
        setCountry(incomingProduct?.contact?.address?.country);
    }, []);
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
            console.log(data)
            const newProd = {
              name: data?.productName?.label || null,
              currentProductId: data?.productName?.productListId || null,
              productCategory: data?.productName?.categoryId || null,
              productIdent: data?.productName?.value || null,
              countryOfOrigin:data.countryOfOrigin,
              stock: +data?.warehouse?.value || null,
              partner: +data.partners?.value || null,
              driver: +data.driver?.value || null,
              quantity: +data.quantity || null,
              balance: +totalWeight || +data?.volume || null,
              unit:totalWeight?'kg':data.volume?"litre":'',
              dimensions:{
                //height: +data.height || null,
                //length: +data.length || null,
                // width: +data.width || null,
                weight: +totalWeight || null,
                volume: +data.volume || null,
              },
              palletCount:+data?.pallet,
              boxCount:+boxCount,
              unitWeight:+unitWeight,
              boxCapacity:+boxCapacity,
              manufacturer:+data.manufacturers?.value,
              currency:currency,
              price:+amount,
              sellingPrice:0,//+data.sellingPrice,
              producedDate:moment(data?.dateOfBirth).format('YYYY-MM-DD'),
              expiredAlertDay:moment(data?.expiredAlertDay).format('YYYY-MM-DD'),
              expirationDate:moment(data?.expirationDate).format('YYYY-MM-DD'),
              actionDate:moment(data?.actionDate).format('YYYY-MM-DD HH:mm'),
              description:additionalData.length? additionalData : '',
              barcode: +data?.barcode,
              //productCategory:data?.productCategory || 1,
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
            console.log(updatedData)
        
            try {
              await axiosPrivate.post(REGISTER_PRODUCT, updatedData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              });
        
              setEditRow(false);
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
    // const onSubmit = methods.handleSubmit(async (data) => {
    //     console.log(data)
    //     const { weight, volume } = incomingProduct?.dimensions || {};

    //     const newProd = {
    //         name: data?.productName?.label?.trim() !== incomingProduct?.name?.trim() ? data?.productName?.label : null,
    //         currentProductId: data?.productName?.productListId !== incomingProduct?.incomingProductId ? data?.productName?.productListId : null,
    //         productCategory: data?.productName?.categoryId !== incomingProduct?.productCategory ? data?.productName?.categoryId : null,
    //         productIdent: data?.productName?.value || null,//TODO ????????
    //         countryOfOrigin: data?.countryOfOrigin?.trim() !== incomingProduct?.countryOfOrigin?.trim() ? data?.countryOfOrigin : null,
    //         stock: +data?.warehouse?.value !== incomingProduct?.warehouseId ? +data?.warehouse?.value : null,
    //         partner: +data.partners?.value !== incomingProduct?.partnerId ? +data.partners?.value : null,
    //         driver: +data.driver?.value !== incomingProduct?.driverId ? +data.driver?.value : null,
    //         quantity: +data.quantity !== incomingProduct?.quantity ? +data.quantity : null,
    //         // balance: (+data.weight !== weight || +data.volume !== volume)
    //         //     ? +data.weight || +data.volume
    //         //     : null,
    //         // unit: data.weight ? 'kg' : data.volume ? "liter" : '',
    //         dimensions: {
    //             //height: +data.height || null,
    //             //length: +data.length || null,
    //             // width: +data.width || null,
    //             weight: (!!data.weight && +data.weight !==weight)?+data.weight:null,
    //             volume: (!!data.volume && +data.volume !== volume) ?+data.volume:null,
    //         },
    //          palletCount: +data.pallet !== incomingProduct?.palletCount ? +data.pallet : null,
    //          currency: currency !== incomingProduct?.currency.trim() ? currency : null,
    //          price: +data.price !== incomingProduct?.price ? +data.price : null,
    //         // sellingPrice: 0,//+data.sellingPrice,
    //          reorderLevel: +data.reorderLevel !== incomingProduct?.reorderLevel ? +data.reorderLevel : null,
    //          additional: additionalData!==incomingProduct?.description?.trim()?additionalData:null,
    //          barcode: +data.barcode !== incomingProduct?.barcode ? +data.barcode : null,

    //          //producedDate: moment(data?.dateOfBirth).format('YYYY-MM-DD'),
    //         // expiredAlertDay: moment(data?.expiredAlertDay).format('YYYY-MM-DD'),
    //         // expirationDate: moment(data?.expirationDate).format('YYYY-MM-DD'),
    //         //productCategory:data?.productCategory || 1,
    //         // SKU:'1',
    //         //  attributs:attributs.map((el,index)=>{return{
    //         //   'attributeName':el.attributeName,
    //         //   'attributeUnit':el.attributeUnit,
    //         //   'attributeUnitLabel':el.attributeUnitLabel
    //         //  }})
    //     };
    //     const updatedData = deleteNullProperties(newProd)
    //     console.log(updatedData)

    //     try {
    //         await axiosPrivate.post(REGISTER_PRODUCT, updatedData, {
    //             headers: { "Content-Type": "application/json" },
    //             withCredentials: true,
    //         });

    //         setEditRow(false);
    //         refreshData();
    //         notify(
    //             `${newProd.name}  ավելացված է`
    //         );
    //     } catch (err) {
    //         if (!err?.response) {
    //             setErrMsg("No Server Response");
    //         } else if (err.response?.status === 409) {
    //             setErrMsg("Username Taken");
    //         } else {
    //             setErrMsg(" Failed");
    //         }
    //     }
    // });
    return (
        <>
            <Modal
                show={() => true}
                size="xl"
                onHide={() => setEditRow(false)}
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
                                                            <span className="feather-icon">
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
                                                                        htmlFor="partners"
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
                                                                            defaultValue={
                                                                                incomingProduct
                                                                                    ? { 
                                                                                        productListId: incomingProduct?.currentProductId, 
                                                                                        label: incomingProduct?.name,
                                                                                        categoryId:incomingProduct?.productCategory,
                                                                                        value:incomingProduct?.currentProductId }
                                                                                    : null
                                                                            }
                                                                            rules={{ required: true }}
                                                                            render={({ field }) => (
                                                                                <Select
                                                                                    {...field}
                                                                                    value={field.value}
                                                                                    options={productsList?.map((item) => ({
                                                                                        productListId: item.productListId,
                                                                                        categoryId: item.category,
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
                                                                    {/* <FeatherIcon icon="plus-circle" width='24'  style={{ cursor: 'pointer',marginTop:'7px',marginLeft:'8px', color:'#01945c' }}   onClick={(e)=>handleAddNewProduct(e)}/> */}
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
                                                                    defaultValue={
                                                                        incomingProduct?.countryOfOrigin
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
                                                                                methods.trigger("countryOfOrigin");
                                                                                methods.setValue("state", '')
                                                                                methods.trigger("state")
                                                                            }}
                                                                            style={{
                                                                                appearance: "auto",
                                                                            }}
                                                                        />
                                                                    )}
                                                                />
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
                                                                        defaultValue={
                                                                            incomingProduct
                                                                                ? { value: incomingProduct?.warehouseId, label: incomingProduct?.warehouseName }
                                                                                : null
                                                                        }
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
                                                                        htmlFor="partners"
                                                                    >
                                                                        Մատակարարներ
                                                                    </label>
                                                                    {methods.formState.errors.partners && (
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
                                                                        name="partners"
                                                                        control={methods.control}
                                                                        defaultValue={
                                                                            incomingProduct
                                                                                ? { value: incomingProduct?.partnerId, label: incomingProduct?.partnerName }
                                                                                : null
                                                                        }
                                                                        rules={{ required: true }}
                                                                        render={({ field }) => (
                                                                            <Select
                                                                                {...field}
                                                                                value={field.value}
                                                                                options={partnersList?.map((item) => ({
                                                                                    value: item.partnerId,
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
                                                                        defaultValue={
                                                                            incomingProduct
                                                                                ? { value: incomingProduct?.driverId, label: incomingProduct?.driverName }
                                                                                : null
                                                                        }
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
                                                                <Input {...barcode_validation} validation={{ required: { value: false } }} defaultValue={incomingProduct?.barcode} />
                                                            </div>
                                                        </div>

                                                        <div className="row gx-3">
                                                            <div className="col-sm-6">
                                                                <Input {...pallet_validation} defaultValue={incomingProduct?.palletCount} />
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <Input {...volume_validation} 
                                                                defaultValue={incomingProduct?.dimensions?.volume} 
                                                                name="volume" 
                                                                disabled={!!totalWeight}
                                                                validation={{required:{ value:!totalWeight, message: "պարտադիր"}}}/>
                                                            </div>
                                                        </div>
                                                        <div className="separator-full"></div>

                                                        {/* <div className="row gx-3">
                                                            <div className="col-sm-6">
                                                                <Input {...Weight_validation}
                                                                 defaultValue={incomingProduct?.dimensions?.weight} 
                                                                 name="weight" 
                                                                 disabled={!!volumeValue}
                                                                 validation={{required:{ value:!volumeValue, message: "պարտադիր"}}}/>
                                                            </div>
                                                          

                                                        </div> */}
                                                                                         <div className="row gx-3">
                                                         <div className="col-sm-6">
                                                           <Input {...BoxCount_validation} 
                                                           defaultValue={incomingProduct?.boxCount}
                                                            />
                                                         </div>
                                                         <div className="col-sm-6">
                                                           <Input {...BoxCapacity_validation}
                                                           defaultValue={incomingProduct?.boxCapacity}/>
                                                         </div>
                                                       </div>
                                                       <div className="row gx-3">
                                                         <div className="col-sm-6">
                                                           <Input {...UnitWeight_validation} 
                                                           defaultValue={incomingProduct?.unitWeight}/>
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
                                                        
                                                         <div className="col-sm-6">
                                                         <div className="form-group">
                                                           <div className="d-flex justify-content-between">
                                                             <label htmlFor="totalCount" className="form-label">Ընդհանուր քանակ(հատ)</label>
                                                             </div>
                                                             <input 
                                                             id="totalCount" 
                                                             type="text" 
                                                             className="form-control" 
                                                             placeholder="Ընդհանուր քաշը" 
                                                             min="" name="totalCount" 
                                                             value={totalCount}
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
                                                       <div className="separator-full"></div>

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
                                                                        {CURRENCIES.map((el, i) => (
                                                                            <option key={i} value={el.value}>{el.label}</option>
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
                                                            {/* <div className="col-sm-6">
                                                                <Input {...reorderLevel_validation} defaultValue={incomingProduct?.reorderLevel} />
                                                            </div> */}
                                                                       <div className="col-sm-6">
                              <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-label"
                                  htmlFor="manufacturers"
                                >
                                  Արտադրողներ
                                </label>
                                {methods.formState.errors.manufacturers && (
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
                                  name="manufacturers"
                                  control={methods.control}
                                  defaultValue={
                                    incomingProduct
                                        ? { value: incomingProduct?.manufacturer, label: incomingProduct?.manufacturerName }
                                        : null
                                }
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      value={field.value}
                                      options={manufacturers?.map((item) => ({
                                        value: item.manufacturerId,
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
                                                            {/* <div className="col-sm-6">
                                    <Input {...sellingPrice_validation} />
                                  </div> */}
                                                        </div>
                                                        {/* <div className="row gx-3">  
                                  <div className="col-sm-6">
                                    <Input {...reorderLevel_validation} />
                                  </div>
                                </div> */}
                                <div className="row gx-3">                           
                                                           
                                                            {/* <div className="col-sm-6">
                                                              <Input {...sellingPrice_validation} />
                                                            </div> */}
                                                          </div>
                                                        <div className="row gx-3">
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <div className="d-flex justify-content-between me-2">
                                                                        <label
                                                                            className="form-label"
                                                                            htmlFor="producedDate"
                                                                        >
                                                                            Արտադրման ամսաթիվ
                                                                        </label>
                                                                        {methods.formState.errors.producedDate && (
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
                                                                            name="producedDate"
                                                                            control={methods.control}
                                                                            defaultValue={incomingProduct?.producedDate}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <div className="d-flex justify-content-between me-2">
                                                                        <label
                                                                            className="form-label"
                                                                            htmlFor="birthday"
                                                                        >
                                                                            Պիտանելիության ամսաթիվ
                                                                        </label>
                                                                        {methods.formState.errors.expirationDate && (
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
                                                                            name="expirationDate"
                                                                            control={methods.control}
                                                                            defaultValue={incomingProduct?.expirationDate}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row gx-3">

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
                                                                            defaultValue={incomingProduct?.expiredAlertDay}

                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <div className="d-flex justify-content-between me-2">
                                                                        <label
                                                                            className="form-label"
                                                                            htmlFor="actionDate"
                                                                        >
                                                                            Մուտքի ամսաթիվ
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
        </>
    )
}

export default RepeatRegisterIncomingProduct
