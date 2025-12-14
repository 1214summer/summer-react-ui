import { Meta, StoryObj } from '@storybook/react';
import '../../../dist/index.css';
import Menu from './menu';
import React from 'react';

const meta: Meta<typeof Menu> = {
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '为页面和功能提供导航的菜单列表，支持二级菜单、分组、主题等特性。'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 模板函数
const Template: Story = {
  render: (args) => <Menu {...args} />
};

// 基础垂直菜单
export const Default: Story = {
  ...Template,
  args: {
    mode: 'vertical',
    defaultIndex: '1',
    children: (
      <>
        <Menu.Item index="1">Dashboard</Menu.Item>
        <Menu.SubMenu index="2" title="User Management">
          <Menu.Item index="2-1">Users</Menu.Item>
          <Menu.Item index="2-2">Roles</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu index="3" title="Settings">
          <Menu.Item index="3-1">General</Menu.Item>
          <Menu.Item index="3-2">Security</Menu.Item>
          <Menu.Item index="3-3" disabled>Advanced</Menu.Item>
        </Menu.SubMenu>
      </>
    )
  }
};

// 水平菜单
export const Horizontal: Story = {
  ...Template,
  args: {
    mode: 'horizontal',
    defaultIndex: '1',
    children: (
      <>
        <Menu.Item index="1">Home</Menu.Item>
        <Menu.SubMenu index="2" title="Products">
          <Menu.Item index="2-1">Product List</Menu.Item>
          <Menu.Item index="2-2">Categories</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu index="3" title="Services">
          <Menu.Item index="3-1">Consulting</Menu.Item>
          <Menu.Item index="3-2">Support</Menu.Item>
          <Menu.Item index="3-3">Training</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item index="4">About</Menu.Item>
      </>
    )
  }
};

// 内联菜单
export const Inline: Story = {
  ...Template,
  args: {
    mode: 'inline',
    defaultIndex: '1',
    children: (
      <>
        <Menu.Item index="1">Navigation One</Menu.Item>
        <Menu.SubMenu index="2" title="Navigation Two">
          <Menu.Item index="2-1">Option 1</Menu.Item>
          <Menu.Item index="2-2">Option 2</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu index="3" title="Navigation Three">
          <Menu.Item index="3-1">Option 5</Menu.Item>
          <Menu.Item index="3-2">Option 6</Menu.Item>
        </Menu.SubMenu>
      </>
    )
  }
};

// 暗色主题
export const DarkTheme: Story = {
  ...Template,
  args: {
    mode: 'vertical',
    theme: 'dark',
    defaultIndex: '1',
    children: (
      <>
        <Menu.Item index="1">Dark Option 1</Menu.Item>
        <Menu.SubMenu index="2" title="Dark Sub Menu">
          <Menu.Item index="2-1">Dark Option 2-1</Menu.Item>
          <Menu.Item index="2-2">Dark Option 2-2</Menu.Item>
        </Menu.SubMenu>
      </>
    )
  }
};

// 带分组
export const WithGroups: Story = {
  ...Template,
  args: {
    mode: 'vertical',
    defaultIndex: '1',
    children: (
      <>
        <Menu.Group title="Group 1">
          <Menu.Item index="1">Option 1</Menu.Item>
          <Menu.Item index="2">Option 2</Menu.Item>
          <Menu.SubMenu index="3" title="Sub Menu">
            <Menu.Item index="3-1">Option 3-1</Menu.Item>
            <Menu.Item index="3-2">Option 3-2</Menu.Item>
          </Menu.SubMenu>
        </Menu.Group>
        <Menu.Group title="Group 2">
          <Menu.Item index="4">Option 4</Menu.Item>
          <Menu.Item index="5">Option 5</Menu.Item>
        </Menu.Group>
      </>
    )
  }
};

// 组合示例
export const Combination: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Menu mode="horizontal" defaultIndex="1">
        <Menu.Item index="1">Home</Menu.Item>
        <Menu.SubMenu index="2" title="Products">
          <Menu.Item index="2-1">Product List</Menu.Item>
          <Menu.Item index="2-2">Categories</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item index="3">About</Menu.Item>
      </Menu>
      
      <Menu mode="vertical" theme="dark" defaultIndex="1">
        <Menu.Item index="1">Dashboard</Menu.Item>
        <Menu.SubMenu index="2" title="User Management">
          <Menu.Item index="2-1">Users</Menu.Item>
          <Menu.Item index="2-2">Roles</Menu.Item>
        </Menu.SubMenu>
      </Menu>

      <Menu mode="inline" defaultIndex="1">
        <Menu.Group title="Settings">
          <Menu.Item index="1">General</Menu.Item>
          <Menu.Item index="2">Security</Menu.Item>
          <Menu.Item index="3" disabled>Advanced</Menu.Item>
        </Menu.Group>
        <Menu.SubMenu index="4" title="More Options">
          <Menu.Item index="4-1">Option 1</Menu.Item>
          <Menu.Item index="4-2">Option 2</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  )
};
