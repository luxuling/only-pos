import clsx from 'clsx';
import { type ClassNameValue,twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassNameValue[]) => {
  return twMerge(clsx(inputs));
};
