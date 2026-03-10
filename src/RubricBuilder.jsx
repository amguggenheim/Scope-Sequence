import React, { useState, useRef } from 'react';
import { FileText, Copy, Check, ChevronDown } from 'lucide-react';

const standardsReference = {
  'RL.9-10.1': 'Cite strong and thorough textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text.',
  'RL.9-10.2': 'Determine a theme or central idea of a text and analyze in detail its development over the course of the text, including how it emerges and is shaped and refined by specific details; provide an objective summary of the text.',
  'RL.9-10.3': 'Analyze how complex characters (e.g., those with multiple or conflicting motivations) develop over the course of a text, interact with other characters, and advance the plot or develop the theme.',
  'RL.9-10.4': 'Determine the meaning of words and phrases as they are used in the text, including figurative and connotative meanings; analyze the cumulative impact of specific word choices on meaning and tone.',
  'RL.9-10.5': "Analyze how an author's choices concerning how to structure a text, order events within it, and manipulate time create such effects as mystery, tension, or surprise.",
  'RL.9-10.6': 'Analyze a particular point of view or cultural experience reflected in a work of literature from outside the United States, drawing on a wide reading of world literature.',
  'RL.9-10.10': 'By the end of grade 10, read and comprehend literature, including stories, dramas, and poems, in the grades 9–10 text complexity band proficiently, with scaffolding as needed at the high end of the range.',
  'RI.9-10.1': 'Cite strong and thorough textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text.',
  'RI.9-10.2': 'Determine a central idea of a text and analyze its development over the course of the text, including how it emerges and is shaped and refined by specific details; provide an objective summary of the text.',
  'RI.9-10.4': 'Determine the meaning of words and phrases as they are used in a text, including figurative, connotative, and technical meanings; analyze the cumulative impact of specific word choices on meaning and tone.',
  'RI.9-10.5': "Analyze in detail how an author's ideas or claims are developed and refined by particular sentences, paragraphs, or larger portions of a text.",
  'RI.9-10.6': "Determine an author's point of view or purpose in a text and analyze how an author uses rhetoric to advance that point of view or purpose.",
  'RI.9-10.8': 'Delineate and evaluate the argument and specific claims in a text, assessing whether the reasoning is valid and the evidence is relevant and sufficient; identify false statements and fallacious reasoning.',
  'RI.9-10.10': 'By the end of grade 10, read and comprehend literary nonfiction in the grades 9–10 text complexity band proficiently, with scaffolding as needed at the high end of the range.',
  'SL.9-10.1': "Initiate and participate effectively in a range of collaborative discussions with diverse partners on grades 9–10 topics, texts, and issues, building on others' ideas and expressing their own clearly and persuasively.",
  'SL.9-10.1a-d': 'Come to discussions prepared; follow agreed-upon rules; propel conversations; respond thoughtfully to diverse perspectives.',
  'SL.9-10.3': "Evaluate a speaker's point of view, reasoning, and use of evidence and rhetoric, identifying any fallacious reasoning or exaggerated or distorted evidence.",
  'SL.9-10.4': 'Present information, findings, and supporting evidence clearly, concisely, and logically such that listeners can follow the line of reasoning.',
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
  'L.9-10.1': 'Demonstrate command of the conventions of standard English grammar and usage when writing or speaking.',
  'L.9-10.2': 'Demonstrate command of the conventions of standard English capitalization, punctuation, and spelling when writing.',
  'L.9-10.3': 'Apply knowledge of language to understand how language functions in different contexts, to make effective choices for meaning or style.',
  'L.9-10.4': 'Determine or clarify the meaning of unknown and multiple-meaning words and phrases based on grades 9–10 reading and content.',
  'L.9-10.5': 'Demonstrate understanding of figurative language, word relationships, and nuances in word meanings.',
  'L.9-10.6': 'Acquire and use accurately general academic and domain-specific words and phrases.',
};

const RubricBuilder = () => {
  const [rubricGrade, setRubricGrade] = useState('10');
  const [rubricUnit, setRubricUnit] = useState('1');
  const [copied, setCopied] = useState(false);
  const [rubricData, setRubricData] = useState({});
  const tableRef = useRef(null);

  const units = [
    {
      id: 1,
      title: 'Unit 1: Foundational Analysis (Evidence, Structure, & Meaning)',
      essentialSkills: [
        { text: 'Determine a theme or central idea of a text and analyze how it develops across the text.', standards: ['RL.9-10.2'] },
        { text: 'Cite strong textual evidence to support analysis and interpretation of texts.', standards: ['RL.9-10.1', 'RI.9-10.1'] },
        { text: 'Analyze how word choice shapes the meaning and tone of a text.', standards: ['RL.9-10.4', 'RI.9-10.4'] },
        { text: 'Analyze how an author develops and organizes ideas or arguments across a text.', standards: ['RI.9-10.5'] },
        { text: "Evaluate a speaker's point of view, reasoning, and use of evidence.", standards: ['SL.9-10.3'] },
        { text: "Prepare for and participate effectively in academic discussions by asking questions, citing evidence, and building on others' ideas.", standards: ['SL.9-10.1'] }
      ]
    },
    {
      id: 2,
      title: 'Unit 2: Analyzing Rhetorical Craft: Language, Structure, and Argument',
      essentialSkills: [
        { text: 'Analyze how figurative language and stylistic choices shape meaning and tone.', standards: ['L.9-10.5', 'RL.9-10.5'] },
        { text: 'Cite strong textual evidence to support analysis and interpretation.', standards: ['RL.9-10.1'] },
        { text: 'Delineate and evaluate arguments, assessing whether reasoning and evidence are valid and sufficient.', standards: ['RI.9-10.8'] },
        { text: 'Select relevant evidence to support claims in writing.', standards: ['W.9-10.1'] },
        { text: 'Write clear arguments using discipline-specific language and formal academic tone.', standards: ['W.9-10.1', 'L.9-10.6'] }
      ]
    },
    {
      id: 3,
      title: 'Unit 3: Evaluating Arguments & Synthesizing Voices',
      essentialSkills: [
        { text: 'Analyze how arguments vary in strength based on reasoning and evidence quality.', standards: ['RI.9-10.1'] },
        { text: 'Compare and contrast claims across multiple texts.', standards: ['RI.9-10.6'] },
        { text: 'Evaluate the validity and relevance of evidence in arguments.', standards: ['RI.9-10.8'] },
        { text: 'Synthesize information from multiple texts to develop new claims.', standards: ['RI.9-10.10'] }
      ]
    },
    {
      id: 4,
      title: 'Unit 4: Inquiry, Transfer, & Metacognitive Defense',
      essentialSkills: [
        { text: 'Conduct research projects to answer questions or solve problems.', standards: ['W.9-10.7'] },
        { text: 'Gather and evaluate information from multiple authoritative sources.', standards: ['W.9-10.8'] },
        { text: 'Synthesize evidence from research sources to support claims.', standards: ['W.9-10.9'] },
        { text: 'Present information clearly with evidence and supporting details.', standards: ['SL.9-10.4'] }
      ]
    }
  ];

  const proficiencyLevels = [
    { level: 5, label: 'Advanced',    headerBg: '#FFFFFF', headerColor: '#2C2416' },
    { level: 4, label: 'Proficient',  headerBg: '#FFFFFF', headerColor: '#2C2416' },
    { level: 3, label: 'Approaching', headerBg: '#FFFFFF', headerColor: '#2C2416' },
    { level: 2, label: 'Developing',  headerBg: '#FFFFFF', headerColor: '#2C2416' },
    { level: 1, label: 'Beginning',   headerBg: '#FFFFFF', headerColor: '#2C2416' },
  ];

  const currentUnit = units[parseInt(rubricUnit) - 1];
  const rubricKey = `${rubricGrade}-${rubricUnit}`;

  const handleCellChange = (skillIdx, level, value) => {
    setRubricData(prev => ({
      ...prev,
      [rubricKey]: {
        ...prev[rubricKey],
        [`${skillIdx}-${level}`]: value
      }
    }));
  };

  const getCellValue = (skillIdx, level) => {
    return rubricData[rubricKey]?.[`${skillIdx}-${level}`] || '';
  };

  const copyRubricToClipboard = async () => {
    const unit = units[parseInt(rubricUnit) - 1];

    let htmlContent = `
      <h2 style="font-family: Arial, sans-serif; color: #1e293b; margin-bottom: 16px;">
        Grade ${rubricGrade}, Unit ${rubricUnit} Proficiency Rubric
      </h2>
      <p style="font-family: Arial, sans-serif; color: #64748b; font-size: 11pt; margin-bottom: 20px;">
        ${unit.title}
      </p>
      <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 10pt;">
        <thead>
          <tr style="background-color: #f8fafc;">
            <th style="border: 1px solid #cbd5e1; padding: 12px; text-align: left; width: 20%; font-weight: 600; color: #334155;">
              Outcome
            </th>
            ${proficiencyLevels.map(p => `
              <th style="border: 1px solid #cbd5e1; padding: 12px; text-align: center; width: 16%; font-weight: 600; color: #334155;">
                ${p.level}<br><span style="font-weight: normal; font-size: 9pt; color: #64748b;">${p.label}</span>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          ${unit.essentialSkills.map((skill, idx) => `
            <tr>
              <td style="border: 1px solid #cbd5e1; padding: 12px; vertical-align: top; background-color: #f8fafc;">
                <strong style="color: #334155;">${idx + 1}.</strong> <span style="color: #475569;">${skill.text}</span>
              </td>
              ${proficiencyLevels.map(p => `
                <td style="border: 1px solid #cbd5e1; padding: 12px; vertical-align: top; min-height: 60px;">
                  ${getCellValue(idx, p.level) || ''}
                </td>
              `).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    let plainText = `Grade ${rubricGrade}, Unit ${rubricUnit} Proficiency Rubric\n`;
    plainText += `${unit.title}\n\n`;
    plainText += `Outcome\t1-Beginning\t2-Developing\t3-Approaching\t4-Proficient\t5-Advanced\n`;
    unit.essentialSkills.forEach((skill, idx) => {
      plainText += `${idx + 1}. ${skill.text}`;
      proficiencyLevels.forEach(p => {
        plainText += `\t${getCellValue(idx, p.level) || ''}`;
      });
      plainText += '\n';
    });

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([htmlContent], { type: 'text/html' }),
          'text/plain': new Blob([plainText], { type: 'text/plain' })
        })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = plainText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-72 flex-shrink-0 border-r border-stone-200 min-h-[calc(100vh-113px)]" style={{ backgroundColor: '#EEE9E0' }}>
        <div className="p-6 sticky top-0">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Rubric Settings
          </h2>

          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">Grade Level</label>
            <select
              value={rubricGrade}
              onChange={(e) => setRubricGrade(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm focus:border-slate-400 focus:ring-0 transition-colors cursor-pointer"
            >
              <option value="9">9th Grade</option>
              <option value="10">10th Grade</option>
              <option value="11">11th Grade</option>
              <option value="12">12th Grade</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Unit</label>
            <select
              value={rubricUnit}
              onChange={(e) => setRubricUnit(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm focus:border-slate-400 focus:ring-0 transition-colors cursor-pointer"
            >
              {units.map(unit => (
                <option key={unit.id} value={unit.id}>Unit {unit.id}</option>
              ))}
            </select>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">{currentUnit.title}</p>
          </div>

          <div className="border-t border-slate-200 pt-5">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Standards
            </h3>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {[...new Set(currentUnit.essentialSkills.flatMap(skill => skill.standards))].map((standardCode, idx) => (
                <div key={idx} className="p-2 bg-white border border-slate-200 rounded-lg">
                  <p className="text-xs font-mono font-semibold text-slate-700 mb-1">{standardCode}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{standardsReference[standardCode]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-800" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
              Grade {rubricGrade}, Unit {rubricUnit} — Proficiency Rubric
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Fill in criteria for each proficiency level, then copy to Google Docs
            </p>
          </div>
          <button
            onClick={copyRubricToClipboard}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              copied
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
          >
            {copied ? (
              <><Check className="w-4 h-4" /> Copied! Paste in Google Docs</>
            ) : (
              <><Copy className="w-4 h-4" /> Copy Rubric</>
            )}
          </button>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <table ref={tableRef} className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[22%]">
                  Outcome
                </th>
                {proficiencyLevels.map(p => (
                  <th key={p.level} className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: p.headerBg }}>
                    <div className="text-base font-semibold" style={{ color: p.headerColor }}>{p.level}</div>
                    <div className="font-normal normal-case" style={{ color: p.headerColor, opacity: 0.8 }}>{p.label}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentUnit.essentialSkills.map((skill, idx) => (
                <tr key={idx} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-4 align-top bg-slate-50/50">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-xs text-slate-700 leading-relaxed">{skill.text}</span>
                    </div>
                  </td>
                  {proficiencyLevels.map(p => (
                    <td key={p.level} className="px-2 py-2 align-top">
                      <textarea
                        value={getCellValue(idx, p.level)}
                        onChange={(e) => handleCellChange(idx, p.level, e.target.value)}
                        placeholder="Enter criteria..."
                        className="w-full h-24 px-3 py-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg resize-none placeholder:text-slate-300 hover:border-slate-300 focus:border-slate-400 focus:outline-none focus:ring-0 transition-colors"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-600">
            <strong className="text-slate-700">How to use:</strong> Fill in the criteria for each proficiency level. When you're done, click "Copy Rubric" and paste directly into a Google Doc. The table formatting will be preserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default RubricBuilder;
