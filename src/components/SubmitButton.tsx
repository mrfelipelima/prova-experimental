'use client'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { DialogClose } from './ui/dialog'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <DialogClose asChild>
      <Button type="submit" aria-disabled={pending}>
        Cadastrar
      </Button>
    </DialogClose>
  )
}
