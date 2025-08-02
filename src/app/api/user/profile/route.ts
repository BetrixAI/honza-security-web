import { NextRequest, NextResponse } from 'next/server'
import { getServerUser } from '@/lib/auth'

export async function GET() {
  try {
    // Ověření uživatele pomocí server-side util
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Vrácení informací o uživateli
    return NextResponse.json({
      uid: user.uid,
      email: user.email,
      emailVerified: user.email_verified,
      name: user.name || null,
      picture: user.picture || null,
      // Další data můžeme načíst z databáze
    })
  } catch (error) {
    console.error('Error getting user profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    
    // TODO: Aktualizace profilu v databázi
    // Zde by se normálně aktualizovaly údaje v Firestore
    
    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully'
    })
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}