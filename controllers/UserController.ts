// import middleware catchError
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma"; // prisma client
import bcrypt from 'bcrypt';

const saltRounds = 10; 
const getDefaultRole = () => "1";

// Hàm để lấy tất cả người dùng
const getAllUsers = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await prisma.user.findMany();

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

const checkUser = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;

  // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu hay không
  const existingUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!existingUser) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  // So sánh mật khẩu đã hash
  const passwordMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordMatch) {
    return res.status(401).json({
      status: "error",
      message: "Incorrect password",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      user: existingUser,
    },
  });
});
// Hàm để tạo một người dùng mới
const createUser = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, phone, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await prisma.user.create({
    data: {
      username,
      phone,
      password: hashedPassword,
      role,
    },
  });

  res.status(200).json({
    status: "success",
    data: user,
  });
});

// Hàm để xóa một người dùng bằng cách sử dụng id
const deleteUser = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  res.status(200).json({
    status: "success",
    data: null,
  });
});

// Hàm để lấy một người dùng cụ thể bằng cách sử dụng id
const getUser = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// Hàm để cập nhật một người dùng bằng cách sử dụng id
const updateUser = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { username, phone, password, role } = req.body;

  const user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      username,
      phone,
      role
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// Xuất tất cả các hàm để sử dụng trong api/
export {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUser,
};
