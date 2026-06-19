/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useCallback } from 'react'
import { ACTIONS, initialState, orchidReducer } from '../reducers/orchidReducer.js'
import * as orchidApi from '../utils/orchidApi.js'

const OrchidContext = createContext(null)

export function OrchidProvider({ children }) {
  const [state, dispatch] = useReducer(orchidReducer, initialState)

  const fetchOrchids = useCallback(async () => {
    dispatch({ type: ACTIONS.FETCH_START })
    try {
      const res = await orchidApi.getAllOrchids()
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: res.data })
    } catch (err) {
      dispatch({
        type: ACTIONS.FETCH_ERROR,
        payload: err.message || 'Không tải được danh sách orchid',
      })
    }
  }, [])

  const addOrchid = useCallback(async (data) => {
    const res = await orchidApi.createOrchid(data)
    dispatch({ type: ACTIONS.ADD, payload: res.data })
    return res.data
  }, [])

  const editOrchid = useCallback(async (id, data) => {
    const res = await orchidApi.updateOrchid(id, data)
    dispatch({ type: ACTIONS.UPDATE, payload: res.data })
    return res.data
  }, [])

  const removeOrchid = useCallback(async (id) => {
    await orchidApi.deleteOrchid(id)
    dispatch({ type: ACTIONS.DELETE, payload: id })
  }, [])

  const value = {
    ...state,
    fetchOrchids,
    addOrchid,
    editOrchid,
    removeOrchid,
  }

  return <OrchidContext.Provider value={value}>{children}</OrchidContext.Provider>
}

export function useOrchid() {
  const context = useContext(OrchidContext)
  if (!context) {
    throw new Error('useOrchid must be used within an OrchidProvider')
  }
  return context
}
