import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MaskField } from '../../components/MaskField';

describe('MaskField', () => {
  it('renders without crashing', () => {
    render(<MaskField mask="999-999" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeTruthy();
  });

  it('sets placeholder based on mask pattern', () => {
    render(<MaskField mask="999-999" data-testid="mask-input" />);
    const input = screen.getByTestId('mask-input') as HTMLInputElement;
    expect(input.placeholder).toBe('___-___');
  });

  it('accepts initial value', () => {
    render(<MaskField mask="999-999" value="123456" data-testid="mask-input" />);
    const input = screen.getByTestId('mask-input') as HTMLInputElement;
    expect(input.value).toBe('123456');
  });

  it('updates value when prop changes', () => {
    const { rerender } = render(<MaskField mask="999-999" value="123" data-testid="mask-input" />);
    const input = screen.getByTestId('mask-input') as HTMLInputElement;
    expect(input.value).toBe('123');

    rerender(<MaskField mask="999-999" value="456" data-testid="mask-input" />);
    expect(input.value).toBe('456');
  });

  describe('processMaskedInput function', () => {
    it('formats digit input correctly with 9 mask character', () => {
      const handleChange = jest.fn();
      render(<MaskField mask="999-999" onChange={handleChange} data-testid="mask-input" />);
      const input = screen.getByTestId('mask-input');

      fireEvent.change(input, { target: { value: '123456' } });
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: '123-456' }),
        })
      );
    });

    it('formats letter input correctly with a mask character', () => {
      const handleChange = jest.fn();
      render(<MaskField mask="aaa-aaa" onChange={handleChange} data-testid="mask-input" />);
      const input = screen.getByTestId('mask-input');

      fireEvent.change(input, { target: { value: 'abcdef' } });
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: 'abc-def' }),
        })
      );
    });

    it('formats alphanumeric input correctly with * mask character', () => {
      const handleChange = jest.fn();
      render(<MaskField mask="***-***" onChange={handleChange} data-testid="mask-input" />);
      const input = screen.getByTestId('mask-input');

      fireEvent.change(input, { target: { value: 'abc123' } });
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: 'abc-123' }),
        })
      );
    });

    it('ignores invalid characters based on mask pattern', () => {
      const handleChange = jest.fn();
      render(<MaskField mask="999-999" onChange={handleChange} data-testid="mask-input" />);
      const input = screen.getByTestId('mask-input');

      fireEvent.change(input, { target: { value: '1a2b3c4d5e6f' } });
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: '123-456' }),
        })
      );
    });

    it('handles fixed characters in the mask', () => {
      const handleChange = jest.fn();
      render(<MaskField mask="(999) 999-9999" onChange={handleChange} data-testid="mask-input" />);
      const input = screen.getByTestId('mask-input');

      fireEvent.change(input, { target: { value: '1234567890' } });
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: '(123) 456-7890' }),
        })
      );
    });

    it('returns raw input when no mask is provided', () => {
      const handleChange = jest.fn();
      render(<MaskField mask="" onChange={handleChange} data-testid="mask-input" />);
      const input = screen.getByTestId('mask-input');

      fireEvent.change(input, { target: { value: 'abc123' } });
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: 'abc123' }),
        })
      );
    });
  });

  describe('event handling', () => {
    it('calls onChange when the input changes', () => {
      const handleChange = jest.fn();
      render(<MaskField mask="999-999" onChange={handleChange} data-testid="mask-input" />);
      const input = screen.getByTestId('mask-input');

      fireEvent.change(input, { target: { value: '123' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('calls onFocus when the input is focused', () => {
      const handleFocus = jest.fn();
      render(<MaskField mask="999-999" onFocus={handleFocus} data-testid="mask-input" />);
      const input = screen.getByTestId('mask-input');

      fireEvent.focus(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur when the input loses focus', () => {
      const handleBlur = jest.fn();
      render(<MaskField mask="999-999" onBlur={handleBlur} data-testid="mask-input" />);
      const input = screen.getByTestId('mask-input');

      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('prop passing', () => {
    it('passes through other props to the input element', () => {
      render(
        <MaskField mask="999-999" disabled className="custom-input" data-testid="mask-input" />
      );
      const input = screen.getByTestId('mask-input');

      expect(input.hasAttribute('disabled')).toBe(true);
      expect(input.className).toBe('custom-input');
    });

    it('forwards ref to the input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<MaskField mask="999-999" ref={ref} data-testid="mask-input" />);
      const input = screen.getByTestId('mask-input');

      expect(ref.current).toBe(input);
    });
  });

  it('handles complex phone number mask', () => {
    const handleChange = jest.fn();
    render(<MaskField mask="+9 (999) 999-9999" onChange={handleChange} data-testid="mask-input" />);
    const input = screen.getByTestId('mask-input');

    fireEvent.change(input, { target: { value: '11234567890' } });
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: '+1 (123) 456-7890' }),
      })
    );
  });

  it('handles partial input correctly', () => {
    const handleChange = jest.fn();
    render(<MaskField mask="999-999-9999" onChange={handleChange} data-testid="mask-input" />);
    const input = screen.getByTestId('mask-input');

    fireEvent.change(input, { target: { value: '123' } });
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: '123' }),
      })
    );
  });
});
