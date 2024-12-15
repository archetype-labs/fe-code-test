"use client";

import { Input } from "@/components/ui/input";
import { Question } from "@/types/survey";

interface TextQuestionProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export function TextQuestion({
  question,
  value,
  onChange,
  onBlur,
  onFocus,
}: TextQuestionProps) {
  return (
    <Input
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      onFocus={onFocus}
      required={question.required}
    />
  );
}
