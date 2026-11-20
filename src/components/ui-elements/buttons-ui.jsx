import {
  FiShield,
  FiLock,
  FiAlertTriangle,
  FiActivity,
  FiTerminal,
  FiServer,
  FiCheckCircle,
  FiXCircle,
  FiCpu,
  FiZap,
  FiArrowRight,
  FiDownload,
  FiSettings,
  FiTrash2,
  FiHome,
  FiEye,
  FiRadio,
} from 'react-icons/fi';
import { IoIosClose } from 'react-icons/io';
import { TradingButton, RainbowButton } from '../ui/buttons';
import Card from '../ui/Card';
import Breadcrumb from '../ui/breadcrumbs';

const ButtonUi = () => {
  return (
    <div className="pt-6 px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Button Components</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Interactive hospital operations button variants with clinical intents, diagnostic icons, and loading states
          </p>
        </div>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Components' },
            { label: 'UIElements' },
            { label: 'Buttons' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        {/* Default Buttons (Solid) */}
        <Card className="xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Default Buttons (Solid)</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Primary healthcare action controls with solid fills and ambient status glows
              </p>
            </div>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              CarePulse
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 mt-4">
            <TradingButton intent="primary" leftIcon={<FiShield />}>Quick Scan</TradingButton>
            <TradingButton intent="success" leftIcon={<FiCheckCircle />}>Authorize</TradingButton>
            <TradingButton intent="danger" leftIcon={<FiXCircle />}>Block Threat</TradingButton>
            <TradingButton intent="warning" leftIcon={<FiAlertTriangle />}>Quarantine</TradingButton>
            <TradingButton intent="cyan" leftIcon={<FiActivity />}>Audit Trail</TradingButton>
            <TradingButton intent="purple" leftIcon={<FiCpu />}>Neural Shield</TradingButton>
            <TradingButton intent="pink" leftIcon={<FiLock />}>Encrypt</TradingButton>
            <TradingButton intent="teal" leftIcon={<FiServer />}>Firewall Active</TradingButton>
            <TradingButton intent="indigo" leftIcon={<FiTerminal />}>Threat Intel</TradingButton>
            <TradingButton intent="neutral" leftIcon={<FiDownload />}>Export Report</TradingButton>
          </div>
        </Card>

        {/* Clinical Button Sizes */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Clinical Button Sizes</h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <TradingButton intent="primary" size="xs" leftIcon={<FiShield />}>Mini</TradingButton>
            <TradingButton intent="primary" size="sm" leftIcon={<FiShield />}>Small</TradingButton>
            <TradingButton intent="primary" size="md" leftIcon={<FiShield />}>Medium</TradingButton>
            <TradingButton intent="primary" size="lg" leftIcon={<FiShield />}>Large</TradingButton>
          </div>
        </Card>

        {/* Rounded Pill Buttons */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Rounded Pill Buttons</h3>
          <div className="flex flex-wrap items-center gap-3.5 mt-4">
            <TradingButton intent="primary" rounded="full">Deep Scan</TradingButton>
            <TradingButton intent="success" rounded="full">Active Safe</TradingButton>
            <TradingButton intent="danger" rounded="full">Terminate</TradingButton>
            <TradingButton intent="warning" rounded="full">Isolate Host</TradingButton>
            <TradingButton intent="purple" rounded="full">AI Sentry</TradingButton>
            <TradingButton intent="pink" rounded="full">Crypto Key</TradingButton>
            <TradingButton intent="teal" rounded="full">VPN Tunnel</TradingButton>
            <TradingButton intent="indigo" rounded="full">SOC Monitor</TradingButton>
            <TradingButton intent="cyan" rounded="full">DNS Filter</TradingButton>
            <TradingButton intent="neutral" rounded="full">Incident Log</TradingButton>
          </div>
        </Card>

        {/* Outline Buttons */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Outline Buttons</h3>
          <div className="flex flex-wrap items-center gap-3.5 mt-4">
            <TradingButton intent="primary" variant="outline">Scan Network</TradingButton>
            <TradingButton intent="success" variant="outline">Verify Node</TradingButton>
            <TradingButton intent="danger" variant="outline">Revoke Token</TradingButton>
            <TradingButton intent="warning" variant="outline">Patch System</TradingButton>
            <TradingButton intent="purple" variant="outline">Heuristics</TradingButton>
            <TradingButton intent="pink" variant="outline">Hash Check</TradingButton>
            <TradingButton intent="teal" variant="outline">Proxy Rule</TradingButton>
            <TradingButton intent="indigo" variant="outline">SIEM Query</TradingButton>
            <TradingButton intent="cyan" variant="outline">Traffic Dump</TradingButton>
          </div>
        </Card>

        {/* Soft Glass Buttons */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Soft Glass Buttons</h3>
          <div className="flex flex-wrap items-center gap-3.5 mt-4">
            <TradingButton intent="primary" variant="soft">Auto Defense</TradingButton>
            <TradingButton intent="success" variant="soft">Authenticated</TradingButton>
            <TradingButton intent="danger" variant="soft">Malware Alert</TradingButton>
            <TradingButton intent="warning" variant="soft">Vulnerability</TradingButton>
            <TradingButton intent="purple" variant="soft">Zero Trust</TradingButton>
            <TradingButton intent="pink" variant="soft">PKI Cert</TradingButton>
            <TradingButton intent="teal" variant="soft">Gateway Safe</TradingButton>
            <TradingButton intent="indigo" variant="soft">IOC Feed</TradingButton>
            <TradingButton intent="cyan" variant="soft">Port Scan</TradingButton>
          </div>
        </Card>

        {/* Ghost Action Buttons */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Ghost Action Buttons</h3>
          <div className="flex flex-wrap items-center gap-3.5 mt-4">
            <TradingButton intent="primary" variant="ghost">Console</TradingButton>
            <TradingButton intent="success" variant="ghost">Allowed</TradingButton>
            <TradingButton intent="danger" variant="ghost">Denied</TradingButton>
            <TradingButton intent="warning" variant="ghost">Flagged</TradingButton>
            <TradingButton intent="purple" variant="ghost">Anomaly</TradingButton>
            <TradingButton intent="pink" variant="ghost">Ciphers</TradingButton>
            <TradingButton intent="teal" variant="ghost">SSH Key</TradingButton>
            <TradingButton intent="indigo" variant="ghost">Telemetry</TradingButton>
            <TradingButton intent="cyan" variant="ghost">Traceroute</TradingButton>
          </div>
        </Card>

        {/* Buttons With Icons */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Buttons With Icons</h3>
          <div className="flex flex-wrap items-center gap-3.5 mt-4">
            <TradingButton intent="primary" leftIcon={<FiShield />}>Defense</TradingButton>
            <TradingButton intent="danger" leftIcon={<FiTrash2 />}>Purge Log</TradingButton>
            <TradingButton intent="warning" leftIcon={<FiAlertTriangle />}>Warning</TradingButton>
            <TradingButton intent="neutral" leftIcon={<FiSettings />}>Configs</TradingButton>
            <TradingButton intent="purple" leftIcon={<FiCpu />}>Neural Net</TradingButton>
            <TradingButton intent="pink" leftIcon={<FiLock />}>Security</TradingButton>
            <TradingButton intent="teal" leftIcon={<FiActivity />}>Telemetry</TradingButton>
            <TradingButton intent="indigo" leftIcon={<FiTerminal />}>Execute</TradingButton>
            <TradingButton intent="cyan" leftIcon={<FiEye />}>Inspect</TradingButton>
          </div>
        </Card>

        {/* Loading Clinical Actions */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Loading Clinical Actions</h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <TradingButton loading intent="primary">Scanning...</TradingButton>
            <TradingButton loading intent="danger" variant="outline">Purging...</TradingButton>
            <TradingButton loading intent="neutral" variant="ghost">Syncing...</TradingButton>
            <TradingButton loading intent="purple" variant="solid">Analyzing...</TradingButton>
            <TradingButton loading intent="pink" variant="outline">Encrypting...</TradingButton>
            <TradingButton loading intent="teal" variant="ghost">Connecting...</TradingButton>
          </div>
        </Card>

        {/* Clinical Icon Buttons */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Clinical Icon Buttons</h3>
          <div className="flex flex-wrap items-center gap-3.5 mt-4">
            <TradingButton iconOnly intent="primary"><FiShield /></TradingButton>
            <TradingButton iconOnly intent="danger"><FiXCircle /></TradingButton>
            <TradingButton iconOnly intent="warning"><FiAlertTriangle /></TradingButton>
            <TradingButton iconOnly intent="neutral"><FiTerminal /></TradingButton>
            <TradingButton iconOnly intent="purple"><FiCpu /></TradingButton>
            <TradingButton iconOnly intent="pink"><FiLock /></TradingButton>
            <TradingButton iconOnly intent="teal"><FiServer /></TradingButton>
            <TradingButton iconOnly intent="indigo"><FiRadio /></TradingButton>
            <TradingButton iconOnly intent="cyan"><FiActivity /></TradingButton>
          </div>
        </Card>

        {/* Closing & Dismiss Controls */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Closing & Dismiss Controls</h3>
          <div className="flex flex-wrap items-center gap-3.5 mt-4">
            <TradingButton intent="primary" iconOnly><IoIosClose size={28} /></TradingButton>
            <TradingButton intent="success" iconOnly><IoIosClose size={28} /></TradingButton>
            <TradingButton intent="danger" iconOnly><IoIosClose size={28} /></TradingButton>
            <TradingButton intent="warning" iconOnly><IoIosClose size={28} /></TradingButton>
            <TradingButton intent="purple" iconOnly><IoIosClose size={28} /></TradingButton>
            <TradingButton intent="teal" iconOnly><IoIosClose size={28} /></TradingButton>
            <TradingButton intent="cyan" iconOnly><IoIosClose size={28} /></TradingButton>
          </div>
        </Card>

        {/* Rainbow Shadow Button (Magic UI) */}
        <Card className="md:col-span-2 xl:col-span-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Rainbow Button (Magic UI)</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Clean white button face with glowing animated rainbow shadow underneath
              </p>
            </div>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit">
              @magicui/rainbow-button
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <RainbowButton size="md">
              Get Unlimited Access
            </RainbowButton>

            <RainbowButton size="sm">
              Get Started
            </RainbowButton>

            <RainbowButton size="lg" rightIcon={<FiArrowRight />}>
              Explore Platform
            </RainbowButton>

            <RainbowButton size="md" leftIcon={<FiZap className="text-amber-500" />}>
              Upgrade Pro
            </RainbowButton>

            <RainbowButton size="md" disabled>
              Disabled
            </RainbowButton>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ButtonUi;
