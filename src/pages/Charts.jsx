import React, { useState } from 'react';
import Breadcrumb from '../components/ui/breadcrumbs';
import chartsConfig from '../mokdata/charts.json';
import {
  SparklineMetricCard,
  AreaChartCard,
  BarChartCard,
  DonutChartCard,
  RadarChartCard,
} from '../components/ui/charts';
import {
  FiHome,
  FiCalendar,
  FiDownload,
  FiActivity,
  FiUsers,
  FiClock,
  FiHeart,
} from 'react-icons/fi';

const { admissionTrends, departmentCapacity, bedDistribution, qualityMetrics } = chartsConfig;

const ChartsPage = () => {
  const [activeTimeRange, setActiveTimeRange] = useState('30D');

  return (
    <div className="px-5 py-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Clinical Epidemiology & Analytics Charts
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Real-time patient census, department throughput, mortality indices, and hospital velocity telemetry
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Time filter selector */}
          <div className="flex items-center p-1 rounded-xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/60 text-xs font-semibold">
            {['7D', '30D', '90D', '1Y'].map((range) => (
              <button
                key={range}
                onClick={() => setActiveTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTimeRange === range
                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xs'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/25 cursor-pointer"
          >
            <FiDownload className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
          { label: 'Dashboards' },
          { label: 'Clinical Charts' },
        ]}
      />

      {/* Row 1: KPI Sparkline Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SparklineMetricCard
          title="Active Inpatient Census"
          value="1,284"
          change="+4.2%"
          positive={true}
          subtitle="88.4% total bed occupancy"
          color="#22c55e"
          icon={FiUsers}
          data={[1120, 1150, 1140, 1180, 1210, 1190, 1240, 1220, 1260, 1284]}
        />

        <SparklineMetricCard
          title="Emergency Admissions"
          value="342"
          change="-18.5%"
          positive={true}
          subtitle="Avg triage: 9.4 minutes"
          color="#06b6d4"
          icon={FiActivity}
          data={[420, 395, 410, 380, 360, 370, 350, 365, 330, 342]}
        />

        <SparklineMetricCard
          title="OR Suite Utilization"
          value="91.4%"
          change="+6.1%"
          positive={true}
          subtitle="24 scheduled procedures today"
          color="#8b5cf6"
          icon={FiHeart}
          data={[78, 82, 80, 85, 84, 88, 86, 89, 90, 91.4]}
        />

        <SparklineMetricCard
          title="Bed Turnaround Velocity"
          value="4.2 hrs"
          change="-12.3%"
          positive={true}
          subtitle="Discharge to sanitize cycle"
          color="#f59e0b"
          icon={FiClock}
          data={[5.8, 5.5, 5.2, 5.0, 4.8, 4.9, 4.6, 4.5, 4.3, 4.2]}
        />
      </div>

      {/* Row 2: Inflow Trend (Area) + Bed Allocation (Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 xl:col-span-8">
          <AreaChartCard
            title="Hospital Admissions & Patient Census Velocity"
            subtitle="Monthly inpatient admission curve with discharge tracking"
            data={admissionTrends}
            dataKey="value"
            labelKey="label"
            color="#22c55e"
            value="1,482 Patients"
            badgeText="+14.8%"
          />
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <DonutChartCard
            title="Departmental Bed Occupancy"
            subtitle="Live ward distribution across specialized clinical units"
            data={bedDistribution}
            totalLabel="Active Beds"
          />
        </div>
      </div>

      {/* Row 3: Daily Inflow (Bar) + Quality Indices (Radar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 xl:col-span-8">
          <BarChartCard
            title="Weekly Clinical Inflow vs. Target Capacity"
            subtitle="Emergency room and scheduled inpatient check-ins across weekday shifts"
            data={departmentCapacity}
            seriesKey1="current"
            seriesKey2="previous"
            seriesLabel1="Actual Inflow"
            seriesLabel2="Baseline Benchmark"
            color1="#22c55e"
            color2="#06b6d4"
          />
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <RadarChartCard
            title="Clinical Safety & Quality Index"
            subtitle="Joint Commission and accreditation compliance scorecards"
            metrics={qualityMetrics}
            color="#22c55e"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartsPage;
