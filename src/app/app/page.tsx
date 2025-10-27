import { auth } from '@/auth'
import LogoutButton from '@/components/logout-button'

function formatName(name: string) {
  if (!name) return ''
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

export default async function AppHome() {
  const session = await auth()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Área do usuário</h1>

      {!session ? (
        <p>
          Você não está logado.{" "}
          <a className="text-blue-600 underline" href="/login">Ir para login</a>
        </p>
      ) : (
        <div className="mt-6 p-4 border rounded-md bg-white shadow-sm max-w-md space-y-4">

          {/* HEADER */}
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-semibold">
              {formatName(session.user.name).charAt(0)}
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Bem-vindo, {formatName(session.user.name)}
              </h2>

              <p className="text-gray-600 text-sm">{session.user.email}</p>

              <span className="text-xs px-2 py-1 inline-block rounded bg-gray-200 text-gray-700">
                {session.user.role}
              </span>
            </div>
          </div>

          {/* ENDEREÇO */}
          <div className="text-sm text-gray-700 space-y-1 border-t pt-3">
            <p><span className="font-medium">CEP:</span> {session.user.cep ?? "Não informado"}</p>
            <p><span className="font-medium">Cidade:</span> {session.user.city ?? "Não informado"}</p>
            <p><span className="font-medium">UF:</span> {session.user.state ?? "Não informado"}</p>
          </div>

          {/* BOTÕES */}
          <div className="flex justify-between items-center pt-4">

            {session.user.role === "admin" && (
              <a
                href="/admin"
                className="px-3 py-2 text-sm bg-gray-800 text-white rounded hover:bg-gray-900 transition"
              >
                Painel Admin
              </a>
            )}

            <LogoutButton />
          </div>

        </div>
      )}
    </div>
  )
}
