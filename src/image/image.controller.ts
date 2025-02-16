import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, Res, HttpStatus } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import {ApiBearerAuth,ApiConsumes, ApiProduces, ApiResponse} from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  upload(@Body() dto: CreateImageDto, @UploadedFile(new ParseFilePipe({
    validators: [ new FileTypeValidator({fileType: /^image/ })]
  })) file: Express.Multer.File) {
    console.log('dto: ', dto);
    console.log('file: ', file);
    const fileResponse = {
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      id: file.id,
      filename: file.filename,
      metadata: file.metadata,
      bucketName: file.bucketName,
      chunkSize: file.chunkSize,
      size: file.size,
      md5: file.md5,
      uploadDate: file.uploadDate,
      contentType: file.contentType,
    };
    return fileResponse;
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.imageService.getInfoById(id);
  }

  @ApiResponse({
    schema: {
      type: 'string',
      format: 'binary',
    },
    status: HttpStatus.OK,
  })
  @Get('/download/:id')
  @ApiProduces('image/*')
  async download(@Param('id') id: string, @Res()res) {
    try {
      const info = await this.imageService.getInfoById(id);
      const file = await this.imageService.getFileContentById(id);
      res.set('Content-Type', info.contentType); // 根據需要調整 Content-Type
      res.send(file);
    } catch (error) {
      res.status(500).json({ message: 'Download error', error: error.message });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
