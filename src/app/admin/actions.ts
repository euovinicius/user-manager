'use server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } })
}

export async function updateUser(formData: FormData) {
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const cep = formData.get('cep') as string
  const city = formData.get('city') as string
  const state = formData.get('state') as string
  const role = formData.get('role') as string

  await prisma.user.update({
    where: { id },
    data: { name, email, cep, city, state, role },
  })
}
