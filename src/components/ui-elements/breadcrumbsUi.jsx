import React from 'react';
import { FiHome, FiFolder, FiFileText, FiSlash, FiArrowRight } from 'react-icons/fi';
import Breadcrumb from '../ui/breadcrumbs';
import Card from '../ui/Card';

const BreadcrumbsUi = () => {
  const defaultItems = [
    { label: 'Home', href: '/', icon: <FiHome /> },
    { label: 'Components', href: '/components', icon: <FiFolder /> },
    { label: 'Breadcrumbs', icon: <FiFileText /> },
  ];

  const minimalItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Security' },
  ];

  return (
    <div className="pt-6 px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Breadcrumbs
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Indicate the current page's location within a navigational hierarchy.
          </p>
        </div>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Components' },
            { label: 'UIElements' },
            { label: 'Breadcrumbs' },
          ]}
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-6">
        {/* Default / Ghost Variant */}
        <Card innerClassName="flex flex-col gap-5">
          <h2 className="text-lg font-semibold">
            Default (Ghost)
          </h2>
          <div>
            <Breadcrumb items={defaultItems} />
          </div>
        </Card>

        {/* Solid Variant */}
        <Card innerClassName="flex flex-col gap-5">
          <h2 className="text-lg font-semibold">
            Solid Background
          </h2>
          <div>
            <Breadcrumb items={minimalItems} variant="solid" />
          </div>
        </Card>

        {/* Custom Separator */}
        <Card innerClassName="flex flex-col gap-5">
          <h2 className="text-lg font-semibold">
            Custom Separators
          </h2>
          <div className="flex flex-col gap-6">
            <Breadcrumb items={minimalItems} separator={<FiSlash />} />
            <Breadcrumb items={defaultItems} separator={<FiArrowRight className="w-4 h-4" />} />
            <Breadcrumb items={minimalItems} separator={<span className="text-gray-300 dark:text-gray-600 font-light text-xl leading-none">/</span>} />
          </div>
        </Card>

        {/* Sizes */}
        <Card innerClassName="flex flex-col gap-5">
          <h2 className="text-lg font-semibold">
            Sizes
          </h2>
          <div className="flex flex-col gap-6">
            <Breadcrumb items={minimalItems} size="sm" />
            <Breadcrumb items={minimalItems} size="md" />
            <Breadcrumb items={minimalItems} size="lg" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BreadcrumbsUi;
