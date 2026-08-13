# Guía para ejecutar Mercado en Visual Studio Code

Este documento explica cómo iniciar el proyecto desde tu propia computadora usando Visual Studio Code y abrirlo en Google Chrome.

## 1. Requisitos previos

Debes tener instalados estos programas:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/) versión 20 o superior. Al instalarlo también se instala `npm`.
- Google Chrome (opcional, pero recomendado para visualizar la aplicación).

Para confirmar que Node.js está instalado, abre una terminal y ejecuta:

```bash
node --version
npm --version
```

Ambos comandos deben mostrar un número de versión.

## 2. Abrir el proyecto en Visual Studio Code

1. Abre Visual Studio Code.
2. Selecciona **File > Open Folder...**.
3. Busca y abre la carpeta del proyecto: `Primer parcial DW`.
4. En la barra superior selecciona **Terminal > New Terminal**.

La terminal debe mostrar que está ubicada dentro de la carpeta del proyecto.

## 3. Instalar las dependencias

La primera vez que abras el proyecto (o después de descargar cambios del repositorio) ejecuta este comando en la terminal de Visual Studio Code:

```bash
npm install
```

Espera a que finalice. Este paso descarga React, Vite y los iconos usados por la aplicación.

## 4. Ejecutar la aplicación

En la misma terminal ejecuta:

```bash
npm run dev
```

Verás un resultado similar a este:

```text
Local: http://localhost:5173/
```

Mantén esta terminal abierta: mientras el comando esté ejecutándose, la aplicación estará disponible.

## 5. Abrirla en Google Chrome

1. Mantén el servidor iniciado con `npm run dev`.
2. Copia la dirección que muestra la terminal, normalmente `http://localhost:5173/`.
3. Abre Google Chrome.
4. Pega la dirección en la barra de navegación y presiona Enter.

También puedes hacer `Ctrl + clic` sobre la dirección en la terminal de Visual Studio Code.

## 6. Detener el servidor

Cuando termines de usar la aplicación, vuelve a la terminal de Visual Studio Code y presiona:

```text
Ctrl + C
```

Si Visual Studio Code pregunta si deseas finalizar el proceso, responde `Y` y luego presiona Enter.

## Solución de problemas

### Chrome muestra "ERR_CONNECTION_REFUSED"

El servidor no está activo. Vuelve a Visual Studio Code y ejecuta:

```bash
npm run dev
```

No cierres esa terminal mientras usas la página. Después recarga Chrome.

### El comando `npm` no se reconoce

Node.js no está instalado o Visual Studio Code se abrió antes de instalarlo. Instala Node.js desde [nodejs.org](https://nodejs.org/), cierra Visual Studio Code completamente y ábrelo de nuevo.

### El puerto 5173 está ocupado

Vite elegirá otro puerto automáticamente. Usa exactamente la URL que aparezca en la terminal, por ejemplo `http://localhost:5174/`.

### Se descargaron cambios nuevos del repositorio

Ejecuta estos comandos antes de iniciar el proyecto:

```bash
git pull
npm install
npm run dev
```

## Comandos de referencia

| Comando | Para qué sirve |
| --- | --- |
| `npm install` | Instala las dependencias del proyecto. |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera una versión optimizada para producción. |
| `Ctrl + C` | Detiene el servidor activo. |
