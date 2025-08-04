from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    # Создаем изображение с градиентным фоном
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Создаем градиент (упрощенный)
    for i in range(size):
        for j in range(size):
            # Простой градиент от синего к темно-синему
            r = int(59 + (i + j) * 0.1)
            g = int(130 + (i + j) * 0.05)
            b = int(246 - (i + j) * 0.2)
            r = max(0, min(255, r))
            g = max(0, min(255, g))
            b = max(0, min(255, b))
            draw.point((i, j), fill=(r, g, b, 255))
    
    # Рисуем букву L
    try:
        # Пытаемся использовать системный шрифт
        font_size = size // 2
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        # Если не найден, используем стандартный
        font = ImageFont.load_default()
    
    # Рисуем букву L
    text = "L"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (size - text_width) // 2
    y = (size - text_height) // 2
    
    draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)
    
    # Сохраняем
    img.save(filename, 'PNG')
    print(f"Создана иконка: {filename}")

# Создаем иконки разных размеров
sizes = {
    'mipmap-mdpi': 48,
    'mipmap-hdpi': 72,
    'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144,
    'mipmap-xxxhdpi': 192
}

for folder, size in sizes.items():
    os.makedirs(f"android/app/src/main/res/{folder}", exist_ok=True)
    create_icon(size, f"android/app/src/main/res/{folder}/ic_launcher.png")
    create_icon(size, f"android/app/src/main/res/{folder}/ic_launcher_round.png")

print("Все иконки созданы!") 