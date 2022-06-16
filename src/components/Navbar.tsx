import { AppBar, Container, Toolbar, Typography, useMediaQuery } from "@mui/material"
import { createTheme } from '@mui/material/styles'
import DrawerComponent from "./Drawer"

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        style: {
          height: '40px'
        }
      }
    }
  },
  palette: {
    secondary: {
      main: '#141414',
      light: '#ffffff'
    },
  },
})

export default function Navbar() {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <>
      {isMobile ? (
        <DrawerComponent/>
      ) : (
        <div style={{ marginBottom : '18px' }}>
          <AppBar color='inherit'>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <img
                    src="/replasc.png"
                    alt='Logo'
                    width='40'
                    style={{ paddingTop: '20px', paddingBottom: '20px', marginRight: 20 }}
                  />
                <Typography 
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  Replasc
                </Typography>
              </Toolbar>
            </Container>
          </AppBar>
        </div>
      )}
    </>
  )
}