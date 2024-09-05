import useAxiosPrivate from "./useAxiosPrivate";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { checkUsersCount } from "../redux/features/users/usersCountSlice";

const useDeleteData = (url,itemRef,selectedItem,setSelectedItemId,items,setItems,name,getData) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  // const updateUsersCount = async () => {
  //   try {
  //     const response = await axiosPrivate.get("/allCount");
  //     //console.log(response)
  //     dispatch(checkUsersCount(response.data.usersCount));
  //   } catch (err) {
  //     console.error(err);
  //     navigate("/login", { state: { from: location }, replace: true });
  //   }
  // };
  const handleDeleteItem = async (delid) => {
    console.log(name)
    console.log(selectedItem[name])
    console.log(itemRef?.current)
    if (selectedItem && selectedItem.name?.length && !!itemRef?.current?.length && selectedItem[name]?.trim() === itemRef?.current?.trim()) {
      console.log(selectedItem[name])
      console.log(itemRef?.current)
      try {
        const response = await axiosPrivate.delete(url, {
          data: { id: delid },
        });
        setSelectedItemId(null); // Close the modal after deletion
        Swal.fire(`Տվյալները ջնջված են`);
        //Swal.fire(`${response.data[name]} has been deleted`);
        // const updatedItems = items.filter((data) => data._id !== delid);
        // setItems(updatedItems);
        getData()
       // updateUsersCount()
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.error(err);
        //navigate('/login', { state: { from: location }, replace: true });
      }
    } else if(!itemRef?.current.length) {
      Swal.fire(
        {
          confirmButtonColor: '#f44336',
          text:"Մուտքագրեք անհրաճեշտ տվյալները "
        });
    } else {
      Swal.fire(
        {
          confirmButtonColor: '#f44336',
          text:"Մուտքագրեք ճիշտ տվյալները "
        });
    }
  };
  return {handleDeleteItem,
  //  updateUsersCount
  };
};
export default useDeleteData;
