// Import middleware và các thư viện cần thiết
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";

// Hàm để lấy tất cả chi tiết đơn hàng
const getAllOrderDetails = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const orderDetails = await prisma.orderDetail.findMany();

  res.status(200).json({
    status: "success",
    data: {
      orderDetails,
    },
  });
});

// Hàm để tạo một chi tiết đơn hàng mới
const createOrderDetail = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { order_id, package_name, quantity, weight, price } = req.body;

  const orderDetail = await prisma.orderDetail.create({
    data: {
      order_id,
      package_name,
      quantity,
      weight,
      price,
    },
  });

  res.status(200).json({
    status: "success",
    data: orderDetail,
  });
});

// Hàm để lấy một chi tiết đơn hàng cụ thể bằng cách sử dụng id
const getOrderDetail = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const orderDetail = await prisma.orderDetail.findUnique({
    where: {
      order_details_id: Number(id),
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      orderDetail,
    },
  });
});

// Hàm để cập nhật một chi tiết đơn hàng bằng cách sử dụng id
const updateOrderDetail = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { order_id, package_name, quantity, weight, price } = req.body;

  const orderDetail = await prisma.orderDetail.update({
    where: {
      order_details_id: Number(id),
    },
    data: {
      order_id,
      package_name,
      quantity,
      weight,
      price,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      orderDetail,
    },
  });
});

// Hàm để xóa một chi tiết đơn hàng bằng cách sử dụng id
const deleteOrderDetail = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await prisma.orderDetail.delete({
    where: {
      order_details_id: Number(id),
    },
  });

  res.status(200).json({
    status: "success",
    data: null,
  });
});

// Xuất tất cả các hàm để sử dụng trong api/
export {
  getAllOrderDetails,
  createOrderDetail,
  getOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
};
