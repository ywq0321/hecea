function Programs({ user }) {
  try {
    const programs = [
      {
        title: 'Education Initiative',
        description: 'Building schools and providing quality education to children in rural communities.',
        image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        icon: 'book-open',
        beneficiaries: '2,500+ students',
        locations: '12 communities'
      },
      {
        title: 'Healthcare Outreach',
        description: 'Mobile clinics and health education programs bringing care to remote areas.',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        icon: 'heart-pulse',
        beneficiaries: '5,000+ patients',
        locations: '8 regions'
      },
      {
        title: 'Clean Water Project',
        description: 'Installing wells and water purification systems in underserved communities.',
        image: 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        icon: 'droplets',
        beneficiaries: '3,200+ people',
        locations: '15 villages'
      }
    ];

    return (
      <section id="programs" className="section-padding bg-[var(--bg-light)]" data-name="programs" data-file="components/Programs.js">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Our Programs</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Discover how we're making a difference through targeted programs designed to address the most pressing needs in communities worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div key={index} className="card group hover:scale-105 transition-transform duration-200">
                <div className="relative mb-6">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className={`icon-${program.icon} text-xl text-[var(--primary-color)]`}></div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                <p className="text-[var(--text-secondary)] mb-4">{program.description}</p>
                
                {user && (
                  <div className="space-y-2 mb-4 p-3 bg-[var(--primary-light)] rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Beneficiaries:</span>
                      <span className="font-semibold text-[var(--primary-color)]">{program.beneficiaries}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Locations:</span>
                      <span className="font-semibold text-[var(--primary-color)]">{program.locations}</span>
                    </div>
                  </div>
                )}
                
                <button className="btn-secondary w-full group-hover:bg-[var(--primary-color)] group-hover:text-white">
                  Learn More
                </button>
              </div>
            ))}
          </div>

          {!user && (
            <div className="text-center mt-12">
              <div className="card bg-white max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-[var(--primary-color)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="icon-lock text-2xl text-white"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Unlock Detailed Program Information</h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  Join as a member to access detailed impact metrics, progress reports, and exclusive updates from our field teams.
                </p>
                <button className="btn-primary">
                  Become a Member
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Programs component error:', error);
    return null;
  }
}