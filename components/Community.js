function Community({ user }) {
  try {


    return (
      <section id="community" className="section-padding bg-white" data-name="community" data-file="components/Community.js">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6">Our Community / 我们的社区</h2>
            <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Hear from our members about their experiences and achievements within the HECEA professional community.<br/>
              聆听我们的会员分享他们在HECEA专业社区中的经历和成就。
            </p>
          </div>



          {user && (
            <div className="card bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white mb-12">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Member Dashboard / 会员仪表板</h3>
                <p className="mb-6 opacity-90">
                  Track your professional development, networking activities, and engagement within the HECEA community.<br/>
                  跟踪您在HECEA社区中的专业发展、网络活动和参与情况。
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">15</div>
                    <div className="text-sm opacity-80">Events Attended / 参加活动</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">28</div>
                    <div className="text-sm opacity-80">Professional Connections / 专业联系</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">5</div>
                    <div className="text-sm opacity-80">Research Collaborations / 研究合作</div>
                  </div>
                </div>
                <a href="about.html" className="inline-block bg-white text-[var(--primary-color)] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  View Full Profile / 查看完整资料
                </a>
              </div>
            </div>
          )}

          <div className="text-center">
            <div className="card bg-[var(--bg-light)] max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Join Our Professional Community / 加入我们的专业社区</h3>
              <p className="text-[var(--text-secondary)] mb-8">
                Connect with Chinese academics across the UK, advance your career, and contribute to our vibrant professional community in higher education.<br/>
                与英国各地的华人学者建立联系，推进您的职业发展，为我们在高等教育领域的活跃专业社区做出贡献。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setTimeout(() => {
                      const loginButton = document.querySelector('header .btn-primary');
                      if (loginButton) {
                        loginButton.click();
                      }
                    }, 500);
                  }}
                  className="btn-primary"
                >
                  Become a Member / 成为会员
                </button>
                <button className="btn-secondary">
                  Attend Next Event / 参加下次活动
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Community component error:', error);
    return null;
  }
}
