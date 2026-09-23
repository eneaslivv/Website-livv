Most AI chatbot failures aren't model failures. They're retrieval failures. The wrong document chunk came back. The model answered confidently from irrelevant context.

Switching to a more expensive model doesn't fix this. Improving how the knowledge base is organized does.

A custom chatbot has two layers: a retrieval layer that finds relevant content from your documents, and a generation layer where the model produces an answer. Retrieval quality determines answer quality. A mid-tier model with good retrieved context outperforms an expensive one working from irrelevant chunks.

The difference between a widget-based chatbot and a custom build is structural. A widget connects to a generic training corpus. A custom chatbot answers from documents your team controls. When your product changes, you update the document. The chatbot updates accordingly. A widget's answers on product-specific edge cases depend on what the model can infer from your homepage.

Cost benchmarks for anyone evaluating this:

- Claude Sonnet 5 at 200 conversations per day costs approximately $160 to $220 per month in API fees. Claude Haiku 4.5 at the same volume: approximately $40 to $55 per month.
- Build cost from a US boutique studio: $15,000 to $35,000 for a focused scope with a clean knowledge base and a contact-form escalation. Add CRM integration and conversation analytics: $35,000 to $70,000.
- Mid-tier agencies charge $50,000 to $120,000 for comparable scope.
- A chatbot with 20 to 30 well-written documents frequently outperforms one with 200 loosely organized pages. Retrieval accuracy depends on document quality, not document count.
- The most common post-launch failure: no defined escalation path. When users hit questions the chatbot can't answer and find no route to a human, the conversation ends badly and recovery is difficult.

The full piece covers RAG architecture, knowledge base design, model selection, conversation state management, escalation design, and what to ask a studio before signing a contract.

→ https://livvvv.com/blog/how-to-build-a-custom-ai-chatbot-for-your-website
