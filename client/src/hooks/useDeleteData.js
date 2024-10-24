import useAxiosPrivate from "./useAxiosPrivate";
import Swal from "sweetalert2";

const useDeleteData = (url,itemRef,selectedItem,setSelectedItemId,name,refreshData='') => {
  const axiosPrivate = useAxiosPrivate();


  const handleDeleteItem = async (delid) => {
      if (selectedItem[name].trim() === itemRef.current?.trim()) {
      try {
        const response = await axiosPrivate.delete(url, {
          data: { id: delid },
        });
        setSelectedItemId(null); // Close the modal after deletion
        Swal.fire(`${response.data[name]} հեռացված է`);
        // const updatedItems = items.filter((data) => data._id !== delid);
        // setItems(updatedItems);
        refreshData()
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.error(err);
        //navigate('/login', { state: { from: location }, replace: true });
      }
    } else {
      Swal.fire("Տեքստը սխալ է");
    }
  };
  return {handleDeleteItem};
};
export default useDeleteData;
