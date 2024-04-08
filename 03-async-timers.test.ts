
import { describe, it, expect, vi } from 'vitest';

// setTimeout Koan
describe('setTimeout', () => {
  it('should execute a callback after a delay', async () => {
    // This test will initially fail because the assertion is done before the setTimeout callback is executed.
    let message = '';
    setTimeout(() => {
      message = 'Hello, world!';
    }, 1000);

    setTimeout(() => {
      expect(message).toBe('Hello, world!');
    }, 1500)
    // Students should move this line inside the setTimeout callback to make the test pass.

  });

  it('should pass additional arguments to the callback', async () => {
    // This test will fail because the arguments are not being passed correctly.
    const add = (a: number, b: number) => a + b;
    let result = 0;

    // Students should modify the setTimeout call to pass the correct arguments.
    setTimeout((a: number, b: number) => {
      result = add(a, b);
    }, 1000, 2,);
setTimeout(() => {
    expect(result).toBe(4);
  }, 1500)
  });
});

// clearTimeout Koan
describe('clearTimeout', () => {
  it('should cancel a setTimeout', async () => {
    // This test fails because the timeout is not being cancelled.
    let message = 'initial';
    const timerId = setTimeout(() => {
      message = 'changed';
    }, 1000);

    clearTimeout(timerId);
    setTimeout(() => {
    // Students should use clearTimeout to cancel the timer before the assertion.
    expect(message).toBe('initial');
  }, 1500)
  });
});

// setInterval Koan
describe('setInterval', () => {
  it('should execute a callback at intervals', async () => {
    // This test fails because the assertion does not wait for the interval to run.
    let counter = 0;
    setInterval(() => {
      counter++;
    }, 500);
    setTimeout(() => {
    // Students should use an assertion that waits for the counter to change.
    expect(counter).toBeGreaterThan(3);
  }, 2000)
  });
});

// Nested setTimeout Koan
describe('Nested setTimeout vs setInterval', () => {
  it('should use nested setTimeouts to create a precise timer', async () => {
    // This test fails because the callback is not being scheduled recursively.
    let counter = 0;

    // Students should modify the setTimeout to call itself recursively until a condition is met.
    setTimeout(function runTimeout() {
      counter++;
      if ( counter < 3) {
        setTimeout(runTimeout, 1000) 
      }
    }, 1000);

    // Students should use an assertion that waits for the counter to reach a certain value.
    setTimeout(() => {
    expect(counter).toBe(3);
  }, 3500)
  });
});

export {};
