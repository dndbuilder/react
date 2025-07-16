import { Injectable, NotFoundException } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { promises as fs } from 'fs';
import { join } from 'path';
import * as Handlebars from 'handlebars';

@Injectable()
export class MailService {
  private readonly templatesDir: string;

  constructor(private mailerService: MailerService) {
    this.templatesDir = join(__dirname, 'templates');
  }

  async sendPasswordResetEmail(email: string, name: string, token: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset Request',
      template: 'password-reset',
      context: {
        name: name || 'User',
        resetUrl,
      },
    });
  }

  async listTemplates(): Promise<string[]> {
    try {
      const files = await fs.readdir(this.templatesDir);
      return files
        .filter(file => file.endsWith('.hbs'))
        .map(file => file.replace('.hbs', ''));
    } catch (error) {
      console.error('Error listing templates:', error);
      return [];
    }
  }

  async getTemplateContent(templateName: string): Promise<string> {
    try {
      const templatePath = join(this.templatesDir, `${templateName}.hbs`);
      return await fs.readFile(templatePath, 'utf8');
    } catch (error) {
      throw new NotFoundException(`Template ${templateName} not found`);
    }
  }

  async renderTemplate(templateName: string): Promise<string> {
    // Get the template content
    const templateContent = await this.getTemplateContent(templateName);

    // Create sample data based on template name
    const sampleData = this.getSampleDataForTemplate(templateName);

    // Compile the template with Handlebars
    const template = Handlebars.compile(templateContent);

    // Render the template with the sample data
    return template(sampleData);
  }

  private getSampleDataForTemplate(templateName: string): Record<string, any> {
    // Return appropriate sample data based on template name
    switch (templateName) {
      case 'password-reset':
        return {
          name: 'John Doe',
          resetUrl: 'https://example.com/reset-password?token=sample-token',
        };
      // Add cases for other templates as they are added
      default:
        return {};
    }
  }

  // Add other email-related methods as needed
  // For example: sendWelcomeEmail, sendVerificationEmail, etc.
}
