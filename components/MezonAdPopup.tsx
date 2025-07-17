"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { X, Play, Users, Gamepad2 } from "lucide-react";

interface MezonAdPopupProps {
  open: boolean;
  onClose: () => void;
}

export const MezonAdPopup: React.FC<MezonAdPopupProps> = ({
  open,
  onClose,
}) => {
  const [showIframe, setShowIframe] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || showIframe) return;

    const handleDocClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      setShowIframe(true);
    };

    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, [open, showIframe]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div
        ref={popupRef}
        className="relative bg-[#36393f] rounded-lg shadow-2xl border border-[#4f545c] p-6 max-w-sm w-full mx-4 text-center transform transition-all hover:scale-[1.01] cursor-pointer group"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("button")) return;
          setShowIframe(true);
        }}
        style={{
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        }}
      >
        <button
          className="absolute top-2 right-2 bg-[#4f545c] hover:bg-[#f04747] rounded-full p-1.5 transition-all z-10 group/close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Đóng quảng cáo"
        >
          <X className="w-3.5 h-3.5 text-[#dcddde] group-hover/close:text-white" />
        </button>

        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-[#5865f2] to-[#4752c4] rounded-full flex items-center justify-center shadow-lg">
              <Gamepad2 className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#f04747] rounded-full flex items-center justify-center">
              <Play className="w-2.5 h-2.5 text-white ml-0.5" />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-[#dcddde] leading-tight">
              Theo dõi các trận đấu tại
            </h3>
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-xl font-bold bg-gradient-to-r from-[#5865f2] to-[#4752c4] bg-clip-text text-transparent">
                Mezon
              </span>
              <Users className="w-4 h-4 text-[#5865f2]" />
            </div>
          </div>

          <p className="text-[#b9bbbe] text-sm leading-relaxed max-w-xs">
            Tham gia cộng đồng game thủ và xem các trận đấu esports hấp dẫn nhất
          </p>

          <div className="flex items-center gap-2 text-xs text-[#72767d] bg-[#2f3136] px-3 py-1.5 rounded-md border border-[#4f545c]">
            <div className="w-1.5 h-1.5 bg-[#5865f2] rounded-full animate-pulse"></div>
            <a
              href="https://mezon.ai/"
              target="_blank"
              onClick={(e) => {
                onClose();
              }}
            >
              Nhấp để xem ngay
            </a>
          </div>
        </div>

        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#5865f2]/10 to-[#4752c4]/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );
};
