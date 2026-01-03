
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <>
      {/* React 19 hoists these tags to the <head> automatically */}
      <title>Home | Netlify React Professional Boilerplate</title>
      <meta name="description" content="Welcome to the best React boilerplate optimized for Netlify with Vite, TypeScript and Tailwind." />

      <div className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
            <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Modern Web Development</span>{' '}
                  <span className="block text-primary-600 xl:inline">Made Simple for Netlify</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                  Deploy faster, scale better, and build with confidence using this optimized structure. Includes everything you need to start your next professional project.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-8 py-3 text-base font-medium text-white hover:bg-primary-700 md:py-4 md:px-10 md:text-lg"
                    >
                      Get Started
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-100 px-8 py-3 text-base font-medium text-primary-700 hover:bg-primary-200 md:py-4 md:px-10 md:text-lg"
                    >
                      Documentation
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
            src="https://picsum.photos/1200/800"
            alt="Productivity background"
          />
        </div>
      </div>

      <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="prose prose-blue lg:prose-xl mx-auto text-center mb-12">
            <h2>Why choose this stack?</h2>
            <p>Built with performance and SEO in mind, using the latest industry standards.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Vite Speed', desc: 'Lightning fast hot module replacement and builds.' },
              { title: 'TypeScript', desc: 'Type-safe code for better maintenance and fewer bugs.' },
              { title: 'Tailwind CSS', desc: 'Utility-first styling for beautiful responsive designs.' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-2 text-primary-600">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
