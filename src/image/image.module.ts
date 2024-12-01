import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './grid-fs-multer-config-service/grid-fs-multer-config-service.service';

@Module({
  imports: [MulterModule.registerAsync({useClass: GridFsMulterConfigService})],
  controllers: [ImageController],
  providers: [ImageService, JwtService, GridFsMulterConfigService],
})
export class ImageModule {}
