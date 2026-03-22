"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye, Pencil, Trash2, UserPlus, ChevronLeft, Plus } from "lucide-react"

const communities = [
  { 
    id: 1, 
    name: "Comunidad Bienestar", 
    description: "Espacio para compartir tips de bienestar y salud mental",
    members: 234, 
    status: "activa",
    createdBy: "Admin Principal",
    createdAt: "15/01/2024"
  },
  { 
    id: 2, 
    name: "Salud Mental", 
    description: "Apoyo y recursos para la salud mental",
    members: 189, 
    status: "activa",
    createdBy: "Admin Principal",
    createdAt: "20/01/2024"
  },
  { 
    id: 3, 
    name: "Apoyo Familiar", 
    description: "Red de apoyo para familias",
    members: 145, 
    status: "activa",
    createdBy: "Super Admin",
    createdAt: "25/01/2024"
  },
  { 
    id: 4, 
    name: "Meditación Diaria", 
    description: "Práctica diaria de meditación guiada",
    members: 98, 
    status: "inactiva",
    createdBy: "Admin Principal",
    createdAt: "01/02/2024"
  },
  { 
    id: 5, 
    name: "Nutrición Consciente", 
    description: "Consejos de nutrición y alimentación saludable",
    members: 76, 
    status: "activa",
    createdBy: "Super Admin",
    createdAt: "10/02/2024"
  },
]

const communityMembers = [
  { id: 1, name: "María García", email: "maria.garcia@email.com", access: "CHAT_COMPLETO", isModerator: true },
  { id: 2, name: "Carlos López", email: "carlos.lopez@email.com", access: "POSTEAR_COMENTAR", isModerator: true },
  { id: 3, name: "Ana Martínez", email: "ana.martinez@email.com", access: "CHAT_COMPLETO", isModerator: false },
  { id: 4, name: "Luis Rodríguez", email: "luis.rodriguez@email.com", access: "SOLO_VER", isModerator: false },
  { id: 5, name: "Sofia Hernández", email: "sofia.hernandez@email.com", access: "POSTEAR_COMENTAR", isModerator: false },
]

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

export default function ComunidadesPage() {
  const [viewingCommunity, setViewingCommunity] = useState<typeof communities[0] | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [showNewCommunityModal, setShowNewCommunityModal] = useState(false)
  const [showAccessModal, setShowAccessModal] = useState(false)
  const [selectedCommunity, setSelectedCommunity] = useState<typeof communities[0] | null>(null)
  const [selectedMember, setSelectedMember] = useState<typeof communityMembers[0] | null>(null)
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editActive, setEditActive] = useState(true)

  const openEditModal = (community: typeof communities[0]) => {
    setSelectedCommunity(community)
    setEditName(community.name)
    setEditDescription(community.description)
    setEditActive(community.status === "activa")
    setShowEditModal(true)
  }

  const openDeleteModal = (community: typeof communities[0]) => {
    setSelectedCommunity(community)
    setShowDeleteModal(true)
  }

  const openAccessModal = (member: typeof communityMembers[0]) => {
    setSelectedMember(member)
    setShowAccessModal(true)
  }

  if (viewingCommunity) {
    return (
      <div className="space-y-6">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => setViewingCommunity(null)}
          className="text-[#737373] hover:text-[#1a1a1a] hover:bg-[#f8f6f3] gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver a comunidades
        </Button>

        {/* Community Details */}
        <Card className="bg-white border-[#e5e5e5] shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#1a1a1a]">{viewingCommunity.name}</CardTitle>
            <CardDescription className="text-[#737373]">
              {viewingCommunity.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-[#f8f6f3] rounded-lg">
                <p className="text-sm text-[#a3a3a3]">Nombre</p>
                <p className="text-[#1a1a1a] font-medium">{viewingCommunity.name}</p>
              </div>
              <div className="p-4 bg-[#f8f6f3] rounded-lg">
                <p className="text-sm text-[#a3a3a3]">Estado</p>
                <Badge
                  className={
                    viewingCommunity.status === "activa"
                      ? "bg-green-100 text-green-700 border-green-200 mt-1"
                      : "bg-[#f0f0f0] text-[#737373] border-[#e5e5e5] mt-1"
                  }
                >
                  {viewingCommunity.status}
                </Badge>
              </div>
              <div className="p-4 bg-[#f8f6f3] rounded-lg">
                <p className="text-sm text-[#a3a3a3]">Creada por</p>
                <p className="text-[#1a1a1a] font-medium">{viewingCommunity.createdBy}</p>
              </div>
              <div className="p-4 bg-[#f8f6f3] rounded-lg">
                <p className="text-sm text-[#a3a3a3]">Fecha de creación</p>
                <p className="text-[#1a1a1a] font-medium">{viewingCommunity.createdAt}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Members Table */}
        <Card className="bg-white border-[#e5e5e5] shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-[#1a1a1a]">Miembros</CardTitle>
              <CardDescription className="text-[#737373]">
                {communityMembers.length} miembros en esta comunidad
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
            <Table>
              <TableHeader>
                <TableRow className="border-[#e5e5e5] hover:bg-transparent">
                  <TableHead className="text-[#737373]">ID</TableHead>
                  <TableHead className="text-[#737373]">Nombre</TableHead>
                  <TableHead className="text-[#737373]">Tipo de acceso</TableHead>
                  <TableHead className="text-[#737373]">Moderador</TableHead>
                  <TableHead className="text-[#737373] text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {communityMembers.map((member) => (
                  <TableRow key={member.id} className="border-[#e5e5e5] hover:bg-[#f8f6f3]">
                    <TableCell className="text-[#a3a3a3]">#{member.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-[#1a1a1a] font-medium">{member.name}</p>
                        <p className="text-sm text-[#a3a3a3]">{member.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={accessColors[member.access]}>
                        {accessLabels[member.access]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          member.isModerator
                            ? "bg-[#d4854a]/20 text-[#c07842] border-[#d4854a]/30"
                            : "bg-[#f0f0f0] text-[#a3a3a3] border-[#e5e5e5]"
                        }
                      >
                        {member.isModerator ? "sí" : "no"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openAccessModal(member)}
                          className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
                        >
                          Acceso
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
                        >
                          Mod.
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          Quitar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
                  className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#1a1a1a]">Tipo de acceso</Label>
                <Select defaultValue="POSTEAR_COMENTAR">
                  <SelectTrigger className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#e5e5e5]">
                    <SelectItem value="SOLO_VER" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">Solo ver</SelectItem>
                    <SelectItem value="POSTEAR_COMENTAR" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">Postear y comentar</SelectItem>
                    <SelectItem value="CHAT_COMPLETO" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">Chat completo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="moderator" className="border-[#e5e5e5] data-[state=checked]:bg-[#d4854a]" />
                <Label htmlFor="moderator" className="text-[#1a1a1a]">¿Es moderador?</Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAddMemberModal(false)}
                className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => setShowAddMemberModal(false)}
                className="bg-[#d4854a] hover:bg-[#c07842] text-white"
              >
                Agregar miembro
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
                {selectedMember?.name} ({selectedMember?.email})
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label className="text-[#1a1a1a]">Tipo de acceso</Label>
                <Select defaultValue={selectedMember?.access}>
                  <SelectTrigger className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#e5e5e5]">
                    <SelectItem value="SOLO_VER" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">Solo ver</SelectItem>
                    <SelectItem value="POSTEAR_COMENTAR" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">Postear y comentar</SelectItem>
                    <SelectItem value="CHAT_COMPLETO" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">Chat completo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAccessModal(false)}
                className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => setShowAccessModal(false)}
                className="bg-[#d4854a] hover:bg-[#c07842] text-white"
              >
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Communities Table */}
      <Card className="bg-white border-[#e5e5e5] shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-[#1a1a1a]">Comunidades</CardTitle>
            <CardDescription className="text-[#737373]">
              Gestiona las comunidades de la plataforma
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
              {communities.map((community) => (
                <TableRow key={community.id} className="border-[#e5e5e5] hover:bg-[#f8f6f3]">
                  <TableCell className="text-[#1a1a1a] font-medium">{community.name}</TableCell>
                  <TableCell className="text-[#737373] max-w-xs truncate">
                    {community.description}
                  </TableCell>
                  <TableCell className="text-[#737373]">{community.members}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        community.status === "activa"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-[#f0f0f0] text-[#737373] border-[#e5e5e5]"
                      }
                    >
                      {community.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setViewingCommunity(community)}
                        className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a] gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        Ver
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(community)}
                        className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a] gap-1"
                      >
                        <Pencil className="w-4 h-4" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openDeleteModal(community)}
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
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
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Descripción</Label>
              <Textarea
                placeholder="Descripción de la comunidad"
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="active" defaultChecked className="data-[state=checked]:bg-[#d4854a]" />
              <Label htmlFor="active" className="text-[#1a1a1a]">Comunidad activa</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewCommunityModal(false)}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => setShowNewCommunityModal(false)}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white"
            >
              Crear comunidad
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
            <Button
              variant="outline"
              onClick={() => setShowEditModal(false)}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => setShowEditModal(false)}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white"
            >
              Guardar cambios
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
              ¿Estás seguro de que deseas eliminar <strong className="text-[#1a1a1a]">{selectedCommunity?.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-700">
                Esta acción no se puede deshacer. Todos los datos de la comunidad serán eliminados permanentemente.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => setShowDeleteModal(false)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Eliminar comunidad
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
