function WorkplaceRightsApp() {
  try {
    const [user, setUser] = React.useState(null);

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

    const services = [
      {
        title: 'Legal Consultation / 法律咨询',
        description: 'One-on-one legal advice sessions with qualified employment lawyers',
        icon: 'scale'
      },
      {
        title: 'Workplace Advocacy / 职场倡导',
        description: 'Direct support and representation in workplace disputes',
        icon: 'megaphone'
      },
      {
        title: 'Rights Education / 权利教育',
        description: 'Workshops on employment law and workplace rights',
        icon: 'book-open'
      }
    ];

    return (
      <div className="min-h-screen bg-white">
        <Header 
          user={user} 
          onLogin={() => {}}
          onLogout={handleLogout}
        />
        
        <main>
          {/* Hero Section */}
          <section className="section-padding bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="icon-shield-check text-3xl text-[var(--primary-color)]"></div>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Workplace Rights Protection / 工作权利维护
                </h1>
                <p className="text-xl max-w-3xl mx-auto">
                  Comprehensive legal support and advocacy for Chinese professionals in UK higher education institutions.
                  为英国高等教育机构中的华人专业人士提供全面的法律支持和倡导。
                </p>
              </div>
            </div>
          </section>

          {/* Services Detail */}
          <section className="section-padding">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Our Support Services / 我们的支持服务</h2>
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {services.map((service, index) => (
                  <div key={index} className="card text-center">
                    <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className={`icon-${service.icon} text-2xl text-[var(--primary-color)]`}></div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-[var(--text-secondary)]">{service.description}</p>
                  </div>
                ))}
              </div>

              {/* Contact Section */}
              <div className="card bg-[var(--bg-light)] text-center">
                <h3 className="text-2xl font-bold mb-4">Need Legal Support? / 需要法律支持？</h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  Contact our legal team for confidential consultation and support.
                  联系我们的法律团队获得保密咨询和支持。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => alert('Please contact us at ukhecea@gmail.com for consultation requests / 请通过 ukhecea@gmail.com 联系我们申请咨询')}
                    className="btn-primary"
                  >
                    Request Consultation / 申请咨询
                  </button>
                  <a href="workplace-rights-forum.html" className="px-6 py-3 border-2 border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg font-medium hover:bg-[var(--primary-color)] hover:text-white transition-all duration-200">
                    Join Forum / 加入论坛
                  </a>
                  <a href="index.html" className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200">
                    Back to Home / 返回首页
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('WorkplaceRightsApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<WorkplaceRightsApp />);