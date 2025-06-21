import jwt from "jsonwebtoken";

const verifyHeaderToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing in header" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch {
    return res.status(401).json({ message: "Invalid header token" });
  }
};

export default verifyHeaderToken;
