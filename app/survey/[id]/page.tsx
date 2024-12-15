"use client";

export const dynamic = "force-dynamic";

import { PageLayout } from "@/components/survey/page-layout";
import { Button } from "@/components/ui/button";
import { QuestionDisplay } from "@/components/survey/question-display";
import {
  generateShareableLink,
  getSurveyById,
  saveSurveyResponse,
} from "@/lib/survey";
import { Survey } from "@/types/survey";
import { Share2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingLayout } from "@/components/survey/loading-layout";
import { NoSurveyLayout } from "@/components/survey/no-survey-layout";

export default function SurveyPreview() {
  const params = useParams();
  const [survey, setSurvey] = useState<Survey | undefined>();
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      const loadedSurvey = getSurveyById(params.id as string);
      setSurvey(loadedSurvey);
    }
    setIsLoading(false);
  }, [params.id]);

  if (isLoading) {
    return <LoadingLayout />;
  }

  if (!survey) {
    return <NoSurveyLayout />;
  }

  const isValid =
    survey.questions
      .filter((q) => q.required)
      .filter((q) => {
        const val = answers[q.id];

        if (val == null || val === "") {
          // If val is null/undefined or empty string, it's unanswered
          return true;
        }
        if (Array.isArray(val) && val.length === 0) {
          // If it's an empty array, it's unanswered
          return true;
        }

        return false;
      }).length === 0;

  const handleShare = () => {
    const link = generateShareableLink(survey!.id);
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  const handleSubmit = () => {
    if (!isValid) {
      toast.error("Please answer all required questions");
      return;
    }

    // Format answers for submission
    const formattedAnswers = Object.entries(answers).map(
      ([questionId, value]) => ({
        questionId,
        value,
      })
    );

    // Create and save response
    const response = {
      id: crypto.randomUUID(),
      surveyId: survey.id,
      answers: formattedAnswers,
      submittedAt: new Date().toISOString(),
    };

    saveSurveyResponse(response);
    toast.success("Survey submitted successfully!");
    router.push("/");
  };

  return (
    <PageLayout
      title={survey.title}
      description={survey.description}
      actions={
        <Button onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      }
      content={
        <div className="flex flex-col gap-6">
          {survey.questions.map((question) => (
            <QuestionDisplay
              key={question.id}
              question={question}
              value={answers[question.id]}
              onChange={(value) => {
                setAnswers({ ...answers, [question.id]: value });
              }}
            />
          ))}
        </div>
      }
      footer={
        <div className="flex items-center gap-4">
          {!isValid && (
            <p className="text-sm text-muted-foreground italic">
              Please complete all required fields.
            </p>
          )}
          <Button disabled={!isValid} onClick={handleSubmit}>
            Submit Survey
          </Button>
        </div>
      }
    />
  );
}
