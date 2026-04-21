function Header({ user, onLogin, onLogout }) {
  try {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const navigateToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        // Section exists on current page - scroll to it
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Section doesn't exist - navigate to home page with hash
        window.location.href = `index.html#${sectionId}`;
      }
      setIsMenuOpen(false);
    };

    return (
      <header className="bg-white shadow-sm sticky top-0 z-50" data-name="header" data-file="components/Header.js">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center cursor-pointer" onClick={() => window.location.href = 'index.html'}>
              <div className="w-14 h-14 sm:w-20 sm:h-20 mr-2 sm:mr-4 flex-shrink-0">
                <img 
                  src="assets/e84e37d2-3309-40d2-a20e-e91f7e504a5f.png" 
                  alt="HECEA Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-base sm:text-xl lg:text-2xl font-medium text-red-600 mb-1 sm:mb-2">
                  英国高校华人员工联合会
                </div>
                <div className="text-xs sm:text-sm text-[var(--text-secondary)] leading-tight hidden sm:block">
                  UK HIGHER EDUCATION<br />
                  CHINESE EMPLOYEES ASSOCIATION
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => navigateToSection('home')} className="text-lg text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                Home / 首页
              </button>
              <a href="about.html" className="text-lg text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                About / 关于我们
              </a>
              <button onClick={() => navigateToSection('services')} className="text-lg text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                Services / 服务
              </button>
              <button onClick={() => navigateToSection('community')} className="text-lg text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                Community / 社区
              </button>
              <button onClick={() => navigateToSection('donation')} className="text-lg text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                Donation / 捐赠
              </button>

            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-[var(--text-secondary)]">Welcome / 欢迎, {user.name}</span>
                  <button onClick={onLogout} className="btn-secondary">
                    Logout / 退出
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button onClick={onLogin} className="btn-primary">
                    Join Us / 加入我们
                  </button>
                  <a href="admin.html" className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                    Admin
                  </a>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              <div className={`icon-${isMenuOpen ? 'x' : 'menu'} text-xl text-[var(--text-primary)]`}></div>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <button onClick={() => navigateToSection('home')} className="text-left text-lg text-[var(--text-secondary)] hover:text-[var(--primary-color)]">
                  Home / 首页
                </button>
                <a href="about.html" className="text-left text-lg text-[var(--text-secondary)] hover:text-[var(--primary-color)]">
                  About / 关于我们
                </a>
                <button onClick={() => navigateToSection('services')} className="text-left text-lg text-[var(--text-secondary)] hover:text-[var(--primary-color)]">
                  Services / 服务
                </button>
                <button onClick={() => navigateToSection('community')} className="text-left text-lg text-[var(--text-secondary)] hover:text-[var(--primary-color)]">
                  Community / 社区
                </button>
                <button onClick={() => navigateToSection('donation')} className="text-left text-lg text-[var(--text-secondary)] hover:text-[var(--primary-color)]">
                  Donation / 捐赠
                </button>

                <div className="pt-4 border-t">
                  {user ? (
                    <div className="space-y-2">
                      <p className="text-sm text-[var(--text-secondary)]">Welcome / 欢迎, {user.name}</p>
                      <button onClick={onLogout} className="btn-secondary w-full">
                        Logout / 退出
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button onClick={onLogin} className="btn-primary w-full">
                        Join Us / 加入我们
                      </button>
                      <a href="admin.html" className="text-center block text-sm text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                        Admin Login
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}