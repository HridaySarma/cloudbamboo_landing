/**
 * Property-Based Tests for PayU Service
 * Feature: payu-hosted-checkout
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fc, test } from '@fast-check/vitest';
import {
  generatePayUHash,
  verifyPayUHash,
  submitToPayU,
  validatePayUConfig,
  generateTransactionId
} from './payuService';

describe('PayU Service - Property-Based Tests', () => {
  /**
   * Property 1: Transaction ID Uniqueness
   * Feature: payu-hosted-checkout, Property 1: Transaction ID Uniqueness
   * Validates: Requirements 1.2
   * 
   * For any two payment initiation requests, the generated transaction IDs 
   * should be unique and never collide.
   */
  test.prop([fc.constant(null)], { numRuns: 100 })(
    'Property 1: Transaction ID Uniqueness - generated IDs should never collide',
    () => {
      // Generate multiple transaction IDs
      const ids = new Set();
      const count = 1000;
      
      for (let i = 0; i < count; i++) {
        const id = generateTransactionId();
        
        // Verify format: starts with "TXN"
        expect(id).toMatch(/^TXN/);
        
        // Check for uniqueness
        expect(ids.has(id)).toBe(false);
        ids.add(id);
      }
      
      // All IDs should be unique
      expect(ids.size).toBe(count);
    }
  );

  /**
   * Property 5: Environment Validation
   * Feature: payu-hosted-checkout, Property 5: Environment Validation
   * Validates: Requirements 5.5
   * 
   * For any payment initiation attempt, if required environment variables 
   * are missing, the system should prevent payment and display an error message.
   */
  test.prop([
    fc.array(
      fc.constantFrom(
        'VITE_PAYU_MERCHANT_KEY',
        'VITE_PAYU_SUCCESS_URL',
        'VITE_PAYU_FAILURE_URL',
        'VITE_BACKEND_URL'
      ),
      { minLength: 1, maxLength: 4 }
    )
  ], { numRuns: 100 })(
    'Property 5: Environment Validation - should detect missing environment variables',
    (missingVars) => {
      // Save original env
      const originalEnv = { ...import.meta.env };
      
      // Remove the specified variables
      missingVars.forEach(varName => {
        delete import.meta.env[varName];
      });
      
      // Validate config
      const result = validatePayUConfig();
      
      // Should be invalid when variables are missing
      expect(result.valid).toBe(false);
      
      // Should report all missing variables
      expect(result.missing.length).toBeGreaterThan(0);
      
      // Each missing variable should be in the result
      missingVars.forEach(varName => {
        if (!originalEnv[varName]) {
          expect(result.missing).toContain(varName);
        }
      });
      
      // Restore env
      Object.assign(import.meta.env, originalEnv);
    }
  );

  test.prop([fc.constant(null)], { numRuns: 100 })(
    'Property 5: Environment Validation - should pass when all variables are present',
    () => {
      // Set all required variables
      import.meta.env.VITE_PAYU_MERCHANT_KEY = 'test_key';
      import.meta.env.VITE_PAYU_SUCCESS_URL = 'http://localhost/success';
      import.meta.env.VITE_PAYU_FAILURE_URL = 'http://localhost/failure';
      import.meta.env.VITE_BACKEND_URL = 'http://localhost:3000';
      
      const result = validatePayUConfig();
      
      expect(result.valid).toBe(true);
      expect(result.missing).toHaveLength(0);
    }
  );
});
