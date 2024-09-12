import React, { useEffect, useRef, useState } from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'
import ProductsCategoriesTable from '../viewTables/ProductsCategoriesTable'
import { Dropdown } from "react-bootstrap";
import AddProductClass from '../addViews/AddProductClass';
import useGetData from '../../hooks/useGetData';
import { PRODUCTCATEGORIES_URL } from '../../utils/constants';
import { useParams } from 'react-router-dom';
import useRefreshData from '../../hooks/useRefreshData';
import useDeleteData from '../../hooks/useDeleteData';
import AddProductsList from '../addViews/AddProductsList';

const customproductsClasses=[
  {
    id:1,
    name:'Electronics',
  },
  {
    id:2,
    name:'Clothing',
  },
  {
    id:3,
    name:'Food',
  },
]
function ProductsCategories() {
  const { pageNumber } = useParams();
  //const [productsClasses,setProductsClasses] = useState(customproductsClasses)
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(Number(pageNumber));
  const [searchCount,setSearchCount] = useState(null)
     const [searchId,setSearchId] = useState(null)
     const [searchTerms,setSearchTerms] = useState(null)
     const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100)));
     const [selectedItem, setSelectedItem] = useState("");
     const [selectedItemId, setSelectedItemId] = useState(null);
     const confirmProductCategoriesRef = useRef("");

  const {
    data: productCategories,
    setData: setProductCategories,
    dataCount
   } = useGetData(PRODUCTCATEGORIES_URL,currentPage,usersPerPage,searchCount,null,searchId,searchTerms);
   const pageCount = searchCount?Math.ceil(searchCount/usersPerPage) :searchCount===0? 0:Math.ceil(dataCount/usersPerPage)
   const { refreshData,data } = useRefreshData(PRODUCTCATEGORIES_URL, usersPerPage);
   useEffect(()=>{
    setProductCategories(data)
     },[data])
     const handleOpenModal = (user) => {
      setSelectedItemId(true);
      setSelectedItem((prev) => user);
    };
    const handleCloseModal = () => {
      setSelectedItemId(null);
    };
  const handleToggleCreateModal = (value) => {
    setIsOpen((prev) => value);
  };
  const { handleDeleteItem } = useDeleteData(
    PRODUCTCATEGORIES_URL,
    confirmProductCategoriesRef,
    selectedItem,
    setSelectedItemId,
    productCategories,
    setProductCategories,
    "name",
    refreshData 
  );
    return (
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Explore Products Classes</title>
          <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
        </Helmet>
      
        <section
          className="dropdown p-3"
          style={{ borderBottom: "3px solid #f6f6f6", display: "flex" }}
        >
          <div className="me-2">
            <h3>Ապրանքների դասակարգեր</h3>
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
                  Դասակարգ
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {isOpen && (
            <AddProductsList
              handleToggleCreateModal={handleToggleCreateModal}
              refreshData={() => refreshData()}
            />
          )}
        </section>
        <div className="productsClasses__Wrapper">
          <div className="productsClasses__table">
          {productCategories ? (
                    <ProductsCategoriesTable 
                      confirmRef={confirmProductCategoriesRef}
                      selectedItem={selectedItem}
                      selectedItemId={selectedItemId}
                      handleDeleteItem={handleDeleteItem}
                      handleOpenModal={handleOpenModal}
                      handleCloseModal={handleCloseModal}
                      productCategories={productCategories} 
                      setProductCategories={setProductCategories}
                    />

            ) : (
              ""
            )}
          </div>
        </div>
      </HelmetProvider>
    );
  
}

export default ProductsCategories
