"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, Shield, Loader2 } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { getUsers, changeUserRole, changeUserStatus, createAdmin, User } from "@/lib/users"

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
  const { isSuperAdmin, isLoading: authLoading } = useAuth()

  const [users, setUsers] = useState<User[]>([])
  const [admins, setAdmins] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const [showRoleModal, setShowRoleModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showAdminModal, setShowAdminModal] = useState(false)

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedRole, setSelectedRole] = useState("USUARIO")
  const [newStatus, setNewStatus] = useState("ACTIVO")
  const [suspensionDays, setSuspensionDays] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [adminForm, setAdminForm] = useState({ nombre: "", email: "", password: "" })

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    setError("")
    try {
      const all = await getUsers()
      setUsers(all.filter(u => u.rol === 'USUARIO' || u.rol === 'MODERADOR'))
      setAdmins(all.filter(u => u.rol === 'ADMIN' || u.rol === 'SUPERADMIN'))
    } catch (err: any) {
      console.error('Error completo:', err)           // ← agrega
      console.error('Response:', err?.response?.data) // ← agrega
      console.error('Status:', err?.response?.status) // ← agrega
      setError("Error al cargar usuarios. Verifica que el servidor esté corriendo.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!authLoading) fetchUsers()
  }, [fetchUsers, authLoading])

  const filteredUsers = users.filter(u => {
    const roleMatch = roleFilter === "all" || u.rol === roleFilter
    const statusMatch = statusFilter === "all" || u.estado === statusFilter
    return roleMatch && statusMatch
  })

  const openRoleModal = (user: User) => {
    setSelectedUser(user)
    setSelectedRole(user.rol)
    setShowRoleModal(true)
  }

  const openStatusModal = (user: User) => {
    setSelectedUser(user)
    setNewStatus(user.estado)
    setSuspensionDays("")
    setShowStatusModal(true)
  }

  const handleChangeRole = async () => {
    if (!selectedUser) return
    setIsSubmitting(true)
    try {
      await changeUserRole(selectedUser.id, selectedRole)
      await fetchUsers()
      setShowRoleModal(false)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al cambiar rol")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChangeStatus = async () => {
    if (!selectedUser) return
    setIsSubmitting(true)
    try {
      await changeUserStatus(
        selectedUser.id,
        newStatus,
        newStatus === 'SUSPENDIDO' && suspensionDays ? Number(suspensionDays) : undefined
      )
      await fetchUsers()
      setShowStatusModal(false)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al cambiar estado")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateAdmin = async () => {
    setIsSubmitting(true)
    try {
      await createAdmin(adminForm)
      await fetchUsers()
      setShowAdminModal(false)
      setAdminForm({ nombre: "", email: "", password: "" })
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al crear administrador")
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


  if (authLoading) {
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
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="USUARIO">Usuario</SelectItem>
                  <SelectItem value="MODERADOR">Moderador</SelectItem>
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
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="ACTIVO">Activo</SelectItem>
                  <SelectItem value="SUSPENDIDO">Suspendido</SelectItem>
                  <SelectItem value="BANEADO">Baneado</SelectItem>
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
            {filteredUsers.length} usuario{filteredUsers.length !== 1 ? 's' : ''} encontrado{filteredUsers.length !== 1 ? 's' : ''}
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
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-[#737373] py-8">
                    No se encontraron usuarios con los filtros seleccionados
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-[#e5e5e5] hover:bg-[#f8f6f3]">
                    <TableCell className="text-[#1a1a1a] font-medium">{user.nombre}</TableCell>
                    <TableCell className="text-[#737373]">{user.email}</TableCell>
                    <TableCell>
                      <Badge className={roleColors[user.rol]}>{user.rol.toLowerCase()}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[user.estado]}>{user.estado.toLowerCase()}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => openRoleModal(user)}
                          className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3]">
                          Rol
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => openStatusModal(user)}
                          className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3]">
                          Estado
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

      {/* Admins Section — solo superadmin */}
      {isSuperAdmin() && (
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
            <Button onClick={() => setShowAdminModal(true)}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white gap-2">
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
                    <TableCell className="text-[#1a1a1a] font-medium">{admin.nombre}</TableCell>
                    <TableCell className="text-[#737373]">{admin.email}</TableCell>
                    <TableCell>
                      <Badge className={roleColors[admin.rol]}>{admin.rol.toLowerCase()}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50">
                        Revocar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Role Modal */}
      <Dialog open={showRoleModal} onOpenChange={setShowRoleModal}>
        <DialogContent className="bg-white border-[#e5e5e5]">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a1a]">Cambiar rol de usuario</DialogTitle>
            <DialogDescription className="text-[#737373]">
              {selectedUser?.nombre} ({selectedUser?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label className="text-[#1a1a1a] mb-3 block">Seleccionar nuevo rol</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-[#e5e5e5]">
                <SelectItem value="USUARIO">Usuario</SelectItem>
                <SelectItem value="MODERADOR">Moderador</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRoleModal(false)}
              className="border-[#e5e5e5] text-[#737373]">
              Cancelar
            </Button>
            <Button onClick={handleChangeRole} disabled={isSubmitting}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirmar"}
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
              {selectedUser?.nombre} ({selectedUser?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <RadioGroup value={newStatus} onValueChange={setNewStatus} className="space-y-3">
              {["ACTIVO", "SUSPENDIDO", "BANEADO"].map((s) => (
                <div key={s} className="flex items-center space-x-3">
                  <RadioGroupItem value={s} id={s} className="border-[#e5e5e5] text-[#d4854a]" />
                  <Label htmlFor={s} className="text-[#1a1a1a] capitalize">{s.toLowerCase()}</Label>
                </div>
              ))}
            </RadioGroup>
            {newStatus === "SUSPENDIDO" && (
              <div className="space-y-2 pt-2">
                <Label className="text-[#1a1a1a]">Días de suspensión</Label>
                <Input type="number" placeholder="Ej: 7" value={suspensionDays}
                  onChange={(e) => setSuspensionDays(e.target.value)}
                  className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusModal(false)}
              className="border-[#e5e5e5] text-[#737373]">
              Cancelar
            </Button>
            <Button onClick={handleChangeStatus} disabled={isSubmitting}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirmar"}
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
            {["nombre", "email", "password"].map((field) => (
              <div key={field} className="space-y-2">
                <Label className="text-[#1a1a1a] capitalize">{field}</Label>
                <Input
                  type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                  placeholder={field === "nombre" ? "Nombre completo" : field === "email" ? "admin@newlife.com" : "••••••••"}
                  value={adminForm[field as keyof typeof adminForm]}
                  onChange={(e) => setAdminForm(prev => ({ ...prev, [field]: e.target.value }))}
                  className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdminModal(false)}
              className="border-[#e5e5e5] text-[#737373]">
              Cancelar
            </Button>
            <Button onClick={handleCreateAdmin} disabled={isSubmitting}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Crear administrador"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}