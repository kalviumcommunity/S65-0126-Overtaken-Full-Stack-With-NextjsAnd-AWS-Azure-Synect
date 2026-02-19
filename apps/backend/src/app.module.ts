import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./modules/auth/auth.module";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { HealthModule } from "./modules/health/health.module";
import { InternshipsModule } from "./modules/internships/internships.module";
import { MentorAvailabilityModule } from "./modules/mentor-availability/mentor-availability.module";
import { ProfilesModule } from "./modules/profiles/profiles.module";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    HealthModule,
    ProfilesModule,
    InternshipsModule,
    MentorAvailabilityModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
