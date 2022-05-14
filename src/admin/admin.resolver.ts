import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { UuidDto, CreateAdminDto, UpdateAdminDto } from '../global/dto';
import { AdminType } from './admin.type';

@Resolver('Admin')
export class AdminResolver {
  constructor(private adminService: AdminService) {}

  @Query(returns => AdminType)
  async showAdmin(@Args() uuidDto: UuidDto) {
    return this.adminService.showAdmin(uuidDto);
  }

  @Mutation(returns => AdminType)
  async createAdmin(@Args() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Mutation(returns => AdminType)
  async updateAdmin(@Args() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(updateAdminDto);
  }

  @Mutation(returns => AdminType)
  async deleteAdmin(@Args() uuidDto: UuidDto) {
    return this.adminService.deleteAdmin(uuidDto);
  }
}
