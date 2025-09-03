import _cors from "cors";

const FRONTEND_URL="*";

console.log("CORS: "+FRONTEND_URL);
const corsOptions = {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

export default _cors(corsOptions);