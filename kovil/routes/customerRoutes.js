import express from 'express';
import {addCustomer, getCustomer, saveData} from "../controllers/customerController.js";
const router = express.Router();

router.route('/addCustomer').post(addCustomer); // api for add customer
router.route('/getCustomer').get(getCustomer);
router.route('/saveData').post(saveData);       // API for saving multiple customers

export default router;