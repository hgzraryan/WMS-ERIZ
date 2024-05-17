import React from "react";
import { axiosPrivate } from "../api/axios";
import { useState } from "react";
import { useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import useGetData from "../hooks/useGetData";
export const ColumnFilter = ( {setData,id,placeholder,url} ) => {  
  const [searchTerms, setSearchTerms] = useState({});

  const debouncedSearch = useDebounce(searchTerms,1000)
//todo data needed for correct work
  //const {
  //   data: mainData,
  // } = useGetData('/users');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getData = async () => {
      try {
        const response = await axiosPrivate.get(
          "/users"
          // , {
          //    searchBy: searchBy,
          //    searchString: seachSatring
          //   }
        );
        setData((prev) => {
          return [
            {
              email: "azat@mail.ru",
              firstname: "Axvan",
              lastname: "Sahakyan",
              midname: "Hayriki",
              isActive:0,
            roles:{}}]})
        // isMounted &&
        // isMounted &&
        //   setUsers((prevUsers) => response.data);
      } catch (err) {
        console.error(err);
      }
    };
    // if (Object.values(searchTerms).toString().length) {
    //   getData();
    // } else {
    //   setData(mainData);
    // }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [debouncedSearch]);
  const handleSearchInputChange = (column, value) => {
    const updatedSearchTerms = {  [column]: value };
    setSearchTerms(updatedSearchTerms);
  };
  return (
    <>
     <input
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleSearchInputChange(id, e.target.value)}
            placeholder={placeholder ? `${placeholder}`:`${id}`}
            style={{width:'100%'}}
          />
    </>
    );
};
