import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import Badges from '../components/ui/badges';
import Breadcrumb from '../components/ui/breadcrumbs';
import Modal from '../components/ui/modals';
import { toast } from '../context/toast-context';
import emergencyConfig from '../mokdata/emergency.json';
import {
  FiHome,
  FiSearch,
  FiPlus,
  FiActivity,
  FiAlertTriangle,
  FiClock,
  FiCheckCircle,
  FiMapPin,
  FiPhone,
  FiRadio,
  FiHeart,
  FiShield,
  FiTrendingUp,
} from 'react-icons/fi';

const { traumaBays: initialTraumaBays, inboundAmbulances, triageFilters } = emergencyConfig;

const EmergencyPage = () => {
  const [baysList, setBaysList] = useState(initialTraumaBays);
  const [ambulancesList, setAmbulancesList] = useState(inboundAmbulances);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Acuity');

  // Modal States
  const [showIntakeModal, setShowIntakeModal] = useState(false);
  const [selectedChartBay, setSelectedChartBay] = useState(null);

  // Form state for Triage Intake
  const [intakeData, setIntakeData] = useState({
    patient: '',
    ageGender: '48y / Male',
    complaint: '',
    bayCode: 'TRAUMA-03',
    acuity: 'Level 1 · Resus',
    doctor: 'Dr. Arthur Pendelton',
    hr: 112,
    bp: '140/90',
    spo2: '92%',
    gcs: '14/15',
  });

  const handleBroadcast = () => {
    toast.error('CODE RED / TRAUMA ALERT broadcasted to all attending physicians and surgical teams.', {
      title: 'Emergency Radio Broadcast',
    });
  };

  const handleRadioAmbulance = (unit) => {
    toast.info(`Patching live radio channel to ${unit.unit} (${unit.paramedicContact}).`, {
      title: 'Ambulance Dispatch Radio',
    });
  };

  const handleTriageSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!intakeData.patient.trim() || !intakeData.complaint.trim()) {
      toast.error('Please specify patient name and primary clinical complaint.');
      return;
    }

    const newId = `ER-${Math.floor(4110 + Math.random() * 800)}`;
    const acuityColorMap = {
      'Level 1 · Resus': 'danger',
      'Level 2 · Emergent': 'warning',
      'Level 3 · Urgent': 'info',
    };

    setBaysList((prev) =>
      prev.map((bay) => {
        if (bay.code === intakeData.bayCode) {
          return {
            ...bay,
            status: 'Occupied',
            patient: intakeData.patient.trim(),
            id: newId,
            ageGender: intakeData.ageGender || '45y / Unspecified',
            complaint: intakeData.complaint.trim(),
            acuity: intakeData.acuity,
            acuityColor: acuityColorMap[intakeData.acuity] || 'danger',
            leadDoctor: intakeData.doctor || 'Dr. Arthur Pendelton',
            vitals: {
              hr: Number(intakeData.hr) || 110,
              bp: intakeData.bp || '130/85',
              spo2: intakeData.spo2 || '94%',
              gcs: intakeData.gcs || '14/15',
            },
            team: 'Trauma Resus Team (Active)',
            admittedAt: 'Just now',
          };
        }
        return bay;
      })
    );

    setShowIntakeModal(false);
    toast.success(
      `Patient ${intakeData.patient} admitted to ${intakeData.bayCode} (${newId}). Trauma team notified.`,
      { title: 'Triage Intake Confirmed' }
    );
  };

  const handleTransferToOr = (bay) => {
    setBaysList((prev) =>
      prev.map((b) =>
        b.code === bay.code
          ? {
              ...b,
              status: 'Available',
              patient: null,
              id: null,
              ageGender: null,
              complaint: 'Turnover in progress · Ready for Inbound',
              acuity: 'Ready',
              acuityColor: 'success',
              vitals: null,
              admittedAt: null,
            }
          : b
      )
    );
    setSelectedChartBay(null);
    toast.success(`${bay.patient} transferred from ${bay.code} to Emergency OR Suite 1.`, {
      title: 'Patient Transferred to Surgery',
    });
  };

  const filteredBays = useMemo(() => {
    return baysList.filter((bay) => {
      const matchSearch =
        bay.name.toLowerCase().includes(search.toLowerCase()) ||
        bay.code.toLowerCase().includes(search.toLowerCase()) ||
        (bay.patient && bay.patient.toLowerCase().includes(search.toLowerCase())) ||
        (bay.complaint && bay.complaint.toLowerCase().includes(search.toLowerCase())) ||
        bay.leadDoctor.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        selectedFilter === 'All Acuity' ||
        (selectedFilter === 'Available Bays' && bay.status === 'Available') ||
        (selectedFilter === 'Level 1 · Resus' && bay.acuity.includes('Level 1')) ||
        (selectedFilter === 'Level 2 · Emergent' && bay.acuity.includes('Level 2'));

      return matchSearch && matchFilter;
    });
  }, [baysList, search, selectedFilter]);

  const kpiData = useMemo(() => {
    const totalBays = baysList.length;
    const occupiedBays = baysList.filter((b) => b.status === 'Occupied').length;
    const availableBays = totalBays - occupiedBays;
    const inboundUnits = ambulancesList.length;
    return { totalBays, occupiedBays, availableBays, inboundUnits };
  }, [baysList, ambulancesList]);

  // Available bays for intake picker
  const availableBaysList = useMemo(() => {
    return baysList.filter((b) => b.status === 'Available');
  }, [baysList]);

  return (
    <div className="p-3.5 sm:p-5 lg:p-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2 truncate">
            <span>Emergency &amp; Triage Command</span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0" />
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Trauma resuscitation bay telemetry, ambulance dispatch coordination, and rapid disaster response
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={handleBroadcast}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold transition-all shadow-xs cursor-pointer whitespace-nowrap"
          >
            <FiRadio className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>Emergency Broadcast</span>
          </button>
          <button
            type="button"
            onClick={() => {
              const firstAvail = availableBaysList[0]?.code || 'TRAUMA-03';
              setIntakeData((prev) => ({ ...prev, bayCode: firstAvail }));
              setShowIntakeModal(true);
            }}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/25 cursor-pointer whitespace-nowrap"
          >
            <FiPlus className="w-3.5 h-3.5 shrink-0" />
            <span>Triage Intake</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto pb-1 scrollbar-none">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Hospital Operations' },
            { label: 'Emergency & Triage' },
          ]}
        />
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Critical Resus Bays</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">
              {kpiData.occupiedBays} of {kpiData.totalBays} Active
            </div>
            <span className="text-xs text-rose-500 font-semibold truncate block">
              {kpiData.availableBays} ready for inbound
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 border border-rose-500/20">
            <FiAlertTriangle className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Door-to-Doctor Time</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">8.6 Mins</div>
            <span className="text-xs text-emerald-500 font-semibold truncate block">Standard target &lt; 15m</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <FiClock className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Inbound Ambulances</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{kpiData.inboundUnits} Transit Units</div>
            <span className="text-xs text-cyan-500 font-semibold truncate block">1 Air Evac Flight Inbound</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0 border border-cyan-500/20">
            <FiActivity className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">ER Waiting Census</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">18 Patients</div>
            <span className="text-xs text-primary font-semibold truncate block">All triaged &amp; categorized</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
            <FiCheckCircle className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Section 1: Inbound Emergency Units Telemetry */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h2 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 truncate">
            <FiRadio className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="truncate">Inbound Transit &amp; Ambulance Telemetry</span>
          </h2>
          <span className="text-xs text-gray-400 truncate">Live GPS &amp; Field Bio-Telemetry</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {ambulancesList.map((unit, idx) => (
            <Card key={idx} className="p-3.5 sm:p-4 space-y-2.5 sm:space-y-3 relative overflow-hidden border-rose-500/30">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1.5 truncate">
                  <FiMapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="truncate">{unit.unit}</span>
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    unit.etaUrgent
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  ETA {unit.eta}
                </span>
              </div>

              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 line-clamp-2">
                {unit.patientSnippet}
              </p>

              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 space-y-1 text-xs">
                <div className="text-gray-500 dark:text-gray-400 flex items-center justify-between gap-2">
                  <span className="shrink-0">Vitals:</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-white truncate">{unit.vitals}</span>
                </div>
                <div className="text-gray-500 dark:text-gray-400 flex items-center justify-between gap-2">
                  <span className="shrink-0">Routing:</span>
                  <span className="font-semibold text-primary truncate">{unit.assignedBay}</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-xs text-gray-400 gap-2">
                <span className="truncate">{unit.paramedicContact}</span>
                <button
                  type="button"
                  onClick={() => handleRadioAmbulance(unit)}
                  className="font-semibold text-primary hover:underline cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <FiPhone className="w-3 h-3" />
                  <span>Radio</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Filter Bar for Resuscitation Bays */}
      <Card className="p-3.5 sm:p-4 space-y-3 sm:space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
          <div className="relative w-full lg:w-80 shrink-0">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search bays, patient, complaint..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
            {triageFilters.map((flt) => (
              <button
                key={flt}
                type="button"
                onClick={() => setSelectedFilter(flt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  selectedFilter === flt
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700/80'
                }`}
              >
                {flt}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Section 2: Resuscitation & Trauma Bays Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {filteredBays.map((bay) => {
          const isOccupied = bay.status === 'Occupied';

          return (
            <Card
              key={bay.code}
              className={`p-3.5 sm:p-4 flex flex-col justify-between space-y-3 sm:space-y-4 ${
                isOccupied
                  ? 'border-rose-500/20 dark:border-rose-500/20'
                  : 'border-emerald-500/20 dark:border-emerald-500/20'
              }`}
            >
              <div className="space-y-2.5 sm:space-y-3">
                {/* Bay Header */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-gray-900 dark:text-white">
                      {bay.code}
                    </span>
                    <Badges color={bay.acuityColor} variant="soft" size="sm" rounded="pill" className="shrink-0">
                      {bay.acuity}
                    </Badges>
                  </div>
                  {isOccupied && (
                    <span className="text-xs text-gray-400 shrink-0">{bay.admittedAt}</span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate" title={bay.name}>
                  {bay.name}
                </h3>

                {isOccupied ? (
                  <div className="space-y-2">
                    <div className="text-xs">
                      <span className="font-semibold text-gray-900 dark:text-white truncate">
                        {bay.patient}
                      </span>
                      <span className="text-gray-400 ml-1.5 font-mono">
                        {bay.id} · {bay.ageGender}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-rose-500 truncate" title={bay.complaint}>
                      {bay.complaint}
                    </p>

                    {/* Vitals Bar */}
                    {bay.vitals && (
                      <div className="grid grid-cols-4 gap-1 p-2 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 text-center text-xs">
                        <div className="min-w-0">
                          <span className="text-gray-400 block text-xs truncate">HR</span>
                          <span className="font-bold text-rose-500 block truncate">{bay.vitals.hr}</span>
                        </div>
                        <div className="min-w-0">
                          <span className="text-gray-400 block text-xs truncate">BP</span>
                          <span className="font-bold text-gray-900 dark:text-white block truncate">{bay.vitals.bp}</span>
                        </div>
                        <div className="min-w-0">
                          <span className="text-gray-400 block text-xs truncate">SpO2</span>
                          <span className="font-bold text-cyan-500 block truncate">{bay.vitals.spo2}</span>
                        </div>
                        <div className="min-w-0">
                          <span className="text-gray-400 block text-xs truncate">GCS</span>
                          <span className="font-bold text-gray-900 dark:text-white block truncate">{bay.vitals.gcs}</span>
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-gray-500 dark:text-gray-400 pt-0.5 truncate">
                      Lead: <span className="text-gray-700 dark:text-gray-300 font-medium">{bay.leadDoctor}</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 text-center space-y-1">
                    <div className="flex items-center justify-center gap-1.5 text-emerald-500 font-semibold text-xs">
                      <FiCheckCircle className="w-4 h-4" />
                      <span>Clean &amp; Ready</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {bay.complaint}
                    </p>
                  </div>
                )}
              </div>

              {/* Bay Card Footer */}
              <div className="pt-2.5 sm:pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs gap-2">
                <span className="text-gray-400 truncate max-w-44 sm:max-w-xs">{bay.team}</span>
                {isOccupied ? (
                  <button
                    type="button"
                    onClick={() => setSelectedChartBay(bay)}
                    className="font-semibold text-primary hover:underline cursor-pointer shrink-0"
                  >
                    Resus Chart
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIntakeData((prev) => ({ ...prev, bayCode: bay.code }));
                      setShowIntakeModal(true);
                    }}
                    className="font-semibold text-primary hover:underline cursor-pointer shrink-0"
                  >
                    Assign Inbound
                  </button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {filteredBays.length === 0 && (
        <Card className="p-12 text-center text-sm text-gray-500 dark:text-gray-400">
          No resuscitation or trauma bays match your search or filter selection.
        </Card>
      )}

      {/* Triage Intake Modal */}
      <Modal
        open={showIntakeModal}
        onClose={() => setShowIntakeModal(false)}
        title="Immediate Emergency Triage Intake"
        description="Register an emergent patient and assign to a critical resuscitation trauma bay."
        size="md"
        color="primary"
        primaryAction={{
          label: 'Confirm Intake',
          onClick: handleTriageSubmit,
        }}
        secondaryAction={{
          label: 'Cancel',
          onClick: () => setShowIntakeModal(false),
        }}
      >
        <form onSubmit={handleTriageSubmit} className="space-y-3 text-xs pt-1">
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Patient Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={intakeData.patient}
              onChange={(e) => setIntakeData((prev) => ({ ...prev, patient: e.target.value }))}
              placeholder="e.g. Robert Gallagher"
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Age / Gender
              </label>
              <input
                type="text"
                value={intakeData.ageGender}
                onChange={(e) => setIntakeData((prev) => ({ ...prev, ageGender: e.target.value }))}
                placeholder="e.g. 52y / Male"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Allocated Trauma Bay <span className="text-rose-500">*</span>
              </label>
              <select
                required
                value={intakeData.bayCode}
                onChange={(e) => setIntakeData((prev) => ({ ...prev, bayCode: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                {baysList.map((b) => (
                  <option key={b.code} value={b.code}>
                    {b.code} - {b.name} ({b.status})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Chief Clinical Complaint <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={intakeData.complaint}
              onChange={(e) => setIntakeData((prev) => ({ ...prev, complaint: e.target.value }))}
              placeholder="e.g. Blunt Chest Trauma w/ Paradoxical Breathing"
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Triage Acuity Priority
              </label>
              <select
                value={intakeData.acuity}
                onChange={(e) => setIntakeData((prev) => ({ ...prev, acuity: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                <option value="Level 1 · Resus">Level 1 · Resuscitation (Immediate STAT)</option>
                <option value="Level 2 · Emergent">Level 2 · Emergent (&lt; 15 mins)</option>
                <option value="Level 3 · Urgent">Level 3 · Urgent (&lt; 30 mins)</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Lead Attending Physician
              </label>
              <input
                type="text"
                value={intakeData.doctor}
                onChange={(e) => setIntakeData((prev) => ({ ...prev, doctor: e.target.value }))}
                placeholder="e.g. Dr. Arthur Pendelton"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div>
              <label className="block font-medium text-gray-500 mb-0.5">Heart Rate</label>
              <input
                type="number"
                value={intakeData.hr}
                onChange={(e) => setIntakeData((prev) => ({ ...prev, hr: e.target.value }))}
                className="w-full px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center font-mono font-bold"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-500 mb-0.5">Blood Pressure</label>
              <input
                type="text"
                value={intakeData.bp}
                onChange={(e) => setIntakeData((prev) => ({ ...prev, bp: e.target.value }))}
                className="w-full px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center font-mono font-bold"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-500 mb-0.5">SpO2</label>
              <input
                type="text"
                value={intakeData.spo2}
                onChange={(e) => setIntakeData((prev) => ({ ...prev, spo2: e.target.value }))}
                className="w-full px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center font-mono font-bold"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-500 mb-0.5">GCS Score</label>
              <input
                type="text"
                value={intakeData.gcs}
                onChange={(e) => setIntakeData((prev) => ({ ...prev, gcs: e.target.value }))}
                className="w-full px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center font-mono font-bold"
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* Full Resus Chart Telemetry Modal */}
      {selectedChartBay && (
        <Modal
          open={!!selectedChartBay}
          onClose={() => setSelectedChartBay(null)}
          title={`Trauma Resuscitation Chart · ${selectedChartBay.code}`}
          description={`Patient: ${selectedChartBay.patient} (${selectedChartBay.id}) · ${selectedChartBay.ageGender}`}
          size="lg"
          color="danger"
          primaryAction={{
            label: 'Close Chart',
            onClick: () => setSelectedChartBay(null),
          }}
          secondaryAction={{
            label: 'Transfer to OR Suite',
            onClick: () => handleTransferToOr(selectedChartBay),
          }}
        >
          <div className="space-y-4 text-xs pt-1">
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-rose-500 font-bold block text-sm">{selectedChartBay.complaint}</span>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  Attending: <strong>{selectedChartBay.leadDoctor}</strong> · Team: {selectedChartBay.team}
                </p>
              </div>
              <Badges color={selectedChartBay.acuityColor} variant="solid" size="md" rounded="pill" className="w-fit shrink-0">
                {selectedChartBay.acuity}
              </Badges>
            </div>

            {selectedChartBay.vitals && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="flex items-center gap-1.5 text-rose-500 font-semibold mb-1">
                    <FiHeart className="w-3.5 h-3.5" />
                    <span>Heart Rate</span>
                  </div>
                  <div className="text-xl font-bold text-rose-500 font-mono">{selectedChartBay.vitals.hr} bpm</div>
                  <span className="text-gray-400 text-xs">Continuous ECG</span>
                </div>

                <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="flex items-center gap-1.5 text-purple-500 font-semibold mb-1">
                    <FiActivity className="w-3.5 h-3.5" />
                    <span>Blood Pressure</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white font-mono">{selectedChartBay.vitals.bp}</div>
                  <span className="text-gray-400 text-xs">Arterial Line</span>
                </div>

                <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="flex items-center gap-1.5 text-cyan-500 font-semibold mb-1">
                    <FiTrendingUp className="w-3.5 h-3.5" />
                    <span>Pulse SpO2</span>
                  </div>
                  <div className="text-xl font-bold text-cyan-500 font-mono">{selectedChartBay.vitals.spo2}</div>
                  <span className="text-gray-400 text-xs">High-Flow O2</span>
                </div>

                <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="flex items-center gap-1.5 text-amber-500 font-semibold mb-1">
                    <FiShield className="w-3.5 h-3.5" />
                    <span>GCS Score</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white font-mono">{selectedChartBay.vitals.gcs}</div>
                  <span className="text-gray-400 text-xs">Neurological Eye/Verbal/Motor</span>
                </div>
              </div>
            )}

            <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 text-xs space-y-1.5">
              <span className="font-bold text-gray-900 dark:text-white block">Immediate Resuscitation Protocol Active</span>
              <ul className="list-disc list-inside text-gray-500 dark:text-gray-400 space-y-0.5">
                <li>Two 16-gauge peripheral IV lines established; Rapid crystalloid infusion initiated.</li>
                <li>Stat Trauma Panel &amp; Type/Screen dispatched to blood bank for 2 units packed RBCs.</li>
                <li>Emergency surgical team on standby in Operating Suite 01.</li>
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EmergencyPage;
