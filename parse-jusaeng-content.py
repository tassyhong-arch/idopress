#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import json

def parse_jusaeng_content():
    """Parse the extracted Jusaeng content into structured data for the ebook reader"""
    
    # Read the full text
    with open('jusaeng-full-text.txt', 'r', encoding='utf-8') as f:
        full_text = f.read()
    
    # Define language sections and their start/end markers
    languages = {
        'korean': {
            'name': '한국어',
            'code': 'ko',
            'start_marker': '주생전 (周生傳)',
            'author_info': '저자: 권필(權韠, 1569~1612)'
        },
        'english': {
            'name': 'English',
            'code': 'en', 
            'start_marker': 'The Tale of Jusaeng',
            'author_info': 'Author: Kwon Pil (權韠, 1569-1612)'
        },
        'spanish': {
            'name': 'Español',
            'code': 'es',
            'start_marker': 'La Historia de Jusaeng',
            'author_info': 'Autor: Kwon Pil (權韠, 1569~1612)'
        },
        'japanese': {
            'name': '日本語',
            'code': 'ja',
            'start_marker': '朱生伝',
            'author_info': '著者：権韠（クォン・ピル、1569～1612）'
        }
    }
    
    # Parse Korean content (main version)
    korean_lines = []
    with open('jusaeng-korean.txt', 'r', encoding='utf-8') as f:
        korean_lines = [line.strip() for line in f.readlines() if line.strip()]
    
    # Extract story content (skip headers and author info)
    story_start_idx = 0
    for i, line in enumerate(korean_lines):
        if 'Ju Saeng' in line or '주생' in line.lower():
            story_start_idx = i
            break
    
    # Split into chapters based on content structure
    chapters = {
        'korean': [],
        'english': [],
        'spanish': [], 
        'japanese': []
    }
    
    # For Korean - manually structure based on content
    korean_story = korean_lines[story_start_idx:]
    
    # Create chapters for Korean
    current_chapter = []
    chapter_count = 1
    
    for line in korean_story:
        if len(current_chapter) > 15:  # Each chapter ~15 paragraphs
            chapters['korean'].append({
                'number': chapter_count,
                'title': f'제{chapter_count}장',
                'content': current_chapter
            })
            current_chapter = []
            chapter_count += 1
            
        current_chapter.append(line)
    
    # Add final chapter
    if current_chapter:
        chapters['korean'].append({
            'number': chapter_count,
            'title': f'제{chapter_count}장',
            'content': current_chapter
        })
    
    # For other languages, create placeholder chapters
    for lang in ['english', 'spanish', 'japanese']:
        for i in range(len(chapters['korean'])):
            chapters[lang].append({
                'number': i + 1,
                'title': f'Chapter {i + 1}' if lang == 'english' 
                         else f'Capítulo {i + 1}' if lang == 'spanish'
                         else f'第{i + 1}章',
                'content': [f'Content for {languages[lang]["name"]} Chapter {i + 1} will be available soon.']
            })
    
    return {
        'languages': languages,
        'chapters': chapters
    }

def create_jusaeng_reader_html(data):
    """Create the HTML for the multilingual Jusaeng ebook reader"""
    
    return f'''<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>주생전 (The Tale of Jusaeng) - 한국고전문학관</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        body {{
            font-family: 'Nanum Myeongjo', 'Times New Roman', serif;
            line-height: 1.8;
            background: #f8f9fa;
            transition: all 0.3s ease;
            user-select: text;
        }}

        body.dark {{
            background: #1a1a1a;
            color: #e0e0e0;
        }}

        .reader-container {{
            max-width: 800px;
            margin: 0 auto;
            background: white;
            min-height: 100vh;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            position: relative;
        }}

        .dark .reader-container {{
            background: #2d2d2d;
            box-shadow: 0 0 20px rgba(255,255,255,0.1);
        }}

        /* Header */
        .reader-header {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 20px;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }}

        .header-content {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
        }}

        .book-info {{
            flex: 1;
            min-width: 200px;
        }}

        .book-title {{
            font-size: 1.4rem;
            font-weight: bold;
            margin-bottom: 5px;
        }}

        .book-subtitle {{
            font-size: 0.9rem;
            opacity: 0.9;
        }}

        .header-controls {{
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }}

        .control-btn {{
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.85rem;
            transition: all 0.3s ease;
            white-space: nowrap;
        }}

        .control-btn:hover {{
            background: rgba(255,255,255,0.3);
            transform: translateY(-1px);
        }}

        /* Language Selector */
        .language-selector {{
            background: white;
            padding: 15px 20px;
            border-bottom: 1px solid #eee;
            position: sticky;
            top: 70px;
            z-index: 999;
        }}

        .dark .language-selector {{
            background: #2d2d2d;
            border-bottom-color: #444;
        }}

        .language-tabs {{
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
        }}

        .lang-tab {{
            padding: 8px 16px;
            background: #f0f0f0;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            white-space: nowrap;
        }}

        .lang-tab.active {{
            background: #667eea;
            color: white;
        }}

        .dark .lang-tab {{
            background: #444;
            color: #ccc;
        }}

        .dark .lang-tab.active {{
            background: #667eea;
            color: white;
        }}

        /* Progress Bar */
        .progress-container {{
            background: white;
            padding: 10px 20px;
            border-bottom: 1px solid #eee;
            position: sticky;
            top: 140px;
            z-index: 998;
        }}

        .dark .progress-container {{
            background: #2d2d2d;
            border-bottom-color: #444;
        }}

        .progress-bar {{
            width: 100%;
            height: 6px;
            background: #eee;
            border-radius: 3px;
            overflow: hidden;
        }}

        .progress-fill {{
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            border-radius: 3px;
            transition: width 0.3s ease;
            width: 0%;
        }}

        .progress-text {{
            text-align: center;
            font-size: 0.8rem;
            margin-top: 5px;
            color: #666;
        }}

        .dark .progress-text {{
            color: #ccc;
        }}

        /* Navigation */
        .chapter-navigation {{
            background: white;
            padding: 15px 20px;
            border-bottom: 1px solid #eee;
            position: sticky;
            top: 200px;
            z-index: 997;
        }}

        .dark .chapter-navigation {{
            background: #2d2d2d;
            border-bottom-color: #444;
        }}

        .chapter-buttons {{
            display: flex;
            gap: 8px;
            justify-content: center;
            flex-wrap: wrap;
        }}

        .chapter-btn {{
            padding: 8px 16px;
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.85rem;
            transition: all 0.3s ease;
            white-space: nowrap;
        }}

        .chapter-btn.active {{
            background: #667eea;
            color: white;
            border-color: #667eea;
        }}

        .dark .chapter-btn {{
            background: #3a3a3a;
            border-color: #555;
            color: #ccc;
        }}

        .dark .chapter-btn.active {{
            background: #667eea;
            color: white;
            border-color: #667eea;
        }}

        /* Content Area */
        .content-container {{
            padding: 30px;
            font-size: 18px;
            line-height: 1.8;
            margin-top: 260px;
            min-height: calc(100vh - 260px);
        }}

        .chapter-content {{
            display: none;
            animation: fadeIn 0.5s ease-in;
        }}

        .chapter-content.active {{
            display: block;
        }}

        .chapter-title {{
            font-size: 1.8rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
            text-align: center;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }}

        .dark .chapter-title {{
            color: #e0e0e0;
        }}

        .chapter-text p {{
            margin-bottom: 1.2em;
            text-indent: 1.5em;
            text-align: justify;
        }}

        .chapter-text p:first-child {{
            text-indent: 0;
        }}

        .highlight {{
            background: linear-gradient(180deg, transparent 60%, #ffd54f 60%);
            padding: 2px 0;
        }}

        .dark .highlight {{
            background: linear-gradient(180deg, transparent 60%, #ff6f00 60%);
        }}

        /* Settings Panel */
        .settings-panel {{
            position: fixed;
            top: 0;
            right: -350px;
            width: 350px;
            height: 100vh;
            background: white;
            box-shadow: -2px 0 10px rgba(0,0,0,0.1);
            z-index: 2000;
            transition: right 0.3s ease;
            padding: 20px;
            overflow-y: auto;
        }}

        .settings-panel.open {{
            right: 0;
        }}

        .dark .settings-panel {{
            background: #2d2d2d;
            box-shadow: -2px 0 10px rgba(255,255,255,0.1);
        }}

        .settings-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
        }}

        .dark .settings-header {{
            border-bottom-color: #444;
        }}

        .settings-section {{
            margin-bottom: 20px;
        }}

        .settings-section h3 {{
            margin-bottom: 10px;
            color: #333;
        }}

        .dark .settings-section h3 {{
            color: #e0e0e0;
        }}

        .font-controls {{
            display: flex;
            align-items: center;
            gap: 10px;
        }}

        .font-btn {{
            padding: 8px 12px;
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
        }}

        .font-btn:hover {{
            background: #e9ecef;
        }}

        .dark .font-btn {{
            background: #3a3a3a;
            border-color: #555;
            color: #ccc;
        }}

        .font-size-display {{
            padding: 8px 16px;
            background: #e9ecef;
            border-radius: 5px;
            font-weight: bold;
        }}

        .dark .font-size-display {{
            background: #444;
            color: #e0e0e0;
        }}

        /* Navigation Controls */
        .nav-controls {{
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 1001;
        }}

        .nav-btn {{
            padding: 12px 20px;
            background: rgba(102, 126, 234, 0.9);
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }}

        .nav-btn:hover {{
            background: rgba(102, 126, 234, 1);
            transform: translateY(-2px);
        }}

        .nav-btn:disabled {{
            opacity: 0.5;
            cursor: not-allowed;
        }}

        /* Touch Areas for Mobile */
        .touch-area {{
            position: fixed;
            top: 50%;
            transform: translateY(-50%);
            width: 60px;
            height: 200px;
            z-index: 1000;
            cursor: pointer;
            opacity: 0;
        }}

        .touch-area.left {{
            left: 0;
        }}

        .touch-area.right {{
            right: 0;
        }}

        /* Responsive */
        @media (max-width: 768px) {{
            .content-container {{
                padding: 20px 15px;
                font-size: 16px;
                margin-top: 240px;
            }}

            .reader-header {{
                padding: 12px 15px;
            }}

            .book-title {{
                font-size: 1.2rem;
            }}

            .settings-panel {{
                width: 100%;
                right: -100%;
            }}

            .header-controls {{
                justify-content: center;
            }}

            .nav-controls {{
                bottom: 15px;
                gap: 8px;
            }}

            .nav-btn {{
                padding: 10px 16px;
                font-size: 0.8rem;
            }}
        }}

        /* Animations */
        @keyframes fadeIn {{
            from {{ opacity: 0; transform: translateY(10px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}

        .overlay {{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }}

        .overlay.active {{
            opacity: 1;
            visibility: visible;
        }}
    </style>
</head>
<body>
    <!-- Overlay -->
    <div class="overlay" id="overlay"></div>

    <div class="reader-container">
        <!-- Header -->
        <div class="reader-header">
            <div class="header-content">
                <div class="book-info">
                    <div class="book-title">주생전 (The Tale of Jusaeng)</div>
                    <div class="book-subtitle">권필(權韠, 1569-1612) 著</div>
                </div>
                <div class="header-controls">
                    <button class="control-btn" onclick="toggleSettings()">⚙️ 설정</button>
                    <button class="control-btn" onclick="toggleTheme()" id="themeToggle">🌙 다크모드</button>
                    <button class="control-btn" onclick="goBack()">← 돌아가기</button>
                </div>
            </div>
        </div>

        <!-- Language Selector -->
        <div class="language-selector">
            <div class="language-tabs">
                <button class="lang-tab active" data-lang="korean">한국어</button>
                <button class="lang-tab" data-lang="english">English</button>
                <button class="lang-tab" data-lang="spanish">Español</button>
                <button class="lang-tab" data-lang="japanese">日本語</button>
            </div>
        </div>

        <!-- Progress Bar -->
        <div class="progress-container">
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
            <div class="progress-text" id="progressText">Chapter 1 of 5</div>
        </div>

        <!-- Chapter Navigation -->
        <div class="chapter-navigation">
            <div class="chapter-buttons" id="chapterButtons">
                <!-- Will be populated by JavaScript -->
            </div>
        </div>

        <!-- Content Area -->
        <div class="content-container" id="contentContainer">
            <!-- Content will be populated by JavaScript -->
        </div>

        <!-- Navigation Controls -->
        <div class="nav-controls">
            <button class="nav-btn" onclick="previousChapter()" id="prevBtn">← 이전</button>
            <button class="nav-btn" onclick="nextChapter()" id="nextBtn">다음 →</button>
        </div>

        <!-- Touch Areas for Mobile -->
        <div class="touch-area left" onclick="previousChapter()"></div>
        <div class="touch-area right" onclick="nextChapter()"></div>
    </div>

    <!-- Settings Panel -->
    <div class="settings-panel" id="settingsPanel">
        <div class="settings-header">
            <h2>읽기 설정</h2>
            <button class="control-btn" onclick="toggleSettings()">✕</button>
        </div>

        <div class="settings-section">
            <h3>글자 크기</h3>
            <div class="font-controls">
                <button class="font-btn" onclick="changeFontSize(-1)">A-</button>
                <div class="font-size-display" id="fontSizeDisplay">18px</div>
                <button class="font-btn" onclick="changeFontSize(1)">A+</button>
            </div>
        </div>

        <div class="settings-section">
            <h3>테마</h3>
            <button class="control-btn" onclick="toggleTheme()" style="width: 100%;" id="themeTogglePanel">🌙 다크모드</button>
        </div>

        <div class="settings-section">
            <h3>키보드 단축키</h3>
            <p style="font-size: 0.9rem; color: #666; line-height: 1.5;">
                ← / → : 챕터 이동<br>
                Space : 다음 챕터<br>
                Esc : 설정 닫기
            </p>
        </div>
    </div>

    <script>
        // Book data structure
        const bookData = {json.dumps(data, ensure_ascii=False, indent=12)};

        // Current state
        let currentLanguage = 'korean';
        let currentChapter = 1;
        let currentFontSize = 18;

        // Initialize the reader
        function initReader() {{
            loadLanguageTabs();
            loadChapterButtons();
            loadContent();
            updateProgress();
            updateNavigationButtons();
            restoreSettings();
        }}

        // Language management
        function loadLanguageTabs() {{
            const tabs = document.querySelectorAll('.lang-tab');
            tabs.forEach(tab => {{
                tab.addEventListener('click', () => {{
                    const lang = tab.dataset.lang;
                    switchLanguage(lang);
                }});
            }});
        }}

        function switchLanguage(lang) {{
            currentLanguage = lang;
            
            // Update active tab
            document.querySelectorAll('.lang-tab').forEach(tab => {{
                tab.classList.toggle('active', tab.dataset.lang === lang);
            }});
            
            loadChapterButtons();
            loadContent();
            updateProgress();
            
            // Save preference
            localStorage.setItem('jusaeng-language', lang);
        }}

        // Chapter management
        function loadChapterButtons() {{
            const container = document.getElementById('chapterButtons');
            const chapters = bookData.chapters[currentLanguage];
            
            container.innerHTML = chapters.map((chapter, index) => 
                `<button class="chapter-btn ${{index + 1 === currentChapter ? 'active' : ''}}" 
                         onclick="goToChapter(${{index + 1}})">
                    ${{chapter.title}}
                 </button>`
            ).join('');
        }}

        function goToChapter(chapterNum) {{
            const maxChapters = bookData.chapters[currentLanguage].length;
            if (chapterNum < 1 || chapterNum > maxChapters) return;
            
            currentChapter = chapterNum;
            loadContent();
            updateProgress();
            updateNavigationButtons();
            
            // Update chapter button states
            document.querySelectorAll('.chapter-btn').forEach((btn, index) => {{
                btn.classList.toggle('active', index + 1 === currentChapter);
            }});
            
            // Scroll to top
            window.scrollTo({{ top: 0, behavior: 'smooth' }});
            
            // Save progress
            localStorage.setItem('jusaeng-chapter', currentChapter);
        }}

        function previousChapter() {{
            if (currentChapter > 1) {{
                goToChapter(currentChapter - 1);
            }}
        }}

        function nextChapter() {{
            const maxChapters = bookData.chapters[currentLanguage].length;
            if (currentChapter < maxChapters) {{
                goToChapter(currentChapter + 1);
            }}
        }}

        // Content loading
        function loadContent() {{
            const container = document.getElementById('contentContainer');
            const chapter = bookData.chapters[currentLanguage][currentChapter - 1];
            
            if (!chapter) return;
            
            const contentHTML = `
                <div class="chapter-content active">
                    <h2 class="chapter-title">${{chapter.title}}</h2>
                    <div class="chapter-text">
                        ${{chapter.content.map(p => `<p>${{p}}</p>`).join('')}}
                    </div>
                </div>
            `;
            
            container.innerHTML = contentHTML;
        }}

        // Progress tracking
        function updateProgress() {{
            const totalChapters = bookData.chapters[currentLanguage].length;
            const progress = (currentChapter / totalChapters) * 100;
            
            document.getElementById('progressFill').style.width = progress + '%';
            document.getElementById('progressText').textContent = 
                `Chapter ${{currentChapter}} of ${{totalChapters}}`;
        }}

        function updateNavigationButtons() {{
            const maxChapters = bookData.chapters[currentLanguage].length;
            
            document.getElementById('prevBtn').disabled = currentChapter <= 1;
            document.getElementById('nextBtn').disabled = currentChapter >= maxChapters;
        }}

        // Settings management
        function toggleSettings() {{
            const panel = document.getElementById('settingsPanel');
            const overlay = document.getElementById('overlay');
            
            panel.classList.toggle('open');
            overlay.classList.toggle('active');
        }}

        function toggleTheme() {{
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            
            const themeText = isDark ? '☀️ 라이트모드' : '🌙 다크모드';
            document.getElementById('themeToggle').textContent = themeText;
            document.getElementById('themeTogglePanel').textContent = themeText;
            
            localStorage.setItem('jusaeng-theme', isDark ? 'dark' : 'light');
        }}

        function changeFontSize(change) {{
            currentFontSize += change * 2;
            if (currentFontSize < 14) currentFontSize = 14;
            if (currentFontSize > 28) currentFontSize = 28;
            
            document.getElementById('contentContainer').style.fontSize = currentFontSize + 'px';
            document.getElementById('fontSizeDisplay').textContent = currentFontSize + 'px';
            
            localStorage.setItem('jusaeng-fontSize', currentFontSize);
        }}

        // Settings persistence
        function restoreSettings() {{
            // Theme
            const savedTheme = localStorage.getItem('jusaeng-theme');
            if (savedTheme === 'dark') {{
                document.body.classList.add('dark');
                document.getElementById('themeToggle').textContent = '☀️ 라이트모드';
                document.getElementById('themeTogglePanel').textContent = '☀️ 라이트모드';
            }}
            
            // Font size
            const savedFontSize = localStorage.getItem('jusaeng-fontSize');
            if (savedFontSize) {{
                currentFontSize = parseInt(savedFontSize);
                document.getElementById('contentContainer').style.fontSize = currentFontSize + 'px';
                document.getElementById('fontSizeDisplay').textContent = currentFontSize + 'px';
            }}
            
            // Language
            const savedLanguage = localStorage.getItem('jusaeng-language');
            if (savedLanguage && bookData.chapters[savedLanguage]) {{
                switchLanguage(savedLanguage);
            }}
            
            // Chapter
            const savedChapter = localStorage.getItem('jusaeng-chapter');
            if (savedChapter) {{
                const chapterNum = parseInt(savedChapter);
                if (chapterNum >= 1 && chapterNum <= bookData.chapters[currentLanguage].length) {{
                    currentChapter = chapterNum;
                }}
            }}
        }}

        // Navigation
        function goBack() {{
            window.location.href = 'books.html';
        }}

        // Event listeners
        document.addEventListener('DOMContentLoaded', initReader);

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {{
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch(e.key) {{
                case 'ArrowLeft':
                    e.preventDefault();
                    previousChapter();
                    break;
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    nextChapter();
                    break;
                case 'Escape':
                    e.preventDefault();
                    if (document.getElementById('settingsPanel').classList.contains('open')) {{
                        toggleSettings();
                    }}
                    break;
            }}
        }});

        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', function(e) {{
            touchStartX = e.changedTouches[0].screenX;
        }});

        document.addEventListener('touchend', function(e) {{
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }});

        function handleSwipe() {{
            const swipeThreshold = 50;
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {{
                if (swipeDistance > 0) {{
                    // Swipe right - previous chapter
                    previousChapter();
                }} else {{
                    // Swipe left - next chapter
                    nextChapter();
                }}
            }}
        }}

        // Close settings panel when clicking overlay
        document.getElementById('overlay').addEventListener('click', function() {{
            if (document.getElementById('settingsPanel').classList.contains('open')) {{
                toggleSettings();
            }}
        }});

        // Auto-save reading progress periodically
        setInterval(() => {{
            localStorage.setItem('jusaeng-language', currentLanguage);
            localStorage.setItem('jusaeng-chapter', currentChapter);
        }}, 5000);

        // Scroll-based progress update (fine-grained)
        window.addEventListener('scroll', function() {{
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            
            if (docHeight > 0) {{
                const scrollPercent = (scrollTop / docHeight) * 100;
                const totalChapters = bookData.chapters[currentLanguage].length;
                const baseProgress = ((currentChapter - 1) / totalChapters) * 100;
                const chapterProgress = (scrollPercent / totalChapters);
                const totalProgress = Math.min(baseProgress + chapterProgress, 100);
                
                document.getElementById('progressFill').style.width = totalProgress + '%';
            }}
        }});
    </script>
</body>
</html>'''

if __name__ == "__main__":
    # Parse the content
    data = parse_jusaeng_content()
    
    # Create the HTML
    html_content = create_jusaeng_reader_html(data)
    
    # Write the file
    with open('read-jusaeng.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("Created read-jusaeng.html - Multilingual mobile-optimized ebook reader")
    print(f"Korean chapters: {{len(data['chapters']['korean'])}}")
    print("Languages supported: Korean, English, Spanish, Japanese")