import { useState } from "react";
import AddRoomForm from "../../../components/From/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { uploadImage } from "../../../api/utils";
import { Helmet } from "react-helmet-async";

const AddRoom = () => {
  const { user } = useAuth();

  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("Upload Image");

  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
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

  // From handler
  const handleSubmit = async (e) => {
    e.preventDefault();
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
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <Helmet><title> Add Room | Dashboard</title></Helmet>
      {/* From */}
      <AddRoomForm
        dates={dates}
        handleDates={handleDates}
        handleSubmit={handleSubmit}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        handleImage={handleImage}
        imageText={imageText}
      ></AddRoomForm>
    </>
  );
};

export default AddRoom;
