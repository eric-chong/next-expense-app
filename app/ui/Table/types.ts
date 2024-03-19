import { ReactNode } from 'react';

type Align = 'center' | 'right' | 'left' | 'inherit' | 'justify' | undefined;

export type FormControl = 'text' | 'number' | 'date' | 'select' | undefined;

export type Column = {
  autoFocus?: boolean;
  dataAlign?: Align;
  headerContent: string | ReactNode;
  maxWidth?: number;
  name?: string;
  formControl?: FormControl;
  valueFormatter?: (value: any) => string;
  width?: number;
  align?: Align;
};

export type Footer = {
  footerContent: string | ReactNode;
  align?: Align;
};

export type Row = {
  data: string | ReactNode;
  align?: Align;
};
