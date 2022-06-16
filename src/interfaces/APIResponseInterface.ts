export default interface APIResponseInterface<T = string> {
  success: boolean
  message: string
  data: T
  error?: any
}
