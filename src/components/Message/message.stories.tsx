// Message.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import '../../../dist/index.css';
import Message from './message';
import React from 'react';

const meta: Meta<typeof Message> = {
  component: Message,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['success', 'error', 'warning', 'info'],
      },
    },
    closable: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 模板函数
const Template: Story = {
  render: (args) => <Message {...args} />,
};

export const Success: Story = {
  ...Template,
  args: {
    type: 'success',
    content: '这是一条成功提示',
    closable: true,
  },
};

export const Error: Story = {
  ...Template,
  args: {
    type: 'error',
    content: '这是一条错误提示',
    closable: true,
  },
};

export const Warning: Story = {
  ...Template,
  args: {
    type: 'warning',
    content: '这是一条警告提示',
    closable: true,
  },
};

export const Info: Story = {
  ...Template,
  args: {
    type: 'info',
    content: '这是一条信息提示',
    closable: true,
  },
};

export const WithoutClose: Story = {
  ...Template,
  args: {
    type: 'info',
    content: '这是一条不可关闭的提示',
    closable: false,
  },
};

// 展示所有类型
export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Message type="success" content="这是一条成功提示" closable />
      <Message type="error" content="这是一条错误提示" closable />
      <Message type="warning" content="这是一条警告提示" closable />
      <Message type="info" content="这是一条信息提示" closable />
    </div>
  ),
};
