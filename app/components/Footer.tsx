import React from 'react';
import { Separator } from './ui/separator';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Online Shopping
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Men</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Women</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Kids</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Home & Living</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Beauty</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Gift Cards</a></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Useful Links
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Site Map</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Corporate Information</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Whitehat</a></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Customer Policies
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact Us</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">FAQ</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">T&C</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms Of Use</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Track Orders</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Shipping</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Cancellation</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Returns</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Grievance Officer</a></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Experience Mobile App
            </h3>
            <div className="space-y-3 mb-6">
              <a href="#" className="block">
                <img 
                  src="https://developer.android.com/static/images/brand/en_app_rgb_wo_45.png" 
                  alt="Get it on Google Play" 
                  className="h-10"
                />
              </a>
              <a href="#" className="block">
                <img 
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                  alt="Download on the App Store" 
                  className="h-10"
                />
              </a>
            </div>
            
          </div>
        </div>

        <Separator className="my-8" />

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            Popular Searches
          </h3>
          <div className="text-sm text-gray-600 leading-relaxed">
            <span className="inline-block mr-2">Makeup |</span>
            <span className="inline-block mr-2">Dresses For Girls |</span>
            <span className="inline-block mr-2">T-Shirts |</span>
            <span className="inline-block mr-2">Sandals |</span>
            <span className="inline-block mr-2">Headphones |</span>
            <span className="inline-block mr-2">Babydolls |</span>
            <span className="inline-block mr-2">Blazers For Men |</span>
            <span className="inline-block mr-2">Handbags |</span>
            <span className="inline-block mr-2">Ladies Watches |</span>
            <span className="inline-block mr-2">Bags |</span>
            <span className="inline-block mr-2">Sport Shoes |</span>
            <span className="inline-block mr-2">Reebok Shoes |</span>
            <span className="inline-block mr-2">Puma Shoes |</span>
            <span className="inline-block mr-2">Boxers |</span>
            <span className="inline-block mr-2">Wallets |</span>
            <span className="inline-block mr-2">Tops |</span>
            <span className="inline-block mr-2">Earrings |</span>
            <span className="inline-block mr-2">FastTrack Watches |</span>
            <span className="inline-block mr-2">Kurtis |</span>
            <span className="inline-block mr-2">Nike |</span>
            <span className="inline-block mr-2">Smart Watches |</span>
            <span className="inline-block mr-2">Titan Watches |</span>
            <span className="inline-block mr-2">Designer Blouse |</span>
            <span className="inline-block mr-2">Gowns |</span>
            <span className="inline-block mr-2">Rings |</span>
            <span className="inline-block mr-2">Cricket Shoes |</span>
            <span className="inline-block mr-2">Forever 21 |</span>
            <span className="inline-block mr-2">Eye Makeup |</span>
            <span className="inline-block mr-2">Photo Frames |</span>
            <span className="inline-block mr-2">Punjabi Suits |</span>
            <span className="inline-block mr-2">Lipstick |</span>
            <span className="inline-block mr-2">Saree |</span>
            <span className="inline-block mr-2">Watches |</span>
            <span className="inline-block mr-2">Dresses |</span>
            <span className="inline-block mr-2">Lehenga |</span>
            <span className="inline-block mr-2">Nike Shoes |</span>
            <span className="inline-block mr-2">Goggles |</span>
            <span className="inline-block mr-2">Bras |</span>
            <span className="inline-block mr-2">Suit |</span>
            <span className="inline-block mr-2">Chinos |</span>
            <span className="inline-block mr-2">Shoes |</span>
            <span className="inline-block mr-2">Adidas Shoes |</span>
            <span className="inline-block mr-2">Woodland Shoes |</span>
            <span className="inline-block mr-2">Jewellery |</span>
            <span className="inline-block mr-2">Designer Sarees</span>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="mb-4 md:mb-0">
            <p>In Case Of Any Concern, <a href="#" className="text-blue-600 hover:underline">Contact Us</a></p>
          </div>
          <div>
            <p>© 2025 All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;