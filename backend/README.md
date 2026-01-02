# AI Resume Generator

A Node.js application that leverages OpenAI's GPT model to tailor resumes and generate cover letters based on specific job descriptions.

## Features

- **Resume Tailoring**: Rewrites resume bullet points to align with job requirements
- **Cover Letter Generation**: Creates concise, professional cover letters
- **RESTful API**: Simple endpoint for integration

## Project Structure

```
ai-resume-generator-node/
├── controllers/
│   └── resumeController.js
├── services/
│   └── resumeService.js
├── index.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ai-resume-generator-node
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## Usage

Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`.

## API Documentation

### POST /api/ai/generate

Generates tailored resume highlights and a cover letter.

**Request Body:**
```json
{
  "resume": "Paste your full resume text here...",
  "jobDescription": "Paste the job description here..."
}
```

**Response:**
```json
{
  "resumeHighlights": [
    "Led development of scalable web applications using React and Node.js",
    "Implemented CI/CD pipelines reducing deployment time by 40%"
  ],
  "coverLetter": "Dear Hiring Manager,\n\nI am excited to apply for the Software Engineer position..."
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)

## Dependencies

- `express`: Web framework for Node.js
- `node-fetch`: HTTP client for making API requests
- `dotenv`: Loads environment variables from .env file

## Development

The application uses ES modules (`"type": "module"` in package.json).

## License


