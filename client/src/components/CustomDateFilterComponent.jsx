import React from 'react';
import { useController } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomDateFilterComponent({
  control,
  name,
  required = false,
  maxDate = ''
}) {
  const {
    field
  } = useController({
    name,
    control,
    rules: { required },
    defaultValue: null
  });

  const handleDateChange = (dates) => {
    const [start, end] = dates;

    // Only update when either start or end is selected
    if (!start && !end) {
      field.onChange(null);
    } else {
      field.onChange({
        startDate: start,
        endDate: end || null
      });
    }
  };

  const preventTyping = (e) => e.preventDefault();

  const startDate = field.value?.startDate ? new Date(field.value.startDate) : null;
  const endDate = field.value?.endDate ? new Date(field.value.endDate) : null;

  return (
    <DatePicker
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={handleDateChange}
      isClearable
      showYearDropdown
      scrollableYearDropdown
      yearDropdownItemNumber={100}
      placeholderText="Ընտրեք ամսաթիվը"
      dateFormat="dd-MM-yyyy"
      onKeyDown={preventTyping}
      className="filter-datepicker"
      popperPlacement="auto"
      maxDate={maxDate ? new Date(maxDate) : undefined}
    />
  );
}

export default CustomDateFilterComponent;
