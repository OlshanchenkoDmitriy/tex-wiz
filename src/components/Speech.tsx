import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Save, 
  Copy,
  Volume2,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Speech = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState<"ru" | "en" | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Симуляция распознавания речи (в реальном приложении здесь будет Google Speech-to-Text или OpenAI Whisper)
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        await processAudio(audioBlob);
        
        // Останавливаем все треки
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // Запускаем таймер
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      toast({ title: "Запись начата", description: "Говорите в микрофон..." });
    } catch (error) {
      toast({ 
        title: "Ошибка доступа", 
        description: "Не удалось получить доступ к микрофону",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      toast({ title: "Обработка", description: "Распознавание речи..." });
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    // В реальном приложении здесь будет отправка в Google Speech-to-Text или OpenAI Whisper
    // Сейчас симулируем обработку
    setTimeout(() => {
      const mockTexts = [
        { text: "Привет, это тестовое сообщение на русском языке", lang: "ru" as const },
        { text: "Hello, this is a test message in English language", lang: "en" as const },
        { text: "Сегодня прекрасная погода для работы с приложением", lang: "ru" as const },
        { text: "This application supports real-time speech recognition", lang: "en" as const }
      ];
      
      const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
      setTranscribedText(randomText.text);
      setDetectedLanguage(randomText.lang);
      setIsProcessing(false);
      setRecordingTime(0);
      
      toast({ 
        title: "Готово", 
        description: `Текст распознан (${randomText.lang === 'ru' ? 'Русский' : 'English'})` 
      });
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcribedText);
    toast({ title: "Скопировано", description: "Текст скопирован в буфер обмена" });
  };

  const saveToHistory = () => {
    // В реальном приложении здесь будет сохранение в историю
    toast({ title: "Сохранено", description: "Запись добавлена в историю" });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-secondary border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5 text-primary" />
            <span>Распознавание речи</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Контроль записи */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Button
                size="lg"
                variant={isRecording ? "destructive" : "default"}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
                className={`w-20 h-20 rounded-full transition-all duration-300 ${
                  isRecording ? 'animate-pulse shadow-glow' : 'hover:scale-105'
                }`}
              >
                {isRecording ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>
              
              {/* Индикатор записи */}
              {isRecording && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-destructive rounded-full animate-pulse flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <p className="text-lg font-medium">
                {isRecording ? "Идет запись..." : 
                 isProcessing ? "Обработка..." : 
                 "Нажмите для начала записи"}
              </p>
              
              {(isRecording || recordingTime > 0) && (
                <Badge variant="outline" className="mt-2">
                  {formatTime(recordingTime)}
                </Badge>
              )}
            </div>
          </div>

          {/* Результат распознавания */}
          {transcribedText && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Распознанный текст</h3>
                <div className="flex items-center space-x-2">
                  {detectedLanguage && (
                    <Badge variant="secondary">
                      {detectedLanguage === 'ru' ? '🇷🇺 Русский' : '🇺🇸 English'}
                    </Badge>
                  )}
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={saveToHistory}>
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <Textarea
                value={transcribedText}
                onChange={(e) => setTranscribedText(e.target.value)}
                className="min-h-[150px] bg-background/50 border-border"
                placeholder="Распознанный текст появится здесь..."
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Настройки */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Settings className="w-4 h-4 text-primary" />
            <span>Настройки распознавания</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Языки</label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth">
                  🇷🇺 Русский
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth">
                  🇺🇸 English
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth">
                  🌐 Авто
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Качество</label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer">Стандарт</Badge>
                <Badge variant="secondary" className="cursor-pointer">Премиум</Badge>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>• Поддержка Google Speech-to-Text с автоопределением языка</p>
            <p>• Альтернативная поддержка OpenAI Whisper API</p>
            <p>• Распознавание в реальном времени</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};