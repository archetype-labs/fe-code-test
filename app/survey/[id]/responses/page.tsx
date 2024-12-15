"use client";

import { PageLayout } from "@/components/survey/page-layout";
import { Card } from "@/components/ui/card";

import noResponsesIllustration from "@/assets/images/no-responses-illustration.jpg";
import { getSurveyById, getSurveyResponses } from "@/lib/survey";
import { Survey, SurveyResponse } from "@/types/survey";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingLayout } from "@/components/survey/loading-layout";
import { NoSurveyLayout } from "@/components/survey/no-survey-layout";

export default function SurveyResponses() {
  const params = useParams();
  const [survey, setSurvey] = useState<Survey>();
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const loadedSurvey = getSurveyById(params.id as string);
      setSurvey(loadedSurvey);
      if (loadedSurvey) {
        const surveyResponses = getSurveyResponses(loadedSurvey.id);
        setResponses(surveyResponses);
      }
      setIsLoading(false);
    }
  }, [params.id]);

  if (isLoading) {
    return <LoadingLayout />;
  }

  if (!survey) {
    return <NoSurveyLayout />;
  }

  const formatAnswer = (questionId: string, value: string | string[]) => {
    const question = survey.questions.find((q) => q.id === questionId);
    if (!question) return String(value);

    if (Array.isArray(value)) {
      return question.options
        ?.filter((opt) => value.includes(opt.id))
        .map((opt) => opt.text)
        .join(", ");
    } else if (question.options) {
      return question.options.find((opt) => opt.id === value)?.text || value;
    }
    return value;
  };

  return (
    <PageLayout
      title={`${survey.title}`}
      description={`${responses.length} total ${
        responses.length === 1 ? "response" : "responses"
      }`}
      content={
        <div className="flex flex-col gap-6">
          {responses.length === 0 ? (
            <>
              <Card className="p-6">
                <p className="text-muted-foreground text-center">
                  No responses yet…
                </p>
              </Card>

              <img
                src={noResponsesIllustration.src}
                className="w-2/4 mx-auto relative -bottom-12"
              />
            </>
          ) : (
            responses.map((response) => (
              <Card key={response.id} className="p-6">
                <div className="text-sm text-muted-foreground mb-4">
                  Submitted on{" "}
                  {new Date(response.submittedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="space-y-4">
                  {survey.questions.map((question) => {
                    const answer = response.answers.find(
                      (a) => a.questionId === question.id
                    );
                    return (
                      <div key={question.id}>
                        <div className="font-medium">{question.text}</div>
                        <div className="text-muted-foreground">
                          {answer
                            ? formatAnswer(question.id, answer.value)
                            : "Not answered"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))
          )}
        </div>
      }
      goBack
    />
  );
}
