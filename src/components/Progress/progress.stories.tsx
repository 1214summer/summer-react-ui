import { Meta, StoryObj } from '@storybook/react';
import '../../../dist/index.css';
import Progress from './progress';
import React from 'react';

const meta: Meta<typeof Progress> = {
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '进度条组件，展示操作的当前进度。'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 模板函数
const Template: Story = {
  render: (args) => <Progress {...args} />
};

// 基础进度条
export const Default: Story = {
  ...Template,
  args: {
    percent: 30
  }
};

// 不同尺寸
export const Small: Story = {
  ...Template,
  args: {
    percent: 50,
    size: 'small'
  }
};

// 不同状态
export const Success: Story = {
  ...Template,
  args: {
    percent: 100,
    status: 'success'
  }
};

export const Exception: Story = {
  ...Template,
  args: {
    percent: 70,
    status: 'exception'
  }
};

export const Active: Story = {
  ...Template,
  args: {
    percent: 50,
    status: 'active'
  }
};

// 自定义颜色
export const CustomColor: Story = {
  ...Template,
  args: {
    percent: 75,
    strokeColor: '#4daac2'
  }
};

// 圆形进度条
export const Circle: Story = {
  ...Template,
  args: {
    type: 'circle',
    percent: 75
  }
};

// 带成功进度的进度条
export const WithSuccess: Story = {
  ...Template,
  args: {
    percent: 80,
    success: {
      percent: 30
    }
  }
};

// 自定义格式
export const CustomFormat: Story = {
  ...Template,
  args: {
    percent: 50,
    format: (percent) => `${percent} Days`
  }
};

// 组合示例
export const Combination: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Progress percent={30} />
      <Progress percent={50} status="active" />
      <Progress percent={70} status="exception" />
      <Progress percent={100} status="success" />
      <Progress type="circle" percent={75} />
    </div>
  )
};
