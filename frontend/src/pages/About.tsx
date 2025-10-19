import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="hero-title font-extrabold text-gray-900 mb-6">
              About <span className="text-blue-600">SportsID</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Connecting families with local sports programs and organizations to create 
              a seamless registration experience for youth athletics.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              At SportsID, we believe that every child deserves access to quality sports programs 
              that help them develop physically, mentally, and socially. Our platform bridges the 
              gap between families seeking sports opportunities and organizations providing them.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p className="text-gray-600">Promoting high-quality sports programs and coaching</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">Building stronger communities through sports</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌟</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
            <p className="text-gray-600">Making sports accessible to all families</p>
          </div>
        </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Do</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">For Families</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span>Easy program discovery and registration</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span>Centralized family management</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span>Real-time program availability</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span>Secure payment processing</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span>Mobile-friendly experience</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">For Organizations</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-3">✓</span>
                <span>Program listing and management</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3">✓</span>
                <span>Automated registration processing</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3">✓</span>
                <span>Participant communication tools</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3">✓</span>
                <span>Analytics and reporting</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3">✓</span>
                <span>API integration capabilities</span>
              </li>
            </ul>
          </div>
        </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
            <div className="text-gray-300">Active Programs</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-400 mb-2">2,500+</div>
            <div className="text-gray-300">Registered Families</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
            <div className="text-gray-300">Partner Organizations</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-400 mb-2">15+</div>
            <div className="text-gray-300">Sports Categories</div>
          </div>
        </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">👨‍💻</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Development Team</h3>
            <p className="text-gray-600">Building the technology that powers seamless sports registration</p>
          </div>
          <div className="text-center">
            <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">👩‍💼</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Partnership Team</h3>
            <p className="text-gray-600">Connecting with sports organizations and community groups</p>
          </div>
          <div className="text-center">
            <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">👨‍🏫</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sports Experts</h3>
            <p className="text-gray-600">Ensuring quality programs and best practices</p>
          </div>
        </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Safety First</h3>
            <p className="text-indigo-100">
              All programs on our platform meet strict safety standards and background check requirements.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Inclusive Environment</h3>
            <p className="text-indigo-100">
              We promote diversity and inclusion, ensuring all children feel welcome in sports.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Transparent Pricing</h3>
            <p className="text-indigo-100">
              No hidden fees or surprise costs. What you see is what you pay.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Community Focus</h3>
            <p className="text-indigo-100">
              We believe sports build stronger communities and lasting friendships.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
        <p className="text-lg text-gray-600 mb-8">
          Have questions about our platform or want to partner with us? We'd love to hear from you!
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl mb-3">📧</div>
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-gray-600">XYZ@sportsid.com</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl mb-3">📞</div>
            <h3 className="text-lg font-semibold mb-2">Phone</h3>
            <p className="text-gray-600">1-800-XXX-XXX</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl mb-3">📍</div>
            <h3 className="text-lg font-semibold mb-2">Office</h3>
            <p className="text-gray-600">123 Main St, CITY, STATE XXXXX</p>
          </div>
        </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
