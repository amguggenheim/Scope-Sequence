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
  HelpCircle,
} from 'lucide-react';

// ─── Color System ─────────────────────────────────────────────────────────────

const HEADER_COLOR = '#2D2416';

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
  'RL.9-10.10': 'By the end of grade 10, read and comprehend literature, including stories, dramas, and poems, in the grades 9–10 text complexity band proficiently, with scaffolding as needed at the high end of the range.',
  'RI.9-10.10': 'By the end of grade 10, read and comprehend literary nonfiction in the grades 9–10 text complexity band proficiently, with scaffolding as needed at the high end of the range.',
};

// ─── Units Data ───────────────────────────────────────────────────────────────

const unitsData = [
  {
    id: 1,
    title: 'Unit 1: Foundational Analysis (Evidence, Structure, & Meaning)',
    skillDescription:
      'Students analyze literary and informational texts to determine themes and central ideas, examine how authors develop arguments and ideas through structure and word choice, and use textual evidence to support analysis in academic discussions.',
    essentialQuestions: [
      'How do we use evidence to support text analysis?',
      'How do text elements affect readers\' experiences?',
      'How do readers determine the central ideas or themes of a text?',
      'How do authors\' word choices influence meaning and tone?',
      'How does discussion with others deepen our understanding of texts?',
    ],
    enduringUnderstandings: [
      { text: 'Themes and central ideas develop across a text through specific details and evidence.', standards: ['RL.9-10.2', 'RI.9-10.2'] },
      { text: 'Strong analysis requires using textual evidence to explain and support interpretations.', standards: ['RL.9-10.1', 'RI.9-10.1'] },
      { text: 'Word choice shapes meaning, tone, and the reader\'s understanding of a text.', standards: ['RL.9-10.4', 'RI.9-10.4'] },
      { text: 'Academic discussions deepen understanding when participants support ideas with evidence and build on the perspectives of others.', standards: ['SL.9-10.1'] },
    ],
    essentialSkills: [
      { text: 'Determine a theme or central idea of a text and analyze how it develops across the text.', standards: ['RL.9-10.2'] },
      { text: 'Cite strong textual evidence to support analysis and interpretation of texts.', standards: ['RL.9-10.1', 'RI.9-10.1'] },
      { text: 'Analyze how word choice shapes the meaning and tone of a text.', standards: ['RL.9-10.4', 'RI.9-10.4'] },
      { text: 'Analyze how an author develops and organizes ideas or arguments across a text.', standards: ['RI.9-10.5'] },
      { text: 'Evaluate a speaker\'s point of view, reasoning, and use of evidence.', standards: ['SL.9-10.3'] },
      { text: 'Prepare for and participate effectively in academic discussions by asking questions, citing evidence, and building on others\' ideas.', standards: ['SL.9-10.1'] },
    ],
    rigor: [
      {
        standard: 'SL.9-10.1',
        title: 'Collaborative Discussions',
        grade9: [
          { text: 'Come prepared for discussions, ask questions and respond to peers.', outcomes: ['I can come prepared for a discussion', 'I can ask questions or make on-topic questions in response to peers'] },
        ],
        grade10: [
          { text: 'Use language to propel a conversation forward, independent engagement in task, challenge peers with the goal of consensus.', outcomes: ['I can use clarifying and probing questions to move the discussion forward', 'I can participate in a group discussion independently'] },
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
        title: 'Word Choice & Meaning (Literary Texts)',
        grade9: [
          { text: 'Determine the meaning of words and phrases, including figurative and connotative language.', outcomes: ['I can use a variety of resources & strategies to determine the meaning of words and phrases', 'I can determine the literal meaning of figurative language', 'I can differentiate the meaning of connotative language.'] },
        ],
        grade10: [
          { text: 'Analyze the cumulative impact of specific word choice on meaning and tone.', outcomes: ['I can analyze how and when specific language is used to impact meaning', 'I can analyze how and when specific language is used to impact tone'] },
        ],
      },
      {
        standard: 'RL.9-10.10',
        title: 'Range of Reading (Literary Texts)',
        grade9: [
          { text: 'Know what tools will help support reading comprehension. Use teacher-supported reading tools.', outcomes: ['I can understand what tools will help support reading comprehension.', 'I can use teacher-supported reading tools.'] },
        ],
        grade10: [
          { text: 'Apply reading strategies independently.', outcomes: ['I can apply reading strategies independently based on genre of text.'] },
        ],
      },
      {
        standard: 'RI.9-10.10',
        title: 'Range of Reading (Informational Texts)',
        grade9: [
          { text: 'Know what tools will help support reading comprehension. Use teacher-supported reading tools.', outcomes: ['I can know what tools will help support my reading comprehension.', 'I can use tools from my teacher to support my reading.'] },
        ],
        grade10: [
          { text: 'Apply reading strategies independently.', outcomes: ['I can independently apply reading strategies.'] },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Unit 2: Analyzing Rhetorical Craft: Language, Structure, and Argument',
    skillDescription:
      'Students analyze how authors use rhetorical craft, figurative language, and structural choices to shape meaning and influence readers. They evaluate the reasoning and evidence within arguments and apply these techniques in their own writing using evidence and an appropriate academic tone.',
    essentialQuestions: [
      'How do we analyze text to deepen understanding?',
      'How does text structure influence its effectiveness?',
      'How do rhetorical devices and logic impact the reader?',
      'What is the role of logic in informational texts?',
      'How does an author\'s language influence meaning and tone?',
    ],
    enduringUnderstandings: [
      { text: 'Authors make rhetorical and stylistic choices that shape meaning and influence readers.', standards: ['RL.9-10.5', 'RI.9-10.6'] },
      { text: 'Figurative language and nuanced word choices contribute to tone and deeper meaning in a text.', standards: ['L.9-10.5', 'RL.9-10.4'] },
      { text: 'Strong arguments rely on valid reasoning and relevant evidence.', standards: ['RI.9-10.8', 'W.9-10.1'] },
      { text: 'Academic writing uses discipline-specific language, evidence, and formal tone to communicate ideas clearly.', standards: ['W.9-10.1', 'L.9-10.6'] },
    ],
    essentialSkills: [
      { text: 'Analyze how figurative language and stylistic choices shape meaning and tone.', standards: ['L.9-10.5', 'RL.9-10.5'] },
      { text: 'Cite strong textual evidence to support analysis and interpretation.', standards: ['RL.9-10.1'] },
      { text: 'Delineate and evaluate arguments, assessing whether reasoning and evidence are valid and sufficient.', standards: ['RI.9-10.8'] },
      { text: 'Select relevant evidence to support claims in writing.', standards: ['W.9-10.1'] },
      { text: 'Write clear arguments using discipline-specific language and formal academic tone.', standards: ['W.9-10.1', 'L.9-10.6'] },
    ],
    rigor: [
      {
        standard: 'RL.9-10.1',
        title: 'Citing Textual Evidence (Literary Texts)',
        grade9: [
          { text: 'Select relevant evidence to support explanations of explicit ideas and straightforward inferences; explanations focus on accuracy and relevance.', outcomes: ['I can select relevant evidence to explain explicit information in a text.', 'I can use evidence to support a basic inference about a character or idea.'] },
        ],
        grade10: [
          { text: 'Evaluate the strength of evidence, distinguish between strong and weak support, and use evidence to defend interpretive claims that require synthesis across sections of a text.', outcomes: ['I can evaluate the strength of evidence to justify why it supports my claim.', 'I can synthesize evidence from multiple sections of the text to defend an interpretation.'] },
        ],
      },
      {
        standard: 'L.9-10.5',
        title: 'Figurative Language',
        grade9: [
          { text: 'Determine the meaning of words and phrases, including figurative and connotative language.', outcomes: ['I can determine the figurative and connotative meaning of words and phrases.'] },
        ],
        grade10: [
          { text: 'Analyze the cumulative impact of specific word choice on meaning and tone.', outcomes: ['I can analyze how word choice impacts meaning and tone of a text.'] },
        ],
      },
      {
        standard: 'L.9-10.6',
        title: 'Academic & Domain-Specific Vocabulary',
        grade9: [
          { text: 'With guidance and support can apply generic academic or domain-specific language. When prompted, will revise language to improve accuracy and clarity.', outcomes: ['I can reference tools or teacher-provided strategies to determine meaning.', 'I experiment with academic vocabulary in writing, though sometimes inconsistently.', 'I can identify when a word is important to understanding; teacher still helps them decide how to investigate it.'] },
        ],
        grade10: [
          { text: 'Independently uses academic and domain-specific language — noticing and revising language to improve accuracy and clarity.', outcomes: ['I can independently select the most efficient tool or strategy when encountering an unfamiliar word.', 'I can use sophisticated vocabulary accurately and purposefully.', 'I can routinely transfer vocabulary knowledge across texts, tasks, and units.'] },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Unit 3: Evaluating Arguments & Synthesizing Voices',
    skillDescription:
      'Students read multiple texts within a text set, evaluate the strength of the arguments presented, and synthesize ideas across texts to develop new or original claims.',
    essentialQuestions: [
      'What is the role of logic in informational texts?',
      'How do rhetorical devices and logic impact the reader?',
      'How do we analyze text to deepen understanding?',
      'How does reading multiple perspectives deepen understanding of an issue?',
      'How can synthesizing ideas across texts lead to new insights or claims?',
    ],
    enduringUnderstandings: [
      { text: 'Arguments vary in strength depending on the quality of reasoning and evidence used to support claims.', standards: ['RI.9-10.1'] },
      { text: 'Different texts may present different perspectives or interpretations about the same issue.', standards: ['RI.9-10.6', 'RL.9-10.6'] },
      { text: 'Synthesizing ideas across multiple texts can lead to deeper understanding and new insights.', standards: ['W.9-10.2', 'W.9-10.8'] },
      { text: 'Evaluating arguments requires examining claims, reasoning, and evidence carefully.', standards: ['RI.9-10.1'] },
      { text: 'New claims can emerge when readers connect and synthesize ideas from multiple sources.', standards: ['W.9-10.1', 'W.9-10.8'] },
    ],
    essentialSkills: [
      { text: 'Evaluate the reasoning and evidence used to support arguments in informational texts.', standards: ['RI.9-10.1'] },
      { text: 'Compare perspectives and arguments across multiple texts in a text set.', standards: ['RI.9-10.6', 'RL.9-10.6'] },
      { text: 'Distinguish among claims, reasoning, and evidence when analyzing arguments.', standards: ['W.9-10.2'] },
      { text: 'Synthesize ideas from multiple texts to develop new or original claims.', standards: ['W.9-10.2', 'W.9-10.8'] },
      { text: 'Support claims with relevant evidence drawn from multiple sources.', standards: ['W.9-10.1', 'W.9-10.8'] },
    ],
    rigor: [
      {
        standard: 'RI.9-10.1',
        title: 'Citing Textual Evidence (Informational Texts)',
        grade9: [
          { text: 'Cite textual evidence to support analysis of what the text says explicitly.', outcomes: ['I can cite textual evidence to support analysis of what the text explicitly says.'] },
        ],
        grade10: [
          { text: 'Cite textual evidence to support analysis of what the text says both implicitly and explicitly through inference.', outcomes: ['I can cite text evidence to support analysis of what the text says and what is implied in the text.'] },
        ],
      },
      {
        standard: 'RI.9-10.10',
        title: 'Range of Reading (Informational Texts)',
        grade9: [
          { text: 'Know what tools will help support reading comprehension. Use teacher-supported reading tools.', outcomes: ['I can know what tools will help support my reading comprehension.', 'I can use tools from my teacher to support my reading.'] },
        ],
        grade10: [
          { text: 'Apply reading strategies independently.', outcomes: ['I can independently apply reading strategies.'] },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Unit 4: Inquiry, Transfer, & Metacognitive Defense',
    skillDescription:
      'Students conduct research to investigate questions and topics of interest. They gather and evaluate information from multiple sources, synthesize ideas across texts, and communicate evidence-based conclusions in writing.',
    essentialQuestions: [
      'How do readers analyze texts to deepen understanding?',
      'How do authors support claims with evidence?',
      'How do readers evaluate the credibility of information and sources?',
      'How can research help us develop deeper understanding of complex topics?',
      'How does synthesizing information from multiple sources lead to stronger conclusions?',
    ],
    enduringUnderstandings: [
      { text: 'Research is a process of investigating questions, gathering information, and refining ideas in order to develop deeper understanding of complex topics.', standards: ['W.9-10.7'] },
      { text: 'Credible and relevant sources strengthen conclusions because they provide trustworthy evidence and perspectives.', standards: ['W.9-10.8'] },
      { text: 'Synthesizing information from multiple sources helps researchers develop new insights and stronger conclusions.', standards: ['W.9-10.9'] },
      { text: 'Effective research writing organizes evidence and ideas to communicate clear claims and explanations to an audience.', standards: ['W.9-10.2', 'W.9-10.1'] },
      { text: 'Responsible researchers evaluate the credibility, relevance, and limitations of information before using it as evidence.', standards: ['W.9-10.8'] },
    ],
    essentialSkills: [
      { text: 'Develop and refine research questions to guide inquiry on a topic.', standards: ['W.9-10.7'] },
      { text: 'Gather relevant information from multiple credible sources.', standards: ['W.9-10.8'] },
      { text: 'Evaluate the credibility, relevance, and limitations of sources.', standards: ['W.9-10.8'] },
      { text: 'Integrate and synthesize ideas and evidence from multiple sources to develop conclusions.', standards: ['W.9-10.9'] },
      { text: 'Communicate research findings clearly using evidence and appropriate organization in writing.', standards: ['SL.9-10.4', 'W.9-10.1'] },
    ],
    rigor: [
      {
        standard: 'W.9-10.5',
        title: 'Developing & Strengthening Writing',
        grade9: [
          { text: 'Establish reliable writing routines, making revision decisions with scaffolds, and understanding purpose and audience in basic terms.', outcomes: ['I can revise for clarity & organization (using checklists, key areas of improvement)', 'I can plan using structured supports (graphic organizers, writing frames, guided questions)'] },
        ],
        grade10: [
          { text: 'Independent decision-making, refining writing for precision and effectiveness, and consistently matching writing choices to nuanced audience and purpose needs.', outcomes: ['I can revise for craft elements (logic of ideas, strength of evidence, cohesion, rhetorical effect) that are most effective for my chosen audience', 'I can select tools and structures that best fit the writing task.'] },
        ],
      },
      {
        standard: 'W.9-10.9',
        title: 'Drawing Evidence from Texts',
        grade9: [
          { text: 'Select useful evidence to support analysis, reflection and research.', outcomes: ['I can select useful evidence to support analysis, reflection, and research.'] },
        ],
        grade10: [
          { text: 'Select and evaluate the strength of evidence to promote analysis, reflection, and research.', outcomes: ['I can select and evaluate the strength of evidence to promote analysis, reflection, and research.'] },
        ],
      },
    ],
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
        className="transition-colors duration-150 px-1.5 py-0.5 rounded text-xs font-mono font-semibold border"
        style={{
          color: visible ? 'white' : color,
          backgroundColor: visible ? color : color + '15',
          borderColor: color + '40',
        }}
        aria-label="View aligned standards"
      >
        ST
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
  const [summativeForm, setSummativeForm] = useState({ title: '', description: '', link: '' });
  const [summatives, setSummatives] = useState([]);
  const color = UNIT_COLORS[unit.id];

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
                Skill Focus: {unit.title.replace(/^Unit \d+:\s*/, '')}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">{unit.skillDescription}</p>
            </div>
          </div>

          {/* Essential Questions */}
          <SectionDropdown title="Essential Questions" icon={<HelpCircle size={15} />} color={color.main}>
            <ul className="space-y-2 mt-2">
              {unit.essentialQuestions.map((q, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-xs font-semibold flex-shrink-0 mt-0.5" style={{ color: color.main }}>Q.</span>
                  <span className="text-sm text-slate-600 leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </SectionDropdown>

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
            <ol className="space-y-4 mt-2">
              {unit.essentialSkills.map((skill, i) => (
                <li key={i}>
                  <div className="flex items-start gap-2.5 mb-2">
                    <span
                      className="w-5 h-5 rounded-full text-white text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: color.main }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-slate-600 flex-1 leading-relaxed">{skill.text}</span>
                    <StandardsTooltip standards={skill.standards} color={color.main} />
                  </div>
                  <div className="ml-7 rounded-md border border-dashed px-3 py-2" style={{ borderColor: color.border }}>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: color.main }}>CFAs</p>
                    <p className="text-xs text-slate-400">Not yet populated</p>
                  </div>
                </li>
              ))}
            </ol>
          </SectionDropdown>

          {/* Summatives */}
          <SectionDropdown title="Summatives" icon={<FileText size={15} />} color={color.main}>
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
  const [progressionGrade, setProgressionGrade] = useState('10');

  return (
    <div className="space-y-6">
      {/* Grade Tabs */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Grade</span>
        <div className="flex gap-2">
          {['9', '10', '11', '12'].map((grade) => (
            <button
              key={grade}
              onClick={() => setProgressionGrade(grade)}
              className="w-9 h-9 rounded-lg text-sm font-semibold border transition-all duration-150"
              style={
                progressionGrade === grade
                  ? { backgroundColor: HEADER_COLOR, color: 'white', borderColor: HEADER_COLOR }
                  : { backgroundColor: 'white', color: '#64748b', borderColor: '#e2e8f0' }
              }
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      {progressionGrade === '10' ? (
        <>
          <div>
            <h2 className="text-xl font-semibold" style={{ fontFamily: "'Fraunces', Georgia, serif", color: HEADER_COLOR }}>
              10th Grade ELA Skill Progression: Full Year
            </h2>
            <p className="text-sm text-slate-500 mt-1">Q1 → Q2 → Q3 → Q4</p>
          </div>

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
                          style={{ backgroundColor: HEADER_COLOR, opacity: 1 - qIdx * 0.18 }}
                        >
                          Q{qIdx + 1}
                        </span>
                        {qIdx < 3 && <div className="w-px h-3 my-0.5" style={{ backgroundColor: HEADER_COLOR + '30' }} />}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pb-1">{q}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: HEADER_COLOR + '15' }}>
            <BookOpen size={20} style={{ color: HEADER_COLOR }} />
          </div>
          <h2 className="text-lg font-semibold text-slate-700 mb-2" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Grade {progressionGrade} Coming Soon
          </h2>
          <p className="text-sm text-slate-400">Vertical progression data for Grade {progressionGrade} hasn't been added yet.</p>
        </div>
      )}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeView, setActiveView] = useState('overview');
  const [selectedGrade, setSelectedGrade] = useState('10');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F3F0' }}>
      {/* Header */}
      <header style={{ backgroundColor: HEADER_COLOR }}>
        <div className="max-w-5xl mx-auto px-8 py-5 flex items-center justify-between">
          <div>
            <h1
              className="text-2xl font-semibold"
              style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#F5EDD8' }}
            >
              ELA Curriculum Framework
            </h1>
            <p className="text-sm mt-1" style={{ color: '#C8B89A' }}>Cherry Creek School District</p>
          </div>

          {/* View Toggle */}
          <div className="flex rounded-lg p-1 gap-1" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
            {[['overview', 'Curriculum Overview'], ['rubric', 'Create a Rubric'], ['progression', 'Vertical Progression']].map(([view, label]) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className="px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150"
                style={activeView === view ? { backgroundColor: '#F5EDD8', color: HEADER_COLOR } : { color: '#C8B89A' }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Grade Selector */}
        <div style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
          <div className="max-w-5xl mx-auto px-8 py-2.5 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.6)' }}>Grade</span>
            <div className="flex gap-2">
              {['9', '10', '11', '12'].map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className="w-8 h-8 rounded-md text-sm font-semibold transition-all duration-150"
                  style={
                    selectedGrade === grade
                      ? { backgroundColor: '#F5EDD8', color: HEADER_COLOR }
                      : { backgroundColor: 'rgba(255,255,255,0.12)', color: '#C8B89A' }
                  }
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-8 py-8">
        {selectedGrade === '10' ? (
          <>
            {activeView === 'overview' && (
              <div className="space-y-3">
                {unitsData.map((unit) => (
                  <UnitAccordion key={unit.id} unit={unit} />
                ))}
              </div>
            )}
            {activeView === 'rubric' && <RubricBuilder />}
            {activeView === 'progression' && <VerticalProgression />}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: HEADER_COLOR + '15' }}>
              <BookOpen size={20} style={{ color: HEADER_COLOR }} />
            </div>
            <h2 className="text-lg font-semibold text-slate-700 mb-2" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
              Grade {selectedGrade} Coming Soon
            </h2>
            <p className="text-sm text-slate-400">Curriculum data for Grade {selectedGrade} hasn't been added yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
