import { BehavioralQuestion } from '../types';

export const BEHAVIORAL_QUESTIONS: BehavioralQuestion[] = [
  {
    id: 'beh-1',
    category: 'Technical Disagreement',
    title: 'Disagreement on System Architecture',
    question: 'Tell me about a time you strongly disagreed with a tech lead or team member about an architectural design choice. How did you resolve it, and what was the outcome?',
    context: 'Assesses technical conviction, communication with data, and disagree-and-commit maturity.',
    starPrompts: {
      situation: 'Describe the project and the conflicting technical philosophies or choices on the table.',
      task: 'What was your responsibility and what was at stake for the system’s performance or deadline?',
      action: 'How did you benchmark, prototype, or gather evidence to frame the discussion constructively?',
      result: 'What consensus was reached, how did the system perform, and what did you learn about team alignment?'
    },
    sampleAnswer: 'During the migration of our transaction service, a senior engineer proposed an in-memory cache without write-behind persistence. I was concerned about data loss during failovers. Instead of arguing abstractly, I created a quick benchmark simulating node restarts under 10k RPS, proving 2.4% lost writes. I proposed a hybrid write-ahead log (WAL) solution that preserved 99.999% durability while retaining 95% of the desired speed. We agreed on this compromise, and the service launched with zero data loss in production.',
    evaluationRubric: [
      'Relies on data, benchmarks, or customer impact rather than personal opinion',
      'Demonstrates respect and active listening toward differing opinions',
      'Shows willingness to find pragmatic compromises and commit fully once a decision is made'
    ]
  },
  {
    id: 'beh-2',
    category: 'Overcoming Failure',
    title: 'Post-Mortem & Production Outage Ownership',
    question: 'Describe a situation where a piece of code you deployed caused an unexpected production bug or outage. How did you handle the incident and what safeguards did you put in place?',
    context: 'Assesses blameless ownership, incident response speed, root cause analysis, and long-term prevention.',
    starPrompts: {
      situation: 'What was the feature you released, and what symptom manifested in production?',
      task: 'What was your immediate priority during the active incident?',
      action: 'How did you rollback/mitigate, communicate with stakeholders, and trace the root cause?',
      result: 'What CI/CD canary guards, automated integration tests, or alerts did you build to prevent recurrence?'
    },
    sampleAnswer: 'I deployed an update to our token authentication middleware that omitted a null-check on anonymous guest tokens, causing a 5-minute spike in 500 errors affecting 8% of incoming traffic. I immediately initiated a Canary rollback within 90 seconds. Once traffic stabilized, I authored a blameless post-mortem identifying a gap in our test matrix. I added automated contract tests simulating missing auth headers, integrated canary health checks that auto-abort deployments if 5xx errors rise above 0.5%, and shared the post-mortem with the broader engineering team.',
    evaluationRubric: [
      'Takes immediate personal ownership without shifting blame onto QA or teammates',
      'Prioritizes rapid customer mitigation (rollback) before debugging',
      'Institutes structural systemic fixes (automated tests/canaries) to permanently eliminate the failure mode'
    ]
  },
  {
    id: 'beh-3',
    category: 'Delivering Under Pressure',
    title: 'Tight Deadlines & Scope De-scoping',
    question: 'Tell me about a time when an urgent project had an aggressive deadline with shifting requirements. How did you prioritize what to build without sacrificing quality?',
    context: 'Assesses ruthless prioritization, MVP scope negotiation, and maintaining high engineering standards under stress.',
    starPrompts: {
      situation: 'What was the high-stakes project and why was the deadline critical?',
      task: 'What was the gap between the initial wishlist scope and what was feasible?',
      action: 'How did you break down the system into P0 must-haves vs P1/P2 nice-to-haves?',
      result: 'Did you hit the launch milestone, and what was the customer / business impact?'
    },
    sampleAnswer: 'We had a 3-week deadline to launch an analytics ingestion pipeline ahead of Black Friday. The initial specification requested real-time Kafka streaming, multi-region aggregation, and 20 custom report filters. Recognizing that building all three would jeopardize reliability, I led a prioritization meeting with product managers. We agreed that the P0 core was reliable batch ingestion and the top 5 essential business metrics, while streaming aggregations were scheduled for Q1. By focusing solely on P0, we completed full load testing 4 days ahead of schedule, processing 45 million events over the holiday weekend with zero downtime.',
    evaluationRubric: [
      'Proactively communicates with stakeholders rather than silently working late and burning out',
      'Distinguishes between non-negotiable core invariants and de-scopable bells and whistles',
      'Refuses to cut corners on automated testing or production observability'
    ]
  },
  {
    id: 'beh-4',
    category: 'Leadership & Initiative',
    title: 'Driving Technical Improvement Unprompted',
    question: 'Give an example of an unassigned technical problem or bottleneck that you identified and took the initiative to solve on your own.',
    context: 'Assesses proactivity, craft pride, organizational leverage, and going beyond assigned tickets.',
    starPrompts: {
      situation: 'What was the recurring pain point or developer friction you observed?',
      task: 'Why was it being ignored by standard sprint planning?',
      action: 'What prototype or automated tool did you build to eliminate the bottleneck?',
      result: 'How much developer time or infrastructure cost did your initiative save?'
    },
    sampleAnswer: 'I noticed our team’s local development environment setup required 45 minutes of manual database seeding and was frequently broken by schema migrations, wasting roughly 3 developer hours per week across 12 engineers. During a hack day, I created a Docker Compose orchestration script that automatically spun up localized mock databases, seeded anonymized test fixtures, and ran health checks in under 30 seconds. I wrote clean documentation and held a 15-minute demo. The team adopted it immediately, saving an estimated 150+ engineering hours over the subsequent quarter.',
    evaluationRubric: [
      'Identifies friction that affects the broader team, not just oneself',
      'Demonstrates self-directed initiative without waiting for formal manager permission',
      'Quantifies positive business or team productivity impact'
    ]
  },
  {
    id: 'beh-5',
    category: 'Cross-Functional Collaboration',
    title: 'Navigating Conflicting Product & Engineering Constraints',
    question: 'Describe a situation where product management requested a feature that conflicted with system security, scalability, or data integrity. How did you partner with them to find a win-win?',
    context: 'Assesses empathy for business objectives, clear technical communication to non-technical stakeholders, and collaborative problem-solving.',
    starPrompts: {
      situation: 'What was the business or user goal behind the feature, and what risk did the naive implementation carry?',
      task: 'How did you communicate the risk without sounding dismissive or like a blocker?',
      action: 'What alternative architectural approach did you propose that fulfilled the business objective safely?',
      result: 'How was the feature received by users, and how did it establish trust with product leadership?'
    },
    sampleAnswer: 'Our product team wanted to allow enterprise users to export multi-million-row financial audit logs as a synchronous CSV download. The naive implementation would exhaust API gateway memory and trigger 504 timeouts. Instead of rejecting the feature, I sat down with the product lead to understand user expectations. Users simply needed the export within a few minutes—it did not need to block their browser. I designed an asynchronous background job pipeline: users click export, our worker streams chunks to S3, and emails a pre-signed link upon completion. Product was thrilled because users could continue working, and the backend remained rock solid with zero gateway memory spikes.',
    evaluationRubric: [
      'Partners constructively with product rather than acting as a rigid gatekeeper',
      'Translates technical limitations into user-centric tradeoffs',
      'Engineers a creative alternative that achieves both business goals and technical resilience'
    ]
  },
  {
    id: 'beh-6',
    category: 'Mentorship & Culture',
    title: 'Mentoring an Underperforming or Stalled Engineer',
    question: 'Tell me about a time you mentored a junior engineer or peer who was struggling with complex architectural tasks or missing deadlines. How did you support their growth?',
    context: 'Assesses empathy, constructive coaching, debugging teammate friction, and multiplying engineering team capability.',
    starPrompts: {
      situation: 'Who was the engineer and what specific technical or workflow challenge were they experiencing?',
      task: 'What role did you take on to assist without micromanaging or doing the work for them?',
      action: 'What feedback, pair programming cadence, or structural guardrails did you establish?',
      result: 'What measurable improvement did the engineer show in subsequent projects?'
    },
    sampleAnswer: 'A junior engineer on our team was consistently blocked when delivering features involving asynchronous message queues, resulting in delayed PRs and anxiety. I scheduled twice-weekly 45-minute pairing sessions where we mapped out sequence diagrams before writing code. I introduced them to contract-first testing, showing how mocking the queue locally removes the mystery of distributed messaging. Within 6 weeks, their PR cycle time dropped from 8 days to 1.5 days, and they independently designed and delivered our notification service integration ahead of schedule.',
    evaluationRubric: [
      'Focuses on root-cause enablement and confidence-building rather than simply taking over the ticket',
      'Establishes durable mental models and repeatable engineering habits',
      'Demonstrates measurable growth and independence in the mentee'
    ]
  },
  {
    id: 'beh-7',
    category: 'Leadership & Initiative',
    title: 'Navigating Extreme Ambiguity & Undefined Problem Spaces',
    question: 'Describe a project where you were handed an ambiguous high-level goal with little to no documentation or requirements. How did you create clarity and drive execution?',
    context: 'Assesses seniority, ability to define boundaries in chaos, driving stakeholder alignment, and incremental de-risking.',
    starPrompts: {
      situation: 'What was the ambiguous directive and what were the unknowns (technical, operational, business)?',
      task: 'How did you establish an initial charter and define success metrics?',
      action: 'How did you interview users, write Request for Comments (RFCs), and prototype iteratively?',
      result: 'What was delivered, and how did your framework serve as the blueprint for subsequent projects?'
    },
    sampleAnswer: 'Leadership gave our team a brief mandate: "Reduce infrastructure cloud spend across our microservices fleet by 30% without impacting latency." No team had audited our AWS footprint in two years. I began by aggregating CloudWatch and Cost Explorer data, discovering that 45% of costs stemmed from over-provisioned idle Kubernetes pods and uncompacted DynamoDB read/write capacity. I authored an RFC proposing autoscaling policies, SPOT instance pools for batch workers, and TTL policies on transient log tables. I piloted this on 2 non-critical services first to prove latency was unaffected. The initiative reduced monthly AWS spend by $85,000 (34% savings) and was adopted across all 5 engineering divisions.',
    evaluationRubric: [
      'Takes proactive leadership to convert ambiguous goals into concrete, data-backed milestones',
      'Writes clear RFCs and builds consensus across multiple stakeholders',
      'De-risks through small pilots before rolling out broad changes'
    ]
  },
  {
    id: 'beh-8',
    category: 'Conflict Resolution',
    title: 'Balancing Technical Debt Paydown vs Feature Velocity',
    question: 'How do you handle situations where leadership pushes for new features, but accumulating technical debt threatens system stability and developer productivity?',
    context: 'Assesses pragmatic engineering judgment, business framing of technical debt, and sustainable delivery pacing.',
    starPrompts: {
      situation: 'What was the nature of the technical debt and how was it manifesting in bug rates or velocity slowdowns?',
      task: 'How did you make the case to non-technical leaders who only see business value in new features?',
      action: 'What framework (e.g. 20% innovation time, boy-scout rule, bundled refactoring) did you propose?',
      result: 'What was the long-term impact on team velocity, deployment confidence, and incident frequency?'
    },
    sampleAnswer: 'Our core order processing monolith had grown fragile: test suite runtime had bloated to 40 minutes, and 1 out of 4 releases required hotfixes due to hidden coupling. Product wanted to rush 3 new checkout flows. Rather than complaining about "clean code," I quantified the business impact: our engineers were losing 12 hours every week waiting for flaky CI builds, and customer checkout failure rates had increased by 1.8%. I proposed a "1+3 model" where 20% of every sprint was explicitly dedicated to decomposing the billing module and parallelizing CI tests. Within two months, CI time dropped to 6 minutes, deployment failure rates dropped to near zero, and overall sprint velocity actually increased by 25%.',
    evaluationRubric: [
      'Translates technical debt into tangible business costs (engineer time, customer revenue risk, SLA breaches)',
      'Finds a sustainable rhythm instead of asking for unrealistic multi-month complete rewrites',
      'Measures and celebrates velocity gains after tech debt reduction'
    ]
  }
];
