import {Container} from '../components' ;

const About = () => {
  return (
    <Container>
      <div className="py-12 md:py-20">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            About Unhide Nepal
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Celebrating the hidden corners of Nepal, one meaningful discovery at a time.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16 md:px-10 sm:px-3 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              The Idea Behind Unhide Nepal
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              While traveling across different countries, I was always inspired by the way
              places are shared with the world. Locals, travelers, and storytellers proudly
              highlight their landscapes, culture, and everyday moments in ways that invite
              others in.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Coming back to Nepal, I realized how many beautiful, unique, and truly
              breathtaking places still live quietly in the background-unknown to many
              travelers and even to people who live here. Small villages, hidden trails,
              calm lakes, local cafés, and viewpoints that never make it into typical
              guidebooks.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Unhide Nepal was created to change that. It’s a simple, welcoming space where
              anyone can share their favorite hidden gems, local treasures, and
              off-the-beaten-path destinations-so more people can experience the many sides
              of Nepal, not just the famous ones.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg">
            <p className="text-gray-700 italic text-lg mb-4">
              “Nepal is more than a single mountain or a single destination. It’s a collection
              of countless stories, landscapes, and communities waiting to be discovered.”
            </p>
            <p className="text-gray-600">
              Every place matters. Every story matters. And every traveler deserves the chance
              to experience the Nepal that locals know and love.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-16 bg-gray-50 text-gray-900 p-8 md:p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            The mission of Unhide Nepal is to make discovering new places in Nepal feel
            simple, inspiring, and authentic. It connects travelers with lesser-known
            destinations, local insights, and real experiences-beyond the typical routes
            and checklist attractions. Every place has a story, and this platform exists to
            help those stories be seen and shared.
          </p>
        </div>

        {/* What We Do Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
            What Makes Unhide Nepal Different
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Community-Driven Discovery
              </h3>
              <p className="text-gray-700">
                Places are shared by the people who know them best. Genuine recommendations,
                personal memories, and helpful tips from travelers and locals-no polished
                slogans, just real experiences.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Hidden Gems Highlighted
              </h3>
              <p className="text-gray-700">
                Go beyond the usual tourist spots. Discover quiet villages, scenic walks,
                peaceful viewpoints, and unique local spaces that make a trip feel truly
                memorable and personal.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Easier Travel Planning
              </h3>
              <p className="text-gray-700">
                Find key details about each place in one spot-location, photos, notes,
                and insights from others-so you can plan your journey with more confidence
                and curiosity.
              </p>
            </div>
          </div>
        </div>

        {/* Connect Section */}
        <div className="text-center bg-gray-50 p-8 md:p-12 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Let&apos;s Connect
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Have ideas, suggestions, or a hidden gem you&apos;d like to share? You&apos;re
            always welcome to reach out and be part of this journey of discovering and
            celebrating Nepal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://github.com/Rishi-Rijal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.007 12.007 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Check My GitHub
            </a>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 italic">
            Join the journey of unhiding Nepal. Every place has a story-let&apos;s help them be seen.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default About;
