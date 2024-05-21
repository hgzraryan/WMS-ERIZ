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
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";

import { SearchOutlined } from "@ant-design/icons";
import { USERS_URL } from "../../utils/constants";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


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
  const [allUsers, setAllUsers] = useState([
    
      {
          "contact": {
              "address": {
                  "street": "Babyan",
                  "city": "Yerevan",
                  "state": "Scrub Island",
                  "country": "Anguilla",
                  "zipCode": "4897"
              },
              "phone": "+37415544984",
              "emergencyContactName": "Artur Stepanyanadf",
              "emergencyContactNumber": "+37415488789"
          },
          "roles": {
              "User": 2001,
              "Doctor": 9578
          },
          "_id": "663be39890298492324a77b1",
          "firstname": "Artur",
          "lastname": "Stepanyan",
          "birthday": "1974-05-16",
          "email": "Daasdqwesdfqwvvfvit@asd.qw",
          "maritalStatus": "married",
          "username": "hgzraryan2sdf",
          "password": "$2b$10$Xalrd27WXc8x78EsdgubdeOqI.oQtOEJXRXeUFROj0bNBe/r1RBDC",
          "additionalData": "sadfdasfsadf",
          "gender": "Male",
          "isActive": 0,
          "refreshToken": [],
          "createdAt": "2024-05-09T00:42:00.305Z",
          "updatedAt": "2024-05-09T00:42:00.305Z",
          "userId": 4991,
          "__v": 0
      },
      {
          "contact": {
              "address": {
                  "street": "Նանսենի 5/8-18",
                  "city": "Երևան",
                  "state": "Արմավիր",
                  "country": "Հայաստան",
                  "zipCode": "7895"
              },
              "phone": "+3745116465"
          },
          "roles": {
              "User": 2001,
              "Doctor": 9578
          },
          "_id": "663b9532071251f0f15f8b1b",
          "firstname": "BabayanStepanVaxinki",
          "lastname": "BabayanStepanVaxinki",
          "birthday": "1963-05-15",
          "email": "Dcxzczavit@azxcxzsd.qw",
          "maritalStatus": "single",
          "username": "Pedro123asdasdas",
          "password": "$2b$10$2oZ7wl76nYaAL3nYL03r0.T9dQRnq9xyKqtM6Jf5f55F96WaRZ8T2",
          "gender": "Male",
          "isActive": 1,
          "refreshToken": [],
          "createdAt": "2024-05-08T19:07:30.371Z",
          "updatedAt": "2024-05-08T19:07:30.371Z",
          "userId": 4847,
          "__v": 0
      },
      {
          "contact": {
              "address": {
                  "street": "cxvbxcvb",
                  "city": "cxvbxcvb",
                  "state": "Արագածոտն",
                  "country": "Հայաստան",
                  "zipCode": "1615"
              },
              "phone": "+37412454545"
          },
          "roles": {
              "User": 2001,
              "Doctor": 9578
          },
          "_id": "663b936f6b0d537b20e254aa",
          "firstname": "asdfsafasdf",
          "lastname": "fsdfasdf",
          "birthday": "1955-05-11",
          "email": "dfsasdgs@sdasdqwfs.gdf",
          "maritalStatus": "married",
          "username": "Pedro123asdfsd",
          "password": "$2b$10$atiVpIywaICCTYibIv4TjO8nFUdWq75dZC8DuTTkxHqcENRhoX3Xm",
          "gender": "Male",
          "isActive": 1,
          "refreshToken": [],
          "createdAt": "2024-05-08T18:59:59.302Z",
          "updatedAt": "2024-05-08T18:59:59.302Z",
          "userId": 4842,
          "__v": 0
      },
      {
          "contact": {
              "address": {
                  "street": "Նանսենի 5/8-18",
                  "city": "Երևան",
                  "state": "Long Island",
                  "country": "Bahamas",
                  "zipCode": "7895"
              },
              "phone": "+37415454544"
          },
          "roles": {
              "User": 2001
          },
          "_id": "663b91ac0e7cab53da394127",
          "firstname": "Hamlet",
          "lastname": "Gagiki",
          "birthday": "1984-05-10",
          "email": "Daasdasvit@asasdd.qw",
          "maritalStatus": "married",
          "username": "Hamo123",
          "password": "$2b$10$zYleylTTy1TCSNGOgO40ieHHpyaLWcG38pmrsud1NA8BZOYhOMiGe",
          "gender": "Male",
          "isActive": 1,
          "refreshToken": [],
          "createdAt": "2024-05-08T18:52:28.819Z",
          "updatedAt": "2024-05-17T00:23:05.978Z",
          "userId": 4832,
          "__v": 0
      },
      {
          "contact": {
              "address": {
                  "street": "Նանսենի 5/8-18",
                  "city": "Երևան",
                  "state": "Երևան",
                  "country": "Հայաստան",
                  "zipCode": "7895"
              },
              "phone": "+37412455458"
          },
          "roles": {
              "User": 2001
          },
          "_id": "663b8fead75262c0029b4dcc",
          "firstname": "Պետրոս",
          "lastname": "Մարտիրոսի",
          "birthday": "1985-05-09",
          "email": "Pedro@asd.qw",
          "maritalStatus": "married",
          "username": "Pedro123",
          "password": "$2b$10$Gxa/kDK2/pc1cdvmdudTfuqKiprZE6RVlV7LxuaEoMkUOVYjxIuo6",
          "gender": "Male",
          "isActive": 1,
          "refreshToken": [],
          "createdAt": "2024-05-08T18:44:58.019Z",
          "updatedAt": "2024-05-08T18:44:58.019Z",
          "userId": 4828,
          "__v": 0
      },
      {
          "contact": {
              "address": {
                  "street": "Babyan",
                  "city": "Yerevan",
                  "state": "Արմավիր",
                  "country": "Հայաստան",
                  "zipCode": "4897"
              },
              "phone": "+37448451215",
              "emergencyContactName": "Artur Stepanyansfgsd",
              "emergencyContactNumber": "+37448451215"
          },
          "roles": {
              "User": 2001,
              "Admin": 5150
          },
          "_id": "663b680a6a902ea9382868f2",
          "firstname": "adadasdasda",
          "lastname": "asdasdasd",
          "birthday": "1994-05-11",
          "email": "dfssadags@sasdasdfs.gdf",
          "maritalStatus": "single",
          "username": "hgzraryan2sdfsdfas",
          "password": "$2b$10$PFA9.S8SU9HNGh0Ydns2UulB2e9Cs2Myc5hoJM5xIcw5W0eYjfBOu",
          "additionalData": "sdfgsdfgsdfgsdfg",
          "gender": "Female",
          "isActive": 0,
          "refreshToken": [],
          "createdAt": "2024-05-08T15:54:50.723Z",
          "updatedAt": "2024-05-08T15:54:50.723Z",
          "userId": 4773,
          "__v": 0
      },
      {
          "contact": {
              "address": {
                  "street": "asfasdfsa",
                  "city": "asdfsadfas",
                  "state": "Queensland",
                  "country": "Australia",
                  "zipCode": "23313123"
              },
              "phone": "+37423423423",
              "emergencyContactName": "sadfasdfasd",
              "emergencyContactNumber": "+3743324242342"
          },
          "roles": {
              "User": 2001,
              "Admin": 5150
          },
          "_id": "6633a78152db8a4f95f5d373",
          "firstname": "Artur",
          "lastname": "Stepanyan",
          "birthday": "1963-05-14",
          "email": "dfasdavbrtsgs@sdfs.gdf",
          "maritalStatus": "married",
          "username": "hgzraryan2safasdf",
          "password": "$2b$10$yLTVGsQ3Lu4IA35iaM8r2uOgA/MJMIs.m7OUTEkHcvco8T4fC2Rf.",
          "additionalData": "adddit",
          "gender": "Male",
          "isActive": 0,
          "refreshToken": [],
          "createdAt": "2024-05-02T18:47:29.700Z",
          "updatedAt": "2024-05-02T18:47:29.700Z",
          "userId": 4270,
          "__v": 0
      },
      {
          "contact": {
              "address": {
                  "street": "Նանսենի 5/8-18",
                  "city": "Երևան",
                  "state": "Cəlilabad",
                  "country": "Azerbaijan",
                  "zipCode": "7895"
              },
              "phone": "+37445484884",
              "emergencyContactName": "Դավիթ Տիգրանյան",
              "emergencyContactNumber": "+37418998849"
          },
          "roles": {
              "User": 2001,
              "Sampler": 1212
          },
          "_id": "662e1923b5ea3155537e2a35",
          "firstname": "Artur",
          "lastname": "Stepanyan",
          "birthday": "2024-04-18",
          "email": "dfsasdwqqgs@sdfs.gdf",
          "maritalStatus": "married",
          "username": "hgzraryan2asdqwq",
          "password": "$2b$10$Tkd7zPm/n3GW0sHCvR5gBegbomCoCuraaQEhWsjNnu397ggPfJF.K",
          "additionalData": "asdasdasdas",
          "gender": "Male",
          "isActive": 1,
          "refreshToken": [],
          "createdAt": "2024-04-28T13:38:43.102Z",
          "updatedAt": "2024-04-29T00:03:24.781Z",
          "userId": 3437,
          "__v": 0
      },
      {
          "contact": {
              "address": {
                  "street": "Babyan",
                  "city": "Yerevan",
                  "state": "Շիրակ",
                  "country": "Հայաստան",
                  "zipCode": "4897"
              },
              "phone": "+37448489415",
              "emergencyContactName": "Artur Stepanyan",
              "emergencyContactNumber": "+37415949458"
          },
          "roles": {
              "User": 2001
          },
          "_id": "662e1888b5ea3155537e2a2f",
          "firstname": "Artur",
          "lastname": "Stepanyan",
          "birthday": "2002-04-17",
          "email": "dfdfgertsgs@sdfs.gdf",
          "maritalStatus": "married",
          "username": "hgzraryan2erwewe",
          "password": "$2b$10$7AiWwcx3EyE3jNVAD20wYOnHjjBJUBSWrxTKDWRgDQakWjOD8qETe",
          "additionalData": "sdfgsdfgsdfg",
          "gender": "Male",
          "isActive": 1,
          "refreshToken": [],
          "createdAt": "2024-04-28T13:36:08.600Z",
          "updatedAt": "2024-04-30T22:51:37.516Z",
          "userId": 3436,
          "__v": 0
      },
      {
          "contact": {
              "address": {
                  "street": "Babyan",
                  "city": "Yerevan",
                  "state": "Լոռի",
                  "country": "Հայաստան",
                  "zipCode": "4897"
              },
              "phone": "+37448948988",
              "emergencyContactName": "Artur Stepanyanasdf",
              "emergencyContactNumber": "+37454894984"
          },
          "roles": {
              "User": 2001
          },
          "_id": "662e1656b5ea3155537e2a25",
          "firstname": "Artur",
          "lastname": "Stepanyan",
          "birthday": "2024-04-25",
          "email": "dfdasdasdsgs@sdfs.gdf",
          "maritalStatus": "married",
          "username": "hgzraryan2asdf",
          "password": "$2b$10$GV9AiFG0Wyx2pyWA3trPsexJh1QLwxazTWDOSoYJcy0bqC6/szXYu",
          "additionalData": "asfasdfasd",
          "gender": "Male",
          "isActive": 1,
          "refreshToken": [],
          "createdAt": "2024-04-28T13:26:46.244Z",
          "updatedAt": "2024-04-30T22:52:15.496Z",
          "userId": 3434,
          "__v": 0
      },
      {
          "roles": {
              "User": 2001,
              "Editor": 1984,
              "Admin": 5150
          },
          "_id": "649036c19537327c47ed4287",
          "firstname": "Harutyun",
          "lastname": "Gzraryan",
          "username": "hgzraryan2",
          "password": "$2b$10$ao1UxLF/SALTIaaftcgklODCKIS6XYyNlaFCqGycF./RGSww8GZcW",
          "isActive": 1,
          "refreshToken": [
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhnenJhcnlhbjIiLCJpYXQiOjE3MTU4OTUwNzksImV4cCI6MTcxNTk4MTQ3OX0.iRB--J5N5_z-69L2ocr-K-ve89mak_ux0FndeQBAROs"
          ],
          "__v": 21618,
          "email": "hgzraryan@gmail.com",
          "updatedAt": "2024-05-17T01:31:19.954Z",
          "userId": 375,
          "additional": []
      }
  ]
  
    ); // Change here: Initialize allUsers state
  const searchInput = useRef(null);
  useEffect(() => {
      axiosPrivate
        .get(USERS_URL)
        .then((resp) => {
          setAllUsers(resp?.data?.jsonString);
        })        
        .catch((err) => {
          console.log(err);
          navigate("/login", { state: { from: location }, replace: true });

        });
  }, []);
 const handleFilter = (value,dataIndex,asd) => {
    return allUsers.map((el)=>el[dataIndex]
    .toString()
    .toLowerCase()
    .includes(value.toLowerCase()))
     
 }
  const getColumnSearchProps = (dataIndex) => {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Փնտրել`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: "block",
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              debugger
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters,confirm)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            {/* <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                console.log("dataIndex", dataIndex);
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button> */}
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? "#1677ff" : undefined,
          }}
        />
      ),
      // onFilter: (value, record) =>
      //   record[dataIndex]
      //     .toString()
      //     .toLowerCase()
      //     .includes((value).toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text, record) => {
        const highlightText = record[dataIndex].toString();
        return (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={highlightText}
          />
        );
      },
    };
  };
   const [usersColumns, setUsersColumns] = useState([
    {
      title: "",
      dataIndex: "photo", 
      render: (_, record) => (
        <img
          src={record.photo || DefaultProfileImage}
          alt="User Photo"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),      
      width: 65,
    },
    {
      title: "ID",
      dataIndex: "userId",
      onFilter: (value, record) =>
        record["userId"]
          .toString()
          .toLowerCase()
          .includes((value).toLowerCase()),
      ...getColumnSearchProps("userId"),
      width: 80,
    },
    {
      title: "Ծածկանուն",
      dataIndex: "username",
      width:60,
      ...getColumnSearchProps("username"),

    },
    {
      Header: 'Անուն',
      dataIndex: "firstname",
      ...getColumnSearchProps("firstname"),
      width: 190,

    },
    {
      title:'Ազգանուն',
      dataIndex: "lastname",
      ...getColumnSearchProps("lastname"),
      width: 190,
    },
    {
      title:'Էլ․ հասցե',
      dataIndex: "email",
      ...getColumnSearchProps("email"),
      width: 190,

    },
    {
      title: "Դերեր",
      dataIndex: "roles",
      render: (_,value ) =>
        Object.keys(value.roles).map((role) => (
          <>
          <span className={setUserTypeStyle(role)} key={role}>          
            {(role === "User" ? "Օգտատեր" :
                role === "Doctor" ? "Բժիշկ" :
                role === "Editor" ? "Փոփոխող" :
                role === "Sampler" ? "Նմուշառող" :
                role === "Approver" ? "Հաստատող" :
                role === "Admin" ? "Ադմին" :
                "Unknown Role")}
          </span>
                </>
        )),
      width: 150,
    },
    {
      title: "Գործողություններ",
      dataIndex: "actions",
      render: (_, row ) => (
        <div className="d-flex align-items-center">
          <div className="d-flex">
          <a
              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
              data-bs-toggle="tooltip"
              data-placement="top"
              title="Edit"
              href="#"
              onClick={() => handleOpenEditModal(row)}

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
              onClick={() => handleOpenModal(row)}
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
                  <FeatherIcon icon="power" style={{color: row?.isActive ? 'green' : 'red' }} />
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
  ]);
  
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
  //resize column
  const handleResize =
    (index) =>
    (e, { size }) => {
      const nextColumns = [...usersColumns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      setUsersColumns(nextColumns);
    };
  const components = {
    header: {
      cell: ResizableTitle,
    },
  };
  const resizableColumns = usersColumns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));
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
                rowData={disableRow}
                refreshData={refreshData}
              />
            )}
            <ComponentToConfirm
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
              handleDeleteItem={handleDeleteItem}
              selectedItemId={selectedItemId}
              confirmUserRef={confirmRef}
              keyName={selectedItem.username}
              delId={selectedItem.userId}
            />
      <Table
              dataSource={users}
              columns={resizableColumns}
              components={components}
              // onRow={(record, index) => ({
              //   onClick: () => console.log(record),
              // })}
              style={{ cursor: "pointer" }}
              size={"middle"}
              pagination={false}
              onChange={onChange}
              showSorterTooltip={{
                target: "sorter-icon",
              }}
            />

    </>
  );
}

export default UsersTable;
