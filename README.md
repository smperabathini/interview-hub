# PrepMaster — GenAI Interview Preparation Sandbox Platform

> **A real-world engineering sandbox platform bridging algorithm theory, full-stack multi-file codebases, automated AI test suites, on-demand coaching, suggested follow-up architecture features, technical question screens, and behavioral interview practice.**

---

## 🚀 Key Features

### 1. Expanded Real-World Problem Disciplines
- **Data Structures & Algorithms (DSA)**: Dependency graph scheduling via Kahn's algorithm / Topological sort with cycle detection and parallel batching.
- **Quant (Math & Probability)**: Vectorized Monte Carlo stochastic option pricing (Geometric Brownian Motion + Box-Muller) and Markov chain steady-state probability transitions.
- **Full-Stack Development**: Multi-file real-time collaborative workspaces (React client + Node/OT server + SQLite revision journal).
- **API & Gateway Design**: Sliding window rate limiting, idempotency key verification, distributed cache simulation.
- **Low-Level System Design**: Thread-safe lock-striped LRU cache with sentinel nodes and high concurrency.
- **Machine Learning Fundamentals**: Vector dot-product similarity search, Cosine distance, and top-K indexing.
- **Agentic AI Systems**: ReAct reasoning loop (Thought → Action → Observation) with infinite loop prevention and schema validation.

### 2. Follow-Up Feature Suggester (Inside the Sandbox)
- Located directly inside the **Sandbox Studio** bottom pane and header toolbar.
- The AI analyzes the active codebase and suggests **2–3 architectural follow-up features** to scale, harden, and extend the system (e.g., Redis cluster fanout, end-to-end payload encryption, Sobol quasi-random sampling, Count-Min sketch cache filtering).
- Includes architectural impact rationales and **1-click code boilerplate insertion** into the active editor.

### 3. Technical Questions Screen ([`TechnicalQuestionsView.tsx`](src/components/TechnicalQuestionsView.tsx))
- Simulates real engineering technical screens where candidates must defend their architectural choices, explain design trade-offs, and address failure modes in response to interviewer follow-ups.
- Instant rubric evaluation, critique, and suggestions for stronger technical articulation.

### 4. Behavioral Questions Section ([`BehavioralQuestionsView.tsx`](src/components/BehavioralQuestionsView.tsx))
- Comprehensive practice studio for engineering behavioral interviews.
- Organized by core competencies:
  - *Technical Disagreement & Compromise*
  - *Overcoming Failure & Outage Ownership*
  - *Delivering Under Pressure & Scope De-scoping*
  - *Leadership & Driving Technical Improvement*
- Structured **STAR Framework inputs** (Situation, Task, Action, Result) with sample high-performing answers and instant AI rubric evaluation.

### 5. Autonomous Problem Synthesizer ([`AiProblemGeneratorModal.tsx`](src/components/AiProblemGeneratorModal.tsx))
- Describe any arbitrary problem or architecture in plain English.
- The AI synthesizes the problem statement, directory structure, starter code files, hidden unit/scalability testcases, and follow-up feature ideas.

### 6. Full-Stack Multi-Pane Sandbox Studio ([`SandboxStudio.tsx`](src/components/SandboxStudio.tsx))
- **File Explorer**: Multi-file tree navigation (`client/`, `server/`, `db/`, `src/`).
- **Code Editor**: Clean high-contrast minimalist editor with line numbers, code resetting, and live editing.
- **AI-Generated Testcases Suite**: Detailed breakdown of unit, integration, edge-case, and scalability tests with granular pass/fail explanations.
- **Simulated Terminal & Live Output**: Server logs, interactive sandbox CLI (`npm test`, `curl`, `clear`), and rendered component previews.

### 7. Non-Intrusive On-Demand AI Coach ([`AiCoachDrawer.tsx`](src/components/AiCoachDrawer.tsx))
- Never interrupts reasoning unsolicited.
- 4 Progressive Hint Tiers (Conceptual Nudge → Structural Direction → Algorithmic Pseudocode → Deep Review).
- Interactive Chatbot to ask questions, debug error messages, and practice articulating solution styles.

---

## 🛠️ Local Development

```bash
# Navigate to project folder
cd interview-hub

# Start local dev server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.
