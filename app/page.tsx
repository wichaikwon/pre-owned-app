import React from 'react'

const App: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center  p-8">
        <div className="bg-white shadow-lg rounded-2xl border-2 border-yellow-400 p-10 max-w-2xl text-center">
            <h1 className="text-4xl font-bold text-yellow-500 mb-4">Welcome to Our Luxurious Website</h1>
            <p className="text-lg text-gray-700 mb-6">We bring you elegance and sophistication with a touch of gold.</p>
            <button className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-white font-semibold px-8 py-3 rounded-full hover:scale-105 transform transition">Explore More</button>
        </div>
    </section>
  )
}

export default App
