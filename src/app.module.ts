import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ProductModule,
    CartModule,
    AuthModule,
    PrismaModule,
    ConfigModule,
  ],
})
export class AppModule {}
