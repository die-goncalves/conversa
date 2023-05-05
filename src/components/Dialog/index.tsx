import * as DialogPrimitive from '@radix-ui/react-dialog'
import { forwardRef } from 'react'
import {
  StyledDialogPrimitiveClose,
  StyledDialogPrimitiveContent,
  StyledDialogPrimitiveOverlay
} from './styles'

const DialogTrigger = forwardRef<
  HTMLButtonElement,
  DialogPrimitive.DialogTriggerProps
>(({ children, asChild, ...props }, forwardedRef) => (
  <DialogPrimitive.Trigger asChild {...props} ref={forwardedRef}>
    {children}
  </DialogPrimitive.Trigger>
))
DialogTrigger.displayName = 'Dialog.Trigger'

const DialogTitle = forwardRef<
  HTMLHeadingElement,
  DialogPrimitive.DialogTitleProps
>(({ children, asChild, ...props }, forwardedRef) => (
  <DialogPrimitive.Title {...props} ref={forwardedRef}>
    {children}
  </DialogPrimitive.Title>
))
DialogTitle.displayName = 'Dialog.Title'

const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogPrimitive.DialogDescriptionProps
>(({ children, asChild, ...props }, forwardedRef) => (
  <DialogPrimitive.Description asChild {...props} ref={forwardedRef}>
    {children}
  </DialogPrimitive.Description>
))
DialogDescription.displayName = 'Dialog.Description'

const DialogClose = forwardRef<
  HTMLButtonElement,
  DialogPrimitive.DialogCloseProps
>(({ children, asChild, ...props }, forwardedRef) => (
  <StyledDialogPrimitiveClose aria-label="Fechar" {...props} ref={forwardedRef}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 96 960 960"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
    </svg>
  </StyledDialogPrimitiveClose>
))
DialogClose.displayName = 'Dialog.Close'

const DialogContent = forwardRef<
  HTMLDivElement,
  DialogPrimitive.DialogContentProps
>(({ children, ...props }, forwardedRef) => (
  <DialogPrimitive.Portal>
    <StyledDialogPrimitiveOverlay />
    <StyledDialogPrimitiveContent {...props} ref={forwardedRef}>
      {children}
    </StyledDialogPrimitiveContent>
  </DialogPrimitive.Portal>
))
DialogContent.displayName = 'Dialog.Content'

export const Dialog = {
  Root: DialogPrimitive.Root,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose
}
