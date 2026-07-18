import { useEffect, useMemo, useState } from 'react'
import { THEME } from '../constants/theme'
import { ThemeContext } from './theme-context'

const STORAGE_KEY='donroom-theme'
function resolve(mode){if(mode==='system')return window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';return mode}
export function ThemeProvider({ children }) {
  const [mode,setMode]=useState(()=>localStorage.getItem(STORAGE_KEY)||'system')
  useEffect(()=>{const applied=resolve(mode);document.documentElement.dataset.theme=applied;document.documentElement.style.colorScheme=applied;localStorage.setItem(STORAGE_KEY,mode);const media=window.matchMedia('(prefers-color-scheme: dark)');const update=()=>{if(mode==='system'){document.documentElement.dataset.theme=resolve(mode)}};media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[mode])
  const value=useMemo(()=>({theme:THEME,mode,setMode,resolvedTheme:resolve(mode)}),[mode])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
