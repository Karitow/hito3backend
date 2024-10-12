import bcrypt from 'bcrypt'

export const hashPass = async (password) => await bcrypt.hash(password, 10)

export const comparePass = async (password, encryptedPass) => await bcrypt.compare(password, encryptedPass) 