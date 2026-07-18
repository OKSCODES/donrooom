import { useCallback, useEffect, useMemo, useState } from 'react'
import { DEFAULT_APP_SETTINGS, DEFAULT_FEATURE_FLAGS } from '../constants/operations'
import { getOperationalSettings } from '../services/operationsService'
import { OperationsContext } from './operations-context'

export function OperationsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_APP_SETTINGS)
  const [flags, setFlags] = useState(DEFAULT_FEATURE_FLAGS)
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useCallback(async () => {
    try {
      const data = await getOperationalSettings()
      setSettings(data.settings)
      setFlags(data.flags)
    } finally { setIsLoading(false) }
  }, [])
  useEffect(() => { refresh() }, [refresh])
  const value = useMemo(() => ({ settings, flags, isLoading, refresh, setSettings, setFlags, isEnabled: (name) => flags[name] !== false }), [flags, isLoading, refresh, settings])
  return <OperationsContext.Provider value={value}>{children}</OperationsContext.Provider>
}
