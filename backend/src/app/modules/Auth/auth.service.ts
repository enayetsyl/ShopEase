import prisma from "../../../shared/prisma"

type TRegister = {
  name: string,
  email: string,
  password: string,
  role: string
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
  
}


  
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