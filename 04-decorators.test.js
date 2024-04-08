
import { describe, it, expect, vi } from 'vitest';

// LoggingDecorator Koan
describe('LoggingDecorator', () => {
  function loggingDecorator(func) {
    // This is a simple decorator that logs 'Function is called'
    // before executing the function. It's not returning anything yet.
    return function() {
      console.log('Function is called');
      // Students need to complete the decorator by invoking func()
      return func()
    };
  }

  it('should log before function execution', () => {
    let called = false;
    function testFunction() {
      called = true;
    }

    const decoratedFunction = loggingDecorator(testFunction);
    decoratedFunction();

    // The test will initially fail because the decoratedFunction
    // does not execute the testFunction yet.
    expect(called).toBe(true); // This will fail initially
  });
});

// TimingDecorator Koan
describe('TimingDecorator', () => {
  it('should measure execution time', () => {
    function timingDecorator(func) {
      return function() {
        const start = performance.now();
        func();
        // Students will have to implement timing logic and store the end time.
        const end = performance.now();
        return end - start; // Should return the time taken to execute func.
      };
    }

    function testFunction() {
      // Function that takes approximately 100ms to complete.
      const start = Date.now();
      while (Date.now() - start < 100) {}
    }

    const decoratedFunction = timingDecorator(testFunction);
    const timeTaken = decoratedFunction();

    // This test will fail if the timeTaken is not approximately 100ms.
    expect(timeTaken).toBeGreaterThan(99);
  });
});

export {};
