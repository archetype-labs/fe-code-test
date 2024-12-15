"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Question } from "@/types/survey";
import { TextQuestion } from "./question-types/text-question";
import { RadioQuestion } from "./question-types/radio-question";
import { CheckboxQuestion } from "./question-types/checkbox-question";
import { SelectQuestion } from "./question-types/select-question";
import { MultiselectQuestion } from "./question-types/multiselect-question";
import { DateQuestion } from "./question-types/date-question";
import { RatingQuestion } from "./question-types/rating-question";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface QuestionDisplayProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
}

export function QuestionDisplay({
  question,
  value,
  onChange,
}: QuestionDisplayProps) {
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);

  const isAnswered =
    value !== undefined &&
    value !== "" &&
    (!Array.isArray(value) || value.length > 0);
  const showError = question.required && !isAnswered && touched;

  const handleFocus = () => setFocused(true);
  const handleBlur = () => {
    setFocused(false);
    setTouched(true);
  };

  return (
    <Card className={cn("p-6", showError && "border-destructive")}>
      <Label className="text-lg mb-4 block">
        {question.text}
        {question.required && <span className="text-destructive ml-1">*</span>}
      </Label>

      {question.type === "text" && (
        <TextQuestion
          question={question}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}

      {question.type === "radio" && (
        <RadioQuestion
          question={question}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}

      {question.type === "checkbox" && (
        <CheckboxQuestion
          question={question}
          value={value || []}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}

      {question.type === "singleselect" && (
        <SelectQuestion
          question={question}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}

      {question.type === "multiselect" && (
        <MultiselectQuestion
          question={question}
          value={value || []}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}

      {question.type === "date" && (
        <DateQuestion
          question={question}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}

      {question.type === "rating" && (
        <RatingQuestion
          question={question}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}

      {showError && (
        <p className="text-sm text-destructive mt-2">
          This question is required
        </p>
      )}
    </Card>
  );
}
