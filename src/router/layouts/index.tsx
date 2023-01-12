import React, { ReactElement } from 'react'

interface LayoutProps {
  children: ReactElement
}

export const Layout = ({ children }: LayoutProps): ReactElement => {
  return <div>{children}</div>
}
