import jwt from "jsonwebtoken";
import Error from "../Error/customError.js";

export default function jwtAuth(req, res, next) {
  try {

    const auth = req.headers.authorization.split(" ")[1];

    if (!auth) {
      throw new Error(401, "Unauthorized");
    }

    const payload = jwt.verify(auth, process.env.JWT_KEY);
    req.userId = payload.userId;
    req.role = payload.role;
    next();

  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid Token" });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired" });
    }

    return res.status(500).json({ message: "Authentication failed" });
  }
}
