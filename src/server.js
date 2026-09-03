import 'dotenv/config';
import app from './app.js';
import prisma from './config/prisma.js';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    // Probar conexión a la base de datos PostgreSQL antes de escuchar peticiones
    await prisma.$connect();
    console.log('📦 Conexión a PostgreSQL establecida con éxito.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en: http://localhost:${PORT}`);
      console.log(`📡 Endpoints de Categorías: http://localhost:${PORT}/api/categories`);
      console.log(`📡 Endpoints de Productos:  http://localhost:${PORT}/api/products`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor o conectar a PostgreSQL:', error);
    process.exit(1);
  }
}

bootstrap();
