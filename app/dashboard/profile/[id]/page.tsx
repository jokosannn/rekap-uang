'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown, LogOut, Mail, Moon, Sun, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
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
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
  { label: 'Indonesian', value: 'id' }
] as const

const currencies = [
  { label: 'IDR - Indonesian Rupiah', value: 'IDR' },
  { label: 'USD - US Dollar', value: 'USD' },
  { label: 'EUR - Euro', value: 'EUR' },
  { label: 'GBP - British Pound', value: 'GBP' },
  { label: 'JPY - Japanese Yen', value: 'JPY' },
  { label: 'SGD - Singapore Dollar', value: 'SGD' },
  { label: 'AUD - Australian Dollar', value: 'AUD' },
  { label: 'CNY - Chinese Yuan', value: 'CNY' }
] as const

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.'
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.'
    }),
  email: z.string().min(1, { message: 'This field is required' }).email('This is not a valid email.')
})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  name: 'Budi Santoso',
  email: 'budi.santoso@example.com'
}

export default function ProfilePage() {
  const [languageOpen, setLanguageOpen] = useState(false)
  const [language, setLanguage] = useState('id')

  const [currencyOpen, setCurrencyOpen] = useState(false)
  const [currency, setCurrency] = useState('IDR')

  const { setTheme, theme } = useTheme()

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues
  })

  function onSubmit(data: AccountFormValues) {
    // This would usually be a server action or API call
    console.log(data)
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-8 px-4 py-4 md:py-6 lg:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profil Akun</h1>
            <p className="text-muted-foreground">Kelola informasi profil dan pengaturan akun Anda</p>
          </div>
          <Button variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Keluar
          </Button>
        </div>

        <div className="flex flex-col justify-start gap-8 md:flex-row">
          {/* Profile Card */}
          <Card className="overflow-hidden md:w-1/3">
            <CardHeader>
              <Avatar className="mx-auto mb-4 h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
                <AvatarFallback>BS</AvatarFallback>
              </Avatar>
              <CardTitle className="text-center">Budi Santoso</CardTitle>
              <span className="truncate text-center">budi.santoso@example.com</span>
            </CardHeader>
          </Card>

          {/* Settings Tabs */}
          <div className="flex-1">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="preferences">Preferensi</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Informasi Profil</CardTitle>
                    <CardDescription>
                      Perbarui informasi profil Anda di sini. Klik simpan setelah selesai.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nama</FormLabel>
                              <FormControl>
                                <Input placeholder="Nama lengkap Anda" {...field} />
                              </FormControl>
                              <FormDescription>
                                Nama ini akan ditampilkan di profil Anda.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Email Anda" {...field} disabled />
                              </FormControl>
                              <FormDescription>
                                Email ini akan digunakan untuk komunikasi.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Simpan Perubahan</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferensi</CardTitle>
                    <CardDescription>Kelola preferensi tampilan dan regional Anda.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Theme Selection */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="theme-mode" className="flex flex-col items-start space-y-1">
                          <span>Tema</span>
                          <span className="text-muted-foreground text-sm font-normal">
                            Pilih tema tampilan aplikasi
                          </span>
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Sun className="h-4 w-4" />
                          <Switch
                            id="theme-mode"
                            checked={theme === 'dark'}
                            onCheckedChange={checked => setTheme(checked ? 'dark' : 'light')}
                            className="cursor-pointer"
                          />
                          <Moon className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Language Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="language">Bahasa</Label>
                      <Popover open={languageOpen} onOpenChange={setLanguageOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            id="language"
                            variant="outline"
                            role="combobox"
                            aria-expanded={languageOpen}
                            className="w-full justify-between"
                          >
                            {language
                              ? languages.find(l => l.value === language)?.label
                              : 'Pilih bahasa...'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Cari bahasa..." />
                            <CommandList>
                              <CommandEmpty>Bahasa tidak ditemukan.</CommandEmpty>
                              <CommandGroup>
                                {languages.map(l => (
                                  <CommandItem
                                    key={l.value}
                                    value={l.value}
                                    onSelect={currentValue => {
                                      setLanguage(currentValue === language ? '' : currentValue)
                                      setLanguageOpen(false)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        language === l.value ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                    {l.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Currency Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="currency">Mata Uang</Label>
                      <Popover open={currencyOpen} onOpenChange={setCurrencyOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            id="currency"
                            variant="outline"
                            role="combobox"
                            aria-expanded={currencyOpen}
                            className="w-full justify-between"
                          >
                            {currency
                              ? currencies.find(c => c.value === currency)?.label
                              : 'Pilih mata uang...'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Cari mata uang..." />
                            <CommandList>
                              <CommandEmpty>Mata uang tidak ditemukan.</CommandEmpty>
                              <CommandGroup>
                                {currencies.map(c => (
                                  <CommandItem
                                    key={c.value}
                                    value={c.value}
                                    onSelect={currentValue => {
                                      setCurrency(currentValue === currency ? '' : currentValue)
                                      setCurrencyOpen(false)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        currency === c.value ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                    {c.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Simpan Preferensi</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
