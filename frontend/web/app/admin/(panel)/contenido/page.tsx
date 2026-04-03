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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Pencil, Plus, BookOpen, Save, FileText } from "lucide-react"

const educationalContent = [
  { 
    id: 1, 
    title: "Guía para el manejo del estrés", 
    category: "Salud Mental",
    status: "publicado",
    lastEdited: "18/03/2024",
    content: "El estrés es una respuesta natural del cuerpo ante situaciones desafiantes..."
  },
  { 
    id: 2, 
    title: "Alimentación consciente: primeros pasos", 
    category: "Nutrición",
    status: "publicado",
    lastEdited: "15/03/2024",
    content: "La alimentación consciente es una práctica que nos invita a prestar atención..."
  },
  { 
    id: 3, 
    title: "Técnicas de meditación para principiantes", 
    category: "Bienestar",
    status: "publicado",
    lastEdited: "12/03/2024",
    content: "La meditación es una práctica milenaria que nos ayuda a encontrar paz interior..."
  },
  { 
    id: 4, 
    title: "Comunicación efectiva en familia", 
    category: "Familia",
    status: "borrador",
    lastEdited: "10/03/2024",
    content: "La comunicación es la base de cualquier relación saludable..."
  },
  { 
    id: 5, 
    title: "Ejercicios de respiración", 
    category: "Bienestar",
    status: "publicado",
    lastEdited: "08/03/2024",
    content: "Los ejercicios de respiración son herramientas poderosas para manejar la ansiedad..."
  },
  { 
    id: 6, 
    title: "Cómo establecer límites saludables", 
    category: "Relaciones",
    status: "borrador",
    lastEdited: "05/03/2024",
    content: "Establecer límites es esencial para mantener relaciones saludables..."
  },
]

const categories = ["Salud Mental", "Nutrición", "Bienestar", "Familia", "Relaciones", "Desarrollo Personal"]

export default function ContenidoPage() {
  const [showNewModal, setShowNewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedContent, setSelectedContent] = useState<typeof educationalContent[0] | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editCategory, setEditCategory] = useState("")
  const [editBody, setEditBody] = useState("")

  const openEditModal = (content: typeof educationalContent[0]) => {
    setSelectedContent(content)
    setEditTitle(content.title)
    setEditCategory(content.category)
    setEditBody(content.content)
    setShowEditModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-[#e5e5e5] shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#d4854a]">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">{educationalContent.length}</p>
                <p className="text-sm text-[#737373]">Total de artículos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-[#e5e5e5] shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-600">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">
                  {educationalContent.filter(c => c.status === "publicado").length}
                </p>
                <p className="text-sm text-[#737373]">Publicados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-[#e5e5e5] shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#e8a84c]">
                <Pencil className="w-5 h-5 text-[#1a1a1a]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">
                  {educationalContent.filter(c => c.status === "borrador").length}
                </p>
                <p className="text-sm text-[#737373]">Borradores</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Table */}
      <Card className="bg-white border-[#e5e5e5] shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-[#1a1a1a]">Contenido Educativo</CardTitle>
            <CardDescription className="text-[#737373]">
              Gestiona los artículos y recursos educativos
            </CardDescription>
          </div>
          <Button
            onClick={() => setShowNewModal(true)}
            className="bg-[#d4854a] hover:bg-[#c07842] text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            Nuevo contenido
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[#e5e5e5] hover:bg-transparent">
                <TableHead className="text-[#737373]">Título</TableHead>
                <TableHead className="text-[#737373]">Categoría</TableHead>
                <TableHead className="text-[#737373]">Estado</TableHead>
                <TableHead className="text-[#737373]">Última edición</TableHead>
                <TableHead className="text-[#737373] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {educationalContent.map((content) => (
                <TableRow key={content.id} className="border-[#e5e5e5] hover:bg-[#f8f6f3]">
                  <TableCell className="text-[#1a1a1a] font-medium">{content.title}</TableCell>
                  <TableCell>
                    <Badge className="bg-[#d4854a]/20 text-[#c07842] border-[#d4854a]/30">
                      {content.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        content.status === "publicado"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-[#e8a84c]/20 text-[#c08a30] border-[#e8a84c]/30"
                      }
                    >
                      {content.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[#737373]">{content.lastEdited}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditModal(content)}
                      className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a] gap-1"
                    >
                      <Pencil className="w-4 h-4" />
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Content Modal */}
      <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
        <DialogContent className="bg-white border-[#e5e5e5] max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a1a]">Nuevo contenido educativo</DialogTitle>
            <DialogDescription className="text-[#737373]">
              Crea un nuevo artículo o recurso educativo
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Título</Label>
              <Input
                placeholder="Título del artículo"
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Categoría</Label>
              <Select>
                <SelectTrigger className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#e5e5e5]">
                  {categories.map((category) => (
                    <SelectItem 
                      key={category} 
                      value={category}
                      className="text-[#1a1a1a] hover:bg-[#f8f6f3]"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Contenido</Label>
              <Textarea
                placeholder="Escribe el contenido del artículo aquí..."
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3] min-h-48"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowNewModal(false)}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a] gap-2"
            >
              <Save className="w-4 h-4" />
              Guardar borrador
            </Button>
            <Button
              onClick={() => setShowNewModal(false)}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white"
            >
              Publicar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Content Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="bg-white border-[#e5e5e5] max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a1a]">Editar contenido</DialogTitle>
            <DialogDescription className="text-[#737373]">
              Modifica el artículo o recurso educativo
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Título</Label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Categoría</Label>
              <Select value={editCategory} onValueChange={setEditCategory}>
                <SelectTrigger className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#e5e5e5]">
                  {categories.map((category) => (
                    <SelectItem 
                      key={category} 
                      value={category}
                      className="text-[#1a1a1a] hover:bg-[#f8f6f3]"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Contenido</Label>
              <Textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3] min-h-48"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowEditModal(false)}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a] gap-2"
            >
              <Save className="w-4 h-4" />
              Guardar borrador
            </Button>
            <Button
              onClick={() => setShowEditModal(false)}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white"
            >
              {selectedContent?.status === "publicado" ? "Actualizar" : "Publicar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
