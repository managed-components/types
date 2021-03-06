import { ComponentSettings, Manager } from '../index'

export default async function (manager: Manager, settings: ComponentSettings) {
  const myRoute = manager.route('/resetCache', (request: Request) => {
    manager.invalidateCache('weather-Iceland')
    manager.invalidateCache('weather-Tobago')
    manager.invalidateCache('weather-Kyoto')
    return new Response(`You made a ${request.method} request`)
  })
  console.log('demoComponent exposes an endpoint at', myRoute)

  const myProxiedRoute = manager.proxy('/gate/*', 'http://n-gate.com')
  console.log(`demoComponent proxies ${myProxiedRoute} to http://n-gate.com`)

  const myStaticFile = manager.serve('/cheese', './assets/Camembert.jpg')
  console.log(`demoComponent serves a file at ${myStaticFile}`)

  if (settings.ecommerce) {
    manager.addEventListener('ecommerce', event => {
      console.log('event:', event)
      if (event.name === 'Purchase') {
        console.info('Ka-ching! ð°', event.payload)
      }
    })
  }

  manager.createEventListener('mousemove', async event => {
    const { payload } = event
    console.info('ð ðŠĪ Mousemove:', payload)
  })

  manager.createEventListener('mousedown', async event => {
    // Save mouse coordinates as a cookie
    const { client, payload } = event
    console.info('ð âŽïļ Mousedown payload:', payload)
    const [firstClick] = payload.mousedown
    client.set('lastClickX', firstClick.clientX)
    client.set('lastClickY', firstClick.clientY)
  })

  manager.createEventListener('historyChange', async event => {
    console.info('ðĢ Ch Ch Ch Chaaanges to history detected!', event.payload)
  })

  manager.createEventListener('resize', async event => {
    console.info('ðŠ New window size!', event.payload)
  })

  manager.createEventListener('scroll', async event => {
    console.info('ððð They see me scrollin...they hatin...', event.payload)
  })

  manager.createEventListener('resourcePerformanceEntry', async event => {
    console.info(
      'Witness the fitness - fresh resourcePerformanceEntry',
      event.payload
    )
  })

  manager.addEventListener('clientcreated', ({ client }) => {
    console.log('clientcreated!: ðĢ')
    const clientNumber = client.get('clientNumber')
    if (!clientNumber) {
      const num = Math.random()
      client.set('clientNumber', num.toString())
    }
    if (parseFloat(clientNumber as string) > 0.5) {
      client.attachEvent('mousemove')
    }

    client.attachEvent('mousedown')
    client.detachEvent('mousedown')
    client.attachEvent('historyChange')
    client.attachEvent('scroll')
    client.attachEvent('resize')
    client.attachEvent('resourcePerformanceEntry')
  })

  manager.addEventListener('event', async event => {
    const { client, payload } = event
    if (payload.name === 'cheese') {
      console.info('ð§ð§  cheese event! ð§ð§')
      client.execute('console.log("ð§ð§  cheese event! ð§ð§")')
    }
    payload.user_id = client.get('user_id')

    if (Object.keys(payload || {}).length) {
      const params = new URLSearchParams(payload).toString()
      fetch(`http://www.example.com/?${params}`)
    }
  })

  manager.addEventListener('pageview', async event => {
    const { client } = event
    console.info(
      'ð Pageview received!',
      client.get('user_id'),
      client.get('last_page_title'),
      client.get('session_id')
    )
    const user_id = client.url.searchParams.get('user_id')
    client.set('user_id', user_id, {
      scope: 'infinite',
    })
    client.title &&
      client.set('last_page_title', client.title, {
        scope: 'page',
      })
    client.set('session_id', 'session_date_' + new Date().toUTCString(), {
      scope: 'session',
    })
    client.return('Some very important value')
    client.execute('console.info("Page view processed by Demo Component")')
    client.fetch('http://example.com', { mode: 'no-cors' })
  })

  manager.registerEmbed(
    'weather-example',
    async ({ parameters }: { parameters: { [k: string]: unknown } }) => {
      const location = parameters['location']
      const embed = await manager.useCache('weather-' + location, async () => {
        try {
          const response = await fetch(`https://wttr.in/${location}?format=j1`)
          const data = await response.json()
          const [summary] = data.current_condition
          const { temp_C } = summary
          return `<p>Temperature in ${location} is: ${temp_C} &#8451;</p>`
        } catch (error) {
          console.error('error fetching weather for embed:', error)
        }
      })
      return embed
    }
  )

  manager.registerWidget(async () => {
    const location = 'Colombia'
    const widget = await manager.useCache('weather-' + location, async () => {
      try {
        const response = await fetch(`https://wttr.in/${location}?format=j1`)
        const data = await response.json()
        const [summary] = data.current_condition
        const { temp_C } = summary
        return `<p>Temperature in ${location} is: ${temp_C} &#8451;</p>`
      } catch (error) {
        console.error('error fetching weather for widget:', error)
      }
    })
    return widget
  })
}
