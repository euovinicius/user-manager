'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [msg, setMsg] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMsg('')
    setEmailError(false)
    setPasswordError(false)

    const form = new FormData(e.currentTarget)
    const email = String(form.get('email') || '')
    const password = String(form.get('password') || '')

    // ✅ Verificação antes de enviar
    if (!email) {
      setEmailError(true)
      setMsg('Digite seu e-mail.')
      return
    }

    if (!password) {
      setPasswordError(true)
      setMsg('Digite sua senha.')
      return
    }

    // ✅ Envia para o NextAuth
    const res = await signIn('credentials', { email, password, redirect: false })

    if (res?.ok) {
      router.push('/app')
    } else {
      setMsg('E-mail ou senha incorretos.')
      setEmailError(true)
      setPasswordError(true)
    }
  }

  return (
    <div className="max-w-sm mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-center">Entrar</h1>

      <form onSubmit={onSubmit} className="space-y-3">

        <input
          name="email"
          placeholder="E-mail"
          type="email"
          className={`w-full border rounded px-3 py-2 ${emailError ? 'border-red-500' : ''}`}
        />

        <input
          name="password"
          placeholder="Senha"
          type="password"
          className={`w-full border rounded px-3 py-2 ${passwordError ? 'border-red-500' : ''}`}
        />

        <div className="flex gap-3">
          <button className="flex-1 px-4 py-2 rounded bg-blue-600 text-white text-center">
            Entrar
          </button>

          <button
            type="button"
            onClick={() => router.push('/signup')}
            className="flex-1 px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Criar conta
          </button>
        </div>
      </form>

      {msg && <p className="text-red-500 text-sm text-center">{msg}</p>}
    </div>
  )
}
