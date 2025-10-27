import { PrismaClient } from '@prisma/client'
import DeleteButton from './delete-button'
import EditButton from './edit-button'

const prisma = new PrismaClient()

export default async function UsersTable() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b">
          <th className="p-2">Nome</th>
          <th className="p-2">E-mail</th>
          <th className="p-2">Cidade</th>
          <th className="p-2">UF</th>
          <th className="p-2">Role</th>
          <th className="p-2 w-32 text-right">Ações</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr key={u.id} className="border-b hover:bg-gray-50">
            <td className="p-2">{u.name}</td>
            <td className="p-2">{u.email}</td>
            <td className="p-2">{u.city}</td>
            <td className="p-2">{u.state}</td>
            <td className="p-2 uppercase">{u.role}</td>
            <td className="p-2 flex gap-3 justify-end">
              <EditButton user={u} />
              <DeleteButton id={u.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
