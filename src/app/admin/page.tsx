import { auth } from '@/auth'
import UsersTable from './users-table'

export default async function AdminPage() {
  const session = await auth()

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow text-center space-y-2">
          <p className="text-gray-700">Você precisa estar logado.</p>
          <a className="text-blue-600 underline" href="/login">Entrar</a>
        </div>
      </div>
    )
  }

  if (session.user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow text-center space-y-2">
          <p className="text-gray-700">Acesso negado. Você não é administrador.</p>
          <a className="text-blue-600 underline" href="/app">Voltar</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Título */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Painel Administrativo</h1>
          <span className="px-3 py-1 text-sm rounded bg-blue-600 text-white shadow">
            Admin
          </span>
        </div>

        {/* Card Tabela */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Gerenciar Usuários</h2>
          <UsersTable />
        </div>
      </div>

    </div>
  )
}
