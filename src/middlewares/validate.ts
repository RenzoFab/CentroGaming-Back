import { NextFunction, request, response } from "express";
import { validationResult } from "express-validator";

export function validate(req = request, res = response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  return next();
}
