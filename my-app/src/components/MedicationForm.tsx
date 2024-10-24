import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface MedicationFormProps {
  currentMedication: {
    brandName: string;
    genericName: string;
    dosage: number;
    frequency: number;
    days: string[];
  };
  onMedicationChange: (field: string, value: any) => void;
  onBack: () => void;
  onNext: () => void;
}

export const MedicationForm: React.FC<MedicationFormProps> = ({
  currentMedication,
  onMedicationChange,
  onBack,
  onNext,
}) => {
  const daysOfWeek = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{currentMedication.brandName || currentMedication.genericName}</h2>
      <div className="space-y-2">
        <Label htmlFor="dosage">Dosage (mg)</Label>
        <Select
          value={currentMedication.dosage.toString()}
          onValueChange={(value) => onMedicationChange('dosage', parseFloat(value))}
        >
          <SelectTrigger id="dosage">
            <SelectValue placeholder="Select dosage" />
          </SelectTrigger>
          <SelectContent>
            {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((dose) => (
              <SelectItem key={dose} value={dose.toString()}>{dose} mg</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="frequency">Daily Frequency</Label>
        <Select
          value={currentMedication.frequency.toString()}
          onValueChange={(value) => onMedicationChange('frequency', parseInt(value))}
        >
          <SelectTrigger id="frequency">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4].map((freq) => (
              <SelectItem key={freq} value={freq.toString()}>{freq} time{freq > 1 ? 's' : ''} per day</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Days</Label>
        <div className="flex flex-wrap gap-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="flex items-center space-x-2">
              <Checkbox
                id={day}
                checked={currentMedication.days.includes(day)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onMedicationChange('days', [...currentMedication.days.filter(d => d !== 'Everyday'), day]);
                  } else {
                    onMedicationChange('days', currentMedication.days.filter(d => d !== day));
                  }
                }}
              />
              <Label htmlFor={day}>{day}</Label>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="everyday"
              checked={currentMedication.days.includes('Everyday')}
              onCheckedChange={(checked) => {
                if (checked) {
                  onMedicationChange('days', ['Everyday']);
                } else {
                  onMedicationChange('days', []);
                }
              }}
            />
            <Label htmlFor="everyday">Everyday</Label>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline"><ChevronLeft className="mr-2 h-4 w-4" /> Back</Button>
        <Button onClick={onNext}>Next <ChevronRight className="ml-2 h-4 w-4" /></Button>
      </div>
    </div>
  );
};