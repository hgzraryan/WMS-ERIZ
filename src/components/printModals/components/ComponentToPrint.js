import React, { forwardRef } from "react";
import { useTable } from "react-table";
// import Barcode from "react-barcode";
//import mainLogo from "../dist/img/main-logo.png";
//import BarcodeComp from "./BarcodeComp";
import moment from "moment";
import IncomingOrderForm from "../../IncomingOrderForm";
import OutgoingOrdersForm from "../../OutgoingOrdersForm";

export const ComponentToPrint = forwardRef(({ value,currentClient,action }, ref) => {
console.log(value)

  //-----------------------barcode ------------------
  /*
const [barcode, setBarcode] = useState('lintangwisesa');
const handleChange = (event) => {
	setBarcode(event.target.value ? event.target.value : '');
};
const { inputRef } = Barcode({
	value: barcode,
	options: {
	  background: '#ffffff',
	}
});
*/
  //-----------------------barcode ------------------


  return (
    <div className="wrapper " style={{ margin:'20px 40px 0 40px' }} ref={ref}>
      <header
            className="header"
            style={{ display: "flex", justifyContent: "space-between", margin:'0 40px 0 40px' }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "2.5rem",
                    color: "#018a54",
                    letterSpacing: "5px",
                    fontWeight: "bolder",
                    textTransform: "uppercase",
                  }}
                >
                  Master ice
                </p>
                {/* <img
                  width={"40px"}
                  height={"40px"}
                  src={mainLogo}
                  alt="Logo"
                  style={{ marginLeft: "1rem", marginRight: "1rem" }}
                /> */}
                
              </div>
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "1.3rem",
                    color: "#4eafcb",
                    textTransform: "uppercase",
                    fontWeight: "bolder",
                  }}
                >
                  ԱԽտորոշման կենտրոն
                </p>
              </div> */}
            </div>
            <div>
              <div>
                <ul>
                  <li>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      color: "#018a54",
                      letterSpacing: "5px",
                      fontWeight: "bolder",
                      textTransform: "uppercase",
                    }}
                  >
                    'Էլիզ'
                  </p>
                  {/* <img
                    width={"40px"}
                    height={"40px"}
                    src={mainLogo}
                    alt="Logo"
                    style={{ marginLeft: "1rem", marginRight: "1rem" }}
                  /> */}
                  <p
                    style={{
                      color: "#018a54",
                      letterSpacing: "5px",
                      fontWeight: "bolder",
                      textTransform: "uppercase",
                    }}
                  >
                    ՍՊԸ
                  </p>
                </div>

                  </li>
                  <li>
                <div
                  style={{
                    fontSize:'.5rem',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize:'.8rem',

                      color: "#018a54",
                      letterSpacing: "5px",
                      fontWeight: "bolder",
                      textTransform: "uppercase",
                    }}
                  >
                    ք․Մասիս 
                  </p>
                  {/* <img
                    width={"40px"}
                    height={"40px"}
                    src={mainLogo}
                    alt="Logo"
                    style={{ marginLeft: "1rem", marginRight: "1rem" }}
                  /> */}
                  <p
                    style={{
                      color: "#018a54",
                      letterSpacing: "5px",
                      fontWeight: "bolder",
                      textTransform: "uppercase",
                    }}
                  >
                  </p>
                </div>

                  </li>
                  <li>
                <div
                  style={{
                    fontSize:'.8rem',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize:'.8rem',

                      color: "#018a54",
                      letterSpacing: "5px",
                      fontWeight: "bolder",
                      textTransform: "uppercase",
                    }}
                  >
                    Հ․Վարդանյան 52
                  </p>
                  {/* <img
                    width={"40px"}
                    height={"40px"}
                    src={mainLogo}
                    alt="Logo"
                    style={{ marginLeft: "1rem", marginRight: "1rem" }}
                  /> */}
                </div>

                  </li>
                </ul>
                {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: "2.3rem",
                      color: "#4eafcb",
                      textTransform: "uppercase",
                      fontWeight: "bolder",
                      marginTop: "-10px",
                    }}
                  >
                    Laboratory
                  </p>
                </div> */}
              </div>
            </div>
          </header>
          <div
            style={{
              width: "100%",
              height: "3px",
              borderRadius: ".3rem",
              background: "linear-gradient(to right, #018a54 65%, transparent)",
              margin:'0 20px 0 20px' 
            }}
          ></div>
          {/* <div
            className="d-flex justify-content-center align-center"
            style={{
              background: " #018a54",
              color: "white",
              borderRadius: "5px",
              margin: "10px 0",
            }}
          >
            <p style={{ padding: "5px", fontSize: "20px", fontWeight: "bold" }}>
              Մուտքի օրդեր
            </p>
          </div> */}
          {action==='outgoing'?<OutgoingOrdersForm  data={value}/>:action==='incoming'?<IncomingOrderForm data={value}/>:<></>}
          
          

    </div>
  );
});
