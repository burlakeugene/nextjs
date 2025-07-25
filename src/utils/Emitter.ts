type TName = string;
type TCallback = (data?) => void;

class Emitter {
  events: Record<TName, TCallback[]> = {};

  publish = (name: TName, ...args) => {
    if (!this.events[name]) {
      return;
    }

    this.events[name].forEach((callback) => callback(...args));
  };

  on = (name: TName, callback: TCallback) => {
    if (!this.events[name]) {
      this.events[name] = [];
    }

    this.events[name].push(callback);
  };

  off = (name: TName, callback: TCallback) => {
    if (!this.events[name]) {
      return;
    }

    this.events[name] = this.events[name].filter(
      (callbackInner) => callback !== callbackInner
    );
  };
}

const emitter = new Emitter();

export enum EEvents {
  LOGOUT = 'LOGOUT',
  SET_TOKEN = 'SET_TOKEN',
  MODAL_OPEN = 'MODAL_OPEN',
  MODAL_CLOSE = 'MODAL_CLOSE',
}

export default emitter;
