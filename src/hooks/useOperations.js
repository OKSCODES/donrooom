import { useContext } from 'react'
import { OperationsContext } from '../contexts/operations-context'
export function useOperations(){const value=useContext(OperationsContext);if(!value)throw new Error('useOperations must be used within OperationsProvider');return value}
