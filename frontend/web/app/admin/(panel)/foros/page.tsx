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
  MessageSquare,
  CalendarIcon,
  CalendarDays,
  List,
  ChevronLeft,
  ChevronRight,
  Upload,
} from "lucide-react"
import { format, parse, isValid, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek, addDays } from "date-fns"
import { es } from "date-fns/locale"

interface DailyForum {
  id: number
  date: string
  question: string
  description?: string
  createdAt: string
}

const initialForums: DailyForum[] = [
  {
    id: 1,
    date: "2024-03-20",
    question: "¿Qué te motiva a seguir adelante en tu proceso de recuperación?",
    description: "Comparte con la comunidad qué personas, metas o pensamientos te ayudan a mantenerte enfocado en tu bienestar.",
    createdAt: "10/03/2024",
  },
  {
    id: 2,
    date: "2024-03-21",
    question: "¿Cómo manejas los momentos de tentación?",
    description: "Cuéntanos qué estrategias o técnicas te han funcionado cuando sientes ganas de recaer.",
    createdAt: "10/03/2024",
  },
  {
    id: 3,
    date: "2024-03-22",
    question: "¿Qué hábitos saludables has incorporado recientemente?",
    createdAt: "12/03/2024",
  },
  {
    id: 4,
    date: "2024-03-23",
    question: "¿Qué le dirías a alguien que está comenzando su recuperación?",
    description: "Tu experiencia puede ser de gran ayuda para quienes recién empiezan este camino.",
    createdAt: "12/03/2024",
  },
  {
    id: 5,
    date: "2024-03-24",
    question: "¿Qué actividad te ayuda a desconectar y relajarte?",
    createdAt: "15/03/2024",
  },
  {
    id: 6,
    date: "2024-03-25",
    question: "¿Cómo celebras tus pequeños logros?",
    description: "Cada paso cuenta. Cuéntanos cómo reconoces tu progreso.",
    createdAt: "15/03/2024",
  },
  {
    id: 7,
    date: "2024-04-01",
    question: "¿Qué persona ha sido clave en tu recuperación?",
    createdAt: "20/03/2024",
  },
  {
    id: 8,
    date: "2024-04-05",
    question: "¿Qué has aprendido sobre ti mismo en este proceso?",
    description: "La recuperación es también un viaje de autoconocimiento.",
    createdAt: "20/03/2024",
  },
]

export default function ForosPage() {
  const [forums, setForums] = useState<DailyForum[]>(initialForums)
  const [showModal, setShowModal] = useState(false)
  const [editingForum, setEditingForum] = useState<DailyForum | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({ 
    date: undefined as Date | undefined, 
    question: "",
    description: "" 
  })
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [dateRangeStart, setDateRangeStart] = useState<Date | undefined>(undefined)
  const [dateRangeEnd, setDateRangeEnd] = useState<Date | undefined>(undefined)
  const [lockedDate, setLockedDate] = useState<Date | undefined>(undefined)
  
  // Bulk import state
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [bulkText, setBulkText] = useState("")
  const [bulkStartDate, setBulkStartDate] = useState<string>("")

  // Forum lookup by date
  const forumsByDate = useMemo(() => {
    const map = new Map<string, DailyForum>()
    forums.forEach((f) => {
      map.set(f.date, f)
    })
    return map
  }, [forums])

  const getForumForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    return forumsByDate.get(dateStr)
  }

  // Filtered forums for list view
  const filteredForums = useMemo(() => {
    let result = [...forums]

    // Search filter
    if (searchQuery) {
      result = result.filter((f) =>
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Date range filter
    if (dateRangeStart) {
      result = result.filter((f) => new Date(f.date) >= dateRangeStart)
    }
    if (dateRangeEnd) {
      result = result.filter((f) => new Date(f.date) <= dateRangeEnd)
    }

    // Sort by date descending
    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [forums, searchQuery, dateRangeStart, dateRangeEnd])

  const openCreateModal = (date?: Date) => {
    setEditingForum(null)
    setFormData({ date: date, question: "", description: "" })
    setLockedDate(date)
    setShowModal(true)
  }

  const openEditModal = (forum: DailyForum) => {
    setEditingForum(forum)
    setFormData({
      date: parse(forum.date, "yyyy-MM-dd", new Date()),
      question: forum.question,
      description: forum.description || "",
    })
    setLockedDate(parse(forum.date, "yyyy-MM-dd", new Date()))
    setShowModal(true)
  }

  const handleSave = () => {
    if (!formData.date || !formData.question) return

    const newForum: DailyForum = {
      id: editingForum?.id || Date.now(),
      date: format(formData.date, "yyyy-MM-dd"),
      question: formData.question,
      description: formData.description || undefined,
      createdAt: editingForum?.createdAt || new Date().toLocaleDateString("es-ES"),
    }

    if (editingForum) {
      setForums(forums.map((f) => (f.id === editingForum.id ? newForum : f)))
    } else {
      setForums([newForum, ...forums])
    }

    setShowModal(false)
    setFormData({ date: undefined, question: "", description: "" })
    setEditingForum(null)
    setLockedDate(undefined)
  }

  // Find first available date without a forum from a given start date
  const findFirstAvailableDate = (startDate: Date): Date => {
    let current = startDate
    const maxDays = 365
    for (let i = 0; i < maxDays; i++) {
      const dateStr = format(current, "yyyy-MM-dd")
      if (!forumsByDate.has(dateStr)) {
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

  // Parse bulk text into individual questions
  const parsedBulkQuestions = useMemo(() => {
    return bulkText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
  }, [bulkText])

  // Handle bulk import
  const handleBulkImport = () => {
    if (parsedBulkQuestions.length === 0 || !bulkStartDate) return

    const startDate = parse(bulkStartDate, "yyyy-MM-dd", new Date())
    if (!isValid(startDate)) return

    const newForums: DailyForum[] = []
    let currentDate = startDate

    for (const questionText of parsedBulkQuestions) {
      // Find next available day
      while (forumsByDate.has(format(currentDate, "yyyy-MM-dd"))) {
        currentDate = addDays(currentDate, 1)
      }

      newForums.push({
        id: Date.now() + newForums.length,
        date: format(currentDate, "yyyy-MM-dd"),
        question: questionText,
        createdAt: new Date().toLocaleDateString("es-ES"),
      })

      // Move to next day for the next question
      currentDate = addDays(currentDate, 1)
    }

    setForums([...forums, ...newForums])
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
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">{forums.length}</p>
                <p className="text-sm text-[#737373]">Total de foros</p>
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
                  {forums.filter((f) => new Date(f.date) >= new Date()).length}
                </p>
                <p className="text-sm text-[#737373]">Foros programados</p>
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
              <CardTitle className="text-[#1a1a1a]">Foros del Día</CardTitle>
              <CardDescription className="text-[#737373]">
                Crea preguntas diarias para fomentar la reflexión y el diálogo en la comunidad
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
                    const forum = getForumForDate(day)
                    const hasForum = !!forum

                    return (
                      <button
                        key={index}
                        onClick={() => {
                          if (hasForum) {
                            openEditModal(forum!)
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

                        {hasForum && (
                          <div className="mt-1">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mb-1" />
                            <p className="text-xs text-[#737373] line-clamp-2 leading-tight">
                              {forum!.question.substring(0, 35)}...
                            </p>
                          </div>
                        )}

                        {!hasForum && isCurrentMonth && (
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
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>Día con foro</span>
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
                <p className="text-sm text-[#737373]">{filteredForums.length} foros encontrados</p>
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
                    Crear Foro
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3]" />
                  <Input
                    placeholder="Buscar por pregunta..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="date"
                    placeholder="Desde"
                    value={dateRangeStart ? format(dateRangeStart, "yyyy-MM-dd") : ""}
                    onChange={(e) =>
                      setDateRangeStart(e.target.value ? new Date(e.target.value) : undefined)
                    }
                    className="w-36 bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]"
                  />
                  <span className="text-[#a3a3a3]">-</span>
                  <Input
                    type="date"
                    placeholder="Hasta"
                    value={dateRangeEnd ? format(dateRangeEnd, "yyyy-MM-dd") : ""}
                    onChange={(e) =>
                      setDateRangeEnd(e.target.value ? new Date(e.target.value) : undefined)
                    }
                    className="w-36 bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]"
                  />
                  {(dateRangeStart || dateRangeEnd) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
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
                    <TableRow className="bg-[#f8f6f3] hover:bg-[#f8f6f3]">
                      <TableHead className="text-[#737373] font-semibold w-32">Fecha</TableHead>
                      <TableHead className="text-[#737373] font-semibold">Pregunta</TableHead>
                      <TableHead className="text-[#737373] font-semibold w-24 text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredForums.map((forum) => (
                      <TableRow key={forum.id} className="hover:bg-[#f8f6f3]/50">
                        <TableCell className="font-medium text-[#1a1a1a]">
                          <div>
                            <p className="font-semibold">{formatDisplayDate(forum.date)}</p>
                            <p className="text-xs text-[#a3a3a3]">{forum.date.split("-")[0]}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-[#1a1a1a] font-medium">{forum.question}</p>
                            {forum.description && (
                              <p className="text-xs text-[#737373] line-clamp-1">{forum.description}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditModal(forum)}
                            className="text-[#737373] hover:text-[#d4854a] hover:bg-[#d4854a]/10"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredForums.length === 0 && (
                <div className="text-center py-12 text-[#737373]">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No se encontraron foros</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Create/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-white border-[#e5e5e5] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a1a]">
              {editingForum ? "Editar Foro" : "Crear Foro del Día"}
            </DialogTitle>
            <DialogDescription className="text-[#737373]">
              {editingForum
                ? "Modifica la pregunta de reflexión para este día"
                : "Crea una nueva pregunta para fomentar el diálogo"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Fecha</Label>
              {lockedDate ? (
                <div className="p-3 rounded-lg bg-[#f8f6f3] text-[#1a1a1a] capitalize">
                  {formatFullDate(format(lockedDate, "yyyy-MM-dd"))}
                </div>
              ) : (
                <Input
                  type="date"
                  value={formData.date ? format(formData.date, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    if (e.target.value) {
                      const date = new Date(e.target.value)
                      if (isValid(date)) {
                        // Check if date already has a forum
                        const dateStr = format(date, "yyyy-MM-dd")
                        if (forumsByDate.has(dateStr)) {
                          alert("Ya existe un foro para esta fecha")
                          return
                        }
                        setFormData({ ...formData, date })
                      }
                    }
                  }}
                  className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]"
                />
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Pregunta para reflexionar *</Label>
              <Input
                placeholder="¿Qué te motiva a seguir adelante en tu proceso de recuperación?"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">
                Descripción / Contexto <span className="text-[#a3a3a3] text-xs">(opcional)</span>
              </Label>
              <Textarea
                placeholder="Añade contexto o guía para la reflexión..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3] min-h-24"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowModal(false)}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.date || !formData.question}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white"
            >
              {editingForum ? "Guardar cambios" : "Crear foro"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Import Modal */}
      <Dialog open={showBulkModal} onOpenChange={setShowBulkModal}>
        <DialogContent className="bg-white border-[#e5e5e5] max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a1a]">Carga Masiva de Foros</DialogTitle>
            <DialogDescription className="text-[#737373]">
              Pega una lista de preguntas (una por línea). El sistema rellenará automáticamente los próximos días vacíos en el calendario.
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
                Los foros se asignarán a los días vacíos a partir de esta fecha
              </p>
            </div>

            {/* Textarea */}
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Preguntas (una por línea)</Label>
              <Textarea
                placeholder="¿Qué te motiva a seguir adelante en tu proceso de recuperación?&#10;¿Cómo manejas los momentos de tentación?&#10;¿Qué hábitos saludables has incorporado recientemente?&#10;..."
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3] min-h-48"
                rows={10}
              />
              {/* Dynamic Counter */}
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  parsedBulkQuestions.length > 0 
                    ? "bg-blue-500/10 text-blue-600" 
                    : "bg-[#f8f6f3] text-[#a3a3a3]"
                }`}>
                  {parsedBulkQuestions.length === 0 
                    ? "Sin preguntas detectadas"
                    : parsedBulkQuestions.length === 1
                      ? "1 pregunta detectada"
                      : `${parsedBulkQuestions.length} preguntas detectadas`}
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
              disabled={parsedBulkQuestions.length === 0 || !bulkStartDate}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white gap-2"
            >
              <Upload className="w-4 h-4" />
              Importar {parsedBulkQuestions.length > 0 ? `${parsedBulkQuestions.length} foros` : ""}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
