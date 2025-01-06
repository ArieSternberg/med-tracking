import neo4j, { Driver } from 'neo4j-driver'

let driver: Driver | null = null

export function initNeo4j() {
    const uri = process.env.NEO4J_URI
    const username = process.env.NEO4J_USERNAME
    const password = process.env.NEO4J_PASSWORD

    console.log('Neo4j Config:', {
        uri: process.env.NEO4J_URI,
        username: process.env.NEO4J_USERNAME,
        hasPassword: !!process.env.NEO4J_PASSWORD
    })

    if (!uri || !username || !password) {
        throw new Error('Neo4j credentials not found in environment variables')
    }

    if (!driver) {
        driver = neo4j.driver(uri, neo4j.auth.basic(username, password))
    }

    return driver
}

export async function testConnection() {
    const session = await getSession()
    try {
        const result = await session.run('RETURN 1 as test')
        console.log('Neo4j connection successful:', result.records[0].get('test'))
        return true
    } catch (error) {
        console.error('Neo4j connection failed:', error)
        return false
    } finally {
        await session.close()
    }
}

export async function getSession() {
    if (!driver) {
        driver = initNeo4j()
    }
    return driver.session()
}

export async function closeDriver() {
    if (driver) {
        await driver.close()
        driver = null
    }
}

// Simplified user creation with just Clerk data
export async function createUser(userId: string, clerkData: { 
    firstName: string | null;
    lastName: string | null;
    emailAddresses: string[];
}) {
    console.log('createUser called with:', { userId, clerkData })

    const userProfile = {
        id: userId,
        firstName: clerkData.firstName || '',
        lastName: clerkData.lastName || '',
        email: clerkData.emailAddresses[0] || '',
        createdAt: new Date().toISOString()
    }

    console.log('Constructed userProfile:', userProfile)

    const cypher = `
        MERGE (u:User {id: $userId})
        SET u = $userProfile
        RETURN u
    `
    
    console.log('Executing Cypher query:', cypher)
    console.log('With parameters:', { userId, userProfile })
    
    const session = await getSession()
    try {
        console.log('Session created, executing query...')
        const result = await session.run(cypher, { userId, userProfile })
        console.log('Query executed, result:', result)
        if (result.records && result.records[0]) {
            console.log('User node properties:', result.records[0].get('u').properties)
            return result.records
        } else {
            console.log('No records returned from query')
            return null
        }
    } catch (error) {
        console.error('Error in createUser:', error)
        throw error
    } finally {
        console.log('Closing session')
        await session.close()
    }
}

// Get user by ID
export async function getUser(userId: string) {
    const cypher = `
        MATCH (u:User {id: $userId})
        RETURN u
    `
    const session = await getSession()
    try {
        const result = await session.run(cypher, { userId })
        return result.records[0]?.get('u').properties
    } finally {
        await session.close()
    }
}

// Medication-related queries
export async function createMedication(medicationData: any) {
    const cypher = `
        CREATE (m:Medication {
            id: randomUUID(),
            name: $name,
            brandName: $brandName,
            genericName: $genericName,
            dosage: $dosage,
            frequency: $frequency,
            schedule: $schedule,
            pillsPerDose: $pillsPerDose,
            days: $days
        })
        RETURN m
    `
    const session = await getSession()
    try {
        console.log('Creating medication with data:', medicationData)
        const result = await session.run(cypher, medicationData)
        console.log('Medication creation result:', result.records[0].get('m').properties)
        return result.records
    } catch (error) {
        console.error('Error creating medication:', error)
        throw error
    } finally {
        await session.close()
    }
}

export async function linkUserToMedication(userId: string, medicationId: string) {
    const cypher = `
        MATCH (u:User {id: $userId})
        MATCH (m:Medication {id: $medicationId})
        MERGE (u)-[r:TAKES]->(m)
        RETURN r
    `
    const session = await getSession()
    try {
        const result = await session.run(cypher, { userId, medicationId })
        return result.records
    } finally {
        await session.close()
    }
}

export async function getUserMedications(userId: string) {
    const cypher = `
        MATCH (u:User {id: $userId})-[r:TAKES]->(m:Medication)
        RETURN m
    `
    const session = await getSession()
    try {
        const result = await session.run(cypher, { userId })
        return result.records.map(record => record.get('m').properties)
    } finally {
        await session.close()
    }
} 