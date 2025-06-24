import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search } from 'lucide-react';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Coverage = () => {
  const [districts, setDistricts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    fetch('/districts.json')
      .then(res => res.json())
      .then(data => setDistricts(data));
  }, []);

  const filteredDistricts = districts.filter(item =>
    item.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-slate-900 dark:to-slate-800 py-12 px-5 transition-colors duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-purple-700 dark:text-purple-300 mb-12"
      >
        We Are Available In 64 Districts
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex justify-center mb-12"
      >
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Search district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-4 w-full shadow-lg rounded-full border-2 border-purple-300 dark:border-purple-500 focus:ring-4 focus:ring-purple-200 dark:bg-slate-700 dark:text-white focus:outline-none text-lg"
          />
          <Search className="absolute top-4 left-4 text-purple-400" size={24} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {filteredDistricts.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-slate-700 shadow-2xl rounded-xl p-6 border-2 border-purple-300 dark:border-purple-500 transition-all duration-500 cursor-pointer hover:shadow-purple-300"
            onClick={() => setSelectedDistrict(item)}
          >
            <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-2">{item.district}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1"><b>Region:</b> {item.region}</p>
            <p className="text-sm text-gray-700 dark:text-gray-200"><b>Covered Areas:</b> {item.covered_area.join(', ')}</p>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedDistrict && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, y: -100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 100 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 w-full max-w-5xl h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelectedDistrict(null)}
                className="absolute top-5 right-6 text-red-500 text-4xl font-bold hover:scale-110 transition-transform"
              >
                &times;
              </button>

              <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-4">
                {selectedDistrict.district}
              </h2>
              <p className="mb-2 text-gray-600 dark:text-gray-300"><b>Region:</b> {selectedDistrict.region}</p>
              <p className="mb-2 text-gray-600 dark:text-gray-300"><b>City:</b> {selectedDistrict.city}</p>
              <p className="mb-4 text-gray-600 dark:text-gray-300"><b>Covered Areas:</b> {selectedDistrict.covered_area.join(', ')}</p>

              <div className="mb-6">
                <img src={selectedDistrict.flowchart} alt="Flowchart" className="w-full rounded-xl shadow-lg" />
              </div>

              <div className="h-80 rounded-lg overflow-hidden">
                <MapContainer center={[selectedDistrict.latitude, selectedDistrict.longitude]} zoom={10} className="h-full">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[selectedDistrict.latitude, selectedDistrict.longitude]}>
                    <Popup>{selectedDistrict.district}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Coverage;