#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from docx import Document
import re

def extract_text_from_docx(file_path):
    """Extract text from docx file with proper formatting"""
    try:
        doc = Document(file_path)
        full_text = []
        
        for paragraph in doc.paragraphs:
            text = paragraph.text.strip()
            if text:  # Only add non-empty paragraphs
                full_text.append(text)
        
        return '\n'.join(full_text)
    except Exception as e:
        print(f"Error reading docx: {e}")
        return None

def separate_languages(text):
    """Separate the multilingual content into different sections"""
    # Split by major headings that indicate language changes
    sections = {
        'english': [],
        'spanish': [],
        'japanese': [],
        'korean': []
    }
    
    current_section = None
    lines = text.split('\n')
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Detect language sections
        if 'The Tale of Jusaeng' in line and 'English' in text[text.find(line):text.find(line)+100]:
            current_section = 'english'
        elif 'La Historia de Jusaeng' in line and 'Autor' in text[text.find(line):text.find(line)+100]:
            current_section = 'spanish'
        elif '朱生伝' in line and '著者' in text[text.find(line):text.find(line)+100]:
            current_section = 'japanese'
        elif '주생전' in line and '저자' in text[text.find(line):text.find(line)+100]:
            current_section = 'korean'
        
        if current_section:
            sections[current_section].append(line)
    
    return sections

if __name__ == "__main__":
    # Extract text from the docx file
    text = extract_text_from_docx('jusaeng-manuscript.docx')
    
    if text:
        # Save full text
        with open('jusaeng-full-text.txt', 'w', encoding='utf-8') as f:
            f.write(text)
        
        # Separate languages
        sections = separate_languages(text)
        
        # Save each language section
        for lang, content in sections.items():
            if content:
                with open(f'jusaeng-{lang}.txt', 'w', encoding='utf-8') as f:
                    f.write('\n'.join(content))
                print(f"Saved {lang} section with {len(content)} lines")
        
        print("Text extraction completed successfully!")
        print(f"Total text length: {len(text)} characters")
    else:
        print("Failed to extract text from docx file")