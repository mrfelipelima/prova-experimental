import { PlusCircle } from 'lucide-react'
import NewProductForm from './NewProductForm'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

export function NewProductDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          <PlusCircle size={16} />
          Adicionar novo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar novo produto</DialogTitle>
          <DialogDescription>
            Insira as informações abaixo para adicionar um novo produto.
          </DialogDescription>
        </DialogHeader>
        <NewProductForm />
      </DialogContent>
    </Dialog>
  )
}
