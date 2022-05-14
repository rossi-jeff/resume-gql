import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { ReferenceService } from '../reference/reference.service';
import { VisitorService } from '../visitor/visitor.service';
import { CredentialsDto } from '../global/dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private referenceService: ReferenceService,
    private visitorService: VisitorService,
    private jwtService: JwtService,
  ) {}

  async loginVisitor(credentialsDto: CredentialsDto) {
    const { Username, Password } = credentialsDto;
    const visitor = await this.visitorService.getVisitorByUsername(Username);
    if (visitor && visitor.validatePassword(Password)) {
      return this.login(visitor);
    } else {
      throw new UnauthorizedException();
    }
  }

  async loginReference(credentialsDto: CredentialsDto) {
    const { Username, Password } = credentialsDto;
    const reference = await this.referenceService.getReferenceByUsername(
      Username,
    );
    if (reference && reference.validatePassword(Password)) {
      return this.login(reference);
    } else {
      throw new UnauthorizedException();
    }
  }

  async loginAdmin(credentialsDto: CredentialsDto) {
    const { Username, Password } = credentialsDto;
    const admin = await this.adminService.getAdminByUsername(Username);
    if (admin && admin.validatePassword(Password)) {
      return this.login(admin);
    } else {
      throw new UnauthorizedException();
    }
  }

  private login(user: any) {
    return {
      Token: this.getJWT(user),
      UUID: user.UUID,
      Class: user.constructor.name,
    };
  }

  private getJWT(user: any) {
    const payload = {
      UUID: user.UUID,
      Username: user.Credentials.Username,
      Class: user.constructor.name,
    };
    return this.jwtService.sign(payload);
  }
}
