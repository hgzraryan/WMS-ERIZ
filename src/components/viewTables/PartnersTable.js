/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useRef, useState } from "react";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useLocation, useNavigate } from "react-router-dom";
import Highlighter from "react-highlight-words";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PartnerEdit from "../editModals/PartnerEdit";
import ComponentToConfirm from "../ComponentToConfirm";
import { BiSolidInfoCircle } from "react-icons/bi";
import PartnersInfoModal from "../infoModals/PartnersInfoModal";
import CustomTable from "../CustomTable";

function PartnersTable({
  confirmPartnerRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  partners,
  setPartners,
  refreshData,
  dataReceived
}) {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const [editRow, setEditRow] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [modalInfo, setModalInfo] = useState(false);

  const handleOpenInfoModal = (data) => {
     
     setModalInfo((prev) => data);
   };
  // const getColumnSearchProps = (dataIndex) => {
  //     return {
  //       filterDropdown: ({
  //         setSelectedKeys,
  //         selectedKeys,
  //         confirm,
  //         clearFilters,
  //         close,
  //       }) => (
  //         <div
  //           style={{
  //             padding: 8,
  //           }}
  //           onKeyDown={(e) => e.stopPropagation()}
  //         >
  //           <Input
  //             ref={searchInput}
  //             placeholder={`Փնտրել`}
  //             value={selectedKeys[0]}
  //             onChange={(e) =>
  //               setSelectedKeys(e.target.value ? [e.target.value] : [])
  //             }
  //             onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //             style={{
  //               marginBottom: 8,
  //               display: "block",
  //             }}
  //           />
  //           <div>
  //             <Button
  //               type="primary"
  //               onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //               icon={<SearchOutlined />}
  //               size="small"
  //               debugger
  //               style={{
  //                 width: 90,
  //               }}
  //             >
  //               Search
  //             </Button>
  //             <Button
  //               onClick={() => clearFilters && handleReset(clearFilters,confirm)}
  //               size="small"
  //               style={{
  //                 width: 90,
  //               }}
  //             >
  //               Reset
  //             </Button>
  //             {/* <Button
  //               type="link"
  //               size="small"
  //               onClick={() => {
  //                 confirm({
  //                   closeDropdown: false,
  //                 });
  //                 console.log("dataIndex", dataIndex);
  //                 setSearchText(selectedKeys[0]);
  //                 setSearchedColumn(dataIndex);
  //               }}
  //             >
  //               Filter
  //             </Button> */}
  //             <Button
  //               type="link"
  //               size="small"
  //               onClick={() => {
  //                 close();
  //               }}
  //             >
  //               close
  //             </Button>
  //           </div>
  //         </div>
  //       ),
  //       filterIcon: (filtered) => (
  //         <SearchOutlined
  //           style={{
  //             color: filtered ? "#1677ff" : undefined,
  //           }}
  //         />
  //       ),
  //       onFilter: (value, record) =>
  //         record[dataIndex]
  //           .toString()
  //           .toLowerCase()
  //           .includes((value).toLowerCase()),
  //       onFilterDropdownOpenChange: (visible) => {
  //         if (visible) {
  //           setTimeout(() => searchInput.current?.select(), 100);
  //         }
  //       },
  //       onCell: (text, record) => {
  //         //const highlightText = record[dataIndex].toString();
  //         return (
  //             {text}
  //         //   <Highlighter
  //         //     highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
  //         //     searchWords={[searchText]}
  //         //     autoEscape
  //         //     textToHighlight={highlightText}
  //         //   />
  //         );
  //       },
  //     };
  //   };
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "partnerId",
        width: 80,
      },
      {
        Header: "Անվանում",
        accessor: "name",
        width: 250,
      },
      {
        Header: "Պատսխանատու անձ",
        accessor: "respPersonFullName",
        width: 250,
      },
      {
        Header: "Կազմ․ տեսակը",
        accessor: "companyType",

        Cell: ({ row }) => (
          <div>
            {row?.original?.companyType === "Legal"
              ? "Իրավ․ անձ"
              : row?.original?.companyType === "Physical"
              ? "Ֆիզ անձ"
              : row?.original?.companyType === "Other"
              ? "Այլ"
              : ""}
          </div>
        ),
        width: 120,
      },
      {
        Header: "Հեռախոս",
        accessor: "phone",
        Cell: ({ row }) => <div>{row?.original?.contact?.phone}</div>,
        width: 150,
      },
      {
        Header: "Էլ․ հասցե",
        accessor: "email",
        Cell: ({ row }) => <div>{row?.original?.contact?.email}</div>,
        width: 200,
      },
      {
        Header: "Հասցե",
        accessor: "address",
        Cell: ({ row }) => (
          <div>
            {row?.original?.contact?.address?.city},
            {row?.original?.contact?.address?.street}
          </div>
        ),
        width: 250,
      },
      {
        Header: "Գործընկերոջ տեսակը",
        accessor: "partnerType",
        Cell: ({ row }) => (
          <div>
            {row?.original?.partnerType === "Producer"
              ? "Արտադրող"
              : row?.original?.partnerType === "Reseller"
              ? "Վերավաճառող"
              : row?.original?.partnerType === "Investor"
              ? "Ներդրող"
              : ""}
          </div>
        ),
        width: 200,
      },
      {
        Header: "Գործողություններ",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
                 <div className="d-flex">
              <BiSolidInfoCircle
              cursor={"pointer"}
              size={"1.5rem"}
              onClick={() => handleOpenInfoModal(row.original)}
            />
            </div>
            <div className="d-flex">
              <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                data-bs-toggle="tooltip"
                data-placement="top"
                title="Edit"
                href="#"
                onClick={() => handleOpenEditModal(row.original)}
              >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="edit" />
                  </span>
                </span>
              </a>
              <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                data-bs-toggle="tooltip"
                onClick={() => handleOpenModal(row.original)}
                data-placement="top"
                title=""
                data-bs-original-title="Delete"
                href="#"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="trash" />
                  </span>
                </span>
              </a>
              {/* <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                  data-bs-toggle="tooltip"
                  onClick={() => handleOpenDisableModal(row)}
                  data-placement="top"
                  title="Status"
                  data-bs-original-title="Activte"
                  href="#"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <FeatherIcon icon="power" style={{color: row?.isActive ? 'green' : 'red' }} />
                    </span>
                  </span>
                </a> */}
            </div>
          </div>
        ),
        disableSortBy: true,
        width: 150,
        Filter: ({ column: { id } }) => <></>,
      },
    ],
    []
  );
  const handleOpenEditModal = (value) => {
    setEditRow((prev) => value);
  };

  return (
    <>
      {!!modalInfo && (
        <PartnersInfoModal modalInfo={modalInfo} setModalInfo={setModalInfo}/>
      )}
      {editRow && (
        <PartnerEdit
          partner={editRow}
          setEditRow={setEditRow}
          refreshData={refreshData}
        />
      )}
      <ComponentToConfirm
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
        handleDeleteItem={handleDeleteItem}
        selectedItemId={selectedItemId}
        confirmRef={confirmPartnerRef}
        keyName={selectedItem.name}
        delId={selectedItem.partnerId}
      />
      <CustomTable data={partners} column={columns} dataReceived={dataReceived} />
    </>
  );
}

export default PartnersTable;
