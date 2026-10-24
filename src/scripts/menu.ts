import { coincide } from '../buscador';

/**
 * El menú lateral (☰) y el buscador que lleva dentro.
 *
 * La lupa de la cabecera abre el mismo menú con el cursor ya en el buscador.
 * Mientras se escribe, el menú se cambia por los resultados; al borrar, vuelve.
 * Con "Enter" se va a la página de resultados (/buscar?q=…).
 */

interface Entrada {
  s: string;
  n: string;
  c: string;
  p: number;
  f: string;
  b: string;
  t: string;
}

const menu = document.querySelector<HTMLDialogElement>('[data-menu]');
const entrada = menu?.querySelector<HTMLInputElement>('[data-busca]');
const lista = menu?.querySelector<HTMLUListElement>('[data-resultados]');

let indice: Entrada[] = [];
try {
  indice = JSON.parse(document.getElementById('indice')?.textContent ?? '[]');
} catch {
  // Sin índice, el buscador del menú no sugiere; la página /buscar sigue funcionando.
}

const escapa = (texto: string) => texto.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function abre(conBusqueda: boolean) {
  if (!menu) return;
  if (!menu.open) menu.showModal();
  if (conBusqueda) entrada?.focus();
}

document.querySelectorAll('[data-abre-menu]').forEach((b) => b.addEventListener('click', () => abre(false)));
document.querySelectorAll('[data-abre-busqueda]').forEach((b) => b.addEventListener('click', () => abre(true)));
menu?.querySelector('[data-cierra-menu]')?.addEventListener('click', () => menu.close());
// Clic en el fondo oscuro: se cierra.
menu?.addEventListener('click', (e) => {
  if (e.target === menu) menu.close();
});
// Un enlace a otra parte de la misma página (#como-comprar) no recarga: hay que cerrar a mano.
menu?.addEventListener('click', (e) => {
  if ((e.target as Element).closest('a')) menu.close();
});

function pinta(consulta: string) {
  if (!menu || !lista) return;
  const q = consulta.trim();
  menu.classList.toggle('buscando', q.length > 0);
  if (!q) {
    lista.innerHTML = '';
    return;
  }
  const encontradas = indice.filter((i) => coincide(i.t, q));
  lista.innerHTML = encontradas.length
    ? encontradas
        .slice(0, 6)
        .map(
          (i) => `
          <li>
            <a class="resultado" href="/producto/${escapa(i.s)}">
              <span class="resultado-foto" style="background:${escapa(i.b)}"><img src="${escapa(i.f)}" alt="" width="44" height="56" /></span>
              <span><strong>${escapa(i.n)}</strong><span>${escapa(i.c)} · $${i.p.toFixed(2)}</span></span>
            </a>
          </li>`,
        )
        .join('') +
      `<li><a class="ver-todos" href="/buscar?q=${encodeURIComponent(q)}">Ver ${encontradas.length === 1 ? 'el resultado' : `los ${encontradas.length} resultados`} →</a></li>`
    : `<li class="sin-resultados">No encontramos «${escapa(q)}». Prueba con hoodie, camisa o gorra.</li>`;
}

entrada?.addEventListener('input', () => pinta(entrada.value));
// Al cerrar, el menú vuelve a como estaba.
menu?.addEventListener('close', () => {
  if (entrada) entrada.value = '';
  pinta('');
});
