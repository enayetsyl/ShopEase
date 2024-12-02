import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma"
import ApiError from "../../errors/ApiError"
import bcrypt from "bcrypt";
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
type TChangePassword = {
  oldPassword: string,
  newPassword: string,
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
  const { email, password} =  payload

  const user = await prisma.user.findUnique({
    where: { email}, include: {
      vendor: true,
      customer: true,
    },
  })

  if(!user) throw new ApiError(404, "User Not Found")

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if(!isPasswordValid) throw new ApiError(401, "Invalid Credentials.")

  if(user.role === "VENDOR" && (user.vendor?.isDeleted || user.vendor?.isSuspended)) throw new ApiError (403, "Vendor account is suspended or deleted. ")


  if(user.role === "CUSTOMER" && (user.customer?.isDeleted || user.customer?.isSuspended)) throw new ApiError (403, "Customer account is suspended or deleted. ")

  const { password: _, ...userWithoutPassword} = user

  const accessToken = jwtHelpers.generateToken(userWithoutPassword, config.jwt.jwt_secret as Secret, config.jwt.expires_in as string)
  
  const refreshToken = jwtHelpers.generateToken(userWithoutPassword, config.jwt.refresh_token_secret as Secret, config.jwt.refresh_token_expires_in as string)

  return {
    accessToken, refreshToken, userWithoutPassword
  }

}
const changePassword = async (user: any, payload: TChangePassword) => {
  // find user
  // check old password
  // hash new password
  // update new password
  const { newPassword, oldPassword} =  payload
  const { id, email } = user;

  console.log('user', user)
  console.log('payload', payload)

  const userData = await prisma.user.findUnique({
    where: { email}
  })

  if(!userData) throw new ApiError(404, "User Not Found")

  const isPasswordValid = await bcrypt.compare(oldPassword, userData.password)

  if(!isPasswordValid) throw new ApiError(401, "Invalid Credentials.")

  const hashedPassword = await bcrypt.hash(newPassword, 10)



  await prisma.user.update({
    where: {email: userData.email},
    data: {
      password: hashedPassword,

    }
  })

  return

}
const resetPassword = async () => {

}

export const AuthServices = {
  register,
  login,
  changePassword,
  resetPassword
}