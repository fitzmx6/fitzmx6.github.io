import React from 'react';
import { render } from '@testing-library/react';
import RobotIcon from './robot-icon';

describe('RobotIcon', () => {
  it('renders without crashing', () => {
    const { container } = render(<RobotIcon />);
    expect(container).toBeInTheDocument();
  });

  it('renders an SVG element', () => {
    const { container } = render(<RobotIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('has correct SVG dimensions', () => {
    const { container } = render(<RobotIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '256');
    expect(svg).toHaveAttribute('height', '256');
  });

  it('has correct viewBox', () => {
    const { container } = render(<RobotIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 256 256');
  });

  it('contains defs with gradient definitions', () => {
    const { container } = render(<RobotIcon />);
    const defs = container.querySelector('defs');
    expect(defs).toBeInTheDocument();
  });

  it('contains linearGradient for robot color', () => {
    const { container } = render(<RobotIcon />);
    const gradient = container.querySelector('#g1');
    expect(gradient).toBeInTheDocument();
  });

  it('renders robot head structure', () => {
    const { container } = render(<RobotIcon />);
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThan(0);
  });

  it('renders robot eyes', () => {
    const { container } = render(<RobotIcon />);
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBeGreaterThan(0);
  });
});
