import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Hash, Search, CheckSquare, Square } from "lucide-react";

interface SpecialChar {
  char: string;
  positions: number[];
  context: { before: string; after: string }[];
}

interface SpecialCharCategory {
  name: string;
  chars: SpecialChar[];
  count: number;
}

interface SpecialCharsManagerProps {
  text: string;
  onTextChange: (newText: string) => void;
}

export const SpecialCharsManager = ({ text, onTextChange }: SpecialCharsManagerProps) => {
  const [selectedChars, setSelectedChars] = useState<Set<string>>(new Set());
  const [isOpen, setIsOpen] = useState(false);

  const specialChars = useMemo(() => {
    const charMap = new Map<string, number[]>();
    
    // Найти все специальные символы и их позиции
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      // Проверяем, что символ не является буквой (русской/английской), цифрой или пробелом
      if (!/[\p{L}\p{N}\s]/u.test(char)) {
        if (!charMap.has(char)) {
          charMap.set(char, []);
        }
        charMap.get(char)!.push(i);
      }
    }

    // Создать объекты с контекстом
    const chars: SpecialChar[] = Array.from(charMap.entries()).map(([char, positions]) => {
      const context = positions.map(pos => {
        const before = text.slice(Math.max(0, pos - 15), pos);
        const after = text.slice(pos + 1, Math.min(text.length, pos + 16));
        return { before, after };
      });
      return { char, positions, context };
    });

    return chars;
  }, [text]);

  const categories = useMemo(() => {
    const punctuation = /[.,!?:;¿¡]/;
    const brackets = /[()[\]{}]/;
    const quotes = /["'`«»""'']/;
    const math = /[+\-*/=<>]/;
    const currency = /[$€£¥₽]/;
    const special = /[&%#@^~|\\]/;

    const categorized: SpecialCharCategory[] = [
      { name: "Знаки препинания", chars: [], count: 0 },
      { name: "Скобки", chars: [], count: 0 },
      { name: "Кавычки", chars: [], count: 0 },
      { name: "Математические", chars: [], count: 0 },
      { name: "Валюта", chars: [], count: 0 },
      { name: "Прочие", chars: [], count: 0 }
    ];

    specialChars.forEach(charObj => {
      const char = charObj.char;
      let categoryIndex = 5; // По умолчанию "Прочие"

      if (punctuation.test(char)) categoryIndex = 0;
      else if (brackets.test(char)) categoryIndex = 1;
      else if (quotes.test(char)) categoryIndex = 2;
      else if (math.test(char)) categoryIndex = 3;
      else if (currency.test(char)) categoryIndex = 4;

      categorized[categoryIndex].chars.push(charObj);
      categorized[categoryIndex].count += charObj.positions.length;
    });

    return categorized.filter(cat => cat.chars.length > 0);
  }, [specialChars]);

  const handleCharToggle = (char: string) => {
    const newSelected = new Set(selectedChars);
    if (newSelected.has(char)) {
      newSelected.delete(char);
    } else {
      newSelected.add(char);
    }
    setSelectedChars(newSelected);
  };

  const handleCategoryToggle = (category: SpecialCharCategory, selectAll: boolean) => {
    const newSelected = new Set(selectedChars);
    category.chars.forEach(charObj => {
      if (selectAll) {
        newSelected.add(charObj.char);
      } else {
        newSelected.delete(charObj.char);
      }
    });
    setSelectedChars(newSelected);
  };

  const applyChanges = () => {
    if (selectedChars.size === 0) return;

    let newText = text;
    const sortedChars = Array.from(selectedChars).sort((a, b) => b.localeCompare(a));
    
    sortedChars.forEach(char => {
      const regex = new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      newText = newText.replace(regex, '');
    });

    onTextChange(newText);
    setSelectedChars(new Set());
    setIsOpen(false);
  };

  const totalSpecialChars = specialChars.reduce((sum, char) => sum + char.positions.length, 0);

  if (totalSpecialChars === 0) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Hash className="w-3 h-3 mr-1" />
        Интерактивно
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Search className="w-3 h-3 mr-1" />
          Интерактивно
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Hash className="w-5 h-5 text-primary" />
            <span>Интерактивное удаление специальных символов</span>
            <Badge variant="secondary">{totalSpecialChars} найдено</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh]">
          <div className="space-y-6">
            {categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium flex items-center space-x-2">
                    <span>{category.name}</span>
                    <Badge variant="outline">{category.count} символов</Badge>
                  </h4>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCategoryToggle(category, true)}
                    >
                      <CheckSquare className="w-4 h-4 mr-1" />
                      Все
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCategoryToggle(category, false)}
                    >
                      <Square className="w-4 h-4 mr-1" />
                      Ничего
                    </Button>
                  </div>
                </div>

                <div className="grid gap-3">
                  {category.chars.map((charObj, charIndex) => (
                    <div key={charIndex} className="border rounded-lg p-3 bg-card">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id={`${categoryIndex}-${charIndex}`}
                          checked={selectedChars.has(charObj.char)}
                          onCheckedChange={() => handleCharToggle(charObj.char)}
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-lg bg-muted px-2 py-1 rounded">
                              {charObj.char}
                            </span>
                            <Badge variant="secondary">
                              {charObj.positions.length} вхождений
                            </Badge>
                          </div>
                          
                          <div className="space-y-1">
                            {charObj.context.slice(0, 3).map((ctx, ctxIndex) => (
                              <div key={ctxIndex} className="text-sm text-muted-foreground font-mono bg-muted/50 p-2 rounded">
                                ...{ctx.before}
                                <span className="bg-destructive/20 text-destructive px-1 rounded">
                                  {charObj.char}
                                </span>
                                {ctx.after}...
                              </div>
                            ))}
                            {charObj.context.length > 3 && (
                              <div className="text-xs text-muted-foreground">
                                И еще {charObj.context.length - 3} вхождений...
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {categoryIndex < categories.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Выбрано: {selectedChars.size} типов символов
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button 
              onClick={applyChanges}
              disabled={selectedChars.size === 0}
            >
              Удалить выбранные ({selectedChars.size})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};