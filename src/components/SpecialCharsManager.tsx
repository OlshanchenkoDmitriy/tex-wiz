import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface SpecialCharsManagerProps {
  text: string;
  onTextChange: (newText: string) => void;
}

export const SpecialCharsManager = ({ text, onTextChange }: SpecialCharsManagerProps) => {
  const specialChars = useMemo(() => {
    const charSet = new Set<string>();
    
    // Найти все уникальные специальные символы
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      // Проверяем, что символ не является буквой (русской/английской), цифрой или пробелом
      if (!/[\p{L}\p{N}\s]/u.test(char)) {
        charSet.add(char);
      }
    }

    return Array.from(charSet).sort();
  }, [text]);

  const removeChar = (charToRemove: string) => {
    const regex = new RegExp(charToRemove.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const newText = text.replace(regex, '');
    onTextChange(newText);
  };

  if (specialChars.length === 0) {
    return null;
  }

  return (
    <div className="border rounded-lg p-3 bg-muted/30 space-y-2">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Найденные символы:</span>
        <Badge variant="secondary" className="text-xs">
          {specialChars.length}
        </Badge>
      </div>
      <div className="flex flex-wrap gap-1">
        {specialChars.map((char, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => removeChar(char)}
            className="h-7 px-2 font-mono text-xs hover:bg-destructive/20 hover:border-destructive/50"
          >
            <span className="mr-1">{char}</span>
            <X className="w-3 h-3" />
          </Button>
        ))}
      </div>
    </div>
  );
};