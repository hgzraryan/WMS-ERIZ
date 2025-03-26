import useAxiosPrivate from "./useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const useUpdateCount = (url,reducer,data) => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const updateDataCount = async () => {
    try {
      const response = await axiosPrivate.get(url);
      dispatch(reducer(response.data[data]));
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };
  return {updateDataCount};
};
export default useUpdateCount;
