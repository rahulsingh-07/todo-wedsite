const express =require('express')
const router=express.Router();
const authControllers=require('../controllers/authController')
const {signupSchema,loginSchema}=require('../validators/authValidator')
const validate=require('../middlewares/validate-middleware')
const authMiddleware=require('../middlewares/auth-middleware')


router.route('/').get(authControllers.home);

router.route('/signup').post( validate(signupSchema),authControllers.register);

router.route('/login').post(validate(loginSchema),authControllers.login)

router.route('/user').get(authMiddleware,authControllers.user)

module.exports=router