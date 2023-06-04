import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { Overview, Address, Loading, Button } from "../../components";
import {
  apiUploadImages,
  apiCreateNewPost,
  apiUpdateMyPost,
} from "../../services";
import icons from "../../ultils/icons";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useLocation, useParams } from "react-router-dom";
import { path } from "../../ultils/constant";

const { BsCameraFill, ImBin } = icons;

const CreatePost = () => {
  const inputElement = useRef();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isCreate, setIsCreate] = useState(false);

  const { currentData } = useSelector((state) => state.user);
  const { myPosts } = useSelector((state) => state.post);
  const { msg, update } = useSelector((state) => state.post);

  const { postId } = useParams();

  const [imageFiles, setImageFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [acreage, setAcreage] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (location.pathname.split("/")[2] === path.CREATE_POST) {
      setIsCreate(true);
    } else {
      if (Object.keys(myPosts).length > 0) {
        const myPost = myPosts.filter((post) => post.id === postId)[0];

        setProvince(myPost.provinceCode);
        setDistrict(myPost.districtCode);
        setCategoryCode(myPost.categoryCode);
        setTitle(myPost.title);
        setImages(myPost.Images);
        setPrice(myPost.price);
        setAcreage(myPost.acreage);
        setAddress(myPost.address);
        setDescription(myPost.description);
        setTarget(myPost.target);
        setUserId(myPost.userId);
      }
    }
  }, [location.pathname, myPosts, postId]);

  useEffect(() => {
    setUserId(currentData.id);
  }, [currentData]);

  const handleUploadFile = () => {
    let updates = [];
    let files = { ...inputElement.current.files };

    for (const property in files) {
      files[property].id = v4();
      updates = [...updates, files[property]];
      files[property].src = URL.createObjectURL(files[property]);
    }

    setImageFiles((prev) => [...prev, ...updates]);
  };

  const handleDeleteImage = (obj) => {
    if (obj.id) {
      setImageFiles((prev) => prev?.filter((file) => file.id !== obj.id));
    } else {
      setImages(images.filter((item) => item.image !== obj.src));
    }
  };

  const handleSubmit = async () => {
    let updatedImages = [];

    if (imageFiles.length > 0) {
      try {
        setIsLoading(true);
        let formData = new FormData();
        for (const property in imageFiles) {
          formData.append("file", imageFiles[property]);
          formData.append(
            "upload_preset",
            process.env.REACT_APP_UPLOAD_ASSETS_NAME
          );
          let response = await apiUploadImages(formData);
          if (response.status === 200)
            console.log("url", response.data.secure_url);
          updatedImages = [...updatedImages, response.data?.secure_url];
        }
        setIsLoading(false);
      } catch (error) {
        Swal.fire("Oops !", "Tải ảnh không thành công!", "error");
        setIsLoading(false);
      }
    }

    let payLoad = {
      province,
      district,
      categoryCode,
      title,
      images: [...images, ...updatedImages],
      price,
      acreage,
      address,
      description,
      target,
      userId,
    };

    console.log(payLoad);

    if (isCreate) {
      try {
        await apiCreateNewPost(payLoad);
        Swal.fire("Success!", "Đã thêm bài viết", "success");
      } catch (error) {
        Swal.fire("Error!", error, "error");
      }
    } else {
      try {
        payLoad.id = postId;
        let newImages = [];
        payLoad.images.forEach((item) => {
          if (typeof item === "object") {
            newImages.push(item.image);
          } else {
            newImages.push(item);
          }
        });

        payLoad.images = newImages;

        console.log(payLoad);

        await apiUpdateMyPost(payLoad);

        console.log(payLoad);
        Swal.fire("Success!", "Đã cập nhật bài viết", "success");
      } catch (error) {
        Swal.fire("Error!", error, "error");
      }
    }
  };

  return (
    <div className="px-6 ">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        {isCreate ? <p>Đăng tin mới</p> : <p>Sửa bài đăng</p>}
      </h1>
      <div className="flex gap-4">
        <div className="py-4 flex flex-col gap-8 flex-auto">
          <Address
            province={province}
            district={district}
            setProvince={setProvince}
            setDistrict={setDistrict}
            setAddress={setAddress}
          />

          <Overview
            categoryCode={categoryCode}
            title={title}
            description={description}
            price={price}
            acreage={acreage}
            target={target}
            setCategoryCode={setCategoryCode}
            setTitle={setTitle}
            setDescription={setDescription}
            setPrice={setPrice}
            setAcreage={setAcreage}
            setTarget={setTarget}
          />

          {/* handle upload images */}
          <div className="w-full mb-6">
            <h2 className="font-semibold text-xl py-4">Hình ảnh</h2>
            <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            <div className="w-full">
              <label
                className="w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md"
                htmlFor="file"
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <BsCameraFill color="blue" size={50} />
                    Thêm ảnh
                  </div>
                )}
              </label>
              <input
                ref={inputElement}
                onChange={handleUploadFile}
                hidden
                type="file"
                id="file"
                multiple
              />
              <div className="w-full">
                <h3 className="font-medium py-4">Ảnh đã chọn</h3>
                <div className="flex gap-4 items-center">
                  {imageFiles.map((file) => {
                    return (
                      <div key={file.id} className="relative w-1/3 h-1/3 ">
                        <img
                          src={file.src}
                          alt="preview"
                          className="w-full h-full object-cover rounded-md"
                        />
                        <span
                          title="Xóa"
                          onClick={() => handleDeleteImage({ id: file.id })}
                          className="absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full"
                        >
                          <ImBin />
                        </span>
                      </div>
                    );
                  })}
                  {!isCreate &&
                    images?.map((item) => {
                      return (
                        <div key={item.image} className="relative w-1/3 h-1/3 ">
                          <img
                            src={item.image}
                            alt="preview"
                            className="w-full h-full object-cover rounded-md"
                          />
                          <span
                            title="Xóa"
                            onClick={() =>
                              handleDeleteImage({ src: item.image })
                            }
                            className="absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full"
                          >
                            <ImBin />
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          {/*  */}
          <div className="relative ">
            <Button
              isdisabled="disabled"
              onClick={handleSubmit}
              text={isLoading ? "" : "Tạo mới"}
              bgColor="bg-green-600"
              textColor="text-white"
              width="w-full"
              height="h-[40px]"
              isDisabled={isLoading}
            />
            {isLoading && (
              <div className="absolute left-[50%] top-0 translate-x-[-50%]">
                <Loading />
              </div>
            )}
          </div>
          {/*  */}
          <div className="h-[200px]"></div>
        </div>
        <div className="w-[30%] flex-none">
          maps
          {/* <Loading /> */}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
