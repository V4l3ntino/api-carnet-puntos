import * as bcrypt from 'bcryptjs';
import { CreateTablaDto } from 'src/tablas/dto/create-tabla.dto';


export const newMessage = (value:string, status:number) => {
    const message: messageResponse = {
        msg: value,
        status: status
    }
    return message
}


export async function hashPassword(password:string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.error("Error:", error);
  }
}

export const veryPassword = async (password:string, hash:string): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    console.log(error);
  }
}  


export const createTables = async (tabla: CreateTablaDto) => {
  const request = await fetch('http://localhost:3000/api/tablas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tabla)
  })
  return await request.json()
}