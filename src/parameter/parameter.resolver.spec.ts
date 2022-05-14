import { Test, TestingModule } from '@nestjs/testing';
import { ParameterResolver } from './parameter.resolver';

describe('ParameterResolver', () => {
  let resolver: ParameterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParameterResolver],
    }).compile();

    resolver = module.get<ParameterResolver>(ParameterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
