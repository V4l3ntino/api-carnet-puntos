import * as bcrypt from 'bcryptjs';
import { format } from 'date-fns';
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

export const getDateNow = ( ) => {
  const fechaActual = new Date();
  return format(fechaActual, "yyyy-MM-dd'T'HH:mm");
}

export function calcularEdad(fechaNacimientoStr: string) {
  // Convierte la fecha de nacimiento de string a Date
  const fechaNacimiento = new Date(fechaNacimientoStr);

  // Obtén la fecha actual
  const fechaActual = new Date();

  // Calcula la diferencia en años
  let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

  // Ajusta la edad si aún no ha pasado el cumpleaños este año
  const mesActual = fechaActual.getMonth();
  const diaActual = fechaActual.getDate();
  const mesNacimiento = fechaNacimiento.getMonth();
  const diaNacimiento = fechaNacimiento.getDate();

  if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
    edad--;
  }

  return edad;
}

export const deleteUserAccount = async(tipo:string, id: string) => {
  const request = await fetch(`http://localhost:3000/api/${tipo}/${id}`,{method: 'DELETE'})
  return await request.json()
}