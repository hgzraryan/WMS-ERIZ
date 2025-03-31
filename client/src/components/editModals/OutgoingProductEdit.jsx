import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import ErrorSvg from "../../dist/svg/error.svg";
import { Input } from "../Input";
import Select from "react-select";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { deleteNullProperties } from "../../utils/helper";
import { toast } from "react-toastify";
import CustomDateComponent from "../CustomDateComponent";
import { CountryDropdown, CountryRegionData } from 'react-country-region-selector';
import moment from "moment";
import CustomDateTimeComponent from "../CustomDateTimeComponent copy";
import ReactQuillEditor from "../ReactQuillEditor";
import { PARTNERS_URL, PRODUCTSLIST_URL, WORKERS_URL } from "../../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { count_validation, sellingPrice_validation } from "../../utils/inputValidations";

// {
//     "outgoingProductId": 22,
//     "customer": "Դավիթ Տիգրանյանa",
//     "currentProductid": 13,
//     "name": "Խոզի թիակ",
//     "outgoingCount": 290,
//     "warehouse": "pahest1",
//     "description": "",
//     "price": "0",
//     "balance": 10,
//     "barcode": "0",
//     "driverId": 1,
//     "sellingPrice": 2501,
//     "driverName": "Դավիթ Տիգրանյան Սամվելիaa",
//     "outgoingDate": "2025-03-26 14:57",
//     "actionDate": "2025-03-26 14:57",
//     "_id": "67e3dd9e761449dea01241be"
// }
function OutgoingProductEdit(
    {
        outgoingProduct,
        setEditRow,
        refreshData,
    }
) {
    const [errMsg, setErrMsg] = useState("");
    const [partners, setPartners] = useState([]);
    const [outgoingList, setOutgoingList] = useState([]);
    const [workers, setWorkers] = useState([])
    const [additionalData, setAdditionalData] = useState(outgoingProduct.description)
    const [isLoading, setIsLoading] = useState(true);
    const [productsList, setProductsList] = useState([])
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
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
        const handleOutgoingProductsList = async (e, row) => {
            e.preventDefault()
        
            const tmp = {}
            tmp.id = row.original.incomingProductId
            tmp.name = row.original.name
            tmp.productListId = row.original.currentProductId
            //tmp.outgoingCount = +rowInputValues[row.original.incomingProductId]
            tmp.unit = row.original.dimensions.weight ? 'կգ' : row.original.dimensions.volume ? 'Լիտր' : ''
            tmp.warehouse = row.original.warehouseId
            tmp.price = row.original.price
            tmp.barcode = row.original.barcode
            //tmp.balance = row.original.balance - (+rowInputValues[row.original.incomingProductId])
            tmp.currency = row.original.currency
        
            const tmpData = []
            tmpData.push(tmp)
            setOutgoingList((prev) => [tmp, ...prev])
          };
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
      const onSubmit = methods.handleSubmit(async (data) => {
    
       // if (outgoingList.length) {
          // try {
          //   await axiosPrivate.post('/registerOutgoing',
          //     {
          //       customer: data.partner.value,
          //       driver: data.driver.value,
          //       sellingPrice: +data.sellingPrice,
          //       actionDate: moment(data?.actionDate).format('YYYY-MM-DD HH:mm'),
          //       outgoingList: outgoingList,
          //       description: additionalData,
          //     }, {
          //     headers: { "Content-Type": "application/json" },
          //     withCredentials: true,
          //   });
    
          //   setEditRow(false);
          //   refreshData();
          //   notify(
          //     `Ապրանքը  ելքագրված է`
          //   );
          // } catch (err) {
          //   if (!err?.response) {
          //     setErrMsg("No Server Response");
          //   } else if (err.response?.status === 409) {
          //     setErrMsg("Username Taken");
          //   } else {
          //     setErrMsg(" Failed");
          //   }
          // }
        // } else if (!outgoingList.length) {
        //   setErrMsg("Մուտքագրեք դուրս գրվող ապրանքի քանակը")
        // }
      });
    return (
        <>
            <Modal
                show={() => true}
                size="xl"
                onHide={() => setEditRow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ width: "100%", textAlign: "center" }}>
                        Ապրանքի դուրսբերում
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
                                                        <div className="col-sm-6">
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
                                      defaultValue={
                                        outgoingProduct
                                            ? { value: outgoingProduct?.partnerId, label: outgoingProduct?.partnerName }
                                            : null
                                    }
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
                                        outgoingProduct
                                            ? { value: outgoingProduct?.driverId, label: outgoingProduct?.driverName }
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

                                                        </div>
                                                        <div className="row gx-3">
                                                            <div className="col-sm-6">
                                                                 <Input {...sellingPrice_validation}
                                                                  validation={{ required: { value: true, message: "պարտադիր" } }} 
                                                                  defaultValue={outgoingProduct?.sellingPrice}/>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                 <Input {...count_validation}
                                                                  defaultValue={outgoingProduct?.outgoingCount}/>
                                                            </div>
                                                            {/* <div className="col-sm-6">
                                    <Input {...barcode_validation} />
                                  </div> */}
                                                            
                                                      
                                                        </div>
                                                        {/* <div className="row gx-3">
                                                           
                                                            <div className="col-sm-6">
                                                                <Input {...barcode_validation} validation={{ required: { value: false } }} defaultValue={incomingProduct?.barcode} />
                                                            </div>
                                                        </div>

                                                        <div className="row gx-3">
                                                            <div className="col-sm-6">
                                                                <Input {...pallet_validation} defaultValue={incomingProduct?.palletCount} />
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <Input {...Quantity_validation} defaultValue={incomingProduct?.quantity} />
                                                            </div>
                                                        </div>
                                                        <div className="row gx-3">
                                                            <div className="col-sm-6">
                                                                <Input {...Weight_validation} defaultValue={incomingProduct?.dimensions?.weight} />
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <Input {...volume_validation} defaultValue={incomingProduct?.dimensions?.volume} />
                                                            </div>

                                                        </div> */}

                                                     
                                                        {/* <div className="row gx-3">  
                                  <div className="col-sm-6">
                                    <Input {...reorderLevel_validation} />
                                  </div>
                                </div> */}
                                                        {/* <div className="row gx-3">
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
                                                                            defaultValue={outgoingProduct?.expirationDate}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                        {/* <div className="row gx-3">

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
                                                        </div> */}
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

export default OutgoingProductEdit
