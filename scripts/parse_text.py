import re
from dateutil.parser import parse

def parse_text(text):
    lines = text.strip().split('\n')
    metadata = {}

    # Title
    if lines:
        metadata['title'] = lines[0].strip()

    # Date and Time
    for line in lines:
        try:
            date = parse(line, fuzzy=True)
            metadata['date'] = date.isoformat()
            break
        except ValueError:
            continue

    # Location
    for line in lines:
        if re.search(r'(location|where):', line, re.IGNORECASE):
            parts = line.split(':', 1)
            if len(parts) > 1:
                metadata['location'] = parts[1].strip()
                break

    # URLs
    urls = re.findall(r'https?://\S+', text)
    if urls:
        metadata['registration_url'] = urls[0]
        if len(urls) > 1:
            metadata['recording_url'] = urls[1]

    return metadata
