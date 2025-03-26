import React from 'react'
import { useController } from 'react-hook-form'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomDateTimeComponent({methods, control, name,required='true',defaultValue='' }) {
    const {
        field,
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields },
      } = useController({
        name,
        control,
        rules: { required: required },
        defaultValue:defaultValue,

      });
      const handleInputChange = (e) => {
        const inputValue = e.target.value;
       // const inputValue = moment(e.target.value).format('YYYY-MM-DD HH:mm');
        const dateTimeRegex = /^(3[01]|[12][0-9]|0[1-9])-(1[0-2]|0[1-9])-[0-9]{4} (2[0-3]|[01]?[0-9]):([0-5]?[1-9])$/;
        if (!inputValue || !dateTimeRegex.test(inputValue.trim())) {
          methods.setError('notValidVisitDate', {
                type: 'manual',
                message: "Սխալ ձևաչափ"
            });

            return;
        }
console.log(inputValue)
        // If input value passes regex test, update the field value
        // field.onChange(inputValue);
         methods.clearErrors('notValidVisitDate', ''); // Clear the error when the input value is valid
    };
      const handleDateChange = (date) => {
        field.onChange(date);
        methods.clearErrors('notValidVisitDate', '');
      };
      return (
        <DatePicker
         showYearDropdown
         showTimeSelect
         yearDropdownItemNumber={100}
         scrollableYearDropdown
         onChange={handleDateChange}
         onChangeRaw={handleInputChange} // For manual input
         dateFormat={"yyyy-MM-dd  h:mm"}
         timeFormat="HH:mm"
         selected={field.value}
         isClearable
         required
         placeholderText="Ընտրեք ամսաթիվը" 
         className='form-control'
         
         />
      )
  }

export default CustomDateTimeComponent
