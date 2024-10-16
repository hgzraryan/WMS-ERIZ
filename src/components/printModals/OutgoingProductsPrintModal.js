import React, { Suspense, useEffect, useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
//import ResearchesPrintWrapper from "../ResearchesPrintWrapper";
//import mainLogo from "../../dist/img/main-logo.png";
import { useTable } from "react-table";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import moment from "moment";
import { Modal } from "react-bootstrap";
import OrdersPrintWrapper from "./components/OrdersPrintWrapper";
import OutgoingOrdersForm from "../OutgoingOrdersForm";
function OutgoingProductsPrintModal({ modalPrint, setModalPrint }) {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentClient, setCurrentClient] = useState([]);
  const [currentOrgClient, setCurrentOrgClient] = useState([]);
  const { clientId } = modalPrint;
  const { clientType } = modalPrint;
  const { statusBoard } = modalPrint;
  const componentRef = useRef();
  const [checked, setChecked] = useState(false);
console.log(modalPrint)
  // useEffect(() => {
  //   if (clientType && clientType === "patient") {
  //     setTimeout(() => {
  //       axiosPrivate
  //         .get(`/patients/${clientId}`)
  //         .then((resp) => {
  //           setCurrentClient(resp?.data?.jsonString);
  //           setIsLoading(false);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }, 500);
  //   } else if (clientType && clientType === "organization") {
  //     setTimeout(() => {
  //       axiosPrivate
  //         .get(`/patients/${clientId}`)
  //         .then((resp) => {
  //           setCurrentClient(resp?.data?.jsonString);
  //           setIsLoading(false);
  //         })
  //         //TODO need to add get organization by ID
  //         // .then((resp) => {
  //         //   axiosPrivate.get(`/organization/${clientId}`)
  //         //   .then((resp) => {
  //         //     setCurrentOrgClient(resp?.data?.jsonString);
  //         //     setIsLoading(false);
  //         //   });
  //         // })
          
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }, 500);
  //   }else if (!clientType || clientType==='none') {      
  //           setCurrentClient([]);  
  //           setIsLoading(false);
     
  //   }
  // }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Հետազոտություն",
        accessor: "name",
      },
      {
        Header: "Արժեք",
        accessor: "price",
      },
    ],
    []
  );
  const columnsExt = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Հետազոտություն",
        accessor: "name",
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns:modalPrint?.class==="External"?columnsExt:columns,
      data:  [],
    });
  return (
    <>
    <Modal show={() => true} size="xl" onHide={() => setModalPrint(false)}>
          <Modal.Header closeButton>
            <Modal.Title
              style={{ width: "100%", textAlign: "center" }}
            ></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="contact-body contact-detail-body">
              <div data-simplebar className="nicescroll-bar">
                <div className="d-flex flex-xxl-nowrap flex-wrap">
                  <div className="contact-info w-100">
      <div
        className="resultTable"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          margin: "4px",
          fontFamily: "arnamu",
        }}
        id="resultData"
        ref={componentRef}
      >
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
                «Էրիզ»
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
                  fontSize: "2.5rem",
                  color: "#018a54",
                  letterSpacing: "5px",
                  fontWeight: "bolder",
                  textTransform: "uppercase",
                }}
              >
                ՍՊԸ
              </p>
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
                  'ERIZ'
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
                    fontSize: "2.5rem",
                    color: "#018a54",
                    letterSpacing: "5px",
                    fontWeight: "bolder",
                    textTransform: "uppercase",
                  }}
                >
                  LLC
                </p>
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
            background: "#4eafcb",
            color: "white",
            borderRadius: "5px",
            margin: "10px 0",
          }}
        >
          <p style={{ padding: "5px", fontSize: "20px", fontWeight: "bold" }}>
            Մուտքի օրդեր
          </p>
        </div> */}
          <main>
            <Suspense fallback={<LoadingSpinner />}>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
             <OutgoingOrdersForm data={modalPrint}/>
                </>
              )}
            </Suspense>
          </main>
        <footer style={{ marginTop: "auto" }}>
          <div></div>
        </footer>
        <footer
          style={{
            display: "flex",
            justifyContent: "end",
            gap: "5px",
            marginTop: "2rem",
          }}
        >
                     <OrdersPrintWrapper
             value={modalPrint}
             action='outgoing'
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setModalPrint(false)}
          >
            Փակել
          </button>
        </footer>
      </div>
      </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
    </>
  );
}

export default OutgoingProductsPrintModal
