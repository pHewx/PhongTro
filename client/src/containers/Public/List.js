import React, { useEffect } from "react";
import { Button, Item } from "../../components";
import { getPosts, getPostsLimit } from "../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import noImage from "../../assets/noImage.jpg";

const List = ({ categoryCode }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }
    let searchParamsObject = {};
    params?.forEach((i) => {
      if (Object.keys(searchParamsObject)?.some((item) => item === i[0])) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
      } else {
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
      }
    });
    if (categoryCode) searchParamsObject.categoryCode = categoryCode;
    dispatch(getPostsLimit(searchParamsObject));
  }, [searchParams, categoryCode]);

  return (
    <div className="w-full p-2 bg-white shadow-md rounded-md px-6">
      <div className="flex items-center justify-between my-3">
        <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
        <span>Cập nhật: 12:05 25/05/2023</span>
      </div>
      <div className="flex items-center gap-2 my-2">
        <span>Sắp xếp:</span>
        <Button bgColor="bg-gray-200" text="Mặc định" />
        <Button bgColor="bg-gray-200" text="Mới nhất" />
      </div>
      <div className="items">
        {posts.length > 0 &&
          posts.map((item) => {
            return (
              <Item
                key={item.id}
                address={item.address}
                price={item.price}
                acreage={item.acreage}
                description={item.description ? item.description : ""}
                images={item.Images.length > 0 ? item.Images : noImage}
                star={+item.star}
                title={item.title}
                user={item.User}
                id={item.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default List;