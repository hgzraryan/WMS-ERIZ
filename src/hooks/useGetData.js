import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

const useGetData = (url,currentPage,usersPerPage,searchCount=null,searchUrl=null,searchParams=null) => {
    const [data, setData] = useState([]);
    const [dataCount, setDataCount] = useState(null);
    const axiosPrivate = useAxiosPrivate();  
    const navigate = useNavigate();  
    const location = useLocation();    

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
    if(!searchCount){

      const getData = async () => {
        try {
          const response = await axiosPrivate.post(url,{
            signal: controller.signal,
            page: currentPage===0?1:currentPage,
            onPage: usersPerPage,
          });
            isMounted &&
              setData((prevUsers) => response.data.jsonString);
              setDataCount(response.data.count)
            } catch (err) {
              console.error(err);
              navigate("/login", { state: { from: location }, replace: true });
            }
          };
          
          getData();
          
        }else{
          const getData = async () => {
          try {
            const response = await axiosPrivate.post(searchUrl, {
              params: searchParams,
              page: currentPage===0?1:currentPage,
              onPage: usersPerPage,
              signal: controller.signal
            });
            //console.log('get search data')
            setData(response.data.jsonString);
            //setToggleSearchModal(false)  
            //handleSearchPageCount(response.data.count)    
          }catch (err) {
            console.error(err);
          }  
        }; 
        getData()
        }
          return () => {
          isMounted = false;
          controller.abort();
        };
      }, [url,currentPage]);

      const getData = async () => {
          try {
            const response = await axiosPrivate.get(url);
            setTimeout(() => {             
              
                  setData((prevUsers) => response.data.jsonString);
                 // setCurrentPage((prev) => prev = 1);
              
            }, 500);
          } catch (err) {
            console.error(err);
            //navigate("/login", { state: { from: location }, replace: true });
          }
        };
        const refreshData = async () => {
          try {
            const controller = new AbortController();
            const response = await axiosPrivate.post(url, {
              signal: controller.signal,
              page: 1,
              onPage: usersPerPage,
            });
            setData(response.data.jsonString);
          } catch (err) {
            console.error(err);
            if (err.name !== "AbortError") {
              navigate("/login", { state: { from: location }, replace: true });
            }
          }
        };
      return {
        data,
        setData,
        getData,
        dataCount,
        refreshData
    }
}
export default useGetData;