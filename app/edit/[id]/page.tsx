"use client";

export const dynamic = "force-dynamic";

import { LoadingLayout } from "@/components/survey/loading-layout";
import { PageLayout } from "@/components/survey/page-layout";
import { QuestionBuilder } from "@/components/survey/question-builder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getSurveyById, saveSurvey } from "@/lib/survey";
import { Question, Survey } from "@/types/survey";
import { PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditSurvey() {
  const router = useRouter();
  const params = useParams();
  const [survey, setSurvey] = useState<Survey | undefined>();

  useEffect(() => {
    if (params.id) {
      const loadedSurvey = getSurveyById(params.id as string);
      if (loadedSurvey) {
        setSurvey(loadedSurvey);
      } else {
        router.push("/");
      }
    }
  }, [params.id, router]);

  const addQuestion = () => {
    if (!survey) return;
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      type: "text",
      text: "",
      options: [],
      required: false,
    };
    setSurvey({
      ...survey,
      questions: [...survey.questions, newQuestion],
    });
  };

  const updateQuestion = (updatedQuestion: Question) => {
    if (!survey) return;
    setSurvey({
      ...survey,
      questions: survey.questions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      ),
    });
  };

  const deleteQuestion = (questionId: string) => {
    if (!survey) return;
    setSurvey({
      ...survey,
      questions: survey.questions.filter((q) => q.id !== questionId),
    });
  };

  const handleSave = () => {
    if (!survey) return;
    saveSurvey(survey);
    router.push("/");
  };

  if (!survey) {
    return <LoadingLayout />;
  }

  return (
    <PageLayout
      title="Edit Survey"
      content={
        <>
          <div className="space-y-4 mb-8">
            <Input
              placeholder="Test Title"
              value={survey.title}
              onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
            />
            <Textarea
              placeholder="Test Description"
              value={survey.description}
              onChange={(e) =>
                setSurvey({ ...survey, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-4 mb-8">
            {survey.questions.map((question) => (
              <QuestionBuilder
                key={question.id}
                question={question}
                onUpdate={updateQuestion}
                onDelete={deleteQuestion}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <Button onClick={addQuestion} variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>
        </>
      }
      footer={<Button onClick={handleSave}>Save Changes</Button>}
      goBack
    />
  );
}
