import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import News from './pages/News';
import Article from './pages/Article';
import Schedule from './pages/Schedule';
import Forum from './pages/Forum';
import ForumThread from './pages/ForumThread';
import Profile from './pages/Profile';
import About from './pages/About';
import JoinMember from './pages/JoinMember';
import Login from './pages/Login';

// Redirect to /login if user is not authenticated
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  if (isLoadingAuth) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

const AuthenticatedApp = () => {
  const { isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/nyheter" element={<News />} />
        <Route path="/artikel/:id" element={<Article />} />
        <Route path="/matchschema" element={<Schedule />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/:id" element={<ForumThread />} />
        <Route path="/profil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/om-oss" element={<About />} />
        <Route path="/bli-medlem" element={<JoinMember />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App;

