// Import middleware và các thư viện cần thiết
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto-js';
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";

// Hàm để lấy tất cả đơn hàng
const getAllOrders = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const orders = await prisma.order.findMany({
    include: {
      gathering: {
        select: {
          gathering_location: {
            select: {
              id: true,
              province :true,
              city: true,
            },
          },
          gathering_user: {
            select: {
              id: true,
              username: true,
              phone: true,
            },
          },
        },
      },
      distribution: {
        select: {
          distribution_location: {
            select: {
              id: true,
              province :true,
              city: true,
            },
          },
          distribution_user: {
            select: {
              id: true,
              username: true,
              phone: true,
            },
          },
        },
      },
      details: { // Thêm phần này để kết nối với bảng orderDetails
        select: {
          order_details_id: true,
          package_name: true,
          quantity: true,
          weight: true,
          price: true,
        },
      },
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      orders,
    },
  });
});

// Hàm để tạo một đơn hàng mới
const createOrder = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    status,
    comment,
    sender_name,
    sender_phone,
    sender_location,
    receiver_name,
    receiver_phone,
    receiver_location,
  } = req.body;

  // Tạo chuỗi ngẫu nhiên ở đây, có thể sử dụng UUID hoặc số ngẫu nhiên khác
  const randomString = uuidv4();

  // Hash chuỗi ngẫu nhiên để có mã 16 ký tự
  const code = crypto.MD5(randomString).toString().toUpperCase().substring(0, 5);

  const order = await prisma.order.create({
    data: {
      status,
      comment,
      sender_name,
      sender_phone,
      sender_location,
      receiver_name,
      receiver_phone,
      receiver_location,
      code,
    },
    include: {
      gathering: true,
      distribution: true,
      details: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: order,
  });
});
// Hàm để lấy một đơn hàng cụ thể bằng cách sử dụng id
const getOrder = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const order = await prisma.order.findUnique({
    where: {
      order_id: Number(id),
    },
    include: {
      gathering: true,
      distribution: true,
      details: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

// Hàm để cập nhật một đơn hàng bằng cách sử dụng id
const updateOrder = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const {
    status,
    comment,
    sender_name,
    sender_phone,
    sender_location,
    receiver_name,
    receiver_phone,
    receiver_location,
    code,
  } = req.body;

  const order = await prisma.order.update({
    where: {
      order_id: Number(id),
    },
    data: {
      status,
      comment,
      sender_name,
      sender_phone,
      sender_location,
      receiver_name,
      receiver_phone,
      receiver_location,
      code,
    },
    include: {
      gathering: true,
      distribution: true,
      details: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

// Hàm để xóa một đơn hàng bằng cách sử dụng id
const deleteOrder = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await prisma.order.delete({
    where: {
      order_id: Number(id),
    },
  });

  res.status(200).json({
    status: "success",
    data: null,
  });
});

const getOrderbyCode = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;
  if (code === undefined) {
    res.status(400).json({
      status: "fail",
      message: "Mã đơn hàng không được xác định.",
    });
    return;
  }
  try {
    // Sử dụng Prisma để lấy thông tin đơn hàng dựa trên mã
    const order = await prisma.order.findFirst({
      where: {
        code: code.toString(),
      },
      include: {
        gathering: {
          select: {
            gathering_location: true,
            gathering_user: true,
          },
        },
        distribution: {
          select: {
            distribution_location: true,
            distribution_user: true,
          },
        },
        details: true,
      },
    });

    if (!order) {
      res.status(404).json({
        status: "fail",
        message: "Không tìm thấy đơn hàng với mã đã nhập.",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu.",
    });
  }
});

// Xuất tất cả các hàm để sử dụng trong api/
export {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrderbyCode,
};
