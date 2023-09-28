import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { UserDocument, UserSchema } from './models/user.schema';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{
      name: UserDocument.name,
      schema: UserSchema
    }]
   ),
  ],
  controllers: [UsersController],
  providers: [ UserService, UserRepository],
  exports: [UserService]
})
export class UsersModule {}
