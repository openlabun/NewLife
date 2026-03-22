"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Eye, EyeOff } from "lucide-react"
import { login, saveSession } from "@/lib/auth"
import { useAuth } from "@/context/AuthContext"

export default function AdminLoginPage() {
  const router = useRouter()
  const { setSession } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const { accessToken, user } = await login(email, password)
      saveSession(accessToken, user)
      setSession(accessToken, user)
      router.push("/admin/dashboard")
    } catch (err: any) {
      const msg = err?.response?.data?.message
      if (msg === 'No tienes permisos para acceder al panel de administración.') {
        setError("Tu cuenta no tiene permisos de administrador.")
      } else if (msg === 'Credenciales inválidas') {
        setError("Correo o contraseña incorrectos.")
      } else {
        setError("Error al iniciar sesión. Intenta de nuevo.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f6f3] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-12 h-12 rounded-full bg-[#d4854a] flex items-center justify-center">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-serif font-bold text-[#1a1a1a]">NewLife</span>
          </div>
          <p className="text-[#737373] text-sm">Panel de Administración</p>
        </div>

        {/* Login Card */}
        <Card className="bg-white border-[#e5e5e5] shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold text-[#1a1a1a]">Iniciar Sesión</CardTitle>
            <CardDescription className="text-[#737373]">
              Ingresa tus credenciales de administrador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#1a1a1a]">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@newlife.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3] focus:border-[#d4854a] focus:ring-[#d4854a]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#1a1a1a]">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#f8f6f3] border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#a3a3a3] focus:border-[#d4854a] focus:ring-[#d4854a] pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a3a3a3] hover:text-[#737373] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#d4854a] hover:bg-[#c07842] text-white font-medium py-5"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Ingresando...
                  </div>
                ) : (
                  "Ingresar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-[#a3a3a3] text-sm mt-6">
          ¿Olvidaste tu contraseña? Contacta al superadministrador.
        </p>
      </div>
    </div>
  )
}
