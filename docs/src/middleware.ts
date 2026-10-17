import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next()

  if (response.status === 404) {
    return context.redirect('/', 302)
  }

  return response
})
