# Tienda de ropa urbana

Catálogo con carrito. El cliente elige sus prendas y su talla, y el pedido le
llega a la tienda por WhatsApp, ya escrito, con los datos de envío.

## Cambiar el nombre, el WhatsApp o las redes

Todo está en `src/config.ts`:

- `nombre` y `eslogan`
- `whatsapp`: el número con código de país, sin `+` ni espacios. Por ejemplo, `593987654321`.
- `redes`: tu usuario de Instagram y de TikTok, sin `@`.
- `envio`: lo que se promete sobre el envío y, si quieres, un precio fijo.
- `pagos`: las formas de pago que se ofrecen.

## Añadir una prenda

1. Pon sus fotos en `public/productos/`. Mejor en vertical (4:5) y de menos de 300 KB.
2. En `src/productos.ts`, copia un bloque y cambia los datos.
3. Borra las prendas de ejemplo (las que llevan `ejemplo: true`). Cuando no quede ninguna,
   desaparece el aviso de "tienda en preparación".

## Publicarla

En Vercel, haz **Add New → Project**, importa este repositorio y pulsa **Deploy**. No hace
falta configurar nada más: cada cambio que se sube aquí se publica solo.

## Probarla en tu ordenador

```
npm install
npm run dev
```
