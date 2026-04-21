function CareerDevelopmentApp() {
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

    const programs = [
      {
        title: 'Career Development / 职业发展',
        description: 'Comprehensive career advancement support for academic professionals',
        icon: 'trending-up'
      },
      {
        title: 'Work-Life Balance / 工作生活平衡',
        description: 'Strategies for maintaining healthy balance in academic careers',
        icon: 'heart'
      },
      {
        title: 'Personal Wellness / 个人健康',
        description: 'Holistic wellness programs including mental health support',
        icon: 'smile'
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
          <section className="section-padding bg-gradient-to-r from-[var(--accent-color)] to-[var(--secondary-color)] text-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="icon-star text-3xl text-[var(--accent-color)]"></div>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Career & Holistic Development / 职业及全人发展
                </h1>
                <p className="text-xl max-w-3xl mx-auto">
                  Comprehensive support for professional growth and personal development in higher education.
                  高等教育领域专业成长和个人发展的全面支持。
                </p>
              </div>
            </div>
          </section>

          {/* Programs Detail */}
          <section className="section-padding">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Development Programs / 发展项目</h2>
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {programs.map((program, index) => (
                  <div key={index} className="card text-center">
                    <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className={`icon-${program.icon} text-2xl text-[var(--primary-color)]`}></div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                    <p className="text-[var(--text-secondary)]">{program.description}</p>
                  </div>
                ))}
              </div>

              {/* Join Section */}
              <div className="card bg-[var(--bg-light)] text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Grow? / 准备好成长了吗？</h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  Join our development programs and take the next step in your career journey.
                  加入我们的发展项目，在您的职业旅程中迈出下一步。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => alert('Please contact us at ukhecea@gmail.com to enroll in our development programs / 请通过 ukhecea@gmail.com 联系我们注册发展项目')}
                    className="btn-primary"
                  >
                    Enroll Now / 立即注册
                  </button>
                  <a href="career-development-forum.html" className="px-6 py-3 border-2 border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg font-medium hover:bg-[var(--primary-color)] hover:text-white transition-all duration-200">
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
    console.error('CareerDevelopmentApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CareerDevelopmentApp />);