import { buildMessage, registerDecorator, ValidationOptions } from 'class-validator';

const lowerLetters = /[a-z]+/;
const upperLetters = /[A-Z]+/;
const numbers = /[0-9]+/;
const specialCharacters = /[!#$%&'()*+,-./:;<=>?@[\]^_{|}~]+/;
const noSpace = /^\S+$/;

export function mustContainLowerLetter(validationOptions?: ValidationOptions) {
  return function (object: { [prop: string]: any }, propertyName: string) {
    registerDecorator({
      name: 'mustContainLowerLetter',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return lowerLetters.test(value);
        },
      },
    });
  };
}

export function mustContainUpperLetter(validationOptions?: ValidationOptions) {
  return function (object: { [prop: string]: any }, propertyName: string) {
    registerDecorator({
      name: 'mustContainUpperLetter',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return upperLetters.test(value);
        },
      },
    });
  };
}

export function mustContainNumbers(validationOptions?: ValidationOptions) {
  return function (object: { [prop: string]: any }, propertyName: string) {
    registerDecorator({
      name: 'mustContainNumbers',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return numbers.test(value);
        },
      },
    });
  };
}

export function mustContainSpecialCharacters(validationOptions?: ValidationOptions) {
  return function (object: { [prop: string]: any }, propertyName: string) {
    registerDecorator({
      name: 'mustContainSpecialCharacters',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return specialCharacters.test(value);
        },
      },
    });
  };
}

export function IsWithoutSpaces(validationOptions?: ValidationOptions) {
  return function (object: { [prop: string]: any }, propertyName: string) {
    registerDecorator({
      name: 'isWithoutSpaces',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return noSpace.test(value);
        },
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must not contain spaces',
          validationOptions,
        ),
      },
    });
  };
}
