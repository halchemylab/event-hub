# Halchemy Events Hub

This repository contains the source code for the Halchemy Events Hub, a static website built with Jekyll and hosted on GitHub Pages. It features an automated event generation workflow using Python and optional LLM assistance.

## Features

- **Static Site:** Built with Jekyll for fast, secure, and reliable performance on GitHub Pages.
- **Automated Event Generation:** A GitHub Action automatically generates event pages from text files dropped into an `inbox` directory.
- **LLM-Assisted Content:** Optionally leverage LLMs (OpenAI, Anthropic, Gemini) to enrich event descriptions and metadata.
- **Branded Design:** A futuristic, minimal, dark UI with glowing gradient accents.
- **Responsive and Accessible:** Designed to work on all devices with a focus on accessibility.

## Getting Started

### Enabling GitHub Pages

1.  Go to your repository's **Settings** tab.
2.  In the left sidebar, click on **Pages**.
3.  Under **Build and deployment**, select **Deploy from a branch** as the source.
4.  Choose the `main` branch and the `/(root)` folder, then click **Save**.

### `baseurl` Configuration

-   If you are hosting the site on a project page (e.g., `https://username.github.io/repository-name`), set the `baseurl` in `_config.yml` to your repository name (e.g., `/repository-name`).
-   If you are using a custom domain, set the `baseurl` to `""`.

### Custom Domain

1.  Create a `CNAME` file in the root of your repository with your custom domain (e.g., `events.halchemy-labs.com`).
2.  In your DNS provider's settings, create a `CNAME` record that points your custom domain to your GitHub Pages URL (e.g., `halchemylab.github.io`).

## Usage

### Event Generation Workflow

1.  Add a new text file (`.txt`) to the `inbox/internal` or `inbox/external` directory.
2.  The GitHub Action will automatically trigger, parsing the text file and generating a new event page in the `_events` directory.
3.  The processed text file will be moved to the `.done` subdirectory within its respective inbox folder.

### LLM Integration (Optional)

To enable LLM-assisted content generation, you need to configure the following repository secrets:

-   `LLM_PROVIDER`: The LLM provider to use (`openai`, `anthropic`, or `gemini`).
-   `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, or `GOOGLE_AI_KEY`: The API key for your chosen provider.

If `LLM_PROVIDER` is set to `none` or is not defined, the event generation will proceed without LLM assistance.

### Creating a Series

1.  Create a new Markdown file in the `_series` directory.
2.  Add the necessary front matter, including `title`, `slug`, `description`, and an optional `subscribe_url`.
3.  To associate an event with a series, add a `series` field to the event's front matter with the series slug.
