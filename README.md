# Halchemy Events Hub

This repository contains the source code for the Halchemy Events Hub, a static website built with Jekyll. It features a sophisticated, automated workflow that generates event pages from simple text files.

## How It Works: An Automated Content Pipeline

This project is more than just a website; it's an automated content pipeline. The core idea is to make creating new event pages as simple as possible, without needing to manually write Markdown or HTML. This is achieved through a chain reaction of two GitHub Actions workflows.

Here is the end-to-end process:

```
You push a text file to inbox/
     |
     v
1. 'Generate Events' workflow runs
   - Runs a Python script to parse the text
   - Commits a new, formatted event file to _events/
     |
     v
2. This new commit triggers the 'Deploy Jekyll site' workflow
   - Builds the entire Jekyll site (HTML, CSS)
   - Deploys the finished site to GitHub Pages
     |
     v
Your new event is live on the website!
```

### Workflow 1: The Content Generator (`generate-on-push.yml`)

This workflow acts as a personal content assistant. It is triggered whenever a new file is added to the `inbox/` directory. It runs the `scripts/generate_event.py` script, which reads your text file, parses it, and creates a properly formatted Jekyll event page as a Markdown file in the `_events/` directory. It then automatically commits this new file back to the repository.

### Workflow 2: The Site Builder & Deployer (`pages.yml`)

This workflow is the standard GitHub Pages process. It is triggered on *every* push to the `main` branch, including the automated pushes from the Content Generator. It builds the entire Jekyll site—taking all the content and templates and generating the final HTML—and deploys the result to your live GitHub Pages URL.

## Why This Architecture?

Working directly with the site's code, as in this project, offers significant advantages over a closed platform like WordPress:

*   **Direct Control & Customization:** You have complete control over every aspect of the site, from the visual design to the automation logic. You are not limited by the features of a pre-existing theme or plugin.
*   **Limitless Integration:** You can connect your project to any external service or API. This is especially powerful for AI integrations. The `scripts/providers.py` file is the starting point for using models from any provider to automatically generate summaries, create images, or even write entire event descriptions from a few bullet points.
*   **Powerful Automation:** The Python scripts can be extended to perform any task you can imagine, creating a workflow that is perfectly tailored to your needs.

## Usage

To create a new event, simply add a new text file (`.txt`) to the `inbox/internal` or `inbox/external` directory. The content of the file should be the raw details of the event. The automation will handle the rest.

Once the workflows complete, the processed text file will be moved to the `.done` subdirectory within its respective inbox folder.

## Features

- **Static Site:** Built with Jekyll for fast, secure, and reliable performance on GitHub Pages.
- **Automated Event Generation:** A GitHub Action automatically generates event pages from text files.
- **Extensible AI Integration:** A modular system for integrating with LLMs (OpenAI, Anthropic, Gemini, etc.) to enrich content.
- **Branded Design:** A futuristic, minimal, dark UI with glowing gradient accents.
- **Responsive and Accessible:** Designed to work on all devices with a focus on accessibility.

## Getting Started

(This section would contain the original setup instructions for GitHub Pages, `baseurl`, and custom domains, as they are still relevant).