/**
 * Lo que aparece al bajar: cada bloque con la clase `revela` entra con un
 * pequeño desplazamiento cuando llega a la pantalla. Una sola vez; después se
 * queda quieto.
 */
const observador = new IntersectionObserver(
  (entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('visible');
      observador.unobserve(e.target);
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
);

document.querySelectorAll('.revela').forEach((el) => observador.observe(el));

/*
 * La portada y las cintas se animan sin parar. Fuera de la pantalla no las ve
 * nadie, pero el celular las seguía moviendo mientras bajabas por el
 * catálogo: se pausan hasta que vuelven a verse.
 */
const vigia = new IntersectionObserver((entradas) => {
  for (const e of entradas) e.target.classList.toggle('dormida', !e.isIntersecting);
});
document.querySelectorAll('[data-anima]').forEach((el) => vigia.observe(el));
