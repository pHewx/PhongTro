import * as services from "../services/user";

export const getCurrent = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await services.getCurrentServices(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at getting user controller: " + error,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await services.getUserServices(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at getting user controller: " + error,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated = await services.updateOneServices({
      data: req.body,
    });
    const response = await services.getUserServices(req.body.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at updating user controller: " + error,
    });
  }
};
