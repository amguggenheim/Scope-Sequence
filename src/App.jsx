import React, { useState } from 'react';
import {
  ChevronDown,
  Lightbulb,
  Target,
  CheckCircle,
  FileText,
  Link2,
  Check,
  BookOpen,
  ExternalLink,
} from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────

const ACCENT = '#8B7355';

// ─── Standards Reference ─────────────────────────────────────────────────────

const standardsReference = {
  'RL.9-10.1': 'Cite strong and thorough textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text.',
  'RL.9-10.2': 'Determine a theme or central idea of a text and analyze in detail its development over the course of the text, including how it emerges and is shaped and refined by specific details; provide an objective summary of the text.',
  'RL.9-10.3': 'Analyze how complex characters (e.g., those with multiple or conflicting motivations) develop over the course of a text, interact with other characters, and advance the plot or develop the theme.',
  'RL.9-10.4': 'Determine the meaning of words and phrases as they are used in the text, including figurative and connotative meanings; analyze the cumulative impact of specific word choices on meaning and tone.',
  'RL.9-10.5': "Analyze how an author's choices concerning how to structure a text, order events within it, and manipulate time create such effects as mystery, tension, or surprise.",
  'RL.9-10.6': 'Analyze a particular point of view or cultural experience reflected in a work of literature from outside the United States, drawing on a wide reading of world literature.',
  'RI.9-10.1': 'Cite strong and thorough textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text.',
  'RI.9-10.2': 'Determine a central idea of a text and analyze its development over the course of the text, including how it emerges and is shaped and refined by specific details; provide an objective summary of the text.',
  'RI.9-10.4': 'Determine the meaning of words and phrases as they are used in a text, including figurative, connotative, and technical meanings; analyze the cumulative impact of specific word choices on meaning and tone.',
  'RI.9-10.5': "Analyze in detail how an author's ideas or claims are developed and refined by particular sentences, paragraphs, or larger portions of a text.",
  'RI.9-10.6': "Determine an author's point of view or purpose in a text and analyze how an author uses rhetoric to advance that point of view or purpose.",
  'RI.9-10.8': 'Delineate and evaluate the argument and specific claims in a text, assessing whether the reasoning is valid and the evidence is relevant and sufficient; identify false statements and fallacious reasoning.',
  'W.9-10.1': 'Write arguments to support claims in an analysis of substantive topics or texts, using valid reasoning and relevant and sufficient evidence.',
  'W.9-10.1a': "Introduce precise claim(s), distinguish the claim(s) from alternate or opposing claims, and create an organization that establishes clear relationships among claim(s), counterclaims, reasons, and evidence.",
  'W.9-10.1b': "Develop claim(s) and counterclaims fairly, supplying evidence for each while pointing out the strengths and limitations of both in a manner that anticipates the audience's knowledge level and concerns.",
  'W.9-10.2': 'Write informative/explanatory texts to examine and convey complex ideas, concepts, and information clearly and accurately through the effective selection, organization, and analysis of content.',
  'W.9-10.3': 'Write narratives to develop real or imagined experiences or events using effective technique, well-chosen details, and well-structured event sequences.',
  'W.9-10.3a': 'Engage and orient the reader by setting out a problem, situation, or observation, establishing one or multiple point(s) of view, and introducing a narrator and/or characters.',
  'W.9-10.3b': 'Use narrative techniques, such as dialogue, pacing, description, reflection, and multiple plot lines, to develop experiences, events, and/or characters.',
  'W.9-10.4': 'Produce clear and coherent writing in which the development, organization, and style are appropriate to task, purpose, and audience.',
  'W.9-10.5': 'Develop and strengthen writing as needed by planning, revising, editing, rewriting, or trying a new approach.',
  'W.9-10.7': 'Conduct short as well as more sustained research projects to answer a question or solve a problem; narrow or broaden the inquiry when appropriate.',
  'W.9-10.8': 'Gather relevant information from multiple authoritative print and digital sources, using advanced searches effectively; assess the usefulness of each source in answering the research question.',
  'W.9-10.9': 'Draw evidence from literary or informational texts to support analysis, reflection, and research.',
  'SL.9-10.1': 'Initiate and participate effectively in a range of collaborative discussions with diverse partners on grades 9–10 topics, texts, and issues, building on others\' ideas and expressing their own clearly and persuasively.',
  'SL.9-10.1a-d': 'Come to discussions prepared; follow agreed-upon rules; propel conversations; respond thoughtfully to diverse perspectives.',
  'SL.9-10.3': "Evaluate a speaker's point of view, reasoning, and use of evidence and rhetoric, identifying any fallacious reasoning or exaggerated or distorted evidence.",
  'SL.9-10.4': 'Present information, findings, and supporting evidence clearly, concisely, and logically such that listeners can follow the line of reasoning.',
  'L.9-10.1': 'Demonstrate command of the conventions of standard English grammar and usage when writing or speaking.',
  'L.9-10.2': 'Demonstrate command of the conventions of standard English capitalization, punctuation, and spelling when writing.',
  'L.9-10.3': 'Apply knowledge of language to understand how language functions in different contexts, to make effective choices for meaning or style.',
  'L.9-10.4': 'Determine or clarify the meaning of unknown and multiple-meaning words and phrases based on grades 9–10 reading and content.',
  'L.9-10.5': 'Demonstrate understanding of figurative language, word relationships, and nuances in word meanings.',
  'L.9-10.6': 'Acquire and use accurately general academic and domain-specific words and phrases.',
};

// ─── Units Data ───────────────────────────────────────────────────────────────

const unitsData = [
  {
    id: 1,
    title: 'Unit 1: Foundations of Literary Analysis',
    skillDescription:
      'Students analyze literary and informational texts to determine themes and central ideas, examine how authors develop arguments and ideas through structure and word choice, and use textual evidence to support analysis in academic discussions.',
    enduringUnderstandings: [
      { text: 'Themes and central ideas develop across a text through specific details and evidence.', standards: ['RL.9-10.2', 'RI.9-10.2'] },
      { text: 'Strong analysis requires using textual evidence to explain and support interpretations.', standards: ['RL.9-10.1', 'RI.9-10.1'] },
      { text: "Word choice shapes meaning, tone, and the reader's understanding of a text.", standards: ['RL.9-10.4', 'RI.9-10.4'] },
      { text: "Academic discussions deepen understanding when participants support ideas with evidence and build on the perspectives of others.", standards: ['SL.9-10.1', 'SL.9-10.1a-d'] },
    ],
    essentialSkills: [
      { text: 'Determine a theme or central idea of a text and analyze how it develops across the text.', standards: ['RL.9-10.2'] },
      { text: 'Cite strong textual evidence to support analysis and interpretation of texts.', standards: ['RL.9-10.1', 'RI.9-10.1'] },
      { text: 'Analyze how word choice shapes the meaning and tone of a text.', standards: ['RL.9-10.4', 'L.9-10.5'] },
      { text: 'Analyze how an author develops and organizes ideas or arguments across a text.', standards: ['RI.9-10.5', 'RI.9-10.6'] },
      { text: "Evaluate a speaker's point of view, reasoning, and use of evidence.", standards: ['SL.9-10.3'] },
      { text: 'Prepare for and participate effectively in academic discussions by asking questions, citing evidence, and building on others\' ideas.', standards: ['SL.9-10.1'] },
    ],
    rigor: {
      title: 'Collaborative Discussions (SL.9-10.1)',
      grade9: [
        { text: 'Come prepared for discussions, ask questions and respond to peers.', outcomes: ['I can come prepared for a discussion', 'I can ask questions or make on-topic comments in response to peers'] },
        { text: 'Work with peers to establish discussion norms and set goals.', outcomes: ['I can collaborate with peers to establish discussion norms', 'I can help set goals and roles for group work'] },
      ],
      grade10: [
        { text: 'Use language to propel a conversation forward, engage independently in task, challenge peers with the goal of consensus.', outcomes: ['I can use clarifying and probing questions to move the discussion forward', 'I can participate in a group discussion independently'] },
        { text: 'Synthesize diverse perspectives, summarize agreement/disagreement, and justify views with evidence.', outcomes: ['I can acknowledge and respond to different viewpoints', 'I can synthesize discussion points and adjust my thinking based on evidence'] },
      ],
    },
  },
  {
    id: 2,
    title: 'Unit 2: Argument & Rhetoric',
    skillDescription:
      'Students examine how authors construct arguments through the strategic use of claims, evidence, and rhetorical appeals. Students develop their own argumentative writing by crafting precise claims, addressing counterclaims, and selecting compelling evidence to support their reasoning.',
    enduringUnderstandings: [
      { text: 'Effective arguments are built on precise claims supported by relevant, sufficient evidence.', standards: ['W.9-10.1', 'W.9-10.1a'] },
      { text: 'Authors use rhetoric—including ethos, pathos, and logos—to advance a point of view and persuade audiences.', standards: ['RI.9-10.6'] },
      { text: "Acknowledging and refuting counterclaims strengthens an argument's credibility.", standards: ['W.9-10.1b'] },
      { text: 'Evaluating the quality of evidence requires assessing its relevance, accuracy, and sufficiency.', standards: ['RI.9-10.8'] },
    ],
    essentialSkills: [
      { text: 'Analyze how an author uses rhetoric to advance a point of view or purpose.', standards: ['RI.9-10.6'] },
      { text: "Delineate and evaluate an argument's claims, reasoning, and evidence.", standards: ['RI.9-10.8'] },
      { text: 'Write an argument with a precise claim that addresses counterclaims.', standards: ['W.9-10.1', 'W.9-10.1a', 'W.9-10.1b'] },
      { text: 'Select and integrate evidence that is relevant and sufficient to support a claim.', standards: ['W.9-10.1b'] },
      { text: 'Organize an argument so that the relationships between claims, reasons, and evidence are clear.', standards: ['W.9-10.1a'] },
      { text: 'Use precise language and domain-specific vocabulary to establish authority and clarity.', standards: ['L.9-10.6'] },
    ],
    rigor: {
      title: 'Argument Writing (W.9-10.1)',
      grade9: [
        { text: 'Introduce a claim and provide relevant evidence from at least two sources.', outcomes: ['I can write a clear thesis that states my position', 'I can select evidence that directly supports my claim'] },
        { text: 'Acknowledge an opposing viewpoint and explain why your claim is stronger.', outcomes: ['I can identify a counterclaim', 'I can write a rebuttal using evidence'] },
      ],
      grade10: [
        { text: 'Develop claim and counterclaims fairly, pointing out strengths and limitations of each.', outcomes: ['I can present counterclaims with nuance and fairness', 'I can use hedging language to qualify my claims appropriately'] },
        { text: 'Use varied syntax and precise language to strengthen argument and establish an authoritative voice.', outcomes: ['I can vary sentence structure for rhetorical effect', 'I can choose language that conveys confidence and precision'] },
      ],
    },
  },
  {
    id: 3,
    title: 'Unit 3: Narrative Craft',
    skillDescription:
      'Students explore how authors craft narratives through intentional structural choices, complex characterization, and precise language. Students develop original narratives that use literary techniques—including dialogue, pacing, and point of view—to create meaningful experiences for readers.',
    enduringUnderstandings: [
      { text: 'Authors make deliberate structural choices—such as pacing, perspective, and plot sequence—to shape a reader\'s experience.', standards: ['RL.9-10.5'] },
      { text: 'Complex characters are revealed through their choices, conflicts, and relationships with others.', standards: ['RL.9-10.3'] },
      { text: 'Effective narrative writing uses precise details and literary techniques to create vivid, purposeful experiences.', standards: ['W.9-10.3', 'W.9-10.3b'] },
      { text: 'Point of view shapes what a reader knows and how they interpret characters and events.', standards: ['RL.9-10.6', 'W.9-10.3a'] },
    ],
    essentialSkills: [
      { text: "Analyze how an author's structural choices—including pacing and plot manipulation—create specific effects.", standards: ['RL.9-10.5'] },
      { text: 'Analyze how complex characters develop and interact to advance plot or theme.', standards: ['RL.9-10.3'] },
      { text: 'Write a narrative that engages the reader through a clear point of view and well-developed conflict.', standards: ['W.9-10.3', 'W.9-10.3a'] },
      { text: 'Use narrative techniques such as dialogue, pacing, description, and reflection.', standards: ['W.9-10.3b'] },
      { text: 'Use precise language and sensory details to develop setting, character, and mood.', standards: ['W.9-10.3b', 'L.9-10.3'] },
      { text: 'Revise drafts to strengthen development, organization, and style.', standards: ['W.9-10.5'] },
    ],
    rigor: {
      title: 'Narrative Writing (W.9-10.3)',
      grade9: [
        { text: 'Establish a narrator, characters, and conflict to orient the reader.', outcomes: ['I can introduce a narrator with a clear point of view', 'I can establish a conflict that drives the narrative'] },
        { text: 'Use dialogue and description to develop characters and advance the plot.', outcomes: ['I can write dialogue that reveals character', 'I can use description to create setting and mood'] },
      ],
      grade10: [
        { text: 'Manipulate pacing and structure—including flashback or foreshadowing—to create specific effects.', outcomes: ['I can use pacing techniques to build tension or slow the narrative', 'I can employ flashback or foreshadowing purposefully'] },
        { text: 'Use reflection and multiple plot lines to develop theme and deepen character complexity.', outcomes: ['I can incorporate reflection to develop meaning', 'I can manage multiple narrative threads with intentionality'] },
      ],
    },
  },
  {
    id: 4,
    title: 'Unit 4: Research & Synthesis',
    skillDescription:
      'Students engage in sustained inquiry by developing research questions, locating and evaluating sources, and synthesizing information across multiple texts. Students produce research-based writing that integrates evidence from diverse sources to support original analysis and argumentation.',
    enduringUnderstandings: [
      { text: 'Effective research begins with a focused, meaningful question that guides inquiry.', standards: ['W.9-10.7'] },
      { text: 'Not all sources are equally credible—evaluating authority, accuracy, and purpose is essential to responsible research.', standards: ['W.9-10.8'] },
      { text: 'Synthesizing information across sources requires identifying patterns, contradictions, and gaps.', standards: ['W.9-10.9', 'RI.9-10.1'] },
      { text: 'Research writing integrates evidence ethically and transparently to support original thinking.', standards: ['W.9-10.8', 'W.9-10.9'] },
    ],
    essentialSkills: [
      { text: 'Develop and refine a research question that is focused and investigable.', standards: ['W.9-10.7'] },
      { text: 'Locate and evaluate sources for credibility, relevance, and perspective.', standards: ['W.9-10.8'] },
      { text: 'Synthesize information from multiple sources to build an evidence-based argument.', standards: ['W.9-10.9', 'RI.9-10.1'] },
      { text: 'Integrate quotations and paraphrases accurately and ethically using a citation format.', standards: ['W.9-10.8'] },
      { text: 'Write an informative or argumentative research paper with a clear thesis and organized structure.', standards: ['W.9-10.2', 'W.9-10.4'] },
      { text: 'Present research findings clearly and logically in an oral or multimedia format.', standards: ['SL.9-10.4'] },
    ],
    rigor: {
      title: 'Research Writing (W.9-10.7–9)',
      grade9: [
        { text: 'Identify a focused research question and gather information from at least three sources.', outcomes: ['I can write a research question that is specific and investigable', 'I can gather information from print and digital sources'] },
        { text: 'Evaluate sources for credibility and take organized notes.', outcomes: ['I can identify bias or limited perspective in a source', 'I can take notes that distinguish between my ideas and source material'] },
      ],
      grade10: [
        { text: 'Synthesize information across sources to identify patterns, contradictions, and gaps.', outcomes: ['I can compare and contrast information across multiple sources', 'I can identify where sources disagree and explain the significance'] },
        { text: 'Produce research writing that integrates evidence with original analysis and proper attribution.', outcomes: ['I can blend quotations and paraphrase into my own argument', 'I can cite sources accurately using an established format'] },
      ],
    },
  },
];

// ─── Standards Tooltip ────────────────────────────────────────────────────────

function StandardsTooltip({ standards }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-flex items-center flex-shrink-0 ml-1.5">
      <button
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="text-slate-300 hover:text-slate-500 transition-colors duration-150 p-0.5 rounded"
        aria-label="View aligned standards"
      >
        <Link2 size={12} />
      </button>

      {visible && (
        <div
          className="absolute right-7 z-50 w-80 bg-white rounded-lg border border-slate-200 shadow-lg animate-tooltip"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <div className="px-3 py-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Aligned Standards</span>
          </div>
          <div className="p-3 space-y-3">
            {standards.map((code) => (
              <div key={code}>
                <span className="inline-block bg-slate-100 text-slate-700 text-xs font-mono font-semibold px-2 py-0.5 rounded mb-1">
                  {code}
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {standardsReference[code] || 'Standard description not available.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Section Dropdown ─────────────────────────────────────────────────────────

function SectionDropdown({ title, icon, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg overflow-visible">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-slate-50 transition-colors duration-150 rounded-lg"
        style={{ borderRadius: open ? '8px 8px 0 0' : '8px' }}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-slate-400">{icon}</span>
          <span className="text-sm font-medium text-slate-700">{title}</span>
        </div>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 pt-1 bg-slate-50 border-t border-slate-200 rounded-b-lg animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Unit Accordion ───────────────────────────────────────────────────────────

function UnitAccordion({ unit }) {
  const [open, setOpen] = useState(false);
  const [cfaInput, setCfaInput] = useState('');
  const [cfas, setCfas] = useState([]);
  const [summativeForm, setSummativeForm] = useState({ title: '', description: '', link: '' });
  const [summatives, setSummatives] = useState([]);

  const handleCfaSubmit = () => {
    if (cfaInput.trim()) {
      setCfas([...cfas, cfaInput.trim()]);
      setCfaInput('');
    }
  };

  const handleSummativeSubmit = () => {
    if (summativeForm.title.trim()) {
      setSummatives([...summatives, { ...summativeForm }]);
      setSummativeForm({ title: '', description: '', link: '' });
    }
  };

  return (
    <div className={`bg-white border rounded-lg transition-colors duration-150 ${open ? 'border-slate-300' : 'border-slate-200 hover:border-slate-300'}`}>
      {/* Unit Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-6 py-4 text-left"
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
          style={{ backgroundColor: ACCENT }}
        >
          {unit.id}
        </div>
        <span className="flex-1 font-medium text-slate-800 text-base" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
          {unit.title}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expanded Content */}
      {open && (
        <div className="px-6 pb-6 space-y-3 animate-fadeIn border-t border-slate-100">
          {/* Skill Description */}
          <div className="mt-4 bg-slate-50 rounded-lg p-4 flex gap-3" style={{ borderLeft: `2px solid ${ACCENT}` }}>
            <BookOpen size={15} className="text-slate-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Skill Focus</p>
              <p className="text-sm text-slate-600 leading-relaxed">{unit.skillDescription}</p>
            </div>
          </div>

          {/* Students Will Understand */}
          <SectionDropdown title="Students Will Understand" icon={<Target size={15} />}>
            <ul className="space-y-2 mt-2">
              {unit.enduringUnderstandings.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check size={13} className="text-slate-400 mt-1 flex-shrink-0" />
                  <span className="text-sm text-slate-600 flex-1 leading-relaxed">{item.text}</span>
                  <StandardsTooltip standards={item.standards} />
                </li>
              ))}
            </ul>
          </SectionDropdown>

          {/* Students Will Be Able To */}
          <SectionDropdown title="Students Will Be Able To" icon={<CheckCircle size={15} />}>
            <div className="grid grid-cols-2 gap-6 mt-2">
              {/* Left: Skills */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Skills & Outcomes</p>
                <ol className="space-y-3">
                  {unit.essentialSkills.map((skill, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span
                        className="w-5 h-5 rounded-full text-white text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: ACCENT }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm text-slate-600 flex-1 leading-relaxed">{skill.text}</span>
                      <StandardsTooltip standards={skill.standards} />
                    </li>
                  ))}
                </ol>
              </div>

              {/* Right: CFAs */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Suggested CFAs</p>
                {cfas.length === 0 ? (
                  <div className="border border-dashed border-slate-300 rounded-lg p-4 mb-3">
                    <p className="text-xs text-slate-400 text-center">No CFAs submitted yet.</p>
                  </div>
                ) : (
                  <ul className="space-y-1.5 mb-3">
                    {cfas.map((cfa, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600 bg-white rounded px-3 py-2 border border-slate-200">
                        <Check size={11} className="text-slate-400 flex-shrink-0" />
                        <span className="truncate">{cfa}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <input
                  type="text"
                  value={cfaInput}
                  onChange={(e) => setCfaInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCfaSubmit()}
                  placeholder="Enter CFA title or link..."
                  className="w-full text-xs border border-slate-300 rounded-md px-3 py-2 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-1 bg-white mb-2"
                />
                <button
                  onClick={handleCfaSubmit}
                  className="w-full text-xs text-white rounded-md py-2 font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#334155' }}
                >
                  Submit CFA
                </button>
              </div>
            </div>
          </SectionDropdown>

          {/* Suggested Summatives */}
          <SectionDropdown title="Suggested Summatives" icon={<FileText size={15} />}>
            <div className="mt-2">
              {summatives.length === 0 ? (
                <div className="border border-dashed border-slate-300 rounded-lg p-4 mb-4">
                  <p className="text-xs text-slate-400 text-center">No summatives submitted yet.</p>
                </div>
              ) : (
                <ul className="space-y-2 mb-4">
                  {summatives.map((s, i) => (
                    <li key={i} className="bg-white rounded-lg border border-slate-200 p-3">
                      <p className="text-sm font-medium text-slate-700">{s.title}</p>
                      {s.description && <p className="text-xs text-slate-500 mt-1">{s.description}</p>}
                      {s.link && (
                        <a href={s.link} target="_blank" rel="noreferrer" className="text-xs underline mt-1 block" style={{ color: ACCENT }}>
                          {s.link}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <div className="space-y-2">
                <input
                  type="text"
                  value={summativeForm.title}
                  onChange={(e) => setSummativeForm({ ...summativeForm, title: e.target.value })}
                  placeholder="Assessment title (required)"
                  className="w-full text-xs border border-slate-300 rounded-md px-3 py-2 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-1 bg-white"
                />
                <input
                  type="text"
                  value={summativeForm.description}
                  onChange={(e) => setSummativeForm({ ...summativeForm, description: e.target.value })}
                  placeholder="Brief description (optional)"
                  className="w-full text-xs border border-slate-300 rounded-md px-3 py-2 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-1 bg-white"
                />
                <input
                  type="text"
                  value={summativeForm.link}
                  onChange={(e) => setSummativeForm({ ...summativeForm, link: e.target.value })}
                  placeholder="Link to resource (optional)"
                  className="w-full text-xs border border-slate-300 rounded-md px-3 py-2 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-1 bg-white"
                />
                <button
                  onClick={handleSummativeSubmit}
                  className="w-full text-xs text-white rounded-md py-2 font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#334155' }}
                >
                  Submit Summative
                </button>
              </div>
            </div>
          </SectionDropdown>

          {/* Rigor Expectations */}
          <SectionDropdown title="Rigor Expectations by Grade" icon={<Target size={15} />}>
            <div className="mt-2">
              <p className="text-xs font-medium text-slate-500 mb-4">{unit.rigor.title}</p>
              <div className="grid grid-cols-2 gap-5">
                {/* Grade 9 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-6 h-6 rounded-full text-white text-xs font-semibold flex items-center justify-center"
                      style={{ backgroundColor: '#5B7B94' }}
                    >
                      9
                    </span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Grade 9</span>
                  </div>
                  <div className="space-y-3">
                    {unit.rigor.grade9.map((item, i) => (
                      <div key={i} className="bg-white rounded-lg border border-slate-200 p-3">
                        <p className="text-xs font-medium text-slate-700 mb-2 leading-relaxed">{item.text}</p>
                        <ul className="space-y-1">
                          {item.outcomes.map((o, j) => (
                            <li key={j} className="text-xs text-slate-500 flex items-start gap-1.5">
                              <span className="text-slate-300 mt-0.5 flex-shrink-0">—</span>
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grade 10 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-6 h-6 rounded-full text-white text-xs font-semibold flex items-center justify-center"
                      style={{ backgroundColor: '#334155' }}
                    >
                      10
                    </span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Grade 10</span>
                  </div>
                  <div className="space-y-3">
                    {unit.rigor.grade10.map((item, i) => (
                      <div key={i} className="bg-white rounded-lg border border-slate-200 p-3">
                        <p className="text-xs font-medium text-slate-700 mb-2 leading-relaxed">{item.text}</p>
                        <ul className="space-y-1">
                          {item.outcomes.map((o, j) => (
                            <li key={j} className="text-xs text-slate-500 flex items-start gap-1.5">
                              <span className="text-slate-300 mt-0.5 flex-shrink-0">—</span>
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionDropdown>
        </div>
      )}
    </div>
  );
}

// ─── Rubric View ──────────────────────────────────────────────────────────────

const proficiencyLevels = [
  { level: 1, label: 'Beginning', textColor: 'text-slate-400' },
  { level: 2, label: 'Developing', textColor: 'text-slate-400' },
  { level: 3, label: 'Approaching', textColor: 'text-slate-500' },
  { level: 4, label: 'Proficient', textColor: 'text-slate-600' },
  { level: 5, label: 'Advanced', textColor: 'text-slate-700' },
];

function RubricView() {
  const [selectedGrade, setSelectedGrade] = useState('9th');
  const [selectedUnitId, setSelectedUnitId] = useState(1);
  const selectedUnit = unitsData.find((u) => u.id === selectedUnitId);
  const gradeNumber = selectedGrade.replace(/\D/g, '');

  return (
    <div className="flex gap-0 bg-white border border-slate-200 rounded-lg overflow-hidden min-h-screen">
      {/* Sidebar */}
      <div className="w-72 flex-shrink-0 border-r border-slate-200 bg-slate-50">
        <div className="sticky top-0 p-6 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
            <FileText size={15} className="text-slate-500" />
            <h3 className="font-semibold text-slate-800 text-sm" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
              Rubric Settings
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Grade Level</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-1 bg-white"
            >
              {['9th', '10th', '11th', '12th'].map((g) => (
                <option key={g} value={g}>{g} Grade</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Unit</label>
            <select
              value={selectedUnitId}
              onChange={(e) => setSelectedUnitId(Number(e.target.value))}
              className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-1 bg-white"
            >
              {unitsData.map((u) => (
                <option key={u.id} value={u.id}>{u.title}</option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Outcomes</p>
            <ol className="space-y-3 max-h-96 overflow-y-auto">
              {selectedUnit?.essentialSkills.map((skill, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className="w-5 h-5 rounded-full text-white text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: ACCENT }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-xs text-slate-600 leading-relaxed">{skill.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Rubric Panel */}
      <div className="flex-1 min-w-0 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Proficiency Rubric</p>
            <h3 className="font-semibold text-slate-800 text-xl" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
              Grade {gradeNumber} — {selectedUnit?.title}
            </h3>
          </div>
          <button
            className="flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-md transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#334155' }}
          >
            <ExternalLink size={14} />
            Open in Google Docs
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-r border-slate-200 w-52">
                  Outcome
                </th>
                {proficiencyLevels.map((pl) => (
                  <th key={pl.level} className="px-4 py-3 text-center border-r border-slate-200 last:border-r-0">
                    <div className={`text-lg font-semibold ${pl.textColor}`} style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                      {pl.level}
                    </div>
                    <div className="text-xs text-slate-400 font-normal">{pl.label}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedUnit?.essentialSkills.map((skill, i) => (
                <tr key={i} className={`border-b border-slate-200 last:border-b-0 ${i % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}`}>
                  <td className="px-4 py-4 border-r border-slate-200 align-top">
                    <div className="flex items-start gap-2.5">
                      <span
                        className="w-5 h-5 rounded-full text-white text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: ACCENT }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-slate-600 leading-relaxed text-xs">{skill.text}</span>
                    </div>
                  </td>
                  {proficiencyLevels.map((pl) => (
                    <td key={pl.level} className="px-3 py-4 border-r border-slate-200 last:border-r-0 align-top">
                      <div className="text-slate-300 italic text-xs text-center border border-dashed border-slate-200 rounded p-2 min-h-14 flex items-center justify-center">
                        Criteria...
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Info box */}
        <div className="mt-4 flex items-center gap-2.5 bg-slate-50 rounded-lg p-3 border border-slate-200">
          <div className="w-4 h-4 flex-shrink-0 text-slate-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="text-xs text-slate-500">
            Click "Open in Google Docs" to edit criteria and customize this rubric for your classroom.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeView, setActiveView] = useState('overview');
  const [selectedGrade, setSelectedGrade] = useState(9);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
              ELA Curriculum Framework
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">Cherry Creek School District</p>
          </div>

          {/* View Toggle */}
          <div className="flex bg-slate-100 rounded-lg p-1 gap-1">
            <button
              onClick={() => setActiveView('overview')}
              className="px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150"
              style={
                activeView === 'overview'
                  ? { backgroundColor: '#334155', color: 'white' }
                  : { color: '#475569' }
              }
            >
              Curriculum Overview
            </button>
            <button
              onClick={() => setActiveView('rubric')}
              className="px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150"
              style={
                activeView === 'rubric'
                  ? { backgroundColor: '#334155', color: 'white' }
                  : { color: '#475569' }
              }
            >
              Create a Rubric
            </button>
          </div>
        </div>
      </header>

      {/* Grade Selector */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-8 py-3 flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Grade</span>
          {[9, 10, 11, 12].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className="px-4 py-1.5 rounded-md text-sm font-medium border transition-all duration-150"
              style={
                selectedGrade === g
                  ? { backgroundColor: '#334155', color: 'white', borderColor: '#334155' }
                  : { backgroundColor: 'white', color: '#475569', borderColor: '#e2e8f0' }
              }
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-8 py-8">
        {activeView === 'overview' ? (
          <div className="space-y-3">
            {unitsData.map((unit) => (
              <UnitAccordion key={unit.id} unit={unit} />
            ))}
          </div>
        ) : (
          <RubricView />
        )}
      </main>
    </div>
  );
}
