import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { networkInterfaces } from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Bind to all network interfaces
  await app.listen(3000, '0.0.0.0');

  // Optional: Log the system's IP address
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv4' && !net.internal) {
        console.log(`Application is running on: http://${net.address}:3000`);
      }
    }
  }
}
bootstrap();