import React, { FC, useState, useRef } from 'react';
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';

export interface Option {
  /** 选项值 */
  value: string;
  /** 选项标签 */
  label: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
}

export interface SelectProps {
  /** 是否多选 */
  multiple?: boolean;
  /** 是否可搜索 */
  searchable?: boolean;
  /** 默认选中项 */
  defaultValue?: string | string[];
  /** 选中项回调 */
  onChange?: (value: string | string[]) => void;
  /** 选项数据 */
  options: Option[];
  /** 占位符 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 最大显示标签数量（多选时） */
  maxTagCount?: number;
}

const Select: FC<SelectProps> = (props) => {
  const {
    multiple = false,
    searchable = false,
    defaultValue,
    onChange,
    options,
    placeholder = '请选择',
    disabled = false,
    className,
    style,
    allowClear = false,
    maxTagCount
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | string[]>(
    defaultValue || (multiple ? [] : '')
  );
  const [searchValue, setSearchValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 处理点击外部关闭下拉框
  useClickOutside(selectRef, () => {
    setIsOpen(false);
    setSearchValue('');
  });

  // 处理选项选择
  const handleOptionClick = (option: Option) => {
    if (option.disabled) return;

    if (multiple) {
      const values = selectedValue as string[];
      const newValues = values.includes(option.value)
        ? values.filter(v => v !== option.value)
        : [...values, option.value];
      
      setSelectedValue(newValues);
      onChange?.(newValues);
    } else {
      setSelectedValue(option.value);
      onChange?.(option.value);
      setIsOpen(false);
    }
    setSearchValue('');
  };

  // 处理清除选择
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValue(multiple ? [] : '');
    onChange?.(multiple ? [] : '');
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < options.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleOptionClick(options[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  // 过滤选项
  const filteredOptions = options.filter(option =>
    option.label?.toString().toLowerCase().includes(searchValue.toLowerCase())
  );

  // 计算选中项的显示文本
  const getSelectedText = () => {
    if (multiple) {
      const values = selectedValue as string[];
      const selectedOptions = options.filter(opt => values.includes(opt.value));
      
      if (maxTagCount && selectedOptions.length > maxTagCount) {
        return (
          <>
            {selectedOptions.slice(0, maxTagCount).map(opt => (
              <span key={opt.value} className="select-tag">
                {opt.label}
              </span>
            ))}
            <span className="select-tag">+{selectedOptions.length - maxTagCount}...</span>
          </>
        );
      }
      
      return selectedOptions.map(opt => (
        <span key={opt.value} className="select-tag">
          {opt.label}
        </span>
      ));
    }

    const option = options.find(opt => opt.value === selectedValue);
    return option?.label;
  };

  const cls = classNames('select', className, {
    'select-disabled': disabled,
    'select-open': isOpen,
    'select-multiple': multiple,
  });

  return (
    <div 
      ref={selectRef}
      className={cls}
      style={style}
      onClick={() => !disabled && setIsOpen(!isOpen)}
      onKeyDown={handleKeyDown}
    >
      <div className="select-selector">
        {/* 多选模式下的标签 */}
        {multiple && (
          <div className="select-selection">
            {getSelectedText()}
          </div>
        )}
        
        {/* 单选模式下的值 */}
        {!multiple && (
          <div className="select-selection">
            {!selectedValue && <span className="select-placeholder">{placeholder}</span>}
            {selectedValue && getSelectedText()}
          </div>
        )}

        {/* 搜索输入框 */}
        {searchable && (
          <input
            ref={inputRef}
            className="select-search-input"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onClick={e => e.stopPropagation()}
          />
        )}

        {/* 清除按钮 */}
        {allowClear && selectedValue && (
          <span className="select-clear" onClick={handleClear}>
            ×
          </span>
        )}

        {/* 下拉箭头 */}
        <span className="select-arrow" />
      </div>

      {/* 下拉选项 */}
      {isOpen && (
        <div className="select-dropdown">
          {filteredOptions.length === 0 ? (
            <div className="select-empty">无数据</div>
          ) : (
            filteredOptions.map((option, index) => (
              <div
                key={option.value}
                className={classNames('select-option', {
                  'select-option-selected': multiple
                    ? (selectedValue as string[]).includes(option.value)
                    : selectedValue === option.value,
                  'select-option-disabled': option.disabled,
                  'select-option-highlighted': index === highlightedIndex,
                })}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
