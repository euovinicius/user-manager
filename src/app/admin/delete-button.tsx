'use client'
import { deleteUser } from './actions'
import { useTransition } from 'react'

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      onClick={() => startTransition(() => deleteUser(id))}
      className="text-red-600 hover:underline"
      disabled={isPending}
    >
      {isPending ? '...' : 'Excluir'}
    </button>
  )
}
