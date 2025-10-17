import os
import json
import yaml
from jinja2 import Template
import frontmatter
from slugify import slugify
from parse_text import parse_text
from providers import get_llm_response

INBOX_DIR = "inbox"
EVENTS_DIR = "_events"
TEMPLATES_DIR = "templates"
SCHEMA_FILE = "schema/event.schema.yaml"

def main():
    # Load schema
    with open(SCHEMA_FILE, 'r') as f:
        schema = yaml.safe_load(f)

    # Process inbox files
    for inbox_type in ["internal", "external"]:
        inbox_path = os.path.join(INBOX_DIR, inbox_type)
        for filename in os.listdir(inbox_path):
            if filename.endswith(".txt"):
                filepath = os.path.join(inbox_path, filename)
                with open(filepath, 'r') as f:
                    content = f.read()

                # Parse text
                metadata = parse_text(content)

                # Optional LLM pass
                llm_response = get_llm_response(content)
                if llm_response:
                    llm_data = json.loads(llm_response)
                    metadata.update(llm_data.get('metadata', {}))
                    body = llm_data.get('body', '')
                    summary = llm_data.get('summary', '')
                    tags = llm_data.get('tags', [])
                else:
                    body = ""
                    summary = ""
                    tags = []

                # Add additional metadata
                metadata['summary'] = summary
                metadata['tags'] = tags
                if 'slug' not in metadata:
                    metadata['slug'] = slugify(metadata['title'])

                # Render template
                with open(os.path.join(TEMPLATES_DIR, "event_page.md.j2"), 'r') as f:
                    template = Template(f.read())
                
                rendered_content = template.render(metadata=metadata, body=body)

                # Write event file
                event_filepath = os.path.join(EVENTS_DIR, f"{metadata['slug']}.md")
                with open(event_filepath, 'w') as f:
                    f.write(rendered_content)

                print(f"Generated event: {event_filepath}")

                # Move processed file
                done_dir = os.path.join(inbox_path, ".done")
                os.makedirs(done_dir, exist_ok=True)
                os.rename(filepath, os.path.join(done_dir, filename))

if __name__ == "__main__":
    main()
