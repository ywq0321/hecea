function Impact({ user }) {
  try {
    const testimonials = [
      {
        name: 'Maria Santos',
        role: 'Teacher, Rural School Program',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        quote: 'Hope Foundation transformed our community by building our school. Now 200 children have access to quality education.'
      },
      {
        name: 'Dr. James Wilson',
        role: 'Mobile Clinic Director',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        quote: 'The mobile clinic program has helped us reach remote villages and provide essential healthcare to thousands.'
      },
      {
        name: 'Sarah Johnson',
        role: 'Community Leader',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        quote: 'The clean water project changed everything. Our children are healthier and our community is thriving.'
      }
    ];

    return (
      <section id="impact" className="section-padding bg-white" data-name="impact" data-file="components/Impact.js">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Our Impact</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Real stories from the communities we serve and the lasting change we're creating together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-[var(--text-secondary)]">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-[var(--text-secondary)] italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>

          {user && (
            <div className="card bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white mb-12">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Member Impact Dashboard</h3>
                <p className="mb-6 opacity-90">
                  Track your contributions and see the direct impact of your support through detailed reports and real-time updates.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">$1,250</div>
                    <div className="text-sm opacity-80">Your Total Contributions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">45</div>
                    <div className="text-sm opacity-80">Lives Directly Impacted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">3</div>
                    <div className="text-sm opacity-80">Projects Supported</div>
                  </div>
                </div>
                <a href="members.html" className="inline-block bg-white text-[var(--primary-color)] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  View Full Impact Report
                </a>
              </div>
            </div>
          )}

          <div className="text-center">
            <div className="card bg-[var(--bg-light)] max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
              <p className="text-[var(--text-secondary)] mb-8">
                Together, we can create lasting change in communities around the world. Your support helps us expand our programs and reach more people in need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary">
                  Donate Now
                </button>
                <button className="btn-secondary">
                  Become a Volunteer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Impact component error:', error);
    return null;
  }
}
