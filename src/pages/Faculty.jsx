import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import InteractiveBackground from '../components/dashboard/InteractiveBackground';

const FACULTY_DATA = [
  {
    "name": "Prof. Ajay Batish",
    "role": "Pro Vice-Chancellor",
    "email": "abatish@thapar.edu",
    "image": "https://www.thapar.edu/webroot/files/faculty/142/1507630396142.jpg"
  },
  {
    "name": "Dr. R.K. Duvedi",
    "role": "Associate Dean ELC",
    "email": "rduvedi@thapar.edu",
    "image": "https://www.thapar.edu/webroot/files/faculty/467/1536292636467.jpg"
  },
  {
    "name": "Dr. Sharad Saxena",
    "role": "Coordinator",
    "email": "sharad.saxena@thapar.edu",
    "image": "https://www.thapar.edu/webroot/files/faculty/315/1505900307315.jpg"
  },
  {
    "name": "Dr. V. P. Singh",
    "role": "Associate Professor",
    "email": "vpsingh@thapar.edu",
    "image": "https://www.thapar.edu/webroot/files/faculty/153/1501236861153.jpg"
  },
  {
    "name": "Dr. Anil Arora",
    "role": "Assistant Professor",
    "email": "anil.arora@thapar.edu",
    "image": "https://www.thapar.edu/webroot/files/faculty/270/1508226424270.jpg"
  },
  {
    "name": "Dr. Bikramjit Sharma",
    "role": "Assistant Professor",
    "email": "bikramjit@thapar.edu",
    "image": "https://www.thapar.edu/webroot/files/faculty/225/1507903588225.jpg"
  },
  {
    "name": "Dr. Himanshu Chawla",
    "role": "Assistant Professor",
    "email": "himashu.chawla@thapar.edu",
    "image": "https://www.thapar.edu/webroot/files/faculty/489/1550205814489.jpg"
  },
  {
    "name": "Dr. Nirbhow Jap Singh",
    "role": "Assistant Professor",
    "email": "nirbhow@gmail.com",
    "image": "https://www.thapar.edu/webroot/files/faculty/295/1507874007295.png"
  },
  {
    "name": "Dr. Raman Kumar Goyal",
    "role": "Assistant Professor",
    "email": "ramankumar.goyal@thapar.edu",
    "image": "https://www.thapar.edu/webroot/files/faculty/406/1533900222406.jpg"
  },
  {
    "name": "Dr. Vikas Handa",
    "role": "Assistant Professor",
    "email": "vikas.handa@thapar.edu",
    "image": "https://www.thapar.edu/webroot/files/faculty/119/1500985895119.png"
  },
  {
    "name": "Dr. Vivek Sethi",
    "role": "Assistant Professor",
    "email": "vivek.sethi@thapar.edu",
    "image": "https://www.thapar.edu/webroot/files/faculty/553/1730180215553.jpg"
  }
];

const FacultyCard = ({ person, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
    className="group relative w-full h-[400px] rounded-[32px] overflow-hidden bg-[rgba(15,20,35,0.7)] border border-[rgba(255,255,255,0.1)] shadow-2xl backdrop-blur-xl"
  >
    {/* Inner Image with Parallax Hover */}
    <div className="absolute inset-0 w-full h-full">
      <img 
        src={person.image} 
        alt={person.name} 
        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-100 saturate-105"
        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop'; }} // Fallback
      />
      {/* Soft gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80 pointer-events-none" />
    </div>

    {/* Content Container */}
    <div className="absolute inset-0 flex flex-col justify-end p-8 z-10 pointer-events-none">
      <div className="transform transition-transform duration-500 group-hover:-translate-y-2 pointer-events-auto">
        <h3 className="text-2xl font-black text-white tracking-tight mb-1 drop-shadow-md">
          {person.name}
        </h3>
        <p className="text-[#14D8FF] text-xs font-bold tracking-[0.2em] uppercase mb-6 drop-shadow-md">
          {person.role}
        </p>

        {/* Action Button (Email) */}
        <a 
          href={`mailto:${person.email}`}
          className="flex items-center gap-3 w-fit p-3 pr-5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 shadow-xl"
        >
          <div className="w-8 h-8 rounded-full bg-[#14D8FF] flex items-center justify-center text-[#03040D] shadow-[0_0_10px_#14D8FF]">
            <Mail size={14} />
          </div>
          <span className="text-white text-[11px] font-bold tracking-wider">
            {person.email}
          </span>
        </a>
      </div>
    </div>
  </motion.div>
);

const Faculty = () => {
  return (
    <div className="relative w-screen min-h-screen text-white font-sans overflow-x-hidden selection:bg-[#14D8FF]/30">
      
      {/* 3D Background */}
      <InteractiveBackground />

      {/* Header */}
      <header className="relative z-10 w-full px-12 pt-16 pb-8 flex items-start justify-between">
        <div className="flex flex-col gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-all group w-fit">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Return to Root</span>
          </Link>
          
          <div className="mt-2">
            <h1 className="text-5xl md:text-6xl font-light tracking-[0.1em] text-white flex items-center gap-2">
              ELC<span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#14D8FF] to-[#FF3CF8]">FACULTY</span>
            </h1>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-[1px] bg-white/20" />
              <h2 className="text-[11px] font-semibold tracking-[0.5em] uppercase text-white/50">
                Experiential Learning Centre Innovators
              </h2>
            </div>
          </div>
        </div>
      </header>

      {/* Faculty Grid */}
      <main className="relative z-10 w-full max-w-[1500px] mx-auto px-12 pb-32 pt-10">
        <div className="grid grid-cols-1 landscape:md:grid-cols-2 landscape:lg:grid-cols-3 landscape:xl:grid-cols-4 portrait:sm:grid-cols-2 gap-8">
          {FACULTY_DATA.map((person, i) => (
            <FacultyCard key={i} person={person} index={i} />
          ))}
        </div>
      </main>

    </div>
  );
};

export default Faculty;
