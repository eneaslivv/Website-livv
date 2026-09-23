1/ Most AI chatbot failures aren't model failures.

They're retrieval failures.

The wrong chunk came back. The model answered confidently from irrelevant context.

A thread on how custom AI chatbots work, what they cost, and where they break. ↓

2/ A custom chatbot has two layers.

Retrieval: your question hits a vector database, returns the closest document chunks.
Generation: the model sees those chunks + your question, writes the answer.

The model quality matters less than the retrieval quality.

3/ The knowledge base determines accuracy more than any other factor.

20-30 well-organized documents often outperform 200 loosely organized ones.

Chunk by topic, not by character count. A chunk split across two topics retrieves poorly for both.

4/ API cost at 200 conversations per day:

Claude Sonnet 5: ~$160-220/month
Claude Haiku 4.5: ~$40-55/month

For factual questions from a clean knowledge base, Haiku cuts API cost by ~75% with comparable accuracy.

5/ Build cost from a US boutique studio:

Focused scope (clean knowledge base, contact-form escalation): $15K-35K
Full system with CRM integration + analytics: $35K-70K

Mid-tier agencies charge $50K-120K for comparable scope.

6/ The most common post-launch failure: no escalation path.

When users hit a question the chatbot can't answer and find no route to a human, the conversation ends badly.

Design the handoff before you design the chat UI.

7/ Full piece covers RAG architecture, model selection, knowledge base design, escalation UX, and what to ask a studio before signing a contract.

→ livvvv.com/blog/how-to-build-a-custom-ai-chatbot-for-your-website
