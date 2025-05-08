# Clinical RAG Chatbot

This project is a **Retrieval-Augmented Generation (RAG)**-based chatbot designed to retrieve and summarize medical information from clinical documents. The chatbot uses a combination of modern AI technologies to provide accurate and context-aware responses to user queries.

## Features
- **RAG-based Retrieval**: Combines document retrieval with generative AI to provide accurate and contextually relevant answers.
- **Medical Information Retrieval**: Processes clinical documents (e.g., PDFs) to extract and summarize key medical information.
- **Interactive Chat Interface**: A user-friendly React-based frontend for interacting with the chatbot.
- **MongoDB Integration**: Stores query history, responses, and chat logs for future reference.

---

## Tech Stack

### Backend
- **Python**: Core programming language for the backend.
- **Flask**: Lightweight web framework for handling API requests.
- **Flask-CORS**: Enables Cross-Origin Resource Sharing (CORS) for frontend-backend communication.
- **LangChain**: Used for implementing the RAG pipeline.
  - **Chroma**: Vector store for document embeddings.
  - **HuggingFace Embeddings**: Embedding model for document and query representation.
- **PyPDF2**: For extracting text from PDF documents.
- **MongoDB**: Database for storing query history and chat logs.

### Frontend
- **React**: Frontend library for building the chatbot interface.
- **Vite**: Development server and build tool for React.
- **Tailwind CSS**: Utility-first CSS framework for styling the interface.

---

## How It Works

1. **Document Ingestion**:
   - Clinical documents (e.g., PDFs) are processed and split into chunks.
   - Each chunk is embedded using HuggingFace embeddings and stored in a Chroma vector store.

2. **Query Processing**:
   - User queries are sent to the backend via the `/query` endpoint.
   - The RAG pipeline retrieves relevant document chunks and generates a response using a generative AI model.

3. **Response Generation**:
   - The chatbot combines retrieved document context with the query to generate a detailed and accurate response.

4. **Chat History**:
   - Queries, responses, and chat history are stored in MongoDB for future reference.

---

## Setup Instructions

### Prerequisites
- **Python 3.8+**
- **Node.js 16+**
- **MongoDB Atlas** (or a local MongoDB instance)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/YashRajVaid/clinical-rag.git
   cd clinical-rag/server
