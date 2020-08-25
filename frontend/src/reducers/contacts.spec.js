import contacts from './contacts';

const MOCK_CONTACT = {
  id: 0,
  name: 'Name1',
  alias: 'Alias1',
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

const MOCK_CONTACTS = [
  {
    id: 0,
    name: 'Name1',
    alias: 'Alias1',
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
  },
  {
    id: 1,
    name: 'Name2',
    alias: 'Alias2',
    phone: [
      {
        id: 2,
        phone: '3333-1111'
      },
      {
        id: 3,
        phone: '2222-2222'
      }
    ],
    email: [
      {
        id: 2,
        email: 'email2@gmail.com'
      },
      {
        id: 3,
        email: 'email@hotmail.com'
      }
    ]
  },
];

describe('reducers', () => {
  describe('contacts', () => {
    it('should provide the initial state', () => {
      expect(contacts(undefined, {})).toStrictEqual([]);
    });

    it('should ignore unknown actions', () => {
      expect(contacts([], { type: 'unknown' })).toStrictEqual([]);
    });

    it('should handle ADD_CONTACT action', () => {
      expect(contacts([], { type: 'ADD_CONTACT', contact: MOCK_CONTACT }).length).toBe(1);
    });

    it('should handle SET_CONTACTS action', () => {
      expect(contacts([], { type: 'SET_CONTACTS', contacts: MOCK_CONTACTS })).toStrictEqual(MOCK_CONTACTS);
    });

    it('should handle DESTROY_CONTACT action', () => {
      expect(contacts(MOCK_CONTACTS, { type: 'DESTROY_CONTACT', id: MOCK_CONTACTS[0].id }).length).toBe(1);
    });
  });
});
