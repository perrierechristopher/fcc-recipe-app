import { URLSearchParams } from "url";
import 'dotenv/config'
const BASEURL = "https://api.spoonacular.com"


const API_KEY = process.env.API_KEY;

export const searchRecipes = async (searchTerm: string, page: number) => {
    if (!API_KEY) {
        throw new Error("API key not found")
    }
    
    const baseURL = BASEURL+"/recipes/complexSearch"
    const url = new URL(baseURL)
    
    const queryParams: any = {
        apiKey: API_KEY,
        query: searchTerm,
        number: 10,
        offset: (page - 1) * 10
    }

    url.search = new URLSearchParams(queryParams).toString()

    try {
        const searchResponse = await fetch(url.toString())
        const resultsJson = await searchResponse.json()
        return resultsJson
    } catch (e) {
        console.error(e)
    }
}

export const getRecipeSummary = async (recipdeId: string) => {
    if (!API_KEY) {
        throw new Error("API key not found")
    }

    const url = new URL(`${BASEURL}/recipes/${recipdeId}/summary`)

    const params = { apiKey: API_KEY}
    url.search = new URLSearchParams(params).toString()

    const response = await fetch(url.toString())
    const json = await response.json()
    return json
}