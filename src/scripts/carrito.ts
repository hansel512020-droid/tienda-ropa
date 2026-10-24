import { TIENDA } from '../config';

/**
 * El carrito.
 *
 * Vive en el navegador de quien compra: no hay cuentas ni base de datos. Al
 * terminar, el pedido se arma como un mensaje de WhatsApp con las prendas,
 * las tallas, el total y los datos de envío, y se abre la conversación con la
 * tienda para que el cliente solo tenga que pulsar "enviar".
 */

export interface Linea {
  slug: string;
  nombre: string;
  precio: number;
  foto: string;
  talla: string;
  color?: string;
  cantidad: number;
}

const CLAVE = 'tienda/carrito';

function lee(): Linea[] {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE) ?? '[]');
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function guarda(lineas: Linea[]) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(lineas));
  } catch {
    // Navegación privada o almacenamiento lleno: el carrito dura lo que la página.
  }
  pinta(lineas);
}

let lineas = lee();

const dinero = (n: number) => `$${n.toFixed(2)}`;
const mismaLinea = (a: Linea, b: Pick<Linea, 'slug' | 'talla' | 'color'>) =>
  a.slug === b.slug && a.talla === b.talla && (a.color ?? '') === (b.color ?? '');

export function anade(nueva: Linea) {
  const existente = lineas.find((l) => mismaLinea(l, nueva));
  if (existente) existente.cantidad = Math.min(existente.cantidad + nueva.cantidad, 20);
  else lineas.push(nueva);
  guarda(lineas);
}

function cambia(i: number, delta: number) {
  const l = lineas[i];
  if (!l) return;
  l.cantidad += delta;
  if (l.cantidad <= 0) lineas.splice(i, 1);
  guarda(lineas);
}

const subtotal = () => lineas.reduce((s, l) => s + l.precio * l.cantidad, 0);

function textoEnvio(total: number): string {
  const { costo, gratisDesde } = TIENDA.envio;
  if (gratisDesde !== undefined && total >= gratisDesde) return 'Gratis';
  if (costo !== undefined) return dinero(costo);
  return 'Se confirma por WhatsApp según tu ciudad';
}

// ── Pintar ──────────────────────────────────────────────────────────────────

const $ = <T extends Element>(sel: string) => document.querySelector<T>(sel);

function escapa(texto: string) {
  return texto.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function pinta(ls: Linea[]) {
  const unidades = ls.reduce((s, l) => s + l.cantidad, 0);
  const contador = $<HTMLElement>('[data-contador]');
  if (contador) {
    contador.hidden = unidades === 0;
    contador.textContent = String(unidades);
  }

  const lista = $<HTMLUListElement>('[data-lineas]');
  if (!lista) return;
  lista.innerHTML = ls
    .map(
      (l, i) => `
      <li class="linea">
        <img src="${escapa(l.foto)}" alt="" width="72" height="90" />
        <div class="linea-texto">
          <strong>${escapa(l.nombre)}</strong>
          <span>Talla ${escapa(l.talla)}${l.color ? ` · ${escapa(l.color)}` : ''}</span>
          <span>${dinero(l.precio)}</span>
        </div>
        <div class="linea-lado">
          <div class="cantidad">
            <button type="button" data-cambia="${i}" data-delta="-1" aria-label="Quitar uno">−</button>
            <output>${l.cantidad}</output>
            <button type="button" data-cambia="${i}" data-delta="1" aria-label="Añadir uno">+</button>
          </div>
          <strong>${dinero(l.precio * l.cantidad)}</strong>
        </div>
      </li>`,
    )
    .join('');

  $<HTMLElement>('[data-vacio]')!.hidden = ls.length > 0;
  $<HTMLFormElement>('[data-pedido]')!.hidden = ls.length === 0;
  const total = subtotal();
  $<HTMLElement>('[data-subtotal]')!.textContent = dinero(total);
  $<HTMLElement>('[data-envio]')!.textContent = textoEnvio(total);
}

// ── Abrir y cerrar ──────────────────────────────────────────────────────────

const dialogo = $<HTMLDialogElement>('[data-carrito]');

export function abreCarrito() {
  if (dialogo && !dialogo.open) dialogo.showModal();
}

document.querySelectorAll('[data-abre-carrito]').forEach((b) => b.addEventListener('click', abreCarrito));
$('[data-cierra-carrito]')?.addEventListener('click', () => dialogo?.close());
// Clic en el fondo oscuro: se cierra.
dialogo?.addEventListener('click', (e) => {
  if (e.target === dialogo) dialogo.close();
});

$('[data-lineas]')?.addEventListener('click', (e) => {
  const boton = (e.target as Element).closest<HTMLElement>('[data-cambia]');
  if (boton) cambia(Number(boton.dataset.cambia), Number(boton.dataset.delta));
});

// Otra pestaña cambió el carrito: se sincroniza.
window.addEventListener('storage', (e) => {
  if (e.key === CLAVE) {
    lineas = lee();
    pinta(lineas);
  }
});

// ── El pedido ───────────────────────────────────────────────────────────────

export function mensajePedido(ls: Linea[], datos: Record<string, string>): string {
  const total = ls.reduce((s, l) => s + l.precio * l.cantidad, 0);
  const envio = textoEnvio(total);
  const conEnvio =
    TIENDA.envio.costo !== undefined && envio !== 'Gratis' ? total + TIENDA.envio.costo : total;
  return [
    `¡Hola ${TIENDA.nombre}! Quiero hacer este pedido:`,
    '',
    ...ls.map(
      (l) =>
        `• ${l.cantidad} × ${l.nombre} — Talla ${l.talla}${l.color ? `, ${l.color}` : ''} — ${dinero(l.precio * l.cantidad)}`,
    ),
    '',
    `Subtotal: ${dinero(total)}`,
    `Envío: ${envio}`,
    ...(conEnvio !== total || envio === 'Gratis' ? [`Total: ${dinero(conEnvio)}`] : []),
    '',
    `Nombre: ${datos.nombre}`,
    `Ciudad: ${datos.ciudad}`,
    `Dirección: ${datos.direccion}`,
    ...(datos.referencia ? [`Referencia: ${datos.referencia}`] : []),
    `Pago: ${datos.pago}`,
  ].join('\n');
}

const formulario = $<HTMLFormElement>('[data-pedido]');
formulario?.addEventListener('submit', (e) => {
  e.preventDefault();
  const error = $<HTMLElement>('[data-error]')!;
  const datos = Object.fromEntries(
    [...new FormData(formulario).entries()].map(([k, v]) => [k, String(v).trim()]),
  );

  let falta: HTMLInputElement | null = null;
  for (const campo of ['nombre', 'ciudad', 'direccion']) {
    const input = formulario.elements.namedItem(campo) as HTMLInputElement;
    const vacio = !datos[campo];
    input.setAttribute('aria-invalid', String(vacio));
    if (vacio && !falta) falta = input;
  }
  if (falta) {
    error.textContent = 'Completa tu nombre, ciudad y dirección para el envío.';
    error.hidden = false;
    falta.focus();
    return;
  }
  if (!TIENDA.whatsapp) {
    error.textContent = 'La tienda todavía no tiene configurado su WhatsApp.';
    error.hidden = false;
    return;
  }
  error.hidden = true;
  const url = `https://wa.me/${TIENDA.whatsapp}?text=${encodeURIComponent(mensajePedido(lineas, datos))}`;
  window.location.href = url;
});

pinta(lineas);
