import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authHeader = req.headers.authorization;

      console.log("Authorization Header:", authHeader); // Log the received header for debugging

      // Check if Authorization header exists
      if (!authHeader) {
        throw new ApiError(401, "Unauthorized: Missing Authorization header.");
      }

      // Extract token (removing 'Bearer ' prefix)
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;

      console.log("Extracted Token:", token); // Log the extracted token for debugging

      // Verify token
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );
      if (!verifiedUser) {
        throw new ApiError(401, "Invalid token or verification failed.");
      }
      console.log("Verified User:", verifiedUser);
      // Attach user to request object
      req.user = verifiedUser;

      // Role validation
      if (
        roles.length &&
        (!verifiedUser.role || !roles.includes(verifiedUser.role))
      ) {
        throw new ApiError(
          403,
          "Forbidden: You do not have the required permissions."
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
