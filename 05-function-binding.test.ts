
import { describe, it, expect, vi } from 'vitest';

// Function Binding Koan
describe('Function Binding', () => {
  it('should retain the context using a bound function', () => {
    const user = {
      name: 'John',
      sayHi() {
        return `Hi, ${this.name}`;
      }
    };

    // This test is failing initially because we are passing the function reference directly.
    // Students need to bind the context correctly.
    const sayHi = user.sayHi.bind(user); // Initial failing state
    expect(sayHi()).toBe('Hi, John');
  });

  it('should retain the context using an arrow function', () => {
    const user = {
      name: 'Alice',
      sayHi() {
        return `Hi, ${this.name}`;
      }
    };

    // This test will fail initially because the setTimeout is not preserving the context.
    // Students should use an arrow function to retain the 'this' context.
    let message = '';
    setTimeout(() => { message = user.sayHi(); }, 1000);

    // Hint for students: They may need to use fake timers or a different approach to test this.
    setTimeout (() => {expect(message).toBe('Hi, Alice');}, 1000) // This will fail initially
  });

  it('should create a partial function using bind', () => {
    function multiply(a: number, b: number) {
      return a * b;
    }

    // This test will fail because the function has not been partially applied.
    // Students need to use bind to create a partial function.
    const double = multiply.bind(null, 2); // Initial failing state

    expect(double(2)).toBe(4); // This will fail initially
  });
});
