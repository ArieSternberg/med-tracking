import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface UserProfile {
  role: 'Elder' | 'Caretaker';
  sex: 'Male' | 'Female' | 'Other';
  age: number;
}

interface UserProfileSetupProps {
  userProfile: UserProfile;
  onUserProfileChange: (field: keyof UserProfile, value: any) => void;
  onComplete: () => void;
}

export const UserProfileSetup: React.FC<UserProfileSetupProps> = ({
  userProfile,
  onUserProfileChange,
  onComplete,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div>
          <Label>Role</Label>
          <RadioGroup
            value={userProfile.role}
            onValueChange={(value) => onUserProfileChange('role', value as 'Elder' | 'Caretaker')}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Elder" id="elder" />
              <Label htmlFor="elder">Elder</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Caretaker" id="caretaker" />
              <Label htmlFor="caretaker">Caretaker</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label>Sex</Label>
          <RadioGroup
            value={userProfile.sex}
            onValueChange={(value) => onUserProfileChange('sex', value as 'Male' | 'Female' | 'Other')}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            type="number"
            id="age"
            value={userProfile.age}
            onChange={(e) => onUserProfileChange('age', parseInt(e.target.value))}
            min={1}
            max={120}
          />
        </div>
      </div>
      <Button onClick={onComplete} className="w-full bg-[#00856A] hover:bg-[#006B55] text-white">Complete Setup</Button>
    </div>
  );
};
