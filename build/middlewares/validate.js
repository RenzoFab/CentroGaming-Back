"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
function validate(req = express_1.request, res = express_1.response, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }
    return next();
}
exports.validate = validate;
