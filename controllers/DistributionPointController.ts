// Import middleware và các thư viện cần thiết
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";

// Hàm để lấy tất cả các điểm phân phối
const getAllDistributionPoints = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const distributionPoints = await prisma.distributionPoint.findMany();

  res.status(200).json({
    status: "success",
    data: {
      distributionPoints,
    },
  });
});

// Hàm để tạo một điểm phân phối mới
const createDistributionPoint = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { distribution_location_id, distribution_user_id, distribution_order_id } = req.body;

  const distributionPoint = await prisma.distributionPoint.create({
    data: {
      distribution_location_id,
      distribution_user_id,
      distribution_order_id,
    },
  });

  res.status(200).json({
    status: "success",
    data: distributionPoint,
  });
});

// Hàm để lấy một điểm phân phối cụ thể bằng cách sử dụng id và bao gồm thông tin từ các bảng liên kết
const getDistributionPointsByLocationId = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { locationId } = req.query;
  
  const distributionPoints = await prisma.distributionPoint.findMany({
    where: {
      distribution_location_id: Number(locationId),
    },
    include: {
      distribution_location: true,
      distribution_user: true,
      distribution_order: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      distributionPoints,
    },
  });
});


// Hàm để cập nhật một điểm phân phối bằng cách sử dụng id
const updateDistributionPoint = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { distribution_location_id, distribution_user_id, distribution_order_id } = req.body;

  const distributionPoint = await prisma.distributionPoint.update({
    where: {
      id: Number(id),
    },
    data: {
      distribution_location_id,
      distribution_user_id,
      distribution_order_id,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      distributionPoint,
    },
  });
});

// Hàm để xóa một điểm phân phối bằng cách sử dụng id
const deleteDistributionPoint = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await prisma.distributionPoint.delete({
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
  getAllDistributionPoints,
  createDistributionPoint,
  getDistributionPointsByLocationId,
  updateDistributionPoint,
  deleteDistributionPoint,
};
