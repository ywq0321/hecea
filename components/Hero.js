function Hero({ user, onLogin }) {
  try {
    return (
      <section 
        id="home" 
        className="section-padding relative bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: 'url(assets/6880d8cf-fe7f-4ffc-bd18-6d25cd14f635.jpeg)'
        }}
        data-name="hero" 
        data-file="components/Hero.js"
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {user ? (
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 text-white">
                    Welcome back / 欢迎回来, <span className="text-yellow-300">{user.name}</span>
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-8">
                    Thank you for being part of our professional community. Access your exclusive member resources and connect with fellow academics.<br/>
                    感谢您成为我们专业社区的一员。访问您的专属会员资源并与学者同仁建立联系。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
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
                      Access Member Area / 访问会员专区
                    </button>
                    <a href="about.html" className="btn-secondary bg-white text-[var(--primary-color)] hover:bg-gray-100 text-center block">
                      View My Profile / 查看我的资料
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 text-white">
                    Empowering Chinese <span className="text-yellow-300">Academics</span> in the UK<br/>
                    <span className="text-2xl sm:text-3xl lg:text-4xl">赋能在英<span className="text-yellow-300">华人学者</span></span>
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-8">
                    Join HECEA to connect with fellow Chinese professionals in UK higher education, advance your career, and build lasting professional relationships.<br/>
                    加入HECEA，与英国高等教育界的华人专业人士建立联系，推进职业发展，建立持久的专业关系。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={onLogin}
                      className="btn-primary"
                    >
                      Become a Member / 成为会员
                    </button>
                    <a 
                      href="about.html"
                      className="btn-secondary bg-white text-[var(--primary-color)] hover:bg-gray-100 text-center block"
                    >
                      Learn More / 了解更多
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative hidden lg:block">
              <div className="relative z-10">
                <img 
                  src="assets/6880d8cf-fe7f-4ffc-bd18-6d25cd14f635.jpeg" 
                  alt="Professional academic staff group meeting"
                  className="rounded-2xl shadow-2xl"
                />
                {/* HECEA Logo Overlay */}
                <div className="absolute top-6 right-6 w-24 h-24 flex items-center justify-center">
                  <img 
                    src="assets/e84e37d2-3309-40d2-a20e-e91f7e504a5f.png" 
                    alt="HECEA Logo"
                    className="w-20 h-20 object-contain drop-shadow-lg"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-[var(--primary-light)] rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}