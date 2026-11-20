import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import Breadcrumb from '../components/ui/breadcrumbs';
import Modal from '../components/ui/modals';
import { toast } from '../context/toast-context';
import patientsData from '../mokdata/patients.json';
import { FiHome, FiSearch, FiPlus, FiActivity, FiClock, FiHeart, FiAlertTriangle, FiCheckCircle, FiDownload, FiUser, } from 'react-icons/fi';

const { patients: initialPatients, wards } = patientsData;

export const Patients = () => {
  const [patientsList, setPatientsList] = useState(initialPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWard, setSelectedWard] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedChartPatient, setSelectedChartPatient] = useState(null);

  // Form State for Adding Patient
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: 45,
    gender: 'Male',
    blood: 'O+',
    ward: 'Cardiology',
    bed: 'CCU-Bed 05',
    doctor: 'Dr. Sarah Mitchell',
    diagnosis: '',
    status: 'Stable',
  });

  const handleExportRegistry = () => {
    toast.success('Patient registry electronic records exported to HL7 / CSV format.', {
      title: 'Registry Exported',
    });
  };

  const handleAddPatientSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newPatient.name.trim() || !newPatient.diagnosis.trim()) {
      toast.error('Please specify patient name and primary admission diagnosis.');
      return;
    }

    const newId = `P-${Math.floor(10750 + Math.random() * 400)}`;
    const statusColorMap = {
      Critical: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30',
      Urgent: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
      Observation: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      Stable: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    };

    const created = {
      id: newId,
      name: newPatient.name.trim(),
      age: Number(newPatient.age) || 45,
      gender: newPatient.gender,
      blood: newPatient.blood,
      ward: newPatient.ward,
      bed: newPatient.bed || 'Ward-302B',
      doctor: newPatient.doctor || 'Dr. Sarah Mitchell',
      admitted: '2026-03-22',
      stay: '1 day',
      diagnosis: newPatient.diagnosis.trim(),
      vitals: { hr: 76, bp: '120/78', spo2: '98%', temp: '98.6°F' },
      status: newPatient.status,
      statusColor: statusColorMap[newPatient.status] || statusColorMap.Stable,
    };

    setPatientsList((prev) => [created, ...prev]);
    setShowAddModal(false);
    setNewPatient({
      name: '',
      age: 45,
      gender: 'Male',
      blood: 'O+',
      ward: 'Cardiology',
      bed: 'CCU-Bed 05',
      doctor: 'Dr. Sarah Mitchell',
      diagnosis: '',
      status: 'Stable',
    });
    toast.success(
      `Patient ${created.name} (${newId}) admitted to ${created.ward} under ${created.doctor}.`,
      { title: 'Inpatient Admitted to Registry' }
    );
  };

  const filteredPatients = useMemo(() => {
    return patientsList.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.doctor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesWard = selectedWard === 'All' || p.ward === selectedWard;
      const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
      return matchesSearch && matchesWard && matchesStatus;
    });
  }, [patientsList, searchTerm, selectedWard, selectedStatus]);

  const kpiData = useMemo(() => {
    const total = patientsList.length;
    const critical = patientsList.filter((p) => p.status === 'Critical').length;
    const observation = patientsList.filter((p) => p.status === 'Observation').length;
    const stable = patientsList.filter((p) => p.status === 'Stable').length;
    return { total, critical, observation, stable };
  }, [patientsList]);

  return (
    <div className="p-3.5 sm:p-5 lg:p-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white truncate">
              Patient Directory &amp; Registry
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30 shrink-0">
              {filteredPatients.length} Active Records
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Manage electronic health records, active admissions, vital parameters, and attending physician assignments
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={handleExportRegistry}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold transition-all shadow-xs cursor-pointer whitespace-nowrap"
          >
            <FiDownload className="w-3.5 h-3.5 shrink-0" />
            <span>Export Registry</span>
          </button>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/25 cursor-pointer whitespace-nowrap"
          >
            <FiPlus className="w-3.5 h-3.5 shrink-0" />
            <span>Add Patient</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto pb-1 scrollbar-none">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Hospital Operations' },
            { label: 'Patient Registry' },
          ]}
        />
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Total Inpatients</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{kpiData.total} Admitted</div>
            <span className="text-xs text-primary font-semibold truncate block">Across 6 hospital wards</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
            <FiUser className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Critical &amp; ICU</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{kpiData.critical} Patients</div>
            <span className="text-xs text-rose-500 font-semibold truncate block">Continuous telemetry monitoring</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 border border-rose-500/20">
            <FiAlertTriangle className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Observation Status</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{kpiData.observation} Patients</div>
            <span className="text-xs text-amber-500 font-semibold truncate block">Telemetry surveillance</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20">
            <FiClock className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Stable Recovery</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{kpiData.stable} Inpatients</div>
            <span className="text-xs text-emerald-500 font-semibold truncate block">Stepdown &amp; discharge pending</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <FiCheckCircle className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-3.5 sm:p-4 space-y-3 sm:space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
          <div className="relative w-full lg:w-80 shrink-0">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name, record ID, diagnosis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
            {wards.map((ward) => (
              <button
                key={ward}
                type="button"
                onClick={() => setSelectedWard(ward)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${selectedWard === ward
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700/80'
                  }`}
              >
                {ward}
              </button>
            ))}
          </div>
        </div>

        {/* Acuity Status Filters */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-gray-100 dark:border-gray-800 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
          <span className="text-xs text-gray-400 font-semibold mr-1 shrink-0">Acuity:</span>
          {['All', 'Critical', 'Urgent', 'Observation', 'Stable'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setSelectedStatus(status)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${selectedStatus === status
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-xs'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60'
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </Card>

      {/* Mobile Card List View (Phones & Tablets < 1024px) */}
      <div className="block lg:hidden space-y-3">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="p-3.5 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-xs">
                  {patient.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-sm text-slate-900 dark:text-white block truncate" title={patient.name}>
                    {patient.name}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 font-mono text-xs">
                    <span>{patient.id}</span>
                    <span>·</span>
                    <span>{patient.age}y/{patient.gender}</span>
                    <span>·</span>
                    <span className="text-emerald-500 font-semibold">{patient.blood}</span>
                  </div>
                </div>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full font-semibold border text-xs shrink-0 ${patient.statusColor}`}>
                {patient.status}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="font-semibold">{patient.ward}</span>
                <span className="font-mono text-slate-400">{patient.bed}</span>
              </div>
              <p className="text-slate-500 dark:text-gray-400 truncate">
                Diagnosis: <strong className="text-slate-700 dark:text-white">{patient.diagnosis}</strong>
              </p>
            </div>

            {/* Vitals Summary Strip */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-xs font-mono">
              <span className="text-rose-500 font-bold">{patient.vitals.hr} bpm</span>
              <span className="text-slate-300 dark:text-white/20">|</span>
              <span className="text-teal-600 dark:text-teal-400 font-bold">{patient.vitals.bp}</span>
              <span className="text-slate-300 dark:text-white/20">|</span>
              <span className="text-cyan-500 font-bold">{patient.vitals.spo2}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800 text-xs">
              <span className="text-slate-500 dark:text-gray-400 truncate max-w-44">
                Dr: {patient.doctor}
              </span>
              <button
                type="button"
                onClick={() => setSelectedChartPatient(patient)}
                className="px-3.5 py-1.5 rounded-lg bg-primary text-white font-semibold text-xs transition-all cursor-pointer hover:bg-primary/90 shrink-0"
              >
                Chart
              </button>
            </div>
          </Card>
        ))}

        {filteredPatients.length === 0 && (
          <Card className="p-12 text-center text-sm text-gray-500 dark:text-gray-400">
            No patient records match your selected filter or search criteria.
          </Card>
        )}
      </div>

      {/* Desktop Comprehensive Table (Desktops & Laptops >= 1024px) */}
      <Card className="hidden lg:block p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-white/5 border-b border-black/5 dark:border-white/10 text-slate-500 dark:text-white/50 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Patient Name &amp; ID</th>
                <th className="py-3.5 px-4">Ward &amp; Bed</th>
                <th className="py-3.5 px-4">Diagnosis &amp; Condition</th>
                <th className="py-3.5 px-4">Vitals Summary</th>
                <th className="py-3.5 px-4">Attending Physician</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-white/5 transition-colors"
                >
                  {/* Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                        {patient.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900 dark:text-white block truncate">
                          {patient.name}
                        </span>
                        <div className="flex items-center gap-1.5 text-slate-400 font-mono text-xs">
                          <span>{patient.id}</span>
                          <span>·</span>
                          <span>{patient.age}y / {patient.gender}</span>
                          <span>·</span>
                          <span className="text-emerald-500 font-semibold">{patient.blood}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Ward & Bed */}
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 dark:text-white block">
                      {patient.ward}
                    </span>
                    <span className="text-slate-400 text-xs font-mono">
                      {patient.bed} · {patient.stay}
                    </span>
                  </td>

                  {/* Diagnosis */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <span className="font-medium text-slate-800 dark:text-white block truncate" title={patient.diagnosis}>
                      {patient.diagnosis}
                    </span>
                    <span className="text-slate-400 text-xs">
                      Admitted: {patient.admitted}
                    </span>
                  </td>

                  {/* Vitals */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-rose-500 font-bold">{patient.vitals.hr} bpm</span>
                      <span className="text-slate-300 dark:text-white/20">|</span>
                      <span className="text-teal-600 dark:text-teal-400">{patient.vitals.bp}</span>
                      <span className="text-slate-300 dark:text-white/20">|</span>
                      <span className="text-cyan-500">{patient.vitals.spo2}</span>
                    </div>
                  </td>

                  {/* Doctor */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="text-slate-700 dark:text-white/80 font-medium">
                      {patient.doctor}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-semibold border text-xs ${patient.statusColor}`}
                    >
                      {patient.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedChartPatient(patient)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white hover:bg-primary hover:text-white transition-all text-xs font-medium cursor-pointer"
                    >
                      Chart
                    </button>
                  </td>
                </tr>
              ))}

              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    No patient records match your selected filter or search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Inpatient Admission Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Admit Inpatient to Registry"
        description="Register a new patient encounter, assign bed allocation, and record initial diagnosis."
        size="md"
        color="primary"
        primaryAction={{
          label: 'Admit Patient',
          onClick: handleAddPatientSubmit,
        }}
        secondaryAction={{
          label: 'Cancel',
          onClick: () => setShowAddModal(false),
        }}
      >
        <form onSubmit={handleAddPatientSubmit} className="space-y-3 text-xs pt-1">
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Patient Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={newPatient.name}
              onChange={(e) => setNewPatient((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. Thomas Wayne"
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Age
              </label>
              <input
                type="number"
                value={newPatient.age}
                onChange={(e) => setNewPatient((prev) => ({ ...prev, age: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Gender
              </label>
              <select
                value={newPatient.gender}
                onChange={(e) => setNewPatient((prev) => ({ ...prev, gender: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Blood Group
              </label>
              <select
                value={newPatient.blood}
                onChange={(e) => setNewPatient((prev) => ({ ...prev, blood: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
              >
                {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Assigned Clinical Ward
              </label>
              <select
                value={newPatient.ward}
                onChange={(e) => setNewPatient((prev) => ({ ...prev, ward: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                {wards.filter((w) => w !== 'All').map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Attending Physician
              </label>
              <input
                type="text"
                value={newPatient.doctor}
                onChange={(e) => setNewPatient((prev) => ({ ...prev, doctor: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Admission Diagnosis <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={newPatient.diagnosis}
              onChange={(e) => setNewPatient((prev) => ({ ...prev, diagnosis: e.target.value }))}
              placeholder="e.g. Acute Coronary Syndrome"
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Clinical Acuity Status
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Critical', 'Urgent', 'Observation', 'Stable'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setNewPatient((prev) => ({ ...prev, status: st }))}
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer text-center transition-all ${newPatient.status === st
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </form>
      </Modal>

      {/* Patient Electronic Health Record (EHR) Chart Modal */}
      {selectedChartPatient && (
        <Modal
          open={!!selectedChartPatient}
          onClose={() => setSelectedChartPatient(null)}
          title={`Electronic Health Record · ${selectedChartPatient.name}`}
          description={`Record ID: ${selectedChartPatient.id} · ${selectedChartPatient.age}y / ${selectedChartPatient.gender} · Blood: ${selectedChartPatient.blood}`}
          size="lg"
          color="primary"
          primaryAction={{
            label: 'Close Chart',
            onClick: () => setSelectedChartPatient(null),
          }}
        >
          <div className="space-y-4 text-xs pt-1">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-gray-400 block">Primary Diagnosis</span>
                <span className="font-bold text-gray-900 dark:text-white text-sm">{selectedChartPatient.diagnosis}</span>
                <p className="text-gray-500 dark:text-gray-400 mt-0.5">
                  Admitted: {selectedChartPatient.admitted} · Length of Stay: {selectedChartPatient.stay}
                </p>
              </div>
              <span className={`px-2.5 py-1 rounded-full font-semibold border text-xs w-fit shrink-0 ${selectedChartPatient.statusColor}`}>
                {selectedChartPatient.status} Acuity
              </span>
            </div>

            {/* Vitals Telemetry Box */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-1.5 text-rose-500 font-semibold mb-1">
                  <FiHeart className="w-3.5 h-3.5" />
                  <span>Heart Rate</span>
                </div>
                <div className="text-xl font-bold text-rose-500 font-mono">{selectedChartPatient.vitals.hr} bpm</div>
                <span className="text-gray-400 text-xs">Sinus Rhythm</span>
              </div>

              <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-semibold mb-1">
                  <FiActivity className="w-3.5 h-3.5" />
                  <span>Blood Pressure</span>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white font-mono">{selectedChartPatient.vitals.bp}</div>
                <span className="text-gray-400 text-xs">Non-Invasive NIBP</span>
              </div>

              <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-1.5 text-cyan-500 font-semibold mb-1">
                  <FiActivity className="w-3.5 h-3.5" />
                  <span>Pulse SpO2</span>
                </div>
                <div className="text-xl font-bold text-cyan-500 font-mono">{selectedChartPatient.vitals.spo2}</div>
                <span className="text-gray-400 text-xs">Room Air</span>
              </div>

              <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-1.5 text-amber-500 font-semibold mb-1">
                  <FiClock className="w-3.5 h-3.5" />
                  <span>Temperature</span>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white font-mono">{selectedChartPatient.vitals.temp}</div>
                <span className="text-gray-400 text-xs">Afebrile</span>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-1">
              <span className="font-bold text-gray-900 dark:text-white block">Clinical Location &amp; Supervision</span>
              <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 pt-0.5">
                <span>Ward &amp; Bed: <strong>{selectedChartPatient.ward} ({selectedChartPatient.bed})</strong></span>
                <span>Attending: <strong>{selectedChartPatient.doctor}</strong></span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Patients;
