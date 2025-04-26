import { prisma } from '@/lib/prisma/init'

interface UserData {
  username: string
  email: string
  image: string
}

interface ResponseResult {
  status: boolean
  message: string
  data?: any
}

export const loginWithGoogle = async (userData: UserData): Promise<ResponseResult> => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email }
    })

    if (existingUser) {
      // Kalau sudah ada, tidak perlu update, langsung return saja
      return {
        status: true,
        message: 'Login Google berhasil (user already exists)',
        data: existingUser
      }
    } else {
      const newUser = await prisma.user.create({
        data: {
          name: userData.username,
          email: userData.email,
          image: userData.image
        }
      })

      await prisma.setting.create({
        data: {
          userId: newUser.id,
          currency: 'IDR',
          language: 'id'
        }
      })

      return {
        status: true,
        message: 'Login Google berhasil dan setting dibuat',
        data: newUser
      }
    }
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export const updateUser = async (userData: any): Promise<ResponseResult> => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email }
    })

    if (!existingUser) {
      return {
        status: false,
        message: 'User tidak ditemukan'
      }
    }

    const updatedUser = await prisma.user.update({
      where: { email: userData.email },
      data: {
        name: userData.name
      }
    })

    return {
      status: true,
      message: 'User berhasil diupdate',
      data: updatedUser
    }
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
