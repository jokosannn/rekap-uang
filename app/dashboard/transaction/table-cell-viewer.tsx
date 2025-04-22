'use client'

import * as React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useIsMobile } from '@/hooks/use-mobile'
import { transactionSchema } from '@/schema/transaction-schema'

const FormSchema = z.object({
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

export default function TableCellViewer({ item }: { item: z.infer<typeof transactionSchema> }) {
  const isMobile = useIsMobile()

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
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit truncate px-0 text-left font-normal">
          {format(new Date(item.date), 'dd MMMM yyyy', { locale: id })}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{format(new Date(item.date), 'dd MMMM yyyy', { locale: id })}</DrawerTitle>
          <DrawerDescription>Showing total visitors for the last 6 months</DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 overflow-auto px-4 text-sm"
          >
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
            <DrawerFooter className="px-0">
              <Button type="submit">Simpan</Button>
              <DrawerClose asChild>
                <Button variant="destructive">Hapus</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}
