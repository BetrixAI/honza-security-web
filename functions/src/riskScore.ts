/**
 * Risk Score computation - CF03
 * Owner: Shared - daily risk score calculation
 */

import * as functions from 'firebase-functions';

// CF03: Daily risk score computation
export const computeRiskScore = functions.pubsub
  .schedule('every day 01:00')
  .timeZone('UTC')
  .onRun(async (context) => {
    console.log('Computing daily risk scores...');
    // TODO: Implement risk score calculation
    // Aggregate awareness/behaviour/culture into riskScores collection
  });