import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { PATIENTS__SEARCH_URL } from "../utils/constants";

const useGetData = (url,currentPage,usersPerPage,searchCount=null,searchUrl=null,searchParams=null) => {
    const [data, setData] = useState([]);
    const [dataCount, setDataCount] = useState(null);
    const [dataReceived, setDataReceived] = useState(false);
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
          //console.log(response);
          // if (
            //   response.data.jsonString.length === 0 ||
            //   response.data.jsonString.length < onPageCount
            // ) {
              //   setHasMore(false);
            // }
            isMounted &&
              setData((prevUsers) => response.data.jsonString);
              setDataCount(response.data.count)
              setDataReceived(true)
              //setCurrentPage((prev) => prev + 1);
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
            setDataReceived(true)
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
      }, [url,currentPage,searchCount,searchParams]);

      // const getData = async () => {
      //     try {
      //       const response = await axiosPrivate.get(url);
      //       setTimeout(() => {             
              
      //             setData((prevUsers) => response.data.jsonString);
      //            // setCurrentPage((prev) => prev = 1);
              
      //       }, 500);
      //     } catch (err) {
      //       console.error(err);
      //       //navigate("/login", { state: { from: location }, replace: true });
      //     }
      //   };
        // const refreshData = async () => {
        //   try {
        //     const controller = new AbortController();
        //     const response = await axiosPrivate.post(url, {
        //       signal: controller.signal,
        //       params: {
        //         page: 1,
        //         onPage: usersPerPage,
        //       },
        //     });
        //     setData(response.data.jsonArray);
        //   } catch (err) {
        //     console.error(err);
        //     if (err.name !== "AbortError") {
        //       navigate("/login", { state: { from: location }, replace: true });
        //     }
        //   }
        // };
    

      // const checkData = async () => {
      //     try {
      //       const response = await axiosPrivate.post(url, {
      //         page: currentPage,
      //         onPage:  usersPerPage,
      //       });
      //       setTimeout(() => {
      //         // if (
      //         //   response.data.jsonString.length === 0 ||
      //         //   response.data.jsonString.length < onPageCount
      //         // ) {
      //         //   setHasMore(false);
      //         // }             
      //             setData((prevUsers) => [
      //               ...prevUsers,
      //               ...response.data.jsonString,
      //             ]);
      //             //setCurrentPage((prev) => prev + 1);
      //                        }, 500);
      //     } catch (err) {
      //       console.error(err);
      //       navigate("/login", { state: { from: location }, replace: true });
      //     }
      //   };
      return {
        data,
        setData,
        dataCount,
        dataReceived

    }
}
export default useGetData;