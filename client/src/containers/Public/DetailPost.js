import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import icons from "../../ultils/icons";
import { Button, SimpleMap, SimpleSlider } from "../../components";

import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { BsDot, BsHash, BsStopwatch } from "react-icons/bs";
import { SiZalo } from "react-icons/si";
import { RiCrop2Line } from "react-icons/ri";
import { formatTime } from "../../ultils/Common/formatTime";

const DetailPost = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { posts } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.app);

  const [currentPost, setcurrentPost] = useState({});
  const [coords, setCoords] = useState([]);

  const { HiLocationMarker, ImPriceTag, FaRulerCombined, BsFillTelephoneFill } =
    icons;

  useEffect(() => {
    if (posts.length > 0) {
      setcurrentPost(posts.filter((post) => post.id === id)[0]);
    }
  });



  return (
    <div className="w-full flex gap-4 ">
      <div className="w-[70%] bg-white">
        <SimpleSlider images={currentPost?.Images || []} />

        <div className="flex flex-col gap-2  rounded-md shadow-md p-4">
          <h2 className="text-xl text-red-600 font-bold uppercase ">
            {currentPost?.title}
          </h2>

          <div className="flex items-center gap-2">
            <span>Chuyên mục:</span>
            <span className="text-blue-600 underline font-medium hover:text-orange-600 cursor-pointer">
              {
                categories.filter(
                  (cate) => cate.code === currentPost?.categoryCode
                )[0]?.value
              }
            </span>
          </div>
          <div className="flex items-center gap-2">
            <HiLocationMarker color="#2563eb" />
            <span>Địa chỉ: {currentPost?.address}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <ImPriceTag />
              <span className="font-semibold text-lg text-green-600">
                {currentPost?.price / 1000000} triệu/tháng
              </span>
            </span>

            <span className=" flex items-center gap-1">
              <RiCrop2Line />
              <span>{currentPost?.acreage} m2</span>
            </span>

            <span className=" flex items-center gap-1">
              <BsStopwatch />
              <span>{currentPost?.acreage?.published} m2</span>
            </span>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-xl my-4">Thông tin mô tả</h3>
            <span>{currentPost?.description}</span>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-xl my-4"> Đặc điểm tin đăng</h3>
            <table className="w-full">
              <tbody className="w-full">
                <tr className="w-full">
                  <td className="p-2">Mã tin</td>
                  <td className="p-2">{currentPost?.id}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="p-2">Khu vực</td>
                  <td className="p-2">{currentPost?.provinceCode}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-2">Đối tượng</td>
                  <td className="p-2">{currentPost?.target}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="p-2">Ngày đăng</td>
                  <td className="p-2">{formatTime(currentPost?.createdAt)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="font-semibold text-xl my-4">Thông tin liên hệ</h3>
            <table className="w-full">
              <tbody className="w-full">
                <tr className="w-full">
                  <td className="p-2">Liên hệ</td>
                  <td className="p-2">{currentPost?.User?.name}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="p-2">Điện thoại</td>
                  <td className="p-2">{currentPost?.User?.phone}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-2">Zalo</td>
                  <td className="p-2">{currentPost?.User?.phone}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="w-[30%] h-[320px]">
        <div className="w-full h-full bg-amber-500 rounded-md flex flex-col items-center text-2xl p-4 gap-4 ">
          <img
            alt="avatar"
            className="w-16 h-16 object-fit rounded-full"
            src={currentPost?.User?.avatar}
          />
          <h3 className="text-xl font-medium">{currentPost?.User?.name}</h3>
          <span className="flex items-center">
            <BsDot color="green" size={28} />
            <span>Đang hoạt động</span>
          </span>
          <a
            className="bg-[#13BB7B] py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold text-lg"
            href="/"
          >
            <BsFillTelephoneFill />
            {currentPost?.User?.phone}
          </a>
          <a
            className="bg-white py-2 flex items-center justify-center gap-2 w-full rounded-md font-bold text-lg"
            href={currentPost?.User?.zalo}
            target="blank"
          >
            <SiZalo />
            {currentPost?.User?.phone}
          </a>
        </div>
        <div className="w-full  mt-4 bg-white shadow-md rounded-md"></div>
      </div>
    </div>
  );
};

export default DetailPost;
