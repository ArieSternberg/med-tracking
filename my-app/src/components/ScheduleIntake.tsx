import React from 'react';
import { motion } from 'framer-motion';
import { Pill } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ScheduleIntakeProps {
  schedule: string[];
  pillsPerDose: number[];
  onScheduleChange: (index: number, value: string) => void;
  onPillsPerDoseChange: (index: number, value: number) => void;
  onBack: () => void;
  onAddMedication: () => void;
}

export const ScheduleIntake: React.FC<ScheduleIntakeProps> = ({
  schedule,
  pillsPerDose,
  onScheduleChange,
  onPillsPerDoseChange,
  onBack,
  onAddMedication,
}) => {
  return (
    <div className="space-y-4">
      {schedule.map((time, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          className="space-y-2 border p-4 rounded-lg"
        >
          <Label htmlFor={`time-${index}`}>Dose {index + 1}</Label>
          <div className="flex items-center space-x-4">
            <Input
              type="time"
              id={`time-${index}`}
              value={time}
              onChange={(e) => onScheduleChange(index, e.target.value)}
              className="w-32"
            />
            <div className="flex items-center space-x-2">
              <Label htmlFor={`pills-${index}`}>Pills:</Label>
              <Select
                value={pillsPerDose[index].toString()}
                onValueChange={(value) => onPillsPerDoseChange(index, parseInt(value))}
              >
                <SelectTrigger id={`pills-${index}`} className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-1 mt-2">
            {Array.from({ length: pillsPerDose[index] }).map((_, pillIndex) => (
              <Pill key={pillIndex} className="h-6 w-6 text-primary" />
            ))}
          </div>
        </motion.div>
      ))}
      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">Back</Button>
        <Button onClick={onAddMedication}>Add Medication</Button>
      </div>
    </div>
  );
};