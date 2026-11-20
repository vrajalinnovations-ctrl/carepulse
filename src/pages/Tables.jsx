import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import Table from '../components/ui/table';
import Badges from '../components/ui/badges';
import Breadcrumb from '../components/ui/breadcrumbs';
import tablesConfig from '../mokdata/tables.json';
import { FiHome, FiSearch, FiDownload, FiPlus, FiChevronLeft, FiChevronRight, FiCheckCircle, FiClock, FiAlertCircle, FiActivity, } from 'react-icons/fi';

const { encountersData, departmentFilters } = tablesConfig;

const TablesPage = () => {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const selectedStatus = 'All';
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filteredData = useMemo(() => {
    return encountersData.filter((item) => {
      const matchSearch =
        item.patientName.toLowerCase().includes(search.toLowerCase()) ||
        item.patientId.toLowerCase().includes(search.toLowerCase()) ||
        item.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
        item.physician.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());

      const matchDept = selectedDept === 'All' || item.department === selectedDept;
      const matchStatus = selectedStatus === 'All' || item.status === selectedStatus;

      return matchSearch && matchDept && matchStatus;
    });
  }, [search, selectedDept, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedData = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, safeCurrentPage, pageSize]);

  const columns = [
    {
      key: 'patient',
      title: 'Patient Record',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 border border-primary/20">
            {row.patientName
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white leading-tight">
              {row.patientName}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {row.patientId} · {row.ageGender}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'diagnosis',
      title: 'Clinical Encounter',
      render: (_, row) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white text-xs">
            {row.diagnosis}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {row.wardBed}
          </div>
        </div>
      ),
    },
    {
      key: 'physician',
      title: 'Attending Physician',
      render: (_, row) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white text-xs">
            {row.physician}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {row.specialty}
          </div>
        </div>
      ),
    },
    {
      key: 'admission',
      title: 'Admission',
      render: (_, row) => (
        <div>
          <div className="text-xs text-gray-900 dark:text-white font-medium">
            {row.admissionDate}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            LOS: {row.los}
          </div>
        </div>
      ),
    },
    {
      key: 'acuity',
      title: 'Acuity',
      render: (_, row) => (
        <Badges
          color={row.acuityColor}
          variant="soft"
          size="sm"
          rounded="pill"
        >
          {row.acuity}
        </Badges>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (_, row) => (
        <Badges
          color={row.statusColor}
          variant="solid"
          size="sm"
          rounded="pill"
        >
          {row.status}
        </Badges>
      ),
    },
    {
      key: 'billing',
      title: 'Insurance Claim',
      align: 'right',
      render: (_, row) => (
        <div className="text-right">
          <div className="font-semibold text-gray-900 dark:text-white text-xs">
            {row.billedAmount}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {row.claimStatus}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="px-5 py-5 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Hospital Master Records Table
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Comprehensive clinical registry, inpatient encounters, attending physicians, and insurance status
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <FiDownload className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/25 cursor-pointer"
          >
            <FiPlus className="w-3.5 h-3.5" />
            <span>New Encounter</span>
          </button>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
          { label: 'Clinical Operations' },
          { label: 'Records Table' },
        ]}
      />

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex items-center justify-between p-4">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Encounters</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">1,482</div>
            <span className="text-xs text-emerald-500 font-semibold">+8.4% this month</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
            <FiActivity className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-4">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Active Treatment</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">894</div>
            <span className="text-xs text-cyan-500 font-semibold">60.3% census share</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0 border border-cyan-500/20">
            <FiClock className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-4">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Discharged Today</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">142</div>
            <span className="text-xs text-emerald-500 font-semibold">100% beds sanitized</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <FiCheckCircle className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-4">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Claims In Review</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">46</div>
            <span className="text-xs text-amber-500 font-semibold">Avg 3.2 days turnaround</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20">
            <FiAlertCircle className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Main Table Container Card */}
      <Card className="p-0 overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by patient, ID, diagnosis..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Department Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {departmentFilters.map((dept) => (
              <button
                key={dept}
                onClick={() => {
                  setSelectedDept(dept);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${selectedDept === dept
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Master Table */}
        <Table
          columns={columns}
          data={paginatedData}
          rowKey="id"
          emptyMessage="No clinical encounters matched your search."
        />

        {/* Pagination Footer */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
          <div>
            Showing <span className="font-semibold text-gray-900 dark:text-white">{(safeCurrentPage - 1) * pageSize + (paginatedData.length ? 1 : 0)}</span> to{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{Math.min(safeCurrentPage * pageSize, filteredData.length)}</span> of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{filteredData.length}</span> records
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={safeCurrentPage <= 1}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-2 font-medium">
              Page {safeCurrentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={safeCurrentPage >= totalPages}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TablesPage;
