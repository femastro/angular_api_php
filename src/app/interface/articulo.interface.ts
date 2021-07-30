export interface Articulo {
  id: number;
  cod_Articulo: string;
  marca: string;
  modelo: string;
  medida: string;
  cod_Proveedor: string;
  cantidad: number,
  image: string
}

export interface Formulario {
  marca: string;
  modelo: string;
  medida: string;
  cod_Proveedor: string;
  cantidad: number;
  image: string
}
