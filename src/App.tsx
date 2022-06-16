import { LinearProgress } from "@mui/material"
import { Fragment, lazy, Suspense } from "react"
import { Helmet } from "react-helmet"
import { BrowserRouter, Route, Switch } from "react-router-dom"

const Main = lazy(() => import('./pages/Main'))

export default function App() {
  return (
    <Fragment>
      <Helmet>
        <title>Replasc</title>
      </Helmet>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Suspense fallback={<LinearProgress/>}>
              <Main />
            </Suspense>
          </Route>
        </Switch>
      </BrowserRouter>
    </Fragment>
  )
}
