const detailUsecase = require("../../usecase/rental_detail");

exports.getRentalDetails = async (req, res, next) => {
  try {
    // Dapatkan user_id dari user yang sedang login (dari middleware auth)
    const userId = req.user.id; // Sesuaikan dengan cara Anda menyimpan user di request

    // Ubah untuk hanya mengambil data milik user ini
    const data = await detailUsecase.getRentalDetailsByUserId(userId);

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getRentalDetailById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Dapatkan ID user dari request

    // Menggunakan fungsi yang memvalidasi kepemilikan
    const data = await detailUsecase.getRentalDetailByIdAndUserId(id, userId);

    if (!data) {
      return next({
        message: `Rental Details With Id ${id} not found or not authorized`,
        statusCode: 403,
      });
    }

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.createRentalDetail = async (req, res, next) => {
  try {
    const { rental_id, car_id, status } = req.body;
    // Gunakan user_id dari request (yang sudah terautentikasi)
    const user_id = req.user.id;

    // Validasi input (seperti sebelumnya)
    if (!rental_id || rental_id == "") {
      return next({
        message: "Rental Id must be filled",
        statusCode: 400,
      });
    }
    if (!car_id || car_id == "") {
      return next({
        message: "Car Id must be filled",
        statusCode: 400,
      });
    }
    if (!status || status == "") {
      return next({
        message: "Status must be filled",
        statusCode: 400,
      });
    }

    const data = await detailUsecase.createRentalDetail({
      rental_id,
      user_id, // Dari user yang login
      car_id,
      status,
    });

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// exports.updateRentalStatus = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     // const userId = req.user.id;
//     const { status } = req.body;

//     // // Periksa kepemilikan
//     // const isOwner = await detailUsecase.checkRentalDetailOwnership(id, userId);
//     // if (!isOwner) {
//     //   return next({
//     //     message: "Not authorized to update this rental status",
//     //     statusCode: 403,
//     //   });
//     // }

//     // Validasi status
//     if (!status || status === "") {
//       return next({
//         message: "Status must be filled",
//         statusCode: 400,
//       });
//     }

//     // Validasi nilai status
//     const validStatuses = ["waiting", "used", "finished"];
//     if (!validStatuses.includes(status)) {
//       return next({
//         message: "Status must be one of: waiting, used, finished",
//         statusCode: 400,
//       });
//     }

//     // Hanya update status
//     const data = await detailUsecase.updateRentalStatus(id, status);

//     res.status(200).json({
//       message: "Status updated successfully",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

exports.updateRentalDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validasi input
    if (!status || status === "") {
      return next({
        message: "Status must be filled",
        statusCode: 400,
      });
    }
    // User_id tidak dimasukkan dalam payload update untuk mencegah perubahan pemilik
    const data = await detailUsecase.updateRentalStatus(id, status);

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteRentalDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Periksa kepemilikan
    const isOwner = await detailUsecase.checkRentalDetailOwnership(id, userId);
    if (!isOwner) {
      return next({
        message: "Not authorized to delete this rental detail",
        statusCode: 403,
      });
    }

    const data = await detailUsecase.deleteRentalDetail(id);

    res.status(200).json({
      message: `Success Delete Rental Details With id:${id}`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserRentals = async (req, res, next) => {
  try {
    const userId = req.user.id; // Mengambil ID dari user yang login

    const data = await detailUsecase.getRentalDetailsByUserId(userId);

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
