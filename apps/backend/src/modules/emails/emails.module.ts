import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { EmailsController } from "./emails.controller";
import { EmailsService } from "./emails.service";

@Module({
  imports: [AuthModule],
  controllers: [EmailsController],
  providers: [EmailsService],
})
export class EmailsModule {}
