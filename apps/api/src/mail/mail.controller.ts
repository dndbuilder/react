import { Controller, Get, Param, NotFoundException, Header } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('templates')
  async listTemplates() {
    const templates = await this.mailService.listTemplates();
    return { templates };
  }

  @Get('templates/:name/content')
  async getTemplateContent(@Param('name') name: string) {
    try {
      const content = await this.mailService.getTemplateContent(name);
      return { name, content };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Template ${name} not found`);
    }
  }

  @Get('templates/:name/preview')
  @Header('Content-Type', 'text/html')
  async previewTemplate(@Param('name') name: string) {
    try {
      return await this.mailService.renderTemplate(name);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Template ${name} not found`);
    }
  }
}