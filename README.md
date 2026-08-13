# Mercado

Aplicación de comercio electrónico responsiva desarrollada con React y Vite.

## Características

- Catálogo interactivo con buscador.
- Carrito lateral: suma cantidades de productos existentes, permite modificar cantidades, eliminar artículos y recalcula el total de inmediato.
- Modo claro y oscuro.
- Interfaz disponible en 10 idiomas: español, inglés, francés, alemán, italiano, portugués, japonés, coreano, chino y árabe.
- Sección **Arquitectura** dentro de la aplicación para documentar las herramientas y decisiones usadas.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Arquitectura

| Capa | Tecnología | Uso |
| --- | --- | --- |
| Interfaz | React | Componentes y estado de la aplicación. |
| Herramienta de desarrollo | Vite | Servidor local y compilación optimizada. |
| Estilos | CSS moderno | Diseño responsivo, temas y animaciones. |
| Iconos | Lucide React | Iconografía accesible y consistente. |
| Internacionalización | Diccionario local | Traducciones de interfaz para 10 idiomas. |

La explicación completa de las capas, archivos y flujo de datos se encuentra en [ARCHITECTURE.md](ARCHITECTURE.md).

## Informe visual

El informe con las capturas de la aplicación, la explicación de los modos claro y oscuro y el enlace del repositorio está disponible en [mercado-project-report.pdf](output/pdf/mercado-project-report.pdf).
