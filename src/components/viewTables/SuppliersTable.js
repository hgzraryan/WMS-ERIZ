import React, { useMemo } from 'react'
import CustomTable from '../CustomTable';

function SuppliersTable({suppliers,
    confirmRef,
    selectedItem,
    selectedItemId,
    handleDeleteItem,
    handleOpenModal,
    handleCloseModal,
    productCategories}) {
      console.log(suppliers)
    const columns = useMemo(
        () => [
          {
            Header: (event) => (
              <>
                
                <div  className="supplierId">ID</div>
              </>
            ),
            accessor: "supplierId",
            sortable: true,
            width: 100,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="supplierName">Անվանում</div>
              </>
            ),
            accessor: "name",
            sortable: true,
            width: 300,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="supplierEmail">Էլ․ հասցե</div>
              </>
            ),
            accessor: "email",
            sortable: true,
            width: 300,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="supplierPhone">Հեռախոս</div>
              </>
            ),
            accessor: "supplierPhone",
            sortable: true,
            width: 300,
            
          },
          
        ],
        []
      );
  return (
    <>
          <CustomTable data={suppliers} column={columns} />

    </>
  )
}

export default SuppliersTable
