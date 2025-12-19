/**
 * Property-Based Tests for Payment Helpers
 * Using fast-check for property-based testing
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  preparePayUParams,
  formatAmount,
  calculateOrderTotals,
  validateCheckoutData,
  parseQueryParams
} from './paymentHelpers';
import { generateTransactionId } from '../services/payuService';

describe('Payment Helpers - Property Tests', () => {
  /**
   * Property 2: Parameter Completeness
   * For any payment initiation, all mandatory PayU parameters should be present and non-empty
   * Validates: Requirements 1.1, 4.1
   */
  describe('Property 2: Parameter Completeness', () => {
    it('should always include all mandatory PayU parameters', () => {
      fc.assert(
        fc.property(
          fc.record({
            plan: fc.record({
              name: fc.string({ minLength: 1, maxLength: 50 })
            }),
            userCount: fc.integer({ min: 1, max: 1000 }),
            total: fc.double({ min: 1, max: 1000000, noNaN: true }),
            user: fc.record({
              displayName: fc.string({ minLength: 1, maxLength: 100 }),
              email: fc.emailAddress(),
              phoneNumber: fc.option(fc.string({ minLength: 10, maxLength: 15 })),
              uid: fc.uuid()
            })
          }),
          (checkoutData) => {
            const txnid = generateTransactionId();
            const params = preparePayUParams(checkoutData, txnid);
            
            // All mandatory parameters must be present
            const mandatoryParams = [
              'key', 'txnid', 'amount', 'productinfo',
              'firstname', 'email', 'phone', 'surl', 'furl'
            ];
            
            for (const param of mandatoryParams) {
              expect(params).toHaveProperty(param);
              expect(params[param]).toBeDefined();
            }
            
            // UDF fields should be present (can be empty strings)
            expect(params).toHaveProperty('udf1');
            expect(params).toHaveProperty('udf2');
            expect(params).toHaveProperty('udf3');
            expect(params).toHaveProperty('udf4');
            expect(params).toHaveProperty('udf5');
            
            // Amount should be formatted correctly
            expect(params.amount).toMatch(/^\d+\.\d{2}$/);
            
            // Transaction ID should match the provided one
            expect(params.txnid).toBe(txnid);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 10: Amount Calculation Consistency
   * For any order summary, the total should equal subtotal minus discount plus GST
   * Validates: Requirements 8.3, 8.4
   */
  describe('Property 10: Amount Calculation Consistency', () => {
    it('should always calculate total as subtotal - discount + GST', () => {
      fc.assert(
        fc.property(
          fc.record({
            pricePerUser: fc.double({ min: 1, max: 10000, noNaN: true }),
            userCount: fc.integer({ min: 1, max: 1000 }),
            discountPercent: fc.double({ min: 0, max: 100, noNaN: true })
          }),
          (pricing) => {
            const totals = calculateOrderTotals(pricing);
            
            // Verify subtotal calculation
            const expectedSubtotal = pricing.pricePerUser * pricing.userCount;
            expect(totals.subtotal).toBeCloseTo(expectedSubtotal, 2);
            
            // Verify discount calculation
            const expectedDiscount = (expectedSubtotal * pricing.discountPercent) / 100;
            expect(totals.discount).toBeCloseTo(expectedDiscount, 2);
            
            // Verify after discount
            const expectedAfterDiscount = expectedSubtotal - expectedDiscount;
            expect(totals.afterDiscount).toBeCloseTo(expectedAfterDiscount, 2);
            
            // Verify GST calculation (18%)
            const expectedGst = expectedAfterDiscount * 0.18;
            expect(totals.gst).toBeCloseTo(expectedGst, 2);
            
            // Verify total calculation
            const expectedTotal = expectedAfterDiscount + expectedGst;
            expect(totals.total).toBeCloseTo(expectedTotal, 2);
            
            // Verify consistency: total = subtotal - discount + GST
            const calculatedTotal = totals.subtotal - totals.discount + totals.gst;
            expect(totals.total).toBeCloseTo(calculatedTotal, 2);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle zero discount correctly', () => {
      fc.assert(
        fc.property(
          fc.record({
            pricePerUser: fc.double({ min: 1, max: 10000, noNaN: true }),
            userCount: fc.integer({ min: 1, max: 1000 })
          }),
          (pricing) => {
            const totals = calculateOrderTotals({ ...pricing, discountPercent: 0 });
            
            // With zero discount, afterDiscount should equal subtotal
            expect(totals.discount).toBe(0);
            expect(totals.afterDiscount).toBeCloseTo(totals.subtotal, 2);
            
            // Total should be subtotal + GST
            const expectedTotal = totals.subtotal * 1.18;
            expect(totals.total).toBeCloseTo(expectedTotal, 2);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle 100% discount correctly', () => {
      fc.assert(
        fc.property(
          fc.record({
            pricePerUser: fc.double({ min: 1, max: 10000, noNaN: true }),
            userCount: fc.integer({ min: 1, max: 1000 })
          }),
          (pricing) => {
            const totals = calculateOrderTotals({ ...pricing, discountPercent: 100 });
            
            // With 100% discount, afterDiscount and total should be 0
            expect(totals.discount).toBeCloseTo(totals.subtotal, 2);
            expect(totals.afterDiscount).toBeCloseTo(0, 2);
            expect(totals.gst).toBeCloseTo(0, 2);
            expect(totals.total).toBeCloseTo(0, 2);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Amount Formatting', () => {
    it('should always format amounts to 2 decimal places', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0, max: 1000000, noNaN: true }),
          (amount) => {
            const formatted = formatAmount(amount);
            
            // Should match format: digits.2decimals
            expect(formatted).toMatch(/^\d+\.\d{2}$/);
            
            // Should be parseable back to a number
            const parsed = parseFloat(formatted);
            expect(parsed).toBeCloseTo(amount, 2);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should throw error for invalid amounts', () => {
      // Test NaN
      expect(() => formatAmount(NaN)).toThrow();
      
      // Test Infinity
      expect(() => formatAmount(Infinity)).toThrow();
      
      // Test negative Infinity
      expect(() => formatAmount(-Infinity)).toThrow();
      
      // Test negative amounts
      fc.assert(
        fc.property(
          fc.double({ min: -1000000, max: -0.01, noNaN: true }),
          (invalidAmount) => {
            expect(() => formatAmount(invalidAmount)).toThrow();
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Checkout Data Validation', () => {
    it('should validate complete checkout data as valid', () => {
      fc.assert(
        fc.property(
          fc.record({
            plan: fc.record({
              name: fc.string({ minLength: 1, maxLength: 50 })
            }),
            userCount: fc.integer({ min: 1, max: 1000 }),
            total: fc.double({ min: 1, max: 1000000, noNaN: true }),
            user: fc.record({
              displayName: fc.string({ minLength: 1, maxLength: 100 }),
              email: fc.emailAddress(),
              uid: fc.uuid()
            })
          }),
          (checkoutData) => {
            const result = validateCheckoutData(checkoutData);
            
            expect(result.valid).toBe(true);
            expect(result.errors).toHaveLength(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should detect missing required fields', () => {
      // Test missing plan
      const noPlan = { userCount: 5, total: 100, user: { email: 'test@test.com', uid: '123' } };
      expect(validateCheckoutData(noPlan).valid).toBe(false);
      
      // Test missing user
      const noUser = { plan: { name: 'Pro' }, userCount: 5, total: 100 };
      expect(validateCheckoutData(noUser).valid).toBe(false);
      
      // Test invalid user count
      const invalidCount = { plan: { name: 'Pro' }, userCount: 0, total: 100, user: { email: 'test@test.com' } };
      expect(validateCheckoutData(invalidCount).valid).toBe(false);
    });
  });

  describe('Query Parameter Parsing', () => {
    it('should correctly parse URL query parameters', () => {
      fc.assert(
        fc.property(
          fc.dictionary(
            fc.string({ minLength: 1, maxLength: 20 }).filter(key => 
              key !== '__proto__' && key !== 'constructor' && key !== 'prototype'
            ),
            fc.string({ minLength: 0, maxLength: 100 })
          ),
          (params) => {
            // Create query string
            const queryString = '?' + Object.entries(params)
              .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
              .join('&');
            
            // Parse it back
            const parsed = parseQueryParams(queryString);
            
            // All original keys should be present
            for (const key of Object.keys(params)) {
              expect(parsed).toHaveProperty(key);
              expect(parsed[key]).toBe(params[key]);
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
