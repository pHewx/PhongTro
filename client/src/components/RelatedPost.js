import React, { useEffect } from "react";
import { Sitem } from "./index";
import { useDispatch, useSelector } from "react-redux";
import noImage from "../assets/noImage.jpg";

const RelatedPost = () => {
  const { newPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  return (
    <div className="w-full bg-white rounded-md p-4">
      <h3 className="font-semibold text-lg mb-4">Tin mới đăng</h3>
      <div className="w-full flex flex-col gap-2">
        {newPosts.length > 0 &&
          newPosts.map((item) => {
            return (
              <Sitem
                key={item.id}
                title={item.title}
                price={item?.attributes?.price}
                createdAt={item.createdAt}
                image={item.Images.length > 0 ? item.Images[0].image : noImage}
              />
            );
          })}
      </div>
    </div>
  );
};

export default RelatedPost;
