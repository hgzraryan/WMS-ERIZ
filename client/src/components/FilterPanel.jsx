import React, { useEffect, useState } from 'react'
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { Button } from 'react-bootstrap';
import { Input } from './Input';
import { Controller, FormProvider, useForm } from "react-hook-form";
import Select, { components } from "react-select";
import { useLocation, useNavigate } from 'react-router-dom';

import { MANUFACTURERS_URL, PARTNERS_URL, PRODUCTSLIST_URL, WAREHOUSES_URL, WORKERS_URL } from '../utils/constants';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import moment from 'moment';
import CustomDateFilterComponent from './CustomDateFilterComponent';

const actionTypes = [
    {
        label: "Մուտք",
        value: "incoming",
    },
    {
        label: "Ելք",
        value: "outgoing",
    },

];
const CustomOption = (props) => {
    const { data, isSelected, innerRef, innerProps } = props;
    return (
        <div ref={innerRef} {...innerProps} style={{ display: "flex", alignItems: "center", padding: "5px" }}>
            <input type="checkbox" checked={isSelected} readOnly style={{ marginRight: "10px" }} />
            {data.label}
        </div>
    );
};

export const customStyles = {
    control: (base, state) => ({
        ...base,
        minHeight: "24px",
        height: "24px",
        fontSize: "12px",
        padding: "0px 6px",
        borderColor: state.isFocused ? "#018a54" : "#e6e6e6",
        boxShadow: "none",
        display: "flex",
        alignItems: "center", 
        "&:hover": {
            borderColor: "#018a54",
        },
    }),
    menu: (base) => ({
        ...base,
        fontSize: "12px", // Reduce font size in dropdown
        padding: "4px 0", // Reduce padding
        width: "auto", // Adjust width if needed
    }),
    menuList: (base) => ({
        ...base,
        padding: "0px", // Remove extra spacing
        maxHeight: "150px", // Limit dropdown height (scrollable)
        width: '250px'
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => ({
        ...styles,
        fontSize: "12px",
        padding: "4px 8px", // Adjust option padding
        backgroundColor: isDisabled
            ? undefined
            : isSelected
                ? "#018a54"
                : isFocused
                    ? "rgba(1, 138, 84, .1)"
                    : undefined,
        color: isDisabled ? "#e6e6e6" : isSelected ? "white" : "black",
        cursor: isDisabled ? "not-allowed" : "pointer",
   
    }),
    valueContainer: (base) => ({
        ...base,
       // padding: "0px 6px",
        display: "flex",
        alignItems: "center",
        minHeight: "24px",
        marginTop:'-3px'
    }),
    input: (base) => ({
        ...base,
        margin: "0px",
        padding: "0px",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
    }),
    placeholder: (base) => ({
        ...base,
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
    }),
    // multiValue: (base) => ({
    //     ...base,
    //     minHeight: "20px",
    //     fontSize: "12px",
    //     display: "flex",
    //     alignItems: "center",
    //     height: '10px',
    //     borderRadius:'20px',
    //     backgroundColor: '#018a54',
    //     color:'#fff'
    // }),
    multiValue: (base) => ({
        ...base,
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        height: "20px",
        borderRadius: "20px",
        backgroundColor: "#018a54",
        color: "#fff",
        padding: "0 4px",
        margin: "2px",
    }),
    multiValueLabel: (base) => ({
        ...base,
        fontSize: "10px",
        padding: "0 4px",
        display: "flex",
        alignItems: "center",
        lineHeight: "1",
        color: "#fff",
    }),
    multiValueRemove: (base) => ({
        ...base,
         padding: "0 4px",
    display: "flex",
    alignItems: "center",
    ":hover": {
        backgroundColor: "#018a54",
        color: "#fff",
    },
    }),
    indicatorsContainer: (base) => ({
        ...base,
        display: "flex",
        alignItems: "center", // Center close button & dropdown arrow
        height: "100%",
    }),
    indicatorSeparator: (base) => ({
        ...base,
        display: "none", // Remove separator if unwanted
    }),
    dropdownIndicator: (base) => ({
        ...base,
        padding: "2px", // Adjust padding to align with text
        display: "flex",
        alignItems: "center",
    }),
    clearIndicator: (base) => ({
        ...base,
        padding: "2px",
        display: "flex",
        alignItems: "center",
    }),
};


const FilterPanel = ({ setFilter }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();

    const [partners, setPartners] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [wareHouses, setWareHouses] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [partnersList, setPartnersList] = useState([])
    const [manufacturers, setManufacturers] = useState([])

    // Initialize form using FormProvider
    const methods = useForm({
        defaultValues: {
            barcode: null,
            name: null,
            partner: null,
            dateRange: {
                startDate: null,
                endDate: null
            },
            stock: null,
            actionDate: null,
            price: null,
            driver: null,
            actionId: null,
            actionType: null,
            manufacturer: null,
            product: null,

        },
    });

    const { control, handleSubmit, reset } = methods;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const wareHousesReps = await axiosPrivate.get(WAREHOUSES_URL);
                setWareHouses(wareHousesReps?.data?.jsonString);

                const partnersResp = await axiosPrivate.get(PARTNERS_URL);
                setPartners(partnersResp?.data?.jsonString || []);

                const driversList = await axiosPrivate.get(WORKERS_URL);
                setWorkers(driversList?.data?.jsonString || []);

                const productsList = await axiosPrivate.get(PRODUCTSLIST_URL);
                setProductsList(productsList?.data?.jsonString);

                const partnersList = await axiosPrivate.get(PARTNERS_URL);
                setPartnersList(partnersList?.data?.jsonString);

                const manufacturersList = await axiosPrivate.get(MANUFACTURERS_URL);
                setManufacturers(manufacturersList?.data?.jsonString);

                const workersList = await axiosPrivate.get(WORKERS_URL);
                setWorkers(workersList?.data?.jsonString);

            } catch (err) {
                console.error(err);
                navigate("/login", { state: { from: location }, replace: true });
            }
        };

        fetchData();
    }, [navigate]);

    const onSubmit = (data) => {
        if (!!data.actionType) {
            data.actionType = data.actionType.map((el) => el = el.value)
        }
        if (!!data.stock) {
            data.stock = data.stock.map((el) => el = el.value)
            //data.product = data.product?.value+''
        }
        if (!!data.product) {
            data.product = data.product.map((el) => el = el.value)
            //data.product = data.product?.value+''
        }
        if (!!data.partner) {
            data.partner = data.partner.map((el) => el = el.value)
            //data.product = data.product?.value+''
        }
        if (!!data.dateRange.startDate && !!data.dateRange.endDate) {
            data.dateRange.startDate = moment(data.dateRange.startDate).format('YYYY-MM-DD 00:00')
            data.dateRange.endDate = moment(data.dateRange.endDate).format('YYYY-MM-DD 23:59')
            //data.product = data.product?.value+''
        }

        console.log(data)
        setFilter(data);
    };
    const resetFilters = () => {
        reset(); // Reset the form UI
      
        const clearedFilters = {
          barcode: null,
          name: null,
          partner: null,
          dateRange: {
            startDate: null,
            endDate: null,
          },
          stock: null,
          actionDate: null,
          price: null,
          driver: null,
          actionId: null,
          actionType: null,
          manufacturer: null,
          product: null,
        };
      
        // Call your backend API or filter handler
        onSubmit(clearedFilters); // <- this should fetch data again with defaults
      };
    return (
        <div
            className="filter-panel"
            style={{
                display: "flex",
                backgroundColor: "rgba(0, 125, 136, 0.15)",
                color: "#000",
                padding: "0 20px",
                borderRadius: "10px",
                gap: "10px",
            }}
        >
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', width: '100%' }}>
                    <div className='flex-center me-2'>
                        <div className="d-flex gap-2" style={{ height: '30px' }}>
                            <Button size="sm" type="submit">
                                Փնտրել
                            </Button>
                            <Button size="sm" type="button" onClick={resetFilters}>
                                Ջնջել
                            </Button>
                            {/* <FeatherIcon icon="settings" /> */}
                        </div>
                    </div>

                    <div className="filter-body" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                        <div className='modal-body d-flex flex-column'>
                            <div className="row gx-3 mb-3" >
                                <div className="col-sm-3" >
                                    <div className='d-flex flex-column'>
                                        <div className="d-flex justify-content-between">
                                            <label
                                                className="form-lsabel"
                                                htmlFor="actionType"
                                            >
                                                Գործողության տեսակը
                                            </label>
                                        </div>
                                        <div className="actionType" style={{ height: '15px' }}>
                                            <Controller
                                                name="actionType"
                                                control={methods.control}
                                                defaultValue={null}
                                                rules={{ required: false }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={actionTypes}
                                                        placeholder="Ընտրել"
                                                        styles={customStyles}
                                                        isMulti={true} // Enable multi-select
                                                        closeMenuOnSelect={false} // Keep menu open for multiple selection
                                                        hideSelectedOptions={false}
                                                        components={{ Option: CustomOption }}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className='d-flex flex-column'>

                                        <div className=" d-flex justify-content-between me-2">
                                            <label
                                                className="form-lab7el"
                                                htmlFor="stock"
                                            >
                                                Պահեստ
                                            </label>
                                        </div>
                                        <div className="stock" style={{ height: '15px' }}>
                                            <Controller
                                                name="stock"
                                                control={methods.control}
                                                defaultValue={null}
                                                rules={{ required: false }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
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
                                                        placeholder="Ընտրել"
                                                        styles={customStyles}
                                                        isMulti={true} // Enable multi-select
                                                        closeMenuOnSelect={false} // Keep menu open for multiple selection
                                                        hideSelectedOptions={false}
                                                        components={{ Option: CustomOption }}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                <div className="d-flex justify-content-between me-2">
                                        <label
                                            className="formLabel"
                                            htmlFor="partner"
                                        >
                                            Գործողության ժամանակահատված
                                        </label>

                                    </div>
                                <CustomDateFilterComponent
              name="dateRange" 
              control={methods.control} 
              required={false}
              maxDate={moment(new Date()).format('MM-DD-YYYY')} 
              />
                                    {/* <div className='d-flex flex-column'>

                                        <div className=" d-flex justify-content-between me-2">
                                            <label
                                                className="form-lab7el"
                                                htmlFor="stock"
                                            >
                                                Պահեստ
                                            </label>
                                        </div>
                                        <div className="stock" style={{ height: '15px' }}>
                                            <Controller
                                                name="stock"
                                                control={methods.control}
                                                defaultValue={null}
                                                rules={{ required: false }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
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
                                                        placeholder="Ընտրել"
                                                        styles={customStyles}
                                                        //isMulti={true} // Enable multi-select
                                                        //closeMenuOnSelect={false} // Keep menu open for multiple selection
                                                        //hideSelectedOptions={false}
                                                        components={{ Option: CustomOption }}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className="row gx-3 mb-2">
                                <div className="col-sm-3 ">
                                <div className='d-flex flex-column'>
                                    <div className="d-flex justify-content-between ">
                                        <label
                                            className="formLabel"
                                            htmlFor="product"
                                        >
                                            Անվանում
                                        </label>

                                    </div>
                                    <div className="product" >

                                            <Controller
                                                name="product"
                                                control={methods.control}
                                                defaultValue={null}
                                                rules={{ required: false }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        options={productsList?.map((item) => ({
                                                            value: item.productListId,
                                                            label: item.name,
                                                        }))}
                                                        placeholder={"Ընտրել"}
                                                        components={{ Option: CustomOption }}
                                                        styles={customStyles}
                                                        isMulti={true} // Enable multi-select
                                                        closeMenuOnSelect={false} // Keep menu open for multiple selection
                                                    //hideSelectedOptions={false}
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
                                <div className="col-sm-3 ">
                                <div className='d-flex flex-column'>
                                    <div className="d-flex justify-content-between me-2">
                                        <label
                                            className="formLabel"
                                            htmlFor="partner"
                                        >
                                            Գործընկեր
                                        </label>

                                    </div>
                                    <div className=" d-flex justify-content-between">
                                        <div className="flex-grow-1 me-1">

                                            <Controller
                                                name="partner"
                                                control={methods.control}
                                                defaultValue={null}
                                                rules={{ required: false }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        options={partners?.map((item) => ({
                                                            value: item.partnerId,
                                                            label: item.name,
                                                        }))}
                                                        placeholder={"Ընտրել"}
                                                        components={{ Option: CustomOption }}
                                                        styles={customStyles}
                                                        isMulti={true} // Enable multi-select
                                                        closeMenuOnSelect={false} // Keep menu open for multiple selection
                                                    //hideSelectedOptions={false}
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
                                </div>
                                {/* <div className="col-sm-3 ">
                                <div className='d-flex flex-column'>
                                    <div className="d-flex justify-content-between me-2">
                                        <label
                                            className="formLabel"
                                            htmlFor="partner"
                                        >
                                            Գործընկեր
                                        </label>

                                    </div>
                                    <div className=" d-flex justify-content-between">
                                        <div className="flex-grow-1 me-1">

                                            <Controller
                                                name="partner"
                                                control={methods.control}
                                                defaultValue={null}
                                                rules={{ required: false }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        options={partners?.map((item) => ({
                                                            value: item.partnerId,
                                                            label: item.name,
                                                        }))}
                                                        placeholder={"Ընտրել"}
                                                        components={{ Option: CustomOption }}
                                                        styles={customStyles}
                                                        isMulti={true} // Enable multi-select
                                                        closeMenuOnSelect={false} // Keep menu open for multiple selection
                                                    //hideSelectedOptions={false}
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
                                </div> */}
                            </div>

                        </div>
                       

                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default FilterPanel;
