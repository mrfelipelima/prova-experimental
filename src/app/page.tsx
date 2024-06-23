import { NewProductDialog } from '@/components/NewProductDialog'
import { SortButton } from '@/components/SortButton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { prisma } from '@/lib/prisma'
import { priceFormatter } from '@/lib/utils'

export const revalidate = 60

type HomePageProps = {
  searchParams: {
    sort?: 'asc' | 'desc'
  }
}

export default async function Home({ searchParams }: HomePageProps) {
  const products = await prisma.product.findMany({
    orderBy: {
      value: searchParams?.sort,
    },
  })

  return (
    <main className="w-screen min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-[1500px] md:border rounded flex-1 p-8 md:mx-8 my-4">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Cadastro de produtos</h1>
          <NewProductDialog />
        </div>
        <div className="max-h-[600px] min-h-[600px] my-2 overflow-y-scroll">
          <Table className="mt-6">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>
                  <SortButton />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length <= 0 ? (
                <TableRow>
                  <TableCell>Nenhum produto cadastrado.</TableCell>
                </TableRow>
              ) : (
                products.map((product) => {
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="flex flex-col gap-1">
                        <span className="font-bold">{product.name}</span>
                        <span className="text-muted-foreground">
                          {product.description}
                        </span>
                      </TableCell>
                      <TableCell>
                        {priceFormatter.format(product.value / 100)}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  )
}
