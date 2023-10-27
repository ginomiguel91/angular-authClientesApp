export interface AuthResponse {
  mensaje?: string;
  user?: User;
  token?: string;
  error?: string;
}

export interface User {
  // password: null;
  username: string;
  authorities: Authority[];
  // accountNonExpired: boolean;
  // accountNonLocked: boolean;
  // credentialsNonExpired: boolean;
  enabled: boolean;
}

export interface Authority {
  authority: string;
}
export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  createAt: Date;
  facturas: Factura[];
  foto: string;
}

export interface Factura {
  id: number;
  descripcion: string;
  observacion: null | string;
  createAt: Date;
  items: Item[];
  total: number;
}

export interface Item {
  id: number;
  cantidad: number;
  producto: Producto;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  createAt: Date;
}
export interface JwtToken {
  sub?: string; // Campo sub (sujeto) que contiene el nombre de usuario
  authorities?: string; // Campo authorities que contiene un arreglo JSON de autoridades como una cadena
  iat?: number;
  exp?: number;
  // Otros campos que puedas tener en tu token
}
