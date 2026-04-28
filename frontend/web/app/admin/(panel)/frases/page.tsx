"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pencil,
  Plus,
  Search,
  Quote,
  CalendarIcon,
  CalendarDays,
  List,
  ChevronLeft,
  ChevronRight,
  Upload,
} from "lucide-react"
import { format, parse, isValid, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay, startOfWeek, endOfWeek, addDays } from "date-fns"
import { es } from "date-fns/locale"

interface DailyQuote {
  id: number
  date: string
  quote: string
  createdAt: string
}

const initialQuotes: DailyQuote[] = [
  {
    id: 1,
    date: "2024-03-20",
    quote: "El primer paso hacia el cambio es la conciencia. El segundo paso es la aceptación.",
    createdAt: "10/03/2024",
  },
  {
    id: 2,
    date: "2024-03-21",
    quote: "No importa cuán lento vayas, siempre y cuando no te detengas.",
    createdAt: "10/03/2024",
  },
  {
    id: 3,
    date: "2024-03-22",
    quote: "La sobriedad no es un destino, es un viaje. Cada día es un nuevo comienzo.",
    createdAt: "12/03/2024",
  },
  {
    id: 4,
    date: "2024-03-23",
    quote: "Tu historia no ha terminado. Cada día que despiertas es una nueva página en blanco.",
    createdAt: "12/03/2024",
  },
  {
    id: 5,
    date: "2024-03-24",
    quote: "La fortaleza no viene de lo que puedes hacer, viene de superar las cosas que creías que no podías.",
    createdAt: "15/03/2024",
  },
  {
    id: 6,
    date: "2024-03-25",
    quote: "Pedir ayuda no es un signo de debilidad, es un signo de valentía.",
    createdAt: "15/03/2024",
  },
  {
    id: 7,
    date: "2024-03-26",
    quote: "El cambio es difícil al principio, desordenado en el medio, pero hermoso al final.",
    createdAt: "18/03/2024",
  },
  {
    id: 8,
    date: "2024-03-27",
    quote: "No eres tus errores del pasado. Eres las lecciones que has aprendido de ellos.",
    createdAt: "18/03/2024",
  },
  {
    id: 9,
    date: "2024-04-01",
    quote: "Hoy es un buen día para empezar de nuevo.",
    createdAt: "20/03/2024",
  },
  {
    id: 10,
    date: "2024-04-05",
    quote: "La paciencia es la clave de la recuperación.",
    createdAt: "20/03/2024",
  },
  {
    id: 11,
    date: "2024-04-10",
    quote: "Cada pequeño paso cuenta en tu camino hacia la sanación.",
    createdAt: "22/03/2024",
  },
  {
    id: 12,
    date: "2024-04-15",
    quote: "Eres más fuerte de lo que crees.",
    createdAt: "22/03/2024",
  },
]

export default function FrasesPage() {
  const [quotes, setQuotes] = useState<DailyQuote[]>(initialQuotes)
  const [showModal, setShowModal] = useState(false)
  const [editingQuote, setEditingQuote] = useState<DailyQuote | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({ date: undefined as Date | undefined, quote: "" })
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [dateRangeStart, setDateRangeStart] = useState<Date | undefined>(undefined)
  const [dateRangeEnd, setDateRangeEnd] = useState<Date | undefined>(undefined)
  const [lockedDate, setLockedDate] = useState<Date | undefined>(undefined)
  
  // Bulk import state
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [bulkText, setBulkText] = useState("")
  const [bulkStartDate, setBulkStartDate] = useState<string>("")

  // Quote lookup by date
  const quotesByDate = useMemo(() => {
    const map = new Map<string, DailyQuote>()
    quotes.forEach((q) => {
      map.set(q.date, q)
    })
    return map
  }, [quotes])

  const getQuoteForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    return quotesByDate.get(dateStr)
  }

  // Filtered quotes for list view
  const filteredQuotes = useMemo(() => {
    let result = [...quotes]

    // Search filter
    if (searchQuery) {
      result = result.filter((q) =>
        q.quote.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Date range filter
    if (dateRangeStart) {
      result = result.filter((q) => new Date(q.date) >= dateRangeStart)
    }
    if (dateRangeEnd) {
      result = result.filter((q) => new Date(q.date) <= dateRangeEnd)
    }

    // Sort by date descending
    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [quotes, searchQuery, dateRangeStart, dateRangeEnd])

  const openCreateModal = (date?: Date) => {
    setEditingQuote(null)
    setFormData({ date: date, quote: "" })
    setLockedDate(date)
    setShowModal(true)
  }

  const openEditModal = (quote: DailyQuote) => {
    setEditingQuote(quote)
    setFormData({
      date: parse(quote.date, "yyyy-MM-dd", new Date()),
      quote: quote.quote,
    })
    setLockedDate(parse(quote.date, "yyyy-MM-dd", new Date()))
    setShowModal(true)
  }

  const handleSave = () => {
    if (!formData.date || !formData.quote) return

    const newQuote: DailyQuote = {
      id: editingQuote?.id || Date.now(),
      date: format(formData.date, "yyyy-MM-dd"),
      quote: formData.quote,
      createdAt: editingQuote?.createdAt || new Date().toLocaleDateString("es-ES"),
    }

    if (editingQuote) {
      setQuotes(quotes.map((q) => (q.id === editingQuote.id ? newQuote : q)))
    } else {
      setQuotes([newQuote, ...quotes])
    }

    setShowModal(false)
    setFormData({ date: undefined, quote: "" })
    setEditingQuote(null)
    setLockedDate(undefined)
  }

  // Find first available date without a quote from a given start date
  const findFirstAvailableDate = (startDate: Date): Date => {
    let current = startDate
    const maxDays = 365 // Limit to 1 year ahead
    for (let i = 0; i < maxDays; i++) {
      const dateStr = format(current, "yyyy-MM-dd")
      if (!quotesByDate.has(dateStr)) {
        return current
      }
      current = addDays(current, 1)
    }
    return current
  }

  // Open bulk import modal and set default start date
  const openBulkModal = () => {
    const firstAvailable = findFirstAvailableDate(new Date())
    setBulkStartDate(format(firstAvailable, "yyyy-MM-dd"))
    setBulkText("")
    setShowBulkModal(true)
  }

  // Parse bulk text into individual quotes
  const parsedBulkQuotes = useMemo(() => {
    return bulkText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
  }, [bulkText])

  // Handle bulk import
  const handleBulkImport = () => {
    if (parsedBulkQuotes.length === 0 || !bulkStartDate) return

    const startDate = parse(bulkStartDate, "yyyy-MM-dd", new Date())
    if (!isValid(startDate)) return

    const newQuotes: DailyQuote[] = []
    let currentDate = startDate

    for (const quoteText of parsedBulkQuotes) {
      // Find next available day
      while (quotesByDate.has(format(currentDate, "yyyy-MM-dd"))) {
        currentDate = addDays(currentDate, 1)
      }

      newQuotes.push({
        id: Date.now() + newQuotes.length,
        date: format(currentDate, "yyyy-MM-dd"),
        quote: quoteText,
        createdAt: new Date().toLocaleDateString("es-ES"),
      })

      // Move to next day for the next quote
      currentDate = addDays(currentDate, 1)
    }

    setQuotes([...quotes, ...newQuotes])
    setShowBulkModal(false)
    setBulkText("")
    setBulkStartDate("")
  }

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return format(date, "d 'de' MMMM", { locale: es })
  }

  const formatFullDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })
  }

  // Calendar grid generation
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 })
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  }, [currentMonth])

  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white border-[#e5e5e5] shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#d4854a]">
                <Quote className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">{quotes.length}</p>
                <p className="text-sm text-[#737373]">Total de frases</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-[#e5e5e5] shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-600">
                <CalendarIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">
                  {quotes.filter((q) => new Date(q.date) >= new Date()).length}
                </p>
                <p className="text-sm text-[#737373]">Frases programadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Tabs */}
      <Card className="bg-white border-[#e5e5e5] shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-[#1a1a1a]">Frases del Día</CardTitle>
              <CardDescription className="text-[#737373]">
                Programa frases inspiradoras para motivar a los usuarios cada día
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calendar" className="space-y-6">
            <TabsList className="bg-[#f8f6f3] p-1">
              <TabsTrigger
                value="calendar"
                className="gap-2 data-[state=active]:bg-white data-[state=active]:text-[#1a1a1a] text-[#737373]"
              >
                <CalendarDays className="w-4 h-4" />
                Vista Calendario
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="gap-2 data-[state=active]:bg-white data-[state=active]:text-[#1a1a1a] text-[#737373]"
              >
                <List className="w-4 h-4" />
                Vista Lista
              </TabsTrigger>
            </TabsList>

            {/* Calendar View */}
            <TabsContent value="calendar" className="space-y-4">
              {/* Quick Navigation */}
              <div className="flex flex-wrap items-center gap-3 p-3 rounded-lg bg-[#f8f6f3]">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#737373]">Ir a:</span>
                  <Select
                    value={currentMonth.getFullYear().toString()}
                    onValueChange={(year) => {
                      const newDate = new Date(currentMonth)
                      newDate.setFullYear(parseInt(year))
                      setCurrentMonth(newDate)
                    }}
                  >
                    <SelectTrigger className="w-24 bg-white border-[#e5e5e5] text-[#1a1a1a]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#e5e5e5]">
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 2 + i).map((year) => (
                        <SelectItem key={year} value={year.toString()} className="text-[#1a1a1a]">
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={currentMonth.getMonth().toString()}
                    onValueChange={(month) => {
                      const newDate = new Date(currentMonth)
                      newDate.setMonth(parseInt(month))
                      setCurrentMonth(newDate)
                    }}
                  >
                    <SelectTrigger className="w-32 bg-white border-[#e5e5e5] text-[#1a1a1a]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#e5e5e5]">
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()} className="text-[#1a1a1a] capitalize">
                          {format(new Date(2024, i, 1), "MMMM", { locale: es })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#737373]">o fecha exacta:</span>
                  <Input
                    type="date"
                    className="w-40 bg-white border-[#e5e5e5] text-[#1a1a1a]"
                    onChange={(e) => {
                      if (e.target.value) {
                        const date = new Date(e.target.value)
                        if (isValid(date)) {
                          setCurrentMonth(date)
                        }
                      }
                    }}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date())}
                  className="text-[#d4854a] hover:bg-[#d4854a]/10"
                >
                  Hoy
                </Button>
              </div>

              {/* Calendar Header */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="text-[#737373] hover:text-[#1a1a1a] hover:bg-[#f8f6f3]"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-lg font-semibold text-[#1a1a1a] capitalize">
                  {format(currentMonth, "MMMM yyyy", { locale: es })}
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="text-[#737373] hover:text-[#1a1a1a] hover:bg-[#f8f6f3]"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Calendar Grid */}
              <div className="border border-[#e5e5e5] rounded-lg overflow-hidden">
                {/* Week Days Header */}
                <div className="grid grid-cols-7 bg-[#f8f6f3]">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="py-3 text-center text-sm font-medium text-[#737373] border-b border-[#e5e5e5]"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7">
                  {calendarDays.map((day, index) => {
                    const isCurrentMonth = isSameMonth(day, currentMonth)
                    const isToday = isSameDay(day, new Date())
                    const quote = getQuoteForDate(day)
                    const hasQuote = !!quote

                    return (
                      <button
                        key={index}
                        onClick={() => {
                          if (hasQuote) {
                            openEditModal(quote!)
                          } else {
                            openCreateModal(day)
                          }
                        }}
                        className={`
                          relative min-h-24 p-2 border-b border-r border-[#e5e5e5] text-left transition-colors
                          ${isCurrentMonth ? "bg-white hover:bg-[#f8f6f3]" : "bg-[#fafafa] text-[#a3a3a3]"}
                          ${isToday ? "ring-2 ring-inset ring-[#d4854a]" : ""}
                        `}
                      >
                        <span
                          className={`
                            text-sm font-medium
                            ${isToday ? "text-[#d4854a]" : isCurrentMonth ? "text-[#1a1a1a]" : "text-[#a3a3a3]"}
                          `}
                        >
                          {format(day, "d")}
                        </span>

                        {hasQuote && (
                          <div className="mt-1">
                            <div className="w-2 h-2 rounded-full bg-[#d4854a] mb-1" />
                            <p className="text-xs text-[#737373] line-clamp-2 leading-tight">
                              {quote!.quote.substring(0, 40)}...
                            </p>
                          </div>
                        )}

                        {!hasQuote && isCurrentMonth && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <div className="w-8 h-8 rounded-full bg-[#d4854a]/10 flex items-center justify-center">
                              <Plus className="w-4 h-4 text-[#d4854a]" />
                            </div>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-sm text-[#737373]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#d4854a]" />
                  <span>Día con frase</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded ring-2 ring-[#d4854a]" />
                  <span>Hoy</span>
                </div>
              </div>
            </TabsContent>

            {/* List View */}
            <TabsContent value="list" className="space-y-4">
              {/* Header with Create Button */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#737373]">{filteredQuotes.length} frases encontradas</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={openBulkModal}
                    className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a] gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Carga Masiva
                  </Button>
                  <Button
                    onClick={() => openCreateModal()}
                    className="bg-[#d4854a] hover:bg-[#c07842] text-white gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Crear Frase
                  </Button>
                </div>
              </div>
              
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3]" />
                  <Input
                    placeholder="Buscar por contenido de la frase..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
                  />
                </div>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] gap-2"
                      >
                        <CalendarIcon className="w-4 h-4" />
                        {dateRangeStart
                          ? format(dateRangeStart, "dd/MM/yy")
                          : "Desde"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border-[#e5e5e5]" align="start">
                      <Calendar
                        mode="single"
                        selected={dateRangeStart}
                        onSelect={setDateRangeStart}
                        locale={es}
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] gap-2"
                      >
                        <CalendarIcon className="w-4 h-4" />
                        {dateRangeEnd
                          ? format(dateRangeEnd, "dd/MM/yy")
                          : "Hasta"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border-[#e5e5e5]" align="start">
                      <Calendar
                        mode="single"
                        selected={dateRangeEnd}
                        onSelect={setDateRangeEnd}
                        locale={es}
                      />
                    </PopoverContent>
                  </Popover>
                  {(dateRangeStart || dateRangeEnd || searchQuery) && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSearchQuery("")
                        setDateRangeStart(undefined)
                        setDateRangeEnd(undefined)
                      }}
                      className="text-[#737373] hover:text-[#1a1a1a]"
                    >
                      Limpiar
                    </Button>
                  )}
                </div>
              </div>

              {/* Table */}
              <div className="border border-[#e5e5e5] rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#f8f6f3] border-[#e5e5e5]">
                      <TableHead className="text-[#737373] font-semibold">Fecha</TableHead>
                      <TableHead className="text-[#737373] font-semibold">Frase</TableHead>
                      <TableHead className="text-[#737373] font-semibold text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQuotes.map((quote) => (
                      <TableRow key={quote.id} className="border-[#e5e5e5]">
                        <TableCell className="font-medium text-[#1a1a1a] whitespace-nowrap">
                          <div>
                            <p className="capitalize">{formatDisplayDate(quote.date)}</p>
                            <p className="text-xs text-[#a3a3a3]">
                              {new Date(quote.date).getFullYear()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-[#737373] font-serif italic line-clamp-2">
                            &ldquo;{quote.quote}&rdquo;
                          </p>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEditModal(quote)}
                            className="h-8 w-8 p-0 text-[#737373] hover:text-[#1a1a1a] hover:bg-[#f8f6f3]"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredQuotes.length === 0 && (
                  <div className="text-center py-12 text-[#737373]">
                    <Quote className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No se encontraron frases</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Create/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-white border-[#e5e5e5] max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a1a]">
              {editingQuote ? "Editar frase" : "Nueva frase del día"}
            </DialogTitle>
            <DialogDescription className="text-[#737373]">
              {editingQuote
                ? "Modifica la frase para este día"
                : "Programa una frase inspiradora para este día"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {/* Date Display (locked if from calendar click) */}
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Fecha</Label>
              {lockedDate ? (
                <div className="p-3 rounded-lg bg-[#f8f6f3] border border-[#e5e5e5]">
                  <p className="text-[#1a1a1a] font-medium capitalize">
                    {formatFullDate(format(lockedDate, "yyyy-MM-dd"))}
                  </p>
                </div>
              ) : (
                <Input
                  type="date"
                  value={formData.date ? format(formData.date, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    if (e.target.value) {
                      const date = parse(e.target.value, "yyyy-MM-dd", new Date())
                      if (isValid(date)) {
                        setFormData({ ...formData, date })
                      }
                    } else {
                      setFormData({ ...formData, date: undefined })
                    }
                  }}
                  className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Frase *</Label>
              <Textarea
                placeholder="Escribe una frase inspiradora..."
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3] min-h-32 font-serif text-lg"
              />
              <p className="text-xs text-[#a3a3a3]">{formData.quote.length} caracteres</p>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowModal(false)
                setLockedDate(undefined)
              }}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={!(formData.date || lockedDate) || !formData.quote.trim()}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white"
            >
              {editingQuote ? "Guardar cambios" : "Crear frase"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Import Modal */}
      <Dialog open={showBulkModal} onOpenChange={setShowBulkModal}>
        <DialogContent className="bg-white border-[#e5e5e5] max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a1a]">Carga Masiva de Frases</DialogTitle>
            <DialogDescription className="text-[#737373]">
              Pega una lista de frases (una por línea). El sistema rellenará automáticamente los próximos días vacíos en el calendario.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {/* Start Date */}
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Asignar a partir de:</Label>
              <Input
                type="date"
                value={bulkStartDate}
                onChange={(e) => setBulkStartDate(e.target.value)}
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] max-w-xs"
              />
              <p className="text-xs text-[#a3a3a3]">
                Las frases se asignarán a los días vacíos a partir de esta fecha
              </p>
            </div>

            {/* Textarea */}
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Frases (una por línea)</Label>
              <Textarea
                placeholder="El primer paso hacia el cambio es la conciencia.&#10;No importa cuán lento vayas, siempre y cuando no te detengas.&#10;La sobriedad no es un destino, es un viaje.&#10;..."
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3] min-h-48 font-serif"
                rows={10}
              />
              {/* Dynamic Counter */}
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  parsedBulkQuotes.length > 0 
                    ? "bg-[#d4854a]/10 text-[#d4854a]" 
                    : "bg-[#f8f6f3] text-[#a3a3a3]"
                }`}>
                  {parsedBulkQuotes.length === 0 
                    ? "Sin frases detectadas"
                    : parsedBulkQuotes.length === 1
                      ? "1 frase detectada"
                      : `${parsedBulkQuotes.length} frases detectadas`}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowBulkModal(false)}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleBulkImport}
              disabled={parsedBulkQuotes.length === 0 || !bulkStartDate}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white gap-2"
            >
              <Upload className="w-4 h-4" />
              Importar {parsedBulkQuotes.length > 0 ? `${parsedBulkQuotes.length} frases` : ""}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
