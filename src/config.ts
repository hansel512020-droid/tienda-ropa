/**
 * Todo lo que identifica a la tienda, en un solo sitio.
 *
 * Para cambiar el nombre, el WhatsApp o las redes, se toca solo este archivo:
 * el resto de la web lo lee de aquí.
 */
export const TIENDA = {
  nombre: 'Golden Wear',
  eslogan: 'Streetwear para la calle',
  descripcion: 'Ropa urbana con envío a todo Ecuador. Pides por WhatsApp y pagas al recibir.',

  /**
   * Número de WhatsApp que recibe los pedidos, con código de país y sin "+",
   * espacios ni guiones. Ejemplo para Ecuador: 593987654321.
   * Vacío: los botones de pedido avisan de que falta configurarlo.
   */
  whatsapp: '',

  redes: {
    instagram: '', // usuario sin @, p. ej. 'goldenwear.ec'
    tiktok: '', // usuario sin @
  },

  moneda: 'USD',

  envio: {
    /** Lo que se promete en la web sobre el envío. */
    resumen: 'Envío a todo Ecuador',
    plazo: 'De 2 a 5 días hábiles',
    /** Precio fijo del envío; sin poner, se confirma por WhatsApp según la ciudad. */
    costo: undefined as number | undefined,
    /** Desde cuánto el envío es gratis; sin poner, nunca. */
    gratisDesde: undefined as number | undefined,
  },

  /** Formas de pago que se ofrecen al hacer el pedido. La primera sale marcada. */
  pagos: ['Pago al recibir (contra entrega)', 'Transferencia bancaria'],

  cambios: 'Si la talla no te queda, te la cambiamos. Escríbenos dentro de los 5 días después de recibirla.',

  /**
   * Fotos de ambiente de la marca (gente con ropa urbana en la calle), para la
   * portada y la sección tipo revista. Rutas dentro de `public/`, por ejemplo
   * '/ambiente/1.jpg'. La primera, mejor horizontal, va de fondo en la
   * portada. Sin fotos, esas secciones se arman solo con color y prendas.
   */
  ambiente: [] as string[],
};

export const CATEGORIAS = ['Hoodies', 'Camisetas', 'Pantalones', 'Conjuntos', 'Gorras'] as const;
export type Categoria = (typeof CATEGORIAS)[number];

/** Cómo se agrupan las categorías en el menú, dentro de Hombre y de Mujer. */
export const GRUPOS: { nombre: string; categorias: Categoria[] }[] = [
  { nombre: 'Ropa', categorias: ['Hoodies', 'Camisetas', 'Pantalones', 'Conjuntos'] },
  { nombre: 'Accesorios', categorias: ['Gorras'] },
];

/** Para quién es cada prenda. Lo unisex sale tanto en Hombre como en Mujer. */
export const PUBLICOS = { hombre: 'Hombre', mujer: 'Mujer' } as const;
export type Publico = keyof typeof PUBLICOS;

/** La parte de la dirección de una categoría: "Hoodies" → "hoodies". */
export const ruta = (texto: string) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
