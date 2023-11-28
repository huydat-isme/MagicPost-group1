// import the catchError middleware
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma"; // prisma client

// route for fetching all distribution points
const getAllDistributionPoints = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const distributionPoints = await prisma.distributionPoint.findMany()

  res.status(200).json({
    status: "success",
    data: {
      distributionPoints,
    },
  });
});

// route for creating a distribution point
const createDistributionPoint = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { point_name, manager_id } = req.body;
  const distributionPoint = await prisma.distributionPoint.create({
    data: {
      point_name,
      manager_id,
    },
  });

  res.status(200).json({
    status: "success",
    data: distributionPoint,
  });
});

// route for deleting a distribution point using the id
const deleteDistributionPoint = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await prisma.distributionPoint.delete({
    where: {
      distribution_point_id: Number(id),
    },
  });

  res.status(200).json({
    status: "success",
    data: null,
  });
});

// route for getting a specific distribution point using the id
const getDistributionPoint = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const distributionPoint = await prisma.distributionPoint.findUnique({
    where: {
      distribution_point_id: Number(id),
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      distributionPoint,
    },
  });
});

// route for updating a distribution point using the id
const updateDistributionPoint = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { point_name,manager_id } = req.body;

  const distributionPoint = await prisma.distributionPoint.update({
    where: {
      distribution_point_id: Number(id),
    },
    data: {
      point_name,
      manager_id,
    },
  });
  res.status(200).json({
    status: "success",
    data: {
      distributionPoint,
    },
  });
});

// export all routes to be used in the api/
export { getAllDistributionPoints, createDistributionPoint, deleteDistributionPoint, updateDistributionPoint, getDistributionPoint };
