/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from 'react'
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useLocation, useNavigate } from "react-router-dom";
import ResizableTitle from "../views/ResizableTitle";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PartnerEdit from '../editModals/PartnerEdit';
import ComponentToConfirm from '../ComponentToConfirm';

function PartnersTable(
    {
      confirmPartnerRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
        partners,
        setPartners,
        refreshData
    }
) {
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const [editRow, setEditRow] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
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
          onFilter: (value, record) =>
            record[dataIndex]
              .toString()
              .toLowerCase()
              .includes((value).toLowerCase()),
          onFilterDropdownOpenChange: (visible) => {
            if (visible) {
              setTimeout(() => searchInput.current?.select(), 100);
            }
          },
          onCell: (text, record) => {
            //const highlightText = record[dataIndex].toString();
            return (
                {text}
            //   <Highlighter
            //     highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            //     searchWords={[searchText]}
            //     autoEscape
            //     textToHighlight={highlightText}
            //   />
            );
          },
        };
      };
      const [partnersColumns, setPartnersColumns] = useState([
       
        {
          title: "ID",
    dataIndex: "partnerId",
    onFilter: (value, record) =>
      record.partnerId.toString().toLowerCase().includes(value.toLowerCase()),
    ...getColumnSearchProps("partnerId"),
    width: 80,
        },
        {
          title: "Անվանում",
          dataIndex: "name",
          onFilter: (value, record) =>
            record["partnerId"]
          .toString()
          .toLowerCase()
          .includes((value).toLowerCase()),
          ...getColumnSearchProps("name"),
          width:150,
    
        },
        {
          title: 'Պատսխանատու անձ',
          dataIndex: "respPersonFullName",
          ...getColumnSearchProps("respPersonFullName"),
          width: 150,
    
        },
        {
          title:'Կազմ․ տեսակը',
          dataIndex: "companyType",
          filters: [
            { text: 'Ֆիզ անձ', value: 'Physical' },
            { text: 'Իրավ․ անձ', value: 'Legal' },
            { text: 'Այլ', value: 'Other' },
          ],
          onFilter: (value, record) => record?.companyType?.indexOf(value) === 0,
          render: ( _,record) => (
            <Space>
              {record?.companyType==="Legal"
              ?'Իրավ․ անձ'
              :record?.companyType==="Physical"
              ?'Ֆիզ անձ'
              :record?.companyType==="Other"
              ?'Այլ':''}
            </Space>
          ),
          width: 120,
        },
        {
            title: "Հեռախոս",
            dataIndex: "phone",
            render: ( _,record) => (
              <Space>
                {record?.contact?.phone}
              </Space>
            ),
            ...getColumnSearchProps("phone"),
            width: 100,
          },
        {
          title:'Էլ․ հասցե',
          dataIndex: "email",
          render: ( _,record) => (
            <Space>
              {record?.contact?.email}
            </Space>
          ),
          ...getColumnSearchProps("email"),
          width: 120,
    
        },
        {
            title: "Հասցե",
            dataIndex: "address",
            render: (_,record) => (
              <Space>
                {record?.contact?.address?.city},{record?.contact?.address?.street}
              </Space>
            ),
            width: 150,
          },
        {
          title: "Գործընկերոջ տեսակը",
          dataIndex: "partnerType",
          render: ( _,record) => (
            <Space>
              {record?.partnerType==="Producer"
              ?'Արտադրող'
              :record?.partnerType==="Reseller"
              ?'Վերավաճառող'
              :record?.partnerType==="Investor"
              ?'Ներդրող':''}
            </Space>
          ),
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
      ]);
      const handleOpenEditModal = (value) => {
        setEditRow((prev) => value);
      };
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
        //console.log("params", pagination, filters, sorter, extra);
      };
      //resize column
      const handleResize =
        (index) =>
        (e, { size }) => {
          const nextColumns = [...partnersColumns];
          nextColumns[index] = {
            ...nextColumns[index],
            width: size.width,
          };
          setPartnersColumns(nextColumns);
        };
      const components = {
        header: {
          cell: ResizableTitle,
        },
      };
      const resizableColumns = partnersColumns.map((col, index) => ({
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
        <PartnerEdit partner={editRow} setEditRow={setEditRow} refreshData={refreshData}/>
      )
    }
     <ComponentToConfirm
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
              handleDeleteItem={handleDeleteItem}
              selectedItemId={selectedItemId}
              confirmRef={confirmPartnerRef}
              keyName={selectedItem.name}
              delId={selectedItem.partnerId}
            />
        <Table
              dataSource={partners}
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
  )
}

export default PartnersTable
