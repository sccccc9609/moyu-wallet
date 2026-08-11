from pathlib import Path
from PIL import Image, ImageOps


ROOT = Path(r"C:\Users\sun\Documents\ChatGPT\摸鱼小程序")
OUT = ROOT / "src" / "assets" / "pets"
OUT.mkdir(parents=True, exist_ok=True)

month_source = Image.open(
    r"C:\Users\sun\AppData\Local\Temp\codex-clipboard-4e71d2ec-70e7-4c25-8fac-2f9d9b4c7011.png"
).convert("RGB")
themes_source = Image.open(
    r"C:\Users\sun\AppData\Local\Temp\codex-clipboard-222906dc-ee12-4373-a302-4e8922f53ce8.png"
).convert("RGB")


def export(source: Image.Image, box: tuple[int, int, int, int], name: str) -> None:
    crop = source.crop(box)
    corner = crop.getpixel((3, 3))
    square = ImageOps.pad(crop, (512, 512), method=Image.Resampling.LANCZOS, color=corner, centering=(0.5, 0.5))
    square.save(OUT / f"{name}.png", optimize=True)


# 月薪喵来自用户第一张截图，其余主题来自第二张主题总览截图。
export(month_source, (45, 155, 292, 472), "monthly-cat")
export(themes_source, (8, 5, 430, 375), "calico-cat")
export(themes_source, (12, 385, 430, 765), "blue-cat")
export(themes_source, (445, 385, 858, 765), "star-cat")
export(themes_source, (12, 780, 430, 1142), "bigeye-cat")
export(themes_source, (445, 780, 858, 1142), "cream-cat")

print(f"Exported 6 reference pets to {OUT}")
