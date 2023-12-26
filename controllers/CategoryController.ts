// Import middleware và các thư viện cần thiết
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import checkUserRoleMiddleware from "../middleware/checkUserRoleMiddleware";
// Hàm để lấy tất cả các danh mục (categories)
const getAllCategories = catchAsyncErrors(
  checkUserRoleMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
    const categories = await prisma.category.findMany();

    res.status(200).json({
      status: "success",
      data: {
        categories,
      },
    });
  })
);

// Hàm để tạo một danh mục (category) mới
const createCategory = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, colorStatus, description, name, pos, type, codeValue } = req.body;

  const category = await prisma.category.create({
    data: {
      code,
      colorStatus,
      description,
      name,
      pos,
      type,
      codeValue,
    },
  });

  res.status(200).json({
    status: "success",
    data: category,
  });
});

// Hàm để lấy một danh mục (category) cụ thể bằng cách sử dụng id
const getCategory = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const category = await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

// Hàm để cập nhật một danh mục (category) bằng cách sử dụng id
const updateCategory = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { code, colorStatus, description, name, pos, type, codeValue } = req.body;

  const category = await prisma.category.update({
    where: {
      id: Number(id),
    },
    data: {
      code,
      colorStatus,
      description,
      name,
      pos,
      type,
      codeValue,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

// Hàm để xóa một danh mục (category) bằng cách sử dụng id
const deleteCategory = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await prisma.category.delete({
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
  getAllCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
