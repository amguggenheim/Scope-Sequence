import React, { useState } from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';

// ─── Color System ─────────────────────────────────────────────────────────────

const HEADER_COLOR = '#3D5A73';

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

/** Normalize a standard code like RL.9-10.1 or RL.11-12.1 to RL.*.1 for cross-grade matching */
function normalizeStandard(code) {
  return code.replace(/\.\d+-\d+\./, '.*.');
}

/** Check if a unit's essential skills reference any standard matching the normalized pattern */
function unitMatchesStandard(unit, normalizedPattern) {
  if (!normalizedPattern) return false;
  for (const skill of unit.essentialSkills || []) {
    for (const std of skill.standards || []) {
      if (normalizeStandard(std) === normalizedPattern) return true;
    }
  }
  return false;
}

// ─── Standard Badge ───────────────────────────────────────────────────────────

function StandardBadge({ code, color, onHover, onLeave, isHighlighted }) {
  return (
    <span
      onMouseEnter={() => onHover(normalizeStandard(code))}
      onMouseLeave={onLeave}
      className="inline-block font-mono font-semibold px-1.5 py-0.5 rounded cursor-default transition-all duration-150"
      style={{
        fontSize: '10px',
        lineHeight: '14px',
        color: isHighlighted ? 'white' : color,
        backgroundColor: isHighlighted ? color : color + '15',
        border: `1px solid ${color}40`,
        transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      {code}
    </span>
  );
}

// ─── Grade Unit Card ──────────────────────────────────────────────────────────

function GradeUnitCard({ grade, unit, unitColor, standardsRef, hoveredStandard, onStandardHover, onStandardLeave }) {
  const [descOpen, setDescOpen] = useState(false);
  const gradeColor = GRADE_COLORS[grade];
  const isHighlighted = hoveredStandard && unitMatchesStandard(unit, hoveredStandard);

  return (
    <div
      className="bg-white rounded-lg transition-all duration-200"
      style={{
        border: isHighlighted
          ? `2px solid ${gradeColor}`
          : '1.5px solid #e2e8f0',
        boxShadow: isHighlighted
          ? `0 0 12px ${gradeColor}30`
          : '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* Card Header */}
      <div className="flex items-center gap-2 px-3 py-2.5" style={{ borderBottom: '1px solid #f1f5f9' }}>
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
          style={{ backgroundColor: gradeColor, fontSize: '11px' }}
        >
          {grade}
        </div>
        <h4
          className="text-xs font-medium text-slate-700 leading-snug line-clamp-2"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          {extractSkillFocus(unit.title)}
        </h4>
      </div>

      {/* Skill Description (collapsible) */}
      <div className="px-3">
        <button
          onClick={() => setDescOpen(!descOpen)}
          className="w-full flex items-center justify-between py-2 text-left"
        >
          <div className="flex items-center gap-1.5">
            <BookOpen size={11} style={{ color: unitColor.main }} className="flex-shrink-0" />
            <span className="text-xs font-medium" style={{ color: unitColor.main }}>Skill Description</span>
          </div>
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 flex-shrink-0 ${descOpen ? 'rotate-180' : ''}`}
            style={{ color: descOpen ? unitColor.main : '#94a3b8' }}
          />
        </button>
        {descOpen && (
          <p className="text-xs text-slate-500 leading-relaxed pb-3 animate-fadeIn">
            {unit.skillDescription}
          </p>
        )}
      </div>

      {/* Essential Skills */}
      <div className="px-3 pb-3" style={{ borderTop: '1px solid #f1f5f9' }}>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-2 mb-1.5" style={{ fontSize: '10px' }}>
          Essential Skills
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
                        onHover={onStandardHover}
                        onLeave={onStandardLeave}
                        isHighlighted={hoveredStandard && normalizeStandard(code) === hoveredStandard}
                      />
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
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
  const [hoveredStandard, setHoveredStandard] = useState(null);

  const grades = ['9', '10', '11', '12'];
  const maxUnits = Math.max(...grades.map((g) => (gradeUnits[g] || []).length));

  const handleStandardHover = (normalized) => setHoveredStandard(normalized);
  const handleStandardLeave = () => setHoveredStandard(null);

  return (
    <div className="space-y-6">
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
            Grades 9-12 side-by-side &mdash; hover a standard to trace across grades
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
            <span className="text-xs text-slate-500 font-medium">Grade {g}</span>
          </div>
        ))}
      </div>

      {/* Unit Rows */}
      {Array.from({ length: maxUnits }, (_, unitIdx) => {
        const unitNum = unitIdx + 1;
        const color = UNIT_COLORS[unitNum] || UNIT_COLORS[1];

        return (
          <section key={unitIdx}>
            {/* Unit Header Bar */}
            <div
              className="rounded-t-lg px-4 py-2.5 flex items-center gap-2"
              style={{
                backgroundColor: color.main,
                color: 'white',
              }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center font-semibold flex-shrink-0"
                style={{ backgroundColor: 'rgba(255,255,255,0.25)', fontSize: '11px' }}
              >
                {unitNum}
              </div>
              <span
                className="text-sm font-semibold"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                Unit {unitNum}
              </span>
            </div>

            {/* 4-Column Grid */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 rounded-b-lg p-4"
              style={{ backgroundColor: color.light, border: `1px solid ${color.border}`, borderTop: 'none' }}
            >
              {grades.map((grade) => {
                const units = gradeUnits[grade] || [];
                const unit = units[unitIdx];
                return unit ? (
                  <GradeUnitCard
                    key={grade}
                    grade={grade}
                    unit={unit}
                    unitColor={color}
                    standardsRef={(standardsRef && standardsRef[grade]) || {}}
                    hoveredStandard={hoveredStandard}
                    onStandardHover={handleStandardHover}
                    onStandardLeave={handleStandardLeave}
                  />
                ) : (
                  <EmptyCard key={grade} grade={grade} />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
