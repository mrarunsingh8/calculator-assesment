import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
    add(numbers: string): number {
        if (numbers === '') {
            return 0;
        }
    
        // Handle custom delimiters
        if (numbers.startsWith('//')) {
            const delimiter = numbers.charAt(2); // Get the delimiter character
            numbers = numbers.substring(4); // Remove the delimiter line
            numbers = numbers.replace(new RegExp(`\\${delimiter}`, 'g'), ',');
        } else {
            // Replace newlines with commas for default delimiter handling
            numbers = numbers.replace(/[\n]/g, ',');
        }
    
        // Split the numbers by commas and convert them to an array of numbers
        const numArray = numbers.split(',').map(Number);
    
        // Check for negative numbers and throw an error
        const negativeNumbers = numArray.filter((num) => num < 0);
        if (negativeNumbers.length) {
            throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(', ')}`);
        }
    
        return numArray.reduce((sum, num) => sum + num, 0);
    }
}
