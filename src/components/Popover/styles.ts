import * as PopoverPrimitive from '@radix-ui/react-popover'
import styled from 'styled-components'

export const StyledPopoverContent = styled(PopoverPrimitive.Content)`
  background-color: var(--gray-700);
  border-radius: 4px;
  border: 2px solid var(--gray-700);
  padding: 0.5rem;
  box-shadow: var(--shadow-md);
  z-index: 5;

  max-height: 400px;
  max-width: 320px;

  transition: border-color 150ms linear;
  outline: 0;
  &:focus-visible {
    border-color: var(--violet-300);

    polygon {
      fill: var(--violet-300);
    }
  }

  &[data-state='open'] {
    &[data-side='top'] {
      animation-name: slideDownAndFade;
    }
    &[data-side='right'] {
      animation-name: slideLeftAndFade;
    }
    &[data-side='bottom'] {
      animation-name: slideUpAndFade;
    }
    &[data-side='left'] {
      animation-name: slideRightAndFade;
    }
  }

  overflow: auto;
  scrollbar-gutter: auto;

  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideRightAndFade {
    from {
      opacity: 0;
      transform: translateX(-2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideDownAndFade {
    from {
      opacity: 0;
      transform: translateY(-2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideLeftAndFade {
    from {
      opacity: 0;
      transform: translateX(2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`

export const StyledPopoverArrow = styled(PopoverPrimitive.Arrow)`
  fill: var(--gray-700);
`
