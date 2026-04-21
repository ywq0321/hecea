class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-black"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [user, setUser] = React.useState(null);
    const [showAuthModal, setShowAuthModal] = React.useState(false);

    React.useEffect(() => {
      const savedUser = localStorage.getItem('nonprofit_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }, []);

    const handleLogin = (userData) => {
      setUser(userData);
      localStorage.setItem('nonprofit_user', JSON.stringify(userData));
      setShowAuthModal(false);
    };

    const handleLogout = () => {
      setUser(null);
      localStorage.removeItem('nonprofit_user');
    };

    return (
      <div className="min-h-screen bg-white" data-name="app" data-file="app.js">
        <Header 
          user={user} 
          onLogin={() => setShowAuthModal(true)}
          onLogout={handleLogout}
        />
        <Hero user={user} onLogin={() => setShowAuthModal(true)} />
        <About user={user} />
        <Services user={user} />
        <Donation user={user} />
        <Sponsors user={user} />
        <Community user={user} />
        <Footer />
        
        {showAuthModal && (
          <AuthModal 
            onClose={() => setShowAuthModal(false)}
            onLogin={handleLogin}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);