"use client"

import { useState } from "react"
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
import { Check, X, AlertTriangle, Shield, Building2, FileText } from "lucide-react"

const banRequests = [
  { 
    id: 1,
    userEmail: "usuario.reportado1@email.com", 
    userName: "Juan Pérez",
    moderator: "mod_carlos@newlife.com", 
    moderatorName: "Carlos López",
    community: "Comunidad Bienestar",
    reason: "Comportamiento inapropiado y acoso repetido hacia otros miembros del grupo. Se le advirtió en múltiples ocasiones pero continuó con el comportamiento.",
    date: "18/03/2024"
  },
  { 
    id: 2,
    userEmail: "usuario.reportado2@email.com", 
    userName: "Ana Martínez",
    moderator: "mod_ana@newlife.com",
    moderatorName: "Ana García", 
    community: "Salud Mental",
    reason: "Spam repetitivo de enlaces externos y promoción de productos no relacionados con la comunidad.",
    date: "17/03/2024"
  },
  { 
    id: 3,
    userEmail: "usuario.reportado3@email.com", 
    userName: "Pedro Sánchez",
    moderator: "mod_luis@newlife.com", 
    moderatorName: "Luis Rodríguez",
    community: "Apoyo Familiar",
    reason: "Acoso sistemático a otros miembros de la comunidad, incluyendo mensajes privados no solicitados con contenido ofensivo.",
    date: "16/03/2024"
  },
]

export default function SolicitudesBaneoPage() {
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<typeof banRequests[0] | null>(null)
  const [requests, setRequests] = useState(banRequests)

  const openApproveModal = (request: typeof banRequests[0]) => {
    setSelectedRequest(request)
    setShowApproveModal(true)
  }

  const openRejectModal = (request: typeof banRequests[0]) => {
    setSelectedRequest(request)
    setShowRejectModal(true)
  }

  const handleApprove = () => {
    if (selectedRequest) {
      setRequests(requests.filter(r => r.id !== selectedRequest.id))
    }
    setShowApproveModal(false)
  }

  const handleReject = () => {
    if (selectedRequest) {
      setRequests(requests.filter(r => r.id !== selectedRequest.id))
    }
    setShowRejectModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white border-[#e5e5e5] shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#e8a84c]">
              <AlertTriangle className="w-5 h-5 text-[#1a1a1a]" />
            </div>
            <div>
              <p className="text-[#1a1a1a] font-medium">
                {requests.length} solicitudes pendientes de revisión
              </p>
              <p className="text-sm text-[#737373]">
                Revisa cada caso y decide si aprobar o rechazar el baneo
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ban Request Cards */}
      {requests.length === 0 ? (
        <Card className="bg-white border-[#e5e5e5] shadow-sm">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-[#1a1a1a] font-medium text-lg">No hay solicitudes pendientes</p>
            <p className="text-[#737373] mt-1">Todas las solicitudes han sido procesadas</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="bg-white border-[#e5e5e5] shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-[#1a1a1a] text-lg">{request.userName}</CardTitle>
                    <CardDescription className="text-[#737373]">
                      {request.userEmail}
                    </CardDescription>
                  </div>
                  <span className="text-sm text-[#a3a3a3]">{request.date}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-[#f8f6f3] rounded-lg">
                    <Shield className="w-5 h-5 text-[#d4854a]" />
                    <div>
                      <p className="text-xs text-[#a3a3a3]">Reportado por</p>
                      <p className="text-[#1a1a1a] text-sm">{request.moderatorName}</p>
                      <p className="text-xs text-[#737373]">{request.moderator}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#f8f6f3] rounded-lg">
                    <Building2 className="w-5 h-5 text-[#e8a84c]" />
                    <div>
                      <p className="text-xs text-[#a3a3a3]">Comunidad</p>
                      <p className="text-[#1a1a1a] text-sm">{request.community}</p>
                    </div>
                  </div>
                </div>

                {/* Reason */}
                <div className="p-4 bg-[#f8f6f3] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-[#a3a3a3]" />
                    <p className="text-xs text-[#a3a3a3] font-medium uppercase tracking-wide">Motivo del reporte</p>
                  </div>
                  <p className="text-[#525252] text-sm leading-relaxed">{request.reason}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => openApproveModal(request)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Aprobar baneo
                  </Button>
                  <Button
                    onClick={() => openRejectModal(request)}
                    variant="outline"
                    className="flex-1 border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a] gap-2"
                  >
                    <X className="w-4 h-4" />
                    Rechazar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Approve Modal */}
      <Dialog open={showApproveModal} onOpenChange={setShowApproveModal}>
        <DialogContent className="bg-white border-[#e5e5e5]">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a1a]">Confirmar baneo</DialogTitle>
            <DialogDescription className="text-[#737373]">
              ¿Estás seguro de que deseas aprobar el baneo de <strong className="text-[#1a1a1a]">{selectedRequest?.userName}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 bg-[#f8f6f3] rounded-lg border border-[#e5e5e5]">
              <p className="text-sm text-[#525252] mb-2">El usuario pasará automáticamente a estado <span className="text-red-600 font-medium">BANEADO</span> y no podrá acceder a la plataforma.</p>
              <p className="text-xs text-[#a3a3a3]">Esta acción puede ser revertida cambiando el estado del usuario en la sección de gestión.</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowApproveModal(false)}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Aprobar baneo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent className="bg-white border-[#e5e5e5]">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a1a]">Rechazar solicitud</DialogTitle>
            <DialogDescription className="text-[#737373]">
              ¿Estás seguro de que deseas rechazar la solicitud de baneo para <strong className="text-[#1a1a1a]">{selectedRequest?.userName}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 bg-[#f8f6f3] rounded-lg border border-[#e5e5e5]">
              <p className="text-sm text-[#525252]">El usuario mantendrá su estado actual y podrá continuar utilizando la plataforma normalmente.</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRejectModal(false)}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleReject}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Rechazar solicitud
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
