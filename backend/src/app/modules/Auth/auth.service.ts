
type TRegister = {
  name: string,
  email: string,
  password: string,
  role: string
}

const register = async (payload: TRegister) => {
  console.log('in service payload', payload)
  
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