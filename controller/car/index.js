const carUsecase = require("../../usecase/car");

exports.getCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carUsecase.getCar(id);

    if (!data) {
      return next({
        message: `Car with ${id} is not found`,
        statusCode: 400,
      });
    }

    res.status(201).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllCar = async (req, res, next) => {
  try {
    const data = await carUsecase.getAllCar();

    res.status(201).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.createCar = async (req, res, next) => {
  try {
    const {
      brand,
      model,
      transmission,
      carYear,
      plate,
      seat,
      color,
      rentPerday,
      information,
      status,
    } = req.body;
    const image = req?.files?.image;

    // Validate Request
    if (!brand) {
      return next({
        message: "Brand must be filled",
        statusCode: 400,
      });
    }
    if (!model) {
      return next({
        message: "Model must be filled",
        statusCode: 400,
      });
    }
    if (!transmission) {
      return next({
        message: "Transmission must be filled",
        statusCode: 400,
      });
    }
    if (!carYear) {
      return next({
        message: "Car year must be filled",
        statusCode: 400,
      });
    }
    if (!plate) {
      return next({
        message: "Plate must be filled",
        statusCode: 400,
      });
    }
    if (!seat) {
      return next({
        message: "Seat must be filled",
        statusCode: 400,
      });
    }
    if (!color) {
      return next({
        message: "Color must be filled",
        statusCode: 400,
      });
    }
    if (!rentPerday) {
      return next({
        message: "Rent per day must be filled",
        statusCode: 400,
      });
    }
    if (!information) {
      return next({
        message: "Information must be filled",
        statusCode: 400,
      });
    }
    if (!status) {
      return next({
        message: "Status must be filled",
        statusCode: 400,
      });
    }

    const data = await carUsecase.createCar({
      brand,
      model,
      transmission,
      image,
      carYear,
      plate,
      seat,
      color,
      rentPerday,
      information,
      status,
    });

    res.status(201).json({
      message: "Create Car Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      brand,
      model,
      transmission,
      carYear,
      plate,
      seat,
      color,
      rentPerday,
      information,
      status,
    } = req.body;

    //Validate Request
    if (!brand) {
      return next({
        message: "Brand Must be Filled",
        statusCode: 400,
      });
    }
    if (!model) {
      return next({
        message: "Model Must be Filled",
        statusCode: 400,
      });
    }
    if (!transmission || transmission == "") {
      return next({
        message: "Model Must be Filled",
        statusCode: 400,
      });
    }
    if (!carYear) {
      return next({
        message: "Car Year Must be Filled",
        statusCode: 400,
      });
    }
    if (!plate) {
      return next({
        message: "Plate Must be Filled",
        statusCode: 400,
      });
    }
    if (!seat || seat == "") {
      return next({
        message: "seat Must be Filled",
        statusCode: 400,
      });
    }
    if (!color) {
      return next({
        message: "Color Must be Filled",
        statusCode: 400,
      });
    }
    if (!rentPerday) {
      return next({
        message: "Rent Per Day Must be Filled",
        statusCode: 400,
      });
    }
    if (!information) {
      return next({
        message: "Information Must be Filled",
        statusCode: 400,
      });
    }
    if (!status) {
      return next({
        message: "Status Must be Filled",
        statusCode: 400,
      });
    }

    const data = await carUsecase.updateCar(id, {
      brand,
      model,
      transmission,
      carYear,
      plate,
      seat,
      color,
      rentPerday,
      information,
      status,
    });

    res.status(201).json({
      message: `Update Car With id:${id}, Success`,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carUsecase.deleteCar(id);

    res.status(201).json({
      message: `Success, Delete Car with id: ${id}`,
      data,
    });
  } catch (error) {
    next(error);
  }
};
