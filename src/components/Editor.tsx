import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Copy, 
  Trash2, 
  Undo, 
  Redo, 
  Search, 
  Type, 
  Hash,
  Smile,
  Space,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SpecialCharsManager } from "./SpecialCharsManager";

export const Editor = () => {
  const [text, setText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [replaceTerm, setReplaceTerm] = useState("");
  const [history, setHistory] = useState<string[]>([""]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const addToHistory = (newText: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newText);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setText(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setText(history[historyIndex + 1]);
    }
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
    if (newText !== history[historyIndex]) {
      addToHistory(newText);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast({ title: "Скопировано", description: "Текст скопирован в буфер обмена" });
  };

  const clearText = () => {
    handleTextChange("");
    toast({ title: "Очищено", description: "Текст удален" });
  };

  const removeSpecialChars = () => {
    const cleanText = text.replace(/[^\p{L}\p{N}\s]/gu, "");
    handleTextChange(cleanText);
    toast({ title: "Очищено", description: "Специальные символы удалены" });
  };

  const findAndReplace = () => {
    if (!searchTerm) return;
    const newText = text.split(searchTerm).join(replaceTerm);
    handleTextChange(newText);
    toast({ title: "Замена", description: "Текст заменен" });
  };

  const transformCase = (type: 'upper' | 'lower' | 'title') => {
    let newText = text;
    switch (type) {
      case 'upper':
        newText = text.toUpperCase();
        break;
      case 'lower':
        newText = text.toLowerCase();
        break;
      case 'title':
        newText = text.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
        break;
    }
    handleTextChange(newText);
    toast({ title: "Форматирование", description: `Регистр изменен на ${type}` });
  };

  const cleanSpaces = () => {
    const newText = text.replace(/\s+/g, ' ').trim();
    handleTextChange(newText);
    toast({ title: "Очистка", description: "Лишние пробелы удалены" });
  };

  const removeEmptyLines = () => {
    const newText = text.replace(/^\s*[\r\n]/gm, '');
    handleTextChange(newText);
    toast({ title: "Очистка", description: "Пустые строки удалены" });
  };

  const removeNumbers = () => {
    const newText = text.replace(/\d/g, '');
    handleTextChange(newText);
    toast({ title: "Очистка", description: "Цифры удалены" });
  };

  const removeEmojis = () => {
    const newText = text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
    handleTextChange(newText);
    toast({ title: "Очистка", description: "Эмодзи удалены" });
  };

  const getStats = () => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split('\n').length;
    return { chars, words, lines };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-secondary border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary" />
            <span>Текстовый редактор</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Панель инструментов */}
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="transition-smooth"
            >
              <Undo className="w-4 h-4 mr-1" />
              Отменить
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="transition-smooth"
            >
              <Redo className="w-4 h-4 mr-1" />
              Повтор
            </Button>
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="w-4 h-4 mr-1" />
              Копировать
            </Button>
            <Button variant="outline" size="sm" onClick={clearText}>
              <Trash2 className="w-4 h-4 mr-1" />
              Очистить
            </Button>
          </div>

          {/* Текстовая область */}
          <Textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Введите или вставьте ваш текст здесь..."
            className="min-h-[300px] bg-background/50 border-border focus:border-primary transition-smooth"
          />

          {/* Статистика */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-background/50">
              Символов: {stats.chars}
            </Badge>
            <Badge variant="outline" className="bg-background/50">
              Слов: {stats.words}
            </Badge>
            <Badge variant="outline" className="bg-background/50">
              Строк: {stats.lines}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Инструменты форматирования */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Search className="w-4 h-4 text-primary" />
              <span>Поиск и замена</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor="search">Найти</Label>
              <Input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Текст для поиска"
                className="bg-background/50"
              />
            </div>
            <div>
              <Label htmlFor="replace">Заменить на</Label>
              <Input
                id="replace"
                value={replaceTerm}
                onChange={(e) => setReplaceTerm(e.target.value)}
                placeholder="Новый текст"
                className="bg-background/50"
              />
            </div>
            <Button onClick={findAndReplace} disabled={!searchTerm} className="w-full">
              Заменить все
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Type className="w-4 h-4 text-primary" />
              <span>Форматирование</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => transformCase('upper')}
                className="text-xs"
              >
                ВЕРХНИЙ
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => transformCase('lower')}
                className="text-xs"
              >
                нижний
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => transformCase('title')}
                className="text-xs"
              >
                Заглавный
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={removeSpecialChars}>
                <Hash className="w-3 h-3 mr-1" />
                Удалить все
              </Button>
              <SpecialCharsManager text={text} onTextChange={handleTextChange} />
              <Button variant="outline" size="sm" onClick={cleanSpaces}>
                <Space className="w-3 h-3 mr-1" />
                Пробелы
              </Button>
              <Button variant="outline" size="sm" onClick={removeNumbers}>
                123
              </Button>
              <Button variant="outline" size="sm" onClick={removeEmojis}>
                <Smile className="w-3 h-3 mr-1" />
                Эмодзи
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={removeEmptyLines} className="w-full">
              Пустые строки
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};