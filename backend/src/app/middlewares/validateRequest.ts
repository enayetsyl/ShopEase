import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";


const validateRequest = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log("Request Body:", req.body);
    await schema.parseAsync(req.body)
    return next()
  } catch (error) {
    next(error)
  }
}

export default validateRequest