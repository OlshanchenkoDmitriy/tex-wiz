import { useState, useEffect } from "react";

export const useMobileOptimization = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait"
  );

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setOrientation(width > height ? "landscape" : "portrait");
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    window.addEventListener("orientationchange", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("orientationchange", checkDevice);
    };
  }, []);

  // Оптимизации для мобильных устройств
  const mobileOptimizations = {
    // Уменьшаем размеры кнопок на мобильных
    buttonSize: isMobile ? "lg" : "default",

    // Увеличиваем отступы для сенсорного управления
    touchPadding: isMobile ? "p-4" : "p-2",

    // Оптимизируем размеры шрифтов
    fontSize: isMobile ? "text-base" : "text-sm",

    // Увеличиваем высоту текстовых областей
    textareaHeight: isMobile ? "min-h-[200px]" : "min-h-[300px]",

    // Оптимизируем сетку для мобильных
    gridCols: isMobile ? "grid-cols-1" : "grid-cols-2",

    // Увеличиваем размеры иконок для сенсорного управления
    iconSize: isMobile ? "w-6 h-6" : "w-4 h-4",

    // Оптимизируем отступы между элементами
    spacing: isMobile ? "space-y-4" : "space-y-2",

    // Увеличиваем размеры карточек
    cardPadding: isMobile ? "p-4" : "p-3",
  };

  return {
    isMobile,
    isTablet,
    orientation,
    mobileOptimizations,
  };
};
