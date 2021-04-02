import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { MessageEntity } from './message.entity';

@WebSocketGateway(4000, { namespace: 'message' })
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  private server: Server;
  private logger: Logger = new Logger('MessageGateway');
  private count = 0;

  constructor(private messageService: MessageService) {}

  async handleConnection(client: any, ...args: any[]) {
    this.count += 1;
    this.logger.log(`Connected: ${this.count} connection`);
    const messages: MessageEntity[] = await this.messageService.getAll();
    client.emit('all-messages-to-client', messages);
  }

  handleDisconnect(client: any) {
    this.count -= 1;
    this.logger.log(`Disconected: ${this.count} conection`);
  }

  afterInit(server: any) {
    this.logger.log('MessageGateway initialized');
  }

  @SubscribeMessage('new-message-to-server')
  async handleNewMessage(
    @MessageBody() data: { sender: string; message: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const message: MessageEntity = await this.messageService.create(
      data.sender,
      data.message,
    );
    this.server.emit('new-message-to-client', { message });
  }
}
