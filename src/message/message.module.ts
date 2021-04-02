import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { MessageEntity } from './message.entity';
import { MessageGateway } from './message.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [MessageService, MessageGateway],
})
export class MessageModule {}
