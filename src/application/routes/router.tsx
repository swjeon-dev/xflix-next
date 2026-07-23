import { createBrowserRouter } from 'react-router'

import ErrorPage from '@/app(temp)/Error'
import Home from '@/app(temp)/page'
import { LoadingScreen, routes, removeRootPath } from '@/shared'
import RootLayout from './RootLayout'
import { rootLoader } from './rootLoader'
import { LOADER_ID } from '../providers/constants'

export const router = createBrowserRouter(
  [
    {
      path: routes.ROOT,
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      loader: rootLoader,
      shouldRevalidate: () => false,
      id: LOADER_ID,
      HydrateFallback: () => <LoadingScreen />,
      children: [
        { index: true, element: <Home /> },
        {
          path: removeRootPath(routes.MOVIE.LIST),
          children: [
            {
              index: true,
              lazy: async () => {
                const { default: Movie } = await import('@/app(temp)/Movie')
                return { Component: Movie }
              },
            },
            {
              path: removeRootPath(routes.MOVIE.PARAMETER),
              lazy: async () => {
                const { default: MovieDetail } =
                  await import('@/app(temp)/MovieDetail')
                return { Component: MovieDetail }
              },
            },
          ],
        },
        {
          path: removeRootPath(routes.TV.LIST),
          children: [
            {
              index: true,
              lazy: async () => {
                const { default: TV } = await import('@/app(temp)/TV')
                return { Component: TV }
              },
            },
            {
              path: removeRootPath(routes.TV.PARAMETER),
              lazy: async () => {
                const { default: TVDetail } =
                  await import('@/app(temp)/TVDetail')
                return { Component: TVDetail }
              },
            },
          ],
        },
        {
          path: removeRootPath(routes.SEARCH.LIST),
          lazy: async () => {
            const { default: Search } = await import('@/app(temp)/Search')
            return { Component: Search }
          },
        },
      ],
    },
  ],
  { basename: import.meta.env.DEV ? '/' : '/Xflix--sw' },
)
