"use client"

import { useState, useRef } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Pencil,
  Plus,
  Trash2,
  Video,
  X,
  ChevronRight,
  Settings,
  Clock,
  User,
  ArrowLeft,
  Play,
  ExternalLink,
} from "lucide-react"

type ContentType = "ARTICULO" | "VIDEO"
type ContentStatus = "DRAFT" | "PUBLISHED"

interface Author {
  name: string
  profession?: string
  photoUrl?: string
}

interface Category {
  id: number
  name: string
  description?: string
}

interface EducationalContent {
  id: number
  title: string
  type: ContentType
  videoUrl?: string
  durationMinutes: number
  coverImage: string
  content: string
  categoryId: number | null
  author: Author
  hashtags: string[]
  status: ContentStatus
  lastEdited: string
}

const initialCategories: Category[] = [
  { id: 1, name: "Salud Mental", description: "Artículos y videos sobre bienestar psicológico" },
  { id: 2, name: "Nutrición", description: "Contenido sobre alimentación saludable" },
  { id: 3, name: "Bienestar", description: "Tips de bienestar general y mindfulness" },
  { id: 4, name: "Familia", description: "Recursos para la dinámica familiar" },
  { id: 5, name: "Relaciones", description: "Guías para relaciones interpersonales" },
  { id: 6, name: "Desarrollo Personal", description: "Contenido de crecimiento personal" },
]

const initialContent: EducationalContent[] = [
  {
    id: 1,
    title: "Guía para el manejo del estrés",
    type: "ARTICULO",
    durationMinutes: 8,
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    content: "El estrés es una respuesta natural del cuerpo ante situaciones desafiantes. En este artículo exploraremos técnicas efectivas para manejar el estrés en tu vida diaria, incluyendo ejercicios de respiración, meditación y cambios en el estilo de vida que pueden hacer una gran diferencia.",
    categoryId: 1,
    author: { name: "Dr. Carlos Mendoza", profession: "Psicólogo clínico", photoUrl: "" },
    hashtags: ["estrés", "salud mental", "bienestar"],
    status: "PUBLISHED",
    lastEdited: "18/03/2024",
  },
  {
    id: 2,
    title: "Alimentación consciente: primeros pasos",
    type: "VIDEO",
    videoUrl: "https://youtube.com/watch?v=example",
    durationMinutes: 15,
    coverImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
    content: "La alimentación consciente es una práctica que nos invita a prestar atención plena a lo que comemos, cómo lo comemos y por qué lo comemos.",
    categoryId: 2,
    author: { name: "Laura Martínez", profession: "Nutricionista" },
    hashtags: ["nutrición", "mindful eating", "salud"],
    status: "PUBLISHED",
    lastEdited: "15/03/2024",
  },
  {
    id: 3,
    title: "Técnicas de meditación para principiantes",
    type: "VIDEO",
    videoUrl: "https://youtube.com/watch?v=meditation",
    durationMinutes: 20,
    coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    content: "La meditación es una práctica milenaria que nos ayuda a encontrar paz interior y claridad mental.",
    categoryId: 3,
    author: { name: "Ana García", profession: "Instructora de yoga" },
    hashtags: ["meditación", "mindfulness", "paz interior"],
    status: "PUBLISHED",
    lastEdited: "12/03/2024",
  },
  {
    id: 4,
    title: "Comunicación efectiva en familia",
    type: "ARTICULO",
    durationMinutes: 12,
    coverImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop",
    content: "La comunicación es la base de cualquier relación saludable. Aprende técnicas para mejorar el diálogo familiar.",
    categoryId: 4,
    author: { name: "Roberto Sánchez", profession: "Terapeuta familiar" },
    hashtags: ["familia", "comunicación", "relaciones"],
    status: "DRAFT",
    lastEdited: "10/03/2024",
  },
  {
    id: 5,
    title: "Ejercicios de respiración",
    type: "VIDEO",
    videoUrl: "https://youtube.com/watch?v=breathing",
    durationMinutes: 10,
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    content: "Los ejercicios de respiración son herramientas poderosas para manejar la ansiedad y el estrés.",
    categoryId: 3,
    author: { name: "María López" },
    hashtags: ["respiración", "ansiedad", "relajación"],
    status: "PUBLISHED",
    lastEdited: "08/03/2024",
  },
  {
    id: 6,
    title: "Cómo establecer límites saludables",
    type: "ARTICULO",
    durationMinutes: 15,
    coverImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop",
    content: "Establecer límites es esencial para mantener relaciones saludables y proteger tu bienestar emocional.",
    categoryId: null,
    author: { name: "Patricia Herrera", profession: "Coach de vida" },
    hashtags: ["límites", "autocuidado", "relaciones"],
    status: "DRAFT",
    lastEdited: "05/03/2024",
  },
  {
    id: 7,
    title: "Superando la ansiedad social",
    type: "ARTICULO",
    durationMinutes: 10,
    coverImage: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=400&h=300&fit=crop",
    content: "La ansiedad social puede ser limitante, pero con las estrategias correctas es posible superarla.",
    categoryId: 1,
    author: { name: "Dr. Carlos Mendoza", profession: "Psicólogo clínico" },
    hashtags: ["ansiedad", "social", "superación"],
    status: "PUBLISHED",
    lastEdited: "01/03/2024",
  },
]

const emptyFormData = {
  title: "",
  type: "ARTICULO" as ContentType,
  videoUrl: "",
  durationMinutes: 0,
  coverImage: "",
  content: "",
  categoryId: null as number | null,
  authorName: "",
  authorProfession: "",
  authorPhotoUrl: "",
  hashtags: [] as string[],
  status: "DRAFT" as ContentStatus,
}

const emptyCategoryFormData = {
  name: "",
  description: "",
}

export default function ContenidoPage() {
  const [contents, setContents] = useState<EducationalContent[]>(initialContent)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [showModal, setShowModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showDetailSheet, setShowDetailSheet] = useState(false)
  const [selectedContent, setSelectedContent] = useState<EducationalContent | null>(null)
  const [editingContent, setEditingContent] = useState<EducationalContent | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)
  const [deleteContent, setDeleteContent] = useState<EducationalContent | null>(null)
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null)
  const [tagInput, setTagInput] = useState("")
  const [formData, setFormData] = useState(emptyFormData)
  const [categoryFormData, setCategoryFormData] = useState(emptyCategoryFormData)
  const [categoryError, setCategoryError] = useState("")
  const [preselectedCategoryId, setPreselectedCategoryId] = useState<number | null>(null)
  const [viewAllCategoryId, setViewAllCategoryId] = useState<number | null>(null)
  const [draggedContent, setDraggedContent] = useState<EducationalContent | null>(null)
  const [dragOverCategoryId, setDragOverCategoryId] = useState<number | null>(null)

  // Group contents by category
  const getContentsByCategory = (categoryId: number | null) => {
    return contents.filter((c) => c.categoryId === categoryId)
  }

  const getCategoryName = (categoryId: number | null) => {
    if (categoryId === null) return "Otros"
    const category = categories.find((c) => c.id === categoryId)
    return category ? category.name : "Otros"
  }

  const openCreateModal = (categoryId?: number | null) => {
    setEditingContent(null)
    setFormData({
      ...emptyFormData,
      categoryId: categoryId !== undefined ? categoryId : null,
    })
    setPreselectedCategoryId(categoryId !== undefined ? categoryId : null)
    setTagInput("")
    setShowModal(true)
  }

  const openEditModal = (content: EducationalContent) => {
    setEditingContent(content)
    setFormData({
      title: content.title,
      type: content.type,
      videoUrl: content.videoUrl || "",
      durationMinutes: content.durationMinutes,
      coverImage: content.coverImage,
      content: content.content,
      categoryId: content.categoryId,
      authorName: content.author.name,
      authorProfession: content.author.profession || "",
      authorPhotoUrl: content.author.photoUrl || "",
      hashtags: content.hashtags,
      status: content.status,
    })
    setTagInput("")
    setShowDetailSheet(false)
    setShowModal(true)
  }

  const openDetailSheet = (content: EducationalContent) => {
    setSelectedContent(content)
    setShowDetailSheet(true)
  }

  const handleSave = () => {
    const newContent: EducationalContent = {
      id: editingContent?.id || Date.now(),
      title: formData.title,
      type: formData.type,
      videoUrl: formData.type === "VIDEO" ? formData.videoUrl : undefined,
      durationMinutes: formData.durationMinutes,
      coverImage: formData.coverImage,
      content: formData.content,
      categoryId: formData.categoryId,
      author: {
        name: formData.authorName,
        profession: formData.authorProfession || undefined,
        photoUrl: formData.authorPhotoUrl || undefined,
      },
      hashtags: formData.hashtags,
      status: formData.status,
      lastEdited: new Date().toLocaleDateString("es-ES"),
    }

    if (editingContent) {
      setContents(contents.map((c) => (c.id === editingContent.id ? newContent : c)))
    } else {
      setContents([newContent, ...contents])
    }

    setShowModal(false)
    setFormData(emptyFormData)
    setEditingContent(null)
    setPreselectedCategoryId(null)
  }

  const handleDelete = () => {
    if (deleteContent) {
      setContents(contents.filter((c) => c.id !== deleteContent.id))
      setDeleteContent(null)
      setShowDetailSheet(false)
      setSelectedContent(null)
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.hashtags.includes(tagInput.trim().toLowerCase())) {
      setFormData({
        ...formData,
        hashtags: [...formData.hashtags, tagInput.trim().toLowerCase()],
      })
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      hashtags: formData.hashtags.filter((t) => t !== tag),
    })
  }

  // Category management - opens modal showing category list
  const openCategoryCreateModal = () => {
    setEditingCategory(null)
    setIsCreatingCategory(false)
    setCategoryFormData(emptyCategoryFormData)
    setShowCategoryModal(true)
  }

  // Start creating a new category (shows form)
  const startCreateCategory = () => {
    setEditingCategory(null)
    setIsCreatingCategory(true)
    setCategoryFormData({ name: "", description: "" })
  }

  const openCategoryEditModal = (category: Category) => {
    setEditingCategory(category)
    setIsCreatingCategory(false)
    setCategoryFormData({
      name: category.name,
      description: category.description || "",
    })
    setShowCategoryModal(true)
  }

  const handleSaveCategory = () => {
    // Validate reserved name
    if (categoryFormData.name.trim().toLowerCase() === "otros") {
      setCategoryError("Este es un nombre reservado por el sistema")
      return
    }
    setCategoryError("")

    const newCategory: Category = {
      id: editingCategory?.id || Date.now(),
      name: categoryFormData.name,
      description: categoryFormData.description || undefined,
    }

    if (editingCategory) {
      setCategories(categories.map((c) => (c.id === editingCategory.id ? newCategory : c)))
    } else {
      setCategories([...categories, newCategory])
    }

    setShowCategoryModal(false)
    setCategoryFormData(emptyCategoryFormData)
    setEditingCategory(null)
    setIsCreatingCategory(false)
  }

  const handleDeleteCategory = () => {
    if (deleteCategory) {
      // Move contents from deleted category to "Otros" (null)
      setContents(
        contents.map((c) =>
          c.categoryId === deleteCategory.id ? { ...c, categoryId: null } : c
        )
      )
      setCategories(categories.filter((c) => c.id !== deleteCategory.id))
      setDeleteCategory(null)
    }
  }

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, content: EducationalContent) => {
    setDraggedContent(content)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent, categoryId: number | null) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverCategoryId(categoryId)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    // Only reset if we're leaving the category area completely
    const relatedTarget = e.relatedTarget as HTMLElement
    if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
      setDragOverCategoryId(null)
    }
  }

  const handleDrop = (e: React.DragEvent, categoryId: number | null) => {
    e.preventDefault()
    if (draggedContent && draggedContent.categoryId !== categoryId) {
      setContents(
        contents.map((c) =>
          c.id === draggedContent.id ? { ...c, categoryId } : c
        )
      )
    }
    setDraggedContent(null)
    setDragOverCategoryId(null)
  }

  const handleDragEnd = () => {
    // Reset state when drag ends (dropped outside valid target)
    setDraggedContent(null)
    setDragOverCategoryId(null)
  }

  // "Others" category with null categoryId
  const allCategoriesWithOthers = [
    ...categories,
    { id: null as unknown as number, name: "Otros", description: "Contenido sin categoría asignada" },
  ]

  // View All mode
  if (viewAllCategoryId !== null) {
    const categoryContents = getContentsByCategory(viewAllCategoryId === 0 ? null : viewAllCategoryId)
    const categoryName = getCategoryName(viewAllCategoryId === 0 ? null : viewAllCategoryId)

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewAllCategoryId(null)}
              className="text-[#737373] hover:text-[#d4854a] transition-colors"
              title="Volver"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <nav className="flex items-center gap-2 text-sm">
              <button
                onClick={() => setViewAllCategoryId(null)}
                className="text-[#737373] hover:text-[#d4854a] transition-colors"
              >
                Contenido Educativo
              </button>
              <ChevronRight className="w-4 h-4 text-[#a3a3a3]" />
              <span className="text-[#1a1a1a] font-medium">{categoryName}</span>
              <span className="text-[#a3a3a3]">({categoryContents.length})</span>
            </nav>
          </div>
          <Button
            onClick={() => openCreateModal(viewAllCategoryId === 0 ? null : viewAllCategoryId)}
            className="bg-[#d4854a] hover:bg-[#c07842] text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            Nuevo
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categoryContents.map((content) => (
            <ContentCard
              key={content.id}
              content={content}
              onView={() => openDetailSheet(content)}
              onDragStart={(e) => handleDragStart(e, content)}
              onDragEnd={handleDragEnd}
            />
          ))}
          <AddContentCard onClick={() => openCreateModal(viewAllCategoryId === 0 ? null : viewAllCategoryId)} categoryName={categoryName} />
        </div>

        {/* Detail Sheet, Modals, AlertDialogs would be repeated here - simplified for brevity */}
        <ContentDetailSheet
          content={selectedContent}
          open={showDetailSheet}
          onOpenChange={setShowDetailSheet}
          getCategoryName={getCategoryName}
          onEdit={() => selectedContent && openEditModal(selectedContent)}
          onDelete={() => selectedContent && setDeleteContent(selectedContent)}
        />

        <ContentFormModal
          open={showModal}
          onOpenChange={setShowModal}
          editingContent={editingContent}
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          tagInput={tagInput}
          setTagInput={setTagInput}
          addTag={addTag}
          removeTag={removeTag}
          onSave={handleSave}
        />

        <DeleteContentDialog
          content={deleteContent}
          onOpenChange={() => setDeleteContent(null)}
          onDelete={handleDelete}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white border-[#e5e5e5] shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-[#1a1a1a]">Contenido Educativo</CardTitle>
            <CardDescription className="text-[#737373]">
              Gestiona artículos y videos para el bienestar de los usuarios
            </CardDescription>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={openCategoryCreateModal}
              className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a] gap-2"
            >
              <Settings className="w-4 h-4" />
              Categorías
            </Button>
            <Button
              onClick={() => openCreateModal()}
              className="bg-[#d4854a] hover:bg-[#c07842] text-white gap-2"
            >
              <Plus className="w-4 h-4" />
              Nuevo
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Category Rows (Netflix Style) */}
      <div className="space-y-8">
        {allCategoriesWithOthers.map((category) => {
          const categoryId = category.id === null ? null : category.id
          const categoryContents = getContentsByCategory(categoryId)
          const isDragOver = dragOverCategoryId === categoryId

          return (
            <div
              key={category.id ?? "others"}
              className={`transition-all ${isDragOver ? "ring-2 ring-[#d4854a] ring-offset-2 rounded-lg" : ""}`}
              onDragOver={(e) => handleDragOver(e, categoryId)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, categoryId)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-[#1a1a1a]">{category.name}</h2>
                  <Badge variant="secondary" className="bg-[#f8f6f3] text-[#737373]">
                    {categoryContents.length}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setViewAllCategoryId(categoryId ?? 0)}
                  className="text-[#d4854a] hover:text-[#c07842] hover:bg-[#d4854a]/10 gap-1"
                >
                  Ver todo
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-4 pb-4">
                  {categoryContents.map((content) => (
                    <ContentCard
                      key={content.id}
                      content={content}
                      onView={() => openDetailSheet(content)}
                      onDragStart={(e) => handleDragStart(e, content)}
                      onDragEnd={handleDragEnd}
                      isDragging={draggedContent?.id === content.id}
                    />
                  ))}
                  <AddContentCard onClick={() => openCreateModal(categoryId)} categoryName={category.name} />
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          )
        })}
      </div>

      {/* Content Detail Sheet */}
      <ContentDetailSheet
        content={selectedContent}
        open={showDetailSheet}
        onOpenChange={setShowDetailSheet}
        getCategoryName={getCategoryName}
        onEdit={() => selectedContent && openEditModal(selectedContent)}
        onDelete={() => selectedContent && setDeleteContent(selectedContent)}
      />

      {/* Content Form Modal */}
      <ContentFormModal
        open={showModal}
        onOpenChange={setShowModal}
        editingContent={editingContent}
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        tagInput={tagInput}
        setTagInput={setTagInput}
        addTag={addTag}
        removeTag={removeTag}
        onSave={handleSave}
      />

      {/* Category Management Dialog */}
      <Dialog open={showCategoryModal} onOpenChange={(open) => {
        setShowCategoryModal(open)
        if (!open) setCategoryError("")
      }}>
        <DialogContent className="bg-white border-[#e5e5e5] max-w-lg flex flex-col max-h-[80vh]">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-[#1a1a1a]">Gestionar Categorias</DialogTitle>
            <DialogDescription className="text-[#737373]">
              Crea, edita o elimina categorias para organizar tu contenido
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto py-4">
            {editingCategory !== null || isCreatingCategory || !categories.length ? (
              <div className="space-y-4">
                {(editingCategory !== null || isCreatingCategory) && categories.length > 0 && (
                  <button
                    onClick={() => {
                      setEditingCategory(null)
                      setIsCreatingCategory(false)
                      setCategoryFormData(emptyCategoryFormData)
                      setCategoryError("")
                    }}
                    className="flex items-center gap-1 text-sm text-[#737373] hover:text-[#d4854a] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Volver</span>
                  </button>
                )}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[#1a1a1a]">Nombre de la categoria *</Label>
                    <Input
                      placeholder="Ej: Salud Mental"
                      value={categoryFormData.name}
                      onChange={(e) => {
                        setCategoryFormData({ ...categoryFormData, name: e.target.value })
                        setCategoryError("")
                      }}
                      className={`bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] ${categoryError ? "border-red-500" : ""}`}
                    />
                    {categoryError && (
                      <p className="text-xs text-red-500">{categoryError}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#1a1a1a]">Descripcion (opcional)</Label>
                    <Textarea
                      placeholder="Breve descripcion de la categoria..."
                      value={categoryFormData.description}
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                      className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] min-h-20"
                    />
                  </div>
                  <Button
                    onClick={handleSaveCategory}
                    disabled={!categoryFormData.name.trim()}
                    className="bg-[#d4854a] hover:bg-[#c07842] text-white w-full"
                  >
                    {editingCategory ? "Guardar cambios" : "Crear categoria"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Button
                  onClick={startCreateCategory}
                  variant="outline"
                  className="w-full border-dashed border-[#d4854a] text-[#d4854a] hover:bg-[#d4854a]/10 gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Crear nueva categoria
                </Button>
                <div className="w-full overflow-hidden">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="border-[#e5e5e5]">
                        <TableHead className="text-[#737373]">Nombre</TableHead>
                        <TableHead className="text-[#737373] w-20">Cant.</TableHead>
                        <TableHead className="text-[#737373] text-right w-24">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.id} className="border-[#e5e5e5]">
                          <TableCell className="font-medium text-[#1a1a1a]">
                            <div className="break-words">
                              {category.name}
                              {category.description && (
                                <p className="text-xs text-[#a3a3a3] font-normal break-words">{category.description}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-[#f8f6f3] text-[#737373]">
                              {getContentsByCategory(category.id).length}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => openCategoryEditModal(category)}
                                className="h-8 w-8 p-0 text-[#737373] hover:text-[#1a1a1a]"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setDeleteCategory(category)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Content Dialog */}
      <DeleteContentDialog
        content={deleteContent}
        onOpenChange={() => setDeleteContent(null)}
        onDelete={handleDelete}
      />

      {/* Delete Category Dialog */}
      <AlertDialog open={!!deleteCategory} onOpenChange={() => setDeleteCategory(null)}>
        <AlertDialogContent className="bg-white border-[#e5e5e5]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#1a1a1a]">¿Eliminar categoría?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#737373]">
              {deleteCategory && getContentsByCategory(deleteCategory.id).length > 0 ? (
                <>
                  Esta categoría tiene <strong>{getContentsByCategory(deleteCategory.id).length} contenidos</strong>. 
                  Si la eliminas, no se borrarán, pero se moverán a la categoría por defecto &quot;Otros&quot;.
                </>
              ) : (
                "Esta acción no se puede deshacer."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCategory}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// Content Card Component
function ContentCard({
  content,
  onView,
  onDragStart,
  onDragEnd,
  isDragging,
}: {
  content: EducationalContent
  onView: () => void
  onDragStart: (e: React.DragEvent) => void
  onDragEnd: () => void
  isDragging?: boolean
}) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onView}
      className={`flex-shrink-0 w-48 cursor-grab active:cursor-grabbing group transition-all ${
        isDragging ? "opacity-50 scale-95" : ""
      }`}
    >
      <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
        <img
          src={content.coverImage}
          alt={content.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {content.type === "VIDEO" && (
          <div className="absolute top-2 left-2 bg-black/70 rounded-full p-1.5">
            <Video className="w-3 h-3 text-white" />
          </div>
        )}
        <Badge
          className={`absolute top-2 right-2 text-xs ${
            content.status === "PUBLISHED"
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-yellow-100 text-yellow-700 border-yellow-200"
          }`}
        >
          {content.status === "PUBLISHED" ? "PUBLICADO" : "BORRADOR"}
        </Badge>
        <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1 text-white text-xs bg-black/50 px-2 py-1 rounded">
            <Clock className="w-3 h-3" />
            {content.durationMinutes} min
          </div>
        </div>
      </div>
      <h3 className="text-sm font-medium text-[#1a1a1a] line-clamp-2 group-hover:text-[#d4854a] transition-colors">
        {content.title}
      </h3>
    </div>
  )
}

// Add Content Card Component
function AddContentCard({ onClick, categoryName }: { onClick: () => void; categoryName: string }) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-48 aspect-video rounded-lg border-2 border-dashed border-[#e5e5e5] hover:border-[#d4854a] hover:bg-[#d4854a]/5 transition-all flex flex-col items-center justify-center gap-2 group"
    >
      <div className="w-10 h-10 rounded-full bg-[#f8f6f3] group-hover:bg-[#d4854a]/10 flex items-center justify-center transition-colors">
        <Plus className="w-5 h-5 text-[#a3a3a3] group-hover:text-[#d4854a]" />
      </div>
      <span className="text-xs text-[#a3a3a3] group-hover:text-[#d4854a] text-center px-2">
        Añadir a {categoryName}
      </span>
    </button>
  )
}

// Content Detail Dialog Component
function ContentDetailSheet({
  content,
  open,
  onOpenChange,
  getCategoryName,
  onEdit,
  onDelete,
}: {
  content: EducationalContent | null
  open: boolean
  onOpenChange: (open: boolean) => void
  getCategoryName: (id: number | null) => string
  onEdit: () => void
  onDelete: () => void
}) {
  if (!content) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border-[#e5e5e5] max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription>Detalles del contenido educativo</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Cover Image / Video Preview */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={content.coverImage}
              alt={content.title}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
            {content.type === "VIDEO" && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-8 h-8 text-[#d4854a] ml-1" />
                </div>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[#d4854a]/20 text-[#c07842] border-[#d4854a]/30">
              {getCategoryName(content.categoryId)}
            </Badge>
            <Badge
              className={
                content.status === "PUBLISHED"
                  ? "bg-green-100 text-green-700 border-green-200"
                  : "bg-[#e8a84c]/20 text-[#c08a30] border-[#e8a84c]/30"
              }
            >
              {content.status === "PUBLISHED" ? "Publicado" : "Borrador"}
            </Badge>
            <Badge variant="secondary" className="bg-[#f8f6f3] text-[#737373]">
              {content.type === "VIDEO" ? "Video" : "Artículo"}
            </Badge>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-[#1a1a1a]">{content.title}</h2>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-[#737373]">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {content.durationMinutes} min
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {content.author.name}
            </div>
          </div>

          {/* Video URL */}
          {content.type === "VIDEO" && content.videoUrl && (
            <a
              href={content.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#d4854a] hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              Ver video en plataforma
            </a>
          )}

          {/* Content/Description */}
          <div>
            <h3 className="text-sm font-semibold text-[#1a1a1a] mb-2">
              {content.type === "VIDEO" ? "Descripción" : "Contenido"}
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">{content.content}</p>
          </div>

          {/* Author Info */}
          <div className="p-4 rounded-lg bg-[#f8f6f3]">
            <h3 className="text-sm font-semibold text-[#1a1a1a] mb-2">Autor</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#d4854a] flex items-center justify-center text-white font-semibold">
                {content.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-[#1a1a1a]">{content.author.name}</p>
                {content.author.profession && (
                  <p className="text-xs text-[#737373]">{content.author.profession}</p>
                )}
              </div>
            </div>
          </div>

          {/* Hashtags */}
          {content.hashtags.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-[#1a1a1a] mb-2">Hashtags</h3>
              <div className="flex flex-wrap gap-2">
                {content.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[#737373] bg-[#f8f6f3] px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Last Edited */}
          <p className="text-xs text-[#a3a3a3]">Última edición: {content.lastEdited}</p>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-[#e5e5e5]">
            <Button
              onClick={onEdit}
              className="flex-1 bg-[#d4854a] hover:bg-[#c07842] text-white gap-2"
            >
              <Pencil className="w-4 h-4" />
              Editar
            </Button>
            <Button
              onClick={onDelete}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Content Form Modal Component
function ContentFormModal({
  open,
  onOpenChange,
  editingContent,
  formData,
  setFormData,
  categories,
  tagInput,
  setTagInput,
  addTag,
  removeTag,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingContent: EducationalContent | null
  formData: typeof emptyFormData
  setFormData: (data: typeof emptyFormData) => void
  categories: Category[]
  tagInput: string
  setTagInput: (value: string) => void
  addTag: () => void
  removeTag: (tag: string) => void
  onSave: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border-[#e5e5e5] max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#1a1a1a]">
            {editingContent ? "Editar contenido" : "Nuevo contenido educativo"}
          </DialogTitle>
          <DialogDescription className="text-[#737373]">
            {editingContent
              ? "Modifica los campos del contenido educativo"
              : "Completa todos los campos para crear un nuevo contenido"}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-2 md:col-span-2">
              <Label className="text-[#1a1a1a]">Título *</Label>
              <Input
                placeholder="Título del contenido"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
              />
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Tipo *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: ContentType) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#e5e5e5]">
                  <SelectItem value="ARTICULO" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">
                    Artículo
                  </SelectItem>
                  <SelectItem value="VIDEO" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">
                    Video
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Duración (minutos) *</Label>
              <Input
                type="number"
                placeholder="15"
                value={formData.durationMinutes || ""}
                onChange={(e) =>
                  setFormData({ ...formData, durationMinutes: parseInt(e.target.value) || 0 })
                }
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
              />
            </div>

            {/* Video URL (conditional) */}
            {formData.type === "VIDEO" && (
              <div className="space-y-2 md:col-span-2">
                <Label className="text-[#1a1a1a]">URL del Video</Label>
                <Input
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
                />
              </div>
            )}

            {/* Cover Image / Thumbnail */}
            <div className="space-y-2 md:col-span-2">
              <Label className="text-[#1a1a1a]">
                {formData.type === "VIDEO" ? "Miniatura (URL)" : "Imagen de Portada (URL)"} *
              </Label>
              <Input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3]"
              />
            </div>

            {/* Content/Description */}
            <div className="space-y-2 md:col-span-2">
              <Label className="text-[#1a1a1a]">
                {formData.type === "VIDEO" ? "Descripción" : "Texto / Contenido"} *
              </Label>
              <Textarea
                placeholder={formData.type === "VIDEO" ? "Descripción del video..." : "Escribe el contenido del artículo..."}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3] min-h-32"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Categoría</Label>
              <Select
                value={formData.categoryId?.toString() || "null"}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    categoryId: value === "null" ? null : parseInt(value),
                  })
                }
              >
                <SelectTrigger className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#e5e5e5]">
                  <SelectItem value="null" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">
                    Otros (Sin categoría)
                  </SelectItem>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                      className="text-[#1a1a1a] hover:bg-[#f8f6f3]"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Estado *</Label>
              <Select
                value={formData.status}
                onValueChange={(value: ContentStatus) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#e5e5e5]">
                  <SelectItem value="DRAFT" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">
                    Borrador
                  </SelectItem>
                  <SelectItem value="PUBLISHED" className="text-[#1a1a1a] hover:bg-[#f8f6f3]">
                    Publicado
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Author Section */}
            <div className="md:col-span-2 p-4 rounded-lg bg-[#f8f6f3] space-y-4">
              <h3 className="font-semibold text-[#1a1a1a]">Información del Autor</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#1a1a1a]">Nombre *</Label>
                  <Input
                    placeholder="Nombre del autor"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="bg-white border-[#e5e5e5] text-[#1a1a1a]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1a1a1a]">Profesión</Label>
                  <Input
                    placeholder="Ej: Psicólogo"
                    value={formData.authorProfession}
                    onChange={(e) => setFormData({ ...formData, authorProfession: e.target.value })}
                    className="bg-white border-[#e5e5e5] text-[#1a1a1a]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1a1a1a]">Foto (URL)</Label>
                  <Input
                    type="url"
                    placeholder="https://..."
                    value={formData.authorPhotoUrl}
                    onChange={(e) => setFormData({ ...formData, authorPhotoUrl: e.target.value })}
                    className="bg-white border-[#e5e5e5] text-[#1a1a1a]"
                  />
                </div>
              </div>
            </div>

            {/* Hashtags */}
            <div className="space-y-2 md:col-span-2">
              <Label className="text-[#1a1a1a]">Hashtags</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Añadir hashtag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a]"
                />
                <Button
                  type="button"
                  onClick={addTag}
                  variant="outline"
                  className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3]"
                >
                  Añadir
                </Button>
              </div>
              {formData.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.hashtags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-[#d4854a]/10 text-[#d4854a] hover:bg-[#d4854a]/20 gap-1"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
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
            onClick={() => onOpenChange(false)}
            className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]"
          >
            Cancelar
          </Button>
          <Button
            onClick={onSave}
            disabled={!formData.title.trim() || !formData.content.trim() || !formData.authorName.trim()}
            className="bg-[#d4854a] hover:bg-[#c07842] text-white"
          >
            {editingContent ? "Guardar cambios" : "Crear contenido"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Delete Content Dialog Component
function DeleteContentDialog({
  content,
  onOpenChange,
  onDelete,
}: {
  content: EducationalContent | null
  onOpenChange: () => void
  onDelete: () => void
}) {
  return (
    <AlertDialog open={!!content} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white border-[#e5e5e5]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#1a1a1a]">¿Eliminar contenido?</AlertDialogTitle>
          <AlertDialogDescription className="text-[#737373]">
            Esta acción no se puede deshacer. El contenido &quot;{content?.title}&quot; será
            eliminado permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-[#e5e5e5] text-[#737373] hover:bg-[#f8f6f3] hover:text-[#1a1a1a]">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} className="bg-red-600 hover:bg-red-700 text-white">
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
