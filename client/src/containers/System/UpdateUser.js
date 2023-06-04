import React, { useEffect } from "react";
import { Loading, Button, InputFormV2 } from "../../components";
import { apiUploadImages } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import anonAvatar from "../../assets/anon-avatar.png";
import Swal from "sweetalert2";
import * as actions from "../../store/actions";

import { useState, useRef } from "react";

const UpdateUser = () => {
  const inputElement = useRef();
  const dispatch = useDispatch();

  const { currentData } = useSelector((state) => state.user);

  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    id: currentData.id,
    name: currentData.name,
    phone: currentData.phone,
    avatar: currentData.avatar,
  });

  useEffect(() => {
    if (isCreatingPost) {
      dispatch(actions.updateCurrent(payload));
      setIsLoading(false);
      Swal.fire("Thông báo!", "Cập nhật thông tin thành công!", "success");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreatingPost, dispatch]);

  const handleChangeImage = () => {
    if (Object.keys(inputElement.current.files).length > 0) {
      let src = URL.createObjectURL(inputElement.current.files[0]);
      setPayload((prev) => ({ ...prev, avatar: src }));
    }
  };

  const handleUploadFile = async () => {
    setIsLoading(true);
    if (inputElement.current.files?.length > 0) {
      let formData = new FormData();
      formData.append("file", inputElement.current.files[0]);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_ASSETS_NAME
      );

      try {
        const response = await apiUploadImages(formData);
        setPayload((prev) => ({ ...prev, avatar: response.data.secure_url }));
        setIsCreatingPost(true);
      } catch (err) {
        Swal.fire("Oops !", err.message, "error");
      }
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(inputElement.current.files).length > 0) {
      await handleUploadFile();
    }
    setIsCreatingPost(true);
  };

  return (
    <div className="px-6 ">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        Sửa thông tin
      </h1>
      <div className="flex xl:w-1/2 mx-auto">
        <div className="py-4 flex flex-col gap-8 flex-auto">
          <InputFormV2
            label={"HỌ VÀ TÊN"}
            name={"name"}
            value={payload.name || ""}
            setValue={setPayload}
          />

          <InputFormV2
            label={"SỐ ĐIỆN THOẠI"}
            name={"phone"}
            value={payload.phone || ""}
            setValue={setPayload}
          />

          <p className="text-md">ĐỔI MẬT KHẨU</p>

          <div className="w-full mb-6 flex flex-col gap-4">
            <h2 className="font-semibold text-xl ">Ảnh đại diện</h2>
            <img
              src={payload.avatar || anonAvatar}
              alt="preview"
              className="shadow w-[150px] h-[150px] lg:w-[230px] lg:h-[230px] rounded-full border-none object-cover"
            />
            <input
              onChange={handleChangeImage}
              ref={inputElement}
              type="file"
              id="file"
            />
          </div>

          <div className="relative ">
            <Button
              isdisabled="disabled"
              onClick={handleSubmit}
              text={isLoading ? "" : "Lưu"}
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
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
