# 🛍️ TechStore API - Catálogo de Productos y Categorías

API REST desarrollada con **Node.js**, **Express**, **Prisma ORM**, **PostgreSQL** y **Zod** para la ayudantía de Ingeniería de Software.

---

## 🚀 Puesta en marcha rápida (Quickstart)

### 1. Clonar e Instalar dependencias

```bash
git clone <URL_DEL_REPOSITORIO>
cd AYUDANTIA3_ING_SW
npm install
```

### 2. Configurar PostgreSQL y Variables de Entorno

1. Asegúrate de tener tu servidor de **PostgreSQL** iniciado (pgAdmin o servicio local).
2. Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

3. Ajusta tu usuario y contraseña en el archivo `.env`:

```env
DATABASE_URL="postgresql://TU_USUARIO:TU_PASSWORD@localhost:5432/techstore_db?schema=public"
PORT=3000
```

### 3. Ejecutar Migraciones y Cargar Datos de Prueba (Seed)

```bash
# Ejecutar las migraciones de Prisma (creará las tablas en PostgreSQL)
npm run prisma:migrate

# Cargar categorías y productos de prueba iniciales
npm run prisma:seed
```

### 4. Iniciar la API en modo desarrollo

```bash
npm run dev
```

La API estará corriendo en: `http://localhost:3000`

---

## 📡 Endpoints de la API

### 🏷️ Categorías (`/api/categories`)
| Método | Endpoint | Descripción |
| :---: | :--- | :--- |
| `GET` | `/api/categories` | Listar todas las categorías con conteo de productos |
| `GET` | `/api/categories/:id` | Obtener una categoría por ID |
| `POST` | `/api/categories` | Crear una nueva categoría (Valida con Zod) |
| `PUT` | `/api/categories/:id` | Actualizar una categoría existente |
| `DELETE` | `/api/categories/:id` | Eliminar una categoría |

### 📦 Productos (`/api/products`)
| Método | Endpoint | Descripción |
| :---: | :--- | :--- |
| `GET` | `/api/products` | Listar productos con filtros (`categoryId`, `minPrice`, `maxPrice`, `inStock`) |
| `GET` | `/api/products/:id` | Obtener un producto por ID |
| `POST` | `/api/products` | Crear un nuevo producto (Valida con Zod) |
| `PUT` | `/api/products/:id` | Actualizar un producto existente |
| `DELETE` | `/api/products/:id` | Eliminar un producto |

---

## 🛠️ Herramientas y Scripts Útiles

- **Visor gráfico de la base de datos (Prisma Studio):**

  ```bash
  npm run prisma:studio
  ```

  *(Abre una interfaz web en `http://localhost:5555` para ver y editar registros en PostgreSQL).*

- **Probar los endpoints:**
  Abre el archivo `requests.http` en el editor con la extensión **REST Client** (o importa las peticiones en Postman / Thunder Client).

---

## 📂 Estructura del Proyecto

```text
AYUDANTIA3_ING_SW/
├── prisma/
│   ├── schema.prisma       # Modelos Category y Product (PostgreSQL)
│   └── seed.js             # Datos iniciales de prueba
├── src/
│   ├── config/
│   │   └── prisma.js       # Conexión con PrismaClient
│   ├── controllers/
│   │   ├── category.controller.js
│   │   └── product.controller.js
│   ├── middlewares/
│   │   ├── error.middleware.js     # Manejo global de errores y Prisma
│   │   └── validate.middleware.js  # Middleware de validación con Zod
│   ├── routes/
│   │   ├── category.routes.js
│   │   ├── product.routes.js
│   │   └── index.js
│   ├── schemas/
│   │   ├── category.schema.js      # Validaciones Zod
│   │   └── product.schema.js
│   ├── app.js              # Configuración de Express y middlewares
│   └── server.js           # Inicio del servidor HTTP
├── .env.example            # Plantilla de variables de entorno
├── requests.http           # Peticiones HTTP listas para probar
└── package.json            # Dependencias y scripts del proyecto
```
