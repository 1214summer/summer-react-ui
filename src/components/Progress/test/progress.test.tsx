import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Progress, { ProgressProps } from '../progress';
import '@testing-library/jest-dom';

const defaultProps: ProgressProps = {
  percent: 30
};

describe('test Progress component', () => {
  it('should render the correct default Progress', () => {
    const wrapper = render(<Progress {...defaultProps} />);
    const testNode = wrapper.container.querySelector('.progress');
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass('progress-line');
    expect(testNode).toHaveClass('progress-default');
  });

  it('should render correct percent value', () => {
    const wrapper = render(<Progress percent={50} />);
    const testNode = wrapper.container.querySelector('.progress-text');
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveTextContent('50%');
  });

  it('should render different sizes', () => {
    const wrapper = render(<Progress size="small" />);
    const testNode = wrapper.container.querySelector('.progress');
    expect(testNode).toHaveClass('progress-small');
  });

  it('should render different status', () => {
    const wrapper = render(<Progress status="success" />);
    const testNode = wrapper.container.querySelector('.progress');
    expect(testNode).toHaveClass('progress-status-success');
  });

  it('should render circle type progress', () => {
    const wrapper = render(<Progress type="circle" percent={75} />);
    const testNode = wrapper.container.querySelector('.progress-circle');
    expect(testNode).toBeInTheDocument();
    expect(wrapper.container.querySelector('.progress')).toHaveClass('progress-circle');
  });

  it('should render with custom stroke color', () => {
    const wrapper = render(<Progress strokeColor="#52c41a" />);
    const testNode = wrapper.container.querySelector('.progress-bg');
    expect(testNode).toHaveStyle('background-color: #52c41a');
  });

  it('should render with success progress', () => {
    const wrapper = render(
      <Progress 
        percent={80}
        success={{ percent: 30 }}
      />
    );
    const successNode = wrapper.container.querySelector('.progress-success-bg');
    expect(successNode).toBeInTheDocument();
    expect(successNode).toHaveStyle('width: 30%');
  });

  it('should render with custom format', () => {
    const wrapper = render(
      <Progress 
        percent={50}
        format={(percent) => `${percent} Days`}
      />
    );
    const testNode = wrapper.container.querySelector('.progress-text');
    expect(testNode).toHaveTextContent('50 Days');
  });

  it('should not show info when showInfo is false', () => {
    const wrapper = render(<Progress showInfo={false} />);
    const testNode = wrapper.container.querySelector('.progress-text');
    expect(testNode).not.toBeInTheDocument();
  });

  it('should render exception status icon', () => {
    const wrapper = render(<Progress status="exception" />);
    const testNode = wrapper.container.querySelector('.progress-text');
    expect(testNode).toHaveTextContent('✕');
  });

  it('should render success status icon', () => {
    const wrapper = render(<Progress status="success" />);
    const testNode = wrapper.container.querySelector('.progress-text');
    expect(testNode).toHaveTextContent('✓');
  });
});
