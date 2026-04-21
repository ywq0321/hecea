function Footer() {
  try {
    return (
      <footer className="bg-[var(--text-primary)] text-white section-padding" data-name="footer" data-file="components/Footer.js">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 mr-3">
                  <img 
                    src="assets/e84e37d2-3309-40d2-a20e-e91f7e504a5f.png" 
                    alt="HECEA Logo"
                    className="w-full h-full object-contain filter brightness-0 invert"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold">HECEA</span>
                  <span className="text-sm text-gray-400">UK Higher Education Chinese Employees Association</span>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Supporting Chinese professionals in UK higher education through networking, career development, and community building.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links / 快速链接</h4>
              <ul className="space-y-2">
                <li><a href="index.html#home" className="text-gray-300 hover:text-white transition-colors">Home / 首页</a></li>
                <li><a href="about.html" className="text-gray-300 hover:text-white transition-colors">About / 关于我们</a></li>
                <li><a href="index.html#services" className="text-gray-300 hover:text-white transition-colors">Services / 服务</a></li>
                <li><a href="index.html#community" className="text-gray-300 hover:text-white transition-colors">Community / 社区</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services / 服务</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-300">Workplace Rights Protection / 工作权利维护</span></li>
                <li><span className="text-gray-300">Career & Holistic Development / 职业及全人发展</span></li>
                <li><span className="text-gray-300">Academic Dynamics & Research Collaboration / 学界动态及研究合作</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info / 联系信息</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="icon-mail text-lg mr-3 text-[var(--primary-color)]"></div>
                  <span className="text-gray-300">ukhecea@gmail.com</span>
                </div>

                <div className="flex items-center">
                  <div className="icon-map-pin text-lg mr-3 text-[var(--primary-color)]"></div>
                  <span className="text-gray-300">London, United Kingdom / 英国伦敦</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-300">
              © 2024 HECEA. All rights reserved. Empowering Chinese academics in UK higher education.<br/>
              版权所有。赋能英国高等教育界的华人学者。
            </p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}