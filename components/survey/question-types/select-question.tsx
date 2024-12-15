"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Question } from "@/types/survey";

interface SelectQuestionProps {
  question: Question;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export function SelectQuestion({
  question,
  value,
  onChange,
  onBlur,
  onFocus,
}: SelectQuestionProps) {
  return (
    <Select value={value as string} onValueChange={onChange}>
      <SelectTrigger onBlur={onBlur} onFocus={onFocus}>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        {question.options?.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
