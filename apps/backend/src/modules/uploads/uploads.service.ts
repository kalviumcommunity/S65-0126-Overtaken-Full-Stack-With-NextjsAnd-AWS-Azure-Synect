import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";
import { PrismaService } from "../../database/prisma.service";
import type { AuthRequestUser } from "../auth/interfaces/auth-request-user.interface";
import type { CompleteUploadInput, CreateUploadUrlInput } from "./schemas/uploads.schema";

@Injectable()
export class UploadsService {
  private readonly allowedTypes = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ]);

  private getAwsConfig() {
    const bucket = process.env.AWS_S3_BUCKET;
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!bucket || !region || !accessKeyId || !secretAccessKey) {
      throw new InternalServerErrorException("S3 configuration is incomplete");
    }

    const s3 = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    return { bucket, region, s3 };
  }

  constructor(private readonly prisma: PrismaService) {}

  async createPresignedUrl(user: AuthRequestUser, payload: CreateUploadUrlInput) {
    if (!this.allowedTypes.has(payload.contentType)) {
      throw new BadRequestException("Unsupported file type");
    }

    const { bucket, region, s3 } = this.getAwsConfig();

    const safeName = payload.fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileKey = `uploads/${user.id}/${randomUUID()}-${safeName}`;
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: fileKey,
      ContentType: payload.contentType,
    });

    const expiresIn = 300;
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn });
    const fileUrl = `https://${bucket}.s3.${region}.amazonaws.com/${fileKey}`;

    return {
      uploadUrl,
      fileKey,
      fileUrl,
      expiresIn,
    };
  }

  completeUpload(user: AuthRequestUser, payload: CompleteUploadInput) {
    if (!this.allowedTypes.has(payload.contentType)) {
      throw new BadRequestException("Unsupported file type");
    }

    if (!payload.fileKey.startsWith(`uploads/${user.id}/`)) {
      throw new BadRequestException("Invalid file key for user scope");
    }

    return this.prisma.uploadedFile.create({
      data: {
        userId: user.id,
        fileName: payload.fileName,
        fileKey: payload.fileKey,
        fileUrl: payload.fileUrl,
        contentType: payload.contentType,
        sizeBytes: payload.sizeBytes,
      },
    });
  }

  listMyUploads(user: AuthRequestUser) {
    return this.prisma.uploadedFile.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }
}
