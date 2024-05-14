import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

const useGetData = (url,currentPage,usersPerPage) => {
    const [data, setData] = useState([]);
   // const [hasMore, setHasMore] = useState(true);  
    const axiosPrivate = useAxiosPrivate();  
    const navigate = useNavigate();  
    const location = useLocation();    

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
    
        const getData = async () => {
          try {
            const response = await axiosPrivate.post(url,{
              signal: controller.signal,
              page: currentPage+1,
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
            //setCurrentPage((prev) => prev + 1);
          } catch (err) {
            console.error(err);
            navigate("/login", { state: { from: location }, replace: true });
          }
        };
    
        getData();
    
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
            const response = await axiosPrivate.post(url,{
             
              page: 1,
              onPage: usersPerPage,
            });
            // console.log(response);
            // if (
            //   response.data.jsonString.length === 0 ||
            //   response.data.jsonString.length < onPageCount
            // ) {
            //   setHasMore(false);
            // }
            
              setData((prevUsers) => response.data.jsonString);
            //setCurrentPage((prev) => prev + 1);
          } catch (err) {
            console.error(err);
            navigate("/login", { state: { from: location }, replace: true });
          }
        };
    

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
        getData,
        refreshData
    }
}
export default useGetData;