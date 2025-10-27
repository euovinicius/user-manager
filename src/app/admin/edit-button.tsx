'use client'
import { useState, useTransition } from 'react'
import { updateUser } from './actions'

export default function EditButton({ user }: { user: any }) {
  const [show, setShow] = useState(false)
  const [isPending, startTransition] = useTransition()

  async function handleCepChange(e: React.ChangeEvent<HTMLInputElement>) {
    const cep = e.target.value.replace(/\D/g, '')

    if (cep.length === 8) {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await res.json()

      if (!data.erro) {
        (document.querySelector(`#city-${user.id}`) as HTMLInputElement).value = data.localidade ?? '';
        (document.querySelector(`#state-${user.id}`) as HTMLInputElement).value = data.uf ?? '';
      }
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    startTransition(() => {
      const form = new FormData(e.currentTarget)
      updateUser(form)
      setShow(false)
    })
  }

  return (
    <>
      <button onClick={() => setShow(true)} className="text-blue-600 hover:underline">
        Editar
      </button>

      {show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Editar Usuário</h2>

            <form onSubmit={onSubmit} className="space-y-3">
              <input type="hidden" name="id" defaultValue={user.id} />

              <input name="name" defaultValue={user.name} className="w-full border rounded px-3 py-2" />
              <input name="email" defaultValue={user.email} className="w-full border rounded px-3 py-2" />

              <input
                name="cep"
                defaultValue={user.cep}
                className="w-full border rounded px-3 py-2"
                onChange={handleCepChange}
              />

              <input
                id={`city-${user.id}`}
                name="city"
                defaultValue={user.city}
                className="w-full border rounded px-3 py-2"
              />

              <input
                id={`state-${user.id}`}
                name="state"
                defaultValue={user.state}
                className="w-full border rounded px-3 py-2"
              />

              <select name="role" defaultValue={user.role} className="w-full border rounded px-3 py-2">
                <option value="user">Usuário</option>
                <option value="admin">Administrador</option>
              </select>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShow(false)} className="px-4 py-2 border rounded">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded" disabled={isPending}>
                  {isPending ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
