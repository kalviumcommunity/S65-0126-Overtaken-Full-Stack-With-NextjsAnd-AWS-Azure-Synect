import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { logger } from "../../common/utils/logger";
import type { SendNotificationEmailInput, SendWelcomeEmailInput } from "./schemas/emails.schema";
import { buildNotificationTemplate, buildWelcomeEmailTemplate } from "./templates/email.templates";

@Injectable()
export class EmailsService {
  private getSesConfig() {
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const fromEmail = process.env.AWS_SES_FROM_EMAIL;

    if (!region || !accessKeyId || !secretAccessKey || !fromEmail) {
      throw new InternalServerErrorException("SES configuration is incomplete");
    }

    return {
      fromEmail,
      client: new SESClient({
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      }),
    };
  }

  async sendWelcomeEmail(payload: SendWelcomeEmailInput) {
    const template = buildWelcomeEmailTemplate(payload.recipientName);
    return this.sendEmail(payload.to, template.subject, template.html, template.text);
  }

  async sendNotificationEmail(payload: SendNotificationEmailInput) {
    const template = buildNotificationTemplate(payload.title, payload.message);
    return this.sendEmail(payload.to, template.subject, template.html, template.text);
  }

  private async sendEmail(to: string, subject: string, html: string, text: string) {
    const { client, fromEmail } = this.getSesConfig();

    const command = new SendEmailCommand({
      Source: fromEmail,
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: {
          Html: { Data: html, Charset: "UTF-8" },
          Text: { Data: text, Charset: "UTF-8" },
        },
      },
    });

    const result = await client.send(command);
    const messageId = result.MessageId ?? "unknown";

    logger.info("SES email sent", {
      code: "SES_EMAIL_SENT",
      to,
      messageId,
    });

    return {
      messageId,
      to,
      status: "queued",
    };
  }
}
