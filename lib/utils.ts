import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(number: number) {
  if (number >= 1_000_000_000_000) {
    return `${parseFloat((number / 1_000_000_000_000).toFixed(2))}T`
  } else if (number >= 1_000_000_000) {
    return `${parseFloat((number / 1_000_000_000).toFixed(2))}M`
  } else if (number >= 1_000_000) {
    return `${parseFloat((number / 1_000_000).toFixed(2))}jt` // Maksimal 2 angka di belakang koma
  } else if (number >= 1_000) {
    return `${parseFloat((number / 1_000).toFixed(1))}k` // Maksimal 1 angka di belakang koma
  }
  return `${number.toLocaleString('id-ID')}` // Format angka dengan pemisah ribuan
}

export function formatRupiah(number: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number)
}
