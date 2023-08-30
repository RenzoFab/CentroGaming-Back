import { body } from "express-validator";
import { Game } from "../models/game.interface";

const fields: { field: keyof Game; type: "string" | "number" }[] = [
  { field: "date", type: "string" },
  { field: "salesCount", type: "number" },
  { field: "production", type: "string" },
  { field: "price", type: "number" },
  { field: "name", type: "string" },
  { field: "genre", type: "string" },
  { field: "discount", type: "number" },
  { field: "description", type: "string" },
  { field: "developer", type: "string" },
  { field: "stock", type: "number" },
  { field: "platforms", type: "string" },
];

function validateFieldGame(field: keyof Game, type: "string" | "number") {
  return type === "string"
    ? body(field, `The field ${field} is required`)
        .notEmpty()
        .isString()
        .withMessage(`the field ${field} must be a string`)
    : body(field, `The field ${field} is required`)
        .notEmpty()
        .isNumeric()
        .withMessage(`the field ${field} must be a number`);
}

export function validateGame(isIdRequired = true) {
  const validators = fields.map((field) =>
    validateFieldGame(field.field, field.type)
  );
  isIdRequired
    ? validators.unshift(
        body("id", "The field id is required")
          .notEmpty()
          .isString()
          .withMessage("the field id must be a string")
      )
    : validators.unshift(body("id", "The field id is not required").isEmpty());

  return [...validators];
}
