import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

const useGetData = (url, currentPage, usersPerPage) => {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getData = async () => {
      try {
        const response = await axiosPrivate.post(url, {
          signal: controller.signal,
          page: currentPage + 1,
          onPage: usersPerPage,
        });
        if (isMounted) {
          setData(response.data.jsonString);
          setDataCount(response.data.count)

        }
      } catch (err) {
        console.error(err);
        console.error(err.name);
        if (err.name !== "AbortError") {
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    getData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url, currentPage, usersPerPage, axiosPrivate, navigate, location]);

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
    refreshData,
    dataCount
  };
};
export default useGetData;
