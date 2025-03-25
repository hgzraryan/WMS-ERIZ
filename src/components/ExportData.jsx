import React, { Suspense, useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import ErrorSvg from "../dist/svg/error.svg";
import LoadingSpinner from './LoadingSpinner';
import Select from "react-select";
import moment from 'moment';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { utils, writeFile } from 'xlsx';
import { CSVLink } from "react-csv";
import { deleteNullProperties } from '../utils/helper';
import makeAnimated from "react-select/animated";
import CustomExportDateComponent from './CustomExportDateComponent';
import { PRODUCTSLIST_URL, WAREHOUSES_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const translationMap = {
  actionId: "Գործողության ID",
  productName: "Ապրանքի Անուն",
  actionDate: "Գործողության Ամսաթիվ",
  actionType: "Գործողության Տեսակ",
  quantity: "Քանակ",
  unit: "Միավոր",
  balance: "Հաշվեկշիռ",
  warehouse: "Պահեստ",
  driver: "Վարորդ",
  price: "Գին",
  sellingPrice: "Վաճառքի Գին",
  createdAt: "Ստեղծման Ամսաթիվ",
  generationDate: "Գեներացման Ամսաթիվ",
  updatedAt: "Թարմացման Ամսաթիվ",
};
function ExportData({ handleToggleExportModal, toggleExport, section}) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [active, setActive] = useState(true);
  const [dateChanged, setDateChaged] = useState(false);
  const [exportData, setExportData] = useState('');
  const [exportType, setExportType] = useState('');
  const [productsList, setProductsList] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const animatedComponents = makeAnimated();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsListsResp = await axiosPrivate.get(PRODUCTSLIST_URL);
        setProductsList(productsListsResp?.data?.jsonString);

        const warehousesResp = await axiosPrivate.get(WAREHOUSES_URL);
        setWarehouses(warehousesResp?.data?.jsonString);

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
  useEffect(()=>{
    setTimeout(() => {      
      axiosPrivate.get(PRODUCTSLIST_URL).then((resp)=>{
        console.log(resp?.data?.jsonString)
        setProductsList(resp?.data?.jsonString)
     }).catch((err)=>{
       console.log(err)
     })
    }, 2000);
 },[])
  const handleDateChanged = () => {
    setDateChaged(true)
  }

  const onExportTypeSelect = (data) => {
    setExportType( data)
  };
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

  const methods = useForm({
    mode: "onChange",
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log(data)
    const newReportDates = {
      startDate: data?.dates.startDate ? moment(data?.dates.startDate).format('YYYY-MM-DD') : null,
      endDate: data?.dates.endDate ? moment(data?.dates.endDate).format('YYYY-MM-DD')+' 23:59:59'  : null,
      currentProduct:(exportType==='currentProduct' && data?.currentProduct) ? data?.currentProduct?.id: null,
      warehouse: (exportType==='warehouse' && data?.warehouse) ? data?.warehouse?.id: null,
      type:(section==='productsMovements' && exportType==='productsMovements')
      ?'all'
      :(section==='productsMovements' && exportType==='currentProduct')
      ?'currentProduct'
      :(section==='productsMovements' && exportType==='warehouse')
      ?'warehouse'
      :null
    }
    const updatedFields = deleteNullProperties(newReportDates);
    console.log(updatedFields)

    try {
      setIsLoading(true);
      console.log(section)
      const response = await axiosPrivate.post(`/reportExport${section === 'productsMovements'
        ? `/${section}`
        :''}`, updatedFields)
      setExportData(response?.data?.jsonString);
      setIsLoading(false);
      setActive(false);
      setIsDone(true)
      setTimeout(() => {
        setIsDone(false)

      }, 5000)

    } catch (err) {
      if (!err?.response) {
        setIsLoading(false)
        setErrMsg("No Server Response");
      } else {
        setIsLoading(false)
        setErrMsg(" Failed");
      }
    }
  });
  const findResearches = (statusBoard) => {
    return statusBoard?.flatMap(elem => elem.researches.map(research => research?.name));
  }

  const handleExportDiagnostics = (exportName, exportData) => {
    if (section === 'productsMovements' && exportType === 'productsMovements') {
      console.log(exportData)
      const formatedData = exportData.map((el) => {

        console.log(el)
        return {
          ...el,
         // researchList: findResearches(el.statusBoard)
        }
      })
      console.log(formatedData)
      exportData = formatedData.map(item => ({
        ...item,
        actionId: item.actionId,
        productName: item.productName,
        actionDate: item.actionDate,
        actionType: item.actionType === "outgoing" ? 'Ելք' : item.actionType === "incoming" ? 'Մուտք' : '',
        quantity: item.quantity,
        unit: item.unit,
        balance: item.balance,
        driver: item.driver,
        price: item.price,
        sellingPrice: item?.sellingPrice?item?.sellingPrice:'',
        createdAt: moment(item.createdAt).format('DD-MM-YYYY HH:mm'),
        generationDate: moment(item.generationDate).format('DD-MM-YYYY HH:mm'),
        updatedAt: moment(item.updatedAt).format('DD-MM-YYYY HH:mm'),
      }));
      //   exportData = formatedData.map((item, index) => {
      //     // Create a new object with the formatted fields
      //     const formattedItem = {
      //         ...item,
      //         createdAt: moment(item.createdAt).format('DD-MM-YYYY HH:mm'),
      //         generationDate: moment(item.generationDate).format('DD-MM-YYYY HH:mm'),
      //         updatedAt: moment(item.updatedAt).format('DD-MM-YYYY HH:mm'),
      //         clientDob: moment(item.clientDob).format('DD-MM-YYYY'),
      //         clientGender: item.clientGender === "Male" ? 'Արական' : item.clientGender === "Female" ? 'Իգական' : '',
      //         diagStatus: item.diagStatus === "Active" ? 'Ակտիվ' : item.diagStatus === "Cancelled" ? 'Չեղարկված' : '',
      //         class: item.class === "Internal" ? 'Ներքին' : item.class === "External" ? 'Արտաքին' : '',
      //         internalStatus: item?.internalStatus === "Approval" ? 'Ընդունված' :
      //                         item?.internalStatus === "Delayed" ? "Հետաձգված" :
      //                         item?.internalStatus === "Generated" ? "Ստեղծված" :
      //                         item?.internalStatus === "Other" ? "Այլ" : null,
      //         externalStatus: item?.externalStatus === "Approval" ? 'Ընդունված' :
      //                         item?.externalStatus === "Delayed" ? "Հետաձգված" :
      //                         item?.externalStatus === "Generated" ? "Ստեղծված" :
      //                         item?.externalStatus === "Other" ? "Այլ" : null,
      //         clientType: item.clientType === "patient" ? 'Այցելու' : item.clientType === "organization" ? 'Պատվիրատու' : '',
      //         paymentDate: item?.paymentDate ? moment(item?.paymentDate).format('DD-MM-YYYY HH:mm') : null,
      //         diagnosisDate: item?.diagnosisDate ? moment(item?.diagnosisDate).format('DD-MM-YYYY HH:mm') : null
      //     };

      //     // Add additional properties if researchList length is more than one
      //     if (item.researchList && item.researchList.length > 1) {
      //         item.researchList.forEach((el, idx) => {
      //             formattedItem[`researchList${idx}`] = el;
      //         });
      //     } else {
      //         formattedItem.researchList = item.researchList[0];
      //     }

      //     // Sort keys
      //     const sortedKeys = Object.keys(formattedItem).sort();
      //     const sortedItem = {};
      //     sortedKeys.forEach(key => {
      //         sortedItem[key] = formattedItem[key];
      //     });

      //     return sortedItem;
      // });

    } else if (section === 'productsMovements' && exportType === 'currentProduct') {
      console.log(exportData)
      exportData = exportData.map(item => ({
        // incomingProductId: el.incomingProductId,
        // name: el.name,
        // quantity: el.quantity,
        // weight: el.dimensions?.weight || el.dimensions?.volume,
        // unit: el.dimensions?.weight?'ԿԳ':'ԼԻՏՐ',
        // balance: el.balance,
        // price: el.price,
        // expirationDate: el.expirationDate,
        // productCategoryName: el.productCategoryName,
        // driverName: el.driverName,
        // warehouseName: el.warehouseName,
        // createdAt: moment(el.createdAt).format('DD-MM-YYYY HH:mm'),
        // updatedAt: moment(el.updatedAt).format('DD-MM-YYYY HH:mm'),
        actionId: item.actionId,
        productName: item.productName,
        actionDate: item.actionDate,
        actionType: item.actionType === "outgoing" ? 'Ելք' : item.actionType === "incoming" ? 'Մուտք' : '',
        quantity: item.quantity,
        unit: item.unit,
        balance: item.balance,
        driver: item.driver,
        price: item.price,
        sellingPrice: item?.sellingPrice?item?.sellingPrice:'',
        createdAt: moment(item.createdAt).format('DD-MM-YYYY HH:mm'),
        generationDate: moment(item.generationDate).format('DD-MM-YYYY HH:mm'),
        updatedAt: moment(item.updatedAt).format('DD-MM-YYYY HH:mm'),
        
      }));
    } else if (section === 'productsMovements' && exportType === 'warehouse') {
      exportData = exportData.map(item => ({
        actionId: item.actionId,
        productName: item.productName,
        actionDate: item.actionDate,
        actionType: item.actionType === "outgoing" ? 'Ելք' : item.clientGender === "incoming" ? 'Մուտք' : '',
        quantity: item.quantity,
        unit: item.unit,
        balance: item.balance,
        driver: item.driver,
        price: item.price,
        sellingPrice: item?.sellingPrice?item?.sellingPrice:'',
        createdAt: moment(item.createdAt).format('DD-MM-YYYY HH:mm'),
        generationDate: moment(item.generationDate).format('DD-MM-YYYY HH:mm'),
        updatedAt: moment(item.updatedAt).format('DD-MM-YYYY HH:mm'),
      }));
    }else if(section === 'productsSummary'){
      exportData = exportData?.map(el => ({      
          ...el,
          createdAt:moment(el?.createdAt).format('DD-MM-YYYY HH:mm'),
          updatedAt:moment(el?.updatedAt).format('DD-MM-YYYY HH:mm'),          
      }))}else{
      return
    }
    const formattedData = exportData.map(item => {
      let translatedItem = {};
      Object.keys(item).forEach(key => {
        translatedItem[translationMap[key] || key] = item[key]; // Use translated key or default to original
      });
      return translatedItem;
    });
    const workBook = utils.book_new()
    const workSheet = utils.json_to_sheet(formattedData)
    console.log(workSheet)
    utils.book_append_sheet(workBook, workSheet, exportName)
    writeFile(workBook, `${section} ${moment(new Date()).format('DD-MM-YYYY')}.xlsx`)
    handleToggleExportModal(false)
  }

  return (
    <Modal
      show={toggleExport}
      size="xs"
      onHide={() => handleToggleExportModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Ներբեռնել տվյալներ
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
                    {section !== 'productsSummary' ?
                      <>
                        <div className="card" style={{ minHeight: '300px' }}>
                          <div className="card-header">
                            <a href="#">Նշեք տվյալները</a>
                          </div>
                          <div className="card-body">
                            <div className="modal-body ">
                              <div className="row gx-3">
                                <div className="col-sm-12">
                                  <div className="form-group">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="dates"
                                      >
                                        {/* Ընտրել */}
                                      </label>
                                      {methods.formState.errors.dates && (
                                        <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg" /></span> պարտադիր</span>
                                      )}
                                    </div>
                                    <div className='d-flex justify-content-center align-items-center'>
                                      <CustomExportDateComponent name="dates" handleDateChanged={handleDateChanged} control={methods.control} maxDate={moment(new Date()).format('MM-DD-YYYY')} />
                                    </div>
                                  </div>
                                </div>
                                {section === 'productsMovements' &&

                                  <div className="row gx-3 mb-2">
                                    <div className="col-sm-12">
                                      <div className=" me-2">
                                      <label
                                  className="form-check-label mb-2"
                                  htmlFor="gender"
                                >
                                  Տվյալների տեսակը
                                </label>
                                        {methods.formState.errors.exportType && (
                                          <span className="error text-red">
                                            <span>
                                              <img src={ErrorSvg} alt="errorSvg" />
                                            </span>{" "}
                                            պարտադիր
                                          </span>
                                        )}
                                      </div>
                                      <div className="d-flex" >
                                        <div className="form-check form-check-inline ">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            id="productsMovements"
                                            value="productsMovements"  // Set value to "productsMovements"
                                            onClick={()=>onExportTypeSelect("productsMovements")}  // Use the event directly
                                            {...methods.register("exportType", {
                                              required: true,
                                            })}
                                          />
                                          <label className="form-check-label" htmlFor="currentProduct">
                                            Ընդհանուր 
                                          </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            id="currentProduct"
                                            value="currentProduct"  // Set value to "currentProduct"
                                            onClick={()=>onExportTypeSelect("currentProduct")}  // Use the event directly
                                            {...methods.register("exportType", {
                                              required: true,
                                            })}
                                          />
                                          <label className="form-check-label" htmlFor="currentProduct">
                                            Ապրանք
                                          </label>
                                        </div>
                                        {/* <div className="form-check form-check-inline">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            id="warehouse"
                                            value="warehouse" 
                                            onClick={()=>onExportTypeSelect("warehouse")} 
                                            {...methods.register("exportType", {
                                              required: true,
                                            })}
                                          />
                                          <label className="form-check-label" htmlFor="warehouse">
                                            Պահեստ
                                          </label>
                                        </div> */}
                                      </div>
                                    </div>
                                  </div>
                                }
                                {exportType==='currentProduct' ?
                                  <>
                                    <div className="col-sm-12">
                                      <div className="d-flex justify-content-between me-2">
                                        <label
                                          className="form-label"
                                          htmlFor="currentProduct"
                                          placeholder={"Ընտրել"}
                                        >
                                          Ընտրել Ապրանքը
                                        </label>
                                        {methods.formState.errors.currentProduct && (
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
                                          name="currentProduct"
                                          control={methods.control}
                                          isClearable={true}
                                          defaultValue={null}
                                          rules={{ required: true }}
                                          render={({ field }) => (
                                            <Select
                                              {...field}

                                              //isMulti
                                              closeMenuOnSelect={true}
                                              components={animatedComponents}
                                              styles={colourStyles}
                                              // onChange={(val) => {
                                              //   field.onChange(val.id);
                                              // }}
                                              // value={refDoctors?.find(
                                              //   (option) => option.value === refDoctor
                                              // )}
                                              options={
                                                productsList.map((item) => ({
                                                  value: item.name,
                                                  label: item.name,
                                                  id: item.productListId,
                                                }))
                                              }
                                              placeholder={"Ընտրել"}
                                            />
                                          )}
                                        />
                                      </div>
                                    </div>

                                  </>
                                  :exportType==='warehouse'
                                  ?  <>
                                  <div className="col-sm-12">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="currentProduct"
                                        placeholder={"Ընտրել"}
                                      >
                                        Ընտրել Պահեստ
                                      </label>
                                      {methods.formState.errors.warehouses && (
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
                                        isClearable={true}
                                        defaultValue={null}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                          <Select
                                            {...field}
                                            closeMenuOnSelect={true}
                                            components={animatedComponents}
                                            styles={colourStyles}
                                            // onChange={(val) => {
                                            //   field.onChange(val.id);
                                            // }}
                                            // value={refDoctors?.find(
                                            //   (option) => option.value === refDoctor
                                            // )}
                                            options={
                                              warehouses.map((item) => ({
                                                value: item.name,
                                                label: item.name,
                                                id: item.warehouseId,
                                              }))
                                            }
                                            placeholder={"Ընտրել"}
                                          />
                                        )}
                                      />
                                    </div>
                                  </div>

                                </>:<></>

                                }
                              </div>
                              <div className='d-flex justify-content-center align-items-center'>

                                {isLoading && <LoadingSpinner />}
                                {isDone 
                                ?<FeatherIcon icon='check' color='rgb(78, 175, 203)' size={58} />

                                :<>
                                <div className='mt-2'>
                                <p style={{color:'red'}}>{errMsg}</p>
                                </div>
                                </>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="separator-full"></div>

                        <div className="modal-footer align-items-center">
                          <button
                            type="button"
                            className={`btn btn-primary ${!dateChanged ? 'disabled' : ''}`}
                            style={{ backgroundColor: "#4eafcb", border: 'none' }}
                            onClick={onSubmit}
                          >
                            Ստեղծել
                          </button>
                          <button
                            type="button"
                            onClick={() => handleExportDiagnostics(section, exportData)}
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            disabled={active}
                          >
                            XLSX
                          </button>
                          <CSVLink
                            data={exportData}
                            filename={"my-file.csv"}
                            className={`btn btn-primary ${active ? 'disabled' : ''}`}

                            target="_blank"
                          >
                            CSV
                          </CSVLink>
                        </div>
                      </>
                      : <div className="d-flex justify-content-sm-between  align-items-center">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          style={{ backgroundColor: "#4eafcb", border: 'none' }}
                          onClick={onSubmit}
                        >
                          Ստեղծել
                        </button>
                        <button
                          type="button"
                          onClick={() => handleExportDiagnostics(section, exportData)}
                          className={`btn btn-primary ${active ? 'disabled' : ''}`}
                          data-bs-dismiss="modal"
                        >
                          XLSX
                        </button>
                        <CSVLink
                          data={exportData}
                          filename={"my-file.csv"}
                          className={`btn btn-primary ${active ? 'disabled' : ''}`}

                          target="_blank"
                        >
                          CSV
                        </CSVLink>
                      </div>
                    }
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

export default ExportData