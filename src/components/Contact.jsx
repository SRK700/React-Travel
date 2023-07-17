import React from 'react';

const Contact = () => {
    return (
        <section className="bg-gray-100 py-8">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-4">ติดต่อเรา</h2>
                <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                                ชื่อ-นามสกุล
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="px-3 py-2 border border-gray-400 rounded-md w-full"
                                placeholder="กรอกชื่อ-นามสกุลของคุณ"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                อีเมล
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="px-3 py-2 border border-gray-400 rounded-md w-full"
                                placeholder="กรอกอีเมลของคุณ"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                                ข้อความ
                            </label>
                            <textarea
                                id="message"
                                className="px-3 py-2 border border-gray-400 rounded-md w-full"
                                rows="4"
                                placeholder="พิมพ์ข้อความของคุณที่นี่"
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                ส่งข้อความ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
