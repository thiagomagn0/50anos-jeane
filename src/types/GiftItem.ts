export type GiftItem = {
  id: number;
  name: string;
  image: string;
  store: string;
  color: string;
  material: string;
  note: string;
  price?: number; // 🔥 NOVO (IMPORTANTE)
  total: number;
  reserved: {
    name: string;
    phone: string;
  }[];
};