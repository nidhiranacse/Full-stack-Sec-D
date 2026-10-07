const express=require("express");const cors=require("cors");const helmet=require("helmet");const rateLimit=require("express-rate-limit");const cookieParser=require("cookie-parser");const {body,validationResult}=require("express-validator");
const app=express();app.use(helmet());app.use(express.json());app.use(cookieParser());app.use(cors({origin:process.env.FRONTEND_URL,credentials:true}));
const loginLimiter=rateLimit({windowMs:15*60*1000,max:5,standardHeaders:true,legacyHeaders:false,message:{message:"Too many login attempts. Try again later."}});
app.use("/api/auth/login",loginLimiter);
const registerValidation=[body("name").trim().notEmpty(),body("email").isEmail(),body("password").isLength({min:8})];
function validate(req,res,next){const errors=validationResult(req);if(!errors.isEmpty())return res.status(400).json({message:"Validation failed",errors:errors.array()});next()}
module.exports={app,registerValidation,validate};
