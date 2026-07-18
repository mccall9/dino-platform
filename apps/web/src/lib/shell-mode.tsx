import * as React from "react"

export type ShellMode = "skills" | "agents"

const ShellModeContext = React.createContext<ShellMode>("skills")

export function ShellModeProvider({
  mode,
  children,
}: {
  mode: ShellMode
  children: React.ReactNode
}) {
  return (
    <ShellModeContext.Provider value={mode}>{children}</ShellModeContext.Provider>
  )
}

export function useShellMode() {
  return React.useContext(ShellModeContext)
}
