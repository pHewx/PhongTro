import * as postService from "../services/post";

export const getPosts = async (req, res) => {
  try {
    const response = await postService.getPostsService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const getPostsLimit = async (req, res) => {
  const { page, priceNumber, areaNumber, ...query } = req.query;

  try {
    const response = await postService.getPostsLimitService(page, query, {
      priceNumber,
      areaNumber,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const getNewPosts = async (req, res) => {
  try {
    const response = await postService.getNewPostService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};

export const createNewPost = async (req, res) => {
  console.log(req.body);

  try {
    const response = await postService.createNewPostService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};

export const getMyPost = async (req, res) => {
  try {
    const { page, id } = req.query;
    const response = await postService.getMyPostService(page, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at controller: " + error,
    });
  }
};

export const updateMyPost = async (req, res) => {
  try {
    const response = await postService.updateMyPostService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at controller: " + error,
    });
  }
};

export const removeMyPost = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await postService.removeMyPostService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at controller: " + error,
    });
  }
};
