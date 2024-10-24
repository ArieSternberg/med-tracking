import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DrugResult {
  brand_name: string;
  generic_name: string;
}

interface MedicationSearchProps {
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  searchResults: DrugResult[];
  selectedDrug: string | null;
  handleSearch: (query: string) => void;
  handleDrugSelection: (drug: DrugResult) => void;
  onAddMedication: () => void;
}

export const MedicationSearch: React.FC<MedicationSearchProps> = ({
  searchQuery,
  isLoading,
  error,
  searchResults,
  selectedDrug,
  handleSearch,
  handleDrugSelection,
  onAddMedication,
}) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for medication"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pr-10"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      {isLoading && <p>Loading...</p>}
      {error && searchQuery.length >= 3 && <p className="text-red-500">{error}</p>}
      <ul className="mt-2 space-y-2 max-h-60 overflow-y-auto">
        <AnimatePresence>
          {searchResults.map((drug, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={`p-2 hover:bg-gray-100 cursor-pointer rounded flex justify-between items-center ${
                selectedDrug === (drug.brand_name || drug.generic_name) ? 'bg-blue-100' : ''
              }`}
              onClick={() => handleDrugSelection(drug)}
            >
              <p className="font-bold">{drug.brand_name || drug.generic_name}</p>
              {selectedDrug === (drug.brand_name || drug.generic_name) && (
                <Button size="sm" variant="outline" onClick={(e) => {
                  e.stopPropagation();
                  onAddMedication();
                }}>
                  Add
                </Button>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};