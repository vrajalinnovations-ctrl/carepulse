import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import Badges from '../components/ui/badges';
import Breadcrumb from '../components/ui/breadcrumbs';
import Progress from '../components/ui/progressbars';
import Modal from '../components/ui/modals';
import Input from '../components/ui/input';
import pharmacyConfig from '../mokdata/pharmacy.json';
import { toast } from '../context/toast-context';
import { FiHome, FiPlus, FiActivity, FiAlertTriangle, FiClock, FiPackage, FiShield, FiPrinter, FiCheck, } from 'react-icons/fi';

const { prescriptionsData, inventoryData, categories } = pharmacyConfig;

const PharmacyPage = () => {
  const [activeTab, setActiveTab] = useState('dispensary'); // 'dispensary' | 'inventory'
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [prescriptions, setPrescriptions] = useState(prescriptionsData);
  const [printedId, setPrintedId] = useState(null);
  const [showNewRxModal, setShowNewRxModal] = useState(false);
  const [newRx, setNewRx] = useState({
    medication: '',
    patient: '',
    patientId: '',
    wardBed: '',
    doctor: 'Dr. Arthur Pendelton',
    dosage: '',
    route: 'Oral (PO)',
    schedule: 'Once Daily (qHS)',
    form: 'Oral Tablet',
    category: 'Cardiovascular',
    isControlled: false,
  });

  const handleVerify = (id) => {
    setPrescriptions((prev) =>
      prev.map((rx) =>
        rx.id === id ? { ...rx, status: 'In Preparation', statusColor: 'info' } : rx
      )
    );
    toast.info(`Prescription ${id} passed pharmacist verification and is queued for prep.`, {
      title: 'Prescription Verified',
    });
  };

  const handleDispense = (id) => {
    setPrescriptions((prev) =>
      prev.map((rx) =>
        rx.id === id ? { ...rx, status: 'Dispensed', statusColor: 'success' } : rx
      )
    );
    toast.success(`Prescription ${id} dispensed and sealed for ward delivery cart.`, {
      title: 'Medication Dispensed',
    });
  };

  const handlePrint = (id) => {
    setPrintedId(id);
    toast.info(`Generating label and administration barcode for ${id}...`, {
      title: 'Pharmacy Print Job',
    });
    setTimeout(() => setPrintedId(null), 2500);
  };

  const handleCreateRx = (e) => {
    e.preventDefault();
    if (!newRx.medication || !newRx.patient) return;
    const newEntry = {
      id: `RX-${Math.floor(7050 + Math.random() * 900)}`,
      medication: newRx.medication,
      form: newRx.form || 'Oral Tablet',
      category: newRx.category,
      patient: newRx.patient,
      patientId: newRx.patientId || `P-${Math.floor(10000 + Math.random() * 9000)}`,
      wardBed: newRx.wardBed || 'General Ward · Bed 01',
      doctor: newRx.doctor,
      dosage: newRx.dosage || 'Standard Dose',
      schedule: newRx.schedule,
      route: newRx.route,
      orderedAt: 'Just now',
      status: 'Verification',
      statusColor: 'warning',
      isControlled: newRx.isControlled,
    };
    setPrescriptions((prev) => [newEntry, ...prev]);
    toast.success(`New order ${newEntry.id} logged for ${newEntry.patient} (${newEntry.wardBed}).`, {
      title: 'Order Created',
    });
    setShowNewRxModal(false);
    setNewRx({
      medication: '',
      patient: '',
      patientId: '',
      wardBed: '',
      doctor: 'Dr. Arthur Pendelton',
      dosage: '',
      route: 'Oral (PO)',
      schedule: 'Once Daily (qHS)',
      form: 'Oral Tablet',
      category: 'Cardiovascular',
      isControlled: false,
    });
  };

  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter((item) => {
      const matchSearch =
        item.medication.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.patient.toLowerCase().includes(search.toLowerCase()) ||
        item.patientId.toLowerCase().includes(search.toLowerCase()) ||
        item.doctor.toLowerCase().includes(search.toLowerCase());

      const matchCat = selectedCat === 'All Categories' || item.category === selectedCat;
      const matchStatus = selectedStatus === 'All' || item.status === selectedStatus;

      return matchSearch && matchCat && matchStatus;
    });
  }, [prescriptions, search, selectedCat, selectedStatus]);

  const filteredInventory = useMemo(() => {
    return inventoryData.filter((item) => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.ndc.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [search]);

  return (
    <div className="p-3.5 sm:p-5 lg:p-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Hospital Pharmacy & Dispensary
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Central pharmacy formulary inventory, inpatient dispensaries, controlled substance logs, and e-prescriptions
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <FiPackage className="w-3.5 h-3.5" />
            <span>Formulary Order</span>
          </button>
          <button
            type="button"
            onClick={() => setShowNewRxModal(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/25 cursor-pointer"
          >
            <FiPlus className="w-3.5 h-3.5" />
            <span>New Inpatient Rx</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto pb-1 scrollbar-none">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Hospital Operations' },
            { label: 'Pharmacy & Meds' },
          ]}
        />
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="flex items-center justify-between p-4 gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block truncate">
              Daily Orders Fulfilled
            </span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">482 Rx</div>
            <span className="text-xs text-primary font-semibold block truncate">
              99.8% verification accuracy
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
            <FiActivity className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-4 gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block truncate">
              In Prep & Review
            </span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">28 Orders</div>
            <span className="text-xs text-cyan-500 font-semibold block truncate">
              Robotic carousels active
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0 border border-cyan-500/20">
            <FiClock className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-4 gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block truncate">
              Low Stock Triggers
            </span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">6 Items</div>
            <span className="text-xs text-amber-500 font-semibold block truncate">
              Automated supplier reorder
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20">
            <FiAlertTriangle className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-4 gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block truncate">
              Controlled Substance Vault
            </span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">100% Audited</div>
            <span className="text-xs text-emerald-500 font-semibold block truncate">
              Biometric dual-sign lock
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <FiShield className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Main View Mode Selector */}
      <div className="flex items-center gap-4 sm:gap-6 border-b border-slate-200 dark:border-white/10 pb-px overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('dispensary')}
          className={`pb-3 text-xs sm:text-sm font-bold transition-all relative border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'dispensary'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Active Inpatient Dispensary (Queue)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('inventory')}
          className={`pb-3 text-xs sm:text-sm font-bold transition-all relative border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'inventory'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Formulary Vault & Inventory
        </button>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="w-full lg:w-80">
            <Input
              id="pharmacy-search"
              type="search"
              variant="glass"
              size="sm"
              placeholder="Search medication, Rx#, patient, NDC..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              clearable
            />
          </div>

          {activeTab === 'dispensary' && (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium shrink-0">
                Status:
              </span>
              {['All', 'Dispensed', 'In Preparation', 'Verification'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedStatus(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedStatus === st
                      ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-xs'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          )}
        </div>

        {activeTab === 'dispensary' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  selectedCat === cat
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </Card>

      {/* Tab 1: Active Inpatient Dispensary */}
      {activeTab === 'dispensary' && (
        <div className="space-y-3">
          {filteredPrescriptions.map((rx) => (
            <Card key={rx.id} className="p-4 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Medication & Rx Info */}
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-gray-400 shrink-0 font-bold">{rx.id}</span>
                    <Badges color={rx.statusColor} variant="soft" size="sm" rounded="pill">
                      {rx.status}
                    </Badges>
                    {rx.isControlled && (
                      <Badges color="danger" variant="solid" size="sm" rounded="pill">
                        Controlled C-II
                      </Badges>
                    )}
                    <span className="text-xs text-gray-400 font-medium truncate">· {rx.category}</span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    {rx.medication}
                  </h3>

                  <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {rx.dosage}
                    </span>
                    <span>Route: {rx.route}</span>
                    <span>Schedule: {rx.schedule}</span>
                    <span>Form: {rx.form}</span>
                  </div>
                </div>

                {/* Patient & Prescriber Context */}
                <div className="grid grid-cols-2 gap-3 w-full lg:w-64 xl:w-72 shrink-0 p-3 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 text-xs">
                  <div className="min-w-0">
                    <span className="text-gray-400 block text-xs">Patient</span>
                    <span className="font-semibold text-gray-900 dark:text-white mt-0.5 block truncate">
                      {rx.patient}
                    </span>
                    <span className="text-gray-400 text-xs block truncate">{rx.wardBed}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-gray-400 block text-xs">Physician</span>
                    <span className="font-semibold text-gray-900 dark:text-white mt-0.5 block truncate">
                      {rx.doctor}
                    </span>
                    <span className="text-gray-400 text-xs block truncate">{rx.orderedAt}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full lg:w-auto justify-end sm:justify-start lg:justify-end shrink-0">
                  {rx.status === 'Verification' ? (
                    <button
                      type="button"
                      onClick={() => handleVerify(rx.id)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                    >
                      <FiCheck className="w-3.5 h-3.5" />
                      <span>Verify Rx</span>
                    </button>
                  ) : rx.status === 'In Preparation' ? (
                    <button
                      type="button"
                      onClick={() => handleDispense(rx.id)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all cursor-pointer shadow-xs"
                    >
                      <FiPackage className="w-3.5 h-3.5" />
                      <span>Dispense to Ward</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handlePrint(rx.id)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer"
                    >
                      {printedId === rx.id ? (
                        <>
                          <FiCheck className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Printed</span>
                        </>
                      ) : (
                        <>
                          <FiPrinter className="w-3.5 h-3.5" />
                          <span>Print Label</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {filteredPrescriptions.length === 0 && (
            <Card className="p-12 text-center text-sm text-gray-500 dark:text-gray-400">
              No prescriptions match your selected filters.
            </Card>
          )}
        </div>
      )}

      {/* Tab 2: Formulary Vault & Inventory */}
      {activeTab === 'inventory' && (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50/75 dark:bg-white/5 font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                  <th className="px-4 py-3.5 whitespace-nowrap">Medication Name</th>
                  <th className="px-4 py-3.5 whitespace-nowrap">NDC Code</th>
                  <th className="px-4 py-3.5 whitespace-nowrap">Category</th>
                  <th className="px-4 py-3.5 whitespace-nowrap">Packaging Form</th>
                  <th className="px-4 py-3.5 whitespace-nowrap">Stock Quantity</th>
                  <th className="px-4 py-3.5 whitespace-nowrap">Par Level</th>
                  <th className="px-4 py-3.5 text-right whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/10 text-slate-700 dark:text-slate-300">
                {filteredInventory.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-gray-900 dark:text-white whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-gray-400 whitespace-nowrap">
                      {item.ndc}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {item.form}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                      {item.stock.toLocaleString()} units
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="w-28 sm:w-36 space-y-1">
                        <Progress
                          value={item.level}
                          color={item.level < 30 ? 'danger' : item.level < 50 ? 'warning' : 'primary'}
                          size="xs"
                          rounded="pill"
                        />
                        <span className="text-gray-400 text-xs block">Par: {item.min}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <Badges
                        color={item.status === 'Low Stock' ? 'danger' : item.status === 'Audited' ? 'info' : 'success'}
                        variant="soft"
                        size="sm"
                        rounded="pill"
                      >
                        {item.status}
                      </Badges>
                    </td>
                  </tr>
                ))}
                {filteredInventory.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                      No formulary items match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* New Inpatient Rx Modal */}
      <Modal
        variant="glass"
        open={showNewRxModal}
        onClose={() => setShowNewRxModal(false)}
        title="Issue Inpatient E-Prescription"
        description="Formulary orders queue directly to central dispensary"
        size="md"
        color="primary"
        footer={
          <div className="flex items-center justify-end gap-2.5 w-full">
            <button
              type="button"
              onClick={() => setShowNewRxModal(false)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreateRx}
              className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/25 cursor-pointer"
            >
              Issue Rx Order
            </button>
          </div>
        }
      >
        <form onSubmit={handleCreateRx} className="space-y-3.5 text-xs">
          <Input
            id="rx-medication"
            label="Medication Name & Strength"
            required
            placeholder="e.g. Amoxicillin / Clavulanate 875mg"
            variant="glass"
            size="sm"
            value={newRx.medication}
            onChange={(e) => setNewRx({ ...newRx, medication: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              id="rx-patient"
              label="Patient Name"
              required
              placeholder="e.g. Liam Foster"
              variant="glass"
              size="sm"
              value={newRx.patient}
              onChange={(e) => setNewRx({ ...newRx, patient: e.target.value })}
            />
            <Input
              id="rx-ward-bed"
              label="Ward & Bed"
              placeholder="e.g. ICU · Bed 04"
              variant="glass"
              size="sm"
              value={newRx.wardBed}
              onChange={(e) => setNewRx({ ...newRx, wardBed: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              id="rx-dosage"
              label="Dosage"
              placeholder="e.g. 500mg"
              variant="glass"
              size="sm"
              value={newRx.dosage}
              onChange={(e) => setNewRx({ ...newRx, dosage: e.target.value })}
            />
            <Input
              id="rx-route"
              label="Route"
              type="select"
              variant="glass"
              size="sm"
              value={newRx.route}
              onChange={(e) => setNewRx({ ...newRx, route: e.target.value })}
              options={[
                'Oral (PO)',
                'IV Infusion',
                'IV Push',
                'Subcutaneous',
                'Inhalation (Neb)',
                'Transdermal',
              ]}
            />
            <Input
              id="rx-category"
              label="Category"
              type="select"
              variant="glass"
              size="sm"
              value={newRx.category}
              onChange={(e) => setNewRx({ ...newRx, category: e.target.value })}
              options={[
                'Cardiovascular',
                'Antibiotics',
                'Analgesics & Sedatives',
                'Emergency Meds',
                'Respiratory',
              ]}
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="controlledCheck"
              checked={newRx.isControlled}
              onChange={(e) => setNewRx({ ...newRx, isControlled: e.target.checked })}
              className="rounded border-slate-300 dark:border-white/20 text-primary focus:ring-primary cursor-pointer"
            />
            <label htmlFor="controlledCheck" className="text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              Controlled Substance (Requires DEA / Dual Sign-off)
            </label>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PharmacyPage;
