interface ApiConfig {
    baseUrl: string
}

const apiConfig: ApiConfig = {
    baseUrl: import.meta.env.VITE_API_BASE_URL || '/api'
}

export default apiConfig