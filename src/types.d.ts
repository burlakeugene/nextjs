declare type TAnyObject = Record<string, any>;
declare type TAnyFunction = (...args: any[]) => any;
declare type TSvgComponent = React.ComponentType<React.ComponentProps<'svg'>>;
interface Window {
  notifications?: {
    addMessage: (data: {
      message: string;
      type?: string;
      delay?: number;
    }) => void;
    destroy: () => void;
    loadingOn: () => void;
    loadingOff: () => void;
  };
}
