import React, { FC, ReactNode, useState, createContext, useContext } from 'react';
import classNames from 'classnames';

import Transition from '../Transition/transition';

// Menu类型定义
export type MenuMode = 'horizontal' | 'vertical' | 'inline';
export type MenuTheme = 'light' | 'dark';

export interface MenuItemProps {
  /** 菜单项唯一标识 */
  index?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子节点 */
  children?: ReactNode;
}

export interface SubMenuProps {
  /** 子菜单唯一标识 */
  index?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子节点 */
  children?: ReactNode;
  /** 子菜单标题 */
  title?: ReactNode;
}

export interface MenuGroupProps {
  /** 分组标题 */
  title?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子节点 */
  children?: ReactNode;
}

export interface MenuProps {
  /** 菜单模式 */
  mode?: MenuMode;
  /** 菜单主题 */
  theme?: MenuTheme;
  /** 默认选中的菜单项 */
  defaultIndex?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子节点 */
  children?: ReactNode;
  /** 选中菜单项时的回调 */
  onSelect?: (index: string) => void;
  /** 展开/收起子菜单时的回调 */
  onOpenChange?: (openIndex: string[]) => void;
}

// MenuContext接口
interface IMenuContext {
  mode: MenuMode;
  theme: MenuTheme;
  defaultIndex: string;
  selectedIndex: string;
  openIndex: string[];
  onSelect: (index: string) => void;
  onOpenChange?: (index: string) => void;
  level: number;
}

// 创建MenuContext
const MenuContext = createContext<IMenuContext>({
  mode: 'vertical',
  theme: 'light',
  defaultIndex: '',
  selectedIndex: '',
  openIndex: [],
  onSelect: () => {},
  onOpenChange: undefined,
  level: 0
});

// Menu组件
const Menu: FC<MenuProps> & {
  Item: FC<MenuItemProps>;
  SubMenu: FC<SubMenuProps>;
  Group: FC<MenuGroupProps>;
} = (props) => {
  const {
    mode = 'vertical',
    theme = 'light',
    defaultIndex = '',
    className,
    style,
    children,
    onSelect,
    onOpenChange
  } = props;

  // 状态管理
  const [selectedIndex, setSelectedIndex] = useState<string>(defaultIndex);
  const [openIndex, setOpenIndex] = useState<string[]>([]);

  // 处理菜单项选中
  const handleSelect = (index: string) => {
    setSelectedIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  // 处理子菜单展开/收起
  const handleOpenChange = (index: string) => {
    setOpenIndex(prev => {
      let newOpenIndex = [...prev];
      const indexPos = newOpenIndex.indexOf(index);
      
      // 如果是水平菜单，只关闭直接同级菜单
      if (mode === 'horizontal') {
        // 获取当前菜单的层级
        const level = index.split('-').length - 1;
        // 过滤掉同级菜单（相同层级的菜单）
        newOpenIndex = newOpenIndex.filter(i => {
          const itemLevel = i.split('-').length - 1;
          return itemLevel !== level || i.startsWith(index.substring(0, index.lastIndexOf('-')));
        });
      } else {
        // 垂直菜单模式下，关闭当前菜单的所有子菜单
        newOpenIndex = newOpenIndex.filter(i => !i.startsWith(index + '-'));
      }

      if (indexPos > -1) {
        newOpenIndex.splice(indexPos, 1);
      } else {
        newOpenIndex.push(index);
      }

      if (onOpenChange) {
        onOpenChange(newOpenIndex);
      }
      return newOpenIndex;
    });
  };



  // 提供给子组件的上下文值
  const contextValue: IMenuContext = {
    mode,
    theme,
    defaultIndex,
    selectedIndex,
    openIndex,
    onSelect: handleSelect,
    onOpenChange: handleOpenChange,
    level: 0
  };

  // 计算类名
  const cls = classNames('menu', className, {
    [`menu-${mode}`]: mode,
    [`menu-${theme}`]: theme
  });

  return (
    <ul className={cls} style={style}>
      <MenuContext.Provider value={contextValue}>
        {children}
      </MenuContext.Provider>
    </ul>
  );
};

// MenuItem组件
const MenuItem: FC<MenuItemProps> = (props) => {
  const {
    index,
    disabled = false,
    className,
    style,
    children
  } = props;

  const context = useContext(MenuContext);
  const { mode, theme, selectedIndex, onSelect, level } = context;

  // 处理点击事件
  const handleClick = () => {
    if (!disabled && index) {
      onSelect(index);
    }
  };

  // 计算类名
  const cls = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-selected': selectedIndex === index
  });

  return (
    <li
      className={cls}
      style={{ ...style, paddingLeft: level * 24 + 24 }}
      onClick={handleClick}
    >
      {children}
    </li>
  );
};

// SubMenu组件
const SubMenu: FC<SubMenuProps> = (props) => {
  const {
    index,
    disabled = false,
    className,
    style,
    children,
    title
  } = props;

  const context = useContext(MenuContext);
  const { mode, theme, selectedIndex, openIndex, onSelect, onOpenChange, level } = context;

  // 处理点击事件
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && index && onOpenChange) {
      onOpenChange(index);
    }
  };

  // 计算类名
  const cls = classNames('menu-submenu', className, {
    'is-disabled': disabled,
    'is-open': openIndex.includes(index!)
  });

  // 提供给子组件的上下文值
  const subMenuContextValue: IMenuContext = {
    ...context,
    level: level + 1
  };

  // 渲染子菜单图标
  const renderIcon = () => {
    if (mode === 'horizontal') {
      return <span className="submenu-icon">▼</span>;
    }
    return <span className="submenu-icon">{openIndex.includes(index!) ? '▼' : '>'}</span>;
  };

  return (
    <li className={cls} style={style}>
      <div 
        className="submenu-title" 
        onClick={handleClick} 
        style={{ paddingLeft: level * 24 + 24 }}
      >
        {title}
        {renderIcon()}
      </div>
      <Transition
        in={openIndex.includes(index!)}
        timeout={300}
        animation={mode === 'vertical' ? 'zoom-in-right' : 'zoom-in-top'}
        wrapper
      >
        <ul className="submenu-content">
          <MenuContext.Provider value={subMenuContextValue}>
            {children}
          </MenuContext.Provider>
        </ul>
      </Transition>
    </li>
  );
};

// MenuGroup组件
const MenuGroup: FC<MenuGroupProps> = (props) => {
  const {
    title,
    className,
    style,
    children
  } = props;

  const context = useContext(MenuContext);
  const { level } = context;

  // 计算类名
  const cls = classNames('menu-group', className);

  return (
    <li className={cls} style={style}>
      <div className="menu-group-title" style={{ paddingLeft: level * 24 + 24 }}>
        {title}
      </div>
      <ul className="menu-group-content">
        {children}
      </ul>
    </li>
  );
};

// 导出Menu组件及其子组件
Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.Group = MenuGroup;

export default Menu;
