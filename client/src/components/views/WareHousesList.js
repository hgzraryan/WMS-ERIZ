/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import FeatherIcon from "feather-icons-react";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import ResizableTitle from "./ResizableTitle";
import { Space, Table, Input, Button } from "antd";
import { Dropdown } from "react-bootstrap";
import AddWareHouse from "../addViews/AddWareHouse";
import useGetData from "../../hooks/useGetData";
import { USERS_URL, WAREHOUSES_URL } from "../../utils/constants";
import WarehouseEdit from "../editModals/WarehouseEdit";
import useDeleteData from "../../hooks/useDeleteData";
import ComponentToConfirm from "../ComponentToConfirm";

const data1 = [
  {
    productId: 21003,
    name: "Խնձոր",
    purchaseDate: "12-05-2024",
    count: 15000,
    unit: "կիլոգրամ",
    productionDate: "-",
    expiredDate: "-",
  },
  {
    productId: 21003,
    name: "Խնձոր",
    purchaseDate: "12-05-2024",
    count: 15000,
    unit: "կիլոգրամ",
    productionDate: "-",
    expiredDate: "-",
  },
  {
    productId: 21003,
    name: "Խնձոր",
    purchaseDate: "12-05-2024",
    count: 15000,
    unit: "կիլոգրամ",
    productionDate: "-",
    expiredDate: "-",
  },
  {
    productId: 21003,
    name: "Խնձոր",
    purchaseDate: "12-05-2024",
    count: 15000,
    unit: "կիլոգրամ",
    productionDate: "-",
    expiredDate: "-",
  },
  {
    productId: 21003,
    name: "Խնձոր",
    purchaseDate: "12-05-2024",
    count: 15000,
    unit: "կիլոգրամ",
    productionDate: "-",
    expiredDate: "-",
  },
  {
    productId: 21003,
    name: "Խնձոր",
    purchaseDate: "12-05-2024",
    count: 80,
    unit: "կիլոգրամ",
    productionDate: "-",
    expiredDate: "-",
  },
  {
    productId: 21003,
    name: "Խնձոր",
    purchaseDate: "12-05-2024",
    count: 13500,
    unit: "կիլոգրամ",
    productionDate: "-",
    expiredDate: "-",
  },
  {
    productId: 21003,
    name: "Խնձոր",
    purchaseDate: "12-05-2024",
    count: 15000,
    unit: "կիլոգրամ",
    productionDate: "-",
    expiredDate: "-",
  },
  {
    productId: 21003,
    name: "Բալ",
    purchaseDate: "12-05-2024",
    count: 2000,
    unit: "կիլոգրամ",
    productionDate: "-",
    expiredDate: "-",
  },
  {
    productId: 21003,
    name: "Խնձոր",
    purchaseDate: "12-05-2024",
    count: 2600,
    unit: "կիլոգրամ",
    productionDate: "-",
    expiredDate: "-",
  },
];

function WareHousesList() {
  const confirmWarehouseRef = useRef(""); 
  const [selectedItem, setSelectedItem] = useState("");  
  const [selectedItemId, setSelectedItemId] = useState(null);  
  const [currentPage, setCurrentPage] = useState(0);
  const [editRow, setEditRow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [usersPerPage, setUsersPerPage] = useState(
    Math.round(window.innerHeight / 100)
  );
  const [wareHouseDetails, setWareHouseDetails] = useState(false);
  
  const {
    data: wareHouses,
    setData: setWarehouses,
    refreshData,
    dataCount
  } = useGetData(WAREHOUSES_URL, currentPage, usersPerPage);
  const pageCount = Math.ceil(dataCount/usersPerPage)
  const { handleDeleteItem,updateUsersCount } = useDeleteData(
    WAREHOUSES_URL,
    confirmWarehouseRef,
    selectedItem,
    setSelectedItemId,
    "name",
    refreshData
    
  );
  const handleOpenModal = (user) => {
    setSelectedItemId(true);
    setSelectedItem((prev) => user);
  };
  const handleCloseModal = () => {
    setSelectedItemId(null);
  };	
  const handleOpenEditModal = (value) => {
    setEditRow((prev) => value);
    console.log(value);
  };
  const handleToggleCreateModal = (value) => {
    setIsOpen((prev) => value);
    console.log(value);
  };
//column search
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    setSearchText(selectedKeys[0]);
    if (dataIndex) {
      setSearchedColumn(dataIndex);
    }
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
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
            placeholder={`Search ${dataIndex}`}
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
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
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
            </Button>
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
          .includes(value.toLowerCase()),
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
//Warehouse info
  const handleShowWareHouse = (dat, dd) => {
    // console.log(dat)
    // console.log(dd)
    setWareHouseDetails(dat);
  };
  const wareHousesColumns = [
    {
      title: "ID",
      dataIndex: "warehouseId",
      width: "5%",
    },
    {
      title: "Անվանում",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Հեռախոս",
      dataIndex: "phone",
      render: (_, record) => (
        <Space>
          {record?.contact?.phone}
        </Space>
      ),
      width: "10%",
    },
    {
      title: "Հասցե",
      dataIndex: "address",
      render: (_, record) => (
        <Space>
          {record?.contact?.address?.city},{record?.contact?.address?.street}
        </Space>
      ),
      width: "20%",
    },
    {
      title: "Էլ․հասցե",
      dataIndex: "email",
      render: (_, record) => (
        <Space>
          {record?.contact?.email}
        </Space>
      ),
      width: "20%",
    },
    {
      title: "Պահեստապետ",
      dataIndex: "storekeeper",
      width: "10%",
    },
    {
      title: "Տեսակ",
      dataIndex: "type",
      render: (_, record) => (
        <Space>
          {record?.type === "Main" 
          ? 'Հիմնական' 
          :record?.type === "Mobile"
          ? 'Շրջիկ'
          :record?.type === "Other"
          ? 'Այլ':''}
        </Space>
      ),
      width: "10%",
    },
    {
      title: "Կոդ",
      dataIndex: "code",
      width: "10%",
    },
    {
      title: "Հաշվեկշիռ",
      dataIndex: "balance",
      width: "10%",
    },
    {
      title: "Կարգավիճակ",
      dataIndex: "state",
      render: (_, record) => (
        <Space>
          {record?.warehouseState === 1 
          ? 'Ակտիվ' 
          :record?.type === 0
          ? 'Ոչ ակտիվ'
          :''}
        </Space>
      ),
      width: "10%",
    },
    {
      title: "Գործողություններ",
      dataIndex: "actions",
      width: "10%",
      render: (_, record) => (
        <>
        <Space size="middle" onClick={() => handleOpenEditModal(record)}>
          <FeatherIcon icon="edit" width={20} />
          {/* <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                  data-bs-toggle="tooltip"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    handleOpenModal(record)
                  }}
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
                </a> */}
          {/* <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                  data-bs-toggle="tooltip"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    handleOpenModal(record)
                  }}
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
                </a> */}
          {/* <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                  data-bs-toggle="tooltip"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    handleOpenModal(record)
                  }}
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
                </a> */}
        </Space>
        <Space size="middle" onClick={() => handleOpenEditModal(record)}>
          {/* <FeatherIcon icon="edit" width={20} /> */}
          <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                  data-bs-toggle="tooltip"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    handleOpenModal(record)
                  }}
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
        </Space>
                  </>
      ),
    },
  ];
  const [productsColumns, setProductsColumns] = useState([
    {
      title: "ID",
      dataIndex: "productId",
      width: 100,
    },
    {
      title: "Անվանում",
      dataIndex: "name",
      width: 100,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Քանակ",
      dataIndex: "count",
      width: 100,
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: "Չափման միավոր",
      dataIndex: "unit",
      width: 100,
    },
    {
      title: "Գնման ամսաթիվ",
      dataIndex: "purchaseDate",
      width: 100,
    },
    {
      title: "Արտ․ժամկետ",
      dataIndex: "productionDate",
      width: 100,
    },
    {
      title: "Պիտ․ ժամկետ",
      dataIndex: "expiredDate",
      width: 100,
    },
    {
      title: "Գործողություններ",
      dataIndex: "actions",
      width: 100,
      render: (_, record) => (
        <Space size="middle" onClick={console.log(record)}>
          <FeatherIcon icon="edit" width={20} />
        </Space>
      ),
    },
  ]);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  //resize column
  const handleResize =
    (index) =>
    (e, { size }) => {
      const nextColumns = [...productsColumns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      setProductsColumns(nextColumns);
    };
  const components = {
    header: {
      cell: ResizableTitle,
    },
  };
  const resizableColumns = productsColumns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Warehouse</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      <ComponentToConfirm
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
              handleDeleteItem={handleDeleteItem}
              selectedItemId={selectedItemId}
              confirmRef={confirmWarehouseRef}
              keyName={selectedItem.name}
              delId={selectedItem.warehouseId}
            />
      {editRow && (
        <WarehouseEdit
          warehouse={editRow}
          setEditRow={setEditRow}
          refreshData={refreshData}
        />
      )}
      <section
        className="dropdown p-3"
        style={{ borderBottom: "3px solid #f6f6f6", display: "flex" }}
      >
        <div className="me-2">
          <h3>Պահեստներ</h3>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="btn btn-sm btn-outline-secondary flex-shrink-0 dropdown-toggle d-lg-inline-block"
            >
              Ավելացնել նոր
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setIsOpen(true)}>
                Պահեստ
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {isOpen && (
          <AddWareHouse
            handleToggleCreateModal={handleToggleCreateModal}
            refreshData={() => refreshData()}
          />
        )}
      </section>
      <div className="wareHouses__Wrapper">
        <div className="wareHouses__table">
          <Table
            dataSource={wareHouses}
            columns={wareHousesColumns}
            onRow={(record, index) => ({
              onClick: () => handleShowWareHouse(record, index),
            })}
            style={{ cursor: "pointer" }}
            size={"middle"}
            pagination={false}
          />
        </div>
        <div
          className="wareHouses__container"
          style={{
            margin: "2px",
            padding: "20px",
            border: "4px solid #f6f6f6",
          }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <h3>{wareHouseDetails.name}</h3>
          </div>
          {wareHouseDetails ? (
            <Table
              dataSource={data1}
              columns={resizableColumns}
              components={components}
              onRow={(record, index) => ({
                onClick: () => console.log(record),
              })}
              style={{ cursor: "pointer" }}
              size={"middle"}
              pagination={false}
              onChange={onChange}
              showSorterTooltip={{
                target: "sorter-icon",
              }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </HelmetProvider>
  );
}

export default WareHousesList;
