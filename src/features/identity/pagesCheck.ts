import Cookies from 'js-cookie';
import { useEffect, useState } from 'react'

export enum PageNames {
  Roles = ' Roles',
  Users = ' Users',
}


const generalConfigListToLink: Map<string, string> = new Map([
  [PageNames.Roles, '/admin/roles'],
  [PageNames.Users, '/admin/users'],
]);


const locationConfigListToLink = new Map<string, string>([
  // [PageNames.Location, '/admin/location'],
  // [PageNames.Routes, '/admin/routes'],
])
const rolesConfigToLink = new Map<string, string>([
  [PageNames.Roles, '/admin/roles'],
])

const adminAccessToLinks = new Map([
  ['GeneralConfiguration:View', generalConfigListToLink],
  ['Role:View', rolesConfigToLink],
])

export const useViewPage = (page: string) => {
  const [isLoading, setIsLoading] = useState(true)
  const isLoggedIn = Cookies.get('loggedIn')
  const claims = Cookies.get('claims')

  useEffect(() => {
    const redirectToLogin = () => {
      window.location.replace('/login')
    }

    const redirectToUnauthorized = () => {
      window.location.replace('/unauthorized')
    }

    const pageClaimsMapping = new Map<string, string>()
    adminAccessToLinks.forEach((pages, claim) => {
      pages.forEach((pageName) => {
        pageClaimsMapping.set(pageName, claim)
      })
    })

    if (claims === undefined) {
      window.location.replace('/login')
    }

    if (!isLoggedIn || isLoggedIn !== 'True') {
      redirectToLogin()
    } else {
      if (claims?.toLowerCase().includes('admin')) {
        setIsLoading(false)
        return
      }

      const requiredClaim = pageClaimsMapping.get(page)
      if (
        !requiredClaim ||
        !claims?.toLowerCase().includes(requiredClaim.toLowerCase())
      ) {
        // If the user's claims do not include the required claim for the page, redirect to unauthorized page
        redirectToUnauthorized()
      } else {
        setIsLoading(false)
      }
    }
  }, [page, claims, isLoggedIn])

  return { isLoading }
}

export const useGetAdminPagesList = () => {
  const claims = Cookies.get('claims')

  if (!claims) {
    return new Map()
  }
  const pagesToView = new Map<string, string>()

  if (claims.toLowerCase().includes('admin')) {
    adminAccessToLinks.forEach((map) => {
      map.forEach((value, key) => {
        pagesToView.set(key, value)
      })
    })
    return pagesToView
  } else {
    const claimsList = claims.split(',')

    claimsList.forEach((claim) => {
      adminAccessToLinks.forEach((value, key) => {
        if (claim.toLowerCase() === key.toLowerCase()) {
          value.forEach((linkValue, linkKey) => {
            pagesToView.set(linkKey, linkValue)
          })
        }
      })
    })

    return pagesToView
  }
}
