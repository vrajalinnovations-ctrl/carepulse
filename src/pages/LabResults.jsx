import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import Badges from '../components/ui/badges';
import Breadcrumb from '../components/ui/breadcrumbs';
import Modal from '../components/ui/modals';
import { toast } from '../context/toast-context';
import labResultsConfig from '../mokdata/labResults.json';
import {
  FiHome,
  FiSearch,
  FiDownload,
  FiPlus,
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiChevronRight,
  FiPrinter,
  FiArrowLeft,
  FiSend,
} from 'react-icons/fi';

const { categoryFilters, labOrdersData: initialLabOrders } = labResultsConfig;

const LabResultsPage = () => {
  const [ordersList, setOrdersList] = useState(initialLabOrders);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedOrderId, setSelectedOrderId] = useState('LAB-9041');
  const [mobileTab, setMobileTab] = useState('roster'); // 'roster' | 'inspector'

  // Modal State for Ordering Lab Panel
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    patient: '',
    testName: 'Comprehensive Metabolic Panel (CMP)',
    category: 'Biochemistry',
    wardBed: 'Emergency Ward',
    doctor: 'Dr. Arthur Pendelton',
    priority: 'Routine',
    notes: '',
  });

  const filteredOrders = useMemo(() => {
    return ordersList.filter((order) => {
      const matchSearch =
        order.testName.toLowerCase().includes(search.toLowerCase()) ||
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.patient.toLowerCase().includes(search.toLowerCase()) ||
        order.patientId.toLowerCase().includes(search.toLowerCase()) ||
        order.doctor.toLowerCase().includes(search.toLowerCase());

      const matchCat = selectedCat === 'All Categories' || order.category === selectedCat;
      const matchStatus = selectedStatus === 'All' || order.status === selectedStatus;

      return matchSearch && matchCat && matchStatus;
    });
  }, [ordersList, search, selectedCat, selectedStatus]);

  const activeOrder = useMemo(() => {
    return (
      filteredOrders.find((o) => o.id === selectedOrderId) ||
      filteredOrders[0] ||
      ordersList[0]
    );
  }, [filteredOrders, selectedOrderId, ordersList]);

  // KPI metrics computed dynamically
  const kpiMetrics = useMemo(() => {
    const total = ordersList.length;
    const critical = ordersList.filter((o) => o.status === 'Critical Alert').length;
    const processing = ordersList.filter((o) => o.status === 'Processing').length;
    const completed = ordersList.filter((o) => o.status === 'Completed').length;
    return { total, critical, processing, completed };
  }, [ordersList]);

  const handleDownloadAll = () => {
    toast.success('Compiling diagnostic PDF archive for selected category...', {
      title: 'PDF Archive Generated',
    });
  };

  const handlePushEhr = (order) => {
    toast.success(`Lab panel ${order.id} results pushed to EHR chart for ${order.patient}.`, {
      title: 'EHR Chart Updated',
    });
  };

  const handlePrintLabel = (order) => {
    toast.info(`Barcode specimen label dispatched for ${order.id} (${order.specimen}).`, {
      title: 'Specimen Label Printed',
    });
  };

  const handleCreateOrder = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newOrder.patient.trim()) {
      toast.error('Please specify the patient name.');
      return;
    }

    const newId = `LAB-${Math.floor(9050 + Math.random() * 900)}`;
    const createdOrder = {
      id: newId,
      testName: newOrder.testName,
      category: newOrder.category,
      patient: newOrder.patient.trim(),
      patientId: `P-${Math.floor(10900 + Math.random() * 500)}`,
      wardBed: newOrder.wardBed || 'General Inpatient',
      doctor: newOrder.doctor || 'Dr. Arthur Pendelton',
      collectedAt: 'Just now',
      specimen: newOrder.category === 'Radiology' ? 'Radiological Scan' : 'Venous Blood',
      resultSummary: 'Specimen queued for automated diagnostic panel',
      status: newOrder.priority === 'Critical' ? 'Critical Alert' : 'Processing',
      badgeColor: newOrder.priority === 'Critical' ? 'danger' : 'info',
      parameters: [
        { name: 'Initial Panel Screen', value: 'Processing', ref: 'Pending Analyzer', flag: 'Normal' },
      ],
    };

    setOrdersList((prev) => [createdOrder, ...prev]);
    setSelectedOrderId(newId);
    setShowOrderModal(false);
    setNewOrder({
      patient: '',
      testName: 'Comprehensive Metabolic Panel (CMP)',
      category: 'Biochemistry',
      wardBed: 'Emergency Ward',
      doctor: 'Dr. Arthur Pendelton',
      priority: 'Routine',
      notes: '',
    });
    setMobileTab('inspector');
    toast.success(`Diagnostic order ${newId} registered and sent to automated track.`, {
      title: 'Lab Order Requisition Created',
    });
  };

  return (
    <div className="p-3.5 sm:p-5 lg:p-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
            Laboratory Diagnostics & Pathology
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Automated blood chemistry panels, microbiology cultures, radiological scans, and biopsy reports
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={handleDownloadAll}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold transition-all shadow-xs cursor-pointer whitespace-nowrap"
          >
            <FiDownload className="w-3.5 h-3.5 shrink-0" />
            <span>Download All PDF</span>
          </button>
          <button
            type="button"
            onClick={() => setShowOrderModal(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/25 cursor-pointer whitespace-nowrap"
          >
            <FiPlus className="w-3.5 h-3.5 shrink-0" />
            <span>Order Lab Panel</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto pb-1 scrollbar-none">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Hospital Operations' },
            { label: 'Lab Diagnostics' },
          ]}
        />
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Daily Specimens</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{kpiMetrics.total * 38} Processed</div>
            <span className="text-xs text-primary font-semibold truncate block">+14.2% daily throughput</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
            <FiActivity className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Critical Flags</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{kpiMetrics.critical} Urgent Alerts</div>
            <span className="text-xs text-rose-500 font-semibold truncate block">Immediate physician callback</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 border border-rose-500/20">
            <FiAlertTriangle className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Active In Analyzer</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{kpiMetrics.processing} Tests</div>
            <span className="text-xs text-cyan-500 font-semibold truncate block">Robotic track automation</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0 border border-cyan-500/20">
            <FiClock className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Avg Turnaround Time</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">48 Mins</div>
            <span className="text-xs text-emerald-500 font-semibold truncate block">Stat target under 60m</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <FiCheckCircle className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-3.5 sm:p-4 space-y-3 sm:space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
          {/* Search Box */}
          <div className="relative w-full lg:w-80 shrink-0">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by test, order ID, patient..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium shrink-0 mr-1">Status:</span>
            {['All', 'Critical Alert', 'Abnormal', 'Completed', 'Processing'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-xs'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Card>

      {/* Mobile/Tablet Segmented View Switcher */}
      <div className="flex items-center lg:hidden p-1 rounded-xl bg-gray-100 dark:bg-gray-800/80">
        <button
          type="button"
          onClick={() => setMobileTab('roster')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${
            mobileTab === 'roster'
              ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xs'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Diagnostic Roster ({filteredOrders.length})
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('inspector')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
            mobileTab === 'inspector'
              ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xs'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <span>Result Inspector</span>
          {activeOrder && (
            <span className="font-mono text-xs opacity-75">#{activeOrder.id}</span>
          )}
        </button>
      </div>

      {/* Main Two-Column Viewport: Orders Roster + Detailed Result Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        {/* Left Column: Orders Roster (7 cols on desktop) */}
        <div
          className={`${
            mobileTab === 'roster' ? 'block' : 'hidden'
          } lg:block lg:col-span-7 space-y-3`}
        >
          {filteredOrders.map((order) => {
            const isSelected = order.id === activeOrder?.id;

            return (
              <Card
                key={order.id}
                onClick={() => {
                  setSelectedOrderId(order.id);
                  setMobileTab('inspector');
                }}
                className={`p-3.5 sm:p-4 cursor-pointer transition-all hover:border-primary/50 ${
                  isSelected
                    ? 'ring-2 ring-primary/40 border-primary bg-primary/5 dark:bg-primary/5'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <span className="font-mono text-xs text-gray-400 shrink-0">{order.id}</span>
                      <Badges color={order.badgeColor} variant="soft" size="sm" rounded="pill" className="shrink-0">
                        {order.status}
                      </Badges>
                      <span className="text-xs text-gray-400 font-medium truncate">· {order.category}</span>
                    </div>

                    <h2 className="text-sm font-bold text-gray-900 dark:text-white truncate" title={order.testName}>
                      {order.testName}
                    </h2>

                    <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 pt-0.5">
                      <span className="font-semibold text-gray-700 dark:text-gray-300 truncate">
                        {order.patient}
                      </span>
                      <span className="font-mono text-gray-400">{order.patientId}</span>
                      <span className="truncate">{order.wardBed}</span>
                    </div>

                    <div className="text-xs text-primary font-medium pt-0.5 truncate">
                      {order.resultSummary}
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex flex-col items-end justify-between self-stretch">
                    <span className="text-xs text-gray-400">{order.collectedAt}</span>
                    <FiChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-primary translate-x-1' : 'text-gray-400'}`} />
                  </div>
                </div>
              </Card>
            );
          })}

          {filteredOrders.length === 0 && (
            <Card className="p-12 text-center text-sm text-gray-500 dark:text-gray-400">
              No laboratory diagnostic orders match your current filters.
            </Card>
          )}
        </div>

        {/* Right Column: Detailed Parameter Inspector (5 cols on desktop) */}
        <div
          className={`${
            mobileTab === 'inspector' ? 'block' : 'hidden'
          } lg:block lg:col-span-5`}
        >
          {activeOrder ? (
            <Card className="p-3.5 sm:p-5 space-y-3 sm:space-y-4 sticky top-20">
              {/* Back to roster shortcut on mobile */}
              <button
                type="button"
                onClick={() => setMobileTab('roster')}
                className="lg:hidden text-xs text-primary font-semibold hover:underline flex items-center gap-1.5 mb-1 cursor-pointer"
              >
                <FiArrowLeft className="w-3.5 h-3.5" />
                <span>Back to orders roster</span>
              </button>

              {/* Inspector Header */}
              <div className="pb-3 sm:pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-1.5 gap-2">
                  <span className="font-mono text-xs text-gray-400 shrink-0">{activeOrder.id}</span>
                  <Badges color={activeOrder.badgeColor} variant="solid" size="sm" rounded="pill" className="shrink-0">
                    {activeOrder.status}
                  </Badges>
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-white truncate" title={activeOrder.testName}>
                  {activeOrder.testName}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  Category: {activeOrder.category} · Specimen: {activeOrder.specimen}
                </p>
              </div>

              {/* Patient & Doctor Context */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 text-xs">
                <div className="min-w-0">
                  <span className="text-gray-400 block text-xs truncate">Patient Subject</span>
                  <span className="font-semibold text-gray-900 dark:text-white mt-0.5 block truncate" title={activeOrder.patient}>
                    {activeOrder.patient}
                  </span>
                  <span className="text-gray-400 text-xs truncate block">{activeOrder.wardBed}</span>
                </div>
                <div className="min-w-0">
                  <span className="text-gray-400 block text-xs truncate">Ordering Physician</span>
                  <span className="font-semibold text-gray-900 dark:text-white mt-0.5 block truncate" title={activeOrder.doctor}>
                    {activeOrder.doctor}
                  </span>
                  <span className="text-gray-400 text-xs truncate block">{activeOrder.collectedAt}</span>
                </div>
              </div>

              {/* Parameter Table Breakdown */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
                  <span>Assay / Analyte</span>
                  <span>Value &amp; Reference</span>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-800/80 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden text-xs">
                  {activeOrder.parameters.map((param, idx) => {
                    const isHigh = param.flag === 'High';
                    const isLow = param.flag === 'Low';

                    return (
                      <div
                        key={idx}
                        className={`p-2.5 sm:p-3 flex items-center justify-between gap-2 sm:gap-3 ${
                          isHigh
                            ? 'bg-rose-50/50 dark:bg-rose-950/20'
                            : isLow
                            ? 'bg-amber-50/50 dark:bg-amber-950/20'
                            : 'bg-white dark:bg-gray-900/40'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <span className="font-semibold text-gray-900 dark:text-white block truncate">
                            {param.name}
                          </span>
                          <span className="text-gray-400 text-xs truncate block">
                            Ref: {param.ref}
                          </span>
                        </div>

                        <div className="text-right shrink-0">
                          <span
                            className={`font-bold block text-xs ${
                              isHigh
                                ? 'text-rose-500'
                                : isLow
                                ? 'text-amber-500'
                                : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {param.value}
                          </span>
                          <span
                            className={`text-xs font-semibold ${
                              isHigh
                                ? 'text-rose-500'
                                : isLow
                                ? 'text-amber-500'
                                : 'text-emerald-500'
                            }`}
                          >
                            {param.flag}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-2 flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => handlePushEhr(activeOrder)}
                  className="flex-1 sm:flex-initial py-2 px-3 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/25 cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <FiFileText className="w-3.5 h-3.5 shrink-0" />
                  <span>Push to EHR Chart</span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePrintLabel(activeOrder)}
                  className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap"
                >
                  <FiPrinter className="w-3.5 h-3.5 shrink-0" />
                  <span>Print Label</span>
                </button>
              </div>
            </Card>
          ) : null}
        </div>
      </div>

      {/* Order Diagnostic Lab Panel Modal */}
      <Modal
        open={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        title="Requisition Diagnostic Laboratory Panel"
        description="Dispatch automated specimen collection and laboratory analyzer profile."
        size="md"
        color="primary"
        primaryAction={{
          label: 'Create Lab Order',
          onClick: handleCreateOrder,
        }}
        secondaryAction={{
          label: 'Cancel',
          onClick: () => setShowOrderModal(false),
        }}
      >
        <form onSubmit={handleCreateOrder} className="space-y-3 text-xs pt-1">
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Patient Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={newOrder.patient}
              onChange={(e) => setNewOrder((prev) => ({ ...prev, patient: e.target.value }))}
              placeholder="e.g. Eleanor Vance"
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Diagnostic Category
              </label>
              <select
                value={newOrder.category}
                onChange={(e) => setNewOrder((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                {categoryFilters.filter((c) => c !== 'All Categories').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Clinical Priority
              </label>
              <select
                value={newOrder.priority}
                onChange={(e) => setNewOrder((prev) => ({ ...prev, priority: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                <option value="Routine">Routine (Standard Turnaround)</option>
                <option value="Urgent">Urgent (Turnaround &lt; 2 hrs)</option>
                <option value="Critical">STAT Emergency (Turnaround &lt; 30 mins)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Test Panel Selection
            </label>
            <input
              type="text"
              required
              value={newOrder.testName}
              onChange={(e) => setNewOrder((prev) => ({ ...prev, testName: e.target.value }))}
              placeholder="e.g. Complete Blood Count (CBC) w/ Differential"
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ward / Inpatient Bed
              </label>
              <input
                type="text"
                value={newOrder.wardBed}
                onChange={(e) => setNewOrder((prev) => ({ ...prev, wardBed: e.target.value }))}
                placeholder="e.g. ICU · Bed 04"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ordering Attending Doctor
              </label>
              <input
                type="text"
                value={newOrder.doctor}
                onChange={(e) => setNewOrder((prev) => ({ ...prev, doctor: e.target.value }))}
                placeholder="e.g. Dr. Arthur Pendelton"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default LabResultsPage;
