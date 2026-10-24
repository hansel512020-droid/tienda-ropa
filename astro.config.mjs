import { defineConfig } from 'astro/config';

/*
 * La dirección pública hace falta para las vistas previas al compartir un
 * enlace (WhatsApp, Instagram): la foto tiene que ir con la dirección
 * completa. En Vercel se toma sola; con dominio propio, se pone en SITIO.
 */
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = process.env.SITIO ?? (vercel ? `https://${vercel}` : 'http://localhost:4321');

export default defineConfig({
  site,
});
