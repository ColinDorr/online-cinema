import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const trackEvent = (payload: {
    event: string; 
    message: string; 
    data?: object 
  }) => {
    const eventData = {
      pagePath: window.location.pathname,
      ...payload,
    }
    console.log('Tracking event:', eventData)

    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push(eventData)
    } else {
      console.warn('trackEvent called but window is not available')
    }
  }

  nuxtApp.provide('trackEvent', trackEvent)
})