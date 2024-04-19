import { Url } from 'next/dist/shared/lib/router/router'
import { NextRouter } from 'next/router'

const updatePath = (url: Url) => {
  mockRouter.query = {}
  if (typeof url === 'string') {
    mockRouter.pathname = url
  } else {
    mockRouter.pathname = url.pathname || mockRouter.pathname
    if (typeof url.query === 'object' && url !== null && url.query !== null) {
      Object.entries(url.query).forEach(([key, value]) => {
        mockRouter.query[key.toString()] = value?.toString()
      })
    }
  }
}

export const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  forward: jest.fn(),
  push: jest.fn((url: Url) => {
    updatePath(url)
    return Promise.resolve(true)
  }),
  replace: jest.fn((url: Url) => {
    updatePath(url)
    return Promise.resolve(true)
  }),
  reload: jest.fn(() => Promise.resolve(true)),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(true),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isPreview: false,
  isReady: true,
}