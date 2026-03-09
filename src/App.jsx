import React, { useState } from 'react';
import RubricBuilder from './RubricBuilder.jsx';
import {
  ChevronDown,
  Target,
  CheckCircle,
  FileText,
  Link2,
  Check,
  BookOpen,
} from 'lucide-react';

// ─── Color System ─────────────────────────────────────────────────────────────

const HEADER_RED = '#9E4848';

const UNIT_COLORS = {
  1: { main: '#5B7B9B', light: '#EEF2F7', border: '#C5D4E4' },  // dusty blue
  2: { main: '#6B8B6B', light: '#EEF5EE', border: '#BECEBD' },  // sage
  3: { main: '#A0715F', light: '#F7F0EE', border: '#DFC5BC' },  // terracotta
  4: { main: '#7B6B9B', light: '#F2EEF7', border: '#C8BFD9' },  // dusty violet
};

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
  'SL.9-10.1': "Initiate and participate effectively in a range of collaborative discussions with diverse partners on grades 9–10 topics, texts, and issues, building on others' ideas and expressing their own clearly and persuasively.",
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
      { text: "Prepare for and participate effectively in academic discussions by asking questions, citing evidence, and building on others' ideas.", standards: ['SL.9-10.1'] },
    ],
    rigor: [
      {
        standard: 'SL.9-10.1',
        title: 'Collaborative Discussions',
        grade9: [
          { text: 'Come prepared for discussions, ask questions and respond to peers.', outcomes: ['I can come prepared for a discussion', 'I can ask questions or make on-topic comments in response to peers'] },
          { text: 'Work with peers to establish discussion norms and set goals.', outcomes: ['I can collaborate with peers to establish discussion norms', 'I can help set goals and roles for group work'] },
        ],
        grade10: [
          { text: 'Use language to propel a conversation forward, engage independently in task, challenge peers with the goal of consensus.', outcomes: ['I can use clarifying and probing questions to move the discussion forward', 'I can participate in a group discussion independently'] },
          { text: 'Synthesize diverse perspectives, summarize agreement/disagreement, and justify views with evidence.', outcomes: ['I can acknowledge and respond to different viewpoints', 'I can synthesize discussion points and adjust my thinking based on evidence'] },
        ],
      },
      {
        standard: 'RI.9-10.4',
        title: 'Word Choice & Meaning (Informational Texts)',
        grade9: [
          { text: 'Determine the meaning of words and phrases, including figurative and connotative language.', outcomes: ['I can determine the meaning of words and phrases, including figurative and connotative language.'] },
        ],
        grade10: [
          { text: 'Analyze the cumulative impact of specific word choice on meaning and tone.', outcomes: ['I can analyze the cumulative impact of specific word choice on meaning and tone.'] },
        ],
      },
      {
        standard: 'RL.9-10.4',
        title: 'Word Choice & Meaning (Literature)',
        grade9: [
          { text: 'Determine the meaning of words and phrases, including figurative and connotative language.', outcomes: ['I can use a variety of resources & strategies to determine the meaning of words and phrases', 'I can determine the literal meaning of figurative language', 'I can differentiate the meaning of connotative language.'] },
        ],
        grade10: [
          { text: 'Analyze the cumulative impact of specific word choice on meaning and tone.', outcomes: ['I can analyze how and when specific language is used to impact meaning', 'I can analyze how and when specific language is used to impact tone'] },
        ],
      },
    ],
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
      { text: "Authors make deliberate structural choices—such as pacing, perspective, and plot sequence—to shape a reader's experience.", standards: ['RL.9-10.5'] },
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

function StandardsTooltip({ standards, color }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-flex items-center flex-shrink-0 ml-1.5">
      <button
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="transition-colors duration-150 p-0.5 rounded"
        style={{ color: visible ? color : '#cbd5e1' }}
        aria-label="View aligned standards"
      >
        <Link2 size={12} />
      </button>

      {visible && (
        <div
          className="absolute right-7 z-50 w-80 bg-white rounded-lg border border-slate-200 shadow-lg animate-tooltip"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <div className="px-3 py-2 border-b border-slate-100" style={{ backgroundColor: color + '15' }}>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>Aligned Standards</span>
          </div>
          <div className="p-3 space-y-3">
            {standards.map((code) => (
              <div key={code}>
                <span
                  className="inline-block text-xs font-mono font-semibold px-2 py-0.5 rounded mb-1"
                  style={{ backgroundColor: color + '15', color }}
                >
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

function SectionDropdown({ title, icon, children, color }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg overflow-visible">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-slate-50 transition-colors duration-150"
        style={{ borderRadius: open ? '8px 8px 0 0' : '8px' }}
      >
        <div className="flex items-center gap-2.5">
          <span style={{ color: open ? color : '#94a3b8' }}>{icon}</span>
          <span className="text-sm font-medium text-slate-700">{title}</span>
        </div>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
          style={{ color: open ? color : '#94a3b8' }}
        />
      </button>

      {open && (
        <div
          className="px-4 pb-4 pt-1 border-t border-slate-200 rounded-b-lg animate-fadeIn"
          style={{ backgroundColor: color + '08' }}
        >
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
  const color = UNIT_COLORS[unit.id];

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
    <div
      className="bg-white rounded-lg transition-all duration-150"
      style={{
        border: open ? `1.5px solid ${color.border}` : '1.5px solid #e2e8f0',
      }}
    >
      {/* Unit Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-6 py-4 text-left rounded-lg transition-colors duration-150"
        style={{ backgroundColor: open ? color.light : 'white' }}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
          style={{ backgroundColor: color.main }}
        >
          {unit.id}
        </div>
        <span className="flex-1 font-medium text-slate-800 text-base" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
          {unit.title}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 flex-shrink-0`}
          style={{ color: open ? color.main : '#94a3b8' }}
        />
      </button>

      {/* Expanded Content */}
      {open && (
        <div className="px-6 pb-6 space-y-3 animate-fadeIn" style={{ borderTop: `1px solid ${color.border}` }}>
          {/* Skill Description */}
          <div
            className="mt-4 rounded-lg p-4 flex gap-3"
            style={{ backgroundColor: color.light, borderLeft: `3px solid ${color.main}` }}
          >
            <BookOpen size={15} className="flex-shrink-0 mt-0.5" style={{ color: color.main }} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: color.main }}>
                Skill Focus
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">{unit.skillDescription}</p>
            </div>
          </div>

          {/* Students Will Understand */}
          <SectionDropdown title="Students Will Understand" icon={<Target size={15} />} color={color.main}>
            <ul className="space-y-2 mt-2">
              {unit.enduringUnderstandings.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check size={13} className="mt-1 flex-shrink-0" style={{ color: color.main }} />
                  <span className="text-sm text-slate-600 flex-1 leading-relaxed">{item.text}</span>
                  <StandardsTooltip standards={item.standards} color={color.main} />
                </li>
              ))}
            </ul>
          </SectionDropdown>

          {/* Students Will Be Able To */}
          <SectionDropdown title="Students Will Be Able To" icon={<CheckCircle size={15} />} color={color.main}>
            <div className="grid grid-cols-2 gap-6 mt-2">
              {/* Left: Skills */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Skills & Outcomes</p>
                <ol className="space-y-3">
                  {unit.essentialSkills.map((skill, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span
                        className="w-5 h-5 rounded-full text-white text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: color.main }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm text-slate-600 flex-1 leading-relaxed">{skill.text}</span>
                      <StandardsTooltip standards={skill.standards} color={color.main} />
                    </li>
                  ))}
                </ol>
              </div>

              {/* Right: CFAs */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Suggested CFAs</p>
                {cfas.length === 0 ? (
                  <div className="border border-dashed rounded-lg p-4 mb-3" style={{ borderColor: color.border }}>
                    <p className="text-xs text-slate-400 text-center">No CFAs submitted yet.</p>
                  </div>
                ) : (
                  <ul className="space-y-1.5 mb-3">
                    {cfas.map((cfa, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600 bg-white rounded px-3 py-2 border border-slate-200">
                        <Check size={11} className="flex-shrink-0" style={{ color: color.main }} />
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
                  className="w-full text-xs border border-slate-300 rounded-md px-3 py-2 text-slate-700 placeholder-slate-400 focus:outline-none bg-white mb-2"
                />
                <button
                  onClick={handleCfaSubmit}
                  className="w-full text-xs text-white rounded-md py-2 font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: color.main }}
                >
                  Submit CFA
                </button>
              </div>
            </div>
          </SectionDropdown>

          {/* Suggested Summatives */}
          <SectionDropdown title="Suggested Summatives" icon={<FileText size={15} />} color={color.main}>
            <div className="mt-2">
              {summatives.length === 0 ? (
                <div className="border border-dashed rounded-lg p-4 mb-4" style={{ borderColor: color.border }}>
                  <p className="text-xs text-slate-400 text-center">No summatives submitted yet.</p>
                </div>
              ) : (
                <ul className="space-y-2 mb-4">
                  {summatives.map((s, i) => (
                    <li key={i} className="bg-white rounded-lg border border-slate-200 p-3">
                      <p className="text-sm font-medium text-slate-700">{s.title}</p>
                      {s.description && <p className="text-xs text-slate-500 mt-1">{s.description}</p>}
                      {s.link && (
                        <a href={s.link} target="_blank" rel="noreferrer" className="text-xs underline mt-1 block" style={{ color: color.main }}>
                          {s.link}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <div className="space-y-2">
                <input type="text" value={summativeForm.title} onChange={(e) => setSummativeForm({ ...summativeForm, title: e.target.value })} placeholder="Assessment title (required)" className="w-full text-xs border border-slate-300 rounded-md px-3 py-2 text-slate-700 placeholder-slate-400 focus:outline-none bg-white" />
                <input type="text" value={summativeForm.description} onChange={(e) => setSummativeForm({ ...summativeForm, description: e.target.value })} placeholder="Brief description (optional)" className="w-full text-xs border border-slate-300 rounded-md px-3 py-2 text-slate-700 placeholder-slate-400 focus:outline-none bg-white" />
                <input type="text" value={summativeForm.link} onChange={(e) => setSummativeForm({ ...summativeForm, link: e.target.value })} placeholder="Link to resource (optional)" className="w-full text-xs border border-slate-300 rounded-md px-3 py-2 text-slate-700 placeholder-slate-400 focus:outline-none bg-white" />
                <button onClick={handleSummativeSubmit} className="w-full text-xs text-white rounded-md py-2 font-medium transition-opacity hover:opacity-90" style={{ backgroundColor: color.main }}>
                  Submit Summative
                </button>
              </div>
            </div>
          </SectionDropdown>

          {/* Rigor Expectations */}
          <SectionDropdown title="Rigor Expectations by Grade" icon={<Target size={15} />} color={color.main}>
            <div className="mt-2 space-y-5">
              {(Array.isArray(unit.rigor) ? unit.rigor : [unit.rigor]).map((rigorItem, rigorIdx) => (
                <div key={rigorIdx}>
                  {Array.isArray(unit.rigor) && unit.rigor.length > 1 ? (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: color.light, color: color.main }}>
                        {rigorItem.standard}
                      </span>
                      <span className="text-xs text-slate-500">{rigorItem.title}</span>
                    </div>
                  ) : (
                    <p className="text-xs font-medium text-slate-500 mb-3">{rigorItem.title}</p>
                  )}
                  <div className="grid grid-cols-2 gap-5">
                    {/* Grade 9 */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 rounded-full text-white text-xs font-semibold flex items-center justify-center" style={{ backgroundColor: color.main + 'aa' }}>9</span>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Grade 9</span>
                      </div>
                      <div className="space-y-3">
                        {rigorItem.grade9.map((item, i) => (
                          <div key={i} className="bg-white rounded-lg border border-slate-200 p-3">
                            <p className="text-xs font-medium text-slate-700 mb-2 leading-relaxed">{item.text}</p>
                            <ul className="space-y-1">
                              {item.outcomes.map((o, j) => (
                                <li key={j} className="text-xs text-slate-500 flex items-start gap-1.5">
                                  <span className="text-slate-300 mt-0.5 flex-shrink-0">—</span>{o}
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
                        <span className="w-6 h-6 rounded-full text-white text-xs font-semibold flex items-center justify-center" style={{ backgroundColor: color.main }}>10</span>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: color.main }}>Grade 10</span>
                      </div>
                      <div className="space-y-3">
                        {rigorItem.grade10.map((item, i) => (
                          <div key={i} className="rounded-lg border p-3" style={{ backgroundColor: color.light, borderColor: color.border }}>
                            <p className="text-xs font-medium text-slate-700 mb-2 leading-relaxed">{item.text}</p>
                            <ul className="space-y-1">
                              {item.outcomes.map((o, j) => (
                                <li key={j} className="text-xs flex items-start gap-1.5" style={{ color: color.main }}>
                                  <span className="mt-0.5 flex-shrink-0" style={{ color: color.border }}>—</span>{o}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionDropdown>
        </div>
      )}
    </div>
  );
}

// ─── Vertical Progression ────────────────────────────────────────────────────

const progressionThemes = [
  {
    title: 'Complexity of Thinking',
    quarters: [
      'Understand single texts (theme/main idea)',
      'Analyze craft within texts (how meaning is made)',
      'Synthesize across texts (create new understanding)',
      'Independent inquiry (apply all skills to self-directed research)',
    ],
  },
  {
    title: 'Writing Sophistication',
    quarters: [
      'Arguments with evidence about texts',
      'Arguments with academic tone',
      'Arguments with sophisticated vocabulary',
      'Full arguments with counterclaims, rhetorical appeals, and research integration',
    ],
  },
  {
    title: 'Source Work',
    quarters: [
      'Use assigned texts',
      'Analyze single texts deeply',
      'Work with multiple texts',
      'Find, evaluate, and integrate own sources',
    ],
  },
  {
    title: 'Audience Awareness',
    quarters: [
      'Class discussions (peer audience)',
      'Academic tone (academic audience)',
      'Sophisticated vocabulary (discipline-specific audience)',
      'Formal presentation with digital media (public/authentic audience)',
    ],
  },
];

const quarterLabels = [
  { q: 'Q1', label: 'Foundation' },
  { q: 'Q2', label: 'Craft & Tone' },
  { q: 'Q3', label: 'Synthesis & Precision' },
  { q: 'Q4', label: 'Research & Presentation' },
];

const skillDomains = [
  {
    domain: 'Reading: Theme / Main Idea',
    quarters: [
      { type: 'assess', text: 'Identify theme (literary) and main idea (informational)' },
      { type: 'continue', text: 'Use theme/main idea as foundation for craft analysis' },
      { type: 'continue', text: 'Identify themes/ideas across multiple texts' },
      { type: 'continue', text: 'Research requires identifying main ideas in sources' },
    ],
  },
  {
    domain: "Reading: Author's Craft",
    quarters: [
      { type: 'introduce', text: 'Basic word choice analysis' },
      { type: 'assess', text: 'Analyze how figurative language and literary elements power meaning' },
      { type: 'continue', text: 'Apply craft analysis across texts' },
      { type: 'continue', text: 'Evaluate how sources use rhetoric' },
    ],
  },
  {
    domain: 'Evidence & Analysis',
    quarters: [
      { type: 'assess', text: 'Cite evidence to explain how authors develop themes' },
      { type: 'continue', text: 'Cite evidence to support craft analysis' },
      { type: 'continue', text: 'Cite evidence from multiple sources' },
      { type: 'continue', text: 'Integrate evidence from research sources' },
    ],
  },
  {
    domain: 'Writing: Argument Construction',
    quarters: [
      { type: 'assess', text: "Write arguments about author's theme development" },
      { type: 'continue', text: 'Write with evidence + ADD academic tone' },
      { type: 'assess', text: 'Synthesize across texts with sophisticated vocabulary' },
      { type: 'assess', text: 'Write full argument with claims, counterclaims, and rhetorical appeals' },
    ],
  },
  {
    domain: 'Academic Language',
    quarters: [
      { type: 'introduce', text: 'Basic academic vocabulary' },
      { type: 'assess', text: 'Write in academic tone' },
      { type: 'assess', text: 'Use sophisticated, discipline-specific vocabulary for precision' },
      { type: 'continue', text: 'Maintain formal style appropriate to audience' },
    ],
  },
  {
    domain: 'Research Skills',
    quarters: [
      { type: 'introduce', text: 'Using evidence from texts' },
      { type: 'continue', text: 'Analyze single sources' },
      { type: 'continue', text: 'Work with multiple sources' },
      { type: 'assess', text: 'Gather, evaluate, and integrate sources; avoid plagiarism' },
    ],
  },
  {
    domain: 'Speaking & Listening',
    quarters: [
      { type: 'assess', text: 'Participate in class discussions with evidence' },
      { type: 'continue', text: 'Discuss with peers' },
      { type: 'continue', text: 'Present synthesis findings' },
      { type: 'assess', text: 'Present research clearly with digital media' },
    ],
  },
];

function VerticalProgression() {
  const cellStyle = (type) => {
    if (type === 'assess') return { bg: HEADER_RED + '0d', border: HEADER_RED + '40', labelColor: HEADER_RED, label: '🎯 ASSESS' };
    if (type === 'continue') return { bg: '#f8fafc', border: '#e2e8f0', labelColor: '#64748b', label: '✓ Continue' };
    return { bg: '#EEF2F7', border: '#C5D4E4', labelColor: '#5B7B9B', label: 'Introduce' };
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold" style={{ fontFamily: "'Fraunces', Georgia, serif", color: HEADER_RED }}>
          10th Grade ELA Skill Progression: Full Year
        </h2>
        <p className="text-sm text-slate-500 mt-1">Q1 → Q2 → Q3 → Q4</p>
      </div>

      {/* Progression Themes */}
      <div className="grid grid-cols-2 gap-4">
        {progressionThemes.map((theme, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-3" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
              {theme.title}
            </h3>
            <div>
              {theme.quarters.map((q, qIdx) => (
                <div key={qIdx} className="flex items-start gap-2.5">
                  <div className="flex flex-col items-center flex-shrink-0 mt-0.5">
                    <span
                      className="text-xs font-bold px-1.5 py-0.5 rounded text-white leading-tight"
                      style={{ backgroundColor: HEADER_RED, opacity: 1 - qIdx * 0.18 }}
                    >
                      Q{qIdx + 1}
                    </span>
                    {qIdx < 3 && <div className="w-px h-3 my-0.5" style={{ backgroundColor: HEADER_RED + '30' }} />}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pb-1">{q}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Skill Domain Matrix */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
          Skill Domain Matrix
        </h3>
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-40 border-r border-slate-200">
                  Skill Domain
                </th>
                {quarterLabels.map((ql) => (
                  <th key={ql.q} className="px-3 py-3 text-center border-r border-slate-200 last:border-r-0">
                    <div className="font-bold text-slate-700" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>{ql.q}</div>
                    <div className="text-xs font-normal text-slate-400">{ql.label}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skillDomains.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 align-top font-medium text-slate-700 border-r border-slate-200 bg-slate-50/50 text-xs">
                    {row.domain}
                  </td>
                  {row.quarters.map((cell, cIdx) => {
                    const s = cellStyle(cell.type);
                    return (
                      <td key={cIdx} className="px-3 py-3 align-top border-r border-slate-200 last:border-r-0" style={{ backgroundColor: s.bg }}>
                        <span className="text-xs font-semibold block mb-1" style={{ color: s.labelColor }}>{s.label}</span>
                        <span className="text-xs text-slate-600 leading-relaxed">{cell.text}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs text-slate-500">
        <span className="font-medium text-slate-600">Legend:</span>
        <span className="flex items-center gap-1.5">
          <span className="font-semibold" style={{ color: HEADER_RED }}>🎯 ASSESS</span>
          <span>— primary assessment point</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-500">✓ Continue</span>
          <span>— skill continues from prior quarter</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="font-semibold" style={{ color: '#5B7B9B' }}>Introduce</span>
          <span>— new skill introduced</span>
        </span>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeView, setActiveView] = useState('overview');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-8 py-5 flex items-center justify-between">
          <div>
            <h1
              className="text-2xl font-semibold"
              style={{ fontFamily: "'Fraunces', Georgia, serif", color: HEADER_RED }}
            >
              ELA Curriculum Framework
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-slate-500">Cherry Creek School District</p>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: HEADER_RED + '15', color: HEADER_RED }}
              >
                Grade 10
              </span>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex bg-slate-100 rounded-lg p-1 gap-1">
            <button
              onClick={() => setActiveView('overview')}
              className="px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150"
              style={
                activeView === 'overview'
                  ? { backgroundColor: HEADER_RED, color: 'white' }
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
                  ? { backgroundColor: HEADER_RED, color: 'white' }
                  : { color: '#475569' }
              }
            >
              Create a Rubric
            </button>
            <button
              onClick={() => setActiveView('progression')}
              className="px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150"
              style={
                activeView === 'progression'
                  ? { backgroundColor: HEADER_RED, color: 'white' }
                  : { color: '#475569' }
              }
            >
              Vertical Progression
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-8 py-8">
        {activeView === 'overview' && (
          <div className="space-y-3">
            {unitsData.map((unit) => (
              <UnitAccordion key={unit.id} unit={unit} />
            ))}
          </div>
        )}
        {activeView === 'rubric' && <RubricBuilder />}
        {activeView === 'progression' && <VerticalProgression />}
      </main>
    </div>
  );
}
