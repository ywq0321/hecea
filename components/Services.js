function Services({ user }) {
  try {
    const services = [
      {
        title: 'Workplace Rights Protection / 工作权利维护',
        description: 'Provide legal guidance, advocacy, and support for workplace rights and employment issues facing Chinese professionals in UK higher education. / 为英国高等教育领域华人专业人士面临的工作权利和就业问题提供法律指导、倡导和支持。',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        icon: 'shield-check',
        members: '100+ cases supported / 100+案例支持',
        events: '6+ legal workshops / 6+法律研讨会'
      },
      {
        title: 'Career & Holistic Development / 职业及全人发展',
        description: 'Comprehensive support for professional growth and personal development, including leadership training, work-life balance, and holistic wellness programs. / 全面支持专业成长和个人发展，包括领导力培训、工作生活平衡和整体健康计划。',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        icon: 'star',
        members: '120+ participants / 120+参与者',
        events: '10+ development programs / 10+发展项目'
      },
      {
        title: 'Academic Dynamics & Research Collaboration / 学界动态及研究合作',
        description: 'Facilitate research partnerships and academic collaborations between Chinese scholars and UK institutions, while keeping members informed of academic developments. / 促进华人学者与英国机构之间的研究伙伴关系和学术合作，同时让会员了解学界动态。',
        image: 'https://images.unsplash.com/photo-1553484771-cc0d9b8c2b33?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        icon: 'book-open',
        members: '150+ researchers / 150+研究人员',
        events: '8+ conferences / 8+会议'
      }
    ];

    return (
      <section id="services" className="section-padding bg-[var(--bg-light)]" data-name="services" data-file="components/Services.js">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6">Our Services / 我们的服务</h2>
            <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Discover how HECEA supports Chinese professionals in UK higher education through comprehensive services designed to advance careers and foster community.<br/>
              了解HECEA如何通过旨在推进职业发展和促进社区建设的综合服务来支持英国高等教育界的华人专业人士。
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card group hover:scale-105 transition-transform duration-200 h-full">
                <div className="relative mb-6">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-4 left-4 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className={`icon-${service.icon} text-2xl text-[var(--primary-color)]`}></div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-[var(--text-secondary)] mb-4 flex-grow">{service.description}</p>
                

                
                <a 
                  href={index === 0 ? 'workplace-rights.html' : index === 1 ? 'career-development.html' : 'research-collaboration.html'} 
                  className="btn-secondary w-full group-hover:bg-[var(--primary-color)] group-hover:text-white text-center block"
                >
                  Learn More / 了解更多
                </a>
              </div>
            ))}
          </div>


        </div>
      </section>
    );
  } catch (error) {
    console.error('Services component error:', error);
    return null;
  }
}