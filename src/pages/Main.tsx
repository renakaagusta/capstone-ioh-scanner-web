import { Box, Button, Grid, Typography } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useState } from "react"
import { QrReader } from 'react-qr-reader'
import { toast } from "react-toastify"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { API_URL } from "../contants"
import TrashReportInterface from "../interfaces/api-responses/TrashReportInterface"
import UserInterface from "../interfaces/api-responses/UserInterface"
import APIResponseInterface from "../interfaces/APIResponseInterface"

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

export default function Main() {
  const [step, setStep] = useState<string>('welcome')
  const [isLoading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<UserInterface>()
  const [trashReport, setTrashReport] = useState<TrashReportInterface>() 

  return (
    <ThemeProvider theme={theme}>
      {/* Navbar */}
      <Navbar />
      {/* Main */}
      <Grid container direction="row" justifyContent="center" alignItems="center" minHeight="30vh" style={{ backgroundColor: 'lightGrey' }}>
        <Grid item xs={6}>
          {step === 'welcome' && <>
            <Box>
              <Box textAlign="center" marginY={15} paddingY={5} sx={{ backgroundColor: 'white' }}>
                <Typography variant="h3">Selamat datang di Replasc</Typography>
                <Typography variant="h6">Klik mulai untuk scan QR anda</Typography>
                <Button variant="contained" color="success" sx={{ marginTop: 6 }} onClick={()=>setStep('scan')}>Scan</Button>
              </Box>
            </Box>
          </>}
          {step === 'scan' && <>
            <QrReader
              constraints={{}}
              onResult={(result, error) => {
                if (!!result) {
                  const reportId = result.getText()

                  setLoading(true)

                  if (reportId && !isLoading) {
                    const form = new URLSearchParams()  
                    form.append('status', 'completed')

                    const fetchInitOpt: RequestInit = {
                      method: 'POST',
                      body: form
                    }
                    interface TrashReportUpdateStatusResponse {
                      user: UserInterface
                      trashReport: TrashReportInterface
                    }

                    fetch(`${API_URL}/trash-report/${reportId}/status`, fetchInitOpt)
                      .then(response => response.json())
                      .then((response: APIResponseInterface<TrashReportUpdateStatusResponse>) => {
                        if (!response.success) {
                          toast('Oops QR yang anda masukan salah atau Laporan tidak valid', { type: 'error', position: 'top-center' })
                          return
                        }

                        const { data } = response
                        const { user, trashReport } = data

                        setUser(user)
                        setTrashReport(trashReport)
                        setStep('result')
                        setLoading(false)

                        toast('Berhasil memperbarui status pelaporan sampah!', { type: 'success', position: 'top-center' })
                      })
                      .catch(() => toast('Terjadi kegagalan jaringan!', { type: 'error' }))
                  }
                }

                if (!!error) {
                  console.info(error);
                }
              }}
            /></>}
          {step === 'result' && <>
            <Box>
              <Box textAlign="center" marginY={15} paddingY={5} sx={{ backgroundColor: 'white' }}>
                <Typography variant="h3">Laporan sampah diterima</Typography>
                <Typography variant="h6">User : {user?.fullname}</Typography>
                <Button variant="contained" color="success" sx={{ marginTop: 6 }} onClick={()=>setStep('scan')}>Scan</Button>
              </Box>
            </Box>
          </>}
        </Grid>
      </Grid>
      <Footer />
    </ThemeProvider>
  )
}
