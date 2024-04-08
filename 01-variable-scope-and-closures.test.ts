import { describe, it, expect } from 'vitest';

describe('Advanced Variable Scope and Lexical Environment', () => {
  it('should not access variables outside of their scope', () => {
    // This test will fail because 'let' variables are not accessible outside their block scope
    let outerScope = 'I am not hidden'
    {
      let blockScoped = 'I am hidden';
      var fnScoped = 'variable'
    }
    expect(() => blockScoped).toThrow();
    expect(() => fnScoped).not.toThrow();

  });

  it('should understand temporal dead zone', () => {
    // This test will fail, demonstrating the temporal dead zone for 'let' and 'const'
    expect(() => temporalVar).toThrow();
    expect(() => hoisted).not.toThrow();
    let temporalVar = 'I am in the TDZ';
    var hoisted = 'I am not in the TDZ';
  });

  it('should understand the scope chain', () => {
    // This test will fail initially, showing the scope chain in action
    let globalVar = 'global';
    function outerFunction() {
      let outerVar = 'outer';
      function innerFunction() {
        let innerVar = 'inner';
        expect(globalVar).toBe('global'); // Should be 'global'
        expect(outerVar).toBe('outer'); // Should be 'outer'
        expect(innerVar).toBe('inner');
      }
      innerFunction();
    }
    outerFunction();
  });

  it('should demonstrate function-level scope with var', () => {
    // This test will fail, showing function-level scope of 'var'
    if (true) {
      var functionScoped = 'I am not block scoped';
    }
    expect(functionScoped).not.toBeUndefined();
  });

  it('should show lexical environment in action with TypeScript types', () => {
    // This test will fail, TypeScript type annotations will cause a compile-time error
    function typeAwareFunction<T>(x: T) {
      return function(y: T) {
        return [x, y];
      };
    }
    const numberPair = typeAwareFunction<number>(5);
    expect(numberPair(5)).toEqual([5, 5]); // Type 'string' is not assignable to type 'number'
  });
});

describe('Advanced Closures', () => {
  it('should understand closures over loop variables', () => {
    // This test will fail, showing how closures capture the current value
    const functions: (() => number)[] = [];
    for (let i = 0; i < 3; i++) {
      functions.push(() => i);
    }
    expect(functions.map(f => f())).toEqual([0, 1, 2]); // Should fail as there is no value 3
  });

  it('should maintain separate closures in a loop with let', () => {
    // This test will fail, showing separate closures for each iteration with 'let'
    const functions: (() => number) [] = [];
    for (var i = 0; i < 3; i++) {
      functions.push(((j) => () => j)(i));
    }
    expect(functions.map(f => f())).toEqual([0, 1, 2]); // Should fail as there is no value 3
  });

  it('should show closure with setTimeout', (done) => {
    // This test will fail, demonstrating asynchronous closure with setTimeout
    function delayMessage(message: string, delay: number) {
      setTimeout(() => {
        expect(message).toBe('Delayed');
        done();
      }, delay);
    }
    delayMessage('Immediate', 100); // Should fail because message is not 'Delayed'
  });

  it('should use closures to create private variables', () => {
    // This test will fail, demonstrating closures as a way to encapsulate variables
    function createCounter() {
      let count = 0;
      return {
        increment() { count++; },
        decrement() { count--; },
        getCount() { return count; }
      };
    }
    const counter = createCounter();
    counter.increment();
    counter.increment();
    counter.decrement();
    expect(counter.getCount()).toBe(1); // Should fail as count should be 1
  });

  it('should understand closures in a functional programming context', () => {
    // This test will fail, showing closures in functional programming
    const add = (x: number) => (y: number) => x + y;
    const addFive = add(5);
    const multiply = (x: number) => (y: number) => x * y;
    const double = multiply(2);
    expect(addFive(double(5))).toBe(15); // Should fail as 5 * 2 + 5 is 15
  });
});