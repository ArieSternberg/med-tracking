'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { testConnection, createUser, getUser } from '@/lib/neo4j'

export default function TestNeo4j() {
    const { user } = useUser()
    const [connectionStatus, setConnectionStatus] = useState<string>('Testing...')
    const [userData, setUserData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function test() {
            try {
                // Test connection
                const connected = await testConnection()
                setConnectionStatus(connected ? 'Connected to Neo4j!' : 'Failed to connect to Neo4j')

                if (user) {
                    // Create user
                    const clerkData = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        emailAddresses: user.emailAddresses.map(email => email.emailAddress)
                    }

                    await createUser(user.id, clerkData)

                    // Verify user was created
                    const savedUser = await getUser(user.id)
                    setUserData(savedUser)
                }
            } catch (err) {
                console.error('Error:', err)
                setError(err instanceof Error ? err.message : 'An error occurred')
            }
        }

        test()
    }, [user])

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Neo4j Connection Test</h1>
            <div className="space-y-4">
                <p>Status: {connectionStatus}</p>
                {error && (
                    <p className="text-red-500">Error: {error}</p>
                )}
                {userData && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Saved User Data:</h2>
                        <pre className="bg-gray-100 p-4 rounded">
                            {JSON.stringify(userData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    )
} 