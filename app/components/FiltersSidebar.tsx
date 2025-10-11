
export const FiltersSidebar = () => {
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
                            type="checkbox" 
                            id="rings" 
                            name="rings" 
                            value="rings"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">Rings</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            id="necklaces" 
                            name="necklaces" 
                            value="necklaces"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">Necklaces</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            id="earrings" 
                            name="earrings" 
                            value="earrings"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">Earrings</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            id="bracelets" 
                            name="bracelets" 
                            value="bracelets"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">Bracelets</span>
                    </label>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                    Price Range
                </h2>
                <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            id="price1" 
                            name="price1" 
                            value="0-100"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">$0 - $100</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            id="price2" 
                            name="price2" 
                            value="101-500"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">$101 - $500</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            id="price3" 
                            name="price3" 
                            value="501-1000"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">$501 - $1,000</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            id="price4" 
                            name="price4" 
                            value="1000+"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">$1,000 and above</span>
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
                            type="checkbox" 
                            id="gold" 
                            name="gold" 
                            value="gold"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: 'oklch(0.78 0.12 58)'}}></span>
                            Gold
                        </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            id="silver" 
                            name="silver" 
                            value="silver"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: 'oklch(0.85 0.02 200)'}}></span>
                            Silver
                        </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            id="platinum" 
                            name="platinum" 
                            value="platinum"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: 'oklch(0.88 0.01 240)'}}></span>
                            Platinum
                        </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            id="rose-gold" 
                            name="rose-gold" 
                            value="rose-gold"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: 'oklch(0.70 0.045 25)'}}></span>
                            Rose Gold
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
                            type="checkbox" 
                            id="diamond" 
                            name="diamond" 
                            value="diamond"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: 'oklch(0.95 0.02 240)'}}></span>
                            Diamond
                        </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            id="ruby" 
                            name="ruby" 
                            value="ruby"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: 'oklch(0.55 0.22 15)'}}></span>
                            Ruby
                        </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            id="emerald" 
                            name="emerald" 
                            value="emerald"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: 'oklch(0.55 0.18 140)'}}></span>
                            Emerald
                        </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            id="sapphire" 
                            name="sapphire" 
                            value="sapphire"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
                            type="checkbox" 
                            id="size5-6" 
                            name="size5-6" 
                            value="5-6"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">Size 5-6</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            id="size7-8" 
                            name="size7-8" 
                            value="7-8"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">Size 7-8</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            id="size9-10" 
                            name="size9-10" 
                            value="9-10"
                            className="w-4 h-4 rounded border-2 border-secondary-300 text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">Size 9-10</span>
                    </label>
                </div>
            </div>
        </div>
    )
}