import React, { Fragment } from 'react'
import Homepage from './components/client/Homepage'

const App: React.FC = () => {
  return (
    <Fragment>
      <Homepage />
      <section className="flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl rounded-2xl border-2 border-yellow-400 bg-white p-10 text-center shadow-lg">
          <h1 className="mb-4 text-4xl font-bold text-yellow-500">Welcome to Our Luxurious Website</h1>
          <p className="mb-6 text-lg text-gray-700">We bring you elegance and sophistication with a touch of gold.</p>
          <button className="transform rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-8 py-3 font-semibold text-white transition hover:scale-105">
            Explore More
          </button>
        </div>
      </section>
    </Fragment>
  )
}

export default App
