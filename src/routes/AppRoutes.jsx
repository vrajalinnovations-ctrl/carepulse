import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../components/layout/mainlayout'

// Clinical Dashboard Pages
import Overview from '../pages/Overview'
import Patients from '../pages/Patients'
import Appointments from '../pages/Appointments'
import Vitals from '../pages/Vitals'
import ChartsPage from '../pages/Charts'
import TablesPage from '../pages/Tables'
import StaffPage from '../pages/Staff'
import WardsPage from '../pages/Wards'
import LabResultsPage from '../pages/LabResults'
import PharmacyPage from '../pages/Pharmacy'
import EmergencyPage from '../pages/Emergency'
import SettingsPage from '../pages/Settings'

// Authentication Pages
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import VerifyEmail from '../pages/VerifyEmail'

// Error Pages
import NotFound from '../pages/NotFound'
import ServerError from '../pages/ServerError'

// UI Elements Pages
import AccordionUi from '../components/ui-elements/accordionUi'
import AlertsUi from '../components/ui-elements/alertsUi'
import AvatarUi from '../components/ui-elements/avatarsUi'
import BadgesUi from '../components/ui-elements/badgesUi'
import BreadcrumbsUi from '../components/ui-elements/breadcrumbsUi'
import ButtonUi from '../components/ui-elements/buttons-ui'
import CardUi from '../components/ui-elements/card-ui'
import DropDownUi from '../components/ui-elements/dropdowns-ui'
import InputUi from '../components/ui-elements/input-ui'
import ModalsUi from '../components/ui-elements/modals-ui'
import PaginationUi from '../components/ui-elements/pagination-ui'
import ProgressbarsUi from '../components/ui-elements/progressbars-ui'
import SpinnerUi from '../components/ui-elements/spinner-ui'
import ToasterUi from '../components/ui-elements/toastsUi'

// Direct Documentation Redirect Helper
const DocumentationRedirect = ({ to = '/documentation/document.html' }) => {
  useEffect(() => {
    window.location.replace(to)
  }, [to])
  return null
}

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Technical Documentation Direct Redirects */}
      <Route path="/document" element={<DocumentationRedirect to="/documentation/document.html" />} />
      <Route path="/docs" element={<DocumentationRedirect to="/documentation/document.html" />} />
      <Route path="/documentation" element={<DocumentationRedirect to="/documentation/document.html" />} />
      <Route path="/showcase" element={<DocumentationRedirect to="/documentation/index.html" />} />
      <Route path="/public/documentation/document.html" element={<DocumentationRedirect to="/documentation/document.html" />} />
      <Route path="/public/documentation/index.html" element={<DocumentationRedirect to="/documentation/index.html" />} />

      {/* Standalone Authentication Pages (No Navbar, No Sidebar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/auth" element={<Navigate to="/login" replace />} />

      {/* Standalone Error Pages (No Navbar, No Sidebar) */}
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

        {/* Analytics & Records */}
        <Route path="/charts" element={<ChartsPage />} />
        <Route path="/tables" element={<TablesPage />} />

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
      </Route>

      {/* Wildcard Catch-All (No Navbar, No Sidebar) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
