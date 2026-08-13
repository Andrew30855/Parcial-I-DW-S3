# Arquitectura — Mercado

## Stack real

La aplicación usa **Vite + React + JavaScript (ES modules)**. No es un proyecto de Next.js, no utiliza rutas de servidor, API propia ni componentes Server/Client. Toda la interfaz se renderiza en el navegador del usuario.

## Estructura del proyecto

```text
mercado-vivo/
├── src/
│   ├── main.jsx          # Punto de entrada y componente de la aplicación
│   └── styles.css        # Estilos globales, temas y diseño responsivo
├── .gitignore            # Archivos que Git no debe publicar
├── index.html            # Documento HTML que contiene el nodo #root
├── package.json          # Scripts y dependencias del proyecto
├── package-lock.json     # Versiones exactas de dependencias instaladas
├── README.md             # Información general del proyecto
└── ARCHITECTURE.md       # Este documento
```

Las carpetas `node_modules/` y `dist/` no forman parte del código fuente. La primera se crea con `npm install`; la segunda se crea con `npm run build`. Ambas están excluidas mediante `.gitignore`.

## Raíz del proyecto

| Archivo | Responsabilidad |
| --- | --- |
| `package.json` | Declara los paquetes necesarios y los scripts de ejecución. |
| `package-lock.json` | Mantiene las versiones concretas usadas al instalar paquetes. |
| `index.html` | Define el elemento `<div id="root">` que React utiliza para montar la interfaz. |
| `.gitignore` | Excluye dependencias, compilaciones y registros locales de Git. |
| `README.md` | Resume las características principales del proyecto. |
| `ARCHITECTURE.md` | Describe la estructura, decisiones y flujo interno. |

## Dependencias utilizadas

| Tecnología | Uso dentro de la aplicación |
| --- | --- |
| React | Crea la interfaz mediante componentes, estado y renderizado reactivo. |
| React DOM | Monta React en el elemento `#root` de la página HTML. |
| Vite | Servidor de desarrollo y compilación de producción. |
| Lucide React | Iconos de carrito, búsqueda, eliminación, cantidad, tema e idioma. |
| CSS moderno | Diseño visual, responsividad, transiciones, modo claro y oscuro. |
| Google Fonts | Tipografías `DM Sans`, `DM Mono` y `Playfair Display`. |

## Scripts disponibles

| Comando | Función |
| --- | --- |
| `npm run dev` | Inicia Vite para desarrollar la aplicación. |
| `npm run de` | Alias de `npm run dev`, incluido para que también funcione el comando escrito por error. |
| `npm run build` | Genera la versión de producción dentro de `dist/`. |
| `npm run preview` | Abre una vista local de la compilación de producción. |

## Código fuente

### `src/main.jsx`

Este archivo contiene el componente principal `App` y el montaje de React.

- Declara el catálogo simulado `products` con identificador, nombre, categoría, precio y representación visual de cada artículo.
- Incluye el diccionario `translations` con textos visibles en español, inglés, francés, alemán, italiano, portugués, japonés, coreano, chino y árabe.
- Administra el estado del carrito con `useState`.
- Calcula el total con `useMemo`, para que se actualice automáticamente al cambiar el carrito.
- Renderiza el encabezado, buscador, catálogo, beneficios, sección de arquitectura, pie de página y drawer del carrito.

### `src/styles.css`

Contiene todos los estilos de la aplicación.

- Variables y reglas globales de diseño.
- Maquetación de escritorio mediante CSS Grid y Flexbox.
- Diseño adaptable para móviles mediante una media query en `700px`.
- Reglas del modo oscuro mediante la clase `.dark`.
- Animación de entrada del carrito lateral y estados interactivos en botones y tarjetas.

## Flujo de datos

```text
products (catálogo local)
       │
       ▼
Tarjetas de producto
       │  botón "Agregar al carrito"
       ▼
add(product)
       │
       ▼
cart (estado de React)
       │
       ├──► Drawer del carrito: lista, suma, resta y eliminación
       │
       └──► total (useMemo): precio × cantidad de cada producto
                       │
                       ▼
                 Total a pagar mostrado en pantalla
```

## Reglas del carrito

1. `add(product)` busca el producto por `id` dentro del carrito.
2. Si ya existe, aumenta `quantity` en uno sin crear una tarjeta duplicada.
3. Si no existe, añade una nueva entrada con `quantity: 1`.
4. `change(id, delta)` incrementa o disminuye la cantidad.
5. Si la cantidad llega a cero, el producto se elimina automáticamente.
6. `remove(id)` elimina directamente un producto mediante el botón de basurero.
7. El total se deriva del estado actual: `price * quantity` para cada artículo.

## Internacionalización y temas

La interfaz usa un diccionario local llamado `translations`. El idioma elegido se almacena en el estado `lang`; cada texto visible se obtiene de `translations[lang]`. Para árabe se añade `dir="rtl"` al contenedor principal y la interfaz se adapta a la dirección de lectura.

El tema se gestiona con el estado booleano `dark`. Al activarlo, la clase `dark` se coloca en el contenedor principal y CSS aplica los colores del modo oscuro.

## Diseño responsivo

En pantallas amplias, el catálogo muestra tres columnas y el hero usa dos columnas. En teléfonos, la media query reorganiza el hero en una sola columna, muestra dos tarjetas por fila, coloca los beneficios en columna y ajusta el tamaño de controles y tipografía para evitar desbordamientos.

## Convención de idioma

El código técnico utiliza identificadores en inglés: `products`, `cart`, `add`, `change`, `remove`, `translations`, `dark`, `query` y `total`. La documentación está en español y la interfaz se puede traducir a los diez idiomas disponibles.
