export type Reserva = {
  item: string;
  name: string;
  phone: string;
  status: "pendente" | "pago",
  createdAt: Date,
  type: "pix" | "presente",
price: number
};