import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function TooltipPortal({ children }: { children: React.ReactNode }) {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const tooltipRoot = document.body;
    tooltipRoot.appendChild(elRef.current!);
    return () => {
      tooltipRoot.removeChild(elRef.current!);
    };
  }, []);

  return createPortal(children, elRef.current);
} 