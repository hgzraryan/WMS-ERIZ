import React, { useState } from 'react'
import { useController } from 'react-hook-form'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { calculateAge } from '../utils/helper';
import moment from 'moment';

function CustomDateFilterComponent({ control, name,required=false,defaultValue='',maxDate='' })  {
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
    const handleDateChange = (date) => {
      const [start, end] = date;
console.log(date)
      field.onChange({ startDate: start, endDate: end?end:moment(new Date()).format('YYYY-MM-DD') });
      setStartDate(start);
      setEndDate(end);
    };
    const preventTyping = (e) => {
      e.preventDefault(); // Prevent any typing into the field
    };
    return (
      <DatePicker
       showYearDropdown
       yearDropdownItemNumber={100}
       scrollableYearDropdown
       onChange={handleDateChange}
       dateFormat={"dd-MM-yyyy"}
       selected={startDate}
       selectsRange
       startDate={startDate}
       endDate={endDate}
       isClearable
       required={required}
       onKeyDown={preventTyping} // Prevent typing in the input field
       placeholderText="Ընտրեք ամսաթիվը" 
       className='filter-datepicker'
       popperPlacement="auto"
       maxDate={new Date(maxDate)}
       //popperContainer={({ children }) => <div>{children}</div>} // Custom container

       />
    )
}

export default CustomDateFilterComponent
