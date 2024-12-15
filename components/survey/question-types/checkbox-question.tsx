"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Question } from "@/types/survey";

interface CheckboxQuestionProps {
  question: Question;
  value: string[];
  onChange: (value: string[]) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export function CheckboxQuestion({
  question,
  value = [],
  onChange,
  onBlur,
  onFocus,
}: CheckboxQuestionProps) {
  return (
    <div className="space-y-2">
      {question.options?.map((option) => (
        <div
          key={option.id}
          className="flex items-center space-x-2"
          tabIndex={0}
          onBlur={onBlur}
          onFocus={onFocus}
        >
          <Checkbox
            id={option.id}
            checked={value.includes(option.id)}
            onCheckedChange={(checked) => {
              onChange(
                checked
                  ? [...value, option.id]
                  : value.filter((id) => id !== option.id)
              );
            }}
            required={question.required && value.length === 0}
          />
          <Label htmlFor={option.id}>{option.text}</Label>
        </div>
      ))}
    </div>
  );
}
