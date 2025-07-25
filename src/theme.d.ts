import 'styled-components';
import { TTheme } from '@/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends TTheme {
    _?: never;
  }
}
