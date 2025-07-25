import React from 'react';

import { getIntermediateColor } from './helpers';
import styled from 'styled-components';

type TProgressProps = {
  className?: string;
  color?: string;
  value?: number;
};

const CircleElement = styled.svg`
  circle {
    transform: rotateX(180deg) rotate(90deg);
    transform-origin: 50% 50%;
  }
`;

export const Circle = React.memo<TProgressProps>(
  ({ className, color, value = 100 }) => {
    const px = (300 * value) / 100;

    return (
      <CircleElement
        className={className}
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          r="46"
          cx="50"
          cy="50"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDashoffset={`${px}px`}
          fill="transparent"
          strokeDasharray="300px"
        ></circle>
      </CircleElement>
    );
  }
);

type TProps = {
  start?: string;
  duration?: number;
  colors?: string[];
  children: (arg?: {
    value: number;
    color: string;
    seconds: {
      pass: number;
      left: number;
    };
  }) => React.ReactElement;
};

const DEFAULT_COLORS = ['#85E5BB', '#FFC95D', '#F87C6C'];

const Timer = React.memo(
  ({ start, duration, colors = DEFAULT_COLORS, children }: TProps) => {
    const [, forceUpdate] = React.useState({});

    if (!duration || !start) {
      return children();
    }

    const seconds = Math.min((+new Date() - +new Date(start)) / 1000, duration);
    const percentage = Math.min((seconds * 100) / duration, 100);

    if (percentage < 100) {
      window.requestAnimationFrame(() => {
        forceUpdate({});
      });
    }

    const color = getIntermediateColor(colors, percentage);

    return children({
      color,
      value: percentage,
      seconds: {
        pass: seconds,
        left: duration - seconds,
      },
    });
  }
);

export default Timer;
