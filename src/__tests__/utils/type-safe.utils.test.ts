import { recordValues } from '@utils/type-safe.utils.';

describe('recordValues', () => {
  it('should maintain type safety in the returned array', () => {
    type TestValue = {
      id: number;
      data: string;
    };

    const mockedRecord: Record<string, TestValue> = {
      a: { id: 1, data: 'test value 1' },
      b: { id: 2, data: 'tet value 2' },
    };

    const result = recordValues(mockedRecord);
    result.forEach((item) => {
      expect(typeof item.id).toBe('number');
      expect(typeof item.data).toBe('string');
    });
  });
});
