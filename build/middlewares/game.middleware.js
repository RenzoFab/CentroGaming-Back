"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGame = void 0;
const express_validator_1 = require("express-validator");
const fields = [
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
    { field: "img", type: "string" },
    { field: "logo", type: "string" },
];
function validateFieldGame(field, type) {
    return type === "string"
        ? (0, express_validator_1.body)(field, `The field ${field} is required`)
            .notEmpty()
            .isString()
            .withMessage(`the field ${field} must be a string`)
        : (0, express_validator_1.body)(field, `The field ${field} is required`)
            .notEmpty()
            .isNumeric()
            .withMessage(`the field ${field} must be a number`);
}
function validateGame(isIdRequired = true) {
    const validators = fields.map((field) => validateFieldGame(field.field, field.type));
    isIdRequired
        ? validators.unshift((0, express_validator_1.body)("id", "The field id is required")
            .notEmpty()
            .isString()
            .withMessage("the field id must be a string"))
        : validators.unshift((0, express_validator_1.body)("id", "The field id is not required").isEmpty());
    return [...validators];
}
exports.validateGame = validateGame;
