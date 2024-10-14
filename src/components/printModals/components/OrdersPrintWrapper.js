import React, { useRef } from 'react'
import { ComponentToPrint } from './ComponentToPrint';
import ReactToPrint from 'react-to-print';
function OrdersPrintWrapper() {
  let componentRef = useRef(null);
  return (
    <div style={{ display: "flex" }}>
      <ReactToPrint
        trigger={() => (
          
            <button
            type="button"
          className="btn btn-secondary"
          >
           Տպել
          </button>
        )}
        content={() => componentRef.current}
      />
      <div style={{ display: "none" }}>
          <ComponentToPrint ref={componentRef} value={{}} currentClient={{}} externalChecked={{}}/>
       
      </div>
    </div>
  );
}

export default OrdersPrintWrapper
