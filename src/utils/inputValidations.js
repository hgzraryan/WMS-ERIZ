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
export const status_validation = {
  name: "status",
  label: "Կարգավիճակ",
  multiline: true,
  id: "status",
  placeholder: "Կարգավիճակ",
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
  type: "number",
  id: "code",
  placeholder: "Կոդ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const barcode_validation = {
  name: "barcode",
  label: "Բարկոդ",
  type: "number",
  id: "barcode",
  placeholder: "Բարկոդ",
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
  type: "number",
  id: "balance",
  placeholder: "Մնացորդ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const stock_validation = {
  name: "stock",
  label: "Մնացորդ",
  type: "number",
  id: "stock",
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
export const respPersonFullName_validation = {
  name: "respPersonFullName",
  label: "Պատասխանատու անձի ԱԱՀ",
  type: "text",
  id: "parentFullName",
  placeholder: "Պատասխանատու անձի ԱԱՀ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
// Electronics validations
export const WarrantyPeriod_validation = {
  name: "warrantyPeriod",
  label: "Երաշխիքային ժամկետ",
  type: "text",
  id: "warrantyPeriod",
  placeholder: "Երաշխիքային ժամկետ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const Power_validation = {
  name: "power",
  label: "Հզորություն",
  type: "text",
  id: "power",
  placeholder: "Հզորություն",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const Brand_validation = {
  name: "brand",
  label: "Ապրանքանիշ",
  type: "text",
  id: "brand",
  placeholder: "Ապրանքանիշ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const Model_validation = {
  name: "model",
  label: "Մոդել",
  type: "text",
  id: "model",
  placeholder: "Մոդել",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const StorageCapacity_validation = {
  name: "storageCapacity",
  label: "Հիշողության ծավալ",
  type: "text",
  id: "storageCapacity",
  placeholder: "Հիշողության ծավալ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const Dimension_validation = {
  name: "dimension",
  label: "Չափսերը",
  type: "text",
  id: "dimension",
  placeholder: "Չափսերը",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const Weight_validation = {
  name: "weight",
  label: "Քաշը(կգ)",
  type: "text",
  id: "weight",
  placeholder: "Քաշը",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const Color_validation = {
  name: "color",
  label: "Գույն",
  type: "text",
  id: "color",
  placeholder: "Գույն",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const Connectivity_validation = {
  name: "connectivity",
  label: "Միացման տեսակը",
  type: "text",
  id: "connectivity",
  placeholder: "Միացման տեսակը",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const Battery_validation = {
  name: "battery",
  label: "Մարտկոցը",
  type: "text",
  id: "battery",
  placeholder: "Մարտկոցը",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const OperationSystem_validation = {
  name: "operationSystem",
  label: "Օպերացիոն համակարգը",
  type: "text",
  id: "operationSystem",
  placeholder: "Օպերացիոն համակարգը",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
//food validations
export const ExpiryDate_validation = {
  name: "expiryDate",
  label: "Պիտանելիության ժամկետ",
  type: "text",
  id: "expiryDate",
  placeholder: "Պիտանելիության ժամկետ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const StorageTemperature_validation = {
  name: "storageTemperature",
  label: "Պահպանման ջերմաստիճան",
  type: "text",
  id: "storageTemperature",
  placeholder: "Պահպանման ջերմաստիճա",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const PackagingType_validation = {
  name: "packagingType",
  label: "Փաթեթավորումը",
  type: "text",
  id: "packagingType",
  placeholder: "Փաթեթավորումը",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const Supplier_validation = {
  name: "supplier",
  label: "Մատակարար",
  type: "text",
  id: "supplier",
  placeholder: "Մատակարար",
  validation: {
    required: {
      value: false,
      message: "պարտադիր",
    },
  },
};
export const Quantity_validation = {
  name: "quantity",
  label: "Քանակ",
  type: "text",
  id: "quantity",
  placeholder: "Քանակ",
  validation: {
    required: {
      value: false,
      message: "պարտադիր",
    },
  },
};
export const CountryOfOrigin_validation = {
  name: "countryOfOrigin",
  label: "Արտադրող երկիր",
  type: "text",
  id: "countryOfOrigin",
  placeholder: "Արտադրող երկիր",
  validation: {
    required: {
      value: false,
      message: "պարտադիր",
    },
  },
};
export const reorderLevel_validation = {
  name: "reorderLevel",
  label: "Հիշեցման նվազագույն քանակ",
  type: "number",
  id: "reorderLevel",
  placeholder: "Հիշեցման նվազագույն քանակ",
  validation: {
    required: {
      value: false,
      message: "պարտադիր",
    },
  },
};
export const height_validation = {
  name: "height",
  label: "Բարձրություն(սմ)",
  type: "number",
  id: "height",
  placeholder: "Բարձրություն",
  validation: {
    required: {
      value: false,
      message: "պարտադիր",
    },
  },
};
export const width_validation = {
  name: "width",
  label: "Լայնություն(սմ)",
  type: "number",
  id: "width",
  placeholder: "Լայնություն",
  validation: {
    required: {
      value: false,
      message: "պարտադիր",
    },
  },
};
export const length_validation = {
  name: "length",
  label: "Երկարություն(սմ)",
  type: "number",
  id: "length",
  placeholder: "Երկարություն",
  validation: {
    required: {
      value: false,
      message: "պարտադիր",
    },
  },
};
