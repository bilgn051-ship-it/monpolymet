import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomBytes } from 'crypto';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { extname, join } from 'path';
import type { Request } from 'express';

const UPLOAD_DIR = join(process.cwd(), 'uploads');
const MAX_BYTES = 50 * 1024 * 1024; // 50 MB max limit

const ALLOWED_MIME: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
  'image/avif': '.avif',
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
};

interface UploadedFileShape {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

@Controller('uploads')
export class UploadsController {
  @Post()
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MAX_BYTES } }))
  upload(@UploadedFile() file: UploadedFileShape, @Req() req: Request) {
    if (!file) {
      throw new BadRequestException('No file was provided');
    }

    const isAllowedMime = !!ALLOWED_MIME[file.mimetype];
    if (!isAllowedMime) {
      throw new BadRequestException('Invalid or unsupported file type');
    }

    const ext = ALLOWED_MIME[file.mimetype] || extname(file.originalname).toLowerCase();
    if (!existsSync(UPLOAD_DIR)) {
      mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    // Sanitized random filename to prevent Path Traversal attacks
    const filename = `${Date.now()}-${randomBytes(8).toString('hex')}${ext}`;
    writeFileSync(join(UPLOAD_DIR, filename), file.buffer);

    const base = `${req.protocol}://${req.get('host')}`;
    return { url: `${base}/uploads/${filename}` };
  }
}
