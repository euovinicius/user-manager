'use server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

export async function createUser(formData: FormData) {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const password = String(formData.get('password') || '').trim()
  const cep = String(formData.get('cep') || '').trim()
  const city = String(formData.get('city') || '').trim()
  const state = String(formData.get('state') || '').trim()

  if (!name || !email || !password || !cep || !city || !state) {
    return { ok: false, message: 'Preencha todos os campos.' }
  }

  // ✅ Senha forte
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*]).{8,}$/
  if (!strongPassword.test(password)) {
    return {
      ok: false,
      message:
        'A senha deve ter no mínimo 8 caracteres, incluindo: letra maiúscula, minúscula, número e símbolo.'
    }
  }

  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) {
    return { ok: false, message: 'E-mail já cadastrado.' }
  }

  const hash = await bcrypt.hash(password, 12)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
      cep,
      city,
      state,
    },
  })

  return { ok: true }
}
