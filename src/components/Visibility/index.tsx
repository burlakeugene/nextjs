import React from 'react';

type TProps = {
  children: (props: {
    visible?: boolean;
    ref: React.RefObject<HTMLElement | null>;
  }) => React.ReactElement;
};

const Visibility = React.memo<TProps>(({ children }) => {
  const ref = React.useRef<HTMLElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return children({
    ref,
    visible,
  });
});

Visibility.displayName = 'Visibility';

export default Visibility;
