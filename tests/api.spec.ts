import { test, expect } from '@playwright/test'

test('GET request', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users')
    expect(response.status()).toBe(200)
    expect(await response.text()).toContain('george.bluth@reqres.in')
})

test('POST request', async ({ request }) => {
    const requestBody = {
        name: 'Donald',
        job: 'Software Engineer'
    }

    const response = await request.post('https://reqres.in/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        data: requestBody
    })
    expect(response.status()).toBe(201)
    expect(await response.text()).toContain(requestBody.name)
})