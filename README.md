## GEMINI.MD:

Como se indicó en el correo, se me permite emplear herramientas basadas en IA, como los agentes de desarrollo. De esta manera, apuesto por la idea del avance de la tecnología en nuestro campo, sin desentenderme del correcto funcionamiento del código del cual soy autor.

En este proyecto definí estándares de diseño y conducta en el fichero GEMINI.md, con el objetivo de optimizar el tiempo de desarrollo y mejorar la calidad del código.

## Stack de Tecnologías

- **React 19**: Biblioteca para la interfaz de usuario.
- **TypeScript**: Tipado estático para mayor robustez.
- **Vite**: Herramienta de construcción rápida.
- **Tailwind CSS**: Framework de utilidades CSS.
- **JSON Server**: API Mock para el desarrollo y pruebas.
- **React Router Dom 7**: Gestión avanzada de navegación.

---

## Instrucciones de Arranque

Para que la aplicación funcione correctamente, deben estar corriendo simultáneamente el **servidor de datos** y el **frontend**.

### 1. Instalación

```bash
npm install
```

### 2. Iniciar API (Mock)

Inicia el servidor en `http://localhost:3001`:

```bash
npm run mock-server
```

### 3. Iniciar Aplicación
Inicia Vite en modo desarrollo (usualmente en `http://localhost:5173`):
```bash
npm run dev
```

---

## 🔍 Criterios de Búsqueda

Para consultar el estado de cuenta de un cliente, la aplicación permite realizar búsquedas utilizando los siguientes parámetros:

- **ID de Cliente**: Identificador numérico único (ej. `1001`, `1005`).
- **Correo Electrónico**: Dirección de email asociada a la cuenta (ej. `anthony@example.com`, `sarah@example.com`).

Los datos de prueba están disponibles en el archivo `db.json`.

---

## Scripts Útiles

- `npm run build`: Compila para producción.
- `npm run lint`: Ejecuta el análisis de calidad de código.
- `npm run preview`: Previsualiza la build de producción localmente.

---

### Persistencia Mock

- Se emplea `JSON Server` para emular una API real mediante peticiones `PATCH`. Los cambios en el estado de las facturas (ej. de "Pending" a "Paid") persisten físicamente en la base de datos mock.
