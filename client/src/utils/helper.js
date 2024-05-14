export  function deleteNullProperties(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        // If the property is an object (and not null), recursively call the function
        deleteNullProperties(obj[key]);
      } else if (obj[key] === null || obj[key] === '') {
        // If the property value is null, delete the property from the object
        delete obj[key];
      }
    }
    if(obj?.contact?.address && Object.keys(obj?.contact?.address).length===0){
      delete obj?.contact?.address
    }
    if(obj?.contact && Object.keys(obj?.contact).length===0){
      delete obj?.contact
    }
    if(obj?.contactPerson && Object.keys(obj?.contactPerson).length===0){
      delete obj?.contactPerson
    }

    return obj
  }
  
  export function calculateAge (dateOfBirth) {
    // Convert the birthdate string to a Date object
    const birthdateObj = new Date(dateOfBirth);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in years
    let age = currentDate.getFullYear() - birthdateObj.getFullYear();

    // Check if the birthday hasn't occurred yet this year
    if (
      currentDate.getMonth() < birthdateObj.getMonth() ||
      (currentDate.getMonth() === birthdateObj.getMonth() &&
        currentDate.getDate() < birthdateObj.getDate())
    ) {
      age--;
    }

    return age;
  };
  
  export function deepEqual(obj1, obj2) {
    // Base case: If both are primitive types, compare directly
    if (obj1 === obj2) return true;

    // Check if both are objects
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

    // Check if both objects have the same keys
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;

    // Recursively compare values
    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
}
//Change Role structure for react-select 
export function objToArrWithObjects(roles) {
  const labels = {
    Admin: 'Ադմին',
    Approver: 'Հաստատող',
    Editor: 'Փոփոխող',
    User: 'Օգտատեր',
    Sampler: 'Նմուշառող',
  };

  return Object.entries(roles).map(([key, value]) => ({
    label: labels[key],
    name: key,
    value
  }));
}