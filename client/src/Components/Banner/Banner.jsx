import React from "react";
import { Link } from "react-router-dom";
import AllCategory from "../AllCategory/AllCategory";
const Banner = () => {
    return (
        <div className="pt-0 w-full">
            <div className="w-full">
                <div className="flex p-3 md:p-4 items-center">
                    <div className="mr-4 font-bold">
                       <AllCategory />
                    </div>
                    <div className="hidden md:flex font-medium space-x-4">
                        <Link  className="px-2 hover:text-gray-600">Cars</Link>
                        <Link  className="px-2 hover:text-gray-600">Motorcycle</Link>
                        <Link  className="px-2 hover:text-gray-600">Mobile Phones</Link>
                        <Link  className="px-2 hover:text-gray-600">For Sale: Houses & Apart...</Link>
                        <Link  className="px-2 hover:text-gray-600">Scooter</Link>
                        <Link  className="px-2 hover:text-gray-600">Commercial & Other Ve...</Link>
                        <Link  className="px-2 hover:text-gray-600">For Rent: House & Apart...</Link>
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default Banner;
