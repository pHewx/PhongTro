import "moment/locale/vi";
import moment from "moment";

export const formatTime = (createdAt) => {
  return moment(createdAt).fromNow();
};
