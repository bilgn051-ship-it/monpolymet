import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NewsPage from './pages/news/NewsPage';
import JobsPage from './pages/careers/JobsPage';
import ApplicationsPage from './pages/careers/ApplicationsPage';
import ResourcePage from './components/resource/ResourcePage';
import SingletonPage from './components/resource/SingletonPage';
import NavigationPage from './pages/settings/NavigationPage';
import HomeBuilder from './pages/builder/HomeBuilder';
import AboutBuilder from './pages/builder/AboutBuilder';
import CompaniesBuilder from './pages/builder/CompaniesBuilder';
import CsrBuilder from './pages/builder/CsrBuilder';
import { LIST_RESOURCES, SINGLETON_RESOURCES } from './pages/resources';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />

          {/* Live Page Builders */}
          <Route path="home-builder" element={<HomeBuilder />} />
          <Route path="about-builder" element={<AboutBuilder />} />
          <Route path="companies-builder" element={<CompaniesBuilder />} />
          <Route path="csr-builder" element={<CsrBuilder />} />

          {/* Hand-built vertical-slice CRUD screens */}
          <Route path="news" element={<NewsPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="navigation-settings" element={<NavigationPage />} />

          {/* Config-driven list collections */}
          {Object.entries(LIST_RESOURCES).map(([routePath, config]) => (
            <Route
              key={routePath}
              path={routePath}
              element={<ResourcePage config={config} />}
            />
          ))}

          {/* Config-driven singleton editors */}
          {Object.entries(SINGLETON_RESOURCES).map(([routePath, config]) => (
            <Route
              key={routePath}
              path={routePath}
              element={<SingletonPage config={config} />}
            />
          ))}
        </Route>
      </Route>
    </Routes>
  );
}
