import React, { useState } from 'react'
import { useController } from 'react-hook-form'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { calculateAge } from '../utils/helper';
import moment from 'moment';

function CustomDateComponentRange({ control, name,required='true',defaultValue='',setIsChild=false,maxDate='',handleDateChanged='' })  {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);
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
    const handleDateChange = (date, event) => {
        if (event) {
          event.stopPropagation(); 
          event.preventDefault(); 
          // Stop event propagation
        }
      handleDateChanged(date)
      const [start, end] = date;
console.log(date)
      field.onChange({ startDate: moment(start).format('YYYY-MM-DD'), endDate: moment(end).format('YYYY-MM-DD')?end:moment(new Date()).format('YYYY-MM-DD') });
      setStartDate(start);
      setEndDate(end);
      if(setIsChild){
        if(calculateAge(date)<18) {
         // console.log(calculateAge(date))
          setIsChild(true)
        }else if(calculateAge(date)>18){
          setIsChild(false)
        }
      }
    };
    const preventTyping = (e) => {
      e.preventDefault(); // Prevent any typing into the field
    };
    return (

      <DatePicker
       showYearDropdown
       yearDropdownItemNumber={100}
       scrollableYearDropdown
       onChange={(date, event) => handleDateChange(date, event)}
       dateFormat={"yyyy-MM-dd"}
       selected={startDate}
       selectsRange
       startDate={startDate}
       endDate={endDate}
       isClearable
       required
       onKeyDown={preventTyping} // Prevent typing in the input field
       placeholderText="Ընտրեք ամսաթիվը" 
       className='form-control custom-datepicker'
       //popperPlacement="auto"
       maxDate={new Date(maxDate)}
       
       
       //popperContainer={({ children }) => <div>{children}</div>} // Custom container
       
       />
      
    )
}

export default CustomDateComponentRange
