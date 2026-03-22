"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, Shield } from "lucide-react"

const users = [
  { id: 1, name: "María García", email: "maria.garcia@email.com", role: "USUARIO", status: "ACTIVO" },
  { id: 2, name: "Carlos López", email: "carlos.lopez@email.com", role: "MODERADOR", status: "ACTIVO" },
  { id: 3, name: "Ana Martínez", email: "ana.martinez@email.com", role: "USUARIO", status: "SUSPENDIDO" },
  { id: 4, name: "Luis Rodríguez", email: "luis.rodriguez@email.com", role: "USUARIO", status: "ACTIVO" },
  { id: 5, name: "Sofia Hernández", email: "sofia.hernandez@email.com", role: "MODERADOR", status: "ACTIVO" },
  { id: 6, name: "Pedro Sánchez", email: "pedro.sanchez@email.com", role: "USUARIO", status: "BANEADO" },
  { id: 7, name: "Laura Díaz", email: "laura.diaz@email.com", role: "USUARIO", status: "ACTIVO" },
  { id: 8, name: "Diego Torres", email: "diego.torres@email.com", role: "USUARIO", status: "SUSPENDIDO" },
]

const admins = [
  { id: 1, name: "Admin Principal", email: "admin@newlife.com", role: "ADMIN" },
  { id: 2, name: "Super Admin", email: "superadmin@newlife.com", role: "SUPERADMIN" },
]

const roleColors: Record<string, string> = {
  USUARIO: "bg-blue-100 text-blue-700 border-blue-200",
  MODERADOR: "bg-[#d4854a]/20 text-[#c07842] border-[#d4854a]/30",
  ADMIN: "bg-purple-100 text-purple-700 border-purple-200",
  SUPERADMIN: "bg-[#e8a84c]/20 text-[#c08a30] border-[#e8a84c]/30",
}

const statusColors: Record<string, string> = {
  ACTIVO: "bg-green-100 text-green-700 border-green-200",
  SUSPENDIDO: "bg-yellow-100 text-yellow-700 border-yellow-200",
  BANEADO: "bg-red-100 text-red-700 border-red-200",
}

export default function UsuariosPage() {
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null)
  const [newStatus, setNewStatus] = useState("ACTIVO")
  const [suspensionDays, setSuspensionDays] = useState("")

  const filteredUsers = users.filter((user) => {
    const roleMatch = roleFilter === "all" || user.role === roleFilter
    const statusMatch = statusFilter === "all" || user.status === statusFilter
    return roleMatch && statusMatch
  })

  const openRoleModal = (user: typeof users[0]) => {
    setSelectedUser(user)
    setShowRoleModal(true)
  }

  const openStatusModal = (user: typeof users[0]) => {
    setSelectedUser(user)
    setNewStatus(user.status)
    setShowStatusModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-white border-[#e5e5e5] shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#737373]">Filtrar por rol:</span>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40 bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]">
                  <SelectValue placeholder="Todos los roles" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#e5e5e5]">
                  <SelectItem value="all" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">Todos</SelectItem>
                  <SelectItem value="USUARIO" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">Usuario</SelectItem>
                  <SelectItem value="MODERADOR" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">Moderador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#737373]">Filtrar por estado:</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]">
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#e5e5e5]">
                  <SelectItem value="all" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">Todos</SelectItem>
                  <SelectItem value="ACTIVO" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">Activo</SelectItem>
                  <SelectItem value="SUSPENDIDO" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">Suspendido</SelectItem>
                  <SelectItem value="BANEADO" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">Baneado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-white border-[#e5e5e5] shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1a1a1a]">Usuarios</CardTitle>
          <CardDescription className="text-[#737373]">
            Gestiona los usuarios y moderadores de la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[#e5e5e5] hover:bg-transparent">
                <TableHead className="text-[#737373]">Nombre</TableHead>
                <TableHead className="text-[#737373]">Correo</TableHead>
                <TableHead className="text-[#737373]">Rol</TableHead>
                <TableHead className="text-[#737373]">Estado</TableHead>
                <TableHead className="text-[#737373] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-[#e5e5e5] hover:bg-[#f8f6f3]">
                  <TableCell className="text-[#1a1a1a] font-medium">{user.name}</TableCell>
                  <TableCell className="text-[#737373]">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={roleColors[user.role]}>{user.role.toLowerCase()}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[user.status]}>{user.status.toLowerCase()}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openRoleModal(user)}
                        className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
                      >
                        Rol
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openStatusModal(user)}
                        className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
                      >
                        Estado
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Admins Section */}
      <Card className="bg-white border-[#e5e5e5] shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-[#1a1a1a] flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#d4854a]" />
              Administradores del sistema
            </CardTitle>
            <CardDescription className="text-[#737373]">
              Solo visible para Superadmin
            </CardDescription>
          </div>
          <Button
            onClick={() => setShowAdminModal(true)}
            className="bg-[#d4854a] hover:bg-[#c07842] text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            Crear admin
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[#e5e5e5] hover:bg-transparent">
                <TableHead className="text-[#737373]">Nombre</TableHead>
                <TableHead className="text-[#737373]">Correo</TableHead>
                <TableHead className="text-[#737373]">Rol</TableHead>
                <TableHead className="text-[#737373] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id} className="border-[#e5e5e5] hover:bg-[#f8f6f3]">
                  <TableCell className="text-[#1a1a1a] font-medium">{admin.name}</TableCell>
                  <TableCell className="text-[#737373]">{admin.email}</TableCell>
                  <TableCell>
                    <Badge className={roleColors[admin.role]}>{admin.role.toLowerCase()}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      Revocar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Modal */}
      <Dialog open={showRoleModal} onOpenChange={setShowRoleModal}>
        <DialogContent className="bg-white border-[#e5e5e5]">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a1a]">Cambiar rol de usuario</DialogTitle>
            <DialogDescription className="text-[#737373]">
              {selectedUser?.name} ({selectedUser?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label className="text-[#1a1a1a] mb-3 block">Seleccionar nuevo rol</Label>
            <Select defaultValue={selectedUser?.role}>
              <SelectTrigger className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-[#e5e5e5]">
                <SelectItem value="USUARIO" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">Usuario</SelectItem>
                <SelectItem value="MODERADOR" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">Moderador</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRoleModal(false)}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => setShowRoleModal(false)}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white"
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Modal */}
      <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
        <DialogContent className="bg-white border-[#e5e5e5]">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a1a]">Cambiar estado de usuario</DialogTitle>
            <DialogDescription className="text-[#737373]">
              {selectedUser?.name} ({selectedUser?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <RadioGroup value={newStatus} onValueChange={setNewStatus} className="space-y-3">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="ACTIVO" id="activo" className="border-[#e5e5e5] text-[#d4854a]" />
                <Label htmlFor="activo" className="text-[#1a1a1a]">Activo</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="SUSPENDIDO" id="suspendido" className="border-[#e5e5e5] text-[#d4854a]" />
                <Label htmlFor="suspendido" className="text-[#1a1a1a]">Suspendido</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="BANEADO" id="baneado" className="border-[#e5e5e5] text-[#d4854a]" />
                <Label htmlFor="baneado" className="text-[#1a1a1a]">Baneado</Label>
              </div>
            </RadioGroup>

            {newStatus === "SUSPENDIDO" && (
              <div className="space-y-2 pt-2">
                <Label className="text-[#1a1a1a]">Días de suspensión</Label>
                <Input
                  type="number"
                  placeholder="Ej: 7"
                  value={suspensionDays}
                  onChange={(e) => setSuspensionDays(e.target.value)}
                  className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowStatusModal(false)}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => setShowStatusModal(false)}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white"
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Admin Modal */}
      <Dialog open={showAdminModal} onOpenChange={setShowAdminModal}>
        <DialogContent className="bg-white border-[#e5e5e5]">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a1a]">Crear nuevo administrador</DialogTitle>
            <DialogDescription className="text-[#737373]">
              Ingresa los datos del nuevo administrador
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Nombre</Label>
              <Input
                placeholder="Nombre completo"
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Correo electrónico</Label>
              <Input
                type="email"
                placeholder="admin@newlife.com"
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Contraseña</Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAdminModal(false)}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => setShowAdminModal(false)}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white"
            >
              Crear administrador
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
