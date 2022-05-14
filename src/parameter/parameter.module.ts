import { Module } from '@nestjs/common';
import { ParameterService } from './parameter.service';
import { ParameterResolver } from './parameter.resolver';
import { Parameter } from './parameter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Parameter])],
  providers: [ParameterService, ParameterResolver],
})
export class ParameterModule {}
