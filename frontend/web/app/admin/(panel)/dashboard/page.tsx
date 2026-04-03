"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Building2, UserX, AlertCircle, Check, X } from "lucide-react"

const metrics = [
  {
    title: "Usuarios totales",
    value: "2,847",
    subtitle: "+12 esta semana",
    icon: Users,
    color: "bg-[#d4854a]",
  },
  {
    title: "Comunidades activas",
    value: "48",
    subtitle: "2 nuevas este mes",
    icon: Building2,
    color: "bg-[#e8a84c]",
  },
  {
    title: "Suspendidos activos",
    value: "15",
    subtitle: "3 vencen pronto",
    icon: UserX,
    color: "bg-[#737373]",
  },
  {
    title: "Baneos pendientes",
    value: "3",
    subtitle: "Requieren atención",
    icon: AlertCircle,
    color: "bg-red-500",
  },
]

const recentCommunities = [
  { name: "Comunidad Bienestar", members: 234, moderators: 3, status: "activa" },
  { name: "Salud Mental", members: 189, moderators: 2, status: "activa" },
  { name: "Apoyo Familiar", members: 145, moderators: 2, status: "activa" },
  { name: "Meditación Diaria", members: 98, moderators: 1, status: "inactiva" },
  { name: "Nutrición Consciente", members: 76, moderators: 1, status: "activa" },
]

const pendingBans = [
  { 
    userEmail: "usuario.reportado1@email.com", 
    moderator: "mod_carlos@newlife.com", 
    community: "Comunidad Bienestar",
    reason: "Comportamiento inapropiado"
  },
  { 
    userEmail: "usuario.reportado2@email.com", 
    moderator: "mod_ana@newlife.com", 
    community: "Salud Mental",
    reason: "Spam repetitivo"
  },
  { 
    userEmail: "usuario.reportado3@email.com", 
    moderator: "mod_luis@newlife.com", 
    community: "Apoyo Familiar",
    reason: "Acoso a otros miembros"
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
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

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Communities */}
        <Card className="bg-white border-[#e5e5e5] shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#1a1a1a]">Comunidades recientes</CardTitle>
            <CardDescription className="text-[#737373]">
              Últimas comunidades con actividad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCommunities.map((community, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#f8f6f3] hover:bg-[#f0ece6] transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-[#1a1a1a]">{community.name}</p>
                    <p className="text-sm text-[#a3a3a3]">
                      {community.members} miembros · {community.moderators} moderadores
                    </p>
                  </div>
                  <Badge
                    className={
                      community.status === "activa"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-[#f0f0f0] text-[#737373] border-[#e5e5e5]"
                    }
                  >
                    {community.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Bans */}
        <Card className="bg-white border-[#e5e5e5] shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#1a1a1a]">Solicitudes de baneo pendientes</CardTitle>
            <CardDescription className="text-[#737373]">
              Requieren revisión y aprobación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingBans.map((ban, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-[#f8f6f3] border border-[#e5e5e5]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-[#1a1a1a]">{ban.userEmail}</p>
                      <p className="text-sm text-[#a3a3a3]">
                        Reportado por: {ban.moderator}
                      </p>
                      <p className="text-sm text-[#a3a3a3]">
                        Comunidad: {ban.community}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white gap-1 flex-1"
                    >
                      <Check className="w-4 h-4" />
                      Aprobar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#e5e5e5] text-[#737373] hover:bg-[#f0f0f0] hover:text-[#1a1a1a] gap-1 flex-1"
                    >
                      <X className="w-4 h-4" />
                      Rechazar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
