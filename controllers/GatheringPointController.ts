// Import middleware và các thư viện cần thiết
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";

// Hàm để lấy tất cả điểm tụ tập
const getAllGatheringPoints = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const gatheringPoints = await prisma.gatheringPoint.findMany({
    include: {
      gathering_location: true,
      gathering_user: true,
      gathering_order: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      gatheringPoints,
    },
  });
});

// Hàm để lấy tất cả các điểm tụ tập với điều kiện gathering_location_id bằng một giá trị cụ thể
const getGatheringPointsByLocationId = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { locationId } = req.query;

  const gatheringPoints = await prisma.gatheringPoint.findMany({
    where: {
      gathering_location_id: Number(locationId),
    },
    include: {
      gathering_location: true,
      gathering_user: true,
      gathering_order: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      gatheringPoints,
    },
  });
});

// Hàm để tạo một điểm tụ tập mới
const createGatheringPoint = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { gathering_location_id, gathering_user_id, gathering_order_id } = req.body;

  const gatheringPoint = await prisma.gatheringPoint.create({
    data: {
      gathering_location_id,
      gathering_user_id,
      gathering_order_id,
    },
  });

  res.status(200).json({
    status: "success",
    data: gatheringPoint,
  });
});

// Hàm để lấy một điểm tụ tập cụ thể bằng cách sử dụng id
const getGatheringPoint = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const gatheringPoint = await prisma.gatheringPoint.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      gathering_location: true,
      gathering_user: true,
      gathering_order: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      gatheringPoint,
    },
  });
});

// Hàm để cập nhật một điểm tụ tập bằng cách sử dụng id
const updateGatheringPoint = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { gathering_location_id, gathering_user_id, gathering_order_id } = req.body;

  const gatheringPoint = await prisma.gatheringPoint.update({
    where: {
      id: Number(id),
    },
    data: {
      gathering_location_id,
      gathering_user_id,
      gathering_order_id,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      gatheringPoint,
    },
  });
});

// Hàm để xóa một điểm tụ tập bằng cách sử dụng id
const deleteGatheringPoint = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await prisma.gatheringPoint.delete({
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
  getAllGatheringPoints,
  getGatheringPointsByLocationId,
  createGatheringPoint,
  getGatheringPoint,
  updateGatheringPoint,
  deleteGatheringPoint,
};
