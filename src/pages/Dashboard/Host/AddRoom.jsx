import { useState } from "react";
import AddRoomForm from "../../../components/From/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { uploadImage } from "../../../api/utils";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("Upload Image");
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // Date Range Handle dates
  const handleDates = (item) => {
    console.log(item);
    setDates(item.selection);
  };

  // handle image change
  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (roomData) => {
      const { data } = await axiosSecure.post(`/room`, roomData);
      return data;
    },
    onSuccess: () => {
      console.log("Data Save Successfully");
      toast.success('Room Added Successfully!')
      navigate("/my-listings");
      setLoading(false);
      
    },
  });

  // From handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const location = form.location.value;
    const category = form.category.value;
    const title = form.title.value;
    const to = dates.endDate;
    const from = dates.startDate;
    const quest = form.total_guest.value;
    const image = form.image.files[0];
    const price = form.price.value;
    const bedrooms = form.bedrooms.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const host = {
      email: user?.email,
      name: user?.displayName,
      photo: user?.photoURL,
    };
    try {
      const image_url = await uploadImage(image);
      const roomData = {
        location,
        category,
        title,
        to,
        from,
        quest,
        bedrooms,
        form,
        price,
        bathrooms,
        description,
        host,
        image: image_url,
      };
      console.table(roomData);
      // post request server
      await mutateAsync(roomData);
    } catch (err) {
      console.log(err)
      toast.error(err.message);
      setLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Add Room | Dashboard</title>
      </Helmet>
      {/* From */}
      <AddRoomForm
        dates={dates}
        handleDates={handleDates}
        handleSubmit={handleSubmit}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        handleImage={handleImage}
        imageText={imageText}
        loading={loading}
      ></AddRoomForm>
    </>
  );
};

export default AddRoom;
