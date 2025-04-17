'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconPlus } from '@tabler/icons-react'
import { format } from 'date-fns'
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import data from '@/constants/transaction.json'
import { cn } from '@/lib/utils'

import { Calendar } from './ui/calendar'
import { ScrollArea } from './ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'

const FormSchema = z.object({
  // username: z.string().min(2, {
  //   message: 'Username must be at least 2 characters.'
  // }),
  date: z.date(),
  type: z.string().min(1, 'Wajib diisi😤'),
  category: z.string().min(1, 'Wajib diisi😤'),
  paymentMethod: z.string().min(1, 'Wajib diisi😤'),
  amount: z.number().min(1, 'Wajib diisi😤'),
  description: z.string().min(1, 'Wajib diisi😤')
})

const categories = [
  { label: 'Gaji', value: 'Gaji' },
  { label: 'Lainnya', value: 'Lainnya' },
  { label: 'Belanja', value: 'Belanja' },
  { label: 'Jajan', value: 'Jajan' },
  { label: 'Transportasi', value: 'Transportasi' },
  { label: 'Hiburan', value: 'Hiburan' },
  { label: 'Bonus', value: 'Bonus' },
  { label: 'Sampingan', value: 'Sampingan' }
]

const paymentMethod = [
  { label: 'Mandiri', value: 'Mandiri' },
  { label: 'BNI', value: 'BNI' },
  { label: 'BCA', value: 'BCA' },
  { label: 'ShopeePay', value: 'ShopeePay' },
  { label: 'OVO', value: 'OVO' },
  { label: 'Gopay', value: 'Gopay' },
  { label: 'Cash', value: 'Cash' }
  // { label: 'Lainya', value: 'Lainya' }
]

export function TransactionForm() {
  // const categories = [...new Set(data.map((v: any) => v.category))].map(item => ({
  //   label: item,
  //   value: item
  // }))

  // const paymentMethod = [...new Set(data.map((v: any) => v.paymentMethod))].map(item => ({
  //   label: item,
  //   value: item
  // }))

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date(),
      type: '',
      category: '',
      paymentMethod: '',
      amount: 0,
      description: ''
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Tambah Transaksi <IconPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[575px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Buat Transaksi</DialogTitle>
              {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
            </DialogHeader>
            <ScrollArea className="h-[300px] w-full sm:aspect-video">
              {/* <p>{JSON.stringify(paymentMethod)}</p> */}

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center justify-center">
                      <FormLabel>Tanggal</FormLabel>
                      <span className="text-muted-foreground text-sm">
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      </span>

                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex w-full flex-col justify-between gap-4 sm:flex-row">
                  {/* type */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Tipe</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih tipe transaksi." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Income">Pemasukan</SelectItem>
                            <SelectItem value="Expense">Pengeluaran</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Kategori</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih kategori transaksi." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map(item => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                            {/* <SelectItem value="Expense">Pengeluaran</SelectItem> */}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex w-full flex-col justify-between gap-4 sm:flex-row">
                  {/* payment */}
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Pembayaran</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih metode pembayaran." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {paymentMethod.map(item => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                            {/* <SelectItem value="Expense">Pengeluaran</SelectItem> */}
                          </SelectContent>
                        </Select>
                        {/* <span className="w-full text-center">or</span> */}
                        <Input
                          {...field}
                          type="text"
                          placeholder="Method lainya"
                          onChange={e => field.onChange(e.target.value)}
                        />

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* total */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Total</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          inputMode="numeric"
                          onChange={e => field.onChange(Number(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keterangan</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button type="submit">Buat</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
