import React, { useState, useEffect, useRef } from "react";
import { axiosPrivate } from "../api/axios";
import useDebounce from "../hooks/useDebounce";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

export const ColumnFilter = ({
  column,
  setData,
  data,
  id,
  placeholder,
  getUrl = "",
  searchUrl = "",
  filterData,
  setFilterData,
  handleSearchPageCount,
}) => {
  const [searchTerms, setSearchTerms] = useState(filterData?.[id] || null);
  const [toggleSearchModal, setToggleSearchModal] = useState(false);
  const [usersPerPage, setUsersPerPage] = useState(
    Math.round(window.innerHeight / 100)
  );
  const modalRef = useRef();
  const debouncedSearch = useDebounce(searchTerms, 1000);
  const [keyPressed, setKeyPressed] = useState(false);

  const handleKeyDown = () => {
    setKeyPressed(true);
  };

  const handleSearch = async () => {
    const controller = new AbortController();
    const updateFilterdObject = { ...filterData, [id]: searchTerms };
    for (let i in updateFilterdObject) {
      if (!updateFilterdObject[i]) delete updateFilterdObject[i];
    }
    const params = Object.keys(updateFilterdObject).map((key) => ({
      column: key,
      query: updateFilterdObject[key],
    }));
    
    setFilterData(updateFilterdObject);
    try {
      const response = await axiosPrivate.post(searchUrl, {
        params: params,
        page: 1,
        onPage: usersPerPage,
        signal: controller.signal,
      });
      setData(response.data.jsonString);
      handleSearchPageCount(
        {
        count:response.data.count,
        params:params
      
      })  
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmptySearch = async () => {
    const controller = new AbortController();
    setSearchTerms("");
    const updateFilterdObject = { ...filterData, [id]: "" };
    for (let i in updateFilterdObject) {
      if (updateFilterdObject[i] === "") delete updateFilterdObject[i];
    }
    setFilterData(updateFilterdObject);
    handleKeyDown(true);
    const params = Object.keys(updateFilterdObject).map((key) => ({
      column: key,
      query: updateFilterdObject[key],
    }));
    if (params.length) {      
      try {
        const response = await axiosPrivate.post(searchUrl, {
          params: params,
          page: 1,
          onPage: usersPerPage,
          signal: controller.signal,
        });
        setData(response.data.jsonString);
        handleSearchPageCount(
          {
          count:response.data.count,
          id:id,
          searchTerms:searchTerms
        
        })  
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const response = await axiosPrivate.post(getUrl, {
          signal: controller.signal,
          page: 1,
          onPage: usersPerPage,
        });
        setKeyPressed(false);
        setToggleSearchModal(false);
        handleSearchPageCount({
          count: "",
          params:params

        });
        setData(response.data.jsonString);
      } catch (err) {
        console.error(err);
      }
    }
  };
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
  
    const fetchData = async () => {
      try {
        if (toggleSearchModal && debouncedSearch === '' && keyPressed) {
          const updatedFilteredObject = { ...filterData, [id]: '' };
          for (let key in updatedFilteredObject) {
            if (!updatedFilteredObject[key]) delete updatedFilteredObject[key];
          }
          const params = Object.keys(updatedFilteredObject).map((key) => ({
            column: key,
            query: updatedFilteredObject[key],
          }));
    
          setFilterData(updatedFilteredObject);
  
          let response;
          if (!params.length) {
            response = await axiosPrivate.post(getUrl, {
              signal: controller.signal,
              page: 1,
              onPage: usersPerPage,
            });
            setKeyPressed(false);
            setToggleSearchModal(false);
            handleSearchPageCount({
              count: '',
              id: '',
              searchTerms: ''
            });
           
          } else if (params.length) {
            response = await axiosPrivate.post(searchUrl, {
              params: params,
              page: 1,
              onPage: usersPerPage,
              signal: controller.signal,
            });
            handleSearchPageCount({
              count: response.data.count,
              params: params
            });
           
          }
            //if(isMounted){

              setData(response.data.jsonString);
           // }
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [debouncedSearch]);

  const handleSearchInputChange = (value) => {
    setSearchTerms(value);
    //setFilterData({[id]:debouncedSearch})
  };

  const handleSearchClick = (e) => {
    e.stopPropagation();
    setToggleSearchModal((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setToggleSearchModal(false);
    }
  };

  useEffect(() => {
    if (toggleSearchModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSearchModal]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <span
          className="d-flex justify-content-center align-items-center"
          onClick={handleSearchClick}
          style={{
            backgroundColor: searchTerms ? "#4eafcb" : "",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          <FeatherIcon icon="search" width={15} height={15} />
        </span>
        {toggleSearchModal && (
          <div
            ref={modalRef}
            style={{
              position: "absolute",
              padding: "8px",
              backgroundColor: "#ffffff",
              borderRadius: "5px",
              boxShadow: "0 6px 16px 0 rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
            }}
          >
            <input
              type={id === "age" || id === "patientId" ? "number" : "search"}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                handleSearchInputChange(e.target.value);
              }}
              value={searchTerms || ""}
              onKeyDown={handleKeyDown}
              placeholder={placeholder ? placeholder : id}
              style={{
                minWidth: "200px",
                backgroundColor: "#fff",
                border: "2px solid #f6f6f6",
                borderRadius: "5px",
                padding: "5px",
              }}
            />
            <div className="d-flex">
              <button
                className="btn__search"
                onClick={handleSearch}
                style={{
                  backgroundColor: "#4eafcb",
                  color: "#fff",
                  margin: "5px",
                  borderRadius: "5px",
                  border: "none",
                  padding: "5px",
                }}
                disabled={!searchTerms}
              >
                <FeatherIcon icon="search" width={15} height={15} /> Փնտրել
              </button>
              <button
                className="btn__search"
                onClick={() => {
                  //setToggleSearchModal(false);
                  handleEmptySearch();

                  //handleSearchInputChange('');
                }}
                style={{
                  backgroundColor: "#f6f6f6",
                  margin: "5px",
                  borderRadius: "5px",
                  border: "none",
                  padding: "5px",
                }}
                //disabled={!searchTerms}
              >
                Ջնջել
              </button>
              <button
                className="btn__search"
                onClick={(e) => handleSearchClick(e)}
                style={{
                  backgroundColor: "#f6f6f6",
                  margin: "5px",
                  borderRadius: "5px",
                  border: "none",
                  padding: "5px",
                }}
              >
                Փակել
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
