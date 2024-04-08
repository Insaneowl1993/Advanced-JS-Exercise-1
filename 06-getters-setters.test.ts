
import { describe, it, expect } from 'vitest';

// Getters and Setters Koan
describe('Getters and Setters', () => {
  it('should use getters to access properties', () => {
    class Person {
      private _firstName: string;
      private _lastName: string;

      constructor(firstName: string, lastName: string) {
        this._firstName = firstName;
        this._lastName = lastName;
      }

      // The getter is supposed to concatenate first and last names.
      // It should be failing initially because the implementation is missing.
      get fullName(): string {
        // Students should complete this getter.
        return `${this._firstName} ${this._lastName}`;
      }
    }

    const person = new Person('John', 'Doe');
    // This test will fail initially and students need to fix the getter to make it pass.
    expect(person.fullName).toBe('John Doe');
  });

  it('should use setters to set properties', () => {
    class Person {
      private _age: number;

      constructor(age: number) {
        this._age = age;
      }

      // This setter should fail initially because it allows any age, even unrealistic ones.
      set age(newAge: number) {
        // Students should add validation to pass the test.
        if (newAge > 130) {
          this._age = 130
        } else {
          this._age = newAge;
        }
      }

      get age(): number {
        return this._age;
      }
    }

    const person = new Person(30);
    person.age = 300; // This should not be possible if the setter is implemented correctly.
    // This test will fail initially and students need to fix the setter to make it pass.
    expect(person.age).toBeLessThanOrEqual(130);
  });

  it('should define properties using Object.defineProperty', () => {
    class Person {
      name(name: any) {
        throw new Error('Method not implemented.');
      }
      private _name: string;

      constructor(name: string) {
        this._name = name;
        Object.defineProperty(this, 'name', {
          get(){
            return this._name;
          }
        })
        // The property 'name' should be defined using Object.defineProperty.
        // It will fail initially because it's not defined as a property with a getter.
      }
    }

    const person = new Person('John');
    // This test will fail initially and students need to define the 'name' property to make it pass.
    expect(person).toHaveProperty('name');
    expect(person.name).toBe('John'); // Getter should return the name.
  });
});

export {};
