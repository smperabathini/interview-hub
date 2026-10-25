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
  }
];
