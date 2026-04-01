import React, { useState } from 'react';
import RubricBuilder from './RubricBuilder.jsx';
import DepartmentView from './DepartmentView.jsx';
import { grade9Units, grade10Units, grade11Units, grade12Units, gradeStandardsReference } from './gradeData.js';
import logo from '../public/logo.png';
import {
  ChevronDown,
  Target,
  CheckCircle,
  FileText,
  Check,
  BookOpen,
  HelpCircle,
} from 'lucide-react';

// ─── Color System ─────────────────────────────────────────────────────────────

const HEADER_COLOR = '#3D5A73';
const HEADER_GRADIENT = 'linear-gradient(135deg, #2C4658 0%, #4A6B7F 50%, #5C7A8E 100%)';

const UNIT_COLORS = {
  1: { main: '#5B7B9B', light: '#EEF2F7', border: '#C5D4E4' },  // dusty blue
  2: { main: '#6B8B6B', light: '#EEF5EE', border: '#BECEBD' },  // sage
  3: { main: '#A0715F', light: '#F7F0EE', border: '#DFC5BC' },  // terracotta
  4: { main: '#7B6B9B', light: '#F2EEF7', border: '#C8BFD9' },  // dusty violet
  5: { main: '#8B6B6B', light: '#F7EEEE', border: '#D9BFBF' },
  6: { main: '#5B8B8B', light: '#EEF5F5', border: '#BDCECE' },
  7: { main: '#8B8B5B', light: '#F5F5EE', border: '#CECEBD' },
  8: { main: '#6B7B8B', light: '#EEF0F5', border: '#BFC5D4' },
};

// ─── Grade-to-Units Mapping ──────────────────────────────────────────────────

const GRADE_UNITS = {
  '9': grade9Units,
  '10': grade10Units,
  '11': grade11Units,
  '12': grade12Units,
};

const GRADE_DOC_LINKS = {
  '9': 'https://docs.google.com/spreadsheets/d/1G56Vkzgv0oxnV2JxvftBEEWsBhqmGE7KAAX9ELAcGA4/edit?usp=sharing',
  '10': 'https://docs.google.com/spreadsheets/d/12g-1awlhBZW7LPqv3qlIC4Nhs77M0vPiCU_aOsfTN9Y/edit?usp=sharing',
  '11': 'https://docs.google.com/spreadsheets/d/11OfNJV9V7-Q9-TeWpG8dgOCTnDZmKqlaPZns_hHtJiQ/edit?usp=sharing',
  '12': 'https://docs.google.com/spreadsheets/d/1W_c7OQoGGlQN6P_qP-JiO6Hc1wOb20YVJQWLB9eiYs8/edit?usp=sharing',
};

// ─── Standards Tooltip ────────────────────────────────────────────────────────

function StandardsTooltip({ standards, color, standardsRef = {} }) {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef(null);
  const id = React.useRef(Math.random().toString(36).slice(2));

  React.useEffect(() => {
    const handleClose = (e) => {
      if (e.detail !== id.current) setVisible(false);
    };
    document.addEventListener('close-tooltips', handleClose);
    return () => document.removeEventListener('close-tooltips', handleClose);
  }, []);

  React.useEffect(() => {
    if (!visible) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setVisible(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [visible]);

  const handleToggle = () => {
    if (!visible) {
      document.dispatchEvent(new CustomEvent('close-tooltips', { detail: id.current }));
    }
    setVisible(!visible);
  };

  return (
    <div ref={ref} className="relative inline-flex items-center flex-shrink-0 ml-1.5">
      <button
        onClick={handleToggle}
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
          className="absolute z-50 w-72 sm:w-80 bg-white rounded-lg border border-slate-200 shadow-xl right-0 bottom-full mb-2 sm:right-7 sm:bottom-auto sm:top-1/2 sm:mb-0 sm:-translate-y-1/2"
        >
          <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between" style={{ backgroundColor: color + '15' }}>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>Aligned Standards</span>
            <button onClick={() => setVisible(false)} className="text-slate-400 hover:text-slate-600 transition-colors" aria-label="Close">
              <span className="text-sm font-medium">&times;</span>
            </button>
          </div>
          <div className="p-3 space-y-3 max-h-80 overflow-y-auto">
            {standards.map((code) => (
              <div key={code}>
                <span
                  className="inline-block text-xs font-mono font-semibold px-2 py-0.5 rounded mb-1"
                  style={{ backgroundColor: color + '15', color }}
                >
                  {code}
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {standardsRef[code] || 'Standard description not available.'}
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
        className="w-full flex items-center justify-between px-3 sm:px-4 py-3 text-left bg-white hover:bg-slate-50 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:outline-none"
        style={{ borderRadius: open ? '8px 8px 0 0' : '8px' }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span style={{ color: open ? color : '#94a3b8' }}>{icon}</span>
          <span className="text-xs sm:text-sm font-medium text-slate-700">{title}</span>
        </div>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
          style={{ color: open ? color : '#94a3b8' }}
        />
      </button>

      {open && (
        <div
          className="px-3 sm:px-4 pb-4 pt-1 border-t border-slate-200 rounded-b-lg animate-fadeIn text-xs sm:text-sm"
          style={{ backgroundColor: color + '08' }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ─── GLE Expandable Item ──────────────────────────────────────────────────────

function GleItem({ group, color }) {
  const [open, setOpen] = useState(false);
  const ccssCodesRaw = group.evidenceOutcomes
    .map(eo => { const m = eo.match(/\(CCSS[:\s]+([^)]+)\)/); return m ? m[1].trim() : null; })
    .filter(Boolean);
  const ccssCodes = [...new Set(ccssCodesRaw)];
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-left bg-white hover:bg-slate-50 transition-colors duration-150"
      >
        <span className="text-xs sm:text-sm font-medium text-slate-700">{group.gle || group.standard}{ccssCodes.length > 0 ? <span className="text-slate-400 font-normal"> ({ccssCodes.join(', ')})</span> : ''}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 flex-shrink-0 ml-2 ${open ? 'rotate-180' : ''}`} style={{ color: open ? color.main : '#94a3b8' }} />
      </button>
      {open && (
        <div className="px-3 pb-3 pt-1 border-t border-slate-100" style={{ backgroundColor: color.main + '08' }}>
          <ul className="space-y-1.5">
            {group.evidenceOutcomes.map((eo, eIdx) => (
              <li key={eIdx} className="text-sm text-slate-600 leading-relaxed flex items-start gap-2">
                <span className="text-slate-400 flex-shrink-0 mt-0.5">•</span>
                <span>{eo}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Unit Accordion ───────────────────────────────────────────────────────────

function UnitAccordion({ unit, standardsRef, selectedGrade }) {
  const [open, setOpen] = useState(false);
  const color = UNIT_COLORS[unit.id];

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
        className="w-full flex items-center gap-3 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4 text-left rounded-lg transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:outline-none"
        style={{ backgroundColor: open ? color.light : 'white' }}
      >
        <div
          className="w-6 sm:w-7 h-6 sm:h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
          style={{ backgroundColor: color.main }}
        >
          {unit.id}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-slate-800 text-xs sm:text-sm">Unit {unit.id}</div>
          <div className="text-xs sm:text-sm text-slate-600 mt-0.5 truncate sm:truncate-none" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Skill Focus: {unit.title.replace(/^Unit \d+:\s*/, '')}
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 flex-shrink-0`}
          style={{ color: open ? color.main : '#94a3b8' }}
        />
      </button>

      {/* Expanded Content */}
      {open && (
        <div className="px-3 sm:px-6 pb-4 sm:pb-6 space-y-3 animate-fadeIn" style={{ borderTop: `1px solid ${color.border}` }}>
          {/* Skill Description */}
          <div
            className="mt-4 rounded-lg p-3 sm:p-4 flex gap-3"
            style={{ backgroundColor: color.light, borderLeft: `3px solid ${color.main}` }}
          >
            <BookOpen size={15} className="flex-shrink-0 mt-0.5" style={{ color: color.main }} />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: color.main }}>
                Skill Focus: {unit.title.replace(/^Unit \d+:\s*/, '')}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{unit.skillDescription}</p>
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
                    <span className="text-xs sm:text-sm text-slate-600 flex-1 leading-relaxed">{skill.text}</span>
                    {skill.standards.length > 0 && <StandardsTooltip standards={skill.standards} color={color.main} standardsRef={standardsRef} />}
                  </div>
                </li>
              ))}
            </ol>
          </SectionDropdown>

          {/* Priority Standards */}
          {unit.majorStandards && unit.majorStandards.length > 0 && (
            <SectionDropdown title="Priority Standards" icon={<BookOpen size={15} />} color={color.main}>
              <div className="mt-2 space-y-2">
                {unit.majorStandards.map((group, gIdx) => (
                  <GleItem key={gIdx} group={group} color={color} />
                ))}
              </div>
            </SectionDropdown>
          )}

          {/* Rigor Expectations */}
          {unit.rigor && <SectionDropdown title="Rigor Expectations by Grade" icon={<Target size={15} />} color={color.main}>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Grade 9 */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 rounded-full text-white text-xs font-semibold flex items-center justify-center" style={{ backgroundColor: selectedGrade === '9' ? color.main : color.main + 'aa' }}>9</span>
                        <span className={`text-xs font-semibold uppercase tracking-wider ${selectedGrade === '9' ? '' : 'text-slate-500'}`} style={selectedGrade === '9' ? { color: color.main } : {}}>Grade 9</span>
                      </div>
                      <div className="space-y-3">
                        {rigorItem.grade9.map((item, i) => (
                          <div key={i} className={selectedGrade === '9' ? 'rounded-lg border p-3' : 'bg-white rounded-lg border border-slate-200 p-3'} style={selectedGrade === '9' ? { backgroundColor: color.light, borderColor: color.border } : {}}>
                            <p className="text-xs font-medium text-slate-700 mb-2 leading-relaxed">{item.text}</p>
                            <ul className="space-y-1">
                              {item.outcomes.map((o, j) => (
                                <li key={j} className={selectedGrade === '9' ? 'text-xs flex items-start gap-1.5' : 'text-xs text-slate-600 flex items-start gap-2'} style={selectedGrade === '9' ? { color: color.main } : {}}>
                                  <span className={selectedGrade === '9' ? 'mt-0.5 flex-shrink-0' : 'text-sm text-slate-500 font-medium mt-0 flex-shrink-0'} style={selectedGrade === '9' ? { color: color.border } : {}}>•</span>{o}
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
                        <span className="w-6 h-6 rounded-full text-white text-xs font-semibold flex items-center justify-center" style={{ backgroundColor: selectedGrade === '10' ? color.main : color.main + 'aa' }}>10</span>
                        <span className={`text-xs font-semibold uppercase tracking-wider ${selectedGrade === '10' ? '' : 'text-slate-500'}`} style={selectedGrade === '10' ? { color: color.main } : {}}>Grade 10</span>
                      </div>
                      <div className="space-y-3">
                        {rigorItem.grade10.map((item, i) => (
                          <div key={i} className={selectedGrade === '10' ? 'rounded-lg border p-3' : 'bg-white rounded-lg border border-slate-200 p-3'} style={selectedGrade === '10' ? { backgroundColor: color.light, borderColor: color.border } : {}}>
                            <p className="text-xs font-medium text-slate-700 mb-2 leading-relaxed">{item.text}</p>
                            <ul className="space-y-1">
                              {item.outcomes.map((o, j) => (
                                <li key={j} className={selectedGrade === '10' ? 'text-xs flex items-start gap-1.5' : 'text-xs text-slate-600 flex items-start gap-2'} style={selectedGrade === '10' ? { color: color.main } : {}}>
                                  <span className={selectedGrade === '10' ? 'mt-0.5 flex-shrink-0' : 'text-sm text-slate-500 font-medium mt-0 flex-shrink-0'} style={selectedGrade === '10' ? { color: color.border } : {}}>•</span>{o}
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
          </SectionDropdown>}

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
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-slate-800 focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-medium">
        Skip to content
      </a>
      {/* Header */}
      <header style={{ background: HEADER_GRADIENT }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          {/* Title + Logo Section */}
          <div className="flex-1">
            <h1
              className="text-xl sm:text-2xl font-semibold"
              style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#F5EDD8' }}
            >
              High School ELA Scope and Sequence
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs sm:text-sm" style={{ color: '#C8B89A' }}>Cherry Creek School District</p>
              {/* Logo */}
              <img
                src={logo}
                alt="Cherry Creek Schools"
                className="h-5 sm:h-6 w-auto hidden sm:block flex-shrink-0"
                style={{ filter: 'saturate(200%) brightness(1.15)', mixBlendMode: 'multiply', opacity: 1, transition: 'filter 0.2s ease' }}
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex rounded-lg p-1 gap-1 text-xs sm:text-sm backdrop-blur-sm" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              {[['overview', 'Curriculum Overview'], ['rubric', 'Create a Rubric'], ['department', 'Department View']].map(([view, label]) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className="px-2 sm:px-4 py-1.5 rounded-md font-medium transition-all duration-150 whitespace-nowrap"
                  style={activeView === view ? { backgroundColor: '#F5EDD8', color: HEADER_COLOR } : { color: '#C8B89A' }}
                >
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">{label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grade Selector */}
        {activeView !== 'department' && (
        <div style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.08) 100%)' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-8 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-3 overflow-x-auto">
            <span className="text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.6)' }}>Grade</span>
            <div className="flex gap-2">
              {['9', '10', '11', '12'].map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className="w-8 h-8 rounded-md text-xs sm:text-sm font-semibold transition-all duration-150 flex-shrink-0"
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
        )}
      </header>

      {/* Main Content */}
      <main id="main-content" className={`mx-auto px-4 sm:px-8 py-4 sm:py-8 ${activeView === 'department' ? 'max-w-7xl' : 'max-w-5xl'}`}>
        {activeView === 'overview' && (
          <div className="space-y-3">
            {(GRADE_UNITS[selectedGrade] || []).map((unit) => (
              <UnitAccordion key={unit.id} unit={unit} standardsRef={gradeStandardsReference[selectedGrade] || {}} selectedGrade={selectedGrade} />
            ))}
            {GRADE_DOC_LINKS[selectedGrade] && (
              <div className="mt-4 bg-white border border-slate-200 rounded-lg p-4 flex items-center gap-3">
                <FileText size={16} className="text-slate-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Full Scope & Sequence Document</p>
                  <a
                    href={GRADE_DOC_LINKS[selectedGrade]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline hover:no-underline"
                    style={{ color: HEADER_COLOR }}
                  >
                    View Grade {selectedGrade} Scope & Sequence in Google Sheets
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
        {activeView === 'rubric' && <RubricBuilder standardsReference={gradeStandardsReference[selectedGrade] || {}} units={GRADE_UNITS[selectedGrade] || []} grade={selectedGrade} />}
        {activeView === 'department' && <DepartmentView gradeUnits={GRADE_UNITS} standardsRef={gradeStandardsReference} />}
      </main>
    </div>
  );
}
