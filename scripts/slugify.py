import re

def slugify(text):
    text = text.lower()
    text = re.sub(r'&\w+;', '', text)
    text = re.sub(r'[^\w\s-]', '', text).strip()
    text = re.sub(r'[-\s]+', '-', text)
    return text
