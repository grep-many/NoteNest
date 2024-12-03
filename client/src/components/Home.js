import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import darkModeContext from '../context/darkMode/darkModeContext';
import feature1 from '../assets/feature-1.jpg'
import feature2 from '../assets/feature-2.jpg'
import feature3 from '../assets/feature-3.jpeg'

function Home() {
  const {isDarkMode} = useContext(darkModeContext);
  return (
    <div className="font-sans">
      <Header isDarkMode={isDarkMode}/>
      <Main isDarkMode={isDarkMode}/>
    </div>
  );

  function Main({isDarkMode}) {
    return (
      <main>
        <Features isDarkMode={isDarkMode}/>
        <HowItWorks isDarkMode={isDarkMode}/>
        <WhyChooseUs isDarkMode={isDarkMode}/>
        <Testimonials isDarkMode={isDarkMode}/>
      </main>
    );
  }
}

function Header({isDarkMode}) {

  return (
    <header
      className={`${isDarkMode ? 'bg-black text-white border-white' : 'bg-white text-dark border-dark'} border-bottom text-center py-5`}
    >
      <h1 className="fs-1 mb-3">Welcome to Notes App</h1>
      <p>Organize your tasks, ideas, and projects effortlessly!</p>
      <Link to="/login" className={`m-1 btn border-${isDarkMode ? 'white btn-outline-light' : 'black btn-outline-dark'}`}>Login</Link>
      <Link to="/signup" className={`m-1 btn border-${isDarkMode ? 'white btn-outline-light' : 'black btn-outline-dark'}`}>Sign Up</Link>
    </header>
  );
}

function Features({isDarkMode}) {
  return (
    <section className={`${isDarkMode ? 'bg-black text-white border-white' : 'bg-white text-dark border-dark'} border-bottom text-center py-4`}>
      <h2 className="text-center mb-5 fs-2">Features</h2>
      <div className="container">
        <div className="row g-4">
          <FeatureCard
            imgSrc={feature1}
            title="Stay Organized"
            description="Keep all your notes and tasks in one place."
            isDarkMode={isDarkMode}
          />
          <FeatureCard
            imgSrc={feature2}
            title="Collaborate Easily"
            description="Share notes with friends or colleagues."
            isDarkMode={isDarkMode}
          />
          <FeatureCard
            imgSrc={feature3}
            title="Access Anywhere"
            description="Access your notes on any device, anytime."
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ imgSrc, title, description ,isDarkMode}) {
  return (
    <div className="col-12 col-md-4">
      <div className={`${isDarkMode ? 'bg-black text-white shadow-light border-white border' : 'bg-white text-dark shadow border-black border'} rounded-3 p-4 text-center`}>
        <img
          src={imgSrc}
          alt={title}
          className="rounded-3 w-100"
          style={{
            height: '200px',
            objectFit: 'cover',
          }}
        />
        <h3 className="mt-3">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}


function HowItWorks({isDarkMode}) {
  return (
    <section className={`${isDarkMode ? 'bg-black text-white border-white' : 'bg-white text-dark border-dark'} border-bottom text-center py-5`}>
      <h2 className="text-center fs-2 mb-5">How It Works</h2>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        <Step number={1} description="Sign up and log in to get started." isDarkMode={isDarkMode}/>
        <Step number={2} description="Create, organize, and manage your notes." isDarkMode={isDarkMode}/>
        <Step number={3} description="Collaborate and track your progress." isDarkMode={isDarkMode}/>
      </div>
    </section>
  );
}

function Step({ number, description ,isDarkMode}) {
  return (
    <div className={`${isDarkMode ? 'bg-black text-white shadow-light border-white border' : 'bg-white text-dark shadow border-black border'} rounded-3 p-4 text-center`} style={{ maxWidth: '250px' }}>
      <h3>Step {number}</h3>
      <p>{description}</p>
    </div>
  );
}

function WhyChooseUs({isDarkMode}) {
  return (
    <section className={`${isDarkMode ? 'bg-black text-white border-white' : 'bg-white text-dark border-dark'} border-bottom text-center py-5`}>
      <h2 className="text-center mb-5">Why Choose Us</h2>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        <WhyChooseItem
          title="Simple & Intuitive"
          description="Easy-to-use interface for everyone."
          isDarkMode={isDarkMode}
        />
        <WhyChooseItem
          title="Secure & Reliable"
          description="Your data is safe and encrypted."
          isDarkMode={isDarkMode}
        />
        <WhyChooseItem
          title="24/7 Support"
          description="We’re always here to help."
          isDarkMode={isDarkMode}
        />
      </div>
    </section>
  );
}

function WhyChooseItem({ title, description ,isDarkMode}) {
  return (
    <div className={`${isDarkMode ? 'bg-black text-white shadow-light border-white border' : 'bg-white text-dark shadow border-black border'} rounded-3 p-4 text-center`} style={{ maxWidth: '300px' }}>
      <h3 className="mb-3">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Testimonials({isDarkMode}) {
  return (
    <section className="p-4">
      <h2 className="text-center mb-5">What Our Users Say</h2>
      <div className="d-flex flex-column flex-md-row justify-content-center gap-4">
        <TestimonialCard
          imgSrc="https://via.placeholder.com/300x150?text=User1"
          name="Jane Doe"
          feedback="This app changed how I organize my life!"
          isDarkMode={isDarkMode}
        />
        <TestimonialCard
          imgSrc="https://via.placeholder.com/300x150?text=User2"
          name="John Smith"
          feedback="Collaboration has never been easier."
          isDarkMode={isDarkMode}
        />
        <TestimonialCard
          imgSrc="https://via.placeholder.com/300x150?text=User3"
          name="Emily Clark"
          feedback="I love the seamless synchronization."
          isDarkMode={isDarkMode}
        />
      </div>
    </section>
  );
}

function TestimonialCard({ imgSrc, name, feedback ,isDarkMode}) {
  return (
    <div className={`${isDarkMode ? 'bg-black text-white shadow-light border-white border' : 'bg-white text-dark shadow border-black border'} rounded-3 p-4 text-center col-12 col-md-4`}>
      <img
        src={imgSrc}
        alt={name}
        className="rounded-3 w-100 h-auto"
      />
      <h3>{name}</h3>
      <p>"{feedback}"</p>
    </div>
  );
}

export default Home;
