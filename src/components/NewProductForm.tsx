import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { SubmitButton } from './SubmitButton'
import { Button } from './ui/button'
import { DialogClose } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'

const newProductFormSchema = z.object({
  name: z
    .string()
    .min(1, 'O nome do produto deve possuir pelo menos 1 caractere.'),
  description: z.string(),
  value: z.string().transform((value) => {
    return Number(value.replace('.', '').replace(',', '').replace(/\D/g, ''))
  }),
  available: z.coerce.boolean(),
})

export default function NewProductForm() {
  async function handleCreateNewProduct(data: FormData) {
    'use server'
    const { name, description, value, available } = newProductFormSchema.parse({
      name: data.get('name'),
      description: data.get('description'),
      value: data.get('value'),
      available: data.get('available'),
    })

    await prisma.product.create({
      data: {
        name,
        description,
        value,
        available,
      },
    })

    revalidatePath('/')
  }

  return (
    <form
      action={handleCreateNewProduct}
      className="flex flex-col justify-center gap-4"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" name="name" placeholder="Insira o nome do produto" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          name="description"
          placeholder="Insira a descrição do produto"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="value">Valor</Label>
        <Input id="value" name="value" placeholder="0,00" type="number" />
      </div>

      <div className="flex items-center gap-3">
        <Label htmlFor="available">Disponível para venda</Label>
        <Switch id="available" name="available" />
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <DialogClose asChild>
          <Button variant="ghost">Cancelar</Button>
        </DialogClose>
        <SubmitButton />
      </div>
    </form>
  )
}
