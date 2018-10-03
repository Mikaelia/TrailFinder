import { GET_UID } from './types'

//dispatches action of type 'NOTIFY_USER'
export const getUID = (message, messageType) => {
  return {
    type: NOTIFY_USER,
    message,
    messageType
  }
}