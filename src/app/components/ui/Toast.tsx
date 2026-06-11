import React from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

const toastConfig = {
  success: { icon: '✓', bgColor: '#e8f5e9', textColor: '#2e7d32', borderColor: '#4caf50' },
  error:   { icon: '✗', bgColor: '#ffebee', textColor: '#c62828', borderColor: '#f44336' },
  warning: { icon: '⚠️', bgColor: '#fff8e1', textColor: '#e65100', borderColor: '#ff9800' },
  info:    { icon: 'ℹ', bgColor: '#e3f2fd', textColor: '#1565c0', borderColor: '#2196f3' },
};

export const Toast = ({ message, type = 'info' }: { message: string, type: ToastType }) => {
  const config = toastConfig[type];
  return (
    <div style={{ 
      background: config.bgColor, 
      color: config.textColor,
      border: `1px solid ${config.borderColor}`, 
      borderRadius: 8,
      padding: '12px 16px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: 8,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      marginBottom: 10
    }}>
      <span style={{ fontWeight: 'bold' }}>{config.icon}</span>
      <span style={{ fontSize: 14, fontWeight: 500 }}>{message}</span>
    </div>
  );
};
