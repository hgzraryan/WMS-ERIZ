/*-------------------------------------------------------------------
|
|  🐯 Purpose: THIS FILE CONTAINS ALL THE VALIDATORS OBJECTS
|
*-------------------------------------------------------------------*/
// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const EMAIL_REGEX =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// const MOBILE_REGEX = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

export const firstName_validation = {
  name: 'firstName',
  label: 'Անուն',
  type: 'text',
  id: 'firstName',
  placeholder: "Անուն",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}
export const state_validation = {
  name: "state",
  label: "Մարզ",
  multiline: true,
  id: "state",
  placeholder: "Մարզ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const city_validation = {
  name: "city",
  label: "Քաղաք/Գյուղ",
  multiline: true,
  id: "city",
  placeholder: "Քաղաք/Գյուղ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const country_validation = {
  name: "country",
  label: "Երկիր",
  multiline: true,
  id: "country",
  placeholder: "Երկիր",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const street_validation = {
  name: "street",
  label: "Փողոց",
  multiline: true,
  id: "street",
  placeholder: "Փողոց",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const zipCode_validation = {
  name: "zipCode",
  label: "Փոստային համար",
  type: "number",
  multiline: true,
  id: "zipCode",
  placeholder: "Փոստային համար",
  validation: {
    required: {
      value: false,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const password_validation = {
  name: "password",
  label: "Ծածկագիր",
  type: "password",
  id: "password",
  placeholder: "Ծածկագիր",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    minLength: {
      value: 6,
      message: "min 6 characters",
    },
  },
};
export const lastName_validation = {
  name: 'lastName',
  label: 'Ազգանուն',
  type: 'text',
  id: 'lastName',
  placeholder: "Ազգանուն",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}
export const midName_validation = {
  name: 'midName',
  label: 'Հայրանուն',
  type: 'text',
  id: 'midName',
  placeholder: "Հայրանուն",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}
export const user_validation = {
    name: 'user',
    label: 'Ծածկանուն',
    type: 'text',
    id: 'user',
    placeholder: "Ծածկանուն",
    validation: {
      required: {
        value: true,
        message: "պարտադիր",
      },
      maxLength: {
        value: 30,
        message: '30 characters max',
      },
    },
  }
  export const pwd_validation = {
    name: 'pwd',
    label: 'Ծածկագիր',
    type: 'password',
    id: 'pwd',
    placeholder: 'Ծածկագիր',
    validation: {
      required: {
        value: true,
        message: "պարտադիր",
      },
      minLength: {
        value: 6,
        message: 'min 6 characters',
      },
    },
  }
export const position_validation = {
    name: 'position',
    label: 'Պաշտոն',
    type: 'text',
    id: 'position',
    placeholder: "Պաշտոն",
    validation: {
      required: {
        value: true,
        message: "պարտադիր",
      },
      maxLength: {
        value: 30,
        message: '30 characters max',
      },
    },
  }
export const birthday_validation = {
  name: 'birthday',
  label: 'Ծննդյան ամսաթիվ',
  type: 'text',
  id: 'birthday',
  placeholder: "DD/MM/YYYY",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 10,
      message: '10 symbols max',
    },
  },
}
export const age_validation = {
  name: 'age',
  label: 'Տարիք',
  type: 'number',
  id: 'age',
  placeholder: "Տարիք",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 3,
      message: '3 numbers max',
    },
  },
}
export const address_validation = {
  name: 'address',
  label: 'Հասցե',
  type: 'text',
  id: 'address',
  placeholder: "Հասցե",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    }
  },
}
export const email_validation = {
  name: 'email',
  label: 'Էլ․ հասցե',
  type: 'email',
  id: 'email',
  placeholder: 'Էլ․ հասցե',
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'not valid',
    },
  },
}
export const mobile_validation = {
  name: 'mobile',
  label: 'Հեռախոս',
  type: 'text',
  id: 'mobile',
  placeholder: "Հեռախոս",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 15,
      message: '15 numbers max',
    },
  },
}
export const name_validation = {
  name: 'name',
  label: 'Անվանում',
  type: 'text',
  id: 'name',
  placeholder: "Անվանում",
  validation: {
    required: {
      value: true,
      message: 'պարտադիր',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}
export const price_validation = {
  name: 'price',
  label: 'Արժեք',
  type: 'number',
  id: 'price',
  placeholder: "Արժեք",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 10,
      message: '10 characters max',
    },
  },
}
export const unit_validation = {
  name: 'unit',
  label: 'Չափման միավոր',
  type: 'text',
  id: 'unit',
  placeholder: "Չափման միավոր",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}

export const currency_validation = {
  name: 'currency',
  label: 'Արժույթ',
  type: 'text',
  id: 'currency',
  placeholder: "Արժույթ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}
export const useage_validation = {
  name: 'useage',
  label: 'Կիրառություն',
  type: 'text',
  id: 'useage',
  placeholder: "Կիրառություն",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}
export const producer_validation = {
  name: 'producer',
  label: 'Թողարկող',
  type: 'text',
  id: 'producer',
  placeholder: "Թողարկող",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}

export const desc_validation = {
  name: 'description',
  label: 'Նկարագիր',
  multiline: true,
  id: 'description',
  placeholder: 'Նկարագիր',
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: '200 characters max',
    },
  },
}
export const class_validation = {
  name: 'class',
  label: 'Դասակարգ',
  multiline: true,
  id: 'class',
  placeholder: 'Դասակարգ',
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: '200 characters max',
    },
  },
}
export const director_validation = {
  name: "director",
  label: "Տնօրեն",
  type: "text",
  id: "director",
  placeholder: "Տնօրեն",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const tin_validation = {
  name: "tin",
  label: "ՀՎՀՀ",
  type: "number",
  id: "tin",
  placeholder: "ՀՎՀՀ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const bankAccNumber_validation = {
  name: "bankAccNumber",
  label: "Հ/Հ",
  type: "number",
  id: "bankAccNumber",
  placeholder: "Հ/Հ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const bankName_validation = {
  name: "bankName",
  label: "Բանկ",
  type: "text",
  id: "bankName",
  placeholder: "Բանկ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const code_validation = {
  name: "code",
  label: "Կոդ",
  type: "text",
  id: "code",
  placeholder: "Կոդ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const balance_validation = {
  name: "balance",
  label: "Մնացորդ",
  type: "text",
  id: "balance",
  placeholder: "Մնացորդ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const storekeeper_validation = {
  name: "storekeeper",
  label: "Պահեստապետ",
  type: "text",
  id: "storekeeper",
  placeholder: "Պահեստապետ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const subWarehouse_validation = {
  name: "subWarehouse",
  label: "Ենթապահեստ",
  type: "text",
  id: "subWarehouse",
  placeholder: "Ենթապահեստ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const type_validation = {
  name: "type",
  label: "Տեսակ",
  type: "text",
  id: "type",
  placeholder: "Տեսակ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const warehouseState_validation = {
  name: "warehouseState",
  label: "Կարգավիճակ",
  type: "text",
  id: "warehouseState",
  placeholder: "Կարգավիճակ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};

