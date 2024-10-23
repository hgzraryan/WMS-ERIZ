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
import { WAREHOUSES_URL } from "../../utils/constants";
import WarehouseEdit from "../editModals/WarehouseEdit";
import useDeleteData from "../../hooks/useDeleteData";
import ComponentToConfirm from "../ComponentToConfirm";
import useRefreshData from "../../hooks/useRefreshData";
import { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CustomTable from "../CustomTable";
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function WareHousesList() {
  const axiosPrivate = useAxiosPrivate();  
  const navigate = useNavigate();
  const confirmWarehouseRef = useRef(""); 
  const [selectedItem, setSelectedItem] = useState("");  
  const [selectedItemId, setSelectedItemId] = useState(null);  
  const [currentPage, setCurrentPage] = useState(0);
  const [editRow, setEditRow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [usersPerPage, setUsersPerPage] = useState(Math.round(window.innerHeight / 100));
  const [searchCount,setSearchCount] = useState(null)
  const [searchId,setSearchId] = useState(null)
  const [searchTerms,setSearchTerms] = useState(null)
  const [wareHouseData, setWareHouseData] = useState([]);
  const [subCurrentPage, setSubCurrentPage] = useState(0);
  const [subWareHouseName, setSubWareHouseName] = useState('');

  const [itemsPerPage, setItemsPerPage] = useState(Math.round(window.innerHeight / 100));
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = wareHouseData.slice(itemOffset, endOffset);

  const {
    data: wareHouses,
    setData: setWarehouses,
    dataCount,
    dataReceived
  } = useGetData(WAREHOUSES_URL, currentPage, usersPerPage,searchCount,null,searchId,searchTerms);
  const { refreshData,data } = useRefreshData(WAREHOUSES_URL, usersPerPage);
  useEffect(()=>{
    setWarehouses(data)    
    },[data])

  const pageCount = searchCount?Math.ceil(searchCount/usersPerPage) :searchCount===0? 0:Math.ceil(dataCount/usersPerPage)
  const subPageCount = searchCount?Math.ceil(searchCount/usersPerPage) :searchCount===0? 0:Math.ceil(wareHouses?.length/itemsPerPage)
  
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
  const handleShowWareHouse = async (record, index) => {
    
    if(!record?.children?.length){
      
      const getData = async () => {
        try {
          const response = await axiosPrivate.get(`warehouseProducts/${record.warehouseId}`, );
        //console.log('get search data')
        setSubWareHouseName(record.name)
        setWareHouseData(response.data.jsonString);
        //setToggleSearchModal(false)  
        //handleSearchPageCount(response.data.count)    
      }catch (err) {
        console.error(err);
      }  
    }; 
    getData()
    console.log(record)
    console.log(index)
  }else{
    return
  }
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
          {record?.phone}
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
      Header: "ID",
      accessor: "productId",
      width: 80,
    },
    {
      Header: "Անվանում",
      accessor: "name",
      width: 200,
    },
    {
      Header: "Գին",
      accessor: "price",
      width: 100,
    },
    {
      Header: "Հատ",
      accessor: "quantity",
      width: 100,
    },
    {
      Header: "Քանակ",
      accessor: "quantity1",
      Cell: ({ row }) => (
        <div className="d-flex align-items-center">
        {row?.original?.dimensions?.volume || row?.original?.dimensions?.weight}         
        {row?.original?.dimensions?.weight?'կգ':row.original?.dimensions?.volume?'լ':''}         
        </div>
      ),
      width: 100,
    },
    {
      Header: "Գնման ամսաթիվ",
      accessor: "createdAt",
      Cell: ({ row }) => (
        <div className="d-flex align-items-center">
        {moment(row.original.createdAt).format('DD-MM-YYYY HH:mm')}         
        </div>
      ),
      width: 180,
    },
    {
      Header: "Արտ․ժամկետ",
      accessor: "producedDate",
      width: 180,
    },
    {
      Header: "Պիտ․ ժամկետ",
      accessor: "expiredAlertDay",
      width: 180,
    },
    {
      Header: "Մատակարար",
      accessor: "supplier",
      width: 180,
    },
    // {
    //   Header: "Գործողություններ",
    //   accessor: "actions",
    //   width: 200,
    // },
  ]);
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

  //-------------------------PAGINATION-----------------------------------//  

  const handlePageClick = (event) => {
    console.log(event)
    const newOffset = (event.selected * itemsPerPage) % currentItems.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
   //-------------------------DeleteData-----------------------------------//  

  const { handleDeleteItem } = useDeleteData(
    WAREHOUSES_URL,
    confirmWarehouseRef,
    selectedItem,
    setSelectedItemId,
    wareHouses,
    setWarehouses,
    "name",
    refreshData    
  );
   //-------------------------refreshPage-----------------------------------//  
  const refreshPage = () => {
    let paglink = document.querySelectorAll(".page-item");
    paglink[0]?.firstChild.click();
    refreshData()
  };
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
        className="dropdown p-3 d-flex justify-content-between"
        style={{ borderBottom: "3px solid #f6f6f6", display: "flex" }}
      >
        <div className="d-flex">

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
                  </div>
                  <div>

         <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret d-sm-inline-block d-none"
                  href="#"
                  data-bs-toggle="tooltip"
                  data-placement="top"
                  onClick={refreshPage}
                  title=""
                  data-bs-original-title="Refresh"
                  >
                  <span className="icon">
                    <span className="feather-icon">
                      <FeatherIcon icon="refresh-cw" />
                    </span>
                  </span>
                </a>
                    </div>
      </section>
      <div className="wareHouses__Wrapper">
        <div className="wareHouses__table">
        <Table
  dataSource={wareHouses}
  columns={wareHousesColumns}
  onRow={(record, index) => (
    {
    onClick: () => handleShowWareHouse(record, index),
  })}
  style={{ cursor: "pointer" }}
  size={"middle"}
  pagination={false}
  expandable={{
    defaultExpandAllRows:true,
    expandRowByClick:true,
    expandedRowRender: (record) => (
      <div className="custom-child-row">
        <h5>{record.name}</h5>
      </div>
    ),
    rowExpandable: (record) => !!record.children?.length,
    
  }}
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
            <h3>{wareHouseData.name}</h3>
          </div>

          {wareHouseData ? (
            // <Table
            //   dataSource={data1}
            //   columns={resizableColumns}
            //   components={components}
            //   onRow={(record, index) => ({
            //     onClick: () => console.log(record),
            //   })}
            //   style={{ cursor: "pointer" }}
            //   size={"middle"}
            //   pagination={false}
            //   onChange={onChange}
            //   showSorterTooltip={{
            //     target: "sorter-icon",
            //   }}
            // />
            <>
            <div
                    id="scrollableDiv"
                    style={{ height: "80vh", overflow: "auto"}}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <h3 style={{color:'#018a54', letterSpacing:'2px',}}>
                         {subWareHouseName}
                        </h3>
                         </div>
            <CustomTable
            data={currentItems}
            column={productsColumns}
            dataReceived={dataReceived}
            />
            <ReactPaginate
            previousLabel = {"Հետ"}    
            nextLabel = {"Առաջ"}
            pageCount = {subPageCount}
            onPageChange = {handlePageClick}
            //initialPage = {Number(pageNumber)}
            containerClassName={"pagination"}
            pageLinkClassName = {"page-link"}
            pageClassName = {"page-item"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            disabledLinkClassName={"disabled"}
            //activeLinkClassName={"active"}
            activeClassName={"active"}
            forcePage={subCurrentPage}
            renderOnZeroPageCount={null}
            />
            </div>
            </>
          ) : (
            ""
          )}
        </div>
       
      </div>
     
    </HelmetProvider>
  );
}

export default WareHousesList;
