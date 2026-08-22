Engineering Challenge

* The Problem *

- Build a service that takes a LinkedIn profile URL and a company, and returns:
- Whether that person currently belongs to that company A confidence score with the evidence behind it
- Full enriched details about the person and company — current and past roles
- The person's work email and phone number, enriched via Apollo

For verification, data must come from LinkedIn directly. No third-party enrichment APIs for this part — how you get the data is part of the problem.

For contact enrichment, you can use Apollo's API. We'll provide an API key on request — or use their free tier. Handle the cases where Apollo has no match, a partial match (email but no phone), or a match you don't trust (the Apollo person doesn't look like the LinkedIn person).

Assume a real customer will hit this at volume, across many companies, with messy inputs.

That's the brief. The rest is up to you

Ground rules
Any language, framework, or tool.
Make assumptions, write them down, move on.

Deliverables
A git repo with:
- Working code — one command to run. Sample requests covering the interesting cases, not just the happy path.
- README — setup, run, test.
- DECISIONS.md (1–2 pages) — how you interpreted the problem, what you built, what you skipped, what you'd do next, and how this becomes a system handling 100k verifications a day. This is the most important document in your submission.

Tests for whatever you think matters most.

What we're evaluating
How you think when the problem isn't fully defined. The under-specification is the test.
 






