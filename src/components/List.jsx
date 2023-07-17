import React, { useState, useEffect } from 'react';
import axios from 'axios';

function List() {
    const [items, setItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = () => {
        axios.get('http://student.crru.ac.th/641463023/apiPlace/')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.log(error);
                setItems([]);
            });
    };

    const handleCreateItem = () => {
        setIsCreating(true);
    };

    const handleCancelCreate = () => {
        setIsCreating(false);
        setItemName('');
        setItemDescription('');
    };

    const handleSaveItem = () => {
        const newItem = { name: itemName, description: itemDescription };
        axios.post('http://student.crru.ac.th/641463023/apiPlace/', newItem)
            .then(response => {
                setItems([...items, response.data]);
                setIsCreating(false);
                setItemName('');
                setItemDescription('');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleEditItem = (itemId) => {
        setIsEditing(true);
        setSelectedItemId(itemId);
        axios.get(`http://student.crru.ac.th/641463023/apiPlace/${itemId}`)
            .then(response => {
                setItemName(response.data.name);
                setItemDescription(response.data.description);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedItemId(null);
        setItemName('');
        setItemDescription('');
    };

    const handleUpdateItem = () => {
        const updatedItem = { name: itemName, description: itemDescription };
        axios.put(`http://student.crru.ac.th/641463023/apiPlace/${selectedItemId}`, updatedItem)
            .then(response => {
                const updatedItems = items.map(item => {
                    if (item.id === selectedItemId) {
                        return { ...item, ...response.data };
                    }
                    return item;
                });
                setItems(updatedItems);
                setIsEditing(false);
                setSelectedItemId(null);
                setItemName('');
                setItemDescription('');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleDeleteItem = (itemId) => {
        axios.delete(`http://student.crru.ac.th/641463023/apiPlace/${itemId}`)
            .then(() => {
                const updatedItems = items.filter(item => item.id !== itemId);
                setItems(updatedItems);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-3 gap-4">
                {items.map(item => (
                    <div className="bg-gray-200 p-4 shadow-md" key={item.id}>
                        {isEditing && selectedItemId === item.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={itemName}
                                    onChange={e => setItemName(e.target.value)}
                                    className="mb-2 p-2 border border-gray-300 rounded"
                                />
                                <textarea
                                    value={itemDescription}
                                    onChange={e => setItemDescription(e.target.value)}
                                    className="mb-2 p-2 border border-gray-300 rounded"
                                ></textarea>
                                <button
                                    onClick={handleUpdateItem}
                                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-lg font-bold">{item.name}</h2>
                                <p className="text-gray-500">{item.description}</p>
                                <p className="text-gray-500">ID: {item.id}</p>
                                <p className="text-gray-500">Type: {item.type}</p>
                                <div>
                                    <button
                                        onClick={() => handleEditItem(item.id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteItem(item.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                {!isCreating && (
                    <button
                        onClick={handleCreateItem}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Add Item
                    </button>
                )}
                {isCreating && (
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            value={itemName}
                            onChange={e => setItemName(e.target.value)}
                            className="mb-2 p-2 border border-gray-300 rounded"
                        />
                        <textarea
                            placeholder="Description"
                            value={itemDescription}
                            onChange={e => setItemDescription(e.target.value)}
                            className="mb-2 p-2 border border-gray-300 rounded"
                        ></textarea>
                        <button
                            onClick={handleSaveItem}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancelCreate}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default List;
