const {z}=require('zod')


//creating an object schema

const signupSchema=z.object({
    name:z 
    .string({required_error:"name is required"})
    .trim()
    .min(3,{message:"Name must be at leats of 3 char"})
    .max(30,{message:"Name must not be more than 30 characters"}),
    email:z 
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email"})
    .min(3,{message:"Email must be at leats of 3 char"})
    .max(30,{message:"Email must not be more than 30 characters"}),
    password:z 
    .string({required_error:"Password is required"})
    .trim()
    .min(8,{message:"Password must be at least of 8 char"})
    .max(30,{message:"Password must not be more than 30 characters"}),
});

const loginSchema=z.object({
    email:z 
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email"})
    .min(3,{message:"Email must be at leats of 3 char"})
    .max(30,{message:"Email must not be more than 30 characters"}),
    password:z 
    .string({required_error:"Password is required"})
    .trim()
    .min(8,{message:"Password must be at least of 8 char"})
    .max(30,{message:"Password must not be more than 30 characters"}),
});
module.exports={signupSchema,loginSchema};