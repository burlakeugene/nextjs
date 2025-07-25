const theme = {
  animation: {
    duration: '0.3s',
  },
  container: {
    maxWidth: '1260px',
  },
  gradient: {
    base: {
      degree: '135deg',
      start: '#3b82f6',
      end: '#1e40af',
    },
    background: {
      degree: '135deg',
      start: '#667eea',
      end: '#764ba2',
    },
  },
  boxShadow: {
    panel: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  form: {
    label: {
      color: '#333',
    },
    control: {
      minHeight: '56px',
      background: '#fff',
      color: '#333',
      border: '#e5e7eb',
      placeholder: '#666',
      focus: {
        border: '#3b82f6',
      },
      error: {
        background: '#fef2f2',
        border: '#ef4444',
      },
      disabled: {
        color: '#999',
        border: '#e5e7eb',
      },
    },
    error: {
      color: '#ef4444',
    },
  },
  button: {
    minHeight: '56px',
    primary: {
      background: '#3b82f6',
      color: '#fff',
      white: {
        background: '#fff',
        color: '#3b82f6',
      },
      green: {
        background: '#34a853',
      },
      red: {
        background: '#ff0000',
      },
      grey: {
        background: '#6c757d',
      },
    },
    ghost: {
      border: '#3b82f6',
      color: '#3b82f6',
      hover: {
        background: '#e1ecff',
      },
      white: {
        border: '#fff',
        color: '#fff',
        hover: {
          background: '#fff',
          color: '#3b82f6',
        },
      },
      green: {
        border: '#34a853',
        color: '#34a853',
        hover: {
          background: '#f0f9f4',
          color: '#34a853',
        },
      },
      red: {
        border: '#ff0000',
        color: '#ff0000',
        hover: {
          background: '#fef2f2',
          color: '#ff0000',
        },
      },
      grey: {
        border: '#6c757d',
        color: '#6c757d',
        hover: {
          background: '#e8e8e8',
          color: '#6c757d',
        },
      },
    },
  },
  panel: {
    default: {
      color: '#fff',
      background: '#3b82f6',
    },
    error: {
      color: '#fff',
      background: '#ff0000',
    },
    warning: {
      color: '#fff',
      background: '#ffa500',
    },
  },
  colors: {
    theme: '#3b82f6',
    border: '#e5e7eb',
    grey: '#eee',
    darkGrey: '#9ca3af',
    text: {
      primary: '#333',
      light: '#666',
      disabled: '#999',
    },
    white: '#ffffff',
    black: '#000000',
    blue: '#1f2937',
    green: {
      default: '#28a745',
      light: '#e8f5e8',
      dark: '#2d5a2d',
    },
    red: {
      default: '#ff0000',
      light: '#f8d7da',
      dark: '#721c24',
    },
    orange: {
      default: '#f59e0b',
      light: '#fff3cd',
      dark: '#856404',
      bright: '#ffc107',
    },
  },
};

export type TTheme = typeof theme;

export default theme;
