import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CredentialsDto } from '../global/dto';
import { AuthType } from './auth.type';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(returns => AuthType)
  async loginVisitor(@Args() credentialsDto: CredentialsDto) {
    return this.authService.loginVisitor(credentialsDto);
  }

  @Mutation(returns => AuthType)
  async loginReference(@Args() credentialsDto: CredentialsDto) {
    return this.authService.loginReference(credentialsDto);
  }

  @Mutation(returns => AuthType)
  async loginAdmin(@Args() credentialsDto: CredentialsDto) {
    return this.authService.loginAdmin(credentialsDto);
  }
}
