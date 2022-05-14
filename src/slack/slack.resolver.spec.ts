import { Test, TestingModule } from '@nestjs/testing';
import { SlackResolver } from './slack.resolver';

describe('SlackResolver', () => {
  let resolver: SlackResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlackResolver],
    }).compile();

    resolver = module.get<SlackResolver>(SlackResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
