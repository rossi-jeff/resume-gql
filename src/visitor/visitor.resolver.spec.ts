import { Test, TestingModule } from '@nestjs/testing';
import { VisitorResolver } from './visitor.resolver';

describe('VisitorResolver', () => {
  let resolver: VisitorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitorResolver],
    }).compile();

    resolver = module.get<VisitorResolver>(VisitorResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
