import React, { useState, useRef, useEffect } from 'react';
import { FileText, Copy, Check, ChevronDown } from 'lucide-react';

function RubricGleItem({ group }) {
  const [open, setOpen] = useState(false);
  const ccssCodesRaw = group.evidenceOutcomes
    .map(eo => { const m = eo.match(/\(CCSS[:\s]+([^)]+)\)/); return m ? m[1].trim() : null; })
    .filter(Boolean);
  const ccssCodes = [...new Set(ccssCodesRaw)];
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-2.5 py-2 text-left hover:bg-slate-50 transition-colors duration-150"
      >
        <span className="text-xs font-medium text-slate-700 leading-relaxed">{group.gle || group.standard}{ccssCodes.length > 0 ? <span className="text-slate-400 font-normal"> ({ccssCodes.join(', ')})</span> : ''}</span>
        <ChevronDown size={12} className={`transition-transform duration-200 flex-shrink-0 ml-1.5 ${open ? 'rotate-180' : ''}`} style={{ color: open ? '#64748b' : '#94a3b8' }} />
      </button>
      {open && (
        <div className="px-2.5 pb-2.5 pt-1 border-t border-slate-100 bg-slate-50/50">
          <ul className="space-y-1">
            {group.evidenceOutcomes.map((eo, eIdx) => (
              <li key={eIdx} className="text-base text-slate-600 leading-relaxed flex items-start gap-1.5">
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

const RubricBuilder = ({ standardsReference = {}, units: unitsProp = [], grade = '10' }) => {
  const rubricGrade = grade;
  const [rubricUnit, setRubricUnit] = useState('1');
  const [copied, setCopied] = useState(false);
  const [rubricData, setRubricData] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const tableRef = useRef(null);

  const units = unitsProp;

  // Reset unit selection when grade changes and current unit exceeds available units
  useEffect(() => {
    if (parseInt(rubricUnit) > units.length) {
      setRubricUnit('1');
    }
  }, [units.length, rubricUnit]);

  const proficiencyLevels = [
    { level: 5, label: 'Advanced',    headerBg: '#FFFFFF', headerColor: '#2C2416' },
    { level: 4, label: 'Proficient',  headerBg: '#FFFFFF', headerColor: '#2C2416' },
    { level: 3, label: 'Approaching', headerBg: '#FFFFFF', headerColor: '#2C2416' },
    { level: 2, label: 'Developing',  headerBg: '#FFFFFF', headerColor: '#2C2416' },
    { level: 1, label: 'Beginning',   headerBg: '#FFFFFF', headerColor: '#2C2416' },
  ];

  const currentUnit = units[parseInt(rubricUnit) - 1] || units[0];
  const rubricKey = `${rubricGrade}-${rubricUnit}`;

  if (!currentUnit) return null;

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
    <div className="flex flex-col md:flex-row">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden w-full px-4 py-3 bg-stone-100 border-b border-stone-200 text-sm font-medium text-slate-700 flex items-center justify-between"
      >
        <span>Rubric Settings — Grade {rubricGrade}, Unit {rubricUnit}</span>
        <ChevronDown size={16} className={`transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
      </button>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-72 flex-shrink-0 border-b md:border-b-0 md:border-r border-stone-200 md:min-h-[calc(100vh-113px)]`} style={{ backgroundColor: '#EEE9E0' }}>
        <div className="p-6 sticky top-0">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Rubric Settings
          </h2>

          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">Grade Level</label>
            <div className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm">
              {rubricGrade}th Grade
            </div>
            <p className="mt-1 text-xs text-slate-400">Use the grade selector in the header to change</p>
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

          {currentUnit.majorStandards && currentUnit.majorStandards.length > 0 && (
            <div className="border-t border-slate-200 pt-5">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Priority Standards
              </h3>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {currentUnit.majorStandards.map((group, gIdx) => (
                  <RubricGleItem key={gIdx} group={group} />
                ))}
              </div>
            </div>
          )}

        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
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

        <div className="border border-slate-200 rounded-xl overflow-x-auto bg-white">
          <table ref={tableRef} className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[22%]">
                  Outcome
                </th>
                {proficiencyLevels.map(p => (
                  <th key={p.level} className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider border-r border-slate-300" style={{ backgroundColor: p.headerBg }}>
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
                        data-row={idx}
                        data-col={p.level}
                        value={getCellValue(idx, p.level)}
                        onChange={(e) => handleCellChange(idx, p.level, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.ctrlKey || e.metaKey) {
                            let targetRow = idx;
                            let targetCol = p.level;
                            if (e.key === 'ArrowRight') targetCol = Math.min(5, p.level + 1);
                            else if (e.key === 'ArrowLeft') targetCol = Math.max(1, p.level - 1);
                            else if (e.key === 'ArrowDown') targetRow = Math.min(currentUnit.essentialSkills.length - 1, idx + 1);
                            else if (e.key === 'ArrowUp') targetRow = Math.max(0, idx - 1);
                            else return;
                            e.preventDefault();
                            const target = document.querySelector(`textarea[data-row="${targetRow}"][data-col="${targetCol}"]`);
                            if (target) target.focus();
                          }
                        }}
                        placeholder="Enter criteria..."
                        className="w-full h-24 px-3 py-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg resize-none placeholder:text-slate-300 hover:border-slate-300 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1 transition-colors"
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
