const rentalUsecase = require("../../usecase/rental");
const carUsecase = require("../../usecase/car");
const detailUsecase = require("../../usecase/rental_detail");
const { Op } = require("sequelize");
const { rental } = require("../../models");

exports.getRental = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await rentalUsecase.getRental(id);

    if (!data) {
      return next({
        message: `Rental With Id ${id} is not found`,
        statusCode: 404,
      });
    }

    return res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllRental = async (req, res, next) => {
  try {
    const data = await rentalUsecase.getAllRental();

    res.status(200).json({
      message: "Succes",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.createRental = async (req, res, next) => {
  try {
    const {
      user_id,
      car_id,
      namaPengemudi,
      phoneNumber,
      rentalDate,
      returnDate,
    } = req.body;

    const image = req?.files?.image;

    if (!user_id || user_id == "") {
      return next({
        message: "User id Must be Filled",
        statusCode: 400,
      });
    }
    if (!car_id || car_id == "") {
      return next({
        message: "Car Id Must be Filled",
        statusCode: 400,
      });
    }

    if (!namaPengemudi || namaPengemudi == "") {
      return next({
        message: "Name Must be Filled",
        statusCode: 400,
      });
    }

    if (!phoneNumber || phoneNumber == "") {
      return next({
        message: "Phone Number Must be Filled",
        statusCode: 400,
      });
    }

    if (!rentalDate || rentalDate == "") {
      return next({
        message: "Rental Date Must be Filled",
        statusCode: 400,
      });
    }
    if (!returnDate || returnDate == "") {
      return next({
        message: "Return Date Must be Filled",
        statusCode: 400,
      });
    }

    // Ambil harga mobil dari database
    const car = await carUsecase.getCar(car_id);
    if (!car) {
      return next({
        message: "Car not found",
        statusCode: 404,
      });
    }

    // Hitung jumlah hari sewa
    const rentalDays = Math.ceil(
      (new Date(returnDate) - new Date(rentalDate)) / (1000 * 60 * 60 * 24)
    );
    if (rentalDays <= 0) {
      return next({
        message: "Return Date must be after Rental Date",
        statusCode: 400,
      });
    }

    // Hitung total biaya sewa
    const total = car.rentPerday * rentalDays;

    const rentalData = await rentalUsecase.createRental({
      user_id,
      car_id,
      namaPengemudi,
      phoneNumber,
      image,
      rentalDate,
      returnDate,
      total,
    });

    // Buat rental detail setelah rental dibuat
    const rentalDetailData = await detailUsecase.createRentalDetail({
      rental_id: rentalData.id, // Mengambil rental_id dari data rental yang baru dibuat
      user_id,
      car_id,
      status: "waiting", // Contoh status awal, bisa disesuaikan
    });

    res.status(200).json({
      message: "Succes",
      rentalData,
      rentalDetailData,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateRental = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      rentalCode,
      user_id,
      car_id,
      namaPengemudi,
      phoneNumber,
      rentalDate,
      returnDate,
    } = req.body;

    const image = req?.files?.image;

    if (!rentalCode || rentalCode == "") {
      return next({
        message: "Rental Code Must be Filled",
        statusCode: 400,
      });
    }
    if (!user_id || user_id == "") {
      return next({
        message: "User id Must be Filled",
        statusCode: 400,
      });
    }
    if (!car_id || car_id == "") {
      return next({
        message: "Car Id Must be Filled",
        statusCode: 400,
      });
    }

    if (!namaPengemudi || namaPengemudi == "") {
      return next({
        message: "Name Must be Filled",
        statusCode: 400,
      });
    }

    if (!phoneNumber || phoneNumber == "") {
      return next({
        message: "Phone Number Must be Filled",
        statusCode: 400,
      });
    }

    if (!rentalDate || rentalDate == "") {
      return next({
        message: "Rental Date Must be Filled",
        statusCode: 400,
      });
    }
    if (!returnDate || returnDate == "") {
      return next({
        message: "Return Date Must be Filled",
        statusCode: 400,
      });
    }

    // Ambil harga mobil dari database
    const car = await carUsecase.getCar(car_id); // Disesuaikan dengan logika pemanggilan mobil
    if (!car) {
      return next({
        message: "Car not found",
        statusCode: 404,
      });
    }
    const user = await userUsecase.getUser(user_id);
    if (!user) {
      return next({
        message: "User not found",
        statusCode: 404,
      });
    }

    // Hitung jumlah hari sewa
    const rentalDays = Math.ceil(
      (new Date(returnDate) - new Date(rentalDate)) / (1000 * 60 * 60 * 24)
    );
    if (rentalDays <= 0) {
      return next({
        message: "Return Date must be after Rental Date",
        statusCode: 400,
      });
    }

    // Hitung total biaya sewa
    const total = car.rentPerday * rentalDays;

    // Update rental utama
    const rentalData = await rentalUsecase.updateRental(id, {
      rentalCode,
      user_id,
      car_id,
      namaPengemudi,
      phoneNumber,
      rentalDate,
      returnDate,
      total,
      image,
    });

    // Update rental detail yang berkaitan
    const rentalDetailData = await detailUsecase.updateRentalDetailByRentalId(
      id,
      {
        user_id,
        car_id,
        status: "waiting", // Contoh status baru, bisa disesuaikan
      }
    );

    res.status(200).json({
      message: "Success",
      rentalData,
      rentalDetailData,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteRental = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await rentalUsecase.deleteRental(id);

    res.status(201).json({
      message: `Success, Delete Rental with id: ${id}`,
      data,
    });
  } catch (error) {
    next(error);
  }
};
