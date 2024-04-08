
import { describe, it, expect, vi } from 'vitest';

// Decorator Koan
describe('Decorator', () => {
  function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
      newProperty = 'new property';
      hello = 'override';
      // Students need to implement something here to cause the test to pass.
    }
  } 

  it('should augment a class with new properties', () => {
    @classDecorator
    class Greeter {
      property = 'property';
      hello: string;
      constructor(m: string) {
        this.hello = m;
      }
    }

    const greeter = new Greeter('world');
    expect(greeter.property).toBe('property'); // This will pass
    expect(greeter.hello).toBe('override'); // This will fail initially
    expect(greeter.newProperty).toBe('new property'); // This will also fail initially
  });
});

  it ('should augment a method with modified behavior', 
  () => {
    function merryChristmasDecorator(target: object, propertyKey: string | symbol, descriptor:PropertyDescriptor) {
      let originalMethod = descriptor.value;

      descriptor.value = function(...args: any[]){
        return "Merry Christmas" + originalMethod.apply(this, args)
      }
    }

    class MyClass {
    @merryChristmasDecorator
    myMethod() {
      return "Dale";
      }
    }

    const person = new MyClass();
    expect(person.myMethod()).toBe('Merry ChristmasDale')
  })

  it ('should augment a property with modified behavior', () => {

    function propertyDecorator(target: object, propertyKey: string | symbol) {
      let value: string;

      const getter = () => {
        return "Merry Christmas " + value;
      }

      const setter = (newValue: string) => {
        value = newValue
      }

      Object.defineProperty(target, propertyKey, {
        get:getter,
        set:setter,
        enumerable: true,
        configurable: true
      })
    }

  
    class MyClass2 {
      @propertyDecorator
      myProperty: string = "Dale"
    }

    const person = new MyClass2();
    expect(person.myProperty).toBe("Merry Christmas Dale")
  });


  it("should augment the behaviour of a parameter",() => {

    function merryChristmasParam(target:object, propertyKey: string | symbol, parameterIndex: number)
      {
        // const originalMethodDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        // const originalMethod = originalMethodDescriptor.value;

        // const newMethod = function(...args: any[]){
        //   return "Merry Christmas and " + originalMethod.apply(this, args)
        // }

        // Object.defineProperty(target, propertyKey, {
        //   value:newMethod,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        //})
        console.log(`Parameter in ${target}.${propertyKey.toString()}() at index${parameterIndex}`)
      }

    class MyClass3{
    sayHello(@merryChristmasParam name: string){
    return "Hello " + name;
      }
    }

    const person = new MyClass3();
    person.sayHello("Hello ");
    //expect(person.sayHello("Dale")).toBe("Merry Christmas and Hello Dale")
  })
export {};
