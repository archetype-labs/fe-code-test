import { PageLayout } from "@/components/survey/page-layout";

export function LoadingLayout() {
  return (
    <PageLayout
      content={
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      }
    />
  );
}
