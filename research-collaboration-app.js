function ResearchCollaborationApp() {
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

    const opportunities = [
      {
        title: 'Research Partnerships / 研究伙伴关系',
        description: 'Connect with researchers across disciplines for collaborative projects',
        icon: 'users'
      },
      {
        title: 'Recruitment Information / 招募信息',
        description: 'Job opportunities including doctoral, postdoctoral, and research positions / 博士、博士后、研究员等岗位招聘信息',
        icon: 'briefcase'
      },
      {
        title: 'Research Achievement Sharing / 科研成果分享',
        description: 'Share your research publications and collaborative publishing opportunities',
        icon: 'book'
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
          <section className="section-padding bg-gradient-to-r from-green-600 to-[var(--primary-color)] text-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="icon-book-open text-3xl text-green-600"></div>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Academic Dynamics & Research Collaboration / 学界动态及研究合作
                </h1>
                <p className="text-xl max-w-3xl mx-auto">
                  Facilitating academic partnerships, research collaborations, and publication sharing across UK higher education.
                  促进英国高等教育领域的学术伙伴关系、研究合作和出版物分享。
                </p>
              </div>
            </div>
          </section>

          {/* Opportunities Detail */}
          <section className="section-padding">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Collaboration Opportunities / 合作机会</h2>
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {opportunities.map((opportunity, index) => (
                  <div key={index} className="card text-center">
                    <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className={`icon-${opportunity.icon} text-2xl text-[var(--primary-color)]`}></div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{opportunity.title}</h3>
                    <p className="text-[var(--text-secondary)]">{opportunity.description}</p>
                  </div>
                ))}
              </div>

              {/* Connect Section */}
              <div className="card bg-[var(--bg-light)] text-center">
                <h3 className="text-2xl font-bold mb-4">Start Collaborating / 开始合作</h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  Join our research network and discover collaboration opportunities with fellow academics.
                  加入我们的研究网络，发现与学者同仁的合作机会。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => alert('Please contact us at ukhecea@gmail.com to join our research network / 请通过 ukhecea@gmail.com 联系我们加入研究网络')}
                    className="btn-primary"
                  >
                    Join Research Network / 加入研究网络
                  </button>
                  <a href="research-collaboration-forum.html" className="px-6 py-3 border-2 border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg font-medium hover:bg-[var(--primary-color)] hover:text-white transition-all duration-200">
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
    console.error('ResearchCollaborationApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ResearchCollaborationApp />);