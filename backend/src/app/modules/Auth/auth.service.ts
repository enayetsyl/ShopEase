import prisma from "../../../shared/prisma"
import ApiError from "../../errors/ApiError"
import bcrypt, { hash } from "bcrypt";
type TRegister = {
  name: string,
  email: string,
  password: string,
  role: "CUSTOMER" | "VENDOR"
}
type TLogin = {
  email: string,
  password: string,
}

const register = async (payload: TRegister) => {
  // Check user exist with email
  // hash password
  // save user
  // create vender/customer
  const { name, email, password, role} = payload

  const existingUser = await prisma.user.findUnique({
    where:{
      email
    }
})

if(existingUser){
  throw new ApiError(400, "User with this email already exists" )
}

const hashedPassword = await bcrypt.hash(password, 10)

return await prisma.$transaction(async(p) =>{
  const newUser = await p.user.create({
    data: {
      name, email, password: hashedPassword, role
    }
  })
  
  if(role === "VENDOR"){
    await p.vendor.create({
      data: {
        name,
        email: newUser.email
        
      },
    });
  } else if (role === "CUSTOMER"){
    await p.customer.create({
      data:{
        name, email
      }
    })
  }

    // Exclude the password from the response
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;


})

}


const login = async (payload: TLogin) => {
  // find user
  // check whether password correct
  // generate access and refresh token 
  // return data

  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email}, include: {
      vendor: true,
      customer: true,
    },
  })

  console.log(userData)

}
const changePassword = async () => {

}
const resetPassword = async () => {

}

export const AuthServices = {
  register,
  login,
  changePassword,
  resetPassword
}