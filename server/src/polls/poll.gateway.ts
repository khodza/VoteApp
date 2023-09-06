import { Logger } from '@nestjs/common';
import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { PollService } from './polls.service';

@WebSocketGateway({
  namespace: 'polls',
})
export class PollsGateway implements OnGatewayInit {
  private readonly logger = new Logger(PollsGateway.name);
  constructor(private readonly pollService: PollService) {}

  afterInit(server: any) {
    this.logger.log(`Websocket Gateway initialized.`);
  }
}
