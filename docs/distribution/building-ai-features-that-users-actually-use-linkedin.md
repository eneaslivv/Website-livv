AI features built for the demo tend to die in production. The usage drop appears around eight weeks after launch: initial engagement, then a cliff. The pattern shows up in internal tools, consumer products, and enterprise software, and the underlying cause is consistent.

Teams build AI features around what the model can do rather than what users need to get done. That framing sounds minor. It determines whether a feature survives contact with real users.

A capability-first feature asks "what can we do with AI?" A workflow-first feature asks "which tasks are users doing repeatedly, and are those tasks slower or less accurate than they need to be?" The second question is harder to answer. It also produces features users keep.

The adoption conditions are two. The task must be repeated often: a feature that saves 3 minutes on a task done 15 times a day becomes indispensable within two weeks; saving 20 minutes on a once-a-year task does not register as valuable. And the model must be accurate enough on actual user inputs that people form a positive expectation of its behavior in the first two weeks of use.

The demo tests neither condition. It runs on chosen data with crafted prompts. The product runs on a user's actual inputs at scale, without anyone on hand to explain when the model does something unexpected. The interface design problems that determine survival -- correction mechanisms, expectation-setting, failure handling -- are invisible in a demo.

A few numbers worth having:

- Usage cliffs appear around 8 weeks after launch, after novelty wears off
- Correction rate above 40% on a specific task type signals the model is not meeting expectations
- Abandonment rate above 20% signals the interface design is failing
- Week-four retention, not week-one engagement, is the actual adoption signal
- Well-scoped AI feature additions cost $8,000-$25,000 to add to an existing product
- API costs run $50-$500/month at moderate usage; $2,000-$10,000/month at high volume

The full piece covers task selection, correction mechanism design, expectation-setting in the interface, version pinning, and the instrumentation to put in place before you ship.

→ https://livvvv.com/blog/building-ai-features-that-users-actually-use
