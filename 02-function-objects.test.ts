import { describe, it, expect } from 'vitest';

describe('Function Objects - Name Property', () => {
  it('Function declaration should have correct name', () => {
    function sayHiDefn() {}
    // This test will initially fail because the function name is not 'incorrectName'
    expect(sayHiDefn.name).toBe('sayHiDefn');
  });

  it('Function expression should have correct inferred name', () => {
    const sayHiExprn = function() {};
    // This test will initially fail because the inferred name is not 'wrongName'
    expect(sayHiExprn.name).toBe('sayHiExprn');
  });

  it('Arrow function should have correct inferred name', () => {
    const sayHiArrow = () => {};
    // This test will initially fail because the inferred name is not 'notMyName'
    expect(sayHiArrow.name).toBe('sayHiArrow');
  });
});

describe('Function Objects - Length Property', () => {
  it('Function should have correct length based on parameters', () => {
    function twoParams(a, b) {}
    // This test will initially fail because the function length is not 3
    expect(twoParams.length).toBe(2);
  });
});

describe('Function Objects - Custom Properties', () => {
  it('Function should correctly increment custom property', () => {
    function sayHi() {
      sayHi.counter++;
    }
    sayHi.counter = 0;
    sayHi();
    sayHi();
    // This test will initially fail because the counter will not be 1 after two calls
    expect(sayHi.counter).toBe(2);
  });
});

describe('Function Objects - NFE (Named Function Expression)', () => {
  it('NFE should have correct internal name', () => {
    const sayHi = function sayHiFunc() {};
    // This test will initially fail because the internal name is not 'incorrectInternalName'
    expect(sayHi.name).toBe('sayHiFunc');
  });

  it('NFE should allow for internal referencing', () => {
    const sayHi = function sayHiFunc(who) {
      if (!who) {
       return sayHiFunc('guest');
      }
      return who;
    };
    // This test will initially fail because calling sayHi with undefined should result in 'guest'
    expect(sayHi()).toBe('guest');
  });
});