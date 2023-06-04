import React, { useState } from "react";
import { useEffect } from "react";
import { apiRemoveMyPost } from "../../services/post";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import noImage from "../../assets/noImage.jpg";

const ListPost = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { currentData } = useSelector((state) => state.user);
  let { myPosts } = useSelector((state) => state.post);

  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  console.log(myPosts);

  useEffect(() => {
    if (currentData.id) {
      dispatch(actions.getMyPosts({ id: currentData.id }));
    }
  }, [currentData.id]);

  const handleUpdatePost = async (id) => {
    navigate("../sua-bai-dang/" + id);
  };

  const handleRemovePost = async (id) => {
    try {
      console.log(id);

      const response = await apiRemoveMyPost(id);

      if (response.data.err === 0) {
        Swal.fire("Success!", "Đã xóa bài viết", "success");
        dispatch(actions.getMyPosts({ id: currentData.id }));
      } else {
        Swal.fire("Error!", "Xóa thất bại", "error");
      }
    } catch (error) {
      Swal.fire("Error!", error, "error");
    }
  };

  return (
    <div className="px-6 ">
      <h1 className="text-3xl font-medium py-4 ">Quản lý tin đăng</h1>
      <div className="flex w-full xl:w-2/3 mx-auto ">
        <table className="table-auto w-full border border-solid border-gray-200 text-left ">
          <thead className="border border-solid border-gray-200 uppercase">
            <tr>
              <th scope="col" className=" px-6 py-2">
                STT
              </th>
              <th scope="col" className=" px-6 py-2">
                Tiêu đề
              </th>
              <th scope="col" className=" px-6 py-2 text-center">
                Ảnh đại diện
              </th>
              <th scope="col" className=" px-6 py-2">
                Giá
              </th>
              <th scope="col" className=" px-6 py-2">
                Ngày đăng
              </th>
              <th scope="col" className=" px-6 py-2">
                Tùy chọn
              </th>
            </tr>
          </thead>
          <tbody>
            {myPosts.length > 0 &&
              myPosts.map((post, index) => {
                return (
                  <tr key={post.id}>
                    <td className=" px-6 py-2">{index}</td>
                    <td className=" px-6 py-2">{post.title}</td>
                    <td className=" px-6 py-2 flex flex-column justify-center ">
                      <img
                        alt={`Ảnh liên quan`}
                        className=" object-contain w-[150px] h-[100px] lg:w-[230px] lg:h-[150px]"
                        src={
                          post.Images.length > 0
                            ? post.Images[0].image
                            : noImage
                        }
                      />
                    </td>
                    <td className=" px-6 py-2">{post.price}</td>
                    <td className=" px-6 py-2">{post.createdAt}</td>
                    <td className="flex px-6 py-2 ">
                      <Button
                        onClick={() => handleUpdatePost(post.id)}
                        text={"Sửa"}
                        textColor={"text-white"}
                        bgColor={"bg-blue-600"}
                      />
                      <Button
                        onClick={() => handleRemovePost(post.id)}
                        text={"Xóa"}
                        textColor={"text-white"}
                        bgColor={"bg-red-600"}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Outlet />
      </div>
    </div>
  );
};

export default ListPost;
