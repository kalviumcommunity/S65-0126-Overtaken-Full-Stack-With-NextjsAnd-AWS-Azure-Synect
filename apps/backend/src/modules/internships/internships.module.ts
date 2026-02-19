import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { InternshipsController } from './internships.controller';
import { InternshipsService } from './internships.service';

@Module({
  imports: [AuthModule],
  controllers: [InternshipsController],
  providers: [InternshipsService],
})
export class InternshipsModule {}
