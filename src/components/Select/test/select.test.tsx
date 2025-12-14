import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Select, { Option } from '../select';
import '@testing-library/jest-dom';

const options: Option[] = [
  { value: '1', label: '选项1' },
  { value: '2', label: '选项2' },
  { value: '3', label: '选项3' },
];

describe('test Select component', () => {
  it('should render the correct default Select', () => {
    const wrapper = render(<Select options={options} />);
    const selectElement = wrapper.container.querySelector('.select');
    expect(selectElement).toBeInTheDocument();
  });

  it('should render placeholder correctly', () => {
    const wrapper = render(
      <Select options={options} placeholder="请选择" />
    );
    const placeholderElement = wrapper.container.querySelector('.select-placeholder');
    expect(placeholderElement).toBeInTheDocument();
    expect(placeholderElement).toHaveTextContent('请选择');
  });

  it('should open dropdown when clicked', () => {
    const wrapper = render(<Select options={options} />);
    const selectElement = wrapper.container.querySelector('.select');
    fireEvent.click(selectElement!);
    expect(selectElement).toHaveClass('select-open');
  });

  it('should select option correctly', () => {
    const onChange = vi.fn();
    const wrapper = render(
      <Select options={options} onChange={onChange} />
    );
    const selectElement = wrapper.container.querySelector('.select');
    fireEvent.click(selectElement!);
    
    const optionElement = wrapper.container.querySelector('.select-option');
    fireEvent.click(optionElement!);
    
    expect(onChange).toHaveBeenCalledWith('1');
    expect(selectElement).not.toHaveClass('select-open');
  });

  it('should handle multiple selection', () => {
    const onChange = vi.fn();
    const wrapper = render(
      <Select 
        options={options} 
        multiple 
        onChange={onChange} 
      />
    );
    const selectElement = wrapper.container.querySelector('.select');
    fireEvent.click(selectElement!);
    
    const optionElements = wrapper.container.querySelectorAll('.select-option');
    fireEvent.click(optionElements[0]!);
    fireEvent.click(optionElements[1]!);
    
    expect(onChange).toHaveBeenCalledWith(['1', '2']);
  });

  it('should filter options when searching', () => {
    const wrapper = render(
      <Select 
        options={options} 
        searchable 
      />
    );
    const selectElement = wrapper.container.querySelector('.select');
    fireEvent.click(selectElement!);
    
    const searchInput = wrapper.container.querySelector('.select-search-input');
    fireEvent.change(searchInput!, { target: { value: '选项1' } });
    
    const optionElements = wrapper.container.querySelectorAll('.select-option');
    expect(optionElements.length).toBe(1);
    expect(optionElements[0]).toHaveTextContent('选项1');
  });

  it('should handle disabled state', () => {
    const wrapper = render(<Select disabled options={options} />);
    const selectElement = wrapper.container.querySelector('.select');
    expect(selectElement).toHaveClass('select-disabled');
    
    fireEvent.click(selectElement!);
    expect(selectElement).not.toHaveClass('select-open');
  });

  it('should handle disabled option', () => {
    const optionsWithDisabled = [
      ...options,
      { value: '4', label: '禁用选项', disabled: true }
    ];
    const onChange = vi.fn();
    const wrapper = render(
      <Select options={optionsWithDisabled} onChange={onChange} />
    );
    const selectElement = wrapper.container.querySelector('.select');
    fireEvent.click(selectElement!);
    
    const disabledOption = wrapper.container.querySelector('.select-option-disabled');
    fireEvent.click(disabledOption!);
    
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should clear selection when clear button clicked', () => {
    const onChange = vi.fn();
    const wrapper = render(
      <Select 
        options={options} 
        allowClear 
        defaultValue="1"
        onChange={onChange} 
      />
    );
    const clearButton = wrapper.container.querySelector('.select-clear');
    fireEvent.click(clearButton!);
    
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('should handle maxTagCount in multiple mode', () => {
    const wrapper = render(
      <Select 
        options={options} 
        multiple 
        maxTagCount={2}
        defaultValue={['1', '2', '3']}
      />
    );
    const tags = wrapper.container.querySelectorAll('.select-tag');
    expect(tags.length).toBe(3); // 2个正常标签 + 1个计数标签
  });

  it('should handle keyboard navigation', () => {
    const onChange = vi.fn();
    const wrapper = render(
      <Select options={options} onChange={onChange} />
    );
    const selectElement = wrapper.container.querySelector('.select');
    
    // 打开下拉框
    fireEvent.click(selectElement!);
    
    // 使用键盘导航
    fireEvent.keyDown(selectElement!, { key: 'ArrowDown' });
    fireEvent.keyDown(selectElement!, { key: 'Enter' });
    
    expect(onChange).toHaveBeenCalledWith('1');
  });

  it('should close dropdown when Escape key pressed', () => {
    const wrapper = render(<Select options={options} />);
    const selectElement = wrapper.container.querySelector('.select');
    
    // 打开下拉框
    fireEvent.click(selectElement!);
    expect(selectElement).toHaveClass('select-open');
    
    // 按下 Escape 键
    fireEvent.keyDown(selectElement!, { key: 'Escape' });
    expect(selectElement).not.toHaveClass('select-open');
  });

  it('should handle empty options', () => {
    const wrapper = render(
      <Select 
        options={[]} 
        searchable 
      />
    );
    const selectElement = wrapper.container.querySelector('.select');
    fireEvent.click(selectElement!);
    
    const emptyElement = wrapper.container.querySelector('.select-empty');
    expect(emptyElement).toBeInTheDocument();
    expect(emptyElement).toHaveTextContent('无数据');
  });

  it('should apply custom className correctly', () => {
    const wrapper = render(
      <Select options={options} className="custom-select" />
    );
    const selectElement = wrapper.container.querySelector('.select');
    expect(selectElement).toHaveClass('custom-select');
  });

  it('should apply custom style correctly', () => {
    const customStyle = { width: '200px' };
    const wrapper = render(
      <Select options={options} style={customStyle} />
    );
    const selectElement = wrapper.container.querySelector('.select');
    expect(selectElement).toHaveStyle('width: 200px');
  });
});
