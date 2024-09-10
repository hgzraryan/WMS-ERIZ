/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useRef, useState } from "react";
import ComponentToConfirm from "../ComponentToConfirm";
import "../../dist/css/data-table.css";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import useDebounce from "../../hooks/useDebounce";
import DefaultProfileImage from "../../../src/dist/img/Missing.svg";
import { useLocation, useNavigate } from "react-router-dom";
import UserDeactivateModal from "../deactivateItems/UserDeactivateModal";
import UserEdit from "../editModals/UserEdit";
import ResizableTitle from "../views/ResizableTitle";

import Highlighter from "react-highlight-words";

import { SearchOutlined } from "@ant-design/icons";
import { USERS_URL } from "../../utils/constants";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Table from "../Table";


function UsersTable({
  confirmRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  users,
  setUsers,
  refreshData
}) {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [allUsers, setAllUsers] = useState([]); 
  const searchInput = useRef(null);
  // useEffect(() => {
  //     axiosPrivate
  //       .get(USERS_URL)
  //       .then((resp) => {
  //         setAllUsers(resp?.data?.jsonString);
  //       })        
  //       .catch((err) => {
  //         console.log(err);
  //         navigate("/login", { state: { from: location }, replace: true });

  //       });
  // }, []);

  // const getColumnSearchProps = (dataIndex) => {
  //   return {
  //     filterDropdown: ({
  //       setSelectedKeys,
  //       selectedKeys,
  //       confirm,
  //       clearFilters,
  //       close,
  //     }) => (
  //       <div
  //         style={{
  //           padding: 8,
  //         }}
  //         onKeyDown={(e) => e.stopPropagation()}
  //       >
  //         <Input
  //           ref={searchInput}
  //           placeholder={`Փնտրել`}
  //           value={selectedKeys[0]}
  //           onChange={(e) =>
  //             setSelectedKeys(e.target.value ? [e.target.value] : [])
  //           }
  //           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //           style={{
  //             marginBottom: 8,
  //             display: "block",
  //           }}
  //         />
  //         <Space>
  //           <Button
  //             type="primary"
  //             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //             icon={<SearchOutlined />}
  //             size="small"
  //             debugger
  //             style={{
  //               width: 90,
  //             }}
  //           >
  //             Search
  //           </Button>
  //           <Button
  //             onClick={() => clearFilters && handleReset(clearFilters,confirm)}
  //             size="small"
  //             style={{
  //               width: 90,
  //             }}
  //           >
  //             Reset
  //           </Button>
  //           {/* <Button
  //             type="link"
  //             size="small"
  //             onClick={() => {
  //               confirm({
  //                 closeDropdown: false,
  //               });
  //               console.log("dataIndex", dataIndex);
  //               setSearchText(selectedKeys[0]);
  //               setSearchedColumn(dataIndex);
  //             }}
  //           >
  //             Filter
  //           </Button> */}
  //           <Button
  //             type="link"
  //             size="small"
  //             onClick={() => {
  //               close();
  //             }}
  //           >
  //             close
  //           </Button>
  //         </Space>
  //       </div>
  //     ),
  //     filterIcon: (filtered) => (
  //       <SearchOutlined
  //         style={{
  //           color: filtered ? "#1677ff" : undefined,
  //         }}
  //       />
  //     ),
  //     // onFilter: (value, record) =>
  //     //   record[dataIndex]
  //     //     .toString()
  //     //     .toLowerCase()
  //     //     .includes((value).toLowerCase()),
  //     onFilterDropdownOpenChange: (visible) => {
  //       if (visible) {
  //         setTimeout(() => searchInput.current?.select(), 100);
  //       }
  //     },
  //     render: (text, record) => {
  //       const highlightText = record[dataIndex].toString();
  //       return (
  //         <Highlighter
  //           highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
  //           searchWords={[searchText]}
  //           autoEscape
  //           textToHighlight={highlightText}
  //         />
  //       );
  //     },
  //   };
  // };
  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "photo", 
        Cell: (row) => (
          <img
            src={row?.original?.photo || DefaultProfileImage}
            alt="User Photo"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        ),      
        width: 65,
      },
      {
        Header: "ID",
        accessor: "userId",
        width: 80,
      },
      {
        Header: "Ծածկանուն",
        accessor: "username",
        width:200,
  
      },
      {
        Header: 'Անուն',
        accessor: "firstname",
        width: 190,
  
      },
      {
        Header:'Ազգանուն',
        accessor: "lastname",
        width: 190,
      },
      {
        Header:'Էլ․ հասցե',
        accessor: "email",
        width: 300,
  
      },
      {
        Header: "Դերեր",
        accessor: "roles",
        Cell: ({ value }) =>
          Object.keys(value).map((role) => (
            <span className={setUserTypeStyle(role)} key={role}>
              {role === "User" ? "Օգտատեր" :
                  role === "Doctor" ? "Բժիշկ" :
                  role === "Editor" ? "Փոփոխող" :
                  role === "Sampler" ? "Նմուշառող" :
                  role === "Approver" ? "Հաստատող" :
                  role === "Admin" ? "Ադմին" :
                  "Unknown Role"}
                  </span>
                )),
              width: 200,
      },
      {
        Header: "Գործողություններ",
        accessor: "actions",
        Cell: ( {row} ) => (
          <div className="d-flex align-items-center">
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
              <a
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
                    <FeatherIcon icon="power" style={{color: row?.original.isActive ? 'green' : 'red' }} />
                  </span>
                </span>
              </a>
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
  
  const navigate = useNavigate()
  const [disableRow, setDisableRow] = useState(false);
  const [editRow, setEditRow] = useState(false);
  
const handleOpenEditModal = (value) => {
    setEditRow((prev) => value);
    console.log("edit")
  };
  const handleOpenDisableModal = (value) => {
  setDisableRow((prev) => value);
  console.log('disable',value)
};
const handleCloseEditModal = () => {
  setDisableRow(false);
};
const setUserTypeStyle = (userType) => {
    switch (userType) {
      case "Admin":
        return "badge badge-soft-success  my-1  me-2";
      case "Editor":
        return "badge badge-soft-violet my-1  me-2";
      case "User":
        return "badge badge-soft-danger my-1  me-2";
      case "Approver":
        return "badge badge-soft-light my-1  me-2";
      case "Sampler":
        return "badge badge-soft-yellow my-1  me-2";
      case "Doctor":
        return "badge badge-soft-blue my-1  me-2";

      default:
        break;
    }
  };

  const handleUserPage = async(userId) =>{
      navigate(`/users/${userId}`)
  }
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    setSearchText(selectedKeys[0]);
    if (dataIndex) {
      setSearchedColumn(dataIndex);
    }
    confirm();
  };
  const handleReset = (clearFilters,confirm) => {
    clearFilters();
    confirm()
    setSearchText("");
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
    {
      editRow &&(
        <UserEdit user={editRow} setEditRow={setEditRow} refreshData={refreshData}/>
      )
    }
     {disableRow && (
              <UserDeactivateModal
                handleCloseEditModal={handleCloseEditModal}
                rowData={disableRow.original}
                refreshData={refreshData}
              />
            )}
            <ComponentToConfirm
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
              handleDeleteItem={handleDeleteItem}
              selectedItemId={selectedItemId}
              confirmRef={confirmRef}
              keyName={selectedItem.username}
              delId={selectedItem.userId}
            />
            <Table data={users} column={columns}/>


    </>
  );
}

export default UsersTable;
