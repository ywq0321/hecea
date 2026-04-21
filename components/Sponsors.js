function Sponsors({ user }) {
  try {
    const sponsors = [
      {
        name: '北京协同创新研究院',
        logo: 'assets/14458bdb-6979-4f62-ae8c-147e11bb43de.webp',
        tier: 'Platinum'
      }
    ];

    const getTierColor = (tier) => {
      switch(tier) {
        case 'Platinum': return 'bg-gray-200 text-gray-800';
        case 'Gold': return 'bg-yellow-100 text-yellow-800';
        case 'Silver': return 'bg-gray-100 text-gray-600';
        default: return 'bg-blue-100 text-blue-800';
      }
    };

    return (
      <section id="sponsors" className="section-padding bg-white" data-name="sponsors" data-file="components/Sponsors.js">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6">Our Sponsors / 我们的赞助商</h2>
            <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              We are grateful to our institutional and corporate sponsors who support our mission to empower Chinese professionals in UK higher education.<br/>
              我们感谢支持我们赋能英国高等教育界华人专业人士使命的机构和企业赞助商。
            </p>
          </div>

          <div className="flex justify-center mb-12">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="card text-center group hover:scale-105 transition-transform duration-200">
                <div className="relative mb-4">
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getTierColor(sponsor.tier)}`}>
                    {sponsor.tier}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">{sponsor.name}</h3>
              </div>
            ))}
          </div>

          {/* Sponsorship Tiers */}
          <div className="card bg-[var(--bg-light)] mb-12">
            <h3 className="text-2xl font-bold text-center mb-8">Sponsorship Levels / 赞助等级</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="icon-award text-2xl text-gray-700"></div>
                </div>
                <h4 className="text-xl font-bold mb-2">Platinum / 白金</h4>
                <p className="text-[var(--text-secondary)]">£5,000+ annual support</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="icon-medal text-2xl text-yellow-700"></div>
                </div>
                <h4 className="text-xl font-bold mb-2">Gold / 金牌</h4>
                <p className="text-[var(--text-secondary)]">£2,500+ annual support</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="icon-star text-2xl text-gray-600"></div>
                </div>
                <h4 className="text-xl font-bold mb-2">Silver / 银牌</h4>
                <p className="text-[var(--text-secondary)]">£1,000+ annual support</p>
              </div>
            </div>
          </div>

          {/* Become a Sponsor CTA */}
          <div className="card bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Become a Sponsor / 成为赞助商</h3>
            <p className="mb-6 opacity-90">
              Partner with us to support the Chinese academic community and gain visibility among professionals in UK higher education.<br/>
              与我们合作支持华人学术社区，在英国高等教育专业人士中获得知名度。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => alert('Please contact us at ukhecea@gmail.com for partnership inquiries / 请通过 ukhecea@gmail.com 联系我们进行合作咨询')}
                className="bg-white text-[var(--primary-color)] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Partnership Inquiry / 合作咨询
              </button>
              <button 
                onClick={() => alert('Please contact us at ukhecea@gmail.com for sponsorship packages / 请通过 ukhecea@gmail.com 联系我们了解赞助方案')}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[var(--primary-color)] transition-colors"
              >
                Sponsorship Package / 赞助方案
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Sponsors component error:', error);
    return null;
  }
}