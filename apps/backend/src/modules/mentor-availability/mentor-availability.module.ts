import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MentorAvailabilityController } from './mentor-availability.controller';
import { MentorAvailabilityService } from './mentor-availability.service';

@Module({
  imports: [AuthModule],
  controllers: [MentorAvailabilityController],
  providers: [MentorAvailabilityService],
})
export class MentorAvailabilityModule {}
