// Popover.tsx
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

export type Trigger = 'hover' | 'click' | 'focus';

interface PopoverProps {
  content: React.ReactNode;
  title?: React.ReactNode;
  trigger?: Trigger | Trigger[];
  offset?: number;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  className?: string;
  children: React.ReactElement;
}

const Popover: React.FC<PopoverProps> = ({
  content,
  title,
  trigger = 'hover',
  offset = 8,
  visible,
  onVisibleChange,
  className,
  children,
}) => {
  const [internalVisible, setInternalVisible] = useState(false);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number>();

  const isControlled = visible !== undefined;
  const currentVisible = isControlled ? visible : internalVisible;

  // 计算位置
  const calculatePosition = () => {
    if (!triggerRef.current || !popupRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popupRect = popupRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    // 计算水平位置
    let left = triggerRect.left + (triggerRect.width - popupRect.width) / 2;
    let arrowLeft = '50%';

    // 处理左右边界
    if (left < 0) {
      left = 8;
      arrowLeft = `${triggerRect.left + triggerRect.width / 2 - left}px`;
    } else if (left + popupRect.width > viewportWidth) {
      left = viewportWidth - popupRect.width - 8;
      arrowLeft = `${triggerRect.left + triggerRect.width / 2 - left}px`;
    }

    // 计算垂直位置
    const top = triggerRect.top - popupRect.height - offset;

    setPopupStyle({
      top: `${top}px`,
      left: `${left}px`,
    });

    setArrowStyle({
      left: arrowLeft,
    });
  };

  const handleVisibleChange = (newVisible: boolean) => {
    if (!isControlled) {
      setInternalVisible(newVisible);
    }
    onVisibleChange?.(newVisible);
  };

  const handleMouseEnter = () => {
    if (Array.isArray(trigger) ? trigger.includes('hover') : trigger === 'hover') {
      timerRef.current && clearTimeout(timerRef.current);
      handleVisibleChange(true);
    }
  };

  const handleMouseLeave = () => {
    if (Array.isArray(trigger) ? trigger.includes('hover') : trigger === 'hover') {
      timerRef.current = window.setTimeout(() => {
        handleVisibleChange(false);
      }, 100);
    }
  };

  const handleClick = () => {
    if (Array.isArray(trigger) ? trigger.includes('click') : trigger === 'click') {
      handleVisibleChange(!currentVisible);
    }
  };

  const handleFocus = () => {
    if (Array.isArray(trigger) ? trigger.includes('focus') : trigger === 'focus') {
      handleVisibleChange(true);
    }
  };

  const handleBlur = () => {
    if (Array.isArray(trigger) ? trigger.includes('focus') : trigger === 'focus') {
      handleVisibleChange(false);
    }
  };

  useEffect(() => {
    if (currentVisible) {
      calculatePosition();
      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition, true);
    }

    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition, true);
    };
  }, [currentVisible, offset]);

  const triggerProps = {
    ref: triggerRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  const popup = (
    <div
      ref={popupRef}
      className={classNames('popover', className)}
      style={popupStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="popover-content">
        {title && <div className="popover-title">{title}</div>}
        <div className="popover-inner">{content}</div>
      </div>
      <div className="popover-arrow" style={arrowStyle} />
    </div>
  );

  return (
    <>
      {React.cloneElement(children, triggerProps)}
      {currentVisible && popup}
    </>
  );
};

export default Popover;
