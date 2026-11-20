import React, { useState } from 'react';
import Modal from '../ui/modals';
import Button from '../ui/buttons';
import Card from '../ui/Card';
import Breadcrumb from '../ui/breadcrumbs';
import {
  FiHome,
  FiAlertTriangle,
  FiCheckCircle,
  FiUserCheck,
  FiSidebar,
  FiMaximize2,
  FiSliders,
  FiLayers,
} from 'react-icons/fi';

const COLORS = ['primary', 'secondary', 'success', 'danger', 'warning', 'purple', 'pink', 'teal', 'indigo'];
const VARIANTS = ['solid', 'outline', 'glass'];
const SIZES = ['sm', 'md', 'lg', 'xl'];

const VARIANT_BUTTON_MAP = {
  solid: { variant: 'solid', color: 'primary' },
  outline: { variant: 'outline', color: 'purple' },
  glass: { variant: 'soft', color: 'indigo' },
};

const ModalsUi = () => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState('demo'); // 'demo' | 'danger' | 'success' | 'form'
  const [cfg, setCfg] = useState({
    title: 'Clinical Operations Dialog',
    description: 'Review details and confirm changes to patient records.',
    color: 'primary',
    variant: 'solid',
    size: 'md',
    position: 'center',
    transition: 'scale',
    mode: 'dialog',
    icon: null,
  });

  const launch = (overrides = {}, type = 'demo') => {
    setModalType(type);
    setCfg((prev) => ({
      ...prev,
      title: 'Clinical Operations Dialog',
      description: 'Review details and confirm changes to patient records.',
      mode: 'dialog',
      icon: null,
      ...overrides,
    }));
    setOpen(true);
  };

  return (
    <div className="pt-6 px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Modal Components</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Overlays, dialog boxes, and slide-over drawers for user workflows
          </p>
        </div>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Components' },
            { label: 'UIElements' },
            { label: 'Modals' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 01: Pre-Styled Modal Styles & Archetypes */}
        <Card className="md:col-span-2">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Modal Archetypes & Workflow Styles
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Pre-built dialog patterns with custom icons, headers, and intents
          </p>
          <div className="flex flex-wrap items-center gap-3.5 mt-4">
            <Button
              color="danger"
              variant="solid"
              leftIcon={<FiAlertTriangle />}
              onClick={() =>
                launch(
                  {
                    title: 'Delete Clinical Record',
                    description: 'This action cannot be undone. Are you sure you want to delete this record?',
                    color: 'danger',
                    icon: <FiAlertTriangle className="w-5 h-5 text-rose-500" />,
                    size: 'sm',
                  },
                  'danger'
                )
              }
            >
              Destructive Alert
            </Button>

            <Button
              color="success"
              variant="solid"
              leftIcon={<FiCheckCircle />}
              onClick={() =>
                launch(
                  {
                    title: 'Discharge Order Confirmed',
                    description: 'Patient discharge instructions and summary have been queued for print.',
                    color: 'success',
                    icon: <FiCheckCircle className="w-5 h-5 text-emerald-500" />,
                    size: 'sm',
                  },
                  'success'
                )
              }
            >
              Success Feedback
            </Button>

            <Button
              color="primary"
              variant="solid"
              leftIcon={<FiUserCheck />}
              onClick={() =>
                launch(
                  {
                    title: 'Assign Attending Physician',
                    description: 'Select clinical staff to assign to inpatient telemetry monitoring.',
                    color: 'primary',
                    icon: <FiUserCheck className="w-5 h-5 text-primary" />,
                    size: 'md',
                  },
                  'form'
                )
              }
            >
              Interactive Form
            </Button>

            <Button
              color="indigo"
              variant="outline"
              leftIcon={<FiSidebar />}
              onClick={() =>
                launch(
                  {
                    title: 'Patient Clinical Overview',
                    description: 'Vitals, medication schedule, and attending nurse logs.',
                    color: 'indigo',
                    mode: 'drawer-right',
                    size: 'md',
                  },
                  'drawer'
                )
              }
            >
              Slide-Over Drawer
            </Button>
          </div>
        </Card>

        {/* 02: Visual Variants */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Visual Panel Variants
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Different surface treatments including glassmorphic blur and colored borders
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            {VARIANTS.map((v) => {
              const { variant, color } = VARIANT_BUTTON_MAP[v];
              return (
                <Button
                  key={v}
                  variant={variant}
                  color={color}
                  onClick={() =>
                    launch({
                      title: `${v.charAt(0).toUpperCase() + v.slice(1)} Surface Variant`,
                      description: `Showcase of modal rendered with the ${v} panel treatment.`,
                      variant: v,
                      color,
                    })
                  }
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </Button>
              );
            })}
          </div>
        </Card>

        {/* 03: Modal Sizes */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Modal Sizing Scale
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Responsive dialog widths ranging from compact alerts to wide tables
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            {SIZES.map((s) => (
              <Button
                key={s}
                variant="outline"
                color="cyan"
                onClick={() =>
                  launch({
                    title: `Modal Size: ${s.toUpperCase()}`,
                    description: `This dialog preview illustrates max-width scale '${s}'.`,
                    color: 'cyan',
                    size: s,
                  })
                }
              >
                {s.toUpperCase()}
              </Button>
            ))}
          </div>
        </Card>

        {/* 04: Positions & Animations */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Positions & Entry Transitions
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Top sheet, centered spring scale, or smooth fade animations
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Button
              color="primary"
              variant="soft"
              onClick={() =>
                launch({
                  title: 'Centered Scale Modal',
                  position: 'center',
                  transition: 'scale',
                })
              }
            >
              Center / Scale
            </Button>
            <Button
              color="info"
              variant="soft"
              onClick={() =>
                launch({
                  title: 'Centered Fade Modal',
                  position: 'center',
                  transition: 'fade',
                  color: 'info',
                })
              }
            >
              Center / Fade
            </Button>
            <Button
              color="warning"
              variant="outline"
              onClick={() =>
                launch({
                  title: 'Top Position Slide Modal',
                  position: 'top',
                  transition: 'slide-up',
                  color: 'warning',
                })
              }
            >
              Top / Slide-Up
            </Button>
          </div>
        </Card>

        {/* 05: Color Accents */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Color Accent Palettes
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Colored header rings, action buttons, and accent borders
          </p>
          <div className="flex flex-wrap items-center gap-2.5 mt-4">
            {COLORS.map((c) => (
              <Button
                key={`col-${c}`}
                color={c}
                variant="outline"
                size="sm"
                onClick={() =>
                  launch({
                    title: `${c.charAt(0).toUpperCase() + c.slice(1)} Palette Dialog`,
                    color: c,
                    variant: 'outline',
                  })
                }
              >
                {c}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      {/* Dynamic Modal Viewport */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={cfg.title}
        description={cfg.description}
        color={cfg.color}
        variant={cfg.variant}
        size={cfg.size}
        position={cfg.position}
        transition={cfg.transition}
        mode={cfg.mode}
        icon={cfg.icon}
        primaryAction={{
          label: modalType === 'danger' ? 'Delete Record' : modalType === 'form' ? 'Save Changes' : 'Confirm',
          color: cfg.color,
          onClick: () => setOpen(false),
        }}
        secondaryAction={{
          label: 'Cancel',
          variant: 'outline',
          color: cfg.color,
          onClick: () => setOpen(false),
        }}
      >
        {modalType === 'danger' ? (
          <div className="space-y-2">
            <p className="text-rose-600 dark:text-rose-400 font-medium">
              Warning: Patient Electronic Health Record #EHR-98402 will be permanently archived.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">
              All linked blood panel logs, appointment history, and telemetry monitoring will be inaccessible.
            </p>
          </div>
        ) : modalType === 'success' ? (
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs">
              Discharge clearance ID: <strong>DCH-7891-B</strong> verified by attending physician.
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Prescription formulary instructions and followup booking cards are synced with the patient portal.
            </p>
          </div>
        ) : modalType === 'form' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Staff Physician Name
              </label>
              <input
                type="text"
                defaultValue="Dr. Sarah Jenkins, MD"
                className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Department Specialty
              </label>
              <select className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option>Cardiology & Telemetry</option>
                <option>Neurology & Intensive Care</option>
                <option>Trauma Surgery Wing</option>
              </select>
            </div>
          </div>
        ) : modalType === 'drawer' ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
              <div className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">Room 402 - Bed B</div>
              <div className="text-base font-bold text-gray-900 dark:text-white mt-0.5">Robert Sterling (Age 54)</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Diagnosis: Acute Coronary Syndrome</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">Latest Vitals:</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-gray-800">BP: 124/82 mmHg</div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-gray-800">Heart Rate: 72 bpm</div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-gray-800">SpO2: 98% Normal</div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-gray-800">Temp: 98.6°F</div>
              </div>
            </div>
          </div>
        ) : (
          <p>
            This interactive dialog demonstrates modal properties. You can customize colors, variants, sizes, positions, and animations using the controls on the page.
          </p>
        )}
      </Modal>
    </div>
  );
};

export default ModalsUi;
