import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loading = ({ style }) => {
  return (
    <ColorRing
      visible={true}
      height="40"
      width="40"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#ccc", "#ccc", "#ccc", "#ccc", "#ccc"]}
    />
  );
};

export default Loading;
