import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

const useGetSearchData = (url) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getData = async () => {
      try {
        const response = await axiosPrivate.get(url);
        setTimeout(() => {
          setData((prev) => response.data.jsonString);
          console.log(response.data.jsonString);
        }, 500);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getData();
    console.log(data);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url]);
  console.log(data);

  return { data };
};

export default useGetSearchData;
