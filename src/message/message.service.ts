import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}

  async getAll(): Promise<MessageEntity[]> {
    return await this.messageRepository.find();
  }

  async create(sender: string, message: string): Promise<MessageEntity> {
    return await this.messageRepository.save({ sender, message });
  }
}
