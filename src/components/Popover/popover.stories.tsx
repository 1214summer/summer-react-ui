// Popover.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Popover from './popover';
import Button from '../Button';

const meta: Meta<typeof Popover> = {
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      description: '弹出框内容',
      control: { type: 'text' },
    },
    title: {
      description: '弹出框标题',
      control: { type: 'text' },
    },
    trigger: {
      description: '触发方式',
      control: {
        type: 'select',
        options: ['hover', 'click', 'focus'],
      },
    },
    offset: {
      description: '与触发元素的间距',
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础用法
export const Default: Story = {
  args: {
    content: '这是一个 Popover 内容',
    title: '标题',
    trigger: 'hover',
    offset: 8,
  },
  render: (args) => (
    <Popover {...args}>
      <Button>Hover me</Button>
    </Popover>
  ),
};

// 不同触发方式
export const Triggers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Popover content="Hover 触发" trigger="hover">
        <Button>Hover</Button>
      </Popover>
      <Popover content="Click 触发" trigger="click">
        <Button>Click</Button>
      </Popover>
      <Popover content="Focus 触发" trigger="focus">
        <input type="text" placeholder="Focus me" style={{ padding: '4px 12px' }} />
      </Popover>
    </div>
  ),
};

// 带标题
export const WithTitle: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Popover
        title="标题"
        content="这是带标题的 Popover 内容"
      >
        <Button>带标题</Button>
      </Popover>
      <Popover
        title="长标题演示"
        content="这是一个很长的标题，用于测试标题的自适应显示效果"
      >
        <Button>长标题</Button>
      </Popover>
    </div>
  ),
};

// 不同偏移量
export const Offsets: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Popover content="默认偏移量" offset={8}>
        <Button>默认 8px</Button>
      </Popover>
      <Popover content="较大偏移量" offset={16}>
        <Button>16px</Button>
      </Popover>
      <Popover content="较小偏移量" offset={4}>
        <Button>4px</Button>
      </Popover>
    </div>
  ),
};

// 受控模式
export const Controlled: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <Popover
        content="受控模式的内容"
        visible={visible}
        onVisibleChange={setVisible}
      >
        <Button onClick={() => setVisible(!visible)}>
          {visible ? '关闭' : '打开'} Popover
        </Button>
      </Popover>
    );
  },
};

// 复杂内容
export const ComplexContent: Story = {
  render: () => (
    <Popover
      title="用户信息"
      content={
        <div>
          <p>用户名：Admin</p>
          <p>邮箱：admin@example.com</p>
          <p>角色：管理员</p>
          <div style={{ marginTop: 12, textAlign: 'right' }}>
            <Button size="sm">查看详情</Button>
          </div>
        </div>
      }
    >
      <Button>复杂内容</Button>
    </Popover>
  ),
};

// 长内容
export const LongContent: Story = {
  render: () => (
    <Popover
      title="长内容演示"
      content={
        <div style={{ maxWidth: 300 }}>
          <p>
            这是一段很长的内容，用于测试 Popover 的自适应大小功能。
            内容可能会超出屏幕宽度，需要自动换行处理。
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed non risus. Suspendisse lectus tortor, dignissim sit amet,
            adipiscing nec, ultricies sed, dolor.
          </p>
        </div>
      }
    >
      <Button>长内容</Button>
    </Popover>
  ),
};

// 组合触发方式
export const MultipleTriggers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Popover
        content="Hover 或 Click 触发"
        trigger={['hover', 'click']}
      >
        <Button>Hover + Click</Button>
      </Popover>
      <Popover
        content="Click 或 Focus 触发"
        trigger={['click', 'focus']}
      >
        <input type="text" placeholder="Click or Focus me" style={{ padding: '4px 12px' }} />
      </Popover>
    </div>
  ),
};
