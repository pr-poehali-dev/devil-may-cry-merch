import { useState } from "react";
import CharacterFilters from "@/components/CharacterFilters";
import ProductGallery from "@/components/ProductGallery";
import LoyaltyProgram from "@/components/LoyaltyProgram";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-dmc-dark">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-dmc-dark to-dmc-dark-light py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Devil May Cry <span className="text-dmc-red">Store</span>
          </h1>
          <p className="text-xl text-dmc-gray-light mb-8">
            Официальный магазин мерча легендарной игры
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Character Filters */}
        <CharacterFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Product Gallery */}
        <ProductGallery activeFilter={activeFilter} />

        {/* Loyalty Program */}
        <LoyaltyProgram />
      </div>
    </div>
  );
};

export default Index;
