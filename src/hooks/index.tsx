'use client';

import React from 'react';
import { useTranslations as useTranslationsBase } from 'next-intl';
import isEqual from 'lodash/isEqual';

export const useOnChange = (callback: () => void, deps) => {
  const mountedRef = React.useRef(false);
  const callbackRef = React.useRef(callback);

  callbackRef.current = callback;

  React.useEffect(() => {
    if (mountedRef.current) {
      callbackRef.current();
    }

    mountedRef.current = true;
  }, deps);
};

export const useEvent = (
  type: string,
  listener,
  target = typeof document !== 'undefined' ? document : null
) => {
  React.useEffect(() => {
    if (!target) {
      return;
    }

    target.addEventListener(type, listener);

    return () => {
      target.removeEventListener(type, listener);
    };
  }, [target, type, listener]);
};

export const useHotkey = (key: string, callback: TAnyFunction) => {
  const handleKeyUp = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key || event.code === key) {
        callback(event);
      }
    },
    [callback, key]
  );

  useEvent('keyup', handleKeyUp);
};

export const useTranslations = () => {
  const t = useTranslationsBase();

  const translator = (strings: string[] | string, options?) => {
    if (typeof strings === 'string') return t(strings, options);

    for (const string of strings) {
      const translation = t(string, options);
      if (translation !== string) {
        return translation;
      }
    }

    return t(strings[strings.length - 1], options);
  };

  translator.raw = t.raw;

  return translator;
};

export const useScroll = () => {
  const [data, setData] = React.useState({
    pixels: 0,
    percent: 0,
    clientHeight: 0,
  });

  React.useEffect(() => {
    const func = () => {
      const pixels = window.scrollY || window.pageYOffset;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const percent = Math.min(
        100,
        Math.max(0, (pixels / (scrollHeight - clientHeight)) * 100)
      );

      setData({
        pixels,
        percent,
        clientHeight,
      });
    };

    func();

    window.addEventListener('scroll', func);

    return () => window.removeEventListener('scroll', func);
  }, []);

  return data;
};

export const useClickOutside = (
  callback: () => void,
  ref: React.RefObject<HTMLElement>
) => {
  const handleClick = React.useCallback(
    (event) => {
      const path = 'composedPath' in event ? event.composedPath() : [];

      if (path.includes(ref.current)) {
        return;
      }

      callback();
    },
    [callback, ref]
  );

  React.useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick, ref]);
};

export const useForceUpdate = () => {
  const [, forceUpdate] = React.useState({});

  return () => forceUpdate({});
};

export const useNotifications = () => {
  return window.notifications;
};

export const useMemoEqualValue = <T,>(valueProp: T): T => {
  const ref = React.useRef(valueProp);

  return React.useMemo(() => {
    if (!isEqual(ref.current, valueProp)) {
      ref.current = valueProp;
    }

    return ref.current;
  }, [valueProp]);
};
