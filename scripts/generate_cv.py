"""Build the public, two-page CV from content/cv.json with embedded Unicode fonts.
Requires reportlab. Set CV_FONT_DIR to an Arial or Liberation Sans font directory.
"""
from pathlib import Path
from xml.sax.saxutils import escape
import json
import os
import sys
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'content/cv.json').read_text())
DEST = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / 'public/Ta-Anh-Luan-CV.pdf'
DEST.parent.mkdir(parents=True, exist_ok=True)
FONT_DIRS = [Path(os.environ.get('CV_FONT_DIR', '/System/Library/Fonts/Supplemental')),
             Path('/usr/share/fonts/truetype/liberation2'), Path('/usr/share/fonts/truetype/dejavu')]
for directory in FONT_DIRS:
    for regular, bold in [('Arial.ttf', 'Arial Bold.ttf'), ('LiberationSans-Regular.ttf', 'LiberationSans-Bold.ttf'), ('DejaVuSans.ttf', 'DejaVuSans-Bold.ttf')]:
        if (directory / regular).exists() and (directory / bold).exists():
            pdfmetrics.registerFont(TTFont('CV', str(directory / regular)))
            pdfmetrics.registerFont(TTFont('CV-Bold', str(directory / bold)))
            break
    else:
        continue
    break
else:
    raise RuntimeError('Set CV_FONT_DIR to a directory containing Arial or Liberation Sans fonts.')
pdfmetrics.registerFontFamily('CV', normal='CV', bold='CV-Bold', italic='CV', boldItalic='CV-Bold')

W, H = A4
M = 44
CW = W - M * 2
INK = colors.HexColor('#172D40')
BODY = colors.HexColor('#334653')
TEAL = colors.HexColor('#226B79')
MUTED = colors.HexColor('#627481')
LINE = colors.HexColor('#CFDCE2')
c = canvas.Canvas(str(DEST), pagesize=A4, pageCompression=1)
c.setTitle('Tạ Anh Luận | Lead Business Analyst & Product Owner')
c.setAuthor('Tạ Anh Luận')
c.setSubject('Digital banking, business analysis, product ownership and BFSI delivery')
c.setCreator('Tạ Anh Luận - CV generator')
y = H - M
lowest = []

def para(text, size=10, leading=14, color=BODY, gap=0, indent=0):
    global y
    style = ParagraphStyle('body', fontName='CV', fontSize=size, leading=leading,
                           textColor=color, alignment=TA_LEFT, splitLongWords=False)
    p = Paragraph(text, style)
    _, height = p.wrap(CW - indent, H)
    y -= height
    p.drawOn(c, M + indent, y)
    y -= gap
    return height

def text_line(text, size=10, font='CV', color=BODY, x=M, right=False):
    c.setFont(font, size)
    c.setFillColor(color)
    if right:
        c.drawRightString(x, y, text)
    else:
        c.drawString(x, y, text)

def rule(top_gap=0, bottom_gap=0):
    global y
    y -= top_gap
    c.setStrokeColor(LINE)
    c.setLineWidth(.6)
    c.line(M, y, W - M, y)
    y -= bottom_gap

def section(title):
    global y
    y -= 15
    text_line(title.upper(), 9.1, 'CV-Bold', TEAL)
    y -= 7
    rule(bottom_gap=10)

def job(item, compact=False):
    global y
    y -= 10.5
    text_line(item['company'], 11.2, 'CV-Bold', INK)
    text_line(item['period'], 9.1, 'CV', MUTED, x=W-M, right=True)
    y -= 6
    para(escape(item['role']), 10, 13, TEAL, gap=4)
    for bullet in item['bullets']:
        baseline = y
        para(escape(bullet), 10.2, 14.2, indent=10, gap=3)
        c.setFillColor(TEAL)
        c.circle(M + 2.2, baseline - 5, 1.15, stroke=0, fill=1)
    y -= 3 if compact else 5

def footer(page):
    lowest.append(round(y, 2))
    if y < 48:
        raise RuntimeError(f'Page {page} content intrudes into footer (y={y:.1f}).')
    c.setStrokeColor(LINE)
    c.setLineWidth(.6)
    c.line(M, 37, W-M, 37)
    c.setFont('CV', 8)
    c.setFillColor(MUTED)
    c.drawString(M, 23, 'Tạ Anh Luận  /  Lead Business Analyst & Product Owner')
    c.drawRightString(W-M, 23, f'{page} / 2')

# Page 1: professional summary and recent banking / insurance experience.
text_line(DATA['name'], 28, 'CV-Bold', INK)
y -= 23
text_line(DATA['title'], 12.5, 'CV', TEAL)
y -= 21
para(f'{escape(DATA["location"])}  |  {escape(DATA["phone"])}  |  <link href="mailto:{DATA["email"]}" color="#226B79">{DATA["email"]}</link>', 9.2, 13)
y -= 3
para(f'<link href="{DATA["linkedin"]}" color="#226B79">linkedin.com/in/taanhluan</link>  |  <link href="{DATA["portfolio"]}" color="#226B79">taanhluan.github.io/jonathanta</link>', 9.2, 13)
y -= 9
rule(bottom_gap=13)
para(escape(DATA['summary']), 10.1, 14.2)
section('Core expertise')
for label, value in DATA['expertise']:
    para(f'<b>{escape(label)}:</b>  {escape(value)}', 9.6, 13.1, gap=3)
section('Professional experience')
for item in DATA['recent']:
    job(item)
footer(1)
c.showPage()

# Page 2: earlier delivery roles, teaching, education and credentials.
y = H - M - 4
text_line(DATA['name'], 14, 'CV-Bold', INK)
text_line('EXPERIENCE / CONTINUED', 8.5, 'CV', MUTED, x=W-M, right=True)
y -= 12
rule(bottom_gap=4)
for item in DATA['earlier']:
    job(item, compact=True)
y -= 2
para(escape(DATA['earlyCareer']), 9.3, 12.7, MUTED)
section('Teaching & mentoring')
para(escape(DATA['mentoring']), 9.8, 13.4)
y -= 4
para('<link href="https://cole.vn/bai-viet/bootcamp-business-analyst-domain-2025" color="#226B79">COLE instructor profile</link>  |  <link href="https://taanhluan.github.io/jonathanta/#/dao-tao-ba" color="#226B79">BA BFSI mentoring</link>', 9.2, 12)
section('Education')
para(f'<b>{escape(DATA["education"]["school"])}</b>  |  {DATA["education"]["period"]}', 9.8, 13.4)
para(escape(DATA['education']['study']), 9.6, 13)
section('Credentials & professional development')
for item in DATA['credentials']:
    para(escape(item), 9.8, 13.4, gap=1.5)
footer(2)
c.save()
print(f'Generated {DEST}: 2 pages; lowest content positions {lowest} pt')
