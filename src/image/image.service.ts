import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MongoGridFS } from 'mongo-gridfs';
import { ConfigService } from '@nestjs/config';
import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';


@Injectable()
export class ImageService {
  private gfs: GridFSBucket;
  constructor(private readonly configService: ConfigService) {
    const uri = this.configService.get<string>('database.url');
    const dbName = configService.get<string>('database.db');
    const mongoClient = new MongoClient(uri);
    const db = mongoClient.db(dbName);
    this.gfs = new GridFSBucket(db, { bucketName: 'images' });
  }

  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  async findAll() {
    const fileInfos = await this.gfs.find().toArray();;
    return fileInfos;
  }

  async getInfoById(id: string) {
    const file = await this.gfs.find({ _id: new ObjectId(id) }).toArray();
    if (!file || file.length === 0) {
      throw new NotFoundException('Image file not found');
    }

    const fileInfo = file[0]; // 取得檔案資訊
    return fileInfo;
  }

  async getFileContentById(id: string) {
    return new Promise((resolve, reject) => {
      const fileStream = this.gfs.openDownloadStream(new ObjectId(id));
      const chunks: Buffer[] = [];
      fileStream.on('data', (chunk) => chunks.push(chunk));
      fileStream.on('end', () => resolve(Buffer.concat(chunks)));
      fileStream.on('error', reject);
    });
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
