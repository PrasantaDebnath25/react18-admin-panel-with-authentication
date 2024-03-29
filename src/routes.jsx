import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import SiteLayout from './layouts/SiteLayout';
import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';

import GuestGuard from './guards/GuestGuard';
import UserGuard from './guards/UserGuard';

import LoadingScreen from './components/LoadingScreen';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={props => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  // anonymous routes
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('./views/errors/404'))
  },
  {
    exact: true,
    layout: SiteLayout,
    path: '/register',
    component: lazy(() => import('./views/auth/Register'))
  },
  {
    exact: true,
    layout: SiteLayout,
    guard: GuestGuard,
    path: '/',
    component: () => <Redirect to="/login" />
    // component: lazy(() => import('./views/auth/Login'))
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: SiteLayout,
    path: '/login',
    component: lazy(() => import('./views/auth/Login'))
  },
  {
    exact: true,
    layout: SiteLayout,
    path: '/forgot-password',
    component: lazy(() => import('./views/auth/ForgetPass'))
  },
  {
    layout: SiteLayout,
    exact: true,
    path: '/otp-verification',
    component: lazy(() => import('./views/auth/ForgetPass/VerifyAccountPassword'))
  },
  {
    exact: true,
    path: '/reset-password',
    layout: SiteLayout,
    component: lazy(() => import('./views/auth/ResetPass'))
  },
  
  
  {
    exact: true ,
    layout: SiteLayout,
    path: '/successfully-password-reset', 
    component: lazy(() => import('./views/auth/ResetPass/Successful'))
  },
  // user routes
  {
    // path: '/user',
    guard: UserGuard,
    layout: MainLayout,
    routes: [
      {
        path: '/user/about',
        exact: true,
        component: lazy(() => import( './views/user/About/About'))
      },
      {
        exact: true,
        path: '/user/dashboard',
        component: lazy(() => import('./views/user/Dashboard/Dashboard'))
      },
      {
        exact: true,
        path: '/user/listing',
        component: lazy(() => import('./views/user/Listing/Listing'))
      },
      {


        exact: true,
        path: '/user/edit-profile',
        component: lazy(() => import('./views/user/EditProfile/EditProfile'))
      },
      {
        //Change
        exact: true,
        path: '/user/change-passsword',
        component: lazy(() => import('./views/user/ChangePasssword/ChangePasssword'))
      },

      {
        exact: true,
        path: '/user/help',
        component: lazy(() => import('./views/user/Help/help'))
      },
    
      {
        exact: true,
        path: '/user',
        component: () => <Redirect to="/user/about" />
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },

  {
    path: '*',
    layout: HomeLayout,
    routes: [
      {
        exact: true,
        path: '/',
        component: lazy(() => import('./views/Home'))
      },
      {
        exact: true,
        path: '/terms',
        component: lazy(() => import('./views/Home/TermsCondition'))
      },
      {
        exact: true,
        path: '/privacy',
        component: lazy(() => import('./views/Home/PrivacyPolicy'))
      },
      
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }

];

export default routes;
