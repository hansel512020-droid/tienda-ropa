import type { Categoria } from './config';

/**
 * El catálogo.
 *
 * Cada prenda es un bloque. Para añadir una, se copia un bloque, se cambian
 * los datos y se ponen sus fotos en `public/productos/`. El `slug` es la
 * dirección de su página (`/producto/<slug>`): en minúsculas, sin tildes ni
 * espacios, y distinto para cada prenda.
 *
 * Si cada color tiene su foto, se pone en `foto` del color: al elegirlo en la
 * ficha, la foto cambia. Las demás fotos (espalda, detalle, puesta) van en
 * `fotos`.
 *
 * Las que llevan `ejemplo: true` son de muestra: salen con la etiqueta
 * "Ejemplo" y, mientras quede alguna, la web avisa arriba de que la tienda
 * está en preparación. Se borran cuando lleguen las prendas de verdad.
 */
export interface Color {
  nombre: string;
  hex: string;
  foto?: string;
}

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
  /**
   * Color del fondo sobre el que flota la prenda en su tarjeta y en su ficha.
   * Con fotos recortadas (sin fondo) es lo que le da vida; con fotos que ya
   * traen su fondo, se ve solo en los bordes.
   */
  fondo: string;
  tallas: string[];
  colores?: Color[];
  descripcion: string;
  /** Detalles cortos: tela, corte, cuidado… */
  detalles?: string[];
  nuevo?: boolean;
  agotado?: boolean;
  ejemplo?: boolean;
}

export const PRODUCTOS: Producto[] = [
  {
    slug: 'hoodie-oversize',
    nombre: 'Hoodie Oversize Essential',
    categoria: 'Hoodies',
    precio: 29.99,
    antes: 34.99,
    fotos: ['/productos/hoodie-negro.svg', '/productos/hoodie-gris.svg', '/productos/hoodie-crema.svg'],
    fondo: '#e6e6e4',
    tallas: ['S', 'M', 'L', 'XL'],
    colores: [
      { nombre: 'Negro', hex: '#1c1c1c', foto: '/productos/hoodie-negro.svg' },
      { nombre: 'Gris', hex: '#8d9094', foto: '/productos/hoodie-gris.svg' },
      { nombre: 'Crema', hex: '#e9e0cb', foto: '/productos/hoodie-crema.svg' },
    ],
    descripcion: 'Corte amplio y hombro caído, con capucha forrada y bolsillo canguro. La base de cualquier outfit.',
    detalles: ['Algodón perchado, 320 g', 'Corte oversize: si te gusta ajustado, pide una talla menos', 'Lavar del revés en agua fría'],
    nuevo: true,
    ejemplo: true,
  },
  {
    slug: 'camiseta-boxy',
    nombre: 'Camiseta Boxy Heavy',
    categoria: 'Camisetas',
    precio: 14.99,
    fotos: ['/productos/camiseta-blanco.svg', '/productos/camiseta-negro.svg'],
    fondo: '#2a2a2a',
    tallas: ['S', 'M', 'L', 'XL'],
    colores: [
      { nombre: 'Blanco', hex: '#f7f7f4', foto: '/productos/camiseta-blanco.svg' },
      { nombre: 'Negro', hex: '#1c1c1c', foto: '/productos/camiseta-negro.svg' },
    ],
    descripcion: 'Camiseta de algodón grueso con corte cuadrado y cuello reforzado. No se deforma con los lavados.',
    detalles: ['100 % algodón, 240 g', 'Corte boxy, un poco más corta y ancha', 'Lavar en agua fría'],
    nuevo: true,
    ejemplo: true,
  },
  {
    slug: 'cargo-jogger',
    nombre: 'Cargo Jogger Utility',
    categoria: 'Pantalones',
    precio: 27.99,
    fotos: ['/productos/cargo-oliva.svg', '/productos/cargo-negro.svg'],
    fondo: '#d9d9d7',
    tallas: ['28', '30', '32', '34', '36'],
    colores: [
      { nombre: 'Verde oliva', hex: '#5b6142', foto: '/productos/cargo-oliva.svg' },
      { nombre: 'Negro', hex: '#232323', foto: '/productos/cargo-negro.svg' },
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
    fotos: ['/productos/conjunto-negro.svg'],
    fondo: '#f0f0ee',
    tallas: ['S', 'M', 'L', 'XL'],
    colores: [{ nombre: 'Negro / blanco', hex: '#1c1c1c' }],
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
    fotos: ['/productos/gorra-negro.svg', '/productos/gorra-beige.svg'],
    fondo: '#cfcfcd',
    tallas: ['Única'],
    colores: [
      { nombre: 'Negro', hex: '#1c1c1c', foto: '/productos/gorra-negro.svg' },
      { nombre: 'Beige', hex: '#cdb991', foto: '/productos/gorra-beige.svg' },
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
    fotos: ['/productos/grafica-negro.svg'],
    fondo: '#e2e2e0',
    tallas: ['S', 'M', 'L', 'XL'],
    colores: [{ nombre: 'Negro', hex: '#1c1c1c' }],
    descripcion: 'Estampado grande en la espalda y logo pequeño en el pecho. Diseño propio.',
    detalles: ['100 % algodón, 220 g', 'Estampado en serigrafía'],
    agotado: true,
    ejemplo: true,
  },
];

export const hayEjemplos = PRODUCTOS.some((p) => p.ejemplo);

/** Lo nuevo y disponible, para el carrusel y la portada. */
export const novedades = PRODUCTOS.filter((p) => p.nuevo && !p.agotado);

export function precio(valor: number): string {
  return `$${valor.toFixed(2)}`;
}

/** Nombre único para la transición de la foto entre la tarjeta y la ficha. */
export const transicion = (slug: string) => `foto-${slug}`;
