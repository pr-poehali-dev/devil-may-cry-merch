import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CharacterFiltersProps {
  onFilterChange: (character: string | null) => void;
  activeFilter: string | null;
}

const CharacterFilters = ({
  onFilterChange,
  activeFilter,
}: CharacterFiltersProps) => {
  const characters = [
    {
      id: "dante",
      name: "Данте",
      color: "bg-red-600",
      description: "Легендарный охотник на демонов",
    },
    {
      id: "nero",
      name: "Неро",
      color: "bg-blue-600",
      description: "Молодой охотник с демонической рукой",
    },
    {
      id: "vergil",
      name: "Вергилий",
      color: "bg-purple-600",
      description: "Темный рыцарь силы",
    },
  ];

  return (
    <div className="w-full bg-dmc-dark-light p-6 rounded-lg border border-dmc-gray-dark">
      <h3 className="text-xl font-bold text-white mb-4">
        Фильтр по персонажам
      </h3>
      <div className="flex flex-wrap gap-3">
        <Button
          variant={activeFilter === null ? "default" : "outline"}
          onClick={() => onFilterChange(null)}
          className="bg-dmc-red hover:bg-dmc-red-dark text-white border-dmc-red"
        >
          Все товары
        </Button>
        {characters.map((character) => (
          <Button
            key={character.id}
            variant={activeFilter === character.id ? "default" : "outline"}
            onClick={() => onFilterChange(character.id)}
            className={`${
              activeFilter === character.id
                ? `${character.color} hover:opacity-80 text-white`
                : "border-dmc-gray hover:bg-dmc-gray-dark text-dmc-gray-light"
            } transition-all duration-200`}
          >
            {character.name}
          </Button>
        ))}
      </div>
      {activeFilter && (
        <div className="mt-4 p-3 bg-dmc-dark rounded border border-dmc-gray-dark">
          <Badge variant="secondary" className="mb-2">
            {characters.find((c) => c.id === activeFilter)?.name}
          </Badge>
          <p className="text-sm text-dmc-gray-light">
            {characters.find((c) => c.id === activeFilter)?.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default CharacterFilters;
