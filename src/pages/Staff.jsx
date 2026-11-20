import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import Badges from '../components/ui/badges';
import Breadcrumb from '../components/ui/breadcrumbs';
import Avatar from '../components/ui/avatars';
import Modal from '../components/ui/modals';
import { toast } from '../context/toast-context';
import { FiHome, FiSearch, FiPlus, FiPhone, FiMail, FiCalendar, FiUsers, FiActivity, FiClock, FiCheckCircle, FiShield, } from 'react-icons/fi';
import avatar1 from '../assets/user/1.png';
import avatar2 from '../assets/user/2.png';
import avatar3 from '../assets/user/3.png';
import avatar4 from '../assets/user/4.png';
import avatar5 from '../assets/user/5.png';
import avatar6 from '../assets/user/6.png';
const avatar7 = avatar1;
const avatar8 = avatar2;
import staffData from '../mokdata/staff.json';

const avatarMap = {
  'avatar-1': avatar1,
  'avatar-2': avatar2,
  'avatar-3': avatar3,
  'avatar-4': avatar4,
  'avatar-5': avatar5,
  'avatar-6': avatar6,
  'avatar-7': avatar7,
  'avatar-8': avatar8,
};

const initialStaffMembers = staffData.staffMembers.map((doc) => ({
  ...doc,
  avatar: avatarMap[doc.avatarId] || avatar1,
}));

const { departments } = staffData;

const StaffPage = () => {
  const [staffList, setStaffList] = useState(initialStaffMembers);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [pagedDoctors, setPagedDoctors] = useState({});
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Staff Registration form state
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: '',
    department: 'Cardiology',
    room: '',
    phone: '',
    specialties: '',
  });

  const handlePageDoctor = (doc) => {
    setPagedDoctors((prev) => ({ ...prev, [doc.id]: true }));
    toast.info(`Radio pager alert broadcasted to ${doc.name} at ${doc.room}.`, {
      title: 'Physician Radio Paged',
    });
    setTimeout(() => {
      setPagedDoctors((prev) => ({ ...prev, [doc.id]: false }));
    }, 3000);
  };

  const handleAddStaffSubmit = (e) => {
    e.preventDefault();
    if (!newStaff.name.trim() || !newStaff.role.trim()) {
      toast.error('Please specify both the doctor name and clinical role.');
      return;
    }

    const created = {
      id: `DOC-${Math.floor(2050 + Math.random() * 900)}`,
      name: newStaff.name.trim(),
      role: newStaff.role.trim(),
      department: newStaff.department,
      avatarId: 'avatar-4',
      avatar: avatar4,
      status: 'On Duty',
      statusColor: 'success',
      experience: '5 yrs exp',
      patientsCount: Math.floor(Math.random() * 12) + 2,
      shift: '07:00 - 19:00',
      room: newStaff.room.trim() || 'General Care Ward',
      email: `${newStaff.name.toLowerCase().replace(/[^a-z]/g, '')}@carepulse.health`,
      phone: newStaff.phone.trim() || '+1 (555) 234-9988',
      specialties: newStaff.specialties
        ? newStaff.specialties.split(',').map((s) => s.trim()).filter(Boolean)
        : ['General Clinical'],
    };

    setStaffList((prev) => [created, ...prev]);
    setShowAddModal(false);
    setNewStaff({
      name: '',
      role: '',
      department: 'Cardiology',
      room: '',
      phone: '',
      specialties: '',
    });
    toast.success(`${created.name} registered to ${created.department} department roster!`, {
      title: 'Staff Member Enrolled',
    });
  };

  const filteredStaff = useMemo(() => {
    return staffList.filter((doc) => {
      const matchSearch =
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.role.toLowerCase().includes(search.toLowerCase()) ||
        doc.department.toLowerCase().includes(search.toLowerCase()) ||
        doc.id.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchDept = selectedDept === 'All' || doc.department === selectedDept;
      const matchStatus = selectedStatus === 'All' || doc.status === selectedStatus;

      return matchSearch && matchDept && matchStatus;
    });
  }, [staffList, search, selectedDept, selectedStatus]);

  const kpiData = useMemo(() => {
    const total = staffList.length;
    const onDuty = staffList.filter((s) => s.status === 'On Duty').length;
    const inSurgery = staffList.filter((s) => s.status === 'In Surgery').length;
    const onCall = staffList.filter((s) => s.status === 'On Call').length;
    return { total, onDuty, inSurgery, onCall };
  }, [staffList]);

  return (
    <div className="p-3.5 sm:p-5 lg:p-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
            Physicians & Medical Staff Directory
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Roster of on-duty surgeons, resident doctors, attending physicians, and specialized clinical staff
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={() => setShowScheduleModal(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold transition-all shadow-xs cursor-pointer whitespace-nowrap"
          >
            <FiCalendar className="w-3.5 h-3.5 shrink-0" />
            <span>Shift Schedule</span>
          </button>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/25 cursor-pointer whitespace-nowrap"
          >
            <FiPlus className="w-3.5 h-3.5 shrink-0" />
            <span>Add Staff Member</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto pb-1 scrollbar-none">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Hospital Operations' },
            { label: 'Physicians & Staff' },
          ]}
        />
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Total Staff Roster</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{kpiData.total} Active</div>
            <span className="text-xs text-emerald-500 font-semibold truncate block">+4 onboarding</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
            <FiUsers className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">On Shift Now</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{kpiData.onDuty} Staff</div>
            <span className="text-xs text-cyan-500 font-semibold truncate block">100% floor coverage</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0 border border-cyan-500/20">
            <FiCheckCircle className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">In Surgery / ICU</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{kpiData.inSurgery} Specialists</div>
            <span className="text-xs text-rose-500 font-semibold truncate block">6 OR suites engaged</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 border border-rose-500/20">
            <FiActivity className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">On Call Standby</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">{kpiData.onCall} Physicians</div>
            <span className="text-xs text-amber-500 font-semibold truncate block">Response under 15m</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20">
            <FiClock className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Directory Filter Bar */}
      <Card className="p-3.5 sm:p-4 space-y-3 sm:space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="relative w-full lg:w-80 shrink-0">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by physician, specialty, ID..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium shrink-0 mr-1">Status:</span>
            {['All', 'On Duty', 'In Surgery', 'On Call', 'Off Duty'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${selectedStatus === st
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-xs'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60'
                  }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Department Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${selectedDept === dept
                ? 'bg-primary text-white shadow-xs'
                : 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700/80'
                }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </Card>

      {/* Staff Profile Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4">
        {filteredStaff.map((doc) => (
          <Card key={doc.id} className="flex flex-col justify-between p-3.5 sm:p-4 relative overflow-hidden">
            <div className="space-y-3">
              {/* Top row: Status Badge & ID */}
              <div className="flex items-center justify-between gap-2">
                <Badges
                  color={doc.statusColor}
                  variant="soft"
                  size="sm"
                  rounded="pill"
                >
                  <span className="flex items-center gap-1">
                    {doc.status === 'On Duty' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                    {doc.status}
                  </span>
                </Badges>
                <span className="text-xs text-gray-400 font-mono shrink-0">{doc.id}</span>
              </div>

              {/* Profile Bio */}
              <div className="flex items-start gap-3 pt-1">
                <Avatar
                  src={doc.avatar}
                  name={doc.name}
                  size="lg"
                  rounded="full"
                  className="shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate" title={doc.name}>
                    {doc.name}
                  </h3>
                  <p className="text-xs text-primary font-medium truncate mt-0.5">
                    {doc.role}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                    {doc.department} · {doc.experience}
                  </p>
                </div>
              </div>

              {/* Clinical Details */}
              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800/80 text-xs">
                <div className="min-w-0">
                  <span className="text-gray-400 block text-xs truncate">Patients</span>
                  <span className="font-bold text-gray-900 dark:text-white mt-0.5 block truncate">
                    {doc.patientsCount} Assigned
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="text-gray-400 block text-xs truncate">Station</span>
                  <span className="font-semibold text-gray-900 dark:text-white mt-0.5 block truncate" title={doc.room}>
                    {doc.room}
                  </span>
                </div>
              </div>

              {/* Specialties Pills */}
              <div className="flex flex-wrap gap-1 max-h-16 overflow-hidden">
                {doc.specialties.map((spec, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs truncate max-w-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Contact & Action Buttons */}
            <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-gray-400 shrink-0">
                <a
                  href={`mailto:${doc.email}`}
                  title={doc.email}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-colors"
                >
                  <FiMail className="w-4 h-4" />
                </a>
                <a
                  href={`tel:${doc.phone}`}
                  title={doc.phone}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-colors"
                >
                  <FiPhone className="w-4 h-4" />
                </a>
              </div>

              <button
                type="button"
                onClick={() => handlePageDoctor(doc)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 ${pagedDoctors[doc.id]
                  ? 'bg-emerald-500/20 text-emerald-500 font-bold'
                  : 'bg-primary/10 hover:bg-primary/20 text-primary'
                  }`}
              >
                {pagedDoctors[doc.id] ? 'Paged' : 'Page Doctor'}
              </button>
            </div>
          </Card>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <Card className="p-12 text-center text-sm text-gray-500 dark:text-gray-400">
          No medical staff members match your selected search or filter criteria.
        </Card>
      )}

      {/* Shift Schedule Modal */}
      <Modal
        open={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        title="Clinical Shift & Rotation Schedule"
        description="Daily operational duty rota across surgical suites, emergency bays, and inpatient wards."
        size="lg"
        color="primary"
        primaryAction={{
          label: 'Close Rota',
          onClick: () => setShowScheduleModal(false),
        }}
      >
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40">
              <span className="font-semibold text-emerald-500 block">Day Shift (07:00 - 15:00)</span>
              <p className="text-gray-900 dark:text-white font-bold text-sm mt-1">32 Physicians Active</p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Chief surgical rotations, outpatient consultations, and morning ICU rounds.</p>
            </div>
            <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40">
              <span className="font-semibold text-cyan-500 block">Evening Shift (15:00 - 23:00)</span>
              <p className="text-gray-900 dark:text-white font-bold text-sm mt-1">28 Staff Members</p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Trauma admissions, urgent bedside procedures, and attending changeover.</p>
            </div>
            <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40">
              <span className="font-semibold text-purple-500 block">Night Watch (23:00 - 07:00)</span>
              <p className="text-gray-900 dark:text-white font-bold text-sm mt-1">14 Emergency Staff</p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Telemetry oversight, critical response, code-blue response teams.</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-slate-800 dark:text-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FiShield className="w-4 h-4 text-primary shrink-0" />
              <span>Trauma On-Call Backstop: <strong>Dr. Arthur Pendelton</strong> &amp; <strong>Dr. Elena Rostova</strong></span>
            </div>
            <span className="text-primary font-bold shrink-0">Priority Pager Active</span>
          </div>
        </div>
      </Modal>

      {/* Add Staff Member Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Enroll New Medical Staff Member"
        description="Register a doctor or clinical specialist to the active electronic hospital roster."
        size="md"
        color="primary"
        primaryAction={{
          label: 'Register Staff',
          onClick: handleAddStaffSubmit,
        }}
        secondaryAction={{
          label: 'Cancel',
          onClick: () => setShowAddModal(false),
        }}
      >
        <form onSubmit={handleAddStaffSubmit} className="space-y-3 text-xs pt-1">
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Physician Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={newStaff.name}
              onChange={(e) => setNewStaff((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. Dr. Jonathan Vance, MD"
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Clinical Role <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newStaff.role}
                onChange={(e) => setNewStaff((prev) => ({ ...prev, role: e.target.value }))}
                placeholder="e.g. Attending Cardiologist"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Department
              </label>
              <select
                value={newStaff.department}
                onChange={(e) => setNewStaff((prev) => ({ ...prev, department: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                {departments.filter((d) => d !== 'All').map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Assigned Station / Room
              </label>
              <input
                type="text"
                value={newStaff.room}
                onChange={(e) => setNewStaff((prev) => ({ ...prev, room: e.target.value }))}
                placeholder="e.g. Wing B, Suite 402"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Direct Contact Phone
              </label>
              <input
                type="text"
                value={newStaff.phone}
                onChange={(e) => setNewStaff((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="e.g. +1 (555) 345-6789"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Clinical Specialties (comma-separated)
            </label>
            <input
              type="text"
              value={newStaff.specialties}
              onChange={(e) => setNewStaff((prev) => ({ ...prev, specialties: e.target.value }))}
              placeholder="e.g. Echocardiography, Valvular Disease"
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StaffPage;
