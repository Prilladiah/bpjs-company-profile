import { cn } from "@/lib/utils";

export default function SectionTitle({
  children,
  align = "left",
  className,
}: {
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <h2 className="section-title">{children}</h2>
    </div>
  );
}
