/**
 * Gamification Cloud Function - CF04
 * Owner: Shared - XP and badge management
 */

import * as functions from 'firebase-functions';
import { getFirestore } from 'firebase-admin/firestore';

// CF04: Award XP and badges when lesson completed
export const onLessonCompleted = functions.firestore
  .document('users/{userId}/lessonProgress/{progressId}')
  .onCreate(async (snap, context) => {
    const progressData = snap.data();
    const userId = context.params.userId;
    
    if (!progressData.xpEarned || progressData.xpEarned <= 0) {
      return; // No XP to award
    }
    
    const db = getFirestore();
    
    try {
      await db.runTransaction(async (transaction) => {
        const userRef = db.collection('users').doc(userId);
        const userDoc = await transaction.get(userRef);
        
        if (!userDoc.exists) {
          throw new Error('User not found');
        }
        
        const userData = userDoc.data()!;
        const currentXp = userData.xp || 0;
        const currentLevel = userData.level || 1;
        
        const newXp = currentXp + progressData.xpEarned;
        const newLevel = Math.floor(Math.sqrt(newXp / 25)) + 1;
        
        // Update user XP and level
        transaction.update(userRef, {
          xp: newXp,
          level: newLevel,
          lastXpEarned: progressData.xpEarned,
          lastXpSource: 'lesson-completed',
        });
        
        // Check for level up badges
        if (newLevel > currentLevel) {
          // Award level milestone badges
          await checkLevelBadges(transaction, userId, newLevel);
        }
        
        console.log(`Awarded ${progressData.xpEarned} XP to user ${userId}`);
      });
      
    } catch (error) {
      console.error('Error awarding XP:', error);
    }
  });

async function checkLevelBadges(transaction: any, userId: string, level: number) {
  // Placeholder for badge checking logic
  // This would check PREDEFINED_BADGES from gamification.ts
  console.log(`Checking level badges for user ${userId} at level ${level}`);
}