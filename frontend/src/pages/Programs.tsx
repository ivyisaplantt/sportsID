import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Program {
  id: number;
  name: string;
  age_range: string;
  price: number;
  location: string;
  description?: string;
  sport_type?: string;
  organization?: string;
}

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/programs')
      .then((res) => res.json())
      .then((data) => {
        setPrograms(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching programs:', error);
        setLoading(false);
      });
  }, []);

  const filteredPrograms = programs.filter(program => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = selectedSport === 'all' || program.sport_type === selectedSport;
    const matchesAge = selectedAge === 'all' || program.age_range === selectedAge;

    return matchesSearch && matchesSport && matchesAge;
  });

  const sportTypes = ['all', ...Array.from(new Set(programs.map(p => p.sport_type).filter(Boolean)))];
  const ageRanges = ['all', ...Array.from(new Set(programs.map(p => p.age_range).filter(Boolean)))];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="hero-title font-extrabold text-gray-900 mb-6">
              Sports <span className="text-blue-600">Programs</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Discover amazing sports programs for your children. From soccer to swimming, 
              basketball to baseball, find the perfect program to help your child grow and thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Programs
                </label>
                <input
                  type="text"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Sport Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sport Type
                </label>
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sportTypes.map(sport => (
                    <option key={sport} value={sport}>
                      {sport === 'all' ? 'All Sports' : sport}
                    </option>
                  ))}
                </select>
              </div>

              {/* Age Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Range
                </label>
                <select
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {ageRanges.map(age => (
                    <option key={age} value={age}>
                      {age === 'all' ? 'All Ages' : age}
                    </option>
                  ))}
                </select>
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <div className="text-sm text-gray-600">
                  {filteredPrograms.length} program{filteredPrograms.length !== 1 ? 's' : ''} found
                </div>
              </div>
            </div>
          </div>        
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPrograms.map((program) => (
              <div key={program.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{program.name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {program.sport_type || 'Sports'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">👥</span>
                      <span>Ages: {program.age_range}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📍</span>
                      <span>{program.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">💰</span>
                      <span>${program.price}</span>
                    </div>
                    {program.organization && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">🏢</span>
                        <span>{program.organization}</span>
                      </div>
                    )}
                  </div>

                  {program.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {program.description}
                    </p>
                  )}

                  <div className="flex space-x-3">
                    <Link 
                      to={`/programs/${program.id}`} 
                      className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                      View Details
                    </Link>
                    <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No programs found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters to find more programs.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSport('all');
                  setSelectedAge('all');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Sports Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Popular Sports</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">⚽</div>
              <h3 className="text-lg font-semibold mb-2">Soccer</h3>
              <p className="text-blue-100 text-sm">Build teamwork and endurance</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🏀</div>
              <h3 className="text-lg font-semibold mb-2">Basketball</h3>
              <p className="text-blue-100 text-sm">Develop coordination and strategy</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🏊</div>
              <h3 className="text-lg font-semibold mb-2">Swimming</h3>
              <p className="text-blue-100 text-sm">Build strength and confidence</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⚾</div>
              <h3 className="text-lg font-semibold mb-2">Baseball</h3>
              <p className="text-blue-100 text-sm">Learn focus and precision</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Programs</h3>
              <p className="text-gray-600">
                All programs are vetted for safety, quality coaching, and age-appropriate activities.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Registration</h3>
              <p className="text-gray-600">
                Simple online registration process with secure payment and instant confirmation.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Family Focused</h3>
              <p className="text-gray-600">
                Manage multiple children's registrations from one convenient dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6">
              Join thousands of families who trust SportsID for their children's sports journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/auth" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Create Account
              </Link>
              <Link 
                to="/about" 
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
