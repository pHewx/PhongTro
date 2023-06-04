import React from "react";
import { Select, InputReadOnly, InputFormV3 } from "./";
import { useSelector } from "react-redux";

const targets = [
  { code: "Nam", value: "Nam" },
  { code: "Nữ", value: "Nữ" },
  { code: "Mọi đối tượng", value: "Mọi đối tượng" },
];

const Overview = ({
  categoryCode,
  title,
  description,
  price,
  acreage,
  target,
  setCategoryCode,
  setTitle,
  setDescription,
  setPrice,
  setAcreage,
  setTarget,
}) => {
  const { categories } = useSelector((state) => state.app);
  const { currentData } = useSelector((state) => state.user);
  return (
    <div>
      <h2 className="font-semibold text-xl py-4">Thông tin mô tả</h2>
      <div className="w-full flex flex-col gap-4">
        <div className="w-1/2">
          <Select
            value={categoryCode || ""}
            setValue={setCategoryCode}
            options={categories}
            label="Loại chuyên mục"
          />
        </div>
        <InputFormV3 value={title} setValue={setTitle} label="Tiêu đề" />
        <div className="flex flex-col gap-2">
          <label htmlFor="desc">Nội dung mô tả</label>
          <textarea
            id="desc"
            cols="30"
            rows="10"
            className="w-full rounded-md outline-none border border-gray-300 p-2"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <InputReadOnly
            label="Thông tin liên hệ"
            value={currentData?.name || currentData?.username}
          />
          <InputReadOnly label="Điện thoại" value={currentData?.phone} />
          <InputFormV3
            value={price}
            setValue={setPrice || ""}
            small="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
            label="Giá cho thuê"
            unit="đồng"
            name="price"
          />
          <InputFormV3
            value={acreage}
            setValue={setAcreage || ""}
            name="acreage"
            label="Diện tích"
            unit="m2"
          />
          <Select
            value={target}
            setValue={setTarget || ""}
            options={targets}
            label="Đối tượng cho thuê"
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
