// Import middleware và các thư viện cần thiết
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";

// Hàm để lấy tất cả các địa điểm
const getAllLocations = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const locations = await prisma.location.findMany();

  res.status(200).json({
    status: "success",
    data: {
      locations,
    },
  });
});

// Hàm để tạo một địa điểm mới
const createLocation = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { province, city } = req.body;

  const location = await prisma.location.create({
    data: {
      province,
      city,
    },
  });

  res.status(200).json({
    status: "success",
    data: location,
  });
});

// Hàm để lấy một địa điểm cụ thể bằng cách sử dụng id
const getLocation = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const location = await prisma.location.findUnique({
    where: {
      id: Number(id),
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      location,
    },
  });
});

// Hàm để cập nhật một địa điểm bằng cách sử dụng id
const updateLocation = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { province, city } = req.body;

  const location = await prisma.location.update({
    where: {
      id: Number(id),
    },
    data: {
      province,
      city,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      location,
    },
  });
});

// Hàm để xóa một địa điểm bằng cách sử dụng id
const deleteLocation = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await prisma.location.delete({
    where: {
      id: Number(id),
    },
  });

  res.status(200).json({
    status: "success",
    data: null,
  });
});

// Xuất tất cả các hàm để sử dụng trong api/
export {
  getAllLocations,
  createLocation,
  getLocation,
  updateLocation,
  deleteLocation,
};
