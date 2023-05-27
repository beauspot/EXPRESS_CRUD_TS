"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const __404_err_page = (req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: `Error Page: The resource does not exist.` });
};
exports.default = __404_err_page;
