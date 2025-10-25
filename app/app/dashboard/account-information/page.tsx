'use client'

import { useDashboard } from "@/app/contexts/DashboardContext";
import { DashboardNavigationTabs } from "@/components/DashboardNavigationTabs";
import { UserType } from "@/utils/types";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function page() {
    const { fetchUser, user, updateAccountInformation } = useDashboard();

    useEffect(() => {
        fetchUser();
    }, []);
    
    useEffect(() => {
        if (user) {
            const editedUser = {
                ...user,
                dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ''
            };
            reset(editedUser);
        }
    }, [user])

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<UserType>({
        defaultValues: {
            fullName: '',
            mobile: '',
            email: '',
            gender: '',
            dateOfBirth: '',
            location: '',
            alternateMobile: ''
        }
    });

    const onSubmit: SubmitHandler<UserType> = async (data) => {
        try {
            updateAccountInformation(data)
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    const handleCancel = () => {
        reset();
    };

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
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="fullName" className="text-sm font-medium text-neutral-700">
                                Full Name *
                            </label>
                            <input
                                {...register("fullName", {
                                    required: "Full name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Full name must be at least 2 characters"
                                    }
                                })}
                                id="fullName"
                                type="text"
                                className={`px-4 py-3 bg-neutral-50 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200 ${
                                    errors.fullName ? 'border-red-500' : 'border-neutral-300'
                                }`}
                                placeholder="Enter your full name"
                                aria-invalid={errors.fullName ? "true" : "false"}
                            />
                            {errors.fullName && (
                                <p className="text-sm text-red-600" role="alert">
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="mobile" className="text-sm font-medium text-neutral-700">
                                Mobile Number *
                            </label>
                            <input
                                {...register("mobile", {
                                    required: "Mobile number is required",
                                    pattern: {
                                        value: /^[+]?[\d\s\-\(\)]{10,}$/,
                                        message: "Please enter a valid mobile number"
                                    }
                                })}
                                id="mobile"
                                type="tel"
                                className={`px-4 py-3 bg-neutral-50 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200 ${
                                    errors.mobile ? 'border-red-500' : 'border-neutral-300'
                                }`}
                                placeholder="Enter your mobile number"
                                aria-invalid={errors.mobile ? "true" : "false"}
                            />
                            {errors.mobile && (
                                <p className="text-sm text-red-600" role="alert">
                                    {errors.mobile.message}
                                </p>
                            )}
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-neutral-700">
                                Email Address *
                            </label>
                            <input
                                {...register("email", {
                                    required: "Email address is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Please enter a valid email address"
                                    }
                                })}
                                id="email"
                                type="email"
                                className={`px-4 py-3 bg-neutral-50 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200 ${
                                    errors.email ? 'border-red-500' : 'border-neutral-300'
                                }`}
                                placeholder="Enter your email address"
                                aria-invalid={errors.email ? "true" : "false"}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600" role="alert">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="gender" className="text-sm font-medium text-neutral-700">
                                Gender
                            </label>
                            <select
                                {...register("gender")}
                                id="gender"
                                className={`px-4 py-3 bg-neutral-50 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 transition-colors duration-200 ${
                                    errors.gender ? 'border-red-500' : 'border-neutral-300'
                                }`}
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer-not-to-say">Prefer not to say</option>
                            </select>
                            {errors.gender && (
                                <p className="text-sm text-red-600" role="alert">
                                    {errors.gender.message}
                                </p>
                            )}
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="dateOfBirth" className="text-sm font-medium text-neutral-700">
                                Date of Birth
                            </label>
                            <input
                                {...register("dateOfBirth", {
                                    validate: (value) => {
                                        if (!value) return true; // Optional field
                                        const selectedDate = new Date(value);
                                        const today = new Date();
                                        const minAge = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
                                        return selectedDate <= minAge || "You must be at least 13 years old";
                                    }
                                })}
                                id="dateOfBirth"
                                type="date"
                                className={`px-4 py-3 bg-neutral-50 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 transition-colors duration-200 ${
                                    errors.dateOfBirth ? 'border-red-500' : 'border-neutral-300'
                                }`}
                            />
                            {errors.dateOfBirth && (
                                <p className="text-sm text-red-600" role="alert">
                                    {errors.dateOfBirth.message}
                                </p>
                            )}
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="location" className="text-sm font-medium text-neutral-700">
                                Location
                            </label>
                            <input
                                {...register("location")}
                                id="location"
                                type="text"
                                className={`px-4 py-3 bg-neutral-50 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200 ${
                                    errors.location ? 'border-red-500' : 'border-neutral-300'
                                }`}
                                placeholder="Enter your location"
                            />
                            {errors.location && (
                                <p className="text-sm text-red-600" role="alert">
                                    {errors.location.message}
                                </p>
                            )}
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="alternateMobile" className="text-sm font-medium text-neutral-700">
                                Alternate Mobile
                            </label>
                            <input
                                {...register("alternateMobile", {
                                    pattern: {
                                        value: /^[+]?[\d\s\-\(\)]{10,}$/,
                                        message: "Please enter a valid mobile number"
                                    }
                                })}
                                id="alternateMobile"
                                type="tel"
                                className={`px-4 py-3 bg-neutral-50 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200 ${
                                    errors.alternateMobile ? 'border-red-500' : 'border-neutral-300'
                                }`}
                                placeholder="Enter alternate mobile number"
                            />
                            {errors.alternateMobile && (
                                <p className="text-sm text-red-600" role="alert">
                                    {errors.alternateMobile.message}
                                </p>
                            )}
                        </div>
                        
                        {/* Grid span for the note section */}
                        <div className="md:col-span-2">
                            <div className="mt-6 p-4 bg-accent-50 border border-accent-200 rounded-lg">
                                <p className="text-sm text-accent-700">
                                    <span className="font-medium">Note:</span> Fields marked with * are required. Your personal information is securely stored and will only be used to enhance your shopping experience.
                                </p>
                            </div>
                        </div>
                        
                        {/* Grid span for the button section */}
                        <div className="md:col-span-2">
                            <div className="mt-8 flex justify-end gap-4 pt-6 border-t border-secondary-200">
                                <button 
                                    type="button" 
                                    onClick={handleCancel}
                                    className="text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                    style={{ 
                                        background: `oklch(0.48 0.08 48)`,
                                    }}>
                                    CANCEL
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className={`text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    style={{ 
                                        background: `oklch(0.48 0.08 48)`,
                                    }}>
                                    {isSubmitting ? 'SAVING...' : 'SAVE CHANGES'}
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}