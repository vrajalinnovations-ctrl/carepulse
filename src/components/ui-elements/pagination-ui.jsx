import React, { useState } from 'react';
import Pagination from '../ui/pagination';
import Card from '../ui/Card';
import Breadcrumb from '../ui/breadcrumbs';
import { FiHome, FiDatabase } from 'react-icons/fi';

const PaginationUi = () => {
  const total = 196;
  const pageSize = 10;

  const [pBasic, setPBasic] = useState(1);
  const [pOutline, setPOutline] = useState(2);
  const [pPill, setPPill] = useState(3);
  const [pSoft, setPSoft] = useState(4);
  const [pSolid, setPSolid] = useState(5);
  const [pMinimal, setPMinimal] = useState(6);
  const [pBordered, setPBordered] = useState(7);
  const [pCompact, setPCompact] = useState(8);
  const [pIcons, setPIcons] = useState(9);
  const [pSegmented, setPSegmented] = useState(10);

  // Table Toolbar State
  const [toolPage, setToolPage] = useState(1);
  const [toolSize, setToolSize] = useState(10);
  const totalPages = Math.ceil(total / toolSize);
  const startIdx = (toolPage - 1) * toolSize + 1;
  const endIdx = Math.min(total, toolPage * toolSize);

  return (
    <div className="pt-6 px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pagination Components</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Navigation controls for data tables, patient lists, and paginated recordsets
          </p>
        </div>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Components' },
            { label: 'UIElements' },
            { label: 'Pagination' },
          ]}
        />
      </div>

      {/* 01: Top Feature: Data Table Pagination Footer Bar */}
      <div className="mb-6">
        <Card>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                <FiDatabase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  Electronic Health Records Table Footer
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Showing <span className="font-semibold text-gray-900 dark:text-white">{startIdx}</span> to{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">{endIdx}</span> of{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">{total}</span> patient entries
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Rows per page:</span>
                <select
                  value={toolSize}
                  onChange={(e) => {
                    setToolSize(Number(e.target.value));
                    setToolPage(1);
                  }}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <Pagination
                  total={total}
                  pageSize={toolSize}
                  page={toolPage}
                  onChange={setToolPage}
                  variant="solid"
                  color="primary"
                  showFirstLast
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 02: Responsive Grid of Pagination Styles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Basic Default */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Basic Default</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Minimal button spacing with primary active state</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              Page {pBasic} of 20
            </span>
          </div>
          <div className="overflow-x-auto pt-1">
            <Pagination total={total} pageSize={pageSize} page={pBasic} onChange={setPBasic} variant="basic" color="primary" />
          </div>
        </Card>

        {/* Solid Variant */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Solid Fill Accent</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">High-contrast solid colored background for selected page</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Page {pSolid} of 20
            </span>
          </div>
          <div className="overflow-x-auto pt-1">
            <Pagination total={total} pageSize={pageSize} page={pSolid} onChange={setPSolid} variant="solid" color="success" />
          </div>
        </Card>

        {/* Outline Variant */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Outline Bordered</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Outlined rounded borders with smooth hover focus</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              Page {pOutline} of 20
            </span>
          </div>
          <div className="overflow-x-auto pt-1">
            <Pagination total={total} pageSize={pageSize} page={pOutline} onChange={setPOutline} variant="outline" color="primary" />
          </div>
        </Card>

        {/* Pill Rounded */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Rounded Pill Buttons</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Fully rounded pill geometry for softer visual design</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
              Page {pPill} of 20
            </span>
          </div>
          <div className="overflow-x-auto pt-1">
            <Pagination total={total} pageSize={pageSize} page={pPill} onChange={setPPill} variant="pill" color="teal" />
          </div>
        </Card>

        {/* Soft Background */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Soft Background</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Muted slate background fills with active contrast</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
              Page {pSoft} of 20
            </span>
          </div>
          <div className="overflow-x-auto pt-1">
            <Pagination total={total} pageSize={pageSize} page={pSoft} onChange={setPSoft} variant="soft" color="secondary" />
          </div>
        </Card>

        {/* Minimal Underline */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Minimalist (Tab-Like)</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Clean underline active indicator with minimal footprint</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              Page {pMinimal} of 20
            </span>
          </div>
          <div className="overflow-x-auto pt-1">
            <Pagination total={total} pageSize={pageSize} page={pMinimal} onChange={setPMinimal} variant="minimal" color="purple" />
          </div>
        </Card>

        {/* Segmented Group */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Segmented Button Group</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Single connected button container with internal dividers</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              Page {pSegmented} of 20
            </span>
          </div>
          <div className="overflow-x-auto pt-1">
            <Pagination total={total} pageSize={pageSize} page={pSegmented} onChange={setPSegmented} variant="segmented" color="indigo" showFirstLast />
          </div>
        </Card>

        {/* SVG Icon Controls */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">First & Last Icon Controls</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Integrated chevron indicators with fast first/last jumps</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              Page {pIcons} of 20
            </span>
          </div>
          <div className="overflow-x-auto pt-1">
            <Pagination total={total} pageSize={pageSize} page={pIcons} onChange={setPIcons} variant="icons" color="danger" showFirstLast />
          </div>
        </Card>

        {/* Compact Size */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Compact Density (Dense Tables)</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Small footprint (32px) ideal for dense EHR grids and modals</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Page {pCompact} of 20
            </span>
          </div>
          <div className="overflow-x-auto pt-1">
            <Pagination total={total} pageSize={pageSize} page={pCompact} onChange={setPCompact} variant="compact" color="warning" size="sm" />
          </div>
        </Card>

        {/* Bordered Cells */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Bordered Cell Grid</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Bordered page cells with themed active indicator</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              Page {pBordered} of 20
            </span>
          </div>
          <div className="overflow-x-auto pt-1">
            <Pagination total={total} pageSize={pageSize} page={pBordered} onChange={setPBordered} variant="bordered" color="info" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaginationUi;
