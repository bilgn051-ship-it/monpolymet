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
import { LIST_RESOURCES, SINGLETON_RESOURCES } from './pages/resources';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />

          {/* Hand-built vertical-slice CRUD screens */}
          <Route path="news" element={<NewsPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="applications" element={<ApplicationsPage />} />

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
