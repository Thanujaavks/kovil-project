import express from 'express';
import { sendSms } from '../controllers/smsController.js';
const router = express.Router();

router.route('/sendsms').post(sendSms); // api for add customer

export default router;