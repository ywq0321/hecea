function Donation({ user }) {
  try {
    const donationMethods = [
      {
        title: 'Bank Transfer / 银行转账',
        description: 'Direct bank transfer to HECEA account',
        icon: 'credit-card',
        details: [
          'Account Name: HECEA',
          'Sort Code: 23-05-80',
          'Account Number: 51094987',
          'Reference: Your Name + Donation'
        ]
      },
      {
        title: 'PayPal',
        description: 'Secure online payment via PayPal',
        icon: 'smartphone',
        details: [
          'PayPal Email: ukhecea@gmail.com',
          'Accepts all major credit cards',
          'Instant confirmation',

          'Secure encrypted transactions'
        ]
      },

    ];

    const donationTiers = [
      { amount: '£25', benefit: 'Bronze Supporter / 铜牌支持者' },
      { amount: '£50', benefit: 'Silver Supporter / 银牌支持者' },
      { amount: '£100', benefit: 'Gold Supporter / 金牌支持者' },
      { amount: 'Custom', benefit: 'Your Choice / 自定义金额' }
    ];

    return (
      <section id="donation" className="section-padding bg-[var(--bg-light)]" data-name="donation" data-file="components/Donation.js">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6">Support Our Mission / 支持我们的使命</h2>
            <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Your generous donations help us continue supporting Chinese professionals in UK higher education through our programs and services.<br/>
              您的慷慨捐赠帮助我们继续通过我们的项目和服务支持英国高等教育界的华人专业人士。
            </p>
          </div>

          {/* Donation Impact */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="card text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="icon-users text-2xl text-white"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">Professional Support / 专业支持</h3>
              <p className="text-[var(--text-secondary)]">Fund career development workshops and mentorship programs</p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="icon-shield-check text-2xl text-white"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">Legal Assistance / 法律援助</h3>
              <p className="text-[var(--text-secondary)]">Provide workplace rights protection and legal guidance</p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="icon-book-open text-2xl text-white"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">Research Collaboration / 研究合作</h3>
              <p className="text-[var(--text-secondary)]">Facilitate academic partnerships and conferences</p>
            </div>
          </div>

          {/* Donation Tiers */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Donation Levels / 捐赠等级</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {donationTiers.map((tier, index) => (
                <div key={index} className="card text-center hover:scale-105 transition-transform">
                  <div className="text-2xl font-bold text-[var(--primary-color)] mb-2">{tier.amount}</div>
                  <p className="text-[var(--text-secondary)]">{tier.benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Donation Methods */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-8">Donation Methods / 捐赠方式</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {donationMethods.map((method, index) => (
                <div key={index} className="card">
                  <div className="w-12 h-12 bg-[var(--primary-light)] rounded-lg flex items-center justify-center mb-4">
                    <div className={`icon-${method.icon} text-xl text-[var(--primary-color)]`}></div>
                  </div>
                  <h4 className="text-xl font-bold mb-3">{method.title}</h4>
                  <p className="text-[var(--text-secondary)] mb-4">{method.description}</p>
                  <ul className="space-y-2 text-sm">
                    {method.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="icon-check text-sm text-green-600 mr-2"></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="card bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Make a Difference Today / 今天就做出改变</h3>
            <p className="mb-6 opacity-90">
              Every donation, no matter the size, helps us build a stronger community for Chinese professionals in UK higher education.<br/>
              每一笔捐赠，无论金额大小，都能帮助我们为英国高等教育界的华人专业人士建设更强大的社区。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => alert('Please contact us at ukhecea@gmail.com for donation information / 请通过 ukhecea@gmail.com 联系我们获取捐赠信息')}
                className="bg-white text-[var(--primary-color)] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Donate Now / 立即捐赠
              </button>
              <a href="about.html" className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[var(--primary-color)] transition-colors">
                Learn More / 了解更多
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Donation component error:', error);
    return null;
  }
}