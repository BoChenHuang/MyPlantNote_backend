import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService,){}

  getHello(): string {
    const testInfo = this.configService.get<string>('test.msg');
    return testInfo;
  }
}
