# 🚀 Guía de Configuración Rápida

## Prerrequisitos

Asegúrate de tener instalado:
- **Node.js** 18+ (descarga desde https://nodejs.org/)
- **Git** (opcional, para clonar el repo)
- **Docker** (opcional, para MySQL) O **MySQL** instalado localmente

## Paso 1: Base de Datos MySQL

### Opción A: Con Docker (Recomendado)

Si tienes Docker instalado:

```bash
docker run -d \
  --name mysql_libros \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=libros_db \
  -p 3306:3306 \
  mysql:8
```

Verifica que esté corriendo:
```bash
docker ps
```

### Opción B: MySQL Local

Si prefieres instalar MySQL localmente:

1. Descarga MySQL desde https://dev.mysql.com/downloads/mysql/
2. Instala y asegúrate que esté corriendo
3. Crea una BD llamada `libros_db`:

```bash
mysql -u root -p
# Ingresa tu contraseña

CREATE DATABASE libros_db;
EXIT;
```

### Verificar Conexión

Prueba la conexión a MySQL:
```bash
mysql -u root -p -h localhost
# Ingresa: password (o tu contraseña)
```

## Paso 2: Instalar Dependencias del Proyecto

```bash
cd nextjs-libros-crud
npm install
```

## Paso 3: Configurar Variables de Entorno

Edita el archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="mysql://root:password@localhost:3306/libros_db"
```

**Si tu MySQL tiene contraseña diferente:**
```env
DATABASE_URL="mysql://root:tu_contraseña@localhost:3306/libros_db"
```

**Si MySQL está en otro puerto (ej: 3307):**
```env
DATABASE_URL="mysql://root:password@localhost:3307/libros_db"
```

## Paso 4: Crear Tablas en la BD

```bash
npx prisma generate
npx prisma db push
```

Deberías ver algo como:
```
✓ Generated Prisma Client (v5.20.0)
✓ Your database is now in sync with your Prisma schema
```

## Paso 5: Poblar BD con Datos de Ejemplo

```bash
npm run seed
```

Verás:
```
🌱 Iniciando seed...
✅ Seed completado: 4 categorías y 6 libros creados.
```

## Paso 6: Iniciar el Servidor

```bash
npm run dev
```

Espera a que veas:
```
  ✓ Ready in 2.5s
  ◇ Local:        http://localhost:3000
  ◇ Environments: .env
```

Abre en tu navegador: **http://localhost:3000**

---

## ✅ Verificar que Funciona

- [ ] Página de inicio carga (http://localhost:3000)
- [ ] Puedes ver libros (http://localhost:3000/books)
- [ ] Puedes ver categorías (http://localhost:3000/categories)
- [ ] Puedes crear un libro
- [ ] Puedes crear una categoría
- [ ] Puedes editar un libro
- [ ] Puedes editar una categoría
- [ ] Puedes eliminar un libro
- [ ] Puedes eliminar una categoría

---

## 🐛 Problemas Comunes

### Error: "Access denied for user 'root'@'localhost'"

**Solución:**
1. Verifica que MySQL esté corriendo
2. Si usas Docker: `docker ps` y `docker logs mysql_libros`
3. Verifica la contraseña en `.env`
4. Si es con Docker, asegúrate que el puerto 3306 esté libre

### Error: "Cannot find module '@prisma/client'"

**Solución:**
```bash
npm install
npx prisma generate
```

### Puerto 3000 ya está en uso

**Solución:**
```bash
npm run dev -- -p 3001
```

### No ves los datos de ejemplo después de `npm run seed`

**Solución:**
```bash
npx prisma studio
```

Se abrirá una interfaz donde puedes ver directamente los datos en la BD.

### Error de conexión a BD después de cambiar `.env`

**Solución:**
1. Guarda los cambios en `.env`
2. Detén el servidor (Ctrl+C)
3. Inicia nuevamente: `npm run dev`

---

## 🧪 Ejecutar Pruebas

Una vez que todo funcione:

```bash
# Instalar navegadores (primera vez)
npx playwright install chromium

# Ejecutar pruebas
npx playwright test

# Ver reporte
npx playwright show-report
```

---

## 📚 Comandos Útiles

```bash
npm run dev              # Servidor de desarrollo
npm run build            # Compilar para producción
npm start                # Ejecutar en producción
npm run seed             # Poblar BD con datos
npm run lint             # Verificar código
npx prisma studio       # Ver BD visualmente
npx prisma db push      # Sincronizar esquema BD
npx playwright test      # Ejecutar pruebas E2E
```

---

## 🎉 ¡Listo!

Si llegaste aquí, ¡el proyecto está funcionando!

Para cualquier duda, revisa:
- [README.md](./README.md) - Documentación completa
- Logs de la terminal
- Console del navegador (F12)

---

**Última actualización:** 19 de Marzo, 2026
