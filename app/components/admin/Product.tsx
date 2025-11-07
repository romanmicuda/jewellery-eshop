'use client'

import { useAdmin } from '@/app/contexts/AdminContext';
import React, { useState, useEffect } from 'react';

// Enums matching your Java enums
enum Jewellery {
  NECKLACES = 'NECKLACES',
  EARRINGS = 'EARRINGS',
  BRACELETS = 'BRACELETS',
  RINGS = 'RINGS',
  PENDANTS = 'PENDANTS',
  ANKLETS = 'ANKLETS',
  CUFFLINKS = 'CUFFLINKS',
  BROOCHES = 'BROOCHES'
}

enum Material {
  GOLD = 'GOLD',
  SILVER = 'SILVER',
  PLATINUM = 'PLATINUM',
  STAINLESS_STEEL = 'STAINLESS_STEEL',
  LEATHER = 'LEATHER',
  FABRIC = 'FABRIC',
  CERAMIC = 'CERAMIC',
  WOOD = 'WOOD'
}

enum Gemstone {
  DIAMOND = 'DIAMOND',
  RUBY = 'RUBY',
  SAPPHIRE = 'SAPPHIRE',
  EMERALD = 'EMERALD',
  AMETHYST = 'AMETHYST',
  TOPAZ = 'TOPAZ',
  GARNET = 'GARNET',
  AQUAMARINE = 'AQUAMARINE'
}

enum Size {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  XLARGE = 'XLARGE',
  ONE_SIZE = 'ONE_SIZE',
  SIZE_6 = 'SIZE_6',
  SIZE_7 = 'SIZE_7',
  SIZE_8 = 'SIZE_8',
  SIZE_9 = 'SIZE_9',
  SIZE_10 = 'SIZE_10',
  SIZE_11 = 'SIZE_11',
  SIZE_12 = 'SIZE_12'
}

export interface Product {
  productId?: string;
  name: string;
  description: string;
  price: number;
  category: Jewellery;
  brand: string;
  material: Material;
  gemstone?: Gemstone;
  size: Size;
  stockQuantity: number;
  discountPercentage: number;
  images: string[]; // Changed from image to images array
}

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
  isEditing = false
}) => {
  const [formData, setFormData] = useState<Product>({
    name: '',
    description: '',
    price: 0,
    category: Jewellery.RINGS,
    brand: '',
    material: Material.GOLD,
    gemstone: undefined,
    size: Size.ONE_SIZE,
    stockQuantity: 0,
    discountPercentage: 0,
    images: [], // Changed from image to images array
    ...product
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const {uploadImage} = useAdmin()

  useEffect(() => {
    if (product) {
      setFormData({ ...product });
      setImagePreviews(product.images || []);
    }
  }, [product]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stockQuantity' || name === 'discountPercentage'
        ? parseFloat(value) || 0
        : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, images: 'Please select a valid image file' }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, images: 'Image size should be less than 5MB' }));
      return;
    }

    setIsUploading(true);
    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews([e.target?.result as string]);
      };
      reader.readAsDataURL(file);

      // Here you would typically upload to your storage service
      // For now, we'll use a placeholder implementation
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, you'd get the URL from your upload service
      const imageUrl = `uploads/${file.name}`;
      
      setFormData(prev => ({ ...prev, images: [imageUrl] }));
      
      // Clear any previous errors
      if (errors.images) {
        setErrors(prev => ({ ...prev, images: '' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, images: 'Failed to upload image' }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleMultipleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate files
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, images: 'Please select only image files' }));
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, images: 'Each image should be less than 5MB' }));
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setIsUploading(true);
    try {
      const newPreviews: string[] = [];
      const newImageUrls: string[] = [];

      // Process each file
      for (const file of validFiles) {
        // Create preview
        const reader = new FileReader();
        const previewPromise = new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
        
        const preview = await previewPromise;
        newPreviews.push(preview);

        // Use uploadImage if available, otherwise fallback to a local placeholder URL
        const imageUrl = uploadImage
          ? await uploadImage(file)
          : `uploads/${file.name}`;

        newImageUrls.push(imageUrl);
      }

      // Update state with new images
      setImagePreviews(prev => [...prev, ...newPreviews]);
      setFormData(prev => ({ 
        ...prev, 
        images: [...prev.images, ...newImageUrls] 
      }));

      // Clear errors
      if (errors.images) {
        setErrors(prev => ({ ...prev, images: '' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, images: 'Failed to upload images' }));
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (formData.stockQuantity < 0) newErrors.stockQuantity = 'Stock quantity cannot be negative';
    if (formData.discountPercentage < 0 || formData.discountPercentage > 100) {
      newErrors.discountPercentage = 'Discount must be between 0 and 100';
    }
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-card p-6 rounded-lg shadow-md border border-border">
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.name ? 'border-destructive' : 'border-border'
            } bg-input text-foreground`}
            placeholder="Enter product name"
          />
          {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.description ? 'border-destructive' : 'border-border'
            } bg-input text-foreground`}
            placeholder="Enter product description"
          />
          {errors.description && <p className="text-destructive text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Price and Stock Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Price ($) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.price ? 'border-destructive' : 'border-border'
              } bg-input text-foreground`}
            />
            {errors.price && <p className="text-destructive text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Stock Quantity *
            </label>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleInputChange}
              min="0"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.stockQuantity ? 'border-destructive' : 'border-border'
              } bg-input text-foreground`}
            />
            {errors.stockQuantity && <p className="text-destructive text-sm mt-1">{errors.stockQuantity}</p>}
          </div>
        </div>

        {/* Category and Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground"
            >
              {Object.values(Jewellery).map(category => (
                <option key={category} value={category}>
                  {category.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Brand *
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.brand ? 'border-destructive' : 'border-border'
              } bg-input text-foreground`}
              placeholder="Enter brand name"
            />
            {errors.brand && <p className="text-destructive text-sm mt-1">{errors.brand}</p>}
          </div>
        </div>

        {/* Material and Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Material *
            </label>
            <select
              name="material"
              value={formData.material}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground"
            >
              {Object.values(Material).map(material => (
                <option key={material} value={material}>
                  {material.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Size *
            </label>
            <select
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground"
            >
              {Object.values(Size).map(size => (
                <option key={size} value={size}>
                  {size.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Gemstone and Discount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Gemstone (Optional)
            </label>
            <select
              name="gemstone"
              value={formData.gemstone || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground"
            >
              <option value="">No Gemstone</option>
              {Object.values(Gemstone).map(gemstone => (
                <option key={gemstone} value={gemstone}>
                  {gemstone.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Discount Percentage (%)
            </label>
            <input
              type="number"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleInputChange}
              min="0"
              max="100"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.discountPercentage ? 'border-destructive' : 'border-border'
              } bg-input text-foreground`}
            />
            {errors.discountPercentage && <p className="text-destructive text-sm mt-1">{errors.discountPercentage}</p>}
          </div>
        </div>

        {/* Multiple Images Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Product Images * (Multiple images allowed)
          </label>
          
          {/* Display existing images */}
          {imagePreviews.length > 0 && (
            <div className="mb-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border-2 border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-destructive text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs hover:opacity-80 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* File Input */}
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-md hover:border-primary/50 transition-colors">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-muted-foreground"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              
              <div className="flex text-sm text-muted-foreground">
                <label className="relative cursor-pointer bg-background rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                  <span>Upload images</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleImageUpload}
                    className="sr-only"
                    disabled={isUploading}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF up to 5MB each. Multiple files allowed.
              </p>
              
              {isUploading && (
                <div className="flex items-center justify-center mt-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="ml-2 text-sm text-muted-foreground">Uploading images...</span>
                </div>
              )}
            </div>
          </div>
          
          {errors.images && <p className="text-destructive text-sm mt-1">{errors.images}</p>}
          
          {imagePreviews.length > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              {imagePreviews.length} image(s) selected
            </p>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {isEditing ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;