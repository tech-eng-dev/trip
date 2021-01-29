export default {
  state: {
    params: {
      role: 'User',
      user: {
        name: 'Tian Li',
        role: 'User',
        uid: 'VZx9D1IMIdT0gXCtsh2mymcXawd2',
        email: 'litian19901120@gmail.com',
        blocked: false,
        photo: '',
      },
      trip: {
        comment: 'Test',
        createdTime: '1518174116204',
        startDate: '2018-02-02',
        endDate: '2018-02-28',
        location: {
          description: 'test',
          geometry: {
            location: {
              lat: 12.34,
              lng: 12.34,
            },
            viewport: {
              northeast: {
                lat: 12.34,
                lng: 12.34,
              },
              southwest: {
                lat: 12.34,
                lng: 12.34,
              },
            },
          },
          id: 'ad013b06650801c352d643dc90db93210e5d07cb',
        },
      },
    },
  },
  goBack: jest.fn(),
};

