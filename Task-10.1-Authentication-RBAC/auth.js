const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("./User");
const signAccess=u=>jwt.sign({id:u._id.toString(),role:u.role},process.env.JWT_SECRET,{expiresIn:"15m"});
const signRefresh=u=>jwt.sign({id:u._id.toString(),role:u.role},process.env.REFRESH_SECRET,{expiresIn:"7d"});
async function register(req,res){const {name,email,password,role="STUDENT"}=req.body;const exists=await User.findOne({email});if(exists)return res.status(409).json({message:"Email already registered"});const passwordHash=await bcrypt.hash(password,12);const user=await User.create({name,email,passwordHash,role:role==="ADMIN"?"ADMIN":"STUDENT"});const accessToken=signAccess(user),refreshToken=signRefresh(user);res.cookie("refreshToken",refreshToken,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",maxAge:7*24*60*60*1000});res.status(201).json({accessToken,user:{id:user._id,name:user.name,email:user.email,role:user.role}})}
function authenticate(req,res,next){const h=req.headers.authorization||"";const token=h.startsWith("Bearer ")?h.substring(7):null;if(!token)return res.status(401).json({message:"Access token required"});try{req.user=jwt.verify(token,process.env.JWT_SECRET);next()}catch{return res.status(401).json({message:"Invalid or expired token"})}}
function authorize(...roles){return(req,res,next)=>{if(!req.user||!roles.includes(req.user.role))return res.status(403).json({message:"Forbidden"});next()}}
module.exports={register,signAccess,signRefresh,authenticate,authorize};
