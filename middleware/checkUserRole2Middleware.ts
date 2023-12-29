// checkUserRoleMiddleware.ts
import { NextApiRequest, NextApiResponse } from "next";

const checkUserRoleMiddleware = (func: any) => async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const userRole = req.headers["userRole"];

  if (userRole === "2" || userRole === "1" ) {
    await func(req, res); // Sử dụng 'await' để đảm bảo middleware hoàn tất trước khi gọi 'next'
  } else {
    res.status(403).json({ message: "Forbidden - No permission" });
  }
};

export default checkUserRoleMiddleware;
