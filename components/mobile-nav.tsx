"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { ChessLogo } from "./logo"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden text-white hover:text-indigo-300 hover:bg-indigo-500/20">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 border-indigo-500/30"
      >
        <div className="flex flex-col space-y-6 mt-6">
          <div className="flex items-center space-x-3 pb-6 border-b border-indigo-500/30">
            <ChessLogo className="w-8 h-8" />
            <span className="text-white font-bold text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Chess NCC Vinh
            </span>
          </div>

          <nav className="flex flex-col space-y-4">
            <Link
              href="#tournament"
              className="text-white/80 hover:text-indigo-300 text-lg font-medium transition-colors"
              onClick={() => setOpen(false)}
            >
              Giải đấu
            </Link>
            <Link
              href="#players"
              className="text-white/80 hover:text-indigo-300 text-lg font-medium transition-colors"
              onClick={() => setOpen(false)}
            >
              Tuyển thủ
            </Link>
            <Link
              href="#schedule"
              className="text-white/80 hover:text-indigo-300 text-lg font-medium transition-colors"
              onClick={() => setOpen(false)}
            >
              Lịch thi đấu
            </Link>
            <Link
              href="#prizes"
              className="text-white/80 hover:text-indigo-300 text-lg font-medium transition-colors"
              onClick={() => setOpen(false)}
            >
              Giải thưởng
            </Link>
            <Link
              href="#register"
              className="text-white/80 hover:text-indigo-300 text-lg font-medium transition-colors"
              onClick={() => setOpen(false)}
            >
              Đăng ký
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
