"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageLayoutProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  goBack?: boolean;
}

export function PageLayout({
  title,
  description,
  actions,
  content,
  footer,
  goBack,
}: PageLayoutProps) {
  const router = useRouter();

  return (
    <div
      className={cn(
        "max-w-3xl",
        "mb-24",
        "mx-auto",
        goBack ? "mt-14" : "mt-24"
      )}
    >
      {goBack && (
        <Button
          className="pl-0 text-white"
          variant="link"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go back
        </Button>
      )}
      <div className="container border rounded-md bg-background drop-shadow-lg">
        {title && (
          <div className="flex justify-between py-6 px-8 border-b">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">{title}</h1>
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
            </div>
            <div>{actions}</div>
          </div>
        )}

        <div className="py-12 px-8">{content}</div>
        {footer && (
          <div className="border-t py-6 px-8 flex justify-end">{footer}</div>
        )}
      </div>
    </div>
  );
}
