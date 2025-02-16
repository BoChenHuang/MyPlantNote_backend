import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { MongoClient, GridFSBucket } from 'mongodb';
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
    gridFsStorage: any;
    constructor(private configService: ConfigService) {
    // 初始化 MongoDB 客戶端與 GridFS
    // ref: https://medium.com/@khoa.phan.9xset/nestjs-file-uploading-using-multer-gridfs-7569a1b48022
    const uri = this.configService.get<string>('database.url');
    const dbName = this.configService.get<string>('database.db');
    this.gridFsStorage = new GridFsStorage({
        url: uri,
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                console.log(`${uri}/${dbName}`);
                console.log('excute');
                const filename = file.originalname.trim();
                const fileInfo = {
                    filename: filename,
                    bucketName: 'images'
                };
                resolve(fileInfo);
            });
        }
        });
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: this.gridFsStorage,
        };
    }
}