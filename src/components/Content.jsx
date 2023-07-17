import React, { useState, useEffect } from 'react';
import { fetchPlaces } from './Api';

function Content() {
    const [places, setPlaces] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const placesPerPage = 6;

    useEffect(() => {
        fetchPlaces()
            .then(data => setPlaces(data));
    }, []);

    const handleReadMore = (place) => {
        setSelectedPlace(place);
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        setSelectedPlace(null);
        setShowDetails(false);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredPlaces = places.filter(place =>
        place.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastPlace = currentPage * placesPerPage;
    const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
    const currentPlaces = filteredPlaces.slice(indexOfFirstPlace, indexOfLastPlace);
    const totalPages = Math.ceil(filteredPlaces.length / placesPerPage);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    placeholder="ค้นหาสถานที่"
                    className="p-2 border border-gray-300 rounded"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-center text-black border-b-4 border-black pb-2">
                รายชื่อสถานที่
            </h1>
            <div className="grid grid-cols-3 gap-4">
                {currentPlaces.map(place => (
                    <div className="bg-white p-4 shadow-md border border-gray-300 rounded" key={place.id}>
                        <div>
                            <img src={place.img} alt={place.name} className="mb-4" />
                            <h2 className="text-lg font-bold">{place.name}</h2>
                            <p className="text-gray-500 text-sm">{place.descript}</p>
                            <p className="text-gray-500 text-sm">ประเภท: {place.type}</p>
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={() => handleReadMore(place)}>
                            อ่านเพิ่มเติม
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-center">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                            }`}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            {showDetails && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                    <div className="bg-white p-4 max-w-lg">
                        <h2 className="text-lg font-bold">{selectedPlace.name}</h2>
                        <img src={selectedPlace.img} alt={selectedPlace.name} className="mb-4" />
                        <p className="text-gray-500 text-sm">{selectedPlace.descript}</p>
                        <p className="text-gray-500 text-sm">ประเภท: {selectedPlace.type}</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleCloseDetails}>
                            ปิด
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Content;
