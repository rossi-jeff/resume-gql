import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { Link } from './link.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkResolver } from './link.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinkService, LinkResolver],
})
export class LinkModule {}
