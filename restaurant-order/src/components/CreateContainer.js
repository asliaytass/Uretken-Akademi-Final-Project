import React, { useState } from "react";
import { motion } from "framer-motion";
import { RiAddCircleLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsInfoLg } from "react-icons/bs";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { storage } from "../firebase.config";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  deleteObject,
} from "firebase/storage";
import { getAllFoodItems, saveItem } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();


  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    // console.log(imageFile);
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading. Try again");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image Uploaded successfully");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image Uploaded successfully");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetail = () => {
    // console.log(title)
    // console.log(calories)
    // console.log(imageAsset)
    // console.log(price)
    // console.log(category)


    setIsLoading(true);
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully");
        
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading. Try again");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData();

  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCalories("Select Category");
  };

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatchEvent({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  return (
    <div className="create-container mt-3">
      <div className="form-container ">
        <div className="row ">
          <div className="col ">
            <div id="form" className="p-4 shadow">
              {fields && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`p-3 ${
                    alertStatus === "danger" ? "bg-danger" : "bg-success"
                  }`}
                >
                  {msg}
                </motion.p>
              )}

              <div className="border-bottom d-flex align-item-center justify-center">
                <RiAddCircleLine />{" "}
                <input
                  className="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give me a title..."
                  required
                />
              </div>

              <div className="mt-3">
                <select 
                onChange={(e) => setCategory(e.target.value)}
                className="category-select">
                  <option value="other" className="bg-white ">
                    Select Category
                  </option>

                  {categories &&
                    categories.map((item) => (
                      <option key={item.id} value={item.urlParamName}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="upload-img">
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    {!imageAsset ? (
                      <>
                        <label className="d-flex flex-column align-item-center justify-center">
                          <div className="">
                            <AiOutlineCloudUpload className="cloud" />
                            <p
                              className="text-secondary tabindex-0"
                              role="button"
                            >
                              Click here to upload
                            </p>
                          </div>
                          <input
                            className="file"
                            type="file"
                            name="uploadimage"
                            accept="image/*"
                            onChange={uploadImage}
                          />
                        </label>
                      </>
                    ) : (
                      <>
                        <div className="w-50 d-flex justify-content-center">
                          <img
                            src={imageAsset}
                            alt="uploaded image"
                            className="uploadImage"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              <div className="row mt-2">
                <div className="col d-flex justify-content-end">
                  <button
                    type="button"
                    className="deleteImage"
                    onClick={deleteImage}
                    
                  >
                    <MdDelete className="text-white mdDelete" />
                  </button>
                </div>
              </div>
              <div className="row  row-cols-2 cal-pr">
                <div className="col mt-3 d-flex justify-start">
                  <BsInfoLg className="mt-1 me-1" />
                  <input
                    className="calories w-75"
                    type="text"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="Calories"
                    required
                  />
                </div>
                <div className="col mt-3">
                  <HiOutlineCurrencyDollar className="me-1" />
                  <input
                    className="price w-50"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    required
                  />
                </div>
              </div>
              <div className="row mt-5">
                <button
                  onClick={saveDetail}
                  type="button"
                  className="btn btn-outline-light w-50 m-auto"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
