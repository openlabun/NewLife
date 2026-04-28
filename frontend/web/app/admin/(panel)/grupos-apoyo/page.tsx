"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"
import {
  Pencil, Plus, Trash2, Search, HeartHandshake, MapPin, Phone,
  Mail, Globe, Instagram, Facebook, MessageCircle, X, Copy, Loader2, AlertCircle
} from "lucide-react"

// Importar servicios
import { getGrupos, createGrupo, updateGrupo, deleteGrupo } from "@/lib/grupos"

type GroupStatus = "ACTIVE" | "INACTIVE"

interface SupportGroup {
  id: string
  name: string
  shortDescription: string
  longDescription?: string
  address: string
  locationName: string
  email: string
  website?: string
  instagram?: string
  facebook?: string
  community?: string
  logoUrl?: string
  phones: string[]
  whatsapps: string[]
  status: GroupStatus
  createdAt: string
}

const emptyFormData = {
  name: "",
  shortDescription: "",
  longDescription: "",
  address: "",
  locationName: "",
  email: "",
  website: "",
  instagram: "",
  facebook: "",
  community: "",
  logoUrl: "",
  phones: [] as string[],
  whatsapps: [] as string[],
  status: "ACTIVE" as GroupStatus,
}

export default function GruposApoyoPage() {
  const [groups, setGroups] = useState<SupportGroup[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formError, setFormError] = useState("")

  const [showModal, setShowModal] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<SupportGroup | null>(null)
  const [editingGroup, setEditingGroup] = useState<SupportGroup | null>(null)
  const [deleteGroupState, setDeleteGroupState] = useState<SupportGroup | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState(emptyFormData)
  const [phoneInput, setPhoneInput] = useState("")
  const [whatsappInput, setWhatsappInput] = useState("")

  // --- INTEGRACIÓN: Cargar Grupos ---
  const loadGroups = async () => {
    try {
      setIsLoadingData(true)
      const data = await getGrupos()
      
      const mapped: SupportGroup[] = data.map((item: any) => {
        // Truco para separar la descripción larga de la corta si se guardaron juntas
        const descParts = item.descripcion ? item.descripcion.split('\n\n---LONG---\n\n') : [""]
        
        return {
          id: item.grupo_id || item.id,
          name: item.nombre,
          shortDescription: descParts[0],
          longDescription: descParts[1] || "",
          address: item.direccion || "",
          locationName: item.lugar || "",
          email: item.email || "",
          website: item.sitio_web || "",
          instagram: item.instagram || "",
          facebook: item.facebook || "",
          community: item.comunidad_url || "",
          logoUrl: item.logo_url || "",
          phones: item.telefonos || [],
          whatsapps: item.whatsapp || [],
          status: item.estado,
          createdAt: item.fecha_creacion || new Date().toISOString()
        }
      })
      setGroups(mapped)
    } catch (error) {
      console.error("Error al cargar grupos:", error)
    } finally {
      setIsLoadingData(false)
    }
  }

  useEffect(() => {
    loadGroups()
  }, [])

  const filteredGroups = groups.filter(
    (g) =>
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.locationName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openDetailDialog = (group: SupportGroup) => {
    setSelectedGroup(group)
    setShowDetailDialog(true)
  }

  const openCreateModal = () => {
    setFormError("")
    setEditingGroup(null)
    setFormData(emptyFormData)
    setPhoneInput("")
    setWhatsappInput("")
    setShowModal(true)
  }

  const openEditModal = (group: SupportGroup) => {
    setFormError("")
    setEditingGroup(group)
    setFormData({
      name: group.name,
      shortDescription: group.shortDescription,
      longDescription: group.longDescription || "",
      address: group.address,
      locationName: group.locationName,
      email: group.email,
      website: group.website || "",
      instagram: group.instagram || "",
      facebook: group.facebook || "",
      community: group.community || "",
      logoUrl: group.logoUrl || "",
      phones: group.phones,
      whatsapps: group.whatsapps,
      status: group.status,
    })
    setPhoneInput("")
    setWhatsappInput("")
    setShowDetailDialog(false)
    setShowModal(true)
  }

  // --- INTEGRACIÓN: Crear / Editar Grupo ---
  const handleSave = async () => {
    setFormError("")
    setIsSaving(true)

    // Unir ambas descripciones para el backend si existe la larga
    const combinedDescription = formData.longDescription 
      ? `${formData.shortDescription}\n\n---LONG---\n\n${formData.longDescription}`
      : formData.shortDescription;

    const payload = {
      nombre: formData.name,
      descripcion: combinedDescription,
      direccion: formData.address || undefined,
      lugar: formData.locationName || undefined,
      email: formData.email || undefined,
      sitio_web: formData.website || undefined,
      instagram: formData.instagram || undefined,
      facebook: formData.facebook || undefined,
      telefonos: formData.phones,
      whatsapp: formData.whatsapps,
      comunidad_url: formData.community || undefined,
      logo_url: formData.logoUrl || undefined,
      estado: formData.status
    }

    try {
      if (editingGroup) {
        await updateGrupo(editingGroup.id, payload)
      } else {
        await createGrupo(payload)
      }
      
      await loadGroups()
      setShowModal(false)
      setFormData(emptyFormData)
      setEditingGroup(null)
    } catch (error: any) {
      console.error("Error al guardar grupo:", error)
      setFormError("Hubo un error de conexión al guardar el grupo. Inténtalo de nuevo.")
    } finally {
      setIsSaving(false)
    }
  }

  // --- INTEGRACIÓN: Eliminar Grupo ---
  const handleDelete = async () => {
    if (deleteGroupState) {
      setIsDeleting(true)
      try {
        await deleteGrupo(deleteGroupState.id)
        await loadGroups()
        setDeleteGroupState(null)
        setShowDetailDialog(false)
        setSelectedGroup(null)
      } catch (error) {
        console.error("Error al eliminar grupo:", error)
        alert("Hubo un error al eliminar el grupo.")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const addPhone = () => {
    if (phoneInput.trim() && !formData.phones.includes(phoneInput.trim())) {
      setFormData({ ...formData, phones: [...formData.phones, phoneInput.trim()] })
      setPhoneInput("")
    }
  }

  const removePhone = (phone: string) => {
    setFormData({ ...formData, phones: formData.phones.filter((p) => p !== phone) })
  }

  const addWhatsapp = () => {
    if (whatsappInput.trim() && !formData.whatsapps.includes(whatsappInput.trim())) {
      setFormData({ ...formData, whatsapps: [...formData.whatsapps, whatsappInput.trim()] })
      setWhatsappInput("")
    }
  }

  const removeWhatsapp = (wa: string) => {
    setFormData({ ...formData, whatsapps: formData.whatsapps.filter((w) => w !== wa) })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (isLoadingData) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#d4854a] animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white border-[#e5e5e5] shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#d4854a]">
                <HeartHandshake className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">{groups.length}</p>
                <p className="text-sm text-[#737373]">Total de grupos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-[#e5e5e5] shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-600">
                <HeartHandshake className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">
                  {groups.filter((g) => g.status === "ACTIVE").length}
                </p>
                <p className="text-sm text-[#737373]">Grupos activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <Card className="bg-white border-[#e5e5e5] shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-[#1a1a1a]">Grupos de Apoyo</CardTitle>
            <CardDescription className="text-[#737373]">
              Directorio de grupos y comunidades de apoyo
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3]" />
              <Input
                placeholder="Buscar grupo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3] w-full sm:w-64"
              />
            </div>
            <Button
              onClick={openCreateModal}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white gap-2"
            >
              <Plus className="w-4 h-4" />
              Nuevo grupo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGroups.map((group) => (
              <Card
                key={group.id}
                onClick={() => openDetailDialog(group)}
                className="bg-white border-[#e5e5e5] shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#f8f6f3] flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {group.logoUrl ? (
                        <img
                          src={group.logoUrl}
                          alt={group.name}
                          className="w-full h-full object-cover"
                          crossOrigin="anonymous"
                        />
                      ) : (
                        <HeartHandshake className="w-7 h-7 text-[#d4854a]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-[#1a1a1a] line-clamp-1 group-hover:text-[#d4854a] transition-colors">
                          {group.name}
                        </h3>
                        <Badge
                          className={
                            group.status === "ACTIVE"
                              ? "bg-green-100 text-green-700 border-green-200 flex-shrink-0"
                              : "bg-[#e5e5e5] text-[#737373] border-[#e5e5e5] flex-shrink-0"
                          }
                        >
                          {group.status === "ACTIVE" ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#737373] line-clamp-2 mt-1">
                        {group.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-[#737373]">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{group.locationName}</span>
                    </div>
                    {group.email && (
                      <div className="flex items-center gap-2 text-sm text-[#737373]">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{group.email}</span>
                      </div>
                    )}
                    {group.phones && group.phones.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-[#737373]">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{group.phones[0]}</span>
                        {group.phones.length > 1 && (
                          <span className="text-xs text-[#a3a3a3]">+{group.phones.length - 1}</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Social Links Preview */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#e5e5e5]">
                    {group.website && (
                      <div className="w-8 h-8 rounded-full bg-[#f8f6f3] flex items-center justify-center">
                        <Globe className="w-4 h-4 text-[#737373]" />
                      </div>
                    )}
                    {group.instagram && (
                      <div className="w-8 h-8 rounded-full bg-[#f8f6f3] flex items-center justify-center">
                        <Instagram className="w-4 h-4 text-[#737373]" />
                      </div>
                    )}
                    {group.facebook && (
                      <div className="w-8 h-8 rounded-full bg-[#f8f6f3] flex items-center justify-center">
                        <Facebook className="w-4 h-4 text-[#737373]" />
                      </div>
                    )}
                    {group.community && (
                      <div className="w-8 h-8 rounded-full bg-[#f8f6f3] flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-[#737373]" />
                      </div>
                    )}
                    {group.whatsapps && group.whatsapps.length > 0 && (
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-green-600" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGroups.length === 0 && (
            <div className="text-center py-12 text-[#737373]">
              <HeartHandshake className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No se encontraron grupos de apoyo</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="bg-white border-[#e5e5e5] max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedGroup?.name}</DialogTitle>
            <DialogDescription>Detalles del grupo de apoyo</DialogDescription>
          </DialogHeader>
          {selectedGroup && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#f8f6f3] flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {selectedGroup.logoUrl ? (
                    <img
                      src={selectedGroup.logoUrl}
                      alt={selectedGroup.name}
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <HeartHandshake className="w-8 h-8 text-[#d4854a]" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-[#1a1a1a]">{selectedGroup.name}</h2>
                    <Badge
                      className={
                        selectedGroup.status === "ACTIVE"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-[#e5e5e5] text-[#737373] border-[#e5e5e5]"
                      }
                    >
                      {selectedGroup.status === "ACTIVE" ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#737373] mt-1">{selectedGroup.shortDescription}</p>
                </div>
              </div>

              {/* Long Description */}
              {selectedGroup.longDescription && (
                <div>
                  <h3 className="text-sm font-semibold text-[#1a1a1a] mb-2">Acerca del grupo</h3>
                  <p className="text-sm text-[#737373] leading-relaxed whitespace-pre-line">
                    {selectedGroup.longDescription}
                  </p>
                </div>
              )}

              <Separator className="bg-[#e5e5e5]" />

              {/* Location */}
              <div>
                <h3 className="text-sm font-semibold text-[#1a1a1a] mb-3">Ubicación</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#f8f6f3]">
                    <MapPin className="w-5 h-5 text-[#d4854a] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#1a1a1a]">{selectedGroup.locationName}</p>
                      <p className="text-sm text-[#737373]">{selectedGroup.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-sm font-semibold text-[#1a1a1a] mb-3">Contacto</h3>
                <div className="space-y-2">
                  {selectedGroup.email && (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#f8f6f3]">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-[#d4854a]" />
                        <span className="text-sm text-[#1a1a1a]">{selectedGroup.email}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(selectedGroup.email)}
                        className="h-8 w-8 p-0 text-[#737373] hover:text-[#1a1a1a]"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {/* Phones */}
                  {selectedGroup.phones && selectedGroup.phones.length > 0 && (
                    <div className="space-y-2">
                      {selectedGroup.phones.map((phone, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-[#f8f6f3]"
                        >
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-[#d4854a]" />
                            <span className="text-sm text-[#1a1a1a]">{phone}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(phone)}
                            className="h-8 w-8 p-0 text-[#737373] hover:text-[#1a1a1a]"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* WhatsApps */}
                  {selectedGroup.whatsapps && selectedGroup.whatsapps.length > 0 && (
                    <div className="space-y-2">
                      {selectedGroup.whatsapps.map((wa, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-green-50"
                        >
                          <div className="flex items-center gap-3">
                            <MessageCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm text-[#1a1a1a]">{wa}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(wa)}
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-100"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Social Links */}
              {(selectedGroup.website || selectedGroup.instagram || selectedGroup.facebook || selectedGroup.community) && (
                <div>
                  <h3 className="text-sm font-semibold text-[#1a1a1a] mb-3">Redes y enlaces</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedGroup.website && (
                      <a
                        href={selectedGroup.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#f8f6f3] hover:bg-[#d4854a]/10 flex items-center justify-center transition-colors"
                        title="Sitio web"
                      >
                        <Globe className="w-5 h-5 text-[#737373] hover:text-[#d4854a]" />
                      </a>
                    )}
                    {selectedGroup.instagram && (
                      <a
                        href={selectedGroup.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#f8f6f3] hover:bg-pink-100 flex items-center justify-center transition-colors"
                        title="Instagram"
                      >
                        <Instagram className="w-5 h-5 text-[#737373] hover:text-pink-600" />
                      </a>
                    )}
                    {selectedGroup.facebook && (
                      <a
                        href={selectedGroup.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#f8f6f3] hover:bg-blue-100 flex items-center justify-center transition-colors"
                        title="Facebook"
                      >
                        <Facebook className="w-5 h-5 text-[#737373] hover:text-blue-600" />
                      </a>
                    )}
                    {selectedGroup.community && (
                      <a
                        href={selectedGroup.community}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#f8f6f3] hover:bg-[#d4854a]/10 flex items-center justify-center transition-colors"
                        title="Comunidad"
                      >
                        <MessageCircle className="w-5 h-5 text-[#737373] hover:text-[#d4854a]" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-[#e5e5e5]">
                <Button
                  onClick={() => openEditModal(selectedGroup)}
                  className="flex-1 bg-[#d4854a] hover:bg-[#c07842] text-white gap-2"
                >
                  <Pencil className="w-4 h-4" />
                  Editar
                </Button>
                <Button
                  onClick={() => setDeleteGroupState(selectedGroup)}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-white border-[#e5e5e5] max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a1a]">
              {editingGroup ? "Editar grupo de apoyo" : "Nuevo grupo de apoyo"}
            </DialogTitle>
            <DialogDescription className="text-[#737373]">
              {editingGroup
                ? "Modifica la información del grupo"
                : "Completa los campos para registrar un nuevo grupo"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {formError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p>{formError}</p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Info */}
              <div className="space-y-2 md:col-span-2">
                <Label className="text-[#1a1a1a]">Nombre del grupo *</Label>
                <Input
                  placeholder="Nombre del grupo de apoyo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-[#1a1a1a]">Descripción corta *</Label>
                <Textarea
                  placeholder="Breve descripción del grupo..."
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3] min-h-20"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-[#1a1a1a]">Descripción larga (opcional)</Label>
                <Textarea
                  placeholder="Descripción detallada del grupo, historia, misión..."
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3] min-h-32"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-[#1a1a1a]">Dirección física</Label>
                <Input
                  placeholder="Calle, número, colonia, ciudad, CP..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#1a1a1a]">Nombre del lugar</Label>
                <Input
                  placeholder="Ej: Centro Comunitario..."
                  value={formData.locationName}
                  onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                  className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#1a1a1a]">Email</Label>
                <Input
                  type="email"
                  placeholder="contacto@grupo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#1a1a1a]">Logo URL (opcional)</Label>
                <Input
                  type="url"
                  placeholder="https://..."
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#1a1a1a]">Estado *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: GroupStatus) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#e5e5e5]">
                    <SelectItem value="ACTIVE" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">
                      Activo
                    </SelectItem>
                    <SelectItem value="INACTIVE" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">
                      Inactivo
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Social Links */}
              <div className="md:col-span-2 p-4 rounded-lg bg-[#f8f6f3] space-y-4">
                <h3 className="font-semibold text-[#1a1a1a]">Redes Sociales y Enlaces (URLs completas)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[#1a1a1a]">Sitio Web</Label>
                    <Input
                      type="url"
                      placeholder="https://mi-sitio.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="bg-white border-[#e5e5e5] text-[#1a1a1a]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#1a1a1a]">Instagram (URL completa)</Label>
                    <Input
                      type="url"
                      placeholder="https://instagram.com/mi_grupo"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      className="bg-white border-[#e5e5e5] text-[#1a1a1a]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#1a1a1a]">Facebook (URL completa)</Label>
                    <Input
                      type="url"
                      placeholder="https://facebook.com/mi_pagina"
                      value={formData.facebook}
                      onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                      className="bg-white border-[#e5e5e5] text-[#1a1a1a]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#1a1a1a]">Comunidad (Discord/Telegram)</Label>
                    <Input
                      type="url"
                      placeholder="https://t.me/mi_grupo"
                      value={formData.community}
                      onChange={(e) => setFormData({ ...formData, community: e.target.value })}
                      className="bg-white border-[#e5e5e5] text-[#1a1a1a]"
                    />
                  </div>
                </div>
              </div>

              {/* Phones */}
              <div className="space-y-2">
                <Label className="text-[#1a1a1a]">Teléfonos</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="+52 55 1234 5678"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addPhone())}
                    className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]"
                  />
                  <Button
                    type="button"
                    onClick={addPhone}
                    variant="outline"
                    className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3]"
                  >
                    Añadir
                  </Button>
                </div>
                {formData.phones.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.phones.map((phone) => (
                      <Badge
                        key={phone}
                        className="bg-[#d4854a]/10 text-[#d4854a] hover:bg-[#d4854a]/20 gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        {phone}
                        <button
                          type="button"
                          onClick={() => removePhone(phone)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* WhatsApps */}
              <div className="space-y-2">
                <Label className="text-[#1a1a1a]">WhatsApp</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="+52 55 1234 5678"
                    value={whatsappInput}
                    onChange={(e) => setWhatsappInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addWhatsapp())}
                    className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]"
                  />
                  <Button
                    type="button"
                    onClick={addWhatsapp}
                    variant="outline"
                    className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3]"
                  >
                    Añadir
                  </Button>
                </div>
                {formData.whatsapps.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.whatsapps.map((wa) => (
                      <Badge
                        key={wa}
                        className="bg-green-100 text-green-700 hover:bg-green-200 gap-1"
                      >
                        <MessageCircle className="w-3 h-3" />
                        {wa}
                        <button
                          type="button"
                          onClick={() => removeWhatsapp(wa)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowModal(false)}
              disabled={isSaving}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || !formData.name.trim() || !formData.shortDescription.trim()}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {editingGroup ? "Guardar cambios" : "Crear grupo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteGroupState} onOpenChange={() => setDeleteGroupState(null)}>
        <AlertDialogContent className="bg-white border-[#e5e5e5]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#1a1a1a]">¿Eliminar grupo?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#737373]">
              Esta acción no se puede deshacer. El grupo &quot;{deleteGroupState?.name}&quot; será
              eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}