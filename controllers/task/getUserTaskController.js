const TaskModel = require("../../models/TaskModel");
const moment = require("moment");

module.exports = async function (req, res, next) {
  try {
    const searchTemp = req.query?.search || "";
    const dateTemp = req.query?.date || "";
    const limit = parseInt(req.query?.limit, 10) || 5;
    const page = parseInt(req.query?.page, 10) || 1;

    const filterFields = req.query;

    const nonField = ["search", "limit", "page", "date"];
    nonField.forEach((e) => delete filterFields[e]); // remove the non field from filter fields

    ["tag", "status"].forEach((e) => {
      if (!filterFields[e]) delete filterFields[e];
    });

    let filter = searchTemp
      ? {
          createdBy: req.params.userId,
          $text: { $search: `${searchTemp}` },
          ...filterFields,
        }
      : {
          createdBy: req.params.userId,
          ...filterFields,
        };

    if (dateTemp) {
      const today = moment(dateTemp).startOf("day");
      filter.dueDate = {
        $gte: today.toDate(),
        $lte: moment(today).endOf("day").toDate(),
      };
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // console.log(filter);

    const tasks = await TaskModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const count = await TaskModel.find({ createdBy: filter.createdBy }).count();

    const pagination = {};

    pagination.total = count;

    if (endIndex < count && tasks.length > 0) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    res.send({
      isSuccessful: true,
      message: "Successfully fetched user's tasks",
      data: tasks,
      pagination,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
