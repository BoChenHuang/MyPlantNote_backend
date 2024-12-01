import { Test, TestingModule } from '@nestjs/testing';
import { GridFsMulterConfigService } from './grid-fs-multer-config-service.service';

describe('GridFsMulterConfigServiceService', () => {
  let service: GridFsMulterConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GridFsMulterConfigService],
    }).compile();

    service = module.get<GridFsMulterConfigService>(GridFsMulterConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
