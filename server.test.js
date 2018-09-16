const fetch = require("node-fetch")

describe("server", () => {
  describe('api1', () => {
    it('DELETE /api1/delete', async () => {
      const response = await fetch('http://localhost:3000/api1', {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({})
      })
      const json = await response.json()
      expect(json.ok).toBe(1)
    })
  
    it("POST /api1/save", async () => {
      const message = {
        name: 'Geo',
        text: 'Sup dude'
      }
      const response = await fetch('http://localhost:3000/api1/save', {
        method: 'POST',
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify(message)
      })
      const json = await response.json()
      expect(json.ok).toBe(1)
    })
  
    it('GET /api1/load', async () => {
      const response = await fetch('http://localhost:3000/api1/load')
      const notes = await response.json()
      expect(notes).toHaveLength(1)
    })
  })

  describe('api2', () => {
    it('DELETE /api2/delete', async () => {
      const response = await fetch('http://localhost:3000/api2', {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({})
      })
      const json = await response.json()
      expect(json.ok).toBe(1)
    })
  
    it("POST /api2/save", async () => {
      const message = {
        name: 'Geo',
        text: 'Sup dude'
      }
      const response = await fetch('http://localhost:3000/api2/save', {
        method: 'POST',
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify(message)
      })
      const json = await response.json()
      expect(json.ok).toBe(1)
    })
  
    it('GET /api2/load', async () => {
      const response = await fetch('http://localhost:3000/api2/load')
      const notes = await response.json()
      expect(notes).toHaveLength(1)
    })
  })

})
