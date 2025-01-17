/* eslint-disable no-console */

import { wait } from '../../../../test/utils/wait';

// export is needed for TS isolatedModules
// eslint-disable-next-line jest/no-export
export {};

describe('toWarnDev', () => {
  describe('usage', () => {
    test('fails with incorrect type of message', () => {
      expect(() => {
        // @ts-expect-error
        expect(() => {}).toWarnDev(false);
      }).toThrowErrorMatchingInlineSnapshot(
        `"toWarnDev() requires a parameter of type string but was given boolean."`
      );
    });
  });

  if (__DEV__) {
    describe('without message', () => {
      test('does not fail if called', () => {
        expect(() => {
          expect(() => {
            console.warn('warning');
          }).toWarnDev();
        }).not.toThrow();
      });

      test('fails if not called', () => {
        expect(() => {
          expect(() => {}).toWarnDev();
        }).toThrowErrorMatchingInlineSnapshot(`"No warning recorded."`);
      });
    });

    describe('with message', () => {
      test('does not fail with correct message', () => {
        expect(() => {
          expect(() => {
            console.warn('warning');
          }).toWarnDev('warning');
        }).not.toThrow();
      });

      test('fails if a warning is not correct', () => {
        expect(() => {
          expect(() => {
            console.warn('warning');
          }).toWarnDev('another warning');
        }).toThrow(/Unexpected warning recorded./);
      });
    });

    describe('with async callback', () => {
      test('does not fail with correct message', async () => {
        await expect(async () => {
          await expect(async () => {
            console.warn('warning');
            await wait(0);
          }).toWarnDev('warning');
        }).not.toThrow();
      });

      test('fails if a warning is not correct', async () => {
        await expect(async () => {
          await expect(async () => {
            console.warn('warning');
            await wait(0);
          }).toWarnDev('another warning');
        }).rejects.toThrow(/Unexpected warning recorded./);
      });
    });
  }
});
