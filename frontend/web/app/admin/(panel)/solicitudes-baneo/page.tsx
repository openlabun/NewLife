"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check, X, AlertTriangle, Shield, Building2, FileText, Loader2 } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { getBanRequests, resolveBanRequest } from "@/lib/ban-requests"
import type { BanRequestEnriched } from "@/lib/ban-requests"
import { getUsers } from "@/lib/users"
import { getCommunities } from "@/lib/communities"

export default function SolicitudesBaneoPage() {
  const { isLoading: authLoading } = useAuth()

  const [requests, setRequests] = useState<BanRequestEnriched[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<BanRequestEnriched | null>(null)

  const fetchRequests = useCallback(async () => {
    setIsLoading(true)
    setError("")
    try {
      const [rawRequests, allUsers, allCommunities] = await Promise.all([
        getBanRequests(true),
        getUsers(),
        getCommunities(),
      ])

      const enriched: BanRequestEnriched[] = rawRequests.map(r => {
        const usuario    = allUsers.find(u => u.id === r.usuario_id)
        const moderador  = allUsers.find(u => u.id === r.moderador_id)
        const comunidad  = allCommunities.find(c => c.id === r.comunidad_id)
        return {
          ...r,
          userName:       usuario?.nombre,
          userEmail:      usuario?.email,
          moderatorName:  moderador?.nombre,
          moderatorEmail: moderador?.email,
          communityName:  comunidad?.nombre,
        }
      })

      setRequests(enriched)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al cargar las solicitudes.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!authLoading) fetchRequests()
  }, [fetchRequests, authLoading])

  const handleApprove = async () => {
    if (!selectedRequest) return
    setIsSubmitting(true)
    try {
      await resolveBanRequest(selectedRequest._id, 'APROBADA')
      await fetchRequests()
      setShowApproveModal(false)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al aprobar el baneo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    if (!selectedRequest) return
    setIsSubmitting(true)
    try {
      await resolveBanRequest(selectedRequest._id, 'RECHAZADA')
      await fetchRequests()
      setShowRejectModal(false)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al rechazar la solicitud.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#d4854a]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Header */}
      <Card className="bg-white border-[#e5e5e5] shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#e8a84c]">
              <AlertTriangle className="w-5 h-5 text-[#1a1a1a]" />
            </div>
            <div>
              <p className="text-[#1a1a1a] font-medium">
                {requests.length} solicitud{requests.length !== 1 ? "es" : ""} pendiente{requests.length !== 1 ? "s" : ""} de revisión
              </p>
              <p className="text-sm text-[#737373]">
                Revisa cada caso y decide si aprobar o rechazar el baneo
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Empty state */}
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
            <Card key={request._id} className="bg-white border-[#e5e5e5] shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-[#1a1a1a] text-lg">
                      {request.userName || "Usuario desconocido"}
                    </CardTitle>
                    <CardDescription className="text-[#737373]">
                      {request.userEmail || request.usuario_id}
                    </CardDescription>
                  </div>
                  <span className="text-sm text-[#a3a3a3]">
                    {request.created_at
                      ? new Date(request.created_at).toLocaleDateString("es-CO")
                      : "—"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-[#f8f6f3] rounded-lg">
                    <Shield className="w-5 h-5 text-[#d4854a] flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-[#a3a3a3]">Reportado por</p>
                      <p className="text-[#1a1a1a] text-sm font-medium truncate">
                        {request.moderatorName || "Moderador"}
                      </p>
                      <p className="text-xs text-[#737373] truncate">
                        {request.moderatorEmail || request.moderador_id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#f8f6f3] rounded-lg">
                    <Building2 className="w-5 h-5 text-[#e8a84c] flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-[#a3a3a3]">Comunidad</p>
                      <p className="text-[#1a1a1a] text-sm font-medium truncate">
                        {request.communityName || request.comunidad_id}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#f8f6f3] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-[#a3a3a3]" />
                    <p className="text-xs text-[#a3a3a3] font-medium uppercase tracking-wide">
                      Motivo del reporte
                    </p>
                  </div>
                  <p className="text-[#525252] text-sm leading-relaxed">{request.motivo}</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => { setSelectedRequest(request); setShowApproveModal(true) }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Aprobar baneo
                  </Button>
                  <Button
                    onClick={() => { setSelectedRequest(request); setShowRejectModal(true) }}
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
              ¿Estás seguro de que deseas aprobar el baneo de{" "}
              <strong className="text-[#1a1a1a]">
                {selectedRequest?.userName || selectedRequest?.userEmail}
              </strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 bg-[#f8f6f3] rounded-lg border border-[#e5e5e5]">
              <p className="text-sm text-[#525252] mb-2">
                El usuario pasará automáticamente a estado{" "}
                <span className="text-red-600 font-medium">BANEADO</span> y no podrá acceder a la plataforma.
              </p>
              <p className="text-xs text-[#a3a3a3]">
                Esta acción puede revertirse cambiando el estado del usuario en la sección de gestión.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveModal(false)}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3]">
              Cancelar
            </Button>
            <Button onClick={handleApprove} disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Aprobar baneo"}
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
              ¿Estás seguro de que deseas rechazar la solicitud para{" "}
              <strong className="text-[#1a1a1a]">
                {selectedRequest?.userName || selectedRequest?.userEmail}
              </strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 bg-[#f8f6f3] rounded-lg border border-[#e5e5e5]">
              <p className="text-sm text-[#525252]">
                El usuario mantendrá su estado actual y podrá continuar utilizando la plataforma normalmente.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectModal(false)}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3]">
              Cancelar
            </Button>
            <Button onClick={handleReject} disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 text-white">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Rechazar solicitud"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}