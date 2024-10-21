import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useAxiosPrivate from "./useAxiosPrivate";

const useRefreshData = (url, usersPerPage,pageNumber=1) => {
  const [data, setData] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
//debugger
  const refreshData = async () => {
    try {
      const controller = new AbortController();
      const response = await axiosPrivate.post(url, {
        signal: controller.signal,
          page: pageNumber,
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

  return { data, refreshData, setData };
};

export default useRefreshData;
