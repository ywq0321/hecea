function About({ user }) {
  try {
    const stats = [
      { number: '200+', label: 'Active Members / 活跃会员', icon: 'users' },
      { number: '30+', label: 'Universities / 大学', icon: 'building' },
      { number: '5', label: 'Years Established / 成立年数', icon: 'calendar' },
      { number: '50+', label: 'Events Hosted / 举办活动', icon: 'calendar-check' }
    ];

    return (
      <section id="about" className="section-padding bg-white" data-name="about" data-file="components/About.js">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6">About HECEA / 关于HECEA</h2>
              <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-8">
                The UK Higher Education Chinese Employees Association (HECEA) is a professional organization dedicated to supporting Chinese academics and staff in UK higher education institutions through networking, career development, and community building.<br/>
                英国高校华人员工联合会（HECEA）是一个专业组织，致力于通过网络建设、职业发展和社区建设来支持英国高等教育机构中的华人学者和员工。
              </p>
              
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="card text-center">
                <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className={`icon-${stat.icon} text-2xl text-[var(--primary-color)]`}></div>
                </div>
                <h3 className="text-3xl font-bold text-[var(--primary-color)] mb-2">{stat.number}</h3>
                <p className="text-[var(--text-secondary)]">{stat.label}</p>
              </div>
            ))}
          </div>

          {user && (
            <div className="card bg-[var(--primary-light)] mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--primary-color)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="icon-star text-2xl text-white"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Member Exclusive Content / 会员专属内容</h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  As a valued member, you have access to detailed impact reports, volunteer opportunities, and behind-the-scenes updates from our field teams.<br/>
                  作为尊贵的会员，您可以访问详细的影响报告、志愿者机会以及我们现场团队的幕后更新。
                </p>
                <button 
                  onClick={() => {
                    const element = document.getElementById('services');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = 'index.html#services';
                    }
                  }}
                  className="btn-primary"
                >
                  Explore Member Benefits / 探索会员权益
                </button>
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Our Mission / 我们的使命</h3>
            <p className="text-[var(--text-secondary)] mb-8 text-center text-lg">
              To foster a supportive professional community for Chinese academics and staff in UK higher education, promoting career advancement, cultural exchange, and professional excellence.<br/>
              为英国高等教育界的华人学者和员工营造一个支持性的专业社区，促进职业发展、文化交流和专业卓越。
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-[var(--secondary-color)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="icon-check text-xl text-white"></div>
                </div>
                <h4 className="font-semibold mb-2">Professional Networking / 专业网络</h4>
                <p className="text-[var(--text-secondary)]">Connecting Chinese academics across UK universities and institutions<br/>连接英国各大学和机构的华人学者</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[var(--secondary-color)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="icon-check text-xl text-white"></div>
                </div>
                <h4 className="font-semibold mb-2">Career Development / 职业发展</h4>
                <p className="text-[var(--text-secondary)]">Workshops, mentorship programs, and professional guidance<br/>研讨会、导师计划和专业指导</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[var(--secondary-color)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="icon-check text-xl text-white"></div>
                </div>
                <h4 className="font-semibold mb-2">Cultural Exchange / 文化交流</h4>
                <p className="text-[var(--text-secondary)]">Bridging Chinese and UK academic cultures and practices<br/>架起中英学术文化与实践的桥梁</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('About component error:', error);
    return null;
  }
}