import { Meta, StoryObj } from '@storybook/react';
import '../../../dist/index.css';
import Select from './select';
import React from 'react';

const meta: Meta<typeof Select> = {
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '下拉选择器，支持单选、多选、搜索等功能。'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础选择器
export const Default: Story = {
  args: {
    options: [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' },
      { value: '3', label: '选项3' },
    ]
  }
};

// 禁用选择器
export const Disabled: Story = {
  args: {
    disabled: true,
    options: [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' },
    ]
  }
};

// 可搜索选择器
export const Searchable: Story = {
  args: {
    searchable: true,
    placeholder: '搜索选项',
    options: [
      { value: '1', label: 'Apple' },
      { value: '2', label: 'Banana' },
      { value: '3', label: 'Orange' },
      { value: '4', label: 'Pear' },
    ]
  }
};

// 多选选择器
export const Multiple: Story = {
  args: {
    multiple: true,
    options: [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' },
      { value: '3', label: '选项3' },
      { value: '4', label: '选项4' },
    ]
  }
};

// 带清除功能的选择器
export const WithClear: Story = {
  args: {
    allowClear: true,
    defaultValue: '1',
    options: [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' },
    ]
  }
};

// 带禁用选项的选择器
export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2', disabled: true },
      { value: '3', label: '选项3' },
    ]
  }
};

// 多选带标签数量限制
export const MultipleWithMaxTag: Story = {
  args: {
    multiple: true,
    maxTagCount: 2,
    defaultValue: ['1', '2', '3'],
    options: [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' },
      { value: '3', label: '选项3' },
      { value: '4', label: '选项4' },
    ]
  }
};

// 组合示例
export const Combination: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Select
        searchable
        allowClear
        placeholder="请选择"
        options={[
          { value: '1', label: 'Apple' },
          { value: '2', label: 'Banana' },
          { value: '3', label: 'Orange' },
        ]}
      />
      
      <Select
        multiple
        searchable
        maxTagCount={2}
        placeholder="多选搜索"
        options={[
          { value: '1', label: '选项1' },
          { value: '2', label: '选项2' },
          { value: '3', label: '选项3' },
          { value: '4', label: '选项4' },
        ]}
      />

      <Select
        disabled
        defaultValue="1"
        options={[
          { value: '1', label: '禁用选项' },
          { value: '2', label: '选项2' },
        ]}
      />
    </div>
  )
};
