import express from 'express';
import { getAccountBalance, sendSms } from '../controllers/smsController.js';
const router = express.Router();

router.route('/sendsms').post(sendSms); // api for add 
router.route('/getAccountBalance').get(getAccountBalance)
export default router;