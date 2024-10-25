'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { User } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MedicationSearch } from './MedicationSearch'
import { MedicationList } from './MedicationList'
import { MedicationForm } from './MedicationForm'
import { ScheduleIntake } from './ScheduleIntake'
import { UserProfileSetup } from './UserProfileSetup'
import { useRouter } from 'next/navigation'

interface Medication {
  name: string
  brandName: string
  genericName: string
  dosage: number
  frequency: number
  schedule: string[]
  pillsPerDose: number[]
  days: string[]
}

interface DrugResult {
  brand_name: string
  generic_name: string
}

interface UserProfile {
  role: 'Elder' | 'Caretaker'
  sex: 'Male' | 'Female' | 'Other'
  age: number
}

export function EnhancedOnboardingWizardComponent() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [medications, setMedications] = useState<Medication[]>([])
  const [currentMedication, setCurrentMedication] = useState<Medication>({
    name: '',
    brandName: '',
    genericName: '',
    dosage: 0.25,
    frequency: 1,
    schedule: ['08:00'],
    pillsPerDose: [1],
    days: ['Everyday']
  })
  const [searchResults, setSearchResults] = useState<DrugResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    role: 'Elder',
    sex: 'Male',
    age: 65
  })

  // Add useEffect to load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('onboardingData')
    if (savedData) {
      const { medications: savedMeds, currentMed, step: savedStep, userProfile: savedProfile } = JSON.parse(savedData)
      setMedications(savedMeds || [])
      setCurrentMedication(currentMed || {
        name: '',
        brandName: '',
        genericName: '',
        dosage: 0.25,
        frequency: 1,
        schedule: ['08:00'],
        pillsPerDose: [1],
        days: ['Everyday']
      })
      setStep(savedStep || 1)
      setUserProfile(savedProfile || {
        role: 'Elder',
        sex: 'Male',
        age: 65
      })
    }
  }, [])

  // Add useEffect to save data whenever relevant states change
  useEffect(() => {
    const dataToSave = {
      medications,
      currentMed: currentMedication,
      step,
      userProfile
    }
    localStorage.setItem('onboardingData', JSON.stringify(dataToSave))
    console.log('Onboarding progress saved:', dataToSave)
  }, [medications, currentMedication, step, userProfile])

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.length < 3) {
      setSearchResults([])
      setError(null)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://api.fda.gov/drug/ndc.json?search=(brand_name:"${query}"+generic_name:"${query}")&limit=5`)
      if (!response.ok) throw new Error('Failed to fetch data')
      const data = await response.json()
      const results = data.results.map((result: any) => ({
        brand_name: result.brand_name,
        generic_name: result.generic_name
      }))
      setSearchResults(results)
      if (results.length === 0) {
        setError("Can't find that medication, sorry")
      }
    } catch (err) {
      setError("Can't find that medication, sorry")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddMedication = () => {
    if (currentMedication.name) {
      const updatedMedications = [...medications, currentMedication]
      setMedications(updatedMedications)
      setCurrentMedication({
        name: '',
        brandName: '',
        genericName: '',
        dosage: 0.25,
        frequency: 1,
        schedule: ['08:00'],
        pillsPerDose: [1],
        days: ['Everyday']
      })
      setSelectedDrug(null)
      setSearchQuery('')
      setSearchResults([])
      setStep(1)
      
      // Log the medication addition
      console.log('Medication added:', currentMedication)
      console.log('Updated medications list:', updatedMedications)
    }
  }

  const handleEditMedication = (index: number) => {
    setCurrentMedication(medications[index])
    setMedications(medications.filter((_, i) => i !== index))
    setStep(2)
    setSearchQuery(medications[index].name)
    setSearchResults([])
    setSelectedDrug(medications[index].name)
  }

  const handleDrugSelection = (drug: DrugResult) => {
    const drugName = drug.brand_name || drug.generic_name
    setCurrentMedication({
      ...currentMedication,
      name: drugName,
      brandName: drug.brand_name,
      genericName: drug.generic_name
    })
    setSearchQuery(drugName)
    setSelectedDrug(drugName)
  }

  const handleMedicationChange = (field: string, value: any) => {
    setCurrentMedication({ ...currentMedication, [field]: value })
  }

  const handleUserProfileChange = (field: keyof UserProfile, value: any) => {
    setUserProfile({ ...userProfile, [field]: value })
  }

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text">Select Medication</h2>
      <MedicationSearch
        searchQuery={searchQuery}
        isLoading={isLoading}
        error={error}
        searchResults={searchResults}
        selectedDrug={selectedDrug}
        handleSearch={handleSearch}
        handleDrugSelection={handleDrugSelection}
        onAddMedication={() => setStep(2)}
      />
      <MedicationList
        medications={medications}
        onEditMedication={handleEditMedication}
      />
      <div className="flex justify-end">
        <Button onClick={() => setStep(5)} className="bg-[#00856A] hover:bg-[#006B55] text-white">Done</Button>
      </div>
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-[#00856A]">Medication Details</h2>
      <MedicationForm
        currentMedication={currentMedication}
        onMedicationChange={handleMedicationChange}
        onBack={() => setStep(1)}
        onNext={() => setStep(3)}
      />
    </motion.div>
  )

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-[#00856A]">Schedule Intake</h2>
      <ScheduleIntake
        schedule={currentMedication.schedule}
        pillsPerDose={currentMedication.pillsPerDose}
        onScheduleChange={(index, value) => {
          const newSchedule = [...currentMedication.schedule]
          newSchedule[index] = value
          handleMedicationChange('schedule', newSchedule)
        }}
        onPillsPerDoseChange={(index, value) => {
          const newPillsPerDose = [...currentMedication.pillsPerDose]
          newPillsPerDose[index] = value
          handleMedicationChange('pillsPerDose', newPillsPerDose)
        }}
        onBack={() => setStep(2)}
        onAddMedication={handleAddMedication}
      />
    </motion.div>
  )

  const renderConfirmation = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text">Confirmation</h2>
      <p className="text-gray-600">Are you done with all your medications?</p>
      <div className="flex justify-between">
        <Button onClick={() => setStep(1)} variant="outline" className="border-[#00856A] text-[#00856A]">No, Add More</Button>
        <Button onClick={() => setStep(6)} className="bg-[#00856A] hover:bg-[#006B55] text-white">Yes, Proceed</Button>
      </div>
    </motion.div>
  )

  const renderUserProfile = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text">User Profile Setup</h2>
      <UserProfileSetup
        userProfile={userProfile}
        onUserProfileChange={handleUserProfileChange}
        onComplete={() => setStep(7)}
      />
    </motion.div>
  )

  // Add cleanup to final step
  const handleComplete = () => {
    console.log('Onboarding completed:', {
      medications,
      userProfile
    })
    localStorage.removeItem('onboardingData') // Clean up storage after completion
    router.push('/sign-up')
  }

  const renderComplete = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 text-center"
    >
      <h2 className="text-2xl font-bold text">Setup Complete!</h2>
      <p className="text-gray-600">Thank you for setting up your profile and medications.</p>
      <User className="w-16 h-16 mx-auto text-[#00856A]" />
      <div className="bg-gray-100 p-4 rounded-lg">
        <p><strong>Role:</strong> {userProfile.role}</p>
        <p><strong>Sex:</strong> {userProfile.sex}</p>
        <p><strong>Age:</strong> {userProfile.age}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mt-4 mb-2 text">Your Medications</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text">Medication</TableHead>
              <TableHead className="font-semibold text">Daily Takes</TableHead>
              <TableHead className="font-semibold text">Days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medications.map((med, index) => (
              <TableRow key={index}>
                <TableCell>{med.name}</TableCell>
                <TableCell>{med.frequency}</TableCell>
                <TableCell>{med.days.join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button 
        className="mt-6 bg-[#00856A] hover:bg-[#006B55] text-white" 
        onClick={handleComplete}
      >
        Get Started!
      </Button>
    </motion.div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
      <motion.div 
        className="bg-white/90 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-4xl relative z-10"
        style={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h1 
          className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#00856A] to-[#006B55]"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Poppai.AI Med Tracking
        </motion.h1>
        <AnimatePresence mode="wait">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 5 && renderConfirmation()}
          {step === 6 && renderUserProfile()}
          {step === 7 && renderComplete()}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
