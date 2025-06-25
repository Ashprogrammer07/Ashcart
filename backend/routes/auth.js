const express = require('express');
const router = express.Router();
const path= require('path')
const multer=require('multer')
const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..' , 'uploads/user' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })
const { authorizeRoles, isauthenticatedUser } = require('../middlewares/authenticate');
const { registerUser, 
    loginUser, 
    logoutUser,
    forgotPassword, 
    resetPassword, 
    getUserProfile, 
    changePassword,
    updateProfile,
getAllUsers,
getSingleUser,
updateUserRole,
deleteUser} = require('../controllers/authController');


router.route('/register').post(upload.single('avatar'),registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/myprofile').get(isauthenticatedUser, getUserProfile);
router.route('/password/change').put(isauthenticatedUser, changePassword);
router.route('/myprofile/update').put(isauthenticatedUser,upload.single('avatar'), updateProfile);
router.route('/admin/users').get(isauthenticatedUser, authorizeRoles('admin'),getAllUsers ); 
router.route('/admin/user/:id').get(isauthenticatedUser,authorizeRoles('admin'),getSingleUser)
                                .put(isauthenticatedUser, authorizeRoles('admin'), updateUserRole)
                                .delete(isauthenticatedUser, authorizeRoles('admin'), deleteUser);                    
module.exports = router;