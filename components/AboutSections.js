// Organization Introduction Section
function IntroductionSection() {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">Organization Introduction / 联合会简介</h2>
      <div className="space-y-4 text-[var(--text-secondary)]">
        <p>
          The UK Higher Education Chinese Employees Association (UK HECEA) was founded in October 2021, 
          a non-profit organization run by Chinese employees working in the UK universities and research institutes 
          and led by Dr. Jie Liu (Lecturer at UCL Institute of Education), Dr. Yang Hong (Professor, Department of 
          Geographical Environmental Sciences, University of Reading), and Dr. Xu Xin (Research Fellow, Department 
          of Education, University of Oxford). At present, more than 200 members from over 30 UK universities and 
          research institutes have joined the UK HECEA. Currently, we have 14 student volunteers and a guidance team 
          with 9 experienced teachers. UK HECEA aims to serve all Chinese employees working in universities and 
          research institutions across the UK. We hope to provide a platform for mutual assistance and friendship, 
          resource sharing, working rights protection, and promoting career and holistic development. You are more 
          than welcome to follow us on our social media and join us.
        </p>
        <p>
          英国高校华人员工联合会（UK HECEA）成立于2021年10月，属于非营利性团体。联合会由在英高校和科研机构工作的华人员工创办并运营 。联合会主要负责人是刘洁博士（伦敦大学学院教育学院讲师），杨洪博士（雷丁大学地理环境科学系教授）和许心博士（牛津大学教育系研究员）。目前，已经有来自30余所英国大学和科研机构的200余位华人员工加入了联合会。联合会有学生志愿者14人以及一个9人的教师指导团队。我们致力于服务在全英高校和科研型机构就职的所有华人员工并希望提供一个互助联谊、资源共享、共同维权、促进职业和全人发展的平台。欢迎大家关注和加入我们。
        </p>
      </div>
    </div>
  );
}

// Terms of References Section
function TermsSection() {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">Terms of References / 联合会章程</h2>
      <div className="space-y-4 text-[var(--text-secondary)]">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Mission Statement / 使命宣言</h3>
        <p>
          To foster a supportive professional community for Chinese academics and staff in UK higher education, 
          promoting career advancement, cultural exchange, and professional excellence.
        </p>
        <p>
          为英国高等教育界的华人学者和员工营造一个支持性的专业社区，促进职业发展、文化交流和专业卓越。
        </p>
        
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-6">Core Values / 核心价值</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Professional Excellence / 专业卓越</li>
          <li>Cultural Diversity and Inclusion / 文化多元与包容</li>
          <li>Mutual Support and Collaboration / 互助合作</li>
          <li>Ethical Conduct and Integrity / 道德操守与诚信</li>
        </ul>
      </div>
    </div>
  );
}

// Privacy Policy Section
function PrivacySection() {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">Privacy Policy / 隐私政策</h2>
      <div className="space-y-4 text-[var(--text-secondary)]">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Data Collection / 数据收集</h3>
        <p>
          We collect personal information only when necessary for membership registration and communication purposes.
          我们仅在会员注册和沟通目的需要时收集个人信息。
        </p>
        
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-6">Data Protection / 数据保护</h3>
        <p>
          All member information is kept confidential and secure. We do not share personal data with third parties 
          without explicit consent.
        </p>
        <p>
          所有会员信息均保密和安全。未经明确同意，我们不会与第三方共享个人数据。
        </p>
        
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-6">Contact for Privacy Concerns / 隐私问题联系</h3>
        <p>
          For any privacy-related questions, please contact us at privacy@hecea.org.uk
          如有任何隐私相关问题，请联系 privacy@hecea.org.uk
        </p>
      </div>
    </div>
  );
}



// Contact Section
function ContactSection() {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">Contact Us / 联系我们</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">General Contact / 一般联系</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="icon-mail text-lg mr-3 text-[var(--primary-color)]"></div>
              <span>ukhecea@gmail.com</span>
            </div>

            <div className="flex items-center">
              <div className="icon-map-pin text-lg mr-3 text-[var(--primary-color)]"></div>
              <span>London, United Kingdom</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Social Media / 社交媒体</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="icon-twitter text-lg mr-3 text-blue-500"></div>
              <span>Twitter: @HECEAUK</span>
            </div>
            <div className="flex items-center">

              <div className="icon-users text-lg mr-3 text-green-600"></div>
              <span>微信公众号: 英国高校华人员工联合会</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Members Portal Section
function MembersSection({ user }) {
  if (!user) {
    return (
      <div className="card text-center">
        <div className="w-16 h-16 bg-[var(--primary-color)] rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="icon-lock text-2xl text-white"></div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Member Portal Access / 会员专区访问</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Please login to access exclusive member content and resources.
          请登录以访问专属会员内容和资源。
        </p>
        <a href="index.html" className="btn-primary">
          Login to Access / 登录访问
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Welcome to Your Members Area / 欢迎来到您的会员专区</h2>
        <p className="text-xl text-[var(--text-secondary)] mb-8">
          Access exclusive content, impact reports, and member-only resources.
          访问专属内容、影响报告和会员专享资源。
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-[var(--bg-light)]">
            <div className="w-12 h-12 bg-[var(--primary-color)] rounded-lg flex items-center justify-center mb-4">
              <div className="icon-chart-bar text-xl text-white"></div>
            </div>
            <h3 className="text-xl font-bold mb-3">Impact Dashboard / 影响仪表板</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              View detailed reports on how your contributions are making a difference.
              查看您的贡献如何产生影响的详细报告。
            </p>
            <button 
              onClick={() => alert('Feature coming soon! / 功能即将推出！')}
              className="btn-primary"
            >
              View Reports / 查看报告
            </button>
          </div>

          <div className="card bg-[var(--bg-light)]">
            <div className="w-12 h-12 bg-[var(--secondary-color)] rounded-lg flex items-center justify-center mb-4">
              <div className="icon-calendar text-xl text-white"></div>
            </div>
            <h3 className="text-xl font-bold mb-3">Professional Events / 专业活动</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              Sign up for upcoming professional events and networking opportunities.
              注册即将到来的专业活动和网络机会。
            </p>
            <button 
              onClick={() => alert('Feature coming soon! / 功能即将推出！')}
              className="btn-primary"
            >
              Browse Events / 浏览活动
            </button>
          </div>

          <div className="card bg-[var(--bg-light)]">
            <div className="w-12 h-12 bg-[var(--accent-color)] rounded-lg flex items-center justify-center mb-4">
              <div className="icon-users text-xl text-white"></div>
            </div>
            <h3 className="text-xl font-bold mb-3">Community Forum / 社区论坛</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              Connect with other members and share your experiences.
              与其他会员建立联系并分享您的经历。
            </p>
            <a href="workplace-rights-forum.html" className="btn-primary">
              Join Discussion / 加入讨论
            </a>
          </div>
        </div>
      </div>

      <div className="card bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Member Dashboard / 会员仪表板</h3>
          <p className="mb-6 opacity-90">
            Track your professional development, networking activities, and engagement within the HECEA community.
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
        </div>
      </div>
    </div>
  );
}


