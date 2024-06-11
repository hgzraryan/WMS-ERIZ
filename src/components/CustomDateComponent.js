import React from 'react'
import { useController } from 'react-hook-form'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { calculateAge } from '../utils/helper';

function CustomDateComponent({ control, name,required='true',defaultValue='',setIsChild=false })  {
    const {
      field,
      fieldState: { invalid, isTouched, isDirty },
      formState: { touchedFields, dirtyFields },
    } = useController({
      name,
      control,
      rules: { required: required },
      defaultValue:!!defaultValue ? new Date(defaultValue) : '',

    });
    const handleDateChange = (date) => {
      field.onChange(date);
      if(setIsChild){
        if(calculateAge(date)<18) {
          console.log(calculateAge(date))
          setIsChild(true)
        }else if(calculateAge(date)>18){
          setIsChild(false)
        }
      }
    };
    return (
      <DatePicker
       showYearDropdown
       yearDropdownItemNumber={100}
       scrollableYearDropdown
       onChange={handleDateChange}
       dateFormat={"yyyy-MM-dd"}
       selected={field.value}
       isClearable
       required
       placeholderText="Ընտրեք ամսաթիվը" 
       className='form-control'
       />
    )
}

export default CustomDateComponent
