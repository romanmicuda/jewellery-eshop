
'use client'

import { useGlobalContext } from "@/app/contexts/GlobalContext";

export const FiltersSidebar = () => {
    const { filters, updateFilters, clearFilters } = useGlobalContext();
    
    const handleCategoryChange = (category: string, checked: boolean) => {
        // Only allow single selection for category
        const updatedCategories = checked ? [category.toUpperCase()] : [];
        updateFilters({ categories: updatedCategories });
    };

    const handleMaterialChange = (material: string, checked: boolean) => {
        // Only allow single selection for material
        const updatedMaterials = checked ? [material.toUpperCase()] : [];
        updateFilters({ materials: updatedMaterials });
    };

    const handleGemstoneChange = (gemstone: string, checked: boolean) => {
        // Only allow single selection for gemstone
        const updatedGemstones = checked ? [gemstone.toUpperCase()] : [];
        updateFilters({ gemstones: updatedGemstones });
    };

    const handleSizeChange = (size: string, checked: boolean) => {
        // Only allow single selection for size
        const updatedSizes = checked ? [size] : [];
        updateFilters({ sizes: updatedSizes });
    };

    const category = "All Products";
    return (
        <div className="w-64 bg-card border-r border-border p-6 h-full">
            <div className="mb-6 text-sm text-muted-foreground">
                <span className="text-primary hover:text-primary/80 cursor-pointer">Home</span>
                <span className="mx-2">/</span>
                <span className="text-foreground font-medium">{category}</span>
            </div>
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                    Category
                </h2>
                <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            id="rings" 
                            name="category" 
                            value="rings"
                            checked={filters.categories.includes('RINGS')}
                            onChange={(e) => handleCategoryChange('rings', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">Rings</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            id="necklaces" 
                            name="category" 
                            value="necklaces"
                            checked={filters.categories.includes('NECKLACES')}
                            onChange={(e) => handleCategoryChange('necklaces', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">Necklaces</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            id="earrings" 
                            name="category" 
                            value="earrings"
                            checked={filters.categories.includes('EARRINGS')}
                            onChange={(e) => handleCategoryChange('earrings', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">Earrings</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            id="bracelets" 
                            name="category" 
                            value="bracelets"
                            checked={filters.categories.includes('BRACELETS')}
                            onChange={(e) => handleCategoryChange('bracelets', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">Bracelets</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            id="pendants" 
                            name="category" 
                            value="pendants"
                            checked={filters.categories.includes('PENDANTS')}
                            onChange={(e) => handleCategoryChange('pendants', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">Pendants</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            id="anklets" 
                            name="category" 
                            value="anklets"
                            checked={filters.categories.includes('ANKLETS')}
                            onChange={(e) => handleCategoryChange('anklets', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">Anklets</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio"
                            id="cufflinks"
                            name="category"
                            value="cufflinks"
                            checked={filters.categories.includes('CUFFLINKS')}
                            onChange={(e) => handleCategoryChange('cufflinks', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">Cufflinks</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            id="brooches" 
                            name="category" 
                            value="brooches"
                            checked={filters.categories.includes('BROOCHES')}
                            onChange={(e) => handleCategoryChange('brooches', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2
                                focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">Brooches</span>
                    </label>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                    Material
                </h2>
                <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            id="gold" 
                            name="material" 
                            value="gold"
                            checked={filters.materials.includes('GOLD')}
                            onChange={(e) => handleMaterialChange('gold', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: 'oklch(0.78 0.12 58)'}}></span>
                            Gold
                        </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            id="silver" 
                            name="material" 
                            value="silver"
                            checked={filters.materials.includes('SILVER')}
                            onChange={(e) => handleMaterialChange('silver', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: 'oklch(0.85 0.02 200)'}}></span>
                            Silver
                        </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            id="platinum" 
                            name="material" 
                            value="platinum"
                            checked={filters.materials.includes('PLATINUM')}
                            onChange={(e) => handleMaterialChange('platinum', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: 'oklch(0.88 0.01 240)'}}></span>
                            Platinum
                        </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            id="stainless-steel" 
                            name="material" 
                            value="stainless-steel"
                            checked={filters.materials.includes('STAINLESS_STEEL')}
                            onChange={(e) => handleMaterialChange('stainless_steel', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: 'oklch(0.60 0.01 240)'}}></span>
                            Stainless Steel
                        </span>
                    </label>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                    Gemstone
                </h2>
                <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            id="diamond" 
                            name="gemstone" 
                            value="diamond"
                            checked={filters.gemstones.includes('DIAMOND')}
                            onChange={(e) => handleGemstoneChange('diamond', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: 'oklch(0.95 0.02 240)'}}></span>
                            Diamond
                        </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            id="ruby" 
                            name="gemstone" 
                            value="ruby"
                            checked={filters.gemstones.includes('RUBY')}
                            onChange={(e) => handleGemstoneChange('ruby', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: 'oklch(0.55 0.22 15)'}}></span>
                            Ruby
                        </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            id="emerald" 
                            name="gemstone" 
                            value="emerald"
                            checked={filters.gemstones.includes('EMERALD')}
                            onChange={(e) => handleGemstoneChange('emerald', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: 'oklch(0.55 0.18 140)'}}></span>
                            Emerald
                        </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            id="sapphire" 
                            name="gemstone" 
                            value="sapphire"
                            checked={filters.gemstones.includes('SAPPHIRE')}
                            onChange={(e) => handleGemstoneChange('sapphire', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: 'oklch(0.45 0.18 240)'}}></span>
                            Sapphire
                        </span>
                    </label>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                    Ring Size
                </h2>
                <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            id="size6" 
                            name="size" 
                            value="SIZE_6"
                            checked={filters.sizes.includes('SIZE_6')}
                            onChange={(e) => handleSizeChange('SIZE_6', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">Size 6</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            id="size7" 
                            name="size" 
                            value="SIZE_7"
                            checked={filters.sizes.includes('SIZE_7')}
                            onChange={(e) => handleSizeChange('SIZE_7', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">Size 7</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            id="size8" 
                            name="size" 
                            value="SIZE_8"
                            checked={filters.sizes.includes('SIZE_8')}
                            onChange={(e) => handleSizeChange('SIZE_8', e.target.checked)}
                            className="w-4 h-4 border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">Size 8</span>
                    </label>
                </div>
            </div>

            <div className="mb-8">
                <button 
                    onClick={clearFilters}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                    Clear All Filters
                </button>
            </div>
        </div>
    )
}