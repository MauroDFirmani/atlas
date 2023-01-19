import { Table, Column, Model, Index } from 'sequelize-typescript'

@Table
export class Invoice extends Model {

  @Index
  id!: string

  @Column
  fecha: string

  @Column
  tipo: string

  @Column
  monto: string
  
  @Column
  estado: string
  
}