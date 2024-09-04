import clsx from 'clsx';
import { type ClassNameValue, twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassNameValue[]) => {
  return twMerge(clsx(inputs));
};

// eslint-disable-next-line no-useless-escape
export const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
