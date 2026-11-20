import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ToastContext = createContext(null);

let toastHandlers = {
  add: () => '',
  dismiss: () => {},
  clear: () => {},
  update: () => {},
};

export const toast = (message, options = {}) => {
  return toastHandlers.add({ message, type: 'default', ...options });
};

toast.success = (message, options = {}) => {
  return toastHandlers.add({ message, type: 'success', ...options });
};

toast.error = (message, options = {}) => {
  return toastHandlers.add({ message, type: 'error', ...options });
};

toast.warning = (message, options = {}) => {
  return toastHandlers.add({ message, type: 'warning', ...options });
};

toast.info = (message, options = {}) => {
  return toastHandlers.add({ message, type: 'info', ...options });
};

toast.loading = (message, options = {}) => {
  return toastHandlers.add({ message, type: 'loading', duration: Infinity, ...options });
};

toast.promise = async (promise, { loading = 'Loading...', success = 'Success!', error = 'Error!' }, options = {}) => {
  const id = toast.loading(loading, options);
  try {
    const result = await (typeof promise === 'function' ? promise() : promise);
    const successMsg = typeof success === 'function' ? success(result) : success;
    toastHandlers.update(id, {
      message: successMsg,
      type: 'success',
      duration: options.duration || 4000,
    });
    return result;
  } catch (err) {
    const errorMsg = typeof error === 'function' ? error(err) : (err?.message || error);
    toastHandlers.update(id, {
      message: errorMsg,
      type: 'error',
      duration: options.duration || 5000,
    });
    throw err;
  }
};

toast.dismiss = (id) => {
  toastHandlers.dismiss(id);
};

toast.clear = () => {
  toastHandlers.clear();
};

export const ToastProvider = ({ children, defaultPosition = 'top-right' }) => {
  const [toasts, setToasts] = useState([]);
  const [position, setPosition] = useState(defaultPosition);

  const addToast = useCallback((toastData) => {
    const id = toastData.id || `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast = {
      id,
      duration: toastData.duration !== undefined ? toastData.duration : 4000,
      createdAt: Date.now(),
      position: toastData.position || position,
      dismissible: toastData.dismissible !== false,
      ...toastData,
    };

    setToasts((prev) => {
      const filtered = prev.filter((t) => t.id !== id);
      return [...filtered, newToast];
    });

    return id;
  }, [position]);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const updateToast = useCallback((id, updates) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates, updatedAt: Date.now() } : t))
    );
  }, []);

  useEffect(() => {
    toastHandlers = {
      add: addToast,
      dismiss: dismissToast,
      clear: clearToasts,
      update: updateToast,
    };
  }, [addToast, dismissToast, clearToasts, updateToast]);

  const value = {
    toasts,
    addToast,
    dismissToast,
    clearToasts,
    updateToast,
    position,
    setPosition,
    toast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;
