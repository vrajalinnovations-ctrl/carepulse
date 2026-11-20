import React, { useState, useCallback, useMemo } from "react";
import Alerts from "../ui/alerts";
import Card from "../ui/Card";
import Breadcrumb from "../ui/breadcrumbs";
import { FiHome } from "react-icons/fi";
import { useTheme } from "../../context/theme-context";


const COLORS = [
  "primary", "success", "danger", "warning",
  "info", "purple", "pink", "teal", "indigo",
];

const EXTRA_TEXT =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae minus beatae quia assumenda, corrupti quos!";

const SECTIONS = [
  {
    id: "primary",
    title: "Primary Alert",
    variant: "solid",
    colors: ["primary", "primary", "primary"],
    variants: ["solid", "outline", "soft"],
    withIcon: false,
    extraContent: false,
  },
  { id: "solid", title: "Solid Alerts", variant: "solid", colors: COLORS, withIcon: false, extraContent: false },
  { id: "outline", title: "Outline Alerts", variant: "outline", colors: COLORS, withIcon: false, extraContent: false },
  { id: "soft", title: "Soft Alerts", variant: "soft", colors: COLORS, withIcon: false, extraContent: false },
  { id: "softIcon", title: "Alerts With Icons", variant: "soft", colors: COLORS, withIcon: true, extraContent: false },
  { id: "outlineIcon", title: "Alerts Outline With Icons", variant: "outline", colors: COLORS, withIcon: true, extraContent: false },
  { id: "softContent", title: "Alerts With Additional Content", variant: "soft", colors: COLORS, withIcon: true, extraContent: true },
  { id: "outlineContent", title: "Alerts Outline With Additional Content", variant: "outline", colors: COLORS, withIcon: true, extraContent: true },
];



const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const AlertSection = React.memo(({ section, dismissedAlerts, onDismiss }) => {
  return (
    <Card innerClassName="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">{section.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {section.colors.map((color, idx) => {
          const alertId = `${section.id}-${color}-${idx}`;
          if (dismissedAlerts.has(alertId)) return null;
          const variant = section.variants ? section.variants[idx] : section.variant;
          const label = `${capitalize(color)} Alert`;

          return (
            <Alerts
              key={alertId}
              variant={variant}
              color={color}
              title={label}
              onClose={() => onDismiss(alertId)}
              withIcon={section.withIcon}
            >
              {`This is a ${color} ${variant} alert message.`}
              {section.extraContent && (
                <p className="mt-1">{EXTRA_TEXT}</p>
              )}
            </Alerts>
          );
        })}
      </div>
    </Card>
  );
});

AlertSection.displayName = "AlertSection";


const AlertsUi = () => {
  const { theme } = useTheme();
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

  // Stable reference — won't cause AlertSection re-renders
  const handleDismiss = useCallback((alertId) => {
    setDismissedAlerts((prev) => new Set([...prev, alertId]));
  }, []);



  return (
    <div className= "pt-6 px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Alerts UI</h1>
          <p className="text-sm text-gray-500">Feedback messages and status notifications</p>
        </div>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Components' },
            { label: 'UIElements' },
            { label: 'Alerts' },
          ]}
        />
      </div>
      <div className="grid grid-cols-1 mb-6 gap-6">
        {SECTIONS.map((section) => (
          <AlertSection
            key={section.id}
            section={section}
            dismissedAlerts={dismissedAlerts}
            onDismiss={handleDismiss}
          />
        ))}
      </div>
    </div>
  );
};

export default AlertsUi;