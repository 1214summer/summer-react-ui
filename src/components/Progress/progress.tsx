import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

export type ProgressType = 'line' | 'circle';
export type ProgressSize = 'default' | 'small';

export interface ProgressProps {
  /** 类型 */
  type?: ProgressType;
  /** 百分比 */
  percent?: number;
  /** 状态 */
  status?: 'normal' | 'exception' | 'active' | 'success';
  /** 是否显示进度数值或状态图标 */
  showInfo?: boolean;
  /** 进度条线的宽度 */
  strokeWidth?: number;
  /** line总长度 */
  lineLength?: number;
  /** 进度条线的样式 */
  strokeColor?: string;
  /** 固定参数值 */
  size?: ProgressSize;
  /** 自定义文字格式 */
  format?: (percent?: number, successPercent?: number) => ReactNode;
  /** 成功进度条的颜色 */
  success?: {
    percent?: number;
    strokeColor?: string;
  };
  /** 进度条圆角 */
  borderRadius?: number;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

// 定义size的默认值
const SIZE_CONFIG = {
  default: {
    strokeWidth: 10,
    lineLength: 200,
    borderRadius: 10
  },
  small: {
    strokeWidth: 8,
    lineLength: 150,
    borderRadius: 10
  }
};

const Progress: FC<ProgressProps> = (props) => {
  const {
    type = 'line',
    percent = 0,
    status = 'normal',
    showInfo = true,
    strokeWidth,
    lineLength,
    strokeColor = '#1890ff',
    size = 'default',
    format,
    success,
    borderRadius,
    style,
    className,
    ...restProps
  } = props;

  // 获取最终使用的配置，用户指定的值优先级高于size的默认值
  const finalConfig = {
    strokeWidth: strokeWidth ?? SIZE_CONFIG[size].strokeWidth,
    lineLength: lineLength ?? SIZE_CONFIG[size].lineLength,
    borderRadius: borderRadius ?? SIZE_CONFIG[size].borderRadius
  };

  const cls = classNames('progress', className, {
    [`progress-${type}`]: type,
    [`progress-${size}`]: size,
    [`progress-status-${status}`]: status,
    'progress-show-info': showInfo,
  });

  const progressStyle = {
    ...style,
    width: type === 'line' ? `${finalConfig.lineLength}px` : undefined
  };

  const getStrokeColor = () => {
    if (status === 'exception') return '#ff4d4f';
    if (status === 'success') return '#52c41a';
    return strokeColor;
  };

  const getText = () => {
    if (format) return format(percent, success?.percent);
    if (status === 'exception') return '✕';
    if (status === 'success') return '✓';
    return `${percent}%`;
  };

  // 渲染线性进度条
  const renderLineProgress = () => {
    const successPercent = success?.percent || 0;
    const successStyle = {
      width: `${successPercent}%`,
      backgroundColor: success?.strokeColor || '#52c41a',
      height: `${finalConfig.strokeWidth}px`,
      borderRadius: `${finalConfig.borderRadius}px`,
    };

    return (
      <div className="progress-outer">
        <div 
          className="progress-inner" 
          style={{ 
            height: `${finalConfig.strokeWidth}px`, 
            borderRadius: `${finalConfig.borderRadius}px` 
          }}
        >
          <div
            className="progress-bg"
            style={{
              width: `${percent}%`,
              backgroundColor: getStrokeColor(),
              height: `${finalConfig.strokeWidth}px`,
              borderRadius: `${finalConfig.borderRadius}px`,
            }}
          />
          {successPercent > 0 && (
            <div className="progress-success-bg" style={successStyle} />
          )}
        </div>
        {showInfo && (
          <span className="progress-text">{getText()}</span>
        )}
      </div>
    );
  };

  // 渲染圆形进度条
  const renderCircleProgress = () => {
    const radius = (finalConfig.lineLength / 2) - finalConfig.strokeWidth;
    const perimeter = 2 * Math.PI * radius;
    const strokeDasharray = `${(perimeter * percent) / 100} ${perimeter}`;

    return (
      <div 
        className="progress-circle-outer" 
        style={{ 
          width: `${finalConfig.lineLength}px`, 
          height: `${finalConfig.lineLength}px` 
        }}
      >
        <svg
          className="progress-circle"
          viewBox={`0 0 ${finalConfig.lineLength} ${finalConfig.lineLength}`}
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            className="progress-circle-trail"
            cx={finalConfig.lineLength / 2}
            cy={finalConfig.lineLength / 2}
            r={radius}
            fill="none"
            stroke="#f3f3f3"
            strokeWidth={finalConfig.strokeWidth}
          />
          <circle
            className="progress-circle-path"
            cx={finalConfig.lineLength / 2}
            cy={finalConfig.lineLength / 2}
            r={radius}
            fill="none"
            stroke={getStrokeColor()}
            strokeWidth={finalConfig.strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
          />
        </svg>
        {showInfo && (
          <span className="progress-text">{getText()}</span>
        )}
      </div>
    );
  };

  return (
    <div className={cls} style={progressStyle} {...restProps}>
      {type === 'line' && renderLineProgress()}
      {type === 'circle' && renderCircleProgress()}
    </div>
  );
};

export default Progress;
