"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Activity,
  Users,
  AlertTriangle,
  PlayCircle,
  TrendingUp,
  Smartphone,
  Monitor,
  FileText,
  Trophy,
  Search,
  UserCog,
} from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

// Mock data for mobile app activity chart
const mobileActivityData = [
  { day: "Lun", usuarios: 245, sesiones: 312, sos: 5 },
  { day: "Mar", usuarios: 289, sesiones: 378, sos: 3 },
  { day: "Mié", usuarios: 312, sesiones: 425, sos: 7 },
  { day: "Jue", usuarios: 278, sesiones: 356, sos: 4 },
  { day: "Vie", usuarios: 345, sesiones: 467, sos: 8 },
  { day: "Sáb", usuarios: 198, sesiones: 234, sos: 2 },
  { day: "Dom", usuarios: 167, sesiones: 189, sos: 1 },
]

// Mock data for mobile app events
const mobileEvents = [
  { id: 1, timestamp: "2024-03-27 14:32:15", userId: "8x...9p", type: "sos_trigger", details: "Activación desde pantalla principal" },
  { id: 2, timestamp: "2024-03-27 14:28:03", userId: "k3...2m", type: "view_stats", details: "Visualizó estadísticas de 30 días" },
  { id: 3, timestamp: "2024-03-27 14:15:45", userId: "9f...7q", type: "open_app", details: "Sesión iniciada" },
  { id: 4, timestamp: "2024-03-27 14:12:22", userId: "2j...5n", type: "content_view", details: "Video: Técnicas de respiración" },
  { id: 5, timestamp: "2024-03-27 14:08:10", userId: "8x...9p", type: "community_post", details: "Publicó en comunidad AA" },
  { id: 6, timestamp: "2024-03-27 13:55:30", userId: "m4...8r", type: "sos_trigger", details: "Activación nocturna" },
  { id: 7, timestamp: "2024-03-27 13:42:18", userId: "5t...1w", type: "challenge_complete", details: "Completó reto: 7 días sin fumar" },
  { id: 8, timestamp: "2024-03-27 13:30:05", userId: "k3...2m", type: "open_app", details: "Sesión iniciada" },
  { id: 9, timestamp: "2024-03-27 13:15:42", userId: "7h...3x", type: "content_view", details: "Artículo: Manejo del estrés" },
  { id: 10, timestamp: "2024-03-27 12:58:20", userId: "9f...7q", type: "view_stats", details: "Visualizó estadísticas de 7 días" },
]

// Mock data for admin audit logs
const adminAuditLogs = [
  { id: 1, timestamp: "2024-03-27 14:45:00", adminId: "hbjgjk12_31thgj...", action: "Creó nuevo contenido educativo", details: "Video: Mindfulness para principiantes" },
  { id: 2, timestamp: "2024-03-27 14:30:22", adminId: "kl89mn45_92plqw...", action: "Editó Frase del día", details: "Fecha: 2024-03-28" },
  { id: 3, timestamp: "2024-03-27 14:15:10", adminId: "hbjgjk12_31thgj...", action: "Publicó nuevo reto", details: "Reto: 21 días de meditación" },
  { id: 4, timestamp: "2024-03-27 13:50:45", adminId: "xy67ab23_45cdrs...", action: "Aprobó solicitud de baneo", details: "Usuario ID: m4...8r" },
  { id: 5, timestamp: "2024-03-27 13:25:18", adminId: "kl89mn45_92plqw...", action: "Creó grupo de apoyo", details: "Grupo: Ansiedad y Recuperación" },
  { id: 6, timestamp: "2024-03-27 12:55:30", adminId: "hbjgjk12_31thgj...", action: "Editó comunidad", details: "Comunidad: Alcohólicos Anónimos" },
  { id: 7, timestamp: "2024-03-27 12:30:00", adminId: "xy67ab23_45cdrs...", action: "Creó nuevo contenido educativo", details: "Artículo: Nutrición en recuperación" },
  { id: 8, timestamp: "2024-03-27 11:45:22", adminId: "kl89mn45_92plqw...", action: "Editó Foro del día", details: "Fecha: 2024-03-27" },
]

const eventTypeConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  sos_trigger: { label: "SOS Trigger", color: "text-red-700", bgColor: "bg-red-100" },
  view_stats: { label: "Ver Estadísticas", color: "text-blue-700", bgColor: "bg-blue-100" },
  open_app: { label: "Abrir App", color: "text-green-700", bgColor: "bg-green-100" },
  content_view: { label: "Ver Contenido", color: "text-purple-700", bgColor: "bg-purple-100" },
  community_post: { label: "Publicación", color: "text-amber-700", bgColor: "bg-amber-100" },
  challenge_complete: { label: "Reto Completado", color: "text-emerald-700", bgColor: "bg-emerald-100" },
}

export default function MetricasPage() {
  const [mobileEventFilter, setMobileEventFilter] = useState<string>("all")
  const [mobileSearchQuery, setMobileSearchQuery] = useState("")
  const [adminSearchQuery, setAdminSearchQuery] = useState("")

  // Filter mobile events
  const filteredMobileEvents = mobileEvents.filter((event) => {
    const matchesType = mobileEventFilter === "all" || event.type === mobileEventFilter
    const matchesSearch = 
      event.userId.toLowerCase().includes(mobileSearchQuery.toLowerCase()) ||
      event.details.toLowerCase().includes(mobileSearchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  // Filter admin logs
  const filteredAdminLogs = adminAuditLogs.filter((log) =>
    log.action.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
    log.details.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
    log.adminId.toLowerCase().includes(adminSearchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-white border-[#e5e5e5] shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-[#1a1a1a]">Métricas de Uso</CardTitle>
              <CardDescription className="text-[#737373]">
                Analiza el comportamiento de usuarios y administradores en la plataforma
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="mobile" className="space-y-6">
        <TabsList className="bg-[#f8f6f3] p-1">
          <TabsTrigger
            value="mobile"
            className="gap-2 data-[state=active]:bg-white data-[state=active]:text-[#1a1a1a] text-[#737373]"
          >
            <Smartphone className="w-4 h-4" />
            App Móvil
          </TabsTrigger>
          <TabsTrigger
            value="admin"
            className="gap-2 data-[state=active]:bg-white data-[state=active]:text-[#1a1a1a] text-[#737373]"
          >
            <Monitor className="w-4 h-4" />
            Panel Admin Web
          </TabsTrigger>
        </TabsList>

        {/* Mobile App Tab */}
        <TabsContent value="mobile" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white border-[#e5e5e5] shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-600">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1a1a1a]">1,834</p>
                    <p className="text-sm text-[#737373]">Usuarios Activos (Mes)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#e5e5e5] shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-600">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1a1a1a]">30</p>
                    <p className="text-sm text-[#737373]">Pulsaciones Botón SOS</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#e5e5e5] shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-600">
                    <PlayCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1a1a1a]">4,521</p>
                    <p className="text-sm text-[#737373]">Contenido Reproducido</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#e5e5e5] shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-600">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1a1a1a]">78%</p>
                    <p className="text-sm text-[#737373]">Tasa de Retención</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Chart */}
          <Card className="bg-white border-[#e5e5e5] shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#1a1a1a] text-lg">Actividad de la App (Últimos 7 días)</CardTitle>
              <CardDescription className="text-[#737373]">
                Usuarios activos y sesiones diarias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mobileActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUsuarios" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d4854a" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#d4854a" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorSesiones" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="day" stroke="#737373" fontSize={12} />
                    <YAxis stroke="#737373" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "white", 
                        border: "1px solid #e5e5e5",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="usuarios" 
                      stroke="#d4854a" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorUsuarios)" 
                      name="Usuarios"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sesiones" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorSesiones)" 
                      name="Sesiones"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              {/* Chart Legend */}
              <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#d4854a]" />
                  <span className="text-[#737373]">Usuarios</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-[#737373]">Sesiones</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events Table */}
          <Card className="bg-white border-[#e5e5e5] shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#1a1a1a] text-lg">Registro de Eventos</CardTitle>
              <CardDescription className="text-[#737373]">
                Actividad reciente en la aplicación móvil (datos anonimizados)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3]" />
                  <Input
                    placeholder="Buscar por ID o detalles..."
                    value={mobileSearchQuery}
                    onChange={(e) => setMobileSearchQuery(e.target.value)}
                    className="pl-10 bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
                  />
                </div>
                <Select value={mobileEventFilter} onValueChange={setMobileEventFilter}>
                  <SelectTrigger className="w-48 bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]">
                    <SelectValue placeholder="Tipo de evento" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#e5e5e5]">
                    <SelectItem value="all" className="text-[#1a1a1a]">Todos los eventos</SelectItem>
                    <SelectItem value="sos_trigger" className="text-[#1a1a1a]">SOS Trigger</SelectItem>
                    <SelectItem value="open_app" className="text-[#1a1a1a]">Abrir App</SelectItem>
                    <SelectItem value="view_stats" className="text-[#1a1a1a]">Ver Estadísticas</SelectItem>
                    <SelectItem value="content_view" className="text-[#1a1a1a]">Ver Contenido</SelectItem>
                    <SelectItem value="community_post" className="text-[#1a1a1a]">Publicación</SelectItem>
                    <SelectItem value="challenge_complete" className="text-[#1a1a1a]">Reto Completado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Table */}
              <div className="border border-[#e5e5e5] rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#f8f6f3] hover:bg-[#f8f6f3]">
                      <TableHead className="text-[#737373] font-semibold">Fecha y Hora</TableHead>
                      <TableHead className="text-[#737373] font-semibold">ID Usuario</TableHead>
                      <TableHead className="text-[#737373] font-semibold">Tipo de Evento</TableHead>
                      <TableHead className="text-[#737373] font-semibold">Detalles</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMobileEvents.map((event) => {
                      const config = eventTypeConfig[event.type] || { label: event.type, color: "text-gray-700", bgColor: "bg-gray-100" }
                      return (
                        <TableRow key={event.id} className="hover:bg-[#f8f6f3]/50">
                          <TableCell className="text-[#1a1a1a] font-mono text-sm">
                            {event.timestamp}
                          </TableCell>
                          <TableCell className="font-mono text-sm text-[#737373]">
                            {event.userId}
                          </TableCell>
                          <TableCell>
                            <Badge className={`${config.bgColor} ${config.color} font-medium`}>
                              {config.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-[#737373] text-sm">
                            {event.details}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>

              {filteredMobileEvents.length === 0 && (
                <div className="text-center py-8 text-[#737373]">
                  <Activity className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <p>No se encontraron eventos</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin Panel Tab */}
        <TabsContent value="admin" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-white border-[#e5e5e5] shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#d4854a]">
                    <UserCog className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1a1a1a]">4</p>
                    <p className="text-sm text-[#737373]">Admins Activos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#e5e5e5] shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-600">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1a1a1a]">127</p>
                    <p className="text-sm text-[#737373]">Contenidos Creados</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#e5e5e5] shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-600">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1a1a1a]">45</p>
                    <p className="text-sm text-[#737373]">Retos Publicados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Audit Table */}
          <Card className="bg-white border-[#e5e5e5] shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#1a1a1a] text-lg">Registro de Auditoría</CardTitle>
              <CardDescription className="text-[#737373]">
                Historial de acciones realizadas por administradores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3]" />
                <Input
                  placeholder="Buscar por acción, detalle o ID..."
                  value={adminSearchQuery}
                  onChange={(e) => setAdminSearchQuery(e.target.value)}
                  className="pl-10 bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
                />
              </div>

              {/* Table */}
              <div className="border border-[#e5e5e5] rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#f8f6f3] hover:bg-[#f8f6f3]">
                      <TableHead className="text-[#737373] font-semibold">Fecha y Hora</TableHead>
                      <TableHead className="text-[#737373] font-semibold">ID de Admin</TableHead>
                      <TableHead className="text-[#737373] font-semibold">Acción Realizada</TableHead>
                      <TableHead className="text-[#737373] font-semibold">Detalles</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAdminLogs.map((log) => (
                      <TableRow key={log.id} className="hover:bg-[#f8f6f3]/50">
                        <TableCell className="text-[#1a1a1a] font-mono text-sm">
                          {log.timestamp}
                        </TableCell>
                        <TableCell className="font-mono text-sm text-[#737373]">
                          {log.adminId}
                        </TableCell>
                        <TableCell className="text-[#1a1a1a] font-medium">
                          {log.action}
                        </TableCell>
                        <TableCell className="text-[#737373] text-sm">
                          {log.details}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredAdminLogs.length === 0 && (
                <div className="text-center py-8 text-[#737373]">
                  <Monitor className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <p>No se encontraron registros</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
