"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Pencil, Trash2, UserPlus, ChevronLeft, Plus, Loader2 } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import {
  getCommunities, getCommunity, createCommunity, updateCommunity,
  deleteCommunity, addMember, removeMember, changeMemberAccess,
  changeMemberModerator,
} from "@/lib/communities"
import type { Community, Member } from "@/lib/communities"
import { getUsers } from "@/lib/users"

const accessLabels: Record<string, string> = {
  SOLO_VER: "solo ver",
  POSTEAR_COMENTAR: "postear y comentar",
  CHAT_COMPLETO: "chat completo",
}

const accessColors: Record<string, string> = {
  SOLO_VER: "bg-[#f0f0f0] text-[#737373] border-[#e5e5e5]",
  POSTEAR_COMENTAR: "bg-blue-100 text-blue-700 border-blue-200",
  CHAT_COMPLETO: "bg-green-100 text-green-700 border-green-200",
}

type MemberEnriched = Member & {
  nombre?: string
  email?: string
  estado?: string
}

type CommunityDetailEnriched = Omit<Community, 'miembros'> & {
  creado_por_nombre?: string
  miembros?: MemberEnriched[]
}

export default function ComunidadesPage() {
  const { isLoading: authLoading } = useAuth()

  const [communities, setCommunities] = useState<Community[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [viewingCommunity, setViewingCommunity] = useState<Community | null>(null)
  const [communityDetail, setCommunityDetail] = useState<CommunityDetailEnriched | null>(null)
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)

  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [showNewCommunityModal, setShowNewCommunityModal] = useState(false)
  const [showAccessModal, setShowAccessModal] = useState(false)
  const [showModModal, setShowModModal] = useState(false)

  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null)
  const [selectedMember, setSelectedMember] = useState<MemberEnriched | null>(null)

  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editActive, setEditActive] = useState(true)
  const [newName, setNewName] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [memberEmail, setMemberEmail] = useState("")
  const [memberAccess, setMemberAccess] = useState("POSTEAR_COMENTAR")
  const [memberIsMod, setMemberIsMod] = useState(false)
  const [selectedAccess, setSelectedAccess] = useState("POSTEAR_COMENTAR")
  const [selectedMod, setSelectedMod] = useState(false)

  const fetchCommunities = useCallback(async () => {
    setIsLoading(true)
    setError("")
    try {
      const data = await getCommunities()
      setCommunities(data)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al cargar comunidades.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!authLoading) fetchCommunities()
  }, [fetchCommunities, authLoading])

  const loadDetail = async (community: Community) => {
    setIsLoadingDetail(true)
    try {
      const [detail, allUsers] = await Promise.all([
        getCommunity(community.id),
        getUsers()
      ])
      const creadorNombre = allUsers.find(u => u.id === detail.creado_por)?.nombre || detail.creado_por
      const enriched: CommunityDetailEnriched = {
        ...detail,
        creado_por_nombre: creadorNombre,
        miembros: (detail.miembros || []).map(m => ({
          ...m,
          nombre: allUsers.find(u => u.id === m.usuario_id)?.nombre,
          email:  allUsers.find(u => u.id === m.usuario_id)?.email,
          estado: allUsers.find(u => u.id === m.usuario_id)?.estado,
        }))
      }
      setCommunityDetail(enriched)
    } catch {
      setError("Error al cargar los miembros.")
    } finally {
      setIsLoadingDetail(false)
    }
  }

  const openDetail = async (community: Community) => {
    setViewingCommunity(community)
    await loadDetail(community)
  }

  const refreshDetail = async () => {
    if (!viewingCommunity) return
    await loadDetail(viewingCommunity)
  }

  const handleCreateCommunity = async () => {
    setIsSubmitting(true)
    try {
      await createCommunity({ nombre: newName, descripcion: newDescription })
      await fetchCommunities()
      setShowNewCommunityModal(false)
      setNewName("")
      setNewDescription("")
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al crear comunidad.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateCommunity = async () => {
    if (!selectedCommunity) return
    setIsSubmitting(true)
    try {
      await updateCommunity(selectedCommunity.id, {
        nombre: editName,
        descripcion: editDescription,
        activa: editActive,
      })
      await fetchCommunities()
      setShowEditModal(false)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al actualizar comunidad.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteCommunity = async () => {
    if (!selectedCommunity) return
    setIsSubmitting(true)
    try {
      await deleteCommunity(selectedCommunity.id)
      await fetchCommunities()
      setShowDeleteModal(false)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al eliminar comunidad.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddMember = async () => {
    if (!viewingCommunity) return
    setIsSubmitting(true)
    try {
      await addMember(viewingCommunity.id, {
        email: memberEmail,
        tipoAcceso: memberAccess,
        esModerador: memberIsMod,
      })
      await refreshDetail()
      setShowAddMemberModal(false)
      setMemberEmail("")
      setMemberAccess("POSTEAR_COMENTAR")
      setMemberIsMod(false)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al agregar miembro.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChangeAccess = async () => {
    if (!viewingCommunity || !selectedMember) return
    setIsSubmitting(true)
    try {
      await changeMemberAccess(viewingCommunity.id, selectedMember.usuario_id, selectedAccess)
      await refreshDetail()
      setShowAccessModal(false)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al cambiar acceso.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChangeMod = async () => {
    if (!viewingCommunity || !selectedMember) return
    setIsSubmitting(true)
    try {
      await changeMemberModerator(viewingCommunity.id, selectedMember.usuario_id, selectedMod)
      await refreshDetail()
      setShowModModal(false)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al cambiar moderador.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemoveMember = async (member: MemberEnriched) => {
    if (!viewingCommunity) return
    try {
      await removeMember(viewingCommunity.id, member.usuario_id)
      await refreshDetail()
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al quitar miembro.")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#d4854a]" />
      </div>
    )
  }

  if (viewingCommunity) {
    const members = communityDetail?.miembros || []

    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => { setViewingCommunity(null); setCommunityDetail(null) }}
          className="text-[#737373] hover:text-[#1a1a1a] hover:bg-[#f8f6f3] gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver a comunidades
        </Button>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <Card className="bg-white border-[#e5e5e5] shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#1a1a1a]">{viewingCommunity.nombre}</CardTitle>
            <CardDescription className="text-[#737373]">{viewingCommunity.descripcion}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-[#f8f6f3] rounded-lg">
                <p className="text-sm text-[#a3a3a3]">Nombre</p>
                <p className="text-[#1a1a1a] font-medium">{viewingCommunity.nombre}</p>
              </div>
              <div className="p-4 bg-[#f8f6f3] rounded-lg">
                <p className="text-sm text-[#a3a3a3]">Estado</p>
                <Badge className={
                  viewingCommunity.activa
                    ? "bg-green-100 text-green-700 border-green-200 mt-1"
                    : "bg-[#f0f0f0] text-[#737373] border-[#e5e5e5] mt-1"
                }>
                  {viewingCommunity.activa ? "activa" : "inactiva"}
                </Badge>
              </div>
              <div className="p-4 bg-[#f8f6f3] rounded-lg">
                <p className="text-sm text-[#a3a3a3]">Creada por</p>
                <p className="text-[#1a1a1a] font-medium">
                  {communityDetail?.creado_por_nombre || viewingCommunity.creado_por}
                </p>
              </div>
              <div className="p-4 bg-[#f8f6f3] rounded-lg">
                <p className="text-sm text-[#a3a3a3]">Fecha de creación</p>
                <p className="text-[#1a1a1a] font-medium">
                  {viewingCommunity.created_at
                    ? new Date(viewingCommunity.created_at).toLocaleDateString("es-CO")
                    : "—"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#e5e5e5] shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-[#1a1a1a]">Miembros</CardTitle>
              <CardDescription className="text-[#737373]">
                {isLoadingDetail ? "Cargando..." : `${members.length} miembros en esta comunidad`}
              </CardDescription>
            </div>
            <Button
              onClick={() => setShowAddMemberModal(true)}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Agregar por correo
            </Button>
          </CardHeader>
          <CardContent>
            {isLoadingDetail ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-[#d4854a]" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-[#e5e5e5] hover:bg-transparent">
                    <TableHead className="text-[#737373]">Nombre</TableHead>
                    <TableHead className="text-[#737373]">Correo</TableHead>
                    <TableHead className="text-[#737373]">Tipo de acceso</TableHead>
                    <TableHead className="text-[#737373]">Moderador</TableHead>
                    <TableHead className="text-[#737373]">Se unió</TableHead>
                    <TableHead className="text-[#737373] text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-[#737373] py-8">
                        No hay miembros en esta comunidad
                      </TableCell>
                    </TableRow>
                  ) : (
                    members.map((member) => (
                      <TableRow key={member.id} className="border-[#e5e5e5] hover:bg-[#f8f6f3]">

                        {/* Nombre */}
                        <TableCell>
                          <div>
                            <p className="text-[#1a1a1a] font-medium text-sm">
                              {member.nombre || "—"}
                            </p>
                            {member.estado && member.estado !== "ACTIVO" && (
                              <Badge className={
                                member.estado === "SUSPENDIDO"
                                  ? "bg-yellow-100 text-yellow-700 border-yellow-200 text-xs mt-1"
                                  : "bg-red-100 text-red-700 border-red-200 text-xs mt-1"
                              }>
                                {member.estado.toLowerCase()}
                              </Badge>
                            )}
                          </div>
                        </TableCell>

                        {/* Correo */}
                        <TableCell className="text-[#737373] text-sm">
                          {member.email || "—"}
                        </TableCell>

                        {/* Tipo de acceso */}
                        <TableCell>
                          <Badge className={accessColors[member.tipo_acceso]}>
                            {accessLabels[member.tipo_acceso]}
                          </Badge>
                        </TableCell>

                        {/* Moderador */}
                        <TableCell>
                          <Badge className={
                            member.es_moderador
                              ? "bg-[#d4854a]/20 text-[#c07842] border-[#d4854a]/30"
                              : "bg-[#f0f0f0] text-[#a3a3a3] border-[#e5e5e5]"
                          }>
                            {member.es_moderador ? "sí" : "no"}
                          </Badge>
                        </TableCell>

                        {/* Se unió */}
                        <TableCell className="text-[#737373] text-sm">
                          {member.joined_at
                            ? new Date(member.joined_at).toLocaleDateString("es-CO")
                            : "—"}
                        </TableCell>

                        {/* Acciones */}
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedMember(member)
                                setSelectedAccess(member.tipo_acceso)
                                setShowAccessModal(true)
                              }}
                              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3]"
                            >
                              Acceso
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedMember(member)
                                setSelectedMod(member.es_moderador)
                                setShowModModal(true)
                              }}
                              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3]"
                            >
                              Mod.
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRemoveMember(member)}
                              className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                              Quitar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Add Member Modal */}
        <Dialog open={showAddMemberModal} onOpenChange={setShowAddMemberModal}>
          <DialogContent className="bg-white border-[#e5e5e5]">
            <DialogHeader>
              <DialogTitle className="text-[#1a1a1a]">Agregar miembro a la comunidad</DialogTitle>
              <DialogDescription className="text-[#737373]">
                Ingresa el correo del usuario que deseas agregar
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label className="text-[#1a1a1a]">Correo electrónico</Label>
                <Input
                  type="email"
                  placeholder="usuario@email.com"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#1a1a1a]">Tipo de acceso</Label>
                <Select value={memberAccess} onValueChange={setMemberAccess}>
                  <SelectTrigger className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#e5e5e5]">
                    <SelectItem value="SOLO_VER">Solo ver</SelectItem>
                    <SelectItem value="POSTEAR_COMENTAR">Postear y comentar</SelectItem>
                    <SelectItem value="CHAT_COMPLETO">Chat completo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="moderator"
                  checked={memberIsMod}
                  onCheckedChange={(v) => setMemberIsMod(v === true)}
                  className="border-[#e5e5e5] data-[state=checked]:bg-[#d4854a]"
                />
                <Label htmlFor="moderator" className="text-[#1a1a1a]">¿Es moderador?</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddMemberModal(false)}
                className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3]">
                Cancelar
              </Button>
              <Button onClick={handleAddMember} disabled={isSubmitting}
                className="bg-[#d4854a] hover:bg-[#c07842] text-white">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Agregar miembro"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Change Access Modal */}
        <Dialog open={showAccessModal} onOpenChange={setShowAccessModal}>
          <DialogContent className="bg-white border-[#e5e5e5]">
            <DialogHeader>
              <DialogTitle className="text-[#1a1a1a]">Cambiar tipo de acceso</DialogTitle>
              <DialogDescription className="text-[#737373]">
                {selectedMember?.nombre || selectedMember?.usuario_id}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Select value={selectedAccess} onValueChange={setSelectedAccess}>
                <SelectTrigger className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#e5e5e5]">
                  <SelectItem value="SOLO_VER">Solo ver</SelectItem>
                  <SelectItem value="POSTEAR_COMENTAR">Postear y comentar</SelectItem>
                  <SelectItem value="CHAT_COMPLETO">Chat completo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAccessModal(false)}
                className="border-[#e5e5e5] text-[#737373]">
                Cancelar
              </Button>
              <Button onClick={handleChangeAccess} disabled={isSubmitting}
                className="bg-[#d4854a] hover:bg-[#c07842] text-white">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirmar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Change Moderator Modal */}
        <Dialog open={showModModal} onOpenChange={setShowModModal}>
          <DialogContent className="bg-white border-[#e5e5e5]">
            <DialogHeader>
              <DialogTitle className="text-[#1a1a1a]">Cambiar rol de moderador</DialogTitle>
              <DialogDescription className="text-[#737373]">
                {selectedMember?.nombre || selectedMember?.usuario_id}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 flex items-center space-x-3">
              <Switch
                id="mod-switch"
                checked={selectedMod}
                onCheckedChange={setSelectedMod}
                className="data-[state=checked]:bg-[#d4854a]"
              />
              <Label htmlFor="mod-switch" className="text-[#1a1a1a]">
                {selectedMod ? "Es moderador" : "No es moderador"}
              </Label>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowModModal(false)}
                className="border-[#e5e5e5] text-[#737373]">
                Cancelar
              </Button>
              <Button onClick={handleChangeMod} disabled={isSubmitting}
                className="bg-[#d4854a] hover:bg-[#c07842] text-white">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirmar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // ── List view ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <Card className="bg-white border-[#e5e5e5] shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-[#1a1a1a]">Comunidades</CardTitle>
            <CardDescription className="text-[#737373]">
              {communities.length} comunidad{communities.length !== 1 ? "es" : ""} registrada{communities.length !== 1 ? "s" : ""}
            </CardDescription>
          </div>
          <Button
            onClick={() => setShowNewCommunityModal(true)}
            className="bg-[#d4854a] hover:bg-[#c07842] text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            Nueva comunidad
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[#e5e5e5] hover:bg-transparent">
                <TableHead className="text-[#737373]">Nombre</TableHead>
                <TableHead className="text-[#737373]">Descripción</TableHead>
                <TableHead className="text-[#737373]">Miembros</TableHead>
                <TableHead className="text-[#737373]">Estado</TableHead>
                <TableHead className="text-[#737373] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {communities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-[#737373] py-8">
                    No hay comunidades creadas todavía
                  </TableCell>
                </TableRow>
              ) : (
                communities.map((community) => (
                  <TableRow key={community.id} className="border-[#e5e5e5] hover:bg-[#f8f6f3]">
                    <TableCell className="text-[#1a1a1a] font-medium">{community.nombre}</TableCell>
                    <TableCell className="text-[#737373] max-w-xs truncate">
                      {community.descripcion || "—"}
                    </TableCell>
                    <TableCell className="text-[#737373]">{community.total_miembros ?? 0}</TableCell>
                    <TableCell>
                      <Badge className={
                        community.activa
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-[#f0f0f0] text-[#737373] border-[#e5e5e5]"
                      }>
                        {community.activa ? "activa" : "inactiva"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openDetail(community)}
                          className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] gap-1"
                        >
                          <Eye className="w-4 h-4" /> Ver
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedCommunity(community)
                            setEditName(community.nombre)
                            setEditDescription(community.descripcion || "")
                            setEditActive(community.activa)
                            setShowEditModal(true)
                          }}
                          className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] gap-1"
                        >
                          <Pencil className="w-4 h-4" /> Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedCommunity(community)
                            setShowDeleteModal(true)
                          }}
                          className="border-red-200 text-red-600 hover:bg-red-50 gap-1"
                        >
                          <Trash2 className="w-4 h-4" /> Eliminar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Community Modal */}
      <Dialog open={showNewCommunityModal} onOpenChange={setShowNewCommunityModal}>
        <DialogContent className="bg-white border-[#e5e5e5]">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a1a]">Crear nueva comunidad</DialogTitle>
            <DialogDescription className="text-[#737373]">
              Ingresa los datos de la nueva comunidad
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Nombre</Label>
              <Input
                placeholder="Nombre de la comunidad"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Descripción</Label>
              <Textarea
                placeholder="Descripción de la comunidad"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewCommunityModal(false)}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3]">
              Cancelar
            </Button>
            <Button onClick={handleCreateCommunity} disabled={isSubmitting}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Crear comunidad"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Community Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="bg-white border-[#e5e5e5]">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a1a]">Editar comunidad</DialogTitle>
            <DialogDescription className="text-[#737373]">
              Modifica los datos de la comunidad
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Nombre</Label>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Descripción</Label>
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-active"
                checked={editActive}
                onCheckedChange={setEditActive}
                className="data-[state=checked]:bg-[#d4854a]"
              />
              <Label htmlFor="edit-active" className="text-[#1a1a1a]">Comunidad activa</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3]">
              Cancelar
            </Button>
            <Button onClick={handleUpdateCommunity} disabled={isSubmitting}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Community Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="bg-white border-[#e5e5e5]">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a1a]">Eliminar comunidad</DialogTitle>
            <DialogDescription className="text-[#737373]">
              ¿Estás seguro de que deseas eliminar{" "}
              <strong className="text-[#1a1a1a]">{selectedCommunity?.nombre}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-700">
                Esta acción no se puede deshacer. Todos los miembros serán eliminados de la comunidad.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3]">
              Cancelar
            </Button>
            <Button onClick={handleDeleteCommunity} disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 text-white">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Eliminar comunidad"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}