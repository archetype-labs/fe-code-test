"use client";

import { PageLayout } from "@/components/survey/page-layout";
import { LoadingLayout } from "@/components/survey/loading-layout";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Survey } from "@/types/survey";
import { deleteSurvey, getSurveys } from "@/lib/survey";
import surveyIllustration from "@/assets/images/survey-illustration.jpg";
import completedIllustration from "@/assets/images/completed-illustration.jpg";
import { SurveyCard } from "@/components/survey/survey-card";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isOnboarding = surveys.length === 0;

  useEffect(() => {
    setSurveys(getSurveys());
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingLayout />;
  }

  if (isOnboarding) {
    return (
      <div className="max-w-5xl my-24 mx-auto px-24">
        <div className="container rounded-md max-w-3xl bg-background drop-shadow-lg p-24 mx-auto">
          <div className="flex flex-col gap-4 items-center">
            <div className="lg:h-[384px] w-fit">
              <img src={surveyIllustration.src} className="w-max" />
            </div>

            <div className="flex flex-col gap-6 text-center max-w-xl">
              <h1 className="text-3xl font-bold">Welcome to Survey Builder</h1>

              <p className="text-center text-muted-foreground text-lg">
                Create a survey and share it with your audience. Collect
                responses and analyze the results.
              </p>

              <Button
                className="w-auto self-center"
                onClick={() => router.push("/create")}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create A New Survey
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = (id: string) => {
    deleteSurvey(id);
    setSurveys(getSurveys());
    toast.success("Survey deleted successfully");
  };

  return (
    <PageLayout
      title="Survey Builder"
      actions={
        <Button onClick={() => router.push("/create")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create A New Survey
        </Button>
      }
      content={
        <>
          <div className="mb-12 flex flex-col gap-6">
            {surveys.map((survey) => (
              <SurveyCard
                key={survey.id}
                survey={survey}
                onDelete={handleDelete}
              />
            ))}
          </div>

          <div className="">
            <img
              src={completedIllustration.src}
              className="rounded-bl-md w-2/4 relative -bottom-12"
            />
          </div>
        </>
      }
    />
  );
}
