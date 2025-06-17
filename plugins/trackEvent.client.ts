/**
 * Nuxt Plugin: trackEvent
 *
 * Provides a global $trackEvent function for tracking user interaction events.
 * Events are pushed to the window.dataLayer for analytics platforms (e.g. Google Tag Manager).
 * Optionally includes AB-testing metadata from cookies if available.
 */

/**
 * Example Implementation:
 *
 * const nuxtApp = useNuxtApp();
 * nuxtApp.$trackEvent({
 *   event: "string",
 *   message: "string",
 *   data: { name: "string" }
 * })
 */

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const trackEvent = (payload: {
    event: string; 
    message: string; 
    data?: object 
  }) => {
    // Utility: read cookie value by name
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
      return match ? match[2] : null
    }

    // Check if AB testing is enabled via cookie
    const abTestingEnabled = getCookie('ab-testing') === 'true'
    const abTestingVersion = getCookie('ab-testing-version')

    // Add AB testing data if applicable
    const abTestingData = abTestingEnabled
      ? {
          abTestingEnabled: true,
          version: abTestingVersion
        }
      : {}

    // Construct the final event payload
    const eventData = {
      pagePath: window.location.pathname,
      ...payload,
      ...abTestingData
    }

    // Log for debugging
    console.log('Tracking event:', eventData)

    // Push event to dataLayer if available (for GTM or similar)
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push(eventData)
    } else {
      console.warn('trackEvent called but window is not available')
    }
  }

  // Make the trackEvent function available as $trackEvent in the Nuxt app
  nuxtApp.provide('trackEvent', trackEvent)
})