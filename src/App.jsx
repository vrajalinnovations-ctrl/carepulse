import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/layout/mainlayout'
import Overview from './pages/Overview'
import Patients from './pages/Patients'
import Appointments from './pages/Appointments'
import Vitals from './pages/Vitals'
import Card from './components/ui/Card'

// UI Elements Pages
import AccordionUi from './components/ui-elements/accordionUi'
import AlertsUi from './components/ui-elements/alertsUi'
import AvatarUi from './components/ui-elements/avatarsUi'
import BadgesUi from './components/ui-elements/badgesUi'
import BreadcrumbsUi from './components/ui-elements/breadcrumbsUi'
import ButtonUi from './components/ui-elements/buttons-ui'
import CardUi from './components/ui-elements/card-ui'
import DropDownUi from './components/ui-elements/dropdowns-ui'
import InputUi from './components/ui-elements/input-ui'
import ModalsUi from './components/ui-elements/modals-ui'
import PaginationUi from './components/ui-elements/pagination-ui'
import ProgressbarsUi from './components/ui-elements/progressbars-ui'
import SpinnerUi from './components/ui-elements/spinner-ui'
import ToasterUi from './components/ui-elements/toastsUi'
import ChartsPage from './pages/Charts'
import TablesPage from './pages/Tables'
import StaffPage from './pages/Staff'
import WardsPage from './pages/Wards'
import LabResultsPage from './pages/LabResults'
import PharmacyPage from './pages/Pharmacy'
import EmergencyPage from './pages/Emergency'
import SettingsPage from './pages/Settings'
import NotFound from './pages/NotFound'
import ServerError from './pages/ServerError'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import VerifyEmail from './pages/VerifyEmail'

// Hospital Module placeholder for other routes
const ClinicalModulePlaceholder = ({ title, subtitle }) => (
  <div className="space-y-4">
    <Card className="p-8">
      <div className="max-w-md">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30 inline-block mb-3">
          Clinical Module Active
        </span>
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          {title || 'Departmental Operations'}
        </h3>
        <p className="text-xs md:text-sm text-slate-500 dark:text-white/60 leading-relaxed">
          {subtitle || 'This clinical operations viewport is connected to the CarePulse electronic hospital network.'}
        </p>
      </div>
    </Card>
  </div>
)

// Direct Documentation Redirect
const DocumentationRedirect = ({ to = '/documentation/document.html' }) => {
  useEffect(() => {
    window.location.replace(to)
  }, [to])
  return null
}

const App = () => {
  return (
    <Routes>
      {/* Separate Technical Documentation Routes */}
      <Route path="/document" element={<DocumentationRedirect to="/documentation/document.html" />} />
      <Route path="/docs" element={<DocumentationRedirect to="/documentation/document.html" />} />
      <Route path="/documentation" element={<DocumentationRedirect to="/documentation/document.html" />} />
      <Route path="/showcase" element={<DocumentationRedirect to="/documentation/index.html" />} />
      <Route path="/public/documentation/document.html" element={<DocumentationRedirect to="/documentation/document.html" />} />
      <Route path="/public/documentation/index.html" element={<DocumentationRedirect to="/documentation/index.html" />} />

      {/* Standalone Authentication Pages (Simple & Normal, No Navbar, No Sidebar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/auth" element={<Navigate to="/login" replace />} />

      {/* Standalone Error Pages (No Navbar, No Sidebar, No Bottom Cards) */}
      <Route path="/404" element={<NotFound />} />
      <Route path="/500" element={<ServerError />} />

      {/* Main Clinical Layout (With Navbar and Sidebar) */}
      <Route element={<MainLayout />}>
        {/* Healthcare Dashboards */}
        <Route index element={<Overview />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/vitals" element={<Vitals />} />

        {/* Clinical Operations */}
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/wards" element={<WardsPage />} />
        <Route path="/lab-results" element={<LabResultsPage />} />
        <Route path="/pharmacy" element={<PharmacyPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* UI Elements Routes */}
        <Route path="/ui-elements" element={<Navigate to="/ui-elements/accordion" replace />} />
        <Route path="/ui-elements/accordion" element={<AccordionUi />} />
        <Route path="/ui-elements/alerts" element={<AlertsUi />} />
        <Route path="/ui-elements/avatars" element={<AvatarUi />} />
        <Route path="/ui-elements/badges" element={<BadgesUi />} />
        <Route path="/ui-elements/breadcrumbs" element={<BreadcrumbsUi />} />
        <Route path="/ui-elements/buttons" element={<ButtonUi />} />
        <Route path="/ui-elements/card" element={<CardUi />} />
        <Route path="/ui-elements/dropdowns" element={<DropDownUi />} />
        <Route path="/ui-elements/input" element={<InputUi />} />
        <Route path="/ui-elements/modals" element={<ModalsUi />} />
        <Route path="/ui-elements/progressbars" element={<ProgressbarsUi />} />
        <Route path="/ui-elements/pagination" element={<PaginationUi />} />
        <Route path="/ui-elements/spinner" element={<SpinnerUi />} />
        <Route path="/ui-elements/toaster" element={<ToasterUi />} />

        <Route path="/charts" element={<ChartsPage />} />
        <Route path="/tables" element={<TablesPage />} />
      </Route>

      {/* Wildcard Catch-All (No Navbar, No Sidebar) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
