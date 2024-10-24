'use client'

import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Settings, LogOut } from 'lucide-react'
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface Medication {
  name: string
  dosage: number
  frequency: number
  schedule: string[]
  pillsPerDose: number[]
  days: string[]
}

export function DashboardComponent() {
  const [medications, setMedications] = useState<Medication[]>([
    {
      name: "Aspirin",
      dosage: 81,
      frequency: 1,
      schedule: ["08:00"],
      pillsPerDose: [1],
      days: ["Everyday"]
    },
    {
      name: "Lisinopril",
      dosage: 10,
      frequency: 2,
      schedule: ["08:00", "20:00"],
      pillsPerDose: [1, 1],
      days: ["M", "W", "F"]
    }
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <motion.div 
        className="max-w-4xl mx-auto p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="flex justify-between items-center mb-8">
          <motion.h1 
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Welcome, User!
          </motion.h1>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </header>

        <main className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You have {medications.length} medications scheduled for today.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Medications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-primary">Medication</TableHead>
                    <TableHead className="font-semibold text-primary">Dosage</TableHead>
                    <TableHead className="font-semibold text-primary">Frequency</TableHead>
                    <TableHead className="font-semibold text-primary">Schedule</TableHead>
                    <TableHead className="font-semibold text-primary">Days</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medications.map((med, index) => (
                    <TableRow key={index}>
                      <TableCell>{med.name}</TableCell>
                      <TableCell>{med.dosage} mg</TableCell>
                      <TableCell>{med.frequency} time(s) daily</TableCell>
                      <TableCell>{med.schedule.join(', ')}</TableCell>
                      <TableCell>{med.days.join(', ')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button>Add New Medication</Button>
          </div>
        </main>
      </motion.div>
    </div>
  )
}
