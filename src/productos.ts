import type { Categoria } from './config';

/**
 * El catálogo.
 *
 * Cada prenda es un bloque. Para añadir una, se copia un bloque, se cambian
 * los datos y se ponen sus fotos en `public/productos/`. El `slug` es la
 * dirección de su página (`/producto/<slug>`): en minúsculas, sin tildes ni
 * espacios, y distinto para cada prenda.
 *
 * Las que llevan `ejemplo: true` son de muestra: salen con la etiqueta
 * "Ejemplo" y, mientras quede alguna, la web avisa arriba de que la tienda
 * está en preparación. Se borran cuando lleguen las prendas de verdad.
 */
export interface Producto {
  slug: string;
  nombre: string;
  categoria: Categoria;
  /** En dólares. */
  precio: number;
  /** Precio anterior, si está rebajada: se muestra tachado. */
  antes?: number;
  /** Rutas dentro de `public/`. La primera es la de portada. */
  fotos: string[];
  tallas: string[];
  colores?: { nombre: string; hex: string }[];
  descripcion: string;
  /** Detalles cortos: tela, corte, cuidado… */
  detalles?: string[];
  nuevo?: boolean;
  agotado?: boolean;
  ejemplo?: boolean;
}

export const PRODUCTOS: Producto[] = [
  {
    slug: 'hoodie-oversize-negro',
    nombre: 'Hoodie Oversize Essential',
    categoria: 'Hoodies',
    precio: 29.99,
    antes: 34.99,
    fotos: ['/productos/hoodie.svg'],
    tallas: ['S', 'M', 'L', 'XL'],
    colores: [
      { nombre: 'Negro', hex: '#151515' },
      { nombre: 'Gris', hex: '#8a8a8a' },
      { nombre: 'Crema', hex: '#e9e1cf' },
    ],
    descripcion: 'Corte amplio y hombro caído, con capucha forrada y bolsillo canguro. La base de cualquier outfit.',
    detalles: ['Algodón perchado, 320 g', 'Corte oversize: si te gusta ajustado, pide una talla menos', 'Lavar del revés en agua fría'],
    nuevo: true,
    ejemplo: true,
  },
  {
    slug: 'camiseta-boxy-blanca',
    nombre: 'Camiseta Boxy Heavy',
    categoria: 'Camisetas',
    precio: 14.99,
    fotos: ['/productos/camiseta.svg'],
    tallas: ['S', 'M', 'L', 'XL'],
    colores: [
      { nombre: 'Blanco', hex: '#f4f4f2' },
      { nombre: 'Negro', hex: '#151515' },
    ],
    descripcion: 'Camiseta de algodón grueso con corte cuadrado y cuello reforzado. No se deforma con los lavados.',
    detalles: ['100 % algodón, 240 g', 'Corte boxy, un poco más corta y ancha', 'Lavar en agua fría'],
    ejemplo: true,
  },
  {
    slug: 'cargo-jogger',
    nombre: 'Cargo Jogger Utility',
    categoria: 'Pantalones',
    precio: 27.99,
    fotos: ['/productos/cargo.svg'],
    tallas: ['28', '30', '32', '34', '36'],
    colores: [
      { nombre: 'Verde oliva', hex: '#5b6142' },
      { nombre: 'Negro', hex: '#151515' },
    ],
    descripcion: 'Pantalón cargo con puño elástico, bolsillos laterales con solapa y cintura con cordón.',
    detalles: ['Gabardina con elastano', 'Seis bolsillos', 'Puño elástico en el tobillo'],
    ejemplo: true,
  },
  {
    slug: 'conjunto-track',
    nombre: 'Conjunto Track Retro',
    categoria: 'Conjuntos',
    precio: 39.99,
    antes: 49.99,
    fotos: ['/productos/conjunto.svg'],
    tallas: ['S', 'M', 'L', 'XL'],
    colores: [{ nombre: 'Negro / blanco', hex: '#151515' }],
    descripcion: 'Chaqueta y pantalón a juego, con franjas laterales. Estilo noventero para el día a día.',
    detalles: ['Poliéster suave', 'Chaqueta con cierre completo', 'Pantalón con bolsillos con cierre'],
    nuevo: true,
    ejemplo: true,
  },
  {
    slug: 'gorra-dad-hat',
    nombre: 'Gorra Dad Hat',
    categoria: 'Gorras',
    precio: 12.99,
    fotos: ['/productos/gorra.svg'],
    tallas: ['Única'],
    colores: [
      { nombre: 'Negro', hex: '#151515' },
      { nombre: 'Beige', hex: '#cdb991' },
    ],
    descripcion: 'Gorra de visera curva con ajuste metálico atrás. Va con todo.',
    detalles: ['Algodón lavado', 'Ajustable'],
    ejemplo: true,
  },
  {
    slug: 'camiseta-grafica',
    nombre: 'Camiseta Gráfica Mitad del Mundo',
    categoria: 'Camisetas',
    precio: 16.99,
    fotos: ['/productos/grafica.svg'],
    tallas: ['S', 'M', 'L', 'XL'],
    colores: [{ nombre: 'Negro', hex: '#151515' }],
    descripcion: 'Estampado grande en la espalda y logo pequeño en el pecho. Diseño propio.',
    detalles: ['100 % algodón, 220 g', 'Estampado en serigrafía'],
    agotado: true,
    ejemplo: true,
  },
];

export const hayEjemplos = PRODUCTOS.some((p) => p.ejemplo);

export function precio(valor: number): string {
  return `$${valor.toFixed(2)}`;
}
