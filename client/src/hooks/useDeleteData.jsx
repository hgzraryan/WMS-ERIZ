import useAxiosPrivate from "./useAxiosPrivate";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useDeleteData = (url,itemRef,selectedItem,setSelectedItemId,items,setItems,name,getData) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  
  const notify = (text) =>
    toast.error(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleDeleteItem = async (delid) => {
    if (!!selectedItem[name].length && !!itemRef?.current.length && selectedItem[name]?.trim() === itemRef?.current?.trim()) {
      try {
        const response = await axiosPrivate.delete(url, {
          data: { id: delid },
        });
        setSelectedItemId(null); // Close the modal after deletion
        notify(
          `Տվյալները ջնջված են`
        );
        getData()
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
    };
};
export default useDeleteData;
