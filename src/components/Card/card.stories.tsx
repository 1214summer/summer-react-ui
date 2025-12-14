import { Meta, StoryObj } from '@storybook/react';
import '../../../dist/index.css';
// import './styles/_style.scss'
import Card from './card';
import React from 'react';

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '卡片容器，可承载文字、列表、图片、段落等内容，常用于信息展示。'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础卡片
export const Default: Story = {
  args: {
    title: 'Default card',
    children: 'Card content'
  }
};

// 无边框卡片
export const Borderless: Story = {
  args: {
    title: 'Borderless card',
    bordered: false,
    children: 'Card content'
  }
};

// 可悬停卡片
export const Hoverable: Story = {
  args: {
    title: 'Hoverable card',
    hoverable: true,
    children: 'Hover over me'
  }
};

// 带额外操作的卡片
export const WithExtra: Story = {
  args: {
    title: 'Card title',
    extra: <a href="#">More</a>,
    children: 'Card content'
  }
};

// 带封面的卡片
export const WithCover: Story = {
  args: {
    cover: (
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    ),
    children: 'Card content'
  }
};

// 带操作的卡片
export const WithActions: Story = {
  args: {
    title: 'Card title',
    actions: [
      <span key="setting">Setting</span>,
      <span key="edit">Edit</span>,
      <span key="ellipsis">More</span>
    ],
    children: 'Card content'
  }
};

// 完整示例卡片
export const Complete: Story = {
  args: {
    title: 'Card title',
    extra: <a href="#">More</a>,
    cover: (
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    ),
    actions: [
      <span key="setting">Setting</span>,
      <span key="edit">Edit</span>,
      <span key="ellipsis">More</span>
    ],
    children: (
      <div>
        <p>Card content</p>
        <p>More content here...</p>
      </div>
    )
  }
};

// 简洁卡片
export const Simple: Story = {
  args: {
    children: (
      <div>
        <p style={{ fontSize: 16, fontWeight: 500 }}>Simple card</p>
        <p>Card content</p>
      </div>
    )
  }
};

// 组合示例
export const Combination: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
      <Card title="Card title" bordered={false}>
        <p>Card content</p>
      </Card>
      
      <Card hoverable>
        <p>Hoverable card</p>
      </Card>

      <Card
        title="With cover"
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
      >
        <p>Card content</p>
      </Card>

      <Card
        title="With actions"
        actions={[
          <span key="setting">Setting</span>,
          <span key="edit">Edit</span>
        ]}
      >
        <p>Card content</p>
      </Card>
    </div>
  )
};
