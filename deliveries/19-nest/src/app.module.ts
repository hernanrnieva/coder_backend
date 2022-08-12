import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [ProductModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
