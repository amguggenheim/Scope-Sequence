import React, { useState } from 'react';
import {
  ChevronDown,
  BookOpen,
  HelpCircle,
  Target,
  CheckCircle,
  Check,
} from 'lucide-react';

// ─── Color System ─────────────────────────────────────────────────────────────

const HEADER_COLOR = '#3D5A73';
const ordinal = (g) => `${g}th`;

const UNIT_COLORS = {
  1: { main: '#5B7B9B', light: '#EEF2F7', border: '#C5D4E4' },
  2: { main: '#6B8B6B', light: '#EEF5EE', border: '#BECEBD' },
  3: { main: '#A0715F', light: '#F7F0EE', border: '#DFC5BC' },
  4: { main: '#7B6B9B', light: '#F2EEF7', border: '#C8BFD9' },
  5: { main: '#8B6B6B', light: '#F7EEEE', border: '#D9BFBF' },
  6: { main: '#5B8B8B', light: '#EEF5F5', border: '#BDCECE' },
  7: { main: '#8B8B5B', light: '#F5F5EE', border: '#CECEBD' },
  8: { main: '#6B7B8B', light: '#EEF0F5', border: '#BFC5D4' },
};

const GRADE_COLORS = {
  '9': '#5B7B9B',
  '10': '#6B8B6B',
  '11': '#A0715F',
  '12': '#7B6B9B',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractSkillFocus(title) {
  return title.replace(/^Unit \d+:\s*/, '');
}

/** Normalize RL.9-10.1 and RL.11-12.1 both to RL.*.1 for cross-grade matching */
function normalizeStandard(code) {
  return code.replace(/\.\d+-\d+\./, '.*.');
}

/** Collect all normalized standards from a unit */
function collectNormalizedStandards(unit) {
  const set = new Set();
  for (const section of [unit.essentialSkills, unit.enduringUnderstandings]) {
    for (const item of section || []) {
      for (const std of item.standards || []) {
        set.add(normalizeStandard(std));
      }
    }
  }
  return set;
}

// ─── Standard Badge ───────────────────────────────────────────────────────────

function StandardBadge({ code, color, hoveredStandard, onHover, onLeave }) {
  const normalized = normalizeStandard(code);
  const isHighlighted = hoveredStandard && normalized === hoveredStandard;

  return (
    <span
      onMouseEnter={() => onHover(normalized)}
      onMouseLeave={onLeave}
      className="inline-block font-mono font-semibold px-1.5 py-0.5 rounded cursor-default transition-all duration-200"
      style={{
        fontSize: '10px',
        lineHeight: '14px',
        color: isHighlighted ? 'white' : color,
        backgroundColor: isHighlighted ? color : color + '15',
        border: `1px solid ${color}40`,
        boxShadow: isHighlighted ? `0 0 8px ${color}50` : 'none',
        transform: isHighlighted ? 'scale(1.08)' : 'scale(1)',
      }}
    >
      {code}
    </span>
  );
}

// ─── Section Dropdown (matches App.jsx pattern, defaults open) ───────────────

function SectionDropdown({ title, icon, children, color, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-200 rounded-lg overflow-visible">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-left bg-white hover:bg-slate-50 transition-colors duration-150"
        style={{ borderRadius: open ? '8px 8px 0 0' : '8px' }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span style={{ color: open ? color : '#94a3b8' }}>{icon}</span>
          <span className="text-xs font-medium text-slate-700">{title}</span>
        </div>
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
          style={{ color: open ? color : '#94a3b8' }}
        />
      </button>

      {open && (
        <div
          className="px-3 pb-3 pt-1 border-t border-slate-200 rounded-b-lg animate-fadeIn text-xs"
          style={{ backgroundColor: color + '08' }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Comparison Panel ─────────────────────────────────────────────────────────

function ComparisonPanel({ gradeUnits, standardsRef, grade, unitIdx, onGradeChange, onUnitChange, hoveredStandard, onStandardHover, onStandardLeave }) {
  const grades = ['9', '10', '11', '12'];
  const units = gradeUnits[grade] || [];
  const unit = units[unitIdx];
  const unitNum = unitIdx + 1;
  const unitColor = UNIT_COLORS[unitNum] || UNIT_COLORS[1];
  const gradeColor = GRADE_COLORS[grade];
  const gradeStandards = (standardsRef && standardsRef[grade]) || {};

  // Check if any standard in this panel matches the hovered one from the other panel
  const panelHasMatch = hoveredStandard && unit && (() => {
    const norms = collectNormalizedStandards(unit);
    return norms.has(hoveredStandard);
  })();

  return (
    <div
      className="bg-white rounded-xl overflow-hidden transition-all duration-200"
      style={{
        border: panelHasMatch
          ? `2px solid ${gradeColor}`
          : `1.5px solid ${unitColor.border}`,
        boxShadow: panelHasMatch
          ? `0 0 16px ${gradeColor}25`
          : '0 1px 4px rgba(0,0,0,0.05)',
      }}
    >
      {/* Top bar with dropdowns */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{
          background: `linear-gradient(135deg, ${unitColor.main}12 0%, ${unitColor.main}08 100%)`,
          borderBottom: `1px solid ${unitColor.border}`,
        }}
      >
        {/* Grade selector */}
        <div className="flex items-center gap-1.5">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
            style={{ backgroundColor: gradeColor, fontSize: '11px' }}
          >
            {grade}
          </div>
          <div className="relative">
            <select
              value={grade}
              onChange={(e) => {
                const newGrade = e.target.value;
                const newUnits = gradeUnits[newGrade] || [];
                onGradeChange(newGrade);
                // If current unit index exceeds new grade's unit count, reset to 0
                if (unitIdx >= newUnits.length) {
                  onUnitChange(0);
                }
              }}
              className="appearance-none bg-white border border-slate-200 rounded-md pl-2.5 pr-7 py-1.5 text-xs font-medium text-slate-700 cursor-pointer hover:border-slate-300 transition-colors"
              style={{ minWidth: '90px' }}
            >
              {grades.map((g) => (
                <option key={g} value={g}>{ordinal(g)} Grade</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
          </div>
        </div>

        {/* Unit selector */}
        <div className="relative">
          <select
            value={unitIdx}
            onChange={(e) => onUnitChange(Number(e.target.value))}
            className="appearance-none bg-white border border-slate-200 rounded-md pl-2.5 pr-7 py-1.5 text-xs font-medium text-slate-700 cursor-pointer hover:border-slate-300 transition-colors"
            style={{ minWidth: '120px' }}
          >
            {units.map((u, i) => (
              <option key={i} value={i}>Unit {i + 1}: {extractSkillFocus(u.title)}</option>
            ))}
          </select>
          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
        </div>
      </div>

      {/* Panel content */}
      {unit ? (
        <div className="p-4 space-y-3">
          {/* Skill Focus */}
          <div
            className="rounded-lg p-3 flex gap-3"
            style={{ backgroundColor: unitColor.light, borderLeft: `3px solid ${unitColor.main}` }}
          >
            <BookOpen size={14} className="flex-shrink-0 mt-0.5" style={{ color: unitColor.main }} />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: unitColor.main }}>
                Skill Focus: {extractSkillFocus(unit.title)}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">{unit.skillDescription}</p>
            </div>
          </div>

          {/* Essential Questions */}
          <SectionDropdown title="Essential Questions" icon={<HelpCircle size={14} />} color={unitColor.main}>
            <ul className="space-y-2 mt-2">
              {(unit.essentialQuestions || []).map((q, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-xs font-semibold flex-shrink-0 mt-0.5" style={{ color: unitColor.main }}>Q.</span>
                  <span className="text-xs text-slate-600 leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </SectionDropdown>

          {/* Students Will Understand */}
          <SectionDropdown title="Students Will Understand" icon={<Target size={14} />} color={unitColor.main}>
            <ul className="space-y-2 mt-2">
              {(unit.enduringUnderstandings || []).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check size={12} className="mt-0.5 flex-shrink-0" style={{ color: unitColor.main }} />
                  <div className="min-w-0">
                    <span className="text-xs text-slate-600 leading-relaxed">{item.text}</span>
                    {item.standards && item.standards.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.standards.map((code, j) => (
                          <StandardBadge
                            key={j}
                            code={code}
                            color={gradeColor}
                            hoveredStandard={hoveredStandard}
                            onHover={onStandardHover}
                            onLeave={onStandardLeave}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </SectionDropdown>

          {/* Students Will Be Able To */}
          <SectionDropdown title="Students Will Be Able To" icon={<CheckCircle size={14} />} color={unitColor.main}>
            <ol className="space-y-3 mt-2">
              {(unit.essentialSkills || []).map((skill, i) => (
                <li key={i}>
                  <div className="flex items-start gap-2">
                    <span
                      className="w-5 h-5 rounded-full text-white text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: unitColor.main }}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <span className="text-xs text-slate-600 leading-relaxed">{skill.text}</span>
                      {skill.standards && skill.standards.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {skill.standards.map((code, j) => (
                            <StandardBadge
                              key={j}
                              code={code}
                              color={gradeColor}
                              hoveredStandard={hoveredStandard}
                              onHover={onStandardHover}
                              onLeave={onStandardLeave}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </SectionDropdown>
        </div>
      ) : (
        <div className="p-8 flex items-center justify-center" style={{ minHeight: '200px' }}>
          <div className="text-center">
            <BookOpen size={24} className="mx-auto mb-2 text-slate-300" />
            <span className="text-sm text-slate-400">No unit data available</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Grade Unit Accordion (for Overview tab) ─────────────────────────────────

function GradeUnitAccordion({ grade, unit, unitColor, hoveredStandard, onStandardHover, onStandardLeave }) {
  const [open, setOpen] = useState(false);
  const gradeColor = GRADE_COLORS[grade];
  const isHighlighted = hoveredStandard && (() => {
    const norms = collectNormalizedStandards(unit);
    return norms.has(hoveredStandard);
  })();

  return (
    <div
      className="bg-white rounded-lg transition-all duration-200 overflow-hidden min-h-[72px]"
      style={{
        border: isHighlighted
          ? `2px solid ${gradeColor}`
          : '1.5px solid #e2e8f0',
        boxShadow: isHighlighted
          ? `0 0 12px ${gradeColor}30`
          : '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* Accordion Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
            style={{ backgroundColor: gradeColor, fontSize: '11px' }}
          >
            {grade}
          </div>
          <div className="min-w-0">
            <span className="text-xs font-medium text-slate-500">Unit {unit.id}</span>
            <h4
              className="text-xs font-medium text-slate-700 leading-snug"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              {extractSkillFocus(unit.title)}
            </h4>
          </div>
        </div>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 flex-shrink-0 ml-2 ${open ? 'rotate-180' : ''}`}
          style={{ color: open ? unitColor.main : '#94a3b8' }}
        />
      </button>

      {/* Expanded Content */}
      {open && (
        <div className="px-3 pb-3 animate-fadeIn" style={{ borderTop: '1px solid #f1f5f9' }}>
          {/* Skill Description */}
          <p className="text-xs text-slate-500 leading-relaxed py-2">
            {unit.skillDescription}
          </p>

          {/* Students Will Be Able To */}
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1 mb-1.5" style={{ fontSize: '10px' }}>
            Students Will Be Able To
          </p>
          <ul className="space-y-1.5">
            {(unit.essentialSkills || []).map((skill, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-slate-300 mt-px flex-shrink-0" style={{ fontSize: '8px', lineHeight: '16px' }}>&#9679;</span>
                <div className="min-w-0">
                  <span className="text-xs text-slate-600 leading-relaxed">{skill.text}</span>
                  {skill.standards && skill.standards.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {skill.standards.map((code, j) => (
                        <StandardBadge
                          key={j}
                          code={code}
                          color={gradeColor}
                          hoveredStandard={hoveredStandard}
                          onHover={onStandardHover}
                          onLeave={onStandardLeave}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Empty Placeholder ────────────────────────────────────────────────────────

function EmptyCard({ grade }) {
  const gradeColor = GRADE_COLORS[grade];
  return (
    <div
      className="rounded-lg flex items-center justify-center"
      style={{
        border: '1.5px dashed #e2e8f0',
        backgroundColor: '#fafaf9',
        minHeight: '120px',
      }}
    >
      <div className="text-center">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold mx-auto mb-1.5 opacity-40"
          style={{ backgroundColor: gradeColor, fontSize: '11px' }}
        >
          {grade}
        </div>
        <span className="text-xs text-slate-300">No unit</span>
      </div>
    </div>
  );
}

// ─── Department View ──────────────────────────────────────────────────────────

export default function DepartmentView({ gradeUnits, standardsRef }) {
  const [subView, setSubView] = useState('overview');
  const [hoveredStandard, setHoveredStandard] = useState(null);

  // Left panel state (Compare tab)
  const [leftGrade, setLeftGrade] = useState('9');
  const [leftUnit, setLeftUnit] = useState(0);

  // Right panel state (Compare tab)
  const [rightGrade, setRightGrade] = useState('10');
  const [rightUnit, setRightUnit] = useState(0);

  const handleStandardHover = (normalized) => setHoveredStandard(normalized);
  const handleStandardLeave = () => setHoveredStandard(null);

  const grades = ['9', '10', '11', '12'];
  const maxUnits = Math.max(...grades.map((g) => (gradeUnits[g] || []).length));

  // Quarter-to-unit mapping per grade (0-indexed unit indices)
  const QUARTER_MAP = {
    '9':  { 1: [0], 2: [1], 3: [2, 3], 4: [4] },
    '10': { 1: [0], 2: [1], 3: [2], 4: [3] },
    '11': { 1: [0, 1], 2: [2, 3], 3: [4, 5], 4: [6, 7] },
    '12': { 1: [0, 1], 2: [2, 3], 3: [4, 5], 4: [6, 7] },
  };
  const quarters = [1, 2, 3, 4];

  return (
    <div className="space-y-6">
      {/* Sub-tab Toggle */}
      <div className="flex gap-2 mb-6">
        {[['overview', 'All Grades Overview'], ['compare', 'Compare']].map(([view, label]) => (
          <button
            key={view}
            onClick={() => setSubView(view)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
            style={subView === view
              ? { backgroundColor: HEADER_COLOR, color: 'white' }
              : { backgroundColor: 'white', color: '#64748b', border: '1px solid #e2e8f0' }
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* ─── Compare Sub-Tab ─── */}
      {subView === 'compare' && (
        <>
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-1 h-8 rounded-full"
              style={{ backgroundColor: HEADER_COLOR }}
            />
            <div>
              <h2
                className="text-lg font-semibold"
                style={{ fontFamily: "'Fraunces', Georgia, serif", color: HEADER_COLOR }}
              >
                Side-by-Side Comparison
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Compare any two grade + unit combinations &mdash; hover a standard to trace across panels
              </p>
            </div>
          </div>

          {/* Two-panel comparison grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ComparisonPanel
              gradeUnits={gradeUnits}
              standardsRef={standardsRef}
              grade={leftGrade}
              unitIdx={leftUnit}
              onGradeChange={setLeftGrade}
              onUnitChange={setLeftUnit}
              hoveredStandard={hoveredStandard}
              onStandardHover={handleStandardHover}
              onStandardLeave={handleStandardLeave}
            />
            <ComparisonPanel
              gradeUnits={gradeUnits}
              standardsRef={standardsRef}
              grade={rightGrade}
              unitIdx={rightUnit}
              onGradeChange={setRightGrade}
              onUnitChange={setRightUnit}
              hoveredStandard={hoveredStandard}
              onStandardHover={handleStandardHover}
              onStandardLeave={handleStandardLeave}
            />
          </div>
        </>
      )}

      {/* ─── Overview Sub-Tab ─── */}
      {subView === 'overview' && (
        <>
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-1 h-8 rounded-full"
              style={{ backgroundColor: HEADER_COLOR }}
            />
            <div>
              <h2
                className="text-lg font-semibold"
                style={{ fontFamily: "'Fraunces', Georgia, serif", color: HEADER_COLOR }}
              >
                Vertical Alignment Overview
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                9th&ndash;12th Grade side-by-side &mdash; hover a standard to trace across grades
              </p>
            </div>
          </div>

          {/* Grade Legend */}
          <div className="flex flex-wrap gap-3 mb-2">
            {grades.map((g) => (
              <div key={g} className="flex items-center gap-1.5">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: GRADE_COLORS[g], fontSize: '10px' }}
                >
                  {g}
                </div>
                <span className="text-xs text-slate-500 font-medium">{ordinal(g)} Grade</span>
              </div>
            ))}
          </div>

          {/* Quarter Rows */}
          {quarters.map((q) => {
            const color = UNIT_COLORS[q] || UNIT_COLORS[1];

            return (
              <section key={q}>
                {/* Quarter Header Bar */}
                <div
                  className="rounded-t-lg px-4 py-2.5 flex items-center gap-2"
                  style={{
                    backgroundColor: color.main,
                    color: 'white',
                  }}
                >
                  <span
                    className="text-sm font-semibold"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    Quarter {q}
                  </span>
                </div>

                {/* 4-Column Grid */}
                <div
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 rounded-b-lg p-4"
                  style={{ backgroundColor: color.light, border: `1px solid ${color.border}`, borderTop: 'none' }}
                >
                  {grades.map((grade) => {
                    const units = gradeUnits[grade] || [];
                    const unitIndices = QUARTER_MAP[grade]?.[q] || [];
                    const quarterUnits = unitIndices.map(i => units[i]).filter(Boolean);

                    if (quarterUnits.length === 0) return null;

                    return (
                      <div key={grade} className="space-y-2 flex flex-col">
                        {quarterUnits.map((unit, i) => (
                          <GradeUnitAccordion
                            key={`${grade}-${i}`}
                            grade={grade}
                            unit={unit}
                            unitColor={color}
                            hoveredStandard={hoveredStandard}
                            onStandardHover={handleStandardHover}
                            onStandardLeave={handleStandardLeave}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </>
      )}
    </div>
  );
}
