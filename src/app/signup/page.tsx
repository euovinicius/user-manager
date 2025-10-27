'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createUser } from './actions'

export default function SignUpPage() {
  const router = useRouter()
  const [msg, setMsg] = useState('')

  async function handleCepChange(e: React.ChangeEvent<HTMLInputElement>) {
  const cep = e.target.value.replace(/\D/g, '')

  if (cep.length === 8) {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await res.json()

    if (!data.erro) {
      const cityInput = document.querySelector('input[name="city"]') as HTMLInputElement | null
      const stateInput = document.querySelector('input[name="state"]') as HTMLInputElement | null

      if (cityInput) cityInput.value = data.localidade ?? ''
      if (stateInput) stateInput.value = data.uf ?? ''
    }
  }
}

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const res = await createUser(form)
    setMsg(res.ok ? 'Usuário criado com sucesso!' : (res.message ?? ''))
    if (res.ok) {
      setTimeout(() => router.push('/login'), 1000)
    }
  }

  return (
    <div className="max-w-sm mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-center">Criar conta</h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <input name="name" placeholder="Nome" className="w-full border rounded px-3 py-2" />
        <input name="email" placeholder="E-mail" type="email" className="w-full border rounded px-3 py-2" />
        <input name="password" placeholder="Senha" type="password" className="w-full border rounded px-3 py-2" />
        <input name="cep" placeholder="CEP" className="w-full border rounded px-3 py-2" onChange={handleCepChange} />
        <input name="city" placeholder="Cidade" className="w-full border rounded px-3 py-2" />
        <input name="state" placeholder="UF" className="w-full border rounded px-3 py-2" />

        <button className="w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
          Criar conta
        </button>
      </form>

      {msg && <p className="text-sm text-center mt-2">{msg}</p>}

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Já tem uma conta?{' '}
          <button
            onClick={() => router.push('/login')}
            className="text-blue-600 hover:underline font-medium"
          >
            Entrar
          </button>
        </p>
      </div>
    </div>
  )
}
