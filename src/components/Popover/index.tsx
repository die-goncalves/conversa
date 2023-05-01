import * as PopoverPrimitive from '@radix-ui/react-popover'
import { type ReactNode, forwardRef } from 'react'
import { StyledPopoverArrow, StyledPopoverContent } from './styles'

const PopoverContent = forwardRef<
  HTMLDivElement,
  PopoverPrimitive.PopoverContentProps
>(({ children, ...props }, forwardedRef) => (
  <PopoverPrimitive.Portal>
    <StyledPopoverContent sideOffset={8} {...props} ref={forwardedRef}>
      {children}
      <StyledPopoverArrow />
    </StyledPopoverContent>
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = 'Popover.Content'

export const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  PopoverPrimitive.PopoverTriggerProps
>(({ children, ...props }, forwardedRef) => (
  <PopoverPrimitive.Trigger asChild {...props} ref={forwardedRef}>
    {children}
  </PopoverPrimitive.Trigger>
))
PopoverTrigger.displayName = 'Popover.Trigger'

interface IPopover {
  trigger: ReactNode
  content: ReactNode
}
export function PopoverComponent({ trigger, content }: IPopover): JSX.Element {
  return (
    <PopoverPrimitive.Root>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverPrimitive.Portal>
        <PopoverContent>{content}</PopoverContent>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export const Popover = {
  Root: PopoverPrimitive.Root,
  Trigger: PopoverTrigger,
  Content: PopoverContent
}
