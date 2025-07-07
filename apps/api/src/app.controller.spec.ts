import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return the result from appService.getHello', () => {
      // Arrange
      const expectedResult = 'Hello World!';
      jest.spyOn(appService, 'getHello').mockReturnValue(expectedResult);

      // Act
      const result = appController.getHello();

      // Assert
      expect(result).toBe(expectedResult);
      expect(appService.getHello).toHaveBeenCalled();
    });
  });
});