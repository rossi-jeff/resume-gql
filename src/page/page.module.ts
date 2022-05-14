import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageResolver } from './page.resolver';
import { Page } from './page.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  providers: [PageService, PageResolver],
})
export class PageModule {}
