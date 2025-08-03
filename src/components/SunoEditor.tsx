import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Music,
  Play,
  Download,
  Save,
  Copy,
  Mic,
  Eye,
  Code,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SunoTag {
  type: 'section' | 'style' | 'effect';
  name: string;
  description: string;
}

const sunoTags: SunoTag[] = [
  // Sections
  { type: 'section', name: '[Verse]', description: 'Куплет' },
  { type: 'section', name: '[Chorus]', description: 'Припев' },
  { type: 'section', name: '[Bridge]', description: 'Переход' },
  { type: 'section', name: '[Outro]', description: 'Концовка' },
  { type: 'section', name: '[Intro]', description: 'Вступление' },
  
  // Styles
  { type: 'style', name: '[Rock]', description: 'Рок стиль' },
  { type: 'style', name: '[Pop]', description: 'Поп стиль' },
  { type: 'style', name: '[Jazz]', description: 'Джаз стиль' },
  { type: 'style', name: '[Electronic]', description: 'Электронный стиль' },
  { type: 'style', name: '[Acoustic]', description: 'Акустический стиль' },
  
  // Effects
  { type: 'effect', name: '[Fade In]', description: 'Плавное появление' },
  { type: 'effect', name: '[Fade Out]', description: 'Плавное затухание' },
  { type: 'effect', name: '[Instrumental]', description: 'Инструментальная часть' },
  { type: 'effect', name: '[Vocal Only]', description: 'Только вокал' },
  { type: 'effect', name: '[Repeat]', description: 'Повтор' }
];

export const SunoEditor = () => {
  const [lyrics, setLyrics] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const insertTag = (tag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = lyrics.substring(0, start) + tag + '\n' + lyrics.substring(end);
    
    setLyrics(newText);
    
    // Устанавливаем курсор после вставленного тега
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tag.length + 1, start + tag.length + 1);
    }, 0);
  };

  const validateStructure = () => {
    const errors: string[] = [];
    const lines = lyrics.split('\n');
    
    // Проверка основной структуры
    const hasSections = lines.some(line => /^\[Verse\]|^\[Chorus\]/.test(line.trim()));
    if (!hasSections && lyrics.trim()) {
      errors.push("Рекомендуется добавить секции [Verse] или [Chorus]");
    }
    
    // Проверка пустых секций
    let currentSection = '';
    let sectionContent = '';
    
    for (const line of lines) {
      if (line.trim().startsWith('[') && line.trim().endsWith(']')) {
        if (currentSection && !sectionContent.trim()) {
          errors.push(`Секция ${currentSection} пустая`);
        }
        currentSection = line.trim();
        sectionContent = '';
      } else {
        sectionContent += line + '\n';
      }
    }
    
    // Проверка последней секции
    if (currentSection && !sectionContent.trim()) {
      errors.push(`Секция ${currentSection} пустая`);
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const exportSuno = () => {
    if (!validateStructure()) {
      toast({ 
        title: "Ошибка валидации", 
        description: "Исправьте ошибки перед экспортом",
        variant: "destructive"
      });
      return;
    }
    
    const sunoFormat = {
      title: songTitle || "Untitled Song",
      artist: artist || "Unknown Artist", 
      lyrics: lyrics,
      metadata: {
        created: new Date().toISOString(),
        format: "SUNO",
        version: "1.0"
      }
    };
    
    const dataStr = JSON.stringify(sunoFormat, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${songTitle || 'song'}-suno.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    toast({ title: "Экспорт", description: "Файл для SUNO экспортирован" });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(lyrics);
    toast({ title: "Скопировано", description: "Текст песни скопирован" });
  };

  const startVoiceInput = () => {
    toast({ title: "Голосовой ввод", description: "Функция будет доступна после интеграции с модулем Speech" });
  };

  const previewLyrics = () => {
    setIsPreviewMode(!isPreviewMode);
    validateStructure();
  };

  const renderPreview = () => {
    const lines = lyrics.split('\n');
    return (
      <div className="space-y-4">
        {lines.map((line, index) => {
          const trimmedLine = line.trim();
          
          if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) {
            // Секция
            const tagType = sunoTags.find(tag => tag.name === trimmedLine)?.type || 'section';
            return (
              <div key={index} className="flex items-center space-x-2 my-4">
                <Badge variant={
                  tagType === 'section' ? 'default' : 
                  tagType === 'style' ? 'secondary' : 'outline'
                }>
                  {trimmedLine}
                </Badge>
              </div>
            );
          } else if (trimmedLine) {
            // Текст песни
            return (
              <p key={index} className="text-foreground leading-relaxed pl-4">
                {line}
              </p>
            );
          } else {
            // Пустая строка
            return <div key={index} className="h-2"></div>;
          }
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-secondary border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Music className="w-5 h-5 text-primary" />
            <span>SUNO Editor</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Метаданные */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Название песни</Label>
              <Input
                id="title"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                placeholder="Введите название песни"
                className="bg-background/50"
              />
            </div>
            <div>
              <Label htmlFor="artist">Исполнитель</Label>
              <Input
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Введите имя исполнителя"
                className="bg-background/50"
              />
            </div>
          </div>

          {/* Панель инструментов */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="w-4 h-4 mr-1" />
              Копировать
            </Button>
            <Button variant="outline" size="sm" onClick={startVoiceInput}>
              <Mic className="w-4 h-4 mr-1" />
              Голос
            </Button>
            <Button 
              variant={isPreviewMode ? "default" : "outline"} 
              size="sm" 
              onClick={previewLyrics}
            >
              {isPreviewMode ? <Code className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
              {isPreviewMode ? "Редактор" : "Превью"}
            </Button>
            <Button variant="outline" size="sm" onClick={exportSuno}>
              <Download className="w-4 h-4 mr-1" />
              Экспорт SUNO
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Редактор/Превью */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  {isPreviewMode ? "Превью" : "Редактор текста"}
                </h3>
                
                {validationErrors.length > 0 ? (
                  <Badge variant="destructive" className="flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{validationErrors.length} ошибок</span>
                  </Badge>
                ) : lyrics.trim() ? (
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Валидно</span>
                  </Badge>
                ) : null}
              </div>
            </CardHeader>
            <CardContent>
              {isPreviewMode ? (
                <div className="min-h-[400px] p-4 bg-background/30 rounded-md border border-border">
                  {lyrics.trim() ? renderPreview() : (
                    <p className="text-muted-foreground italic">Введите текст песни для превью</p>
                  )}
                </div>
              ) : (
                <Textarea
                  ref={textareaRef}
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                  placeholder="Введите текст песни с SUNO-тегами...

Пример:
[Verse]
Первый куплет
Текст песни

[Chorus]
Припев
Запоминающиеся слова

[Bridge]
Переходная часть
"
                  className="min-h-[400px] bg-background/50 border-border font-mono text-sm"
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Панель тегов */}
        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <h3 className="text-lg font-medium">SUNO Теги</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Секции */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-primary">Секции</h4>
                <div className="grid grid-cols-1 gap-1">
                  {sunoTags.filter(tag => tag.type === 'section').map((tag) => (
                    <Button
                      key={tag.name}
                      variant="outline"
                      size="sm"
                      className="justify-start text-xs h-8"
                      onClick={() => insertTag(tag.name)}
                    >
                      <span className="font-mono mr-2">{tag.name}</span>
                      <span className="text-muted-foreground">{tag.description}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Стили */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-accent">Стили</h4>
                <div className="grid grid-cols-1 gap-1">
                  {sunoTags.filter(tag => tag.type === 'style').map((tag) => (
                    <Button
                      key={tag.name}
                      variant="outline"
                      size="sm"
                      className="justify-start text-xs h-8"
                      onClick={() => insertTag(tag.name)}
                    >
                      <span className="font-mono mr-2">{tag.name}</span>
                      <span className="text-muted-foreground">{tag.description}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Эффекты */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-secondary-foreground">Эффекты</h4>
                <div className="grid grid-cols-1 gap-1">
                  {sunoTags.filter(tag => tag.type === 'effect').map((tag) => (
                    <Button
                      key={tag.name}
                      variant="outline"
                      size="sm"
                      className="justify-start text-xs h-8"
                      onClick={() => insertTag(tag.name)}
                    >
                      <span className="font-mono mr-2">{tag.name}</span>
                      <span className="text-muted-foreground">{tag.description}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ошибки валидации */}
          {validationErrors.length > 0 && (
            <Card className="bg-card border-destructive">
              <CardHeader>
                <h3 className="text-sm font-medium text-destructive">Ошибки валидации</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-sm text-destructive flex items-start space-x-2">
                      <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};