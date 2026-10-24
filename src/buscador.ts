import { PUBLICOS } from './config';
import type { Producto } from './productos';

/**
 * El buscador.
 *
 * Busca dentro de la propia página, sin servidor: con un catálogo de tienda
 * (decenas o pocos cientos de prendas) cabe entero y responde al instante
 * mientras se escribe.
 *
 * La gente no escribe como está escrito el catálogo: pone "buzo" o "chompa"
 * y la prenda se llama "hoodie"; pone "camisa" y la categoría es "Camisetas".
 * Por eso cada prenda lleva, además de su nombre, las palabras con las que
 * se suele buscar su categoría y su público.
 */

const SINONIMOS: Record<string, string[]> = {
  Hoodies: ['hoodie', 'buzo', 'sudadera', 'chompa', 'saco', 'capucha', 'sueter'],
  Camisetas: ['camiseta', 'camisa', 'polo', 'playera', 'remera', 'tshirt', 't-shirt', 'franela', 'blusa'],
  Pantalones: ['pantalon', 'jogger', 'cargo', 'jean', 'calentador'],
  Conjuntos: ['conjunto', 'set', 'buzo deportivo', 'calentador', 'chandal'],
  Gorras: ['gorra', 'gorro', 'cap', 'visera', 'accesorio'],
  hombre: ['hombre', 'chico', 'caballero', 'masculino'],
  mujer: ['mujer', 'chica', 'dama', 'femenino'],
};

/** Minúsculas y sin tildes: "Pantalón" y "pantalon" son lo mismo al buscar. */
export function normaliza(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

/** Todo el texto por el que se puede encontrar una prenda. */
export function textoDe(p: Producto): string {
  const publicos = p.para === 'unisex' ? Object.keys(PUBLICOS) : [p.para];
  return normaliza(
    [
      p.nombre,
      p.categoria,
      ...(SINONIMOS[p.categoria] ?? []),
      ...publicos.flatMap((q) => SINONIMOS[q] ?? []),
      p.para === 'unisex' ? 'unisex' : '',
      ...(p.colores?.map((c) => c.nombre) ?? []),
      p.antes ? 'oferta rebaja descuento' : '',
      p.nuevo ? 'nuevo novedad' : '',
    ].join(' '),
  );
}

/**
 * Si la prenda cuadra con lo buscado: tienen que aparecer todas las palabras.
 * Se aceptan en plural ("camisas" encuentra "camisa").
 */
export function coincide(texto: string, consulta: string): boolean {
  const palabras = normaliza(consulta).split(/\s+/).filter(Boolean);
  return palabras.every((w) => {
    if (texto.includes(w)) return true;
    const singular = w.replace(/(es|s)$/, '');
    return singular.length >= 3 && texto.includes(singular);
  });
}
