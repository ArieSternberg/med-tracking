# Med-Tracking Application Technical Specification

## 1. Executive Summary

The Med-Tracking Application is a Next.js-based web app designed to help elders and their caretakers manage medication schedules effectively. Leveraging Clerk for authentication, Neo4j for data storage, and an AI agent for proactive reminders and communication, the app ensures medication adherence while keeping caretakers informed.

## 2. Goals and Objectives

* Enable elders to manage their medication schedules in a user-friendly and secure manner
* Provide caretakers with real-time updates on the elder's medication adherence
* Utilize AI and WhatsApp for engaging and timely reminders

## 3. Key Features

### 3.1 User Roles

#### Elder
* Onboarding process to set up medication schedules
* Ability to confirm medication plans and sign up via Clerk
* Receive WhatsApp reminders for medication
* Respond to reminders to log adherence

#### Caretaker
* Ability to sign up and manage elder accounts
* Receive WhatsApp notifications based on adherence progress or missed medications
* Configure alert preferences (e.g., frequency and type of notifications)

### 3.2 Onboarding Process (Elder)

* **Step 1:** Sign-Up: Prompt to sign up via Clerk
* **Step 2:** Medication Selection: Choose medications from a database
* **Step 3:** Dosage Specification: Enter dosage details for each medication
* **Step 4:** Schedule Setup: Define:
  * Frequency: Number of times per day
  * Timing: Specific times of day
  * Days: Days of the week the medication needs to be taken
* **Step 5:** Confirmation: Review and confirm the setup


### 3.3 Alternative Flow

* Users (elder or caretaker) can sign up via Clerk first and proceed to medication selection afterward

### 3.4 Data Storage

* Medication schedules, user information, and adherence logs will be stored in a Neo4j database
* Graph-based relationships will be used to link users, medications, and adherence records for efficient data retrieval

### 3.5 AI Integration

* AI agent connected to the Neo4j database
* Sends reminders via WhatsApp to elders for taking medications
* Logs responses or non-responses in the database
* Alerts caretakers based on adherence or missed doses according to their notification preferences

## 4. Technical Specifications

* **Framework:** Next.js
* **UI Framework:** Tailwind CSS with ShadCN/UI components
* **Authentication:** Clerk for user sign-up/sign-in
* **Database:** Neo4j for graph-based data storage
* **Messaging Platform:** WhatsApp API for reminders and notifications
* **AI Agent:** Integrated to analyze adherence patterns and manage communication

## 5. User Flows

### 5.1 Elder Onboarding Flow

1. Signs up via Clerk (if not already registered)
2. Elder accesses the app and begins the onboarding process
3. Selects medications, specifies dosages, and sets up schedules
4. Reviews and confirms the setup


### 5.2 Caretaker Management Flow

1. Caretaker signs up and links to an elder's account
2. Configures notification preferences
3. Receives real-time updates on elder's adherence via WhatsApp

### 5.3 AI Reminder Flow

1. AI agent retrieves schedule from Neo4j database
2. Sends WhatsApp reminders to the elder
3. Logs responses (e.g., "taken" or no response) in the database
4. Notifies caretaker based on adherence data and alert preferences

## 6. Compliance and Security

* WhatsApp reminders and logs are privacy-compliant