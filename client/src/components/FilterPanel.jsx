import React from 'react'
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { Button } from 'react-bootstrap';
import { Input } from './Input';
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import Select, { components } from "react-select";
import { color } from 'framer-motion';
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
        width:'250px'
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
        height:'10px',
        backgroundColor:'#018a54'
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



function FilterPanel() {

    const methods = useForm({
        mode: "onChange",
    });
    return (
        <div className="filter-panel"
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(0, 125, 136, 0.15)',
                color: '#000',
                padding: '20px',
                borderRadius: '10px',
                gap: '10px'
            }}>
            <div className='d-flex flex-column gap-2 ' style={{ flex: '1' }}>
                <div className='d-flex gap-2'>

                    <div>

                        <Button size='sm' >
                            Find
                        </Button>
                    </div>
                    <div>
                        <Button size='sm'> Clear</Button>
                    </div>
                    <div>
                        <FeatherIcon icon="settings" />
                    </div>
                </div>
                <div className='d-flex flex-column gap-2 '>

                    {/* <div>
                        <p style={{ fontSize: '12px' }}>label</p>
                        <input style={{ height: '20px' }} />
                    </div> */}
                    <div className="d-flex flex-column justify-content-between">
                        <div className="d-flex justify-content-between me-2">
                            <label
                                className="form-lsabel"
                                htmlFor="status"
                            >
                                
                            </label>
                            {/* {methods.formState.errors.status && (
                                <span className="error text-red">
                                  <span>
                                    //<img src={ErrorSvg} alt="errorSvg" />
                                  </span>{" "}
                                  պարտադիր
                                </span>
                              )} */}
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
                    {/* <div>
                        <p style={{ fontSize: '12px' }}>label</p>
                        <input style={{ height: '20px' }} />
                    </div> */}
                </div>
            </div>
            <div className='d-flex flex-column gap-2 ' style={{ flex: '1' }}>

                <div className='d-flex flex-column gap-4 '>

                    <div className=''>
                    <div className="">
                        <div className="d-flex justify-content-between me-2">
                            <label
                                className="form-lsabel"
                                htmlFor="status"
                            >
                                
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
                    <div>
                    <div className="">
                        <div className="d-flex justify-content-between me-2">
                            <label
                                className="form-lsabel"
                                htmlFor="status"
                            >
                                
                            </label>
                            {/* {methods.formState.errors.status && (
                                <span className="error text-red">
                                  <span>
                                    //<img src={ErrorSvg} alt="errorSvg" />
                                  </span>{" "}
                                  պարտադիր
                                </span>
                              )} */}
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
                    <div>
                    <div className="">
                        <div className="d-flex justify-content-between me-2">
                            <label
                                className="form-lsabel"
                                htmlFor="status"
                            >
                                
                            </label>
                            {/* {methods.formState.errors.status && (
                                <span className="error text-red">
                                  <span>
                                    //<img src={ErrorSvg} alt="errorSvg" />
                                  </span>{" "}
                                  պարտադիր
                                </span>
                              )} */}
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
            <div className='d-flex flex-column gap-2 ' style={{ flex: '1' }}>

            <div className='d-flex flex-column gap-4 '>

                    <div className=''>
                    <div className="">
                        <div className="d-flex justify-content-between me-2">
                            <label
                                className="form-lsabel"
                                htmlFor="status"
                            >
                                
                            </label>
                            {/* {methods.formState.errors.status && (
                                <span className="error text-red">
                                  <span>
                                    //<img src={ErrorSvg} alt="errorSvg" />
                                  </span>{" "}
                                  պարտադիր
                                </span>
                              )} */}
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
                    <div>
                    <div className="">
                        <div className="d-flex justify-content-between me-2">
                            <label
                                className="form-lsabel"
                                htmlFor="status"
                            >
                                
                            </label>
                            {/* {methods.formState.errors.status && (
                                <span className="error text-red">
                                  <span>
                                    //<img src={ErrorSvg} alt="errorSvg" />
                                  </span>{" "}
                                  պարտադիր
                                </span>
                              )} */}
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
                    <div>
                    <div className="">
                        <div className="d-flex justify-content-between me-2">
                            <label
                                className="form-lsabel"
                                htmlFor="status"
                            >
                                
                            </label>
                            {/* {methods.formState.errors.status && (
                                <span className="error text-red">
                                  <span>
                                    //<img src={ErrorSvg} alt="errorSvg" />
                                  </span>{" "}
                                  պարտադիր
                                </span>
                              )} */}
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
            <div className='d-flex flex-column gap-2 ' style={{ flex: '1' }}>

            <div className='d-flex flex-column gap-4 '>

                    <div className=''>
                    <div className="">
                        <div className="d-flex justify-content-between me-2">
                            <label
                                className="form-lsabel"
                                htmlFor="status"
                            >
                                
                            </label>
                            {/* {methods.formState.errors.status && (
                                <span className="error text-red">
                                  <span>
                                    //<img src={ErrorSvg} alt="errorSvg" />
                                  </span>{" "}
                                  պարտադիր
                                </span>
                              )} */}
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
                    <div>
                    <div className="">
                        <div className="d-flex justify-content-between me-2">
                            <label
                                className="form-lsabel"
                                htmlFor="status"
                            >
                                
                            </label>
                            {/* {methods.formState.errors.status && (
                                <span className="error text-red">
                                  <span>
                                    //<img src={ErrorSvg} alt="errorSvg" />
                                  </span>{" "}
                                  պարտադիր
                                </span>
                              )} */}
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
                    <div>
                    <div className="">
                        <div className="d-flex justify-content-between me-2">
                            <label
                                className="form-lsabel"
                                htmlFor="status"
                            >
                                
                            </label>
                            {/* {methods.formState.errors.status && (
                                <span className="error text-red">
                                  <span>
                                    //<img src={ErrorSvg} alt="errorSvg" />
                                  </span>{" "}
                                  պարտադիր
                                </span>
                              )} */}
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
            <div className='d-flex flex-column gap-2 ' style={{ flex: '1' }}>

            <div className='d-flex flex-column gap-4 '>

                    <div className=''>
                    <div className="">
                        <div className="d-flex justify-content-between me-2">
                            <label
                                className="form-lsabel"
                                htmlFor="status"
                            >
                                
                            </label>
                            {/* {methods.formState.errors.status && (
                                <span className="error text-red">
                                  <span>
                                    //<img src={ErrorSvg} alt="errorSvg" />
                                  </span>{" "}
                                  պարտադիր
                                </span>
                              )} */}
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
                    <div>
                    <div className="">
                        <div className="d-flex justify-content-between me-2">
                            <label
                                className="form-lsabel"
                                htmlFor="status"
                            >
                                
                            </label>
                            {/* {methods.formState.errors.status && (
                                <span className="error text-red">
                                  <span>
                                    //<img src={ErrorSvg} alt="errorSvg" />
                                  </span>{" "}
                                  պարտադիր
                                </span>
                              )} */}
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
                    <div>
                    <div className="">
                        <div className="d-flex justify-content-between me-2">
                            <label
                                className="form-lsabel"
                                htmlFor="status"
                            >
                                
                            </label>
                            {/* {methods.formState.errors.status && (
                                <span className="error text-red">
                                  <span>
                                    //<img src={ErrorSvg} alt="errorSvg" />
                                  </span>{" "}
                                  պարտադիր
                                </span>
                              )} */}
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
            <div className='d-flex flex-column gap-2 ' style={{ flex: '1' }}>

            <div className='d-flex flex-column gap-4 '>

                    <div className=''>
                    <div className="">
                        <div className="d-flex justify-content-between me-2">
                            <label
                                className="form-lsabel"
                                htmlFor="status"
                            >
                                
                            </label>
                            {/* {methods.formState.errors.status && (
                                <span className="error text-red">
                                  <span>
                                    //<img src={ErrorSvg} alt="errorSvg" />
                                  </span>{" "}
                                  պարտադիր
                                </span>
                              )} */}
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
                    <div>
                    <div className="">
                        <div className="d-flex justify-content-between me-2">
                            <label
                                className="form-lsabel"
                                htmlFor="status"
                            >
                                
                            </label>
                            {/* {methods.formState.errors.status && (
                                <span className="error text-red">
                                  <span>
                                    //<img src={ErrorSvg} alt="errorSvg" />
                                  </span>{" "}
                                  պարտադիր
                                </span>
                              )} */}
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
                    <div>
                    <div className="">
                        <div className="d-flex justify-content-between me-2">
                            <label
                                className="form-lsabel"
                                htmlFor="status"
                            >
                                
                            </label>
                            {/* {methods.formState.errors.status && (
                                <span className="error text-red">
                                  <span>
                                    //<img src={ErrorSvg} alt="errorSvg" />
                                  </span>{" "}
                                  պարտադիր
                                </span>
                              )} */}
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
    )
}

export default FilterPanel
