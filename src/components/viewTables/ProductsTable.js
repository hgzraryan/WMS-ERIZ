import React, { useMemo } from 'react'
import CustomTable from '../CustomTable';
import "../../dist/css/data-table.css";

function ProductsTable({
  confirmRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  products,
  setProducts,
  refreshData
}) {
    const columns = useMemo(
        () => [
          {
            Header: (event) => (
              <>
                
                <div  className="columnHeader">ID</div>
              </>
            ),
            accessor: "productId",
            sortable: true,
            width: 100,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="name">Անվանում</div>
              </>
            ),
            accessor: "name",
            sortable: true,
            width: 300,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="name">Դասակարգ</div>
              </>
            ),
            accessor: "productCategory",
            sortable: true,
            width: 200,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="name">Արժեք</div>
              </>
            ),
            accessor: "price",
            sortable: true,
            width: 150,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="name">Արժույթ</div>
              </>
            ),
            accessor: "currency",
            sortable: true,
            width: 150,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="name">Մատակարար</div>
              </>
            ),
            accessor: "supplier",
            sortable: true,
            width: 300,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="name">Պահեստ</div>
              </>
            ),
            accessor: "stock",
            sortable: true,
            width: 300,
            
          },
          
        ],
        []
      );
  return (
    <>
          <CustomTable data={products} column={columns} />

    </>
  )
}


export default ProductsTable
