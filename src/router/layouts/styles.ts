import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    maxWidth: '100vw',
    background: theme.palette.background.paper,
  },
  loginLayout: {
    height: '100vh',
    maxWidth: '100vw',
    background: theme.palette.background.default,
  },
  content: {
    display: 'flex',
    gap: 24,
  },
  pageWrapper: {
    width: '100%',
    maxWidth: 'calc(100vw - 308px)',
    height: '100%',
    maxHeight: 'calc(100vh - 70px)',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 0,
    },
  },
}))
