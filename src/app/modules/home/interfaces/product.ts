
export interface Product {
  id_producto?: number;
  nombre: string;
  valor: number;
  detalle: string;
  img: string[];
}

export interface SendDataProduct {
  title: string,
  price: number,
  description: string,
  images: string[]
}

export interface Login {
  email: string,
  password: string
}
