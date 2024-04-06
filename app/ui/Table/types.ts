import { SxProps } from '@mui/material';
import { ReactNode } from 'react';

type Align = 'center' | 'right' | 'left' | 'inherit' | 'justify' | undefined;

export type FormControl =
  | 'text'
  | 'number'
  | 'date'
  | 'select'
  | 'autocomplete'
  | undefined;

export type Column = {
  autoFocus?: boolean;
  dataAlign?: Align;
  headerContent: string | ReactNode;
  name?: string;
  formControl?: FormControl;
  valueFormatter?: (value: any) => string | ReactNode;
  align?: Align;
  selectOptions?:
    | Array<any>
    | ((arg: any) => Array<string> | Promise<Array<string>>);
  sx?: SxProps;
};

export type Footer = {
  footerContent: string | ReactNode;
  align?: Align;
};

export type Row = {
  data: string | ReactNode;
  align?: Align;
};
