function AboutApp() {
  try {
    const [user, setUser] = React.useState(null);
    const [activeSection, setActiveSection] = React.useState('introduction');

    React.useEffect(() => {
      const savedUser = AuthUtils.getUser();
      if (savedUser) {
        setUser(savedUser);
      }
    }, []);

    const handleLogout = () => {
      AuthUtils.removeUser();
      setUser(null);
      window.location.href = 'index.html';
    };

    const sections = [
      { id: 'introduction', title: 'Organization Introduction / 联合会简介', icon: 'info' },
      { id: 'members', title: 'Member Portal / 会员专区', icon: 'star' },
      { id: 'terms', title: 'Terms of References / 联合会章程', icon: 'file-text' },
      { id: 'privacy', title: 'Privacy Policy / 隐私政策', icon: 'shield' },
      { id: 'contact', title: 'Contact Us / 联系我们', icon: 'phone' }
    ];

    const renderContent = () => {
      switch(activeSection) {
        case 'introduction':
          return <IntroductionSection />;
        case 'members':
          return <MembersSection user={user} />;
        case 'terms':
          return <TermsSection />;
        case 'privacy':
          return <PrivacySection />;
        case 'contact':
          return <ContactSection />;
        default:
          return <IntroductionSection />;
      }
    };

    return (
      <div className="min-h-screen bg-white">
        <Header 
          user={user} 
          onLogin={() => {}}
          onLogout={handleLogout}
        />
        
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">About HECEA / 关于HECEA</h1>
            <p className="text-xl text-[var(--text-secondary)]">
              Learn more about our organization, structure, and policies.
              了解更多关于我们的组织、结构和政策。
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="card sticky top-8">
                <h3 className="text-lg font-semibold mb-4">Navigation / 导航</h3>
                <nav className="space-y-2">
                  {sections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
                        activeSection === section.id 
                          ? 'bg-[var(--primary-color)] text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className={`icon-${section.icon} text-lg mr-3`}></div>
                      <span className="text-sm">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              {renderContent()}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('AboutApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AboutApp />);