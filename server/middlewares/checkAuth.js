import jwt from "jsonwebtoken";

export const checkAuth = async (req, res, next) => {
  const token = (req.headers.authorization || "").split("Bearer ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN);
      req.userId = decoded.id;
      next();
    } catch (error) {
      return res.json({ message: error });
    }
  }
};
