"use client";

import { PageLayout } from "@/components/survey/page-layout";
import { QuestionBuilder } from "@/components/survey/question-builder";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveSurvey } from "@/lib/survey";
import { Question, Survey } from "@/types/survey";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";

export default function CreateSurvey() {
  const router = useRouter();
  const [survey, setSurvey] = useState<Survey>({
    id: crypto.randomUUID(),
    title: "",
    description: "",
    questions: [],
    createdAt: new Date().toISOString(),
  });

  const addQuestion = () => {
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
    setSurvey({
      ...survey,
      questions: survey.questions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      ),
    });
  };

  const deleteQuestion = (questionId: string) => {
    setSurvey({
      ...survey,
      questions: survey.questions.filter((q) => q.id !== questionId),
    });
  };

  const handleSave = () => {
    saveSurvey(survey);
    router.push("/");
  };

  return (
    <PageLayout
      title="Create A New Survey"
      content={
        <>
          <div className="space-y-1 mb-8">
            <Label className="text-md font-bold block">
              Title
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Input
              placeholder="Something catchy and descriptive"
              value={survey.title}
              onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
            />
          </div>

          <div className="space-y-1 mb-8">
            <Label className="text-md font-bold block">
              Description
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Textarea
              placeholder="Give a brief description of the purpose of your survey."
              value={survey.description}
              onChange={(e) =>
                setSurvey({ ...survey, description: e.target.value })
              }
            />
          </div>

          <Label className="text-md font-bold block mb-1">
            Questions
            <span className="text-destructive ml-1">*</span>
          </Label>
          <div className="space-y-2 mb-8">
            {survey.questions.map((question) => (
              <QuestionBuilder
                key={question.id}
                question={question}
                onUpdate={updateQuestion}
                onDelete={deleteQuestion}
              />
            ))}
            <Button onClick={addQuestion} variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>
        </>
      }
      footer={<Button onClick={handleSave}>Save Survey</Button>}
      goBack
    />
  );
}
