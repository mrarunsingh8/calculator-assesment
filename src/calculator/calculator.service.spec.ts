import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatorService],
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should return 0 for an empty string', () => {
    expect(service.add('')).toBe(0);
  });

  it('should return the number itself when given a single number', () => {
    expect(service.add('1')).toBe(1);
    expect(service.add('5')).toBe(5);
  });

  it('should return the sum of two numbers', () => {
    expect(service.add('1,2')).toBe(3);
    expect(service.add('10,20')).toBe(30);
  });

  it('should handle newlines between numbers', () => {
    expect(service.add('1\n2,3')).toBe(6);
    expect(service.add('10\n20\n30')).toBe(60);
  });

  it('should throw an error if negative numbers are included', () => {
    expect(() => service.add('1,-2')).toThrowError('Negative numbers not allowed: -2');
    expect(() => service.add('-1,-2,3')).toThrowError('Negative numbers not allowed: -1, -2');
  });

  it('should handle custom delimiters', () => {
    expect(service.add('//;\n1;2')).toBe(3);
    expect(service.add('//|\n1|2|3')).toBe(6);
  });
});
