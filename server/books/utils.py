from ebooklib import epub 
from bs4 import BeautifulSoup

from .models import Book, Section

def get_chapter_content(book, href):
    
    chapter = book.get_item_with_href(href)
    if chapter is None:
        return ""
    
    soup = BeautifulSoup(chapter.content.decode('utf-8'), 'html.parser')

    if soup.head:
        soup.head.extract()
    if soup.title:
        soup.title.extract()

    html = BeautifulSoup(str(soup), 'html.parser').prettify()
    
    return html

def create_section_recursively(items, book, obj, parent=None):
    for item in items:
        if isinstance(item, epub.Link):
            content = get_chapter_content(book, item.href)
            Section.objects.create(
                title=item.title,
                content=content, 
                parent=parent,
                book=obj
            )
        elif isinstance(item, tuple):
            section, subsections = item
            section = Section.objects.create(
                title=section.title,
                parent=parent,
                book=obj
            )
            create_section_recursively(subsections, book, obj, section)


def handle_epub_data(epub_data, obj):
    f = epub_data.temporary_file_path()
    
    book = epub.read_epub(f)
    
    toc = book.toc

    create_section_recursively(toc, book, obj)