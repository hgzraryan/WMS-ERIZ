import React, { useEffect, useState } from 'react'
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { Button } from 'react-bootstrap';
import { Input } from './Input';
import { Controller, FormProvider, useForm } from "react-hook-form";
import Select, { components } from "react-select";
import { color } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { PARTNERS_URL, WORKERS_URL } from '../utils/constants';
const currencies = [
    {
        label: "ՀՀ դրամ",
        value: "AMD",
    },
    {
        label: "Ռուսական ռուբլի",
        value: "RUB",
    },
    {
        label: "ԱՄՆ դոլլար",
        value: "USD",
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
// export const customStyles = {
//     control: (base, state) => ({
//         ...base,
//         minHeight: "15px",
//         fontSize: "12px",
//         borderColor: state.isFocused ? "#018a54" : "#e6e6e6",
//         boxShadow: "none",
//         "&:hover": {
//             borderColor: "#018a54",
//         },
//     }),
//     option: (styles, { isDisabled, isFocused, isSelected }) => ({
//         ...styles,
//         fontSize: "10px",
//         height: '14px',
//         backgroundColor: isDisabled
//             ? undefined
//             : isSelected
//                 ? "#018a54"
//                 : isFocused
//                     ? "rgba(1, 138, 84, .1)"
//                     : undefined,
//         color: isDisabled ? "#e6e6e6" : isSelected ? "white" : "black",
//         cursor: isDisabled ? "not-allowed" : "default",
//         ":active": {
//             ...styles[":active"],
//             backgroundColor: !isDisabled
//                 ? isSelected
//                     ? "#018a54"
//                     : "#fff"
//                 : undefined,
//         },
//     }),
//     multiValueLabel: (styles) => ({
//         ...styles,
//         backgroundColor: "#018a54",
//         color: "#fff",
//         fontSize: "12px",
//         padding: "0px",
//     }),

//     multiValueRemove: (styles) => ({
//         ...styles,
//         backgroundColor: "#018a54",
//         color: "#e8e3e3",
//         ":hover": {
//             backgroundColor: "#018a54",
//             color: "#eb3434",
//         },
//     }),
// };

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
        alignItems: "center", // Ensure everything inside is vertically centered
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
        padding: "0px 6px",
        display: "flex",
        alignItems: "center",
        minHeight: "24px",
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
    multiValue: (base) => ({
        ...base,
        minHeight: "20px",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        height: '10px',
        backgroundColor: '#018a54'
    }),
    multiValueLabel: (base) => ({
        ...base,
        fontSize: "10px",
        padding: "0px 0px",
        display: "flex",
        alignItems: "center",
    }),
    multiValueRemove: (base) => ({
        ...base,
        fontSize: "12px",
        padding: "2px 6px",
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
            warehouse: null,
            actionDate: null,
            price: null,
            driver: null,
            actionId: null,
            manufacturer: null,

        },
    });

    const { control, handleSubmit, reset } = methods;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const partnersResp = await axiosPrivate.get(PARTNERS_URL);
                setPartners(partnersResp?.data?.jsonString || []);

                const driversList = await axiosPrivate.get(WORKERS_URL);
                setWorkers(driversList?.data?.jsonString || []);
            } catch (err) {
                console.error(err);
                navigate("/login", { state: { from: location }, replace: true });
            }
        };

        fetchData();
    }, [navigate]);

    const onSubmit = (data) => {
        setFilter(data);
    };

    return (
        <div
            className="filter-panel"
            style={{
                display: "flex",
                backgroundColor: "rgba(0, 125, 136, 0.15)",
                color: "#000",
                padding: "20px",
                borderRadius: "10px",
                gap: "10px",
            }}
        >
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', width:'100%' }}>
                    <div className='flex-center me-2'>
                        <div className="d-flex gap-2" style={{ height: '30px' }}>
                            <Button size="sm" type="submit">
                                Find
                            </Button>
                            <Button size="sm" type="button" onClick={() => reset()}>
                                Clear
                            </Button>
                            <FeatherIcon icon="settings" />
                        </div>
                    </div>

                    <div className="filter-body" style={{display:'flex', justifyContent:'space-evenly', width:'100%'}}>
                        <div >                            
                            <div className="row gx-3 mb-2">
                            <div className="col-sm-12">
                                <div className='d-flex flex-column'>

                                            <div className="d-flex justify-content-between me-2">
                                                <label
                                                    className="form-lsabel"
                                                    htmlFor="partner"
                                                >
                                                    test
                                                </label>
                                            </div>
                                            <div className="partner" style={{ height: '15px' }}>
                                                <Controller
                                                    name="partner"
                                                    control={methods.control}
                                                    defaultValue={null}
                                                    rules={{ required: false }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}

                                                            options={partners.map((partner) => ({
                                                                value: partner.partnerId,
                                                                label: `${partner.partnerId}․  ${partner.name}`,
                                                              }))}
                                      
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

                            </div>
                            <div className="row gx-3 mb-2">
                            <div className="col-sm-12">
                                <div className='d-flex flex-column'>

                                            <div className="d-flex justify-content-between me-2">
                                                <label
                                                    className="form-lsabel"
                                                    htmlFor="status"
                                                >
                                                    test
                                                </label>
                                            </div>
                                            <div className="fo" style={{ height: '15px' }}>
                                                <Controller
                                                    name="status"
                                                    control={methods.control}
                                                    defaultValue={null}
                                                    rules={{ required: false }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}

                                                            options={currencies}
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

                            </div>
                            <div className="row gx-3">
                            <div className="col-sm-12">
                                <div className='d-flex flex-column'>

                                            <div className="d-flex justify-content-between me-2">
                                                <label
                                                    className="form-lsabel"
                                                    htmlFor="status"
                                                >
                                                    test
                                                </label>
                                            </div>
                                            <div className="fo" style={{ height: '15px' }}>
                                                <Controller
                                                    name="status"
                                                    control={methods.control}
                                                    defaultValue={null}
                                                    rules={{ required: false }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}

                                                            options={currencies}
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

                            </div>
                        </div>
                        <div >                            
                            <div className="row gx-3 mb-2">
                            <div className="col-sm-12">
                                <div className='d-flex flex-column'>

                                            <div className="d-flex justify-content-between me-2">
                                                <label
                                                    className="form-lsabel"
                                                    htmlFor="status"
                                                >
                                                    test
                                                </label>
                                            </div>
                                            <div className="fo" style={{ height: '15px' }}>
                                                <Controller
                                                    name="status"
                                                    control={methods.control}
                                                    defaultValue={null}
                                                    rules={{ required: false }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}

                                                            options={currencies}
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

                            </div>
                            <div className="row gx-3 mb-2">
                            <div className="col-sm-12">
                                <div className='d-flex flex-column'>

                                            <div className="d-flex justify-content-between me-2">
                                                <label
                                                    className="form-lsabel"
                                                    htmlFor="status"
                                                >
                                                    test
                                                </label>
                                            </div>
                                            <div className="fo" style={{ height: '15px' }}>
                                                <Controller
                                                    name="status"
                                                    control={methods.control}
                                                    defaultValue={null}
                                                    rules={{ required: false }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}

                                                            options={currencies}
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

                            </div>
                            <div className="row gx-3">
                            <div className="col-sm-12">
                                <div className='d-flex flex-column'>

                                            <div className="d-flex justify-content-between me-2">
                                                <label
                                                    className="form-lsabel"
                                                    htmlFor="status"
                                                >
                                                    test
                                                </label>
                                            </div>
                                            <div className="fo" style={{ height: '15px' }}>
                                                <Controller
                                                    name="status"
                                                    control={methods.control}
                                                    defaultValue={null}
                                                    rules={{ required: false }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}

                                                            options={currencies}
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

                            </div>
                        </div>
                        <div >                            
                            <div className="row gx-3 mb-2">
                            <div className="col-sm-12">
                                <div className='d-flex flex-column'>

                                            <div className="d-flex justify-content-between me-2">
                                                <label
                                                    className="form-lsabel"
                                                    htmlFor="status"
                                                >
                                                    test
                                                </label>
                                            </div>
                                            <div className="fo" style={{ height: '15px' }}>
                                                <Controller
                                                    name="status"
                                                    control={methods.control}
                                                    defaultValue={null}
                                                    rules={{ required: false }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}

                                                            options={currencies}
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

                            </div>
                            <div className="row gx-3 mb-2">
                            <div className="col-sm-12">
                                <div className='d-flex flex-column'>

                                            <div className="d-flex justify-content-between me-2">
                                                <label
                                                    className="form-lsabel"
                                                    htmlFor="status"
                                                >
                                                    test
                                                </label>
                                            </div>
                                            <div className="fo" style={{ height: '15px' }}>
                                                <Controller
                                                    name="status"
                                                    control={methods.control}
                                                    defaultValue={null}
                                                    rules={{ required: false }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}

                                                            options={currencies}
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

                            </div>
                            <div className="row gx-3">
                            <div className="col-sm-12">
                                <div className='d-flex flex-column'>

                                            <div className="d-flex justify-content-between me-2">
                                                <label
                                                    className="form-lsabel"
                                                    htmlFor="status"
                                                >
                                                    test
                                                </label>
                                            </div>
                                            <div className="fo" style={{ height: '15px' }}>
                                                <Controller
                                                    name="status"
                                                    control={methods.control}
                                                    defaultValue={null}
                                                    rules={{ required: false }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}

                                                            options={currencies}
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

                            </div>
                        </div>

                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default FilterPanel;
