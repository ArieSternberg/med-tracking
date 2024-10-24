import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Medication {
  name: string;
  frequency: number;
  days: string[];
}

interface MedicationListProps {
  medications: Medication[];
  onEditMedication: (index: number) => void;
}

export const MedicationList: React.FC<MedicationListProps> = ({ medications, onEditMedication }) => {
  return (
    <div className="mt-4 bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-primary">Medication</TableHead>
            <TableHead className="font-semibold text-primary">Daily Takes</TableHead>
            <TableHead className="font-semibold text-primary">Days</TableHead>
            <TableHead className="font-semibold text-primary">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {medications.map((med, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="hover:bg-muted/50"
              >
                <TableCell>{med.name}</TableCell>
                <TableCell>{med.frequency}</TableCell>
                <TableCell>{med.days.join(', ')}</TableCell>
                <TableCell>
                  <Button onClick={() => onEditMedication(index)} variant="ghost" size="sm">
                    <Edit2 className="h-4 w-4 text-primary" />
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
};