import { Container, Typography, Grid, Box } from '@mui/material'

export default function Footer() {
  return (
    <div style={{backgroundColor: '#141414', width: '100%', height: '100%'}}>
      <Container>
        <Typography align="center" sx={{pt: 4, pb: 4, color: 'white'}}>
          <h1>Replasc 2022</h1>
          <h5 style={{ fontWeight: '300' }}>Aplikasi pengelolaan sampah.</h5>
          </Typography>
      </Container>
      <Grid container justifyContent="center">
        <Box sx={{ 
          height: 60,
          backgroundColor: 'black',
        }}
          style={{ width: '100%' }}
        >
          <Typography align="center" sx={{color: 'white'}}>
            <p>Copyright &copy; Replasc, 2022</p>
          </Typography>
        </Box>
      </Grid>
    </div>  
  )
}
