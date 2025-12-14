import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Menu, { MenuProps } from '../menu';
import '@testing-library/jest-dom';

const defaultProps: MenuProps = {
  mode: 'vertical',
  defaultIndex: '1'
};

describe('test Menu component', () => {
  it('should render the correct default Menu', () => {
    const wrapper = render(
      <Menu {...defaultProps}>
        <Menu.Item index="1">Item 1</Menu.Item>
        <Menu.Item index="2">Item 2</Menu.Item>
      </Menu>
    );
    const testNode = wrapper.container.querySelector('.menu');
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass('menu-vertical');
  });

  it('should render items correctly', () => {
    const wrapper = render(
      <Menu {...defaultProps}>
        <Menu.Item index="1">Item 1</Menu.Item>
        <Menu.Item index="2">Item 2</Menu.Item>
      </Menu>
    );
    const items = wrapper.container.querySelectorAll('.menu-item');
    expect(items.length).toBe(2);
    expect(items[0]).toHaveTextContent('Item 1');
    expect(items[1]).toHaveTextContent('Item 2');
  });

  it('should render horizontal mode correctly', () => {
    const wrapper = render(
      <Menu mode="horizontal">
        <Menu.Item index="1">Item 1</Menu.Item>
      </Menu>
    );
    const testNode = wrapper.container.querySelector('.menu');
    expect(testNode).toHaveClass('menu-horizontal');
  });

  it('should render dark theme correctly', () => {
    const wrapper = render(
      <Menu theme="dark">
        <Menu.Item index="1">Item 1</Menu.Item>
      </Menu>
    );
    const testNode = wrapper.container.querySelector('.menu');
    expect(testNode).toHaveClass('menu-dark');
  });

  it('should handle item selection', () => {
    const onSelect = vi.fn();
    const wrapper = render(
      <Menu onSelect={onSelect}>
        <Menu.Item index="1">Item 1</Menu.Item>
        <Menu.Item index="2">Item 2</Menu.Item>
      </Menu>
    );
    const item = wrapper.container.querySelector('.menu-item');
    fireEvent.click(item!);
    expect(onSelect).toHaveBeenCalledWith('1');
  });

  it('should render submenu correctly', () => {
    const wrapper = render(
      <Menu>
        <Menu.SubMenu index="1" title="Sub Menu">
          <Menu.Item index="1-1">Sub Item 1</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
    const submenu = wrapper.container.querySelector('.menu-submenu');
    expect(submenu).toBeInTheDocument();
    expect(submenu).toHaveTextContent('Sub Menu');
  });

  it('should handle submenu open/close', () => {
    const onOpenChange = vi.fn();
    const wrapper = render(
      <Menu onOpenChange={onOpenChange}>
        <Menu.SubMenu index="1" title="Sub Menu">
          <Menu.Item index="1-1">Sub Item 1</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
    const submenuTitle = wrapper.container.querySelector('.submenu-title');
    fireEvent.click(submenuTitle!);
    expect(onOpenChange).toHaveBeenCalled();
  });

  it('should render disabled items correctly', () => {
    const wrapper = render(
      <Menu>
        <Menu.Item index="1" disabled>Disabled Item</Menu.Item>
      </Menu>
    );
    const item = wrapper.container.querySelector('.menu-item');
    expect(item).toHaveClass('is-disabled');
  });

  it('should render menu groups correctly', () => {
    const wrapper = render(
      <Menu>
        <Menu.Group title="Group 1">
          <Menu.Item index="1">Item 1</Menu.Item>
        </Menu.Group>
      </Menu>
    );
    const group = wrapper.container.querySelector('.menu-group');
    expect(group).toBeInTheDocument();
    expect(group).toHaveTextContent('Group 1');
  });

  it('should apply correct indentation for nested items', () => {
    const wrapper = render(
      <Menu>
        <Menu.SubMenu index="1" title="Sub Menu">
          <Menu.Item index="1-1">Sub Item 1</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
    const subItem = wrapper.container.querySelector('.menu-item');
    expect(subItem).toHaveStyle('padding-left: 48px'); // level 1: 24 + 24
  });

  it('should handle selected state correctly', () => {
    const wrapper = render(
      <Menu defaultIndex="1">
        <Menu.Item index="1">Item 1</Menu.Item>
        <Menu.Item index="2">Item 2</Menu.Item>
      </Menu>
    );
    const selectedItem = wrapper.container.querySelector('.menu-item');
    expect(selectedItem).toHaveClass('is-selected');
  });

  it('should prevent event bubbling in submenu', () => {
    const onSelect = vi.fn();
    const wrapper = render(
      <Menu onSelect={onSelect}>
        <Menu.SubMenu index="1" title="Sub Menu">
          <Menu.Item index="1-1">Sub Item 1</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
    const submenuTitle = wrapper.container.querySelector('.submenu-title');
    fireEvent.click(submenuTitle!);
    expect(onSelect).not.toHaveBeenCalled();
  });
});
