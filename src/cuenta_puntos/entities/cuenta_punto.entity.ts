import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('Cuenta_puntos')
export class CuentaPunto {
    @PrimaryColumn()
    id: string

    @Column()
    cantidad: number
    
    @Column()
    created_at: string
}
