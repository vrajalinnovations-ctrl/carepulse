import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import Badges from '../components/ui/badges';
import Breadcrumb from '../components/ui/breadcrumbs';
import Modal from '../components/ui/modals';
import { toast } from '../context/toast-context';
import appointmentsData from '../mokdata/appointments.json';
import {
  FiHome,
  FiClock,
  FiPlus,
  FiSearch,
  FiVideo,
  FiMapPin,
  FiCalendar,
  FiCheckCircle,
  FiUser,
  FiSliders,
  FiDownload,
} from 'react-icons/fi';

const { appointments: initialAppointments } = appointmentsData;

export const Appointments = () => {
  const [appointmentsList, setAppointmentsList] = useState(initialAppointments);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedManageApt, setSelectedManageApt] = useState(null);

  // Form State for Booking
  const [bookData, setBookData] = useState({
    patient: '',
    doctor: 'Dr. Sarah Mitchell',
    department: 'Cardiology',
    time: '10:00 AM',
    type: 'Consultation & Review',
    mode: 'In-Person',
    room: 'Consult Suite 2A',
  });

  const handleExportSchedule = () => {
    toast.success('Clinical appointments schedule exported to PDF / iCal calendar archive.', {
      title: 'Schedule Exported',
    });
  };

  const handleBookSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!bookData.patient.trim()) {
      toast.error('Please specify patient name for the consultation.');
      return;
    }

    const newId = `APT-${Math.floor(810 + Math.random() * 80)}`;
    const newPatientId = `P-${Math.floor(1180 + Math.random() * 80)}`;
    const createdApt = {
      id: newId,
      time: bookData.time,
      patient: bookData.patient.trim(),
      patientId: newPatientId,
      doctor: bookData.doctor,
      department: bookData.department,
      type: bookData.type,
      mode: bookData.mode,
      room: bookData.mode === 'Telehealth' ? 'Virtual Clinic Room 2' : bookData.room,
      status: 'Confirmed',
      statusColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
    };

    setAppointmentsList((prev) => [createdApt, ...prev]);
    setShowBookModal(false);
    setBookData({
      patient: '',
      doctor: 'Dr. Sarah Mitchell',
      department: 'Cardiology',
      time: '10:00 AM',
      type: 'Consultation & Review',
      mode: 'In-Person',
      room: 'Consult Suite 2A',
    });
    toast.success(
      `Appointment ${newId} booked for ${createdApt.patient} with ${createdApt.doctor}.`,
      { title: 'Consultation Scheduled' }
    );
  };

  const handleUpdateStatus = (aptId, newStatus, newColor) => {
    setAppointmentsList((prev) =>
      prev.map((apt) =>
        apt.id === aptId
          ? { ...apt, status: newStatus, statusColor: newColor }
          : apt
      )
    );
    setSelectedManageApt(null);
    toast.success(`Appointment ${aptId} status updated to: ${newStatus}.`, {
      title: 'Status Updated',
    });
  };

  const filteredAppointments = useMemo(() => {
    return appointmentsList.filter((apt) => {
      const matchesFilter =
        selectedFilter === 'All' ||
        (selectedFilter === 'Today' && true) ||
        (selectedFilter === 'Telehealth' && apt.mode === 'Telehealth') ||
        (selectedFilter === 'Cardiology' && apt.department === 'Cardiology') ||
        (selectedFilter === 'Neurology' && apt.department === 'Neurology');

      const matchesSearch =
        apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.id.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [appointmentsList, selectedFilter, searchQuery]);

  const stats = useMemo(() => {
    const total = appointmentsList.length;
    const completed = appointmentsList.filter((a) => a.status === 'Completed').length;
    const inProgress = appointmentsList.filter(
      (a) => a.status === 'In Consultation' || a.status === 'Checked In'
    ).length;
    const telehealth = appointmentsList.filter((a) => a.mode === 'Telehealth').length;
    return { total, completed, inProgress, telehealth };
  }, [appointmentsList]);

  return (
    <div className="p-3.5 sm:p-5 lg:p-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white truncate">
              Clinical Appointments &amp; Consultations
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30 shrink-0">
              Today: March 22, 2026
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Manage outpatient clinic appointments, telehealth consults, and specialty physician calendars
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={handleExportSchedule}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold transition-all shadow-xs cursor-pointer whitespace-nowrap"
          >
            <FiDownload className="w-3.5 h-3.5 shrink-0" />
            <span>Export Agenda</span>
          </button>
          <button
            type="button"
            onClick={() => setShowBookModal(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/25 cursor-pointer whitespace-nowrap"
          >
            <FiPlus className="w-3.5 h-3.5 shrink-0" />
            <span>Book Consultation</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto pb-1 scrollbar-none">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Hospital Operations' },
            { label: 'Appointments' },
          ]}
        />
      </div>

      {/* Appointment Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-3.5 sm:p-4 flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Total Scheduled</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{stats.total} Patients</div>
            <span className="text-xs text-emerald-500 font-semibold truncate block">Across 6 Specialties</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
            <FiCalendar className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Completed</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{stats.completed} Consults</div>
            <span className="text-xs text-emerald-500 font-semibold truncate block">
              {Math.round((stats.completed / (stats.total || 1)) * 100)}% Completion Rate
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <FiCheckCircle className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">In Progress / Checked In</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{stats.inProgress} Active</div>
            <span className="text-xs text-teal-500 font-semibold truncate block">Currently In Clinics</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0 border border-teal-500/20">
            <FiClock className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Telehealth Sessions</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{stats.telehealth} Encounters</div>
            <span className="text-xs text-purple-400 font-semibold truncate block">Encrypted Video Rooms</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
            <FiVideo className="w-5 h-5" />
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by patient, physician, or appointment ID..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
            {['All', 'Today', 'Telehealth', 'Cardiology', 'Neurology'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  selectedFilter === tab
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700/80'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Appointments List */}
      <div className="space-y-3">
        {filteredAppointments.map((apt) => (
          <Card
            key={apt.id}
            hover
            className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
          >
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
              {/* Time Badge */}
              <div className="w-14 sm:w-16 p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center shrink-0">
                <FiClock className="mx-auto text-primary mb-0.5 sm:mb-1 w-3.5 h-3.5" />
                <span className="text-xs font-bold font-mono text-slate-800 dark:text-white block">
                  {apt.time.split(' ')[0]}
                </span>
                <span className="text-xs text-slate-400 uppercase block">
                  {apt.time.split(' ')[1]}
                </span>
              </div>

              {/* Patient and Encounter Details */}
              <div className="min-w-0 flex-1 space-y-0.5">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate" title={apt.patient}>
                    {apt.patient}
                  </h4>
                  <span className="text-xs font-mono text-slate-400 shrink-0">({apt.patientId})</span>
                  <span className="text-xs font-mono px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-slate-500 dark:text-white/60 shrink-0">
                    {apt.id}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-white/60 truncate">
                  <strong className="text-slate-700 dark:text-slate-300">{apt.type}</strong> with {apt.doctor} ({apt.department})
                </p>
                <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-400 pt-0.5 flex-wrap">
                  <span className="flex items-center gap-1 truncate">
                    {apt.mode === 'Telehealth' ? (
                      <FiVideo className="text-purple-400 w-3 h-3 shrink-0" />
                    ) : (
                      <FiMapPin className="text-slate-400 w-3 h-3 shrink-0" />
                    )}
                    <span className="truncate">{apt.room}</span>
                  </span>
                  <span>·</span>
                  <span className="text-primary font-medium shrink-0">{apt.mode}</span>
                </div>
              </div>
            </div>

            {/* Status and Action Buttons */}
            <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-black/5 dark:border-white/5 shrink-0">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border shrink-0 ${apt.statusColor}`}
              >
                {apt.status}
              </span>
              <button
                type="button"
                onClick={() => setSelectedManageApt(apt)}
                className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all cursor-pointer shrink-0"
              >
                Manage
              </button>
            </div>
          </Card>
        ))}

        {filteredAppointments.length === 0 && (
          <Card className="p-12 text-center text-sm text-gray-500 dark:text-gray-400">
            No clinical appointments match your selected filter or search criteria.
          </Card>
        )}
      </div>

      {/* Book Clinical Consultation Modal */}
      <Modal
        open={showBookModal}
        onClose={() => setShowBookModal(false)}
        title="Schedule Clinical Consultation"
        description="Book an outpatient appointment or encrypted telehealth encounter with a specialist."
        size="md"
        color="primary"
        primaryAction={{
          label: 'Book Consultation',
          onClick: handleBookSubmit,
        }}
        secondaryAction={{
          label: 'Cancel',
          onClick: () => setShowBookModal(false),
        }}
      >
        <form onSubmit={handleBookSubmit} className="space-y-3 text-xs pt-1">
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Patient Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={bookData.patient}
              onChange={(e) => setBookData((prev) => ({ ...prev, patient: e.target.value }))}
              placeholder="e.g. Liam Gallagher"
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Department
              </label>
              <select
                value={bookData.department}
                onChange={(e) => setBookData((prev) => ({ ...prev, department: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="General Surgery">General Surgery</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Attending Doctor
              </label>
              <select
                value={bookData.doctor}
                onChange={(e) => setBookData((prev) => ({ ...prev, doctor: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                <option value="Dr. Sarah Mitchell">Dr. Sarah Mitchell, MD</option>
                <option value="Dr. Julian Thorne">Dr. Julian Thorne, MD</option>
                <option value="Dr. Emily Watson">Dr. Emily Watson, MD</option>
                <option value="Dr. Arthur Pendelton">Dr. Arthur Pendelton, MD</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Appointment Slot Time
              </label>
              <input
                type="text"
                value={bookData.time}
                onChange={(e) => setBookData((prev) => ({ ...prev, time: e.target.value }))}
                placeholder="e.g. 10:30 AM"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Consultation Mode
              </label>
              <select
                value={bookData.mode}
                onChange={(e) => setBookData((prev) => ({ ...prev, mode: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                <option value="In-Person">In-Person Clinic Visit</option>
                <option value="Telehealth">Encrypted Telehealth Video Room</option>
                <option value="Diagnostic Lab">Diagnostic Clinical Procedure</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Encounter Type / Reason for Visit
            </label>
            <input
              type="text"
              required
              value={bookData.type}
              onChange={(e) => setBookData((prev) => ({ ...prev, type: e.target.value }))}
              placeholder="e.g. Post-Op Follow-up & Stent Assessment"
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </form>
      </Modal>

      {/* Manage Appointment Modal */}
      {selectedManageApt && (
        <Modal
          open={!!selectedManageApt}
          onClose={() => setSelectedManageApt(null)}
          title={`Manage Appointment · ${selectedManageApt.id}`}
          description={`Patient: ${selectedManageApt.patient} (${selectedManageApt.patientId})`}
          size="md"
          color="primary"
          primaryAction={{
            label: 'Close Record',
            onClick: () => setSelectedManageApt(null),
          }}
        >
          <div className="space-y-4 text-xs pt-1">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900 dark:text-white">{selectedManageApt.type}</span>
                <span className="font-mono text-primary font-bold">{selectedManageApt.time}</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Attending: <strong>{selectedManageApt.doctor}</strong> ({selectedManageApt.department})
              </p>
              <div className="flex items-center gap-2 text-slate-400 pt-1">
                <span>Location: {selectedManageApt.room}</span>
                <span>·</span>
                <span>Mode: {selectedManageApt.mode}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-gray-900 dark:text-white block">Update Appointment Status</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateStatus(
                      selectedManageApt.id,
                      'Checked In',
                      'bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30'
                    )
                  }
                  className="px-2.5 py-2 rounded-xl border border-teal-500/30 bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400 font-semibold cursor-pointer text-center"
                >
                  Check In
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleUpdateStatus(
                      selectedManageApt.id,
                      'In Consultation',
                      'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    )
                  }
                  className="px-2.5 py-2 rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-semibold cursor-pointer text-center"
                >
                  Start Consult
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleUpdateStatus(
                      selectedManageApt.id,
                      'Completed',
                      'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30'
                    )
                  }
                  className="px-2.5 py-2 rounded-xl border border-slate-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer text-center"
                >
                  Completed
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleUpdateStatus(
                      selectedManageApt.id,
                      'Rescheduled',
                      'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                    )
                  }
                  className="px-2.5 py-2 rounded-xl border border-amber-500/30 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 font-semibold cursor-pointer text-center"
                >
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Appointments;
