import localFont from 'next/font/local';

const Fonts = localFont({
  src: [
    {
      path: './Roboto-Thin.ttf',
      weight: '100',
    },
    {
      path: './Roboto-Light.ttf',
      weight: '200',
    },
    {
      path: './Roboto-Regular.ttf',
      weight: '400',
    },
    {
      path: './Roboto-Medium.ttf',
      weight: '600',
    },
    {
      path: './Roboto-Bold.ttf',
      weight: '800',
    },
    {
      path: './Roboto-Black.ttf',
      weight: '900',
    },
  ],
});

export default Fonts;
