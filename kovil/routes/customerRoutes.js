import express from 'express';
import {addCustomer, getCustomer} from "../controllers/customerController.js";
const router = express.Router();

router.route('/addCustomer').post(addCustomer); // api for add customer
router.route('/getCustomer').get(getCustomer);

export default router;