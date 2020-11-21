import autosoloMaths from './autosolo-maths';

const drivers = [
  {
    id: '123',
    name: 'Andy',
    number: '1',
    group: 'a',
    times: {
      1: {
        1: 10,
        2: 11,
        3: 12,
      },
      2: {
        1: 20,
        2: 30,
        3: 40,
      },
    },
  }, {
    id: '123',
    name: 'Ben',
    number: '2',
    group: 'b',
    times: {
      1: {
        1: 11,
        2: 11,
        3: 12,
      },
      2: {
        1: 20,
        2: 30,
        3: 40,
      },
    },
  }, {
    id: '123',
    name: 'Charlie',
    number: '3',
    group: 'c',
    times: {
      1: {
        1: 11,
        2: null,
        3: 12,
      },
      2: {
        1: 20,
        2: 30,
        3: 40,
      },
    },
  }, {
    id: '123',
    name: 'Doug',
    number: '4',
    group: 'd',
    times: {
      1: {
        1: 11,
        2: null,
        3: null,
      },
      2: {
        1: 20,
        2: 30,
        3: 40,
      },
    },
  },
];

const config = {
  1: { toCount: 2 },
  2: { toCount: 2 },
};

describe('autosoloMaths', () => {
  describe('calculateRunTotal calculates total', () => {
    it('when all runs count', () => {
      expect(autosoloMaths.calculateRunTotal(1, drivers, 3, drivers[0].times['1'])).toEqual(33);
    });

    it('when 2 out of 3 runs count', () => {
      expect(autosoloMaths.calculateRunTotal(1, drivers, 2, drivers[0].times['1'])).toEqual(21);
    });

    it('when driver has 1 wrong test', () => {
      expect(autosoloMaths.calculateRunTotal(1, drivers, 2, drivers[2].times['1'])).toEqual(23);
    });

    it('when driver has 2 wrong test', () => {
      expect(autosoloMaths.calculateRunTotal(1, drivers, 2, drivers[3].times['1'])).toEqual(41);
    });

    it('of undefined toCount runs have not been completed', () => {
      expect(autosoloMaths.calculateRunTotal(1, drivers, 4, drivers[0].times['1'])).toEqual(undefined);
    });
  });

  describe('calculateTotal calculates total', () => {
    it('if number of courses completed', () => {
      expect(autosoloMaths.calculateTotal(2, drivers, config, drivers[0].times)).toEqual(71);
    });

    it('number of courses is less than completed', () => {
      expect(autosoloMaths.calculateTotal(1, drivers, config, drivers[0].times)).toEqual(21);
    });

    it('of undefined if number of courses does not match completed courses', () => {
      expect(autosoloMaths.calculateTotal(3, drivers, config, drivers[0].times)).toEqual(undefined);
    });
  });

  describe('findFastestRun', () => {
    it('finds the fastest run of a given course', () => {
      expect(autosoloMaths.findFastestRun(1, drivers)).toEqual(10);
    });

    it('returns Infinity if course has not been run', () => {
      expect(autosoloMaths.findFastestRun(10, drivers)).toEqual(Infinity);
    });
  });

  describe('calculateMaximumTime', () => {
    it('finds the maximum time of a given course', () => {
      expect(autosoloMaths.calculateMaximumTime(1, drivers)).toEqual(30);
    });

    it('allows non default penalty to be applied', () => {
      expect(autosoloMaths.calculateMaximumTime(1, drivers, 22)).toEqual(32);
    });

    it('returns Infinity if course has not been run', () => {
      expect(autosoloMaths.calculateMaximumTime(10, drivers)).toEqual(Infinity);
    });
  });
});
