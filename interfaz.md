# Sistema de Gestión de Restaurante y Eventos

Este proyecto consiste en el desarrollo del flujo de interfaces y la arquitectura de software para un sistema integral de gestión, basado en un análisis previo de requerimientos y diagramas UML.

## Arquitectura del Proyecto

El proyecto utiliza una **Arquitectura Basada en Dominios (Modular)**. Esta estructura permite separar las responsabilidades por áreas de negocio, facilitando la escalabilidad y el trabajo colaborativo.

### Estructura de Directorios

```text
src/
│
├── app/                  # Rutas y navegación (Next.js App Router)
│
├── modules/              # DOMINIO (Lógica de Negocio)
│   ├── ventas/           # Gestión de pedidos, pagos y mesas
│   │   ├── components/   # Componentes exclusivos del módulo
│   │   ├── views/        # Pantallas completas (Flujos de usuario)
│   │   ├── hooks/        # Lógica de estado local y efectos
│   │   ├── services/     # Llamadas a API (o simulación)
│   │   ├── types/        # Definiciones basadas en el UML
│   │   └── mocks/        # 🛠️ Datos simulados para desarrollo
│   ├── eventos/          # Reservas y logística de eventos
│   ├── cocina/           # Gestión de comandas y preparación
│   └── inventario/       # Control de insumos y stock
│
├── components/           # COMPONENTES GLOBALES REUTILIZABLES
│   ├── ui/               # Átomos: Botones, inputs, badges (Shadcn/UI)
│   ├── forms/            # Formularios genéricos y validaciones
│   ├── layout/           # Estructura: Navbar, Sidebar, Footer
│   └── shared/           # Moléculas: Tablas pro, cards de información
│
├── hooks/                # Hooks globales (auth, theme, window size)
├── types/                # Interfaces TypeScript globales
├── constants/            # Enums, configuraciones y textos estáticos
└── lib/                  # Configuraciones de librerías externas (Prisma, Axios)
```

### Estructura de ventas

```text
modules/
└── ventas/
    ├── views/
    │   ├── MesasView.tsx
    │   └── PedidoView.tsx
    │
    ├── components/
    │   ├── MesaCard.tsx
    │   ├── ProductCard.tsx
    │   ├── PedidoItem.tsx
    │   ├── PedidoList.tsx
    │   └── OrderSummary.tsx
    │
    ├── hooks/
    │   └── usePedido.ts
    │
    ├── types/
    │   ├── pedido.ts
    │   ├── producto.ts
    │   └── mesa.ts
    │
    └── mocks/
        ├── mesas.mock.ts
        ├── productos.mock.ts
        └── pedido.mock.ts