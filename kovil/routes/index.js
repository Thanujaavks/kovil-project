import express from "express";


import customerRoutes from "./customerRoutes.js";
import smsRoutes from "./smsRoutes.js";

const router = express.Router();

router.use("/api/customers", customerRoutes); // customer routes apis
router.use("/api/sms", smsRoutes)


export default router;