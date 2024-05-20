import { useAddRoleClaims } from '@/features/identity/api/addRoleClaims'
import { useGetClaims } from '@/features/identity/api/getClaims'
import { useGetRoles } from '@/features/identity/api/getRoles'
import { Role } from '@/features/identity/types/roles'
import PageClaimsCard from '@/features/roles/components/PageClaimsCard'
import { useNotificationStore } from '@/stores/notifications'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material'
import React, { useState } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  data: Role | null
  onSave: (role: Role) => void
}

const RoleModal: React.FC<ModalProps> = ({ open, onClose, data }) => {
  const {
    data: rolesData,
    isLoading: rolesIsLoading,
    error: rolesError,
    refetch: refetchRoles,
  } = useGetRoles()
  const { mutate: addClaimsMutation } = useAddRoleClaims()
  const { isLoading: claimsIsLoading, error: claimsError } = useGetClaims()

  const [currentRole, setCurrentRole] = useState<string>('')
  const [userClaims, setUserClaims] = useState<string[]>([])

  const addNotification = useNotificationStore((state) => state.addNotification)
  const roleId = data?.role || null

  const handleClaimsChange = (role: string, claims: string[]) => {
    console.log(`Updated claims for ${role}:`, claims)
    setUserClaims(claims)
  }

  const handleSaveClick = () => {
    if (currentRole && userClaims) {
      addClaimsMutation(
        { roleName: currentRole, claims: userClaims },
        {
          onSuccess: () => {
            addNotification({
              type: 'success',
              title: 'Success',
              message: 'Permissions added to role successfully',
            })
            refetchRoles()
            onClose()
          },
          onError: (error) => {
            console.error('Failed to add permissions:', error)
            addNotification({
              type: 'error',
              title: 'Error',
              message: 'Failed to add permissions:',
            })
          },
        }
      )
    } else {
      console.error('Current role or user claims are missing')
      addNotification({
        type: 'warning',
        title: 'Warning',
        message: 'No permissions were added',
      })
    }
  }

  if (rolesIsLoading || claimsIsLoading) {
    return <div>Loading...</div>
  }

  if (rolesError || claimsError) {
    return (
      <div>
        Error:{' '}
        {(rolesError as Error)?.message || (claimsError as Error)?.message}
      </div>
    )
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <h3 style={{ margin: '2rem' }}>Role Permissions - {roleId}</h3>
      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PageClaimsCard
            id={roleId ?? ''}
            currentClaims={rolesData || []}
            onClaimsChange={handleClaimsChange}
            currentRole={currentRole}
            setCurrentRole={setCurrentRole}
            userClaims={userClaims}
            setUserClaims={setUserClaims}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ marginRight: '1rem', marginBottom: '.5rem' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveClick}>
            Update Role
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default RoleModal
