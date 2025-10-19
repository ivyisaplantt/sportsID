import React from 'react';
import { Link } from 'react-router-dom';

const Features: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="hero-title font-extrabold text-gray-900 mb-6">
              Powerful <span className="text-blue-600">Features</span> for Sports Management
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Discover the comprehensive tools and features that make SportsID the ultimate platform 
              for athletes, parents, coaches, and organizations.
            </p>
            <Link 
              to="/auth" 
              className="inline-block bg-blue-600 text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">👤</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Athlete Profiles</h3>
              <p className="text-gray-600 mb-6">
                Create comprehensive athlete profiles with stats, achievements, and performance tracking. 
                Showcase your skills to coaches and scouts.
              </p>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Performance statistics
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Achievement tracking
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Video highlights
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Coach recommendations
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Family Management</h3>
              <p className="text-gray-600 mb-6">
                Manage multiple children's sports activities from one dashboard. 
                Track schedules, payments, and communications all in one place.
              </p>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Multi-child tracking
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Schedule management
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Payment processing
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Communication hub
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Coach Tools</h3>
              <p className="text-gray-600 mb-6">
                Advanced coaching tools for team management, player development, 
                and performance analysis. Build winning teams with data-driven insights.
              </p>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  Team management
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  Performance analytics
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  Practice planning
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  Player development
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Advanced <span className="text-blue-600">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for the modern sports ecosystem with cutting-edge technology and seamless integrations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-600">
                    Comprehensive performance analytics with real-time insights, 
                    trend analysis, and predictive modeling for optimal performance.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 rounded-lg p-3 mr-4">
                  <span className="text-2xl">🔗</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">API Integrations</h3>
                  <p className="text-gray-600">
                    Seamless integration with sports organizations, equipment providers, 
                    and third-party services for a unified experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 rounded-lg p-3 mr-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Security & Privacy</h3>
                  <p className="text-gray-600">
                    Enterprise-grade security with end-to-end encryption, 
                    GDPR compliance, and advanced privacy controls.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-yellow-100 rounded-lg p-3 mr-4">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile First</h3>
                  <p className="text-gray-600">
                    Native mobile experience with offline capabilities, 
                    push notifications, and real-time updates on the go.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-red-100 rounded-lg p-3 mr-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Updates</h3>
                  <p className="text-gray-600">
                    Instant notifications for game schedules, weather updates, 
                    and important announcements to keep everyone informed.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-100 rounded-lg p-3 mr-4">
                  <span className="text-2xl">🌐</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Global Network</h3>
                  <p className="text-gray-600">
                    Connect with athletes, coaches, and organizations worldwide 
                    through our extensive global sports network.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Trusted by the Sports Community</h2>
            <p className="text-xl text-blue-100">
              Join thousands of athletes, families, and organizations already using SportsID
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-200 mb-2">50K+</div>
              <div className="text-blue-100">Active Athletes</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-200 mb-2">10K+</div>
              <div className="text-blue-100">Coaches</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-200 mb-2">5K+</div>
              <div className="text-blue-100">Organizations</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-200 mb-2">100+</div>
              <div className="text-blue-100">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Sports Experience?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the SportsID community and discover how our features can enhance 
            your athletic journey, whether you're an athlete, parent, or coach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/auth" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition-colors duration-200"
            >
              Start Free Trial
            </Link>
            <Link 
              to="/about" 
              className="bg-gray-200 text-gray-800 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-300 transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
