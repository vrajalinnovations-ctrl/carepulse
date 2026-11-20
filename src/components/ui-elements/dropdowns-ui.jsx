import React from 'react';
import DropDown from '../ui/dropdowns';
import Card from '../ui/Card';
import Breadcrumb from '../ui/breadcrumbs';
import { FiEdit2, FiTrash2, FiShare2, FiDownload, FiLink, FiCopy, FiHome } from 'react-icons/fi';

const sampleItems = [
  { id: 'edit', label: 'Edit', icon: <FiEdit2 /> },
  { id: 'share', label: 'Share', icon: <FiShare2 /> },
  { id: 'copyLink', label: 'Copy Link', icon: <FiLink /> },
  { id: 'duplicate', label: 'Duplicate', icon: <FiCopy /> },
  { id: 'download', label: 'Download', icon: <FiDownload /> },
  { id: 'delete', label: 'Delete', icon: <FiTrash2 />, danger: true },
];

const DropDownUi = () => {
  return (
    <div className="pt-6 px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dropdown Components
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Toggleable contextual overlays for displaying lists and actions
          </p>
        </div>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Components' },
            { label: 'UIElements' },
            { label: 'Dropdowns' },
          ]}
        />
      </div>

      {/* Main Showcase Variants */}
      <div className="flex flex-col gap-6 mb-6">
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Variants (Soft, Solid, Outline, Ghost)
          </h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <DropDown label="Soft / Primary" color="primary" variant="soft" items={sampleItems} />
            <DropDown label="Solid / Secondary" color="secondary" variant="solid" items={sampleItems} />
            <DropDown label="Outline / Success" color="success" variant="outline" items={sampleItems} />
            <DropDown label="Ghost / Indigo" color="indigo" variant="ghost" items={sampleItems} />
          </div>
        </Card>
      </div>

      {/* Configuration & Behavior Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Sizes and Rounding */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Sizes and Rounding
          </h3>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <DropDown label="Small" size="sm" round="default" color="primary" variant="solid" items={sampleItems} />
            <DropDown label="Medium" size="md" round="default" color="success" variant="soft" items={sampleItems} />
            <DropDown label="Large Pill" size="lg" round="pill" color="danger" variant="outline" items={sampleItems} />
          </div>
        </Card>

        {/* Placements */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Placements
          </h3>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <DropDown label="Bottom Start" placement="bottom-start" color="primary" variant="soft" items={sampleItems} />
            <DropDown label="Bottom End" placement="bottom-end" color="secondary" variant="solid" items={sampleItems} />
            <DropDown label="Top Start" placement="top-start" color="success" variant="outline" items={sampleItems} />
            <DropDown label="Top End" placement="top-end" color="danger" variant="ghost" items={sampleItems} />
          </div>
        </Card>

        {/* Transitions */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Transitions
          </h3>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <DropDown label="Scale" transition="scale" color="primary" variant="soft" items={sampleItems} />
            <DropDown label="Fade" transition="fade" color="success" variant="solid" items={sampleItems} />
            <DropDown label="Slide" transition="slide" color="danger" variant="outline" items={sampleItems} />
          </div>
        </Card>
      </div>

      {/* Color Variants Container */}
      <div className="flex flex-col gap-6 mb-6">
        {/* Soft */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Soft Variant — All Colors
          </h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <DropDown label="Primary" color="primary" variant="soft" items={sampleItems} />
            <DropDown label="Secondary" color="secondary" variant="soft" items={sampleItems} />
            <DropDown label="Success" color="success" variant="soft" items={sampleItems} />
            <DropDown label="Danger" color="danger" variant="soft" items={sampleItems} />
            <DropDown label="Warning" color="warning" variant="soft" items={sampleItems} />
            <DropDown label="Info" color="info" variant="soft" items={sampleItems} />
            <DropDown label="Purple" color="purple" variant="soft" items={sampleItems} />
            <DropDown label="Pink" color="pink" variant="soft" items={sampleItems} />
            <DropDown label="Teal" color="teal" variant="soft" items={sampleItems} />
            <DropDown label="Indigo" color="indigo" variant="soft" items={sampleItems} />
          </div>
        </Card>

        {/* Solid */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Solid Variant — All Colors
          </h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <DropDown label="Primary" color="primary" variant="solid" items={sampleItems} />
            <DropDown label="Secondary" color="secondary" variant="solid" items={sampleItems} />
            <DropDown label="Success" color="success" variant="solid" items={sampleItems} />
            <DropDown label="Danger" color="danger" variant="solid" items={sampleItems} />
            <DropDown label="Warning" color="warning" variant="solid" items={sampleItems} />
            <DropDown label="Info" color="info" variant="solid" items={sampleItems} />
            <DropDown label="Purple" color="purple" variant="solid" items={sampleItems} />
            <DropDown label="Pink" color="pink" variant="solid" items={sampleItems} />
            <DropDown label="Teal" color="teal" variant="solid" items={sampleItems} />
            <DropDown label="Indigo" color="indigo" variant="solid" items={sampleItems} />
          </div>
        </Card>

        {/* Outline */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Outline Variant — All Colors
          </h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <DropDown label="Primary" color="primary" variant="outline" items={sampleItems} />
            <DropDown label="Secondary" color="secondary" variant="outline" items={sampleItems} />
            <DropDown label="Success" color="success" variant="outline" items={sampleItems} />
            <DropDown label="Danger" color="danger" variant="outline" items={sampleItems} />
            <DropDown label="Warning" color="warning" variant="outline" items={sampleItems} />
            <DropDown label="Info" color="info" variant="outline" items={sampleItems} />
            <DropDown label="Purple" color="purple" variant="outline" items={sampleItems} />
            <DropDown label="Pink" color="pink" variant="outline" items={sampleItems} />
            <DropDown label="Teal" color="teal" variant="outline" items={sampleItems} />
            <DropDown label="Indigo" color="indigo" variant="outline" items={sampleItems} />
          </div>
        </Card>

        {/* Ghost */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Ghost Variant — All Colors
          </h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <DropDown label="Primary" color="primary" variant="ghost" items={sampleItems} />
            <DropDown label="Secondary" color="secondary" variant="ghost" items={sampleItems} />
            <DropDown label="Success" color="success" variant="ghost" items={sampleItems} />
            <DropDown label="Danger" color="danger" variant="ghost" items={sampleItems} />
            <DropDown label="Warning" color="warning" variant="ghost" items={sampleItems} />
            <DropDown label="Info" color="info" variant="ghost" items={sampleItems} />
            <DropDown label="Purple" color="purple" variant="ghost" items={sampleItems} />
            <DropDown label="Pink" color="pink" variant="ghost" items={sampleItems} />
            <DropDown label="Teal" color="teal" variant="ghost" items={sampleItems} />
            <DropDown label="Indigo" color="indigo" variant="ghost" items={sampleItems} />
          </div>
        </Card>

        {/* Icon Ghost */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Icon Ghost — onlyIcon Trigger (All Colors)
          </h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <DropDown onlyIcon variant="iconGhost" color="primary" size="md" icon={<FiEdit2 />} items={sampleItems} placement="bottom-start" />
            <DropDown onlyIcon variant="iconGhost" color="secondary" size="md" icon={<FiShare2 />} items={sampleItems} placement="bottom-start" />
            <DropDown onlyIcon variant="iconGhost" color="success" size="md" icon={<FiDownload />} items={sampleItems} placement="bottom-start" />
            <DropDown onlyIcon variant="iconGhost" color="danger" size="md" icon={<FiTrash2 />} items={sampleItems} placement="bottom-start" />
            <DropDown onlyIcon variant="iconGhost" color="warning" size="md" icon={<FiLink />} items={sampleItems} placement="bottom-start" />
            <DropDown onlyIcon variant="iconGhost" color="info" size="md" icon={<FiCopy />} items={sampleItems} placement="bottom-start" />
            <DropDown onlyIcon variant="iconGhost" color="purple" size="md" icon={<FiEdit2 />} items={sampleItems} placement="bottom-start" />
            <DropDown onlyIcon variant="iconGhost" color="pink" size="md" icon={<FiShare2 />} items={sampleItems} placement="bottom-start" />
            <DropDown onlyIcon variant="iconGhost" color="teal" size="md" icon={<FiDownload />} items={sampleItems} placement="bottom-start" />
            <DropDown onlyIcon variant="iconGhost" color="indigo" size="md" icon={<FiLink />} items={sampleItems} placement="bottom-start" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DropDownUi;
