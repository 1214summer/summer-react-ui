import React, { useState } from 'react';
import classNames from 'classnames';

export type MessageType = 'success' | 'error' | 'info' | 'warning';

interface MessageProps {
  type?: MessageType;
  content: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

const Message: React.FC<MessageProps> = ({
  type = 'info',
  content,
  closable = false,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  const iconMap = {
    success: '✓',
    error: '✕',
    info: 'i',
    warning: '!',
  };

  if (!visible) return null;

  return (
    <div className={classNames('message', `message-${type}`)}>
      <span className="message-icon">{iconMap[type]}</span>
      <span className="message-content">{content}</span>
      {closable && (
        <span className="message-close" onClick={handleClose}>
          ×
        </span>
      )}
    </div>
  );
};

export default Message;
