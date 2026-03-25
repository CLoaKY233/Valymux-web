"use client"

import { useEffect, useState } from "react"

const GITHUB_API_URL = "https://api.github.com/repos/CLoaKY233/Valymux"
const CACHE_KEY = "valymux_github_stars"
const CACHE_DURATION_MS = 10 * 60 * 1000 // 10 minutes

interface CachedStars {
  count: number
  timestamp: number
}

export function useGitHubStars() {
  const [stars, setStars] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check sessionStorage cache first
    try {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsed: CachedStars = JSON.parse(cached)
        if (Date.now() - parsed.timestamp < CACHE_DURATION_MS) {
          setStars(parsed.count)
          setLoading(false)
          return
        }
      }
    } catch {
      // sessionStorage unavailable or parse error — continue to fetch
    }

    const controller = new AbortController()

    fetch(GITHUB_API_URL, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github.v3+json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const count = data.stargazers_count ?? 0
        setStars(count)
        try {
          sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ count, timestamp: Date.now() } satisfies CachedStars)
          )
        } catch {
          // sessionStorage full or unavailable
        }
      })
      .catch(() => {
        // Rate-limited or network error — leave stars as null
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return { stars, loading }
}
