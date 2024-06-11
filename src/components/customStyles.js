export const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "#018a54" : "#e6e6e6",
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: state.isFocused ? "#018a54" : "#e6e6e6"
      }
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? '#018a54'
          : isFocused
          ? 'rgba(1, 138, 84, .1)'
          : undefined,
        color: isDisabled
          ? '#e6e6e6'
          : isSelected
          ? 'white'
          : 'black',
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? '#018a54'
              : '#fff'
            : undefined,
        },
      };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        backgroundColor: "#0096fb",
        color: "#fff",
      }),
      multiValueRemove: (styles, { data }) => ({
        ...styles,
        backgroundColor: "#0096fb",
        color: "#e8e3e3",
        ":hover": {
          backgroundColor: "#0096fb",
          color: "#eb3434",
        },
      }),
  };