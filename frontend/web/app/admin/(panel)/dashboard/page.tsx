"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Building2, UserX, AlertCircle, Loader2, Check, X } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { getUsers } from "@/lib/users"
import { getCommunities } from "@/lib/communities"
import { getBanRequests, resolveBanRequest } from "@/lib/ban-requests"
import type { Community } from "@/lib/communities"
import type { User } from "@/lib/users"
import type { BanRequestEnriched } from "@/lib/ban-requests"

export default function DashboardPage() {
  const { isLoading: authLoading } = useAuth()

  const [users, setUsers] = useState<User[]>([])
  const [communities, setCommunities] = useState<Community[]>([])
  const [banRequests, setBanRequests] = useState<BanRequestEnriched[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchAll = useCallback(async () => {
    setIsLoading(true)
    setError("")
    try {
      const [usersData, communitiesData, rawBans] = await Promise.all([
        getUsers(),
        getCommunities(),
        getBanRequests(true),
      ])

      // Enriquecer baneos con nombres
      const enrichedBans: BanRequestEnriched[] = rawBans.map(r => {
        const usuario   = usersData.find(u => u.id === r.usuario_id)
        const moderador = usersData.find(u => u.id === r.moderador_id)
        const comunidad = communitiesData.find(c => c.id === r.comunidad_id)
        return {
          ...r,
          userName:      usuario?.nombre,
          userEmail:     usuario?.email,
          moderatorName: moderador?.nombre,
          communityName: comunidad?.nombre,
        }
      })

      setUsers(usersData)
      setCommunities(communitiesData)
      setBanRequests(enrichedBans)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al cargar el dashboard.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!authLoading) fetchAll()
  }, [fetchAll, authLoading])

  const handleResolveBan = async (id: string, decision: 'APROBADA' | 'RECHAZADA') => {
    try {
      await resolveBanRequest(id, decision)
      await fetchAll()
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al procesar la solicitud.")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#d4854a]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
        {error}
      </div>
    )
  }

  const totalUsuarios      = users.length
  const comunidadesActivas = communities.filter(c => c.activa).length
  const suspendidos        = users.filter(u => u.estado === "SUSPENDIDO").length
  const baneosPendientes   = banRequests.length

  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const usersThisWeek = users.filter(u => {
    if (!u.created_at) return false
    return new Date(u.created_at) >= oneWeekAgo
  }).length

  const metrics = [
    {
      title:    "Usuarios totales",
      value:    totalUsuarios.toLocaleString(),
      subtitle: usersThisWeek > 0 ? `+${usersThisWeek} esta semana` : "Sin registros esta semana",
      icon:     Users,
      color:    "bg-[#d4854a]",
    },
    {
      title:    "Comunidades activas",
      value:    comunidadesActivas.toString(),
      subtitle: "Comunidades disponibles",
      icon:     Building2,
      color:    "bg-[#e8a84c]",
    },
    {
      title:    "Suspendidos activos",
      value:    suspendidos.toString(),
      subtitle: suspendidos === 0 ? "Sin suspensiones activas" : "Con acceso restringido",
      icon:     UserX,
      color:    "bg-[#737373]",
    },
    {
      title:    "Baneos pendientes",
      value:    baneosPendientes.toString(),
      subtitle: baneosPendientes === 0 ? "Sin solicitudes pendientes" : "Requieren atención",
      icon:     AlertCircle,
      color:    baneosPendientes > 0 ? "bg-red-500" : "bg-[#737373]",
    },
  ]

  const recentCommunities = communities.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="bg-white border-[#e5e5e5] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#737373]">{metric.title}</p>
                  <p className="text-3xl font-bold text-[#1a1a1a] mt-1">{metric.value}</p>
                  <p className="text-xs text-[#a3a3a3] mt-1">{metric.subtitle}</p>
                </div>
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  <metric.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Communities */}
        <Card className="bg-white border-[#e5e5e5] shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#1a1a1a]">Comunidades recientes</CardTitle>
            <CardDescription className="text-[#737373]">
              Últimas comunidades registradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentCommunities.length === 0 ? (
              <p className="text-sm text-[#a3a3a3] text-center py-6">
                No hay comunidades creadas todavía
              </p>
            ) : (
              <div className="space-y-3">
                {recentCommunities.map((community) => (
                  <div key={community.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#f8f6f3] hover:bg-[#f0ece6] transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#1a1a1a] truncate">{community.nombre}</p>
                      <p className="text-sm text-[#a3a3a3]">
                        {community.total_miembros ?? 0} miembros
                        {(community.total_moderadores ?? 0) > 0
                          ? ` · ${community.total_moderadores} moderadores`
                          : ""}
                      </p>
                    </div>
                    <Badge className={
                      community.activa
                        ? "bg-green-100 text-green-700 border-green-200 ml-3"
                        : "bg-[#f0f0f0] text-[#737373] border-[#e5e5e5] ml-3"
                    }>
                      {community.activa ? "activa" : "inactiva"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Ban Requests */}
        <Card className="bg-white border-[#e5e5e5] shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#1a1a1a]">Solicitudes de baneo pendientes</CardTitle>
            <CardDescription className="text-[#737373]">
              Requieren revisión y aprobación
            </CardDescription>
          </CardHeader>
          <CardContent>
            {banRequests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="p-3 rounded-full bg-green-100 mb-3">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm font-medium text-[#737373]">Sin solicitudes pendientes</p>
                <p className="text-xs text-[#a3a3a3] mt-1">Todas las solicitudes están al día</p>
              </div>
            ) : (
              <div className="space-y-3">
                {banRequests.slice(0, 3).map((ban) => (
                  <div key={ban._id} className="p-3 rounded-lg bg-[#f8f6f3] border border-[#e5e5e5]">
                    <div className="mb-2">
                      <p className="font-medium text-[#1a1a1a] text-sm">
                        {ban.userName || ban.userEmail || ban.usuario_id}
                      </p>
                      <p className="text-xs text-[#a3a3a3]">
                        {ban.moderatorName && `Mod. ${ban.moderatorName}`}
                        {ban.communityName && ` · ${ban.communityName}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm"
                        onClick={() => handleResolveBan(ban._id, 'APROBADA')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-1 h-7 text-xs">
                        <Check className="w-3 h-3" /> Aprobar
                      </Button>
                      <Button size="sm" variant="outline"
                        onClick={() => handleResolveBan(ban._id, 'RECHAZADA')}
                        className="flex-1 border-[#e5e5e5] text-[#737373] hover:bg-[#f0f0f0] gap-1 h-7 text-xs">
                        <X className="w-3 h-3" /> Rechazar
                      </Button>
                    </div>
                  </div>
                ))}
                {banRequests.length > 3 && (
                  <p className="text-xs text-[#a3a3a3] text-center pt-1">
                    +{banRequests.length - 3} más en solicitudes de baneo
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}