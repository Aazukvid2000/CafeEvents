# 📚 CRUD de Libros - Next.js + MySQL + Prisma

Proyecto CRUD completo de libros y categorías, construido con Next.js 16, Prisma ORM y MySQL.

**Asignatura:** P2 (30%) Libros - géneros  
**Profesor:** Moises Emmanuel Ramirez Guzman

---

## ✨ Características

✅ **CRUD Completo de Libros** - Crear, leer, actualizar y eliminar libros  
✅ **CRUD Completo de Categorías** - Gestión de categorías de libros  
✅ **Relaciones en BD** - Libros asociados a categorías  
✅ **UI Moderna** - Interfaz oscura con Tailwind CSS  
✅ **Server Actions** - Todas las operaciones usando Server Actions de Next.js  
✅ **Prisma ORM** - ORM moderno para MySQL  
✅ **Pruebas E2E** - Suite completa con Playwright  
✅ **Validación** - Validación de datos en cliente y servidor  

---

## 🛠️ Tecnologías

- **Next.js 16** - React framework con App Router y Server Actions
- **TypeScript** - Tipado estático
- **Prisma ORM** - ORM moderno para MySQL
- **MySQL** - Base de datos relacional
- **Tailwind CSS** - Framework de estilos utility-first
- **Playwright** - Framework de pruebas E2E
- **ESLint** - Linter para TypeScript/JavaScript

---

## 🚀 Instalación y Configuración

### Paso 1: Clonar/Descargar el Proyecto

```bash
# Si usas git
git clone <url-del-repo>
cd nextjs-libros-crud

# O simplemente descomprime el archivo y entra a la carpeta
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Levantar MySQL con Docker

Si tienes Docker instalado, ejecuta:

```bash
docker run -d \
  --name mysql_libros \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=libros_db \
  -p 3306:3306 \
  mysql:8
```

**Alternativa sin Docker:**
- Instala MySQL directamente en tu máquina
- Crea una BD llamada `libros_db`
- Asegúrate que MySQL esté corriendo en `localhost:3306`

### Paso 4: Configurar Variables de Entorno

Edita el archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="mysql://root:password@localhost:3306/libros_db"
```

**Reemplaza:**
- `root` por tu usuario de MySQL (si es diferente)
- `password` por tu contraseña de MySQL
- `localhost:3306` si tu BD está en otro host/puerto

### Paso 5: Crear Tablas en la BD

```bash
# Generar cliente Prisma
npx prisma generate

# Crear tablas en la BD
npx prisma db push
```

### Paso 6: Poblar la BD con Datos de Ejemplo

```bash
npm run seed
```

Esto crea:
- **4 categorías**: Ficción, Ciencia, Historia, Tecnología
- **6 libros** de ejemplo asociados a esas categorías

### Paso 7: Iniciar el Servidor

```bash
npm run dev
```

Abre tu navegador en: **http://localhost:3000**

---

## 📖 Uso de la Aplicación

### Página de Inicio
- Vista general del proyecto
- Enlaces directos a Libros y Categorías

### 📕 Gestión de Libros
- **Listar**: `/books` - Ver todos los libros
- **Crear**: `/books/new` - Agregar nuevo libro
- **Editar**: `/books/[id]/edit` - Modificar un libro
- **Eliminar**: Botón en la tabla de libros

Cada libro debe:
- Tener un título único
- Tener un autor
- Tener un ISBN
- Tener un año de publicación (1000-2100)
- Estar asignado a una categoría

### 🏷️ Gestión de Categorías
- **Listar**: `/categories` - Ver todas las categorías
- **Crear**: `/categories/new` - Agregar nueva categoría
- **Editar**: `/categories/[id]/edit` - Modificar una categoría
- **Eliminar**: Botón en la tabla de categorías

Cada categoría:
- Debe tener un nombre único
- Puede tener una descripción
- Muestra el conteo de libros asociados
- No se puede eliminar si tiene libros asociados

---

## 🧪 Pruebas con Playwright

### Instalar Navegadores (Primera Vez)

```bash
npx playwright install chromium
```

### Ejecutar Pruebas

```bash
# Correr todas las pruebas
npx playwright test

# Correr solo pruebas de libros
npx playwright test books.spec.ts

# Modo debug (ver cada paso)
npx playwright test --debug

# Correr en modo UI
npx playwright test --ui
```

### Ver Reporte de Pruebas

```bash
npx playwright show-report
```

### Pruebas Incluidas

**CRUD de Libros:**
1. Listar libros correctamente
2. Crear un nuevo libro
3. Editar un libro existente
4. Eliminar un libro
5. Validar campos requeridos

**CRUD de Categorías:**
1. Listar categorías correctamente
2. Crear una nueva categoría
3. Editar una categoría existente
4. Mostrar conteo de libros por categoría

---

## 📁 Estructura del Proyecto

```
.
├── app/
│   ├── components/
│   │   └── Navbar.tsx           # Barra de navegación
│   ├── books/
│   │   ├── actions.ts           # Server Actions para libros
│   │   ├── page.tsx             # Listar libros
│   │   ├── new/page.tsx         # Crear libro
│   │   ├── [id]/edit/page.tsx   # Editar libro
│   │   └── components/
│   │       ├── BookForm.tsx
│   │       ├── BookTable.tsx
│   │       └── DeleteButton.tsx
│   ├── categories/
│   │   ├── actions.ts           # Server Actions para categorías
│   │   ├── page.tsx             # Listar categorías
│   │   ├── new/page.tsx         # Crear categoría
│   │   ├── [id]/edit/page.tsx   # Editar categoría
│   │   └── components/
│   │       ├── CategoryForm.tsx
│   │       ├── CategoryTable.tsx
│   │       └── DeleteButton.tsx
│   ├── layout.tsx               # Layout global con navbar y footer
│   ├── page.tsx                 # Página de inicio
│   └── globals.css              # Estilos globales
├── lib/
│   ├── prisma.ts                # Cliente Prisma singleton
│   └── interfaces.ts            # Interfaces TypeScript
├── prisma/
│   ├── schema.prisma            # Esquema de BD
│   └── seed.ts                  # Script para poblar BD
├── e2e/
│   └── books.spec.ts            # Pruebas E2E con Playwright
├── .env                         # Variables de entorno (local)
├── .env.example                 # Plantilla de .env
├── package.json
├── tsconfig.json
├── playwright.config.ts
└── README.md
```

---

## 🗄️ Modelo de Datos

### Categoría
```prisma
model Category {
  id          Int    @id @default(autoincrement())
  name        String
  description String
  books       Book[]
}
```

### Libro
```prisma
model Book {
  id         Int    @id @default(autoincrement())
  title      String
  author     String
  isbn       String
  year       Int
  categoryId Int
  category   Category @relation(fields: [categoryId], references: [id])
}
```

---

## 🔨 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor en http://localhost:3000

# Build y producción
npm run build            # Compila el proyecto
npm start                # Inicia servidor de producción

# BD y Prisma
npm run seed             # Pobla BD con datos de ejemplo
npx prisma studio       # Abre interfaz visual de Prisma
npx prisma generate     # Genera cliente Prisma
npx prisma db push      # Crea/actualiza tablas

# Linting
npm run lint             # Ejecuta ESLint

# Pruebas
npx playwright test      # Corre pruebas E2E
npx playwright test --ui # Pruebas en modo UI
npx playwright show-report # Ver último reporte
```

---

## 🐛 Solución de Problemas

### Error: "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### Error: "Connection refused" en MySQL
- Verifica que MySQL esté corriendo
- Si usas Docker: `docker ps` para ver contenedores
- Comprueba `DATABASE_URL` en `.env`

### Error: "database 'libros_db' doesn't exist"
```bash
# Ejecuta esto para crear la BD
npx prisma db push
```

### Las pruebas fallan
```bash
# Reinstala navegadores de Playwright
npx playwright install chromium
```

### Puerto 3000 ya está en uso
```bash
# Usa otro puerto
npm run dev -- -p 3001
```

---

## 📝 Notas Importantes

1. **Base de Datos**: El proyecto usa MySQL. Asegúrate de tenerlo corriendo antes de iniciar.

2. **Seed**: El script `npm run seed` elimina y recrea todos los datos. Úsalo solo para resetear la BD.

3. **Prisma Studio**: Usa `npx prisma studio` para ver/editar datos directamente en una interfaz gráfica.

4. **TypeScript**: Todo el código usa TypeScript, verifica tipos con: `npx tsc --noEmit`

5. **Pruebas**: Las pruebas E2E requieren que el servidor esté corriendo en `http://localhost:3000`

---

## ✅ Checklist Antes de Entregar

- [ ] MySQL está corriendo
- [ ] `.env` está configurado correctamente
- [ ] `npm install` fue ejecutado
- [ ] `npx prisma db push` fue ejecutado
- [ ] `npm run seed` fue ejecutado
- [ ] `npm run dev` inicia sin errores
- [ ] Puedes navegar a `/books` y `/categories`
- [ ] Las pruebas E2E pasan: `npx playwright test`
- [ ] Puedes crear, editar y eliminar libros
- [ ] Puedes crear, editar y eliminar categorías

---

## 📞 Contacto

Si tienes problemas, revisa:
1. Este README
2. Archivo `.env` y variables de entorno
3. Logs en la terminal
4. Console del navegador (F12)
5. Reporte de Playwright: `npx playwright show-report`

---

**Última actualización:** 19 de Marzo, 2026

