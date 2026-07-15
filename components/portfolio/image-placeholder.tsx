import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  label: string;
  className?: string;
  hideLabel?: boolean;
};

export function ImagePlaceholder({ label, className, hideLabel }: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2 bg-zinc-900 text-zinc-600",
        className
      )}
    >
      <ImageIcon className="size-6" strokeWidth={1.5} />
      {!hideLabel && (
        <span className="px-4 text-center text-xs text-zinc-500">{label}</span>
      )}
    </div>
  );
}
