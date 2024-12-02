import prisma from "../../../shared/prisma"
import ApiError from "../../errors/ApiError"
import bcrypt, { hash } from "bcrypt";
type TRegister = {
  name: string,
  email: string,
  password: string,
  role: "CUSTOMER" | "VENDOR"
}

const register = async (payload: TRegister) => {
  // Check user exist with email
  // hash password
  // save user
  console.log('in service payload', payload)
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

const newUser = await prisma.user.create({
  data: {
    name, email, password: hashedPassword, role
  }
})

const {password: _, ...userWithoutPassword} = newUser

return userWithoutPassword

}
const login = async () => {

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