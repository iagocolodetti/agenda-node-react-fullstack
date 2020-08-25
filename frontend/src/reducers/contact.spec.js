import contact from './contact';

const MOCK_CONTACT = {
  name: 'Name',
  alias: 'Alias',
  phone: [
    {
      id: 0,
      phone: '1111-1111'
    },
    {
      id: 1,
      phone: '2222-2222'
    }
  ],
  email: [
    {
      id: 0,
      email: 'email@gmail.com'
    },
    {
      id: 1,
      email: 'email@hotmail.com'
    }
  ]
}

describe('reducers', () => {
  describe('contact', () => {
    it('should provide the initial state', () => {
      expect(contact(undefined, {})).toBe(null);
    });

    it('should ignore unknown actions', () => {
      expect(contact(null, { type: 'unknown' })).toBe(null);
    });

    it('should handle SET_CONTACT action', () => {
      expect(contact(null, { type: 'SET_CONTACT', contact: MOCK_CONTACT })).toBe(MOCK_CONTACT);
    });
  });
});
