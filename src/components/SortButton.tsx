'use client'
import { ArrowUpDown } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function SortButton() {
  const [sortOption, setSortOption] = useState('')

  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  function handleChangeSort(value: string) {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set('sort', value)
    } else {
      params.delete('sort')
    }

    replace(`${pathName}?${params.toString()}`)
    setSortOption(value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2">
        <ArrowUpDown size={16} />
        Valor
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ordenar</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={sortOption}
          onValueChange={handleChangeSort}
        >
          <DropdownMenuRadioItem value="asc">Crescente</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="desc">
            Decrescente
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
