# Local-First-Smart-To-Do
This project is a private, high-performance To-Do application built with a local AI stack. Utilizing an RTX 4050 GPU via LM Studio and AnythingLLM, it employs Retrieval-Augmented Generation (RAG) to index the codebase. This allows the AI to suggest context-aware refactors and features entirely offline.

# 🚀 Local AI-Driven To-Do App

A reactive To-Do application built with a local-first AI engineering stack. This project uses consumer-grade hardware (RTX 4050) to create a private assistant that understands your entire repository.

## 🧠 The Engine "Under the Hood"

### 1. The Brain: LM Studio & Qwen
- **Model:** Qwen2.5-Coder-7B-Instruct (Q4_K_M).
- **Inference:** Hosted via [LM Studio](lmstudio.ai). 32 layers are offloaded to the 6GB VRAM of the RTX 4050, delivering high-speed responses via a local `v1/chat/completions` endpoint.

### 2. The Memory: RAG & Vector Indexing
- **Embedding:** [AnythingLLM](anythingllm.com) uses a local embedding model to vectorize the codebase.
- **Retrieval:** Linked via GitHub PAT, the system fetches relevant code snippets from the repo and injects them into the LLM prompt. This allows the AI to "see" your files without hitting VRAM limits.

### 3. The Interface: AnythingLLM
- **Role:** Orchestrates the connection between the code, the Vector DB, and LM Studio. It acts as the primary workspace for AI-driven refactoring and feature generation.

## 🛠️ Setup
1. **Model:** Load Qwen2.5-Coder-7B in LM Studio and start the Local Server.
2. **Workspace:** Point AnythingLLM to this repo and select LM Studio as the LLM provider.
3. **Prompt:** Use AnythingLLM to ask: *"Add a filter for completed tasks based on our current CSS."*

