import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="bg-green-200 px-4 py-2 sticky top-0 z-10">
            <div className="flex items-center justify-between">
                <Link
                    to="/"
                    className="text-xl font-bold mr-4 text-gray-900"
                >
                    สถานที่ท่องเที่ยว
                </Link>
                <div className="flex items-center">
                    <Link
                        to="/list"
                        className="font-bold mr-4 text-gray-900"
                    >
                        รายชื่อสถานที่ท่องเที่ยว
                    </Link>
                    <Link
                        to="/contact"
                        className="font-bold text-gray-900"
                    >
                        ติดต่อเรา
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
