import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/input';
import Breadcrumb from '../ui/breadcrumbs';
import {
  FiMail,
  FiUser,
  FiPhone,
  FiCalendar,
  FiLock,
  FiHome,
  FiCheckCircle,
  FiAlertCircle,
} from 'react-icons/fi';

const InputUi = () => {
  const [search, setSearch] = useState('');
  const [bio, setBio] = useState('');
  const [age, setAge] = useState('28');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [pwd, setPwd] = useState('');
  const [vol, setVol] = useState(65);
  const [color, setColor] = useState('#22c55e');

  return (
    <div className="pt-6 px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Input Components</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Form controls, text fields, validations, and interactive inputs
          </p>
        </div>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Components' },
            { label: 'UIElements' },
            { label: 'Input' },
          ]}
        />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 01: Standard Form Fields */}
        <Card className="md:col-span-2">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Essential Form Inputs
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Standard text fields with icons, placeholders, and helper captions
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
            <Input
              label="Full Name"
              id="input-name"
              name="name"
              placeholder="Dr. Sarah Jenkins"
              leadingIcon={<FiUser />}
              required
            />
            <Input
              label="Email Address"
              id="input-email"
              name="input-email"
              type="email"
              placeholder="s.jenkins@hospital.org"
              leadingIcon={<FiMail />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helper="Hospital intranet delivery only."
            />
            <Input
              label="Contact Phone"
              id="input-phone"
              name="input-phone"
              type="tel"
              placeholder="(555) 234-5678"
              addonStart="+1"
              leadingIcon={<FiPhone />}
            />
            <Input
              label="Appointment Date"
              id="input-date"
              name="input-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              leadingIcon={<FiCalendar />}
            />
          </div>
        </Card>

        {/* 02: Credentials & Search */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Credentials, Search & Steppers
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Password with reveal toggle, clearable live search, and stepper
          </p>
          <div className="space-y-4 mt-4">
            <Input
              label="Account Password"
              id="input-pwd"
              name="input-pwd"
              autoComplete="new-password"
              type="password"
              placeholder="••••••••••••"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              leadingIcon={<FiLock />}
              helper="Minimum 8 characters with numbers."
            />
            <Input
              label="Live Patient Search"
              id="input-search"
              name="input-search"
              type="search"
              placeholder="Search by patient ID or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              clearable
            />
            <Input
              label="Patient Age"
              id="input-age"
              name="input-age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min={0}
              max={120}
              step={1}
            />
            <Input
              label="Medical Record Attachment (PDF)"
              id="input-resume"
              name="input-resume"
              type="file"
              placeholder="Attach pathology report or imaging..."
            />
          </div>
        </Card>

        {/* 03: Surface Styles & Variants */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Input Styles & Variants
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Outline, soft tinted background, modern underline, and ghost
          </p>
          <div className="space-y-4 mt-4">
            <Input
              label="Outline Variant (Default)"
              id="input-def-var"
              placeholder="Standard outline input"
              variant="outline"
            />
            <Input
              label="Soft Tinted Variant"
              id="input-soft-var"
              placeholder="Subtle background fill"
              variant="soft"
            />
            <Input
              label="Underline Minimal Variant"
              id="input-underline-var"
              placeholder="Bottom border minimal"
              variant="underline"
            />
            <Input
              label="Ghost Borderless Variant"
              id="input-ghost-var"
              placeholder="Transparent borderless field"
              variant="ghost"
            />
          </div>
        </Card>

        {/* 04: Validation States & Feedback */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Validation & Feedback States
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Visual cues for error states, success confirmations, and disabled fields
          </p>
          <div className="space-y-4 mt-4">
            <Input
              label="Validation Error State"
              id="input-error"
              name="input-error"
              defaultValue="invalid_ehr_number"
              error="Electronic Health Record ID not recognized in database."
              leadingIcon={<FiAlertCircle />}
            />
            <Input
              label="Verification Success State"
              id="input-success"
              name="input-success"
              defaultValue="verified.specialist@carepulse.org"
              success
              helper="Physician license credentials verified active."
              leadingIcon={<FiCheckCircle />}
            />
            <Input
              label="Disabled Patient Record"
              id="input-disabled"
              defaultValue="Locked: Ward 3 Isolation Room"
              disabled
              helper="Record is locked during active surgery."
            />
          </div>
        </Card>

        {/* 05: Sizing Scale */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Component Sizing Scale
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Different input densities for compact EHR charts or touch screens
          </p>
          <div className="space-y-4 mt-4">
            <Input
              label="Compact Size (sm - 36px)"
              id="input-sm"
              size="sm"
              placeholder="Compact EHR input"
              leadingIcon={<FiUser />}
            />
            <Input
              label="Standard Size (md - 40px)"
              id="input-md"
              size="md"
              placeholder="Standard clinical field"
              leadingIcon={<FiUser />}
            />
            <Input
              label="Spacious Size (lg - 48px)"
              id="input-lg"
              size="lg"
              placeholder="Large touch-friendly input"
              leadingIcon={<FiUser />}
            />
          </div>
        </Card>

        {/* 06: Dropdown Select & Textarea */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Select Dropdown & Rich Textarea
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Selection menus and multi-line notes with character counter
          </p>
          <div className="space-y-4 mt-4">
            <Input
              type="select"
              label="Clinical Ward Assignment"
              id="input-ward"
              placeholder="Select assigned ward..."
              options={[
                { label: 'Intensive Care Unit (ICU)', value: 'icu' },
                { label: 'Cardiology Telemetry Wing', value: 'cardiology' },
                { label: 'Pediatric Care Center', value: 'pediatrics' },
                { label: 'Trauma Resuscitation Bays', value: 'trauma' },
              ]}
            />
            <Input
              label="Clinical Consultation Notes"
              id="input-bio"
              name="input-bio"
              type="textarea"
              placeholder="Document patient observations, dosage adjustments, and symptoms..."
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              showCount
              maxLength={200}
            />
          </div>
        </Card>

        {/* 07: Prefix & Suffix Addons */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Prefix / Suffix Addons & Controls
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Currency units, phone extensions, sliders, and color swatch
          </p>
          <div className="space-y-4 mt-4">
            <Input
              label="Procedure Co-Pay Amount"
              id="amount"
              name="amount"
              type="number"
              placeholder="75.00"
              addonStart="$"
              addonEnd=".00 USD"
              step={5}
            />
            <Input
              label="Hospital Department URL"
              id="url-addon"
              placeholder="carepulse.org/dept"
              addonStart="https://"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block mb-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Unit Theme Accent
                </label>
                <Input
                  id="favColor"
                  name="favColor"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="vol" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Telemetry Alarm Volume
                  </label>
                  <span className="text-xs font-mono font-semibold text-primary">{vol}%</span>
                </div>
                <Input
                  id="vol"
                  name="vol"
                  type="range"
                  value={vol}
                  onChange={(e) => setVol(e.target.value)}
                  min={0}
                  max={100}
                />
              </div>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default InputUi;
