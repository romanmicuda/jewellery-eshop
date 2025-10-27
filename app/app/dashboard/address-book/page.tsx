'use client'

import { useDashboard } from "@/app/contexts/DashboardContext";
import { DashboardNavigationTabs } from "@/components/DashboardNavigationTabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChangePasswordRequest, AddressRequest, NewsletterPreferencesRequest } from "@/utils/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function page() {
    const { fetchUser } = useDashboard();
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-secondary-100 p-6">
            <div className="max-w-6xl mx-auto space-y-8">

                <div className="text-center py-8">
                    <h1 className="text-4xl font-bold text-primary-700 mb-2">My Address</h1>
                    <p className="text-neutral-600">Manage your shipping and billing addresses</p>
                </div>

                <DashboardNavigationTabs />

                <ChangePasswordForm />

                <DefaultBillingAddressForm />

                <DefaultShippingAddressForm />

                <NewsletterPreferencesForm />

            </div>
        </div>
    );
}

const NewsletterPreferencesForm = () => {

    const { updateNewsletterPreferences, user } = useDashboard();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue
    } = useForm<NewsletterPreferencesRequest>();

    useEffect(() => {
        if (user) {
            reset({
                'subscribed': user.activeNewsletterSubscriber
            })
        }
    },[user, reset])

    const subscribed = watch("subscribed");

    const onSubmit = async (data: NewsletterPreferencesRequest) => {
        try {
            updateNewsletterPreferences(data)
            alert("Newsletter preferences updated successfully!");
        } catch (error) {
            console.error("Error updating newsletter preferences:", error);
            alert("Failed to update newsletter preferences. Please try again.");
        }
    };

    const handleCancel = () => {
        reset();
    };

    return (
        <section className="bg-card border border-secondary-200 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-primary-600">NEWSLETTERS</h2>
            </div>

            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="subscribed"
                                checked={subscribed || false}
                                onCheckedChange={(checked) => setValue("subscribed", checked)}
                            />
                            <Label htmlFor="subscribed" className="text-neutral-700 cursor-pointer">
                                Subscribe to our newsletter
                            </Label>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="text-secondary-600 hover:text-secondary-700 font-medium text-sm border border-secondary-300 hover:border-secondary-400 px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`font-medium text-sm border px-4 py-2 rounded-lg transition-colors duration-200 ${isSubmitting
                                ? 'bg-gray-400 text-gray-600 border-gray-400 cursor-not-allowed'
                                : 'text-secondary-600 hover:text-secondary-700 border-secondary-300 hover:border-secondary-400'
                                }`}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Preferences'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

const ChangePasswordForm = () => {
    const { changePassword } = useDashboard();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        reset
    } = useForm<ChangePasswordRequest>();

    const newPassword = watch("newPassword");

    const onSubmit = async (data: ChangePasswordRequest) => {
        try {
            changePassword(data);
            reset();
        } catch (error) {
            console.error("Error changing password:", error);
            alert("Failed to change password. Please try again.");
        }
    };

    const handleCancel = () => {
        reset();
    };
    return (
        <section className="bg-card border border-secondary-200 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-primary-600">Change Password</h2>
            </div>

            <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="oldPassword" className="text-sm font-medium text-neutral-700">
                                Old Password
                            </label>
                            <input
                                id="oldPassword"
                                type="password"
                                placeholder="Enter old password"
                                {...register("oldPassword", {
                                    required: "Old password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                className={`px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200 ${errors.oldPassword ? 'border-red-500' : 'border-neutral-300'
                                    }`}
                            />
                            {errors.oldPassword && (
                                <span className="text-red-500 text-xs">{errors.oldPassword.message}</span>
                            )}
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="newPassword" className="text-sm font-medium text-neutral-700">
                                New Password
                            </label>
                            <input
                                id="newPassword"
                                type="password"
                                placeholder="Enter new password"
                                {...register("newPassword", {
                                    required: "New password is required",
                                    minLength: {
                                        value: 8,
                                        message: "New password must be at least 8 characters"
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                        message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                                    }
                                })}
                                className={`px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200 ${errors.newPassword ? 'border-red-500' : 'border-neutral-300'
                                    }`}
                            />
                            {errors.newPassword && (
                                <span className="text-red-500 text-xs">{errors.newPassword.message}</span>
                            )}
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="retypePassword" className="text-sm font-medium text-neutral-700">
                                Retype Password
                            </label>
                            <input
                                id="retypePassword"
                                type="password"
                                placeholder="Retype new password"
                                {...register("retypePassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === newPassword || "Passwords do not match"
                                })}
                                className={`px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200 ${errors.retypePassword ? 'border-red-500' : 'border-neutral-300'
                                    }`}
                            />
                            {errors.retypePassword && (
                                <span className="text-red-500 text-xs">{errors.retypePassword.message}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="text-secondary-600 hover:text-secondary-700 font-medium text-sm border border-secondary-300 hover:border-secondary-400 px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`font-medium text-sm border px-4 py-2 rounded-lg transition-colors duration-200 ${isSubmitting
                                ? 'bg-gray-400 text-gray-600 border-gray-400 cursor-not-allowed'
                                : 'text-secondary-600 hover:text-secondary-700 border-secondary-300 hover:border-secondary-400'
                                }`}
                        >
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </section>

    )
}

const DefaultBillingAddressForm = () => {
    const { updateBillingAddress, user } = useDashboard();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<AddressRequest>();

    useEffect(() => {
        if (user) {

            reset({
                streetAddress: user?.billingAddress?.streetAddress || '',
                city: user?.billingAddress?.city || '',
                zipCode: user?.billingAddress?.zipCode || ''
            });
        }
    }, [user]);

    const onSubmit = async (data: AddressRequest) => {
        try {
            updateBillingAddress(data);
            alert("Billing address updated successfully!");
        } catch (error) {
            console.error("Error updating billing address:", error);
            alert("Failed to update billing address. Please try again.");
        }
    };

    const handleCancel = () => {
        reset();
    };

    return (
        <section className="bg-card border border-secondary-200 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-primary-600">Address Book</h2>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">DEFAULT BILLING ADDRESS</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="streetAddress" className="text-sm font-medium text-neutral-700">
                                Street Address
                            </label>
                            <input
                                id="streetAddress"
                                type="text"
                                placeholder="Enter street address"
                                {...register("streetAddress", {
                                    required: "Street address is required",
                                    minLength: {
                                        value: 5,
                                        message: "Street address must be at least 5 characters"
                                    }
                                })}
                                className={`px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200 ${errors.streetAddress ? 'border-red-500' : 'border-neutral-300'
                                    }`}
                            />
                            {errors.streetAddress && (
                                <span className="text-red-500 text-xs">{errors.streetAddress.message}</span>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="billingCity" className="text-sm font-medium text-neutral-700">
                                    City
                                </label>
                                <input
                                    id="billingCity"
                                    type="text"
                                    placeholder="Enter city"
                                    {...register("city", {
                                        required: "City is required",
                                        minLength: {
                                            value: 2,
                                            message: "City must be at least 2 characters"
                                        }
                                    })}
                                    className={`px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200 ${errors.city ? 'border-red-500' : 'border-neutral-300'
                                        }`}
                                />
                                {errors.city && (
                                    <span className="text-red-500 text-xs">{errors.city.message}</span>
                                )}
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="billingZip" className="text-sm font-medium text-neutral-700">
                                    ZIP Code
                                </label>
                                <input
                                    id="billingZip"
                                    type="text"
                                    placeholder="Enter ZIP code"
                                    {...register("zipCode", {
                                        required: "ZIP code is required",
                                        pattern: {
                                            value: /^\d{5}(-\d{4})?$/,
                                            message: "Please enter a valid ZIP code (e.g., 12345 or 12345-6789)"
                                        }
                                    })}
                                    className={`px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200 ${errors.zipCode ? 'border-red-500' : 'border-neutral-300'
                                        }`}
                                />
                                {errors.zipCode && (
                                    <span className="text-red-500 text-xs">{errors.zipCode.message}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="text-secondary-600 hover:text-secondary-700 font-medium text-sm border border-secondary-300 hover:border-secondary-400 px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`font-medium text-sm border px-4 py-2 rounded-lg transition-colors duration-200 ${isSubmitting
                                ? 'bg-gray-400 text-gray-600 border-gray-400 cursor-not-allowed'
                                : 'text-secondary-600 hover:text-secondary-700 border-secondary-300 hover:border-secondary-400'
                                }`}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Address'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

const DefaultShippingAddressForm = () => {
    const { updateShippingAddress, user } = useDashboard();

    useEffect(() => {
        if (user) {

            reset({
                streetAddress: user?.shippingAddress?.streetAddress || '',
                city: user?.shippingAddress?.city || '',
                zipCode: user?.shippingAddress?.zipCode || ''
            });
        }
    }, [user]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<AddressRequest>();

    const onSubmit = async (data: AddressRequest) => {
        try {
            await updateShippingAddress(data);
            alert("Shipping address updated successfully!");
        } catch (error) {
            console.error("Error updating shipping address:", error);
            alert("Failed to update shipping address. Please try again.");
        }
    };

    const handleCancel = () => {
        reset();
    };

    return (
        <section className="bg-card border border-secondary-200 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-primary-600">Address Book</h2>
            </div>

            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">DEFAULT SHIPPING ADDRESS</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="streetAddress" className="text-sm font-medium text-neutral-700">
                                Street Address
                            </label>
                            <input
                                id="streetAddress"
                                type="text"
                                placeholder="Enter street address"
                                {...register("streetAddress", {
                                    required: "Street address is required",
                                    minLength: {
                                        value: 5,
                                        message: "Street address must be at least 5 characters"
                                    }
                                })}
                                className={`px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200 ${errors.streetAddress ? 'border-red-500' : 'border-neutral-300'
                                    }`}
                            />
                            {errors.streetAddress && (
                                <span className="text-red-500 text-xs">{errors.streetAddress.message}</span>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="shippingCity" className="text-sm font-medium text-neutral-700">
                                    City
                                </label>
                                <input
                                    id="shippingCity"
                                    type="text"
                                    placeholder="Enter city"
                                    {...register("city", {
                                        required: "City is required",
                                        minLength: {
                                            value: 2,
                                            message: "City must be at least 2 characters"
                                        }
                                    })}
                                    className={`px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200 ${errors.city ? 'border-red-500' : 'border-neutral-300'
                                        }`}
                                />
                                {errors.city && (
                                    <span className="text-red-500 text-xs">{errors.city.message}</span>
                                )}
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="shippingZip" className="text-sm font-medium text-neutral-700">
                                    ZIP Code
                                </label>
                                <input
                                    id="shippingZip"
                                    type="text"
                                    placeholder="Enter ZIP code"
                                    {...register("zipCode", {
                                        required: "ZIP code is required",
                                        pattern: {
                                            value: /^\d{5}(-\d{4})?$/,
                                            message: "Please enter a valid ZIP code (e.g., 12345 or 12345-6789)"
                                        }
                                    })}
                                    className={`px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200 ${errors.zipCode ? 'border-red-500' : 'border-neutral-300'
                                        }`}
                                />
                                {errors.zipCode && (
                                    <span className="text-red-500 text-xs">{errors.zipCode.message}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="text-secondary-600 hover:text-secondary-700 font-medium text-sm border border-secondary-300 hover:border-secondary-400 px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`font-medium text-sm border px-4 py-2 rounded-lg transition-colors duration-200 ${isSubmitting
                                ? 'bg-gray-400 text-gray-600 border-gray-400 cursor-not-allowed'
                                : 'text-secondary-600 hover:text-secondary-700 border-secondary-300 hover:border-secondary-400'
                                }`}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Address'}
                        </button>
                    </div>
                </form>
            </div>

        </section>
    )
}
