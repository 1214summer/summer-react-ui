import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Card, { CardProps } from '../card';
import '@testing-library/jest-dom';

const defaultProps: CardProps = {
  title: 'Test Card',
  children: 'Test Content'
};

describe('test Card component', () => {
  it('should render the correct default Card', () => {
    const wrapper = render(<Card {...defaultProps} />);
    const cardElement = wrapper.container.querySelector('.card');
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveClass('card-bordered');
  });

  it('should render title correctly', () => {
    const wrapper = render(<Card {...defaultProps} />);
    const titleElement = wrapper.container.querySelector('.card-head-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Test Card');
  });

  it('should render children correctly', () => {
    const wrapper = render(<Card {...defaultProps} />);
    const contentElement = wrapper.container.querySelector('.card-content');
    expect(contentElement).toBeInTheDocument();
    expect(contentElement).toHaveTextContent('Test Content');
  });

  it('should render without border when bordered is false', () => {
    const wrapper = render(<Card bordered={false} />);
    const cardElement = wrapper.container.querySelector('.card');
    expect(cardElement).not.toHaveClass('card-bordered');
  });

  it('should apply hoverable class when hoverable is true', () => {
    const wrapper = render(<Card hoverable={true} />);
    const cardElement = wrapper.container.querySelector('.card');
    expect(cardElement).toHaveClass('card-hoverable');
  });

  it('should render extra content correctly', () => {
    const wrapper = render(
      <Card 
        title="Test Card" 
        extra={<a href="#">More</a>}
      />
    );
    const extraElement = wrapper.container.querySelector('.card-head-extra');
    expect(extraElement).toBeInTheDocument();
    expect(extraElement).toContainHTML('a');
  });

  it('should render cover image correctly', () => {
    const wrapper = render(
      <Card 
        cover={
          <img 
            alt="test" 
            src="test.jpg" 
          />
        }
      />
    );
    const coverElement = wrapper.container.querySelector('.card-cover');
    expect(coverElement).toBeInTheDocument();
    expect(coverElement?.querySelector('img')).toBeInTheDocument();
  });

  it('should render actions correctly', () => {
    const actions = [
      <span key="1">Action 1</span>,
      <span key="2">Action 2</span>
    ];
    const wrapper = render(<Card actions={actions} />);
    const actionsElement = wrapper.container.querySelector('.card-actions');
    expect(actionsElement).toBeInTheDocument();
    expect(actionsElement?.children.length).toBe(2);
  });

  it('should apply custom className correctly', () => {
    const wrapper = render(<Card className="custom-class" />);
    const cardElement = wrapper.container.querySelector('.card');
    expect(cardElement).toHaveClass('custom-class');
  });

  it('should apply custom style correctly', () => {
    const customStyle = { backgroundColor: 'red' };
    const wrapper = render(<Card style={customStyle} />);
    const cardElement = wrapper.container.querySelector('.card');
    expect(cardElement).toHaveStyle('background-color: red');
  });

  it('should handle hover effect', () => {
    const wrapper = render(<Card hoverable />);
    const cardElement = wrapper.container.querySelector('.card');
    fireEvent.mouseEnter(cardElement!);
    expect(cardElement).toHaveClass('card-hoverable');
  });

  it('should render simple card without title', () => {
    const wrapper = render(
      <Card>
        <p>Simple content</p>
      </Card>
    );
    const titleElement = wrapper.container.querySelector('.card-head-title');
    expect(titleElement).not.toBeInTheDocument();
    const contentElement = wrapper.container.querySelector('.card-content');
    expect(contentElement).toBeInTheDocument();
  });

  it('should render card with only title', () => {
    const wrapper = render(<Card title="Only Title" />);
    const titleElement = wrapper.container.querySelector('.card-head-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Only Title');
  });
});
