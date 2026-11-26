import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import { EmptyState } from "@/components/admin/ui";

export default function AdminNotFound() {
  return (
    <div className="rounded-2xl border border-hairline bg-paper">
      <EmptyState icon={SearchX} title="That item no longer exists">
        It may have been deleted.{" "}
        <Link href="/admin" className="inline-flex items-center gap-1 underline underline-offset-4">
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          Back to the overview
        </Link>
      </EmptyState>
    </div>
  );
}
