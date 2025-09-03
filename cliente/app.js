import _express from "express";
import _cors from "./config/cors.js";

import {PUERTO} from "./utils/constantes.js";

const app= _express();
app.use(_cors);
app.use(_express.static("public"));

app.listen(PUERTO, () => {
    console.log('Listening on '+PUERTO);
});
