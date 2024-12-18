import express from 'express';
import {
    addUser,
    getUsers,

} from '../controllers/userController.js';

const router = express.Router();



// router.route('/register').post(registerUser); // api for user registration
// router.route('/login').post(loginUser); // api for user login
// router.route('/verified/:id').put(verifiedUser); // api for user verification(admin want to verify user)
// router.route('/resetPassword/:id').put(resetPassword); // api for user reset password
// router.route('/forgotPassword').post(forgotPassword); // api for user forgot password
router.route('/getUsers').get(getUsers); // api for get all users
router.route('/addUser').post(addUser); // api for add user

export default router;