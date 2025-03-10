import { Link } from "react-router-dom";

function AllCategory() {
  return (
    <div className="relative inline-block cursor-pointer">
      <Link to="">
        <div className="p-3 hover:bg-gray-100">All Categories</div>
      </Link>
      <div className="absolute hidden bg-white w-[1000px] shadow-md z-10 p-5 rounded-b-lg menu-dropdown-content">
        <div className="grid grid-cols-3 gap-10">
          {/* Column 1 */}
          <div className="space-y-2">
            <p className="font-semibold border-t pt-2">Properties</p>
            <div className="flex flex-col space-y-1">
              <Link to="/">For Sale: Houses & Apartments</Link>
              <Link to="/">For Rent: Houses & Apartments</Link>
              <Link to="/">Lands & Plots</Link>
              <Link to="/">For Rent: Shops & Offices</Link>
              <Link to="/">For Sale: Shops & Offices</Link>
              <Link to="/">PG & Guest Houses</Link>
            </div>
            <p className="font-semibold border-t pt-2">Mobiles</p>
            <div className="flex flex-col space-y-1">
              <Link to="/">Mobile Phones</Link>
              <Link to="/">Accessories</Link>
              <Link to="/">Tablets</Link>
            </div>
          </div>
          
          {/* Column 2 */}
          <div className="space-y-2">
            <p className="font-semibold border-t pt-2">Jobs</p>
            <div className="flex flex-col space-y-1">
              <Link to="/">Data Entry & Back Office</Link>
              <Link to="/">Sales & Marketing</Link>
              <Link to="/">BPO & Telecaller</Link>
              <Link to="/">Driver</Link>
              <Link to="/">Office Assistant</Link>
              <Link to="/">Other Jobs</Link>
            </div>
            <p className="font-semibold border-t pt-2">Bikes</p>
            <div className="flex flex-col space-y-1">
              <Link to="/">Motorcycles</Link>
              <Link to="/">Scooters</Link>
              <Link to="/">Spare Parts</Link>
              <Link to="/">Bicycles</Link>
            </div>
          </div>
          
          {/* Column 3 */}
          <div className="space-y-2">
            <p className="font-semibold border-t pt-2">Electronics</p>
            <div className="flex flex-col space-y-1">
              <Link to="/">Computers & Laptops</Link>
              <Link to="/">TVs, Video - Audio</Link>
              <Link to="/">Cameras & Lenses</Link>
            </div>
            <p className="font-semibold border-t pt-2">Furniture</p>
            <div className="flex flex-col space-y-1">
              <Link to="/">Sofas & Dining</Link>
              <Link to="/">Beds & Wardrobes</Link>
              <Link to="/">Home Decor & Garden</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AllCategory;
