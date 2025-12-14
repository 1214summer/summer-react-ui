import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

export interface CardProps {
  /** 标题 */
  title?: ReactNode;
  /** 额外操作 */
  extra?: ReactNode;
  /** 卡片封面 */
  cover?: ReactNode;
  /** 卡片操作 */
  actions?: ReactNode[];
  /** 是否边框 */
  bordered?: boolean;
  /** 悬停效果 */
  hoverable?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子节点 */
  children?: ReactNode;
}

const Card: FC<CardProps> = (props) => {
  const {
    title,
    extra,
    cover,
    actions,
    bordered = true,
    hoverable = false,
    className,
    style,
    children
  } = props;

  // 计算类名
  const cls = classNames('card', className, {
    'card-bordered': bordered,
    'card-hoverable': hoverable
  });

  return (
    <div className={cls} style={style}>
      {/* 卡片封面 */}
      {cover && <div className="card-cover">{cover}</div>}
      
      {/* 卡片内容区 */}
      <div className="card-body">
        {/* 标题和额外操作 */}
        {(title || extra) && (
          <div className="card-head">
            <div className="card-head-title">{title}</div>
            {extra && <div className="card-head-extra">{extra}</div>}
          </div>
        )}
        
        {/* 主要内容 */}
        {children && <div className="card-content">{children}</div>}
      </div>

      {/* 操作区域 */}
      {actions && actions.length > 0 && (
        <ul className="card-actions">
          {actions.map((action, index) => (
            <li key={index} className="card-actions-item">
              {action}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Card;
