import User from '../model/user.js';
import bcrypt from 'bcryptjs'

export const signup= async(req,res)=>{
    try{
        const {fullname,email,password} = req.body;
        const user =await  User.findOne({email})
        if(user){
            return res.status(400).json({message:"User Already Exists"})
        }

        const hashPass = await bcrypt.hash(password,10)
        const createUser = new User({
            fullname:fullname,email:email,password:hashPass
        })
        await createUser.save();
        res.status(201).json({message:"User Created Successfully",user:{
            id:createUser.id,fullname:createUser.fullname , email:createUser.email
        }})
    }catch(err){
        console.log("Error: "+err.message);
        res.status(500).json({message:'internal server error' })

    }
}

export const login=async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch || !user){
            return res.status(400).json({message:"Invalid username or password !"})
        }else{
            res.status(200).json({message:"login Successful",user:{
                id:user.id ,fullname:user.fullname , email:user.email
            }})
        }
        
    }catch(err){
        console.log("error : ",err.message);
        return res.status(500).json({message:"internal server error !"})


    }
}