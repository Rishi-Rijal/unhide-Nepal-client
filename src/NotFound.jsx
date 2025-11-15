import { useNavigate } from 'react-router-dom';
import Container from './Components/Container/Container';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="py-12 md:py-20 flex flex-col items-center justify-center min-h-[60vh]">
        {/* 404 Visual */}
        <div className="text-center mb-8">
          <div className="text-9xl md:text-[150px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500 mb-4">
            404
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The place you're looking for doesn't exist on our map yet. But don't worry - there are plenty of hidden gems to explore!
          </p>
        </div>

        {/* Suggested Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="p-6 bg-slate-50 rounded-lg text-center hover:shadow-md transition">
            <div className="text-4xl mb-3">🏠</div>
            <h3 className="font-semibold text-gray-900 mb-2">Go Home</h3>
            <p className="text-sm text-gray-600 mb-4">
              Head back to the homepage and discover amazing places.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition text-sm"
            >
              Home
            </button>
          </div>

          <div className="p-6 bg-slate-50 rounded-lg text-center hover:shadow-md transition">
            <div className="text-4xl mb-3">🗺️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Explore</h3>
            <p className="text-sm text-gray-600 mb-4">
              Check out hidden gems and lesser-known destinations.
            </p>
            <button
              onClick={() => navigate('/Explore')}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition text-sm"
            >
              Explore
            </button>
          </div>

          <div className="p-6 bg-slate-50 rounded-lg text-center hover:shadow-md transition">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
            <p className="text-sm text-gray-600 mb-4">
              Found a broken link? Let me know!
            </p>
            <button
              onClick={() => navigate('/Contact')}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition text-sm"
            >
              Contact
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 italic">
            "Every journey has a wrong turn now and then. Let's find your next adventure!" 🌍
          </p>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;
