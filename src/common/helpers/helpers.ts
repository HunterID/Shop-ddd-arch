import { TransformFnParams } from 'class-transformer';

export const transformToLowerCase = ({ value }: TransformFnParams): string => {
  return value ? value?.trim().toLowerCase() : value;
};

export const trimString = ({ value }: TransformFnParams): string => {
  return value ? value.trim() : value;
};
