import React from 'react'
import { useController } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'

function CustomPhoneComponent({ control, name,required=true,defaultValue='' })  {
    const {
      field,
      fieldState: { invalid, isTouched, isDirty },
      formState: { touchedFields, dirtyFields },
    } = useController({
      name,
      control,
      rules: { required: required },
      defaultValue: defaultValue
    })
  
    return (
      <PhoneInput
      placeholder="Հեռախոս"
      value={field.value}
      onChange={field.onChange}
      displayInitialValueAsLocalNumber
      initialValueFormat="national"
      autoComplete="off"
      defaultCountry="AM"
      className='form-control d-flex'
      
    />
    )
}

export default CustomPhoneComponent
