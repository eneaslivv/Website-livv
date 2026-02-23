"use client"

import { useState } from "react"
import type { Project } from "@/lib/portfolio-data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Pencil, Trash2, X } from "lucide-react"

interface MenuButtonProps {
  project: Project
  onOpenChange?: (open: boolean) => void
  onRemove?: () => void
  onCancel?: () => void
  onRename?: () => void
  hideEdit?: boolean
  isVisible?: boolean
}

export function MenuButton({ project, onOpenChange, onRemove, onCancel, onRename, hideEdit, isVisible = false }: MenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    onOpenChange?.(open)
  }

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          data-menu
          className={`p-1.5 rounded-md transition-all duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#b8836e]/30 ${isOpen ? "bg-[#2c2420]/[0.08]" : "hover:bg-[#2c2420]/[0.05]"
            } ${isVisible ? "opacity-100" : "opacity-0"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className={`w-4 h-4 transition-colors ${isOpen ? "text-[#2c2420]/70" : "text-[#8a7e74]"}`} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="top"
        sideOffset={4}
        className="w-40 bg-[#ffffff] border-[#ddd5cc] rounded-lg shadow-[0_8px_30px_rgba(44,36,32,0.1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {project.isGenerating ? (
          <DropdownMenuItem
            className="group text-[#2c2420]/70 hover:text-[#c53030] focus:text-[#c53030] focus:bg-[#2c2420]/[0.04] cursor-pointer gap-2 transition-colors"
            onClick={onCancel}
          >
            <X className="w-4 h-4 transition-colors group-hover:text-[#c53030] group-focus:text-[#c53030]" />
            Cancel
          </DropdownMenuItem>
        ) : (
          <>
            {!hideEdit && (
              <DropdownMenuItem
                className="text-[#2c2420]/70 focus:text-[#2c2420] focus:bg-[#2c2420]/[0.04] cursor-pointer gap-2"
                onClick={onRename}
              >
                <Pencil className="w-4 h-4" />
                Rename
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className="group text-[#2c2420]/70 hover:text-[#c53030] focus:text-[#c53030] focus:bg-[#2c2420]/[0.04] cursor-pointer gap-2 transition-colors"
              onClick={onRemove}
            >
              <Trash2 className="w-4 h-4 transition-colors group-hover:text-[#c53030] group-focus:text-[#c53030]" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
