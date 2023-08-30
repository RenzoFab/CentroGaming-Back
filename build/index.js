"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = 2400;
app_1.app.listen(port, () => console.log(`Centro Gaming Api en puerto ${port}`));
