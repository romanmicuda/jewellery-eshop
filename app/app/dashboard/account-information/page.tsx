'use client'

import { DashboardNavigationTabs } from "@/components/DashboardNavigationTabs";

export default function page() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-secondary-100 p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center py-8">
                    <h1 className="text-4xl font-bold text-primary-700 mb-2">My Dashboard</h1>
                    <p className="text-neutral-600">Manage your account and preferences</p>
                </div>

                <DashboardNavigationTabs />


                <section className="bg-card border border-secondary-200 rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-primary-600">Profile Details</h2>
                    </div>
                    
                    
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="fullName" className="text-sm font-medium text-neutral-700">
                                Full Name *
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                defaultValue="John Doe"
                                className="px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200"
                                placeholder="Enter your full name"
                            />
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="mobile" className="text-sm font-medium text-neutral-700">
                                Mobile Number *
                            </label>
                            <input
                                id="mobile"
                                type="tel"
                                defaultValue="+1234567890"
                                className="px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200"
                                placeholder="Enter your mobile number"
                            />
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-neutral-700">
                                Email Address *
                            </label>
                            <input
                                id="email"
                                type="email"
                                defaultValue="john.doe@example.com"
                                className="px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200"
                                placeholder="Enter your email address"
                            />
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="gender" className="text-sm font-medium text-neutral-700">
                                Gender
                            </label>
                            <select
                                id="gender"
                                defaultValue="male"
                                className="px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 transition-colors duration-200"
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer-not-to-say">Prefer not to say</option>
                            </select>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="dateOfBirth" className="text-sm font-medium text-neutral-700">
                                Date of Birth
                            </label>
                            <input
                                id="dateOfBirth"
                                type="date"
                                defaultValue="1990-01-01"
                                className="px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 transition-colors duration-200"
                            />
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="location" className="text-sm font-medium text-neutral-700">
                                Location
                            </label>
                            <input
                                id="location"
                                type="text"
                                defaultValue="New York, USA"
                                className="px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200"
                                placeholder="Enter your location"
                            />
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="alternateMobile" className="text-sm font-medium text-neutral-700">
                                Alternate Mobile
                            </label>
                            <input
                                id="alternateMobile"
                                type="tel"
                                defaultValue="+0987654321"
                                className="px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200"
                                placeholder="Enter alternate mobile number"
                            />
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="hintName" className="text-sm font-medium text-neutral-700">
                                Hint Name
                            </label>
                            <input
                                id="hintName"
                                type="text"
                                defaultValue="JD"
                                className="px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200"
                                placeholder="Enter a hint name"
                            />
                        </div>
                    </form>
                    
                    <div className="mt-6 p-4 bg-accent-50 border border-accent-200 rounded-lg">
                        <p className="text-sm text-accent-700">
                            <span className="font-medium">Note:</span> Fields marked with * are required. Your personal information is securely stored and will only be used to enhance your shopping experience.
                        </p>
                    </div>
                    
                    <div className="mt-8 flex justify-end gap-4 pt-6 border-t border-secondary-200">
                        <button 
                            type="button" 
                          className="text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            style={{ 
                                background: `oklch(0.48 0.08 48)`,
                            }}>
                            CANCEL
                        </button>
                        <button 
                            type="submit" 
                                                     className="text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            style={{ 
                                background: `oklch(0.48 0.08 48)`,
                            }}>
                            SAVE CHANGES
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}