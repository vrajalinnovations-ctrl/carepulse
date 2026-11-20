import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import Progress from '../components/ui/progressbars';
import Badges from '../components/ui/badges';
import Breadcrumb from '../components/ui/breadcrumbs';
import Modal from '../components/ui/modals';
import { toast } from '../context/toast-context';
import {
  FiHome,
  FiSearch,
  FiPlus,
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiRefreshCw,
  FiUser,
  FiHeart,
  FiTrendingUp,
  FiLogOut,
} from 'react-icons/fi';
import wardsConfig from '../mokdata/wards.json';

const { wardsData: initialWardsData, unitFilters } = wardsConfig;

const WardsPage = () => {
  const [wardsList, setWardsList] = useState(initialWardsData);
  const [search, setSearch] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('All Units');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isSyncing, setIsSyncing] = useState(false);

  // Modal states
  const [showAdmitModal, setShowAdmitModal] = useState(false);
  const [selectedEhrBed, setSelectedEhrBed] = useState(null);

  // Form state for admitting patient
  const [admitData, setAdmitData] = useState({
    wardId: initialWardsData[0]?.id || '',
    bedCode: '',
    patientName: '',
    acuity: 'Moderate',
    notes: '',
  });

  const handleSyncTelemetry = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success('Live bed telemetry synchronized across all clinical wards.', {
        title: 'Telemetry Synced',
      });
    }, 800);
  };

  const handleOpenAdmit = (wardId, bedCode) => {
    setAdmitData({
      wardId: wardId || wardsList[0]?.id || '',
      bedCode: bedCode || '',
      patientName: '',
      acuity: 'Moderate',
      notes: '',
    });
    setShowAdmitModal(true);
  };

  const handleAdmitSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!admitData.patientName.trim()) {
      toast.error('Please specify patient name for admission.');
      return;
    }

    const newPatientId = `P-${Math.floor(11100 + Math.random() * 800)}`;
    const colorMap = {
      Critical: 'danger',
      High: 'danger',
      Moderate: 'warning',
      Stable: 'info',
    };

    setWardsList((prev) =>
      prev.map((ward) => {
        if (ward.id !== admitData.wardId) return ward;
        return {
          ...ward,
          beds: ward.beds.map((b) => {
            if (b.code === admitData.bedCode) {
              return {
                ...b,
                patient: admitData.patientName.trim(),
                id: newPatientId,
                status: 'Occupied',
                acuity: admitData.acuity,
                color: colorMap[admitData.acuity] || 'info',
              };
            }
            return b;
          }),
        };
      })
    );

    setShowAdmitModal(false);
    toast.success(
      `${admitData.patientName} admitted to ${admitData.bedCode} (${newPatientId}) successfully.`,
      { title: 'Inpatient Admission Registered' }
    );
  };

  const handleExpediteSanitizing = (wardId, bedCode) => {
    setWardsList((prev) =>
      prev.map((ward) => {
        if (ward.id !== wardId) return ward;
        return {
          ...ward,
          beds: ward.beds.map((b) =>
            b.code === bedCode
              ? { ...b, status: 'Available', acuity: 'Ready', color: 'success' }
              : b
          ),
        };
      })
    );
    toast.success(`Sanitization completed for ${bedCode}. Bed is now Clean & Ready for admission.`, {
      title: 'Bed Turnover Completed',
    });
  };

  const handleDischargePatient = (wardId, bedCode, patientName) => {
    setWardsList((prev) =>
      prev.map((ward) => {
        if (ward.id !== wardId) return ward;
        return {
          ...ward,
          beds: ward.beds.map((b) =>
            b.code === bedCode
              ? { ...b, patient: null, id: null, status: 'Sanitizing', acuity: 'Cleaning', color: 'warning' }
              : b
          ),
        };
      })
    );
    setSelectedEhrBed(null);
    toast.info(`${patientName} discharged from ${bedCode}. Bed queued for terminal sanitization.`, {
      title: 'Inpatient Discharged',
    });
  };

  const filteredWards = useMemo(() => {
    return wardsList
      .filter((ward) => selectedUnit === 'All Units' || ward.type === selectedUnit)
      .map((ward) => {
        const filteredBeds = ward.beds.filter((bed) => {
          const matchSearch =
            !search ||
            bed.code.toLowerCase().includes(search.toLowerCase()) ||
            (bed.patient && bed.patient.toLowerCase().includes(search.toLowerCase())) ||
            (bed.id && bed.id.toLowerCase().includes(search.toLowerCase())) ||
            ward.name.toLowerCase().includes(search.toLowerCase());

          const matchStatus = selectedStatus === 'All' || bed.status === selectedStatus;
          return matchSearch && matchStatus;
        });

        const currentOccupied = ward.beds.filter((b) => b.status === 'Occupied').length;
        return { ...ward, occupied: currentOccupied, beds: filteredBeds };
      })
      .filter((ward) => ward.beds.length > 0);
  }, [wardsList, search, selectedUnit, selectedStatus]);

  const totalCapacity = wardsList.reduce((acc, w) => acc + w.capacity, 0);
  const totalOccupied = wardsList.reduce((acc, w) => acc + w.beds.filter((b) => b.status === 'Occupied').length, 0);
  const totalAvailable = wardsList.reduce((acc, w) => acc + w.beds.filter((b) => b.status === 'Available').length, 0);
  const totalSanitizing = wardsList.reduce((acc, w) => acc + w.beds.filter((b) => b.status === 'Sanitizing').length, 0);

  // Available beds for admit dropdown
  const availableBedsList = useMemo(() => {
    const ward = wardsList.find((w) => w.id === admitData.wardId);
    return ward ? ward.beds.filter((b) => b.status === 'Available') : [];
  }, [wardsList, admitData.wardId]);

  return (
    <div className="p-3.5 sm:p-5 lg:p-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
            Wards & Bed Capacity Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Real-time hospital bed allocation, ICU isolation suites, general medicine occupancy, and patient transfers
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={handleSyncTelemetry}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold transition-all shadow-xs cursor-pointer whitespace-nowrap"
          >
            <FiRefreshCw className={`w-3.5 h-3.5 shrink-0 ${isSyncing ? 'animate-spin text-primary' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Bed Telemetry'}</span>
          </button>
          <button
            type="button"
            onClick={() => handleOpenAdmit('', '')}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/25 cursor-pointer whitespace-nowrap"
          >
            <FiPlus className="w-3.5 h-3.5 shrink-0" />
            <span>Admit to Bed</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto pb-1 scrollbar-none">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Hospital Operations' },
            { label: 'Wards & Beds' },
          ]}
        />
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Total Bed Inventory</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{totalCapacity} Beds</div>
            <span className="text-xs text-primary font-semibold truncate block">4 Specialized Units</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
            <FiActivity className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Occupied Inpatients</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{totalOccupied} Beds</div>
            <span className="text-xs text-rose-500 font-semibold truncate block">{Math.round((totalOccupied / totalCapacity) * 100)}% Census Rate</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 border border-rose-500/20">
            <FiAlertTriangle className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Available Clean Beds</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{totalAvailable} Beds</div>
            <span className="text-xs text-emerald-500 font-semibold truncate block">Immediate triage ready</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <FiCheckCircle className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">In Sanitization</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{totalSanitizing} Beds</div>
            <span className="text-xs text-amber-500 font-semibold truncate block">Avg 20m cycle remaining</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20">
            <FiClock className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Ward Filter Toolbar */}
      <Card className="p-3.5 sm:p-4 space-y-3 sm:space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
          {/* Search Box */}
          <div className="relative w-full lg:w-80 shrink-0">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by bed code, patient, ward..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium shrink-0 mr-1">Bed Status:</span>
            {['All', 'Occupied', 'Available', 'Sanitizing'].map((st) => (
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

        {/* Unit Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
          {unitFilters.map((unit) => (
            <button
              key={unit}
              type="button"
              onClick={() => setSelectedUnit(unit)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                selectedUnit === unit
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700/80'
              }`}
            >
              {unit}
            </button>
          ))}
        </div>
      </Card>

      {/* Ward Cards & Bed Allocation Grids */}
      <div className="space-y-4 sm:space-y-6">
        {filteredWards.map((ward) => {
          const occPct = Math.round((ward.occupied / ward.capacity) * 100);
          return (
            <Card key={ward.id} className="p-3.5 sm:p-5 space-y-3 sm:space-y-4">
              {/* Ward Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-bold text-gray-900 dark:text-white truncate">
                      {ward.name}
                    </h2>
                    <Badges color="info" variant="soft" size="sm" rounded="pill" className="shrink-0">
                      {ward.type}
                    </Badges>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                    {ward.floor} · {ward.chargeNurse}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 w-full sm:w-auto pt-2 sm:pt-0 shrink-0">
                  <div className="text-left sm:text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Occupancy: <span className="font-bold text-gray-900 dark:text-white">{ward.occupied}/{ward.capacity}</span>
                    </div>
                    <span className="text-xs font-semibold text-primary">{occPct}% Utilized</span>
                  </div>
                  <div className="w-28 sm:w-32 shrink-0">
                    <Progress
                      value={occPct}
                      color={occPct > 85 ? 'danger' : 'primary'}
                      size="sm"
                      rounded="pill"
                    />
                  </div>
                </div>
              </div>

              {/* Bed Slot Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 sm:gap-3">
                {ward.beds.map((bed) => {
                  const isAvailable = bed.status === 'Available';
                  const isSanitizing = bed.status === 'Sanitizing';

                  return (
                    <div
                      key={bed.code}
                      className={`p-2.5 sm:p-3 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                        isAvailable
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-300'
                          : isSanitizing
                          ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-300'
                          : 'bg-gray-50/80 dark:bg-gray-900/60 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2 gap-1">
                        <span className="font-bold font-mono text-xs shrink-0">{bed.code}</span>
                        <Badges
                          color={bed.color}
                          variant="solid"
                          size="sm"
                          rounded="pill"
                          className="shrink-0"
                        >
                          {bed.acuity}
                        </Badges>
                      </div>

                      {bed.patient ? (
                        <div className="space-y-0.5 min-w-0 py-0.5">
                          <div className="font-semibold truncate text-xs text-gray-900 dark:text-white" title={bed.patient}>
                            {bed.patient}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 font-mono text-xs truncate">
                            {bed.id}
                          </div>
                        </div>
                      ) : (
                        <div className="py-0.5 min-w-0">
                          <div className="font-semibold text-xs flex items-center gap-1 truncate">
                            {isAvailable ? (
                              <>
                                <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span className="truncate">Clean & Ready</span>
                              </>
                            ) : (
                              <>
                                <FiClock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                <span className="truncate">Sanitizing</span>
                              </>
                            )}
                          </div>
                          <div className="text-gray-400 text-xs mt-0.5 truncate">
                            {isAvailable ? 'Immediate Admit' : 'Est 20m'}
                          </div>
                        </div>
                      )}

                      <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs gap-1">
                        <span className="text-gray-400 capitalize truncate text-xs">{bed.status}</span>
                        {isAvailable ? (
                          <button
                            type="button"
                            onClick={() => handleOpenAdmit(ward.id, bed.code)}
                            className="font-semibold text-primary hover:underline cursor-pointer shrink-0"
                          >
                            Assign
                          </button>
                        ) : isSanitizing ? (
                          <button
                            type="button"
                            onClick={() => handleExpediteSanitizing(ward.id, bed.code)}
                            className="font-semibold text-amber-500 hover:underline cursor-pointer shrink-0"
                          >
                            Expedite
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setSelectedEhrBed({ ward, bed })}
                            className="font-semibold text-gray-500 dark:text-gray-400 hover:text-primary cursor-pointer flex items-center gap-0.5 shrink-0"
                          >
                            <FiUser className="w-3 h-3" />
                            <span>EHR</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}

        {filteredWards.length === 0 && (
          <Card className="p-12 text-center text-sm text-gray-500 dark:text-gray-400">
            No hospital wards or bed units match your selected filter criteria.
          </Card>
        )}
      </div>

      {/* Admit Patient to Bed Modal */}
      <Modal
        open={showAdmitModal}
        onClose={() => setShowAdmitModal(false)}
        title="Admit Patient to Bed Unit"
        description="Assign an inpatient to an active, sanitization-cleared hospital bed."
        size="md"
        color="primary"
        primaryAction={{
          label: 'Confirm Admission',
          onClick: handleAdmitSubmit,
        }}
        secondaryAction={{
          label: 'Cancel',
          onClick: () => setShowAdmitModal(false),
        }}
      >
        <form onSubmit={handleAdmitSubmit} className="space-y-3 text-xs pt-1">
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Patient Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={admitData.patientName}
              onChange={(e) => setAdmitData((prev) => ({ ...prev, patientName: e.target.value }))}
              placeholder="e.g. Johnathan Miller"
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Target Ward
              </label>
              <select
                value={admitData.wardId}
                onChange={(e) => {
                  const targetW = wardsList.find((w) => w.id === e.target.value);
                  const firstAvail = targetW?.beds.find((b) => b.status === 'Available')?.code || '';
                  setAdmitData((prev) => ({ ...prev, wardId: e.target.value, bedCode: firstAvail }));
                }}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                {wardsList.map((ward) => (
                  <option key={ward.id} value={ward.id}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bed Slot <span className="text-rose-500">*</span>
              </label>
              <select
                required
                value={admitData.bedCode}
                onChange={(e) => setAdmitData((prev) => ({ ...prev, bedCode: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                {availableBedsList.length === 0 ? (
                  <option value="">No clean beds in ward</option>
                ) : (
                  availableBedsList.map((b) => (
                    <option key={b.code} value={b.code}>
                      {b.code} (Available)
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Clinical Acuity Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Critical', 'High', 'Moderate', 'Stable'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setAdmitData((prev) => ({ ...prev, acuity: lvl }))}
                  className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                    admitData.acuity === lvl
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </form>
      </Modal>

      {/* Bed EHR Inpatient Telemetry Modal */}
      {selectedEhrBed && (
        <Modal
          open={!!selectedEhrBed}
          onClose={() => setSelectedEhrBed(null)}
          title={`Inpatient EHR · ${selectedEhrBed.bed.patient}`}
          description={`Allocated to ${selectedEhrBed.bed.code} in ${selectedEhrBed.ward.name}`}
          size="lg"
          color="primary"
          primaryAction={{
            label: 'Close EHR',
            onClick: () => setSelectedEhrBed(null),
          }}
          secondaryAction={{
            label: 'Discharge Patient',
            onClick: () =>
              handleDischargePatient(
                selectedEhrBed.ward.id,
                selectedEhrBed.bed.code,
                selectedEhrBed.bed.patient
              ),
          }}
        >
          <div className="space-y-4 text-xs pt-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800">
              <div>
                <span className="text-gray-400 block">Admission Record</span>
                <span className="font-bold text-gray-900 dark:text-white text-sm">{selectedEhrBed.bed.id}</span>
                <p className="text-gray-500 dark:text-gray-400 mt-0.5">{selectedEhrBed.ward.floor} · {selectedEhrBed.ward.chargeNurse}</p>
              </div>
              <Badges color={selectedEhrBed.bed.color} variant="solid" size="md" rounded="pill" className="w-fit">
                {selectedEhrBed.bed.acuity} Acuity Inpatient
              </Badges>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-1.5 text-rose-500 font-semibold mb-1">
                  <FiHeart className="w-3.5 h-3.5" />
                  <span>Heart Rate</span>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">78 bpm</div>
                <span className="text-emerald-500 font-medium">Normal Sinus</span>
              </div>

              <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-1.5 text-cyan-500 font-semibold mb-1">
                  <FiTrendingUp className="w-3.5 h-3.5" />
                  <span>Pulse SpO2</span>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">98%</div>
                <span className="text-emerald-500 font-medium">Room Air</span>
              </div>

              <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-1.5 text-purple-500 font-semibold mb-1">
                  <FiActivity className="w-3.5 h-3.5" />
                  <span>Blood Pressure</span>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">122/78</div>
                <span className="text-emerald-500 font-medium">Normotensive</span>
              </div>

              <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-1.5 text-amber-500 font-semibold mb-1">
                  <FiClock className="w-3.5 h-3.5" />
                  <span>Temperature</span>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">36.8°C</div>
                <span className="text-emerald-500 font-medium">Afebrile</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WardsPage;
