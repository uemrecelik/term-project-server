import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerRunning(): string {
    return 'Server Running!';
  }
}
