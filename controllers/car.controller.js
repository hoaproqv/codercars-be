const mongoose = require("mongoose");
const Car = require("../models/Car");
const carController = {};
const limit = 10;

carController.createCar = async (req, res, next) => {
  try {
    const data = req.body;
    const newData = await Car.create(data);
    res.status(200).send({
      message: "Create Car Successfully!",
      car: newData,
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
};

carController.getCars = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    let getAll = await Car.find({});
    getAll.sort((a, b) => b["release_date"] - a["release_date"]);
    const total = Math.ceil(getAll.length / limit);

    if (total > limit) {
      const startPoint = (page - 1) * limit;
      const endPoint = startPoint + limit;
      const newData = getAll.slice(startPoint, endPoint);
      getAll = newData;
    }

    res.status(200).send({
      message: "Get Car List Successfully!",
      data: { cars: getAll, page: Number(page), total: total },
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
};

carController.editCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const carUpdate = await Car.findByIdAndUpdate(id, data, { new: true });
    res.status(200).send({
      message: "Update Car Successfully!",
      data: {
        cars: carUpdate,
      },
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
};

carController.deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const carDelete = await Car.findByIdAndDelete(id);

    res.status(200).send({
      message: "Delete Car Successfully!",
      data: {
        cars: carDelete,
      },
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports = carController;
