import { FormEvent, useRef, useState } from 'react'
import './App.css'
import { searchRecipes } from './API'
import { Recipe } from './types'
import RecipeCard from './components/RecipeCard'

function App() {

  const [searchTerm, setSearchTerm] = useState("")
  const [recipes, setRecipes] = useState<any>([])
  const pageNumber = useRef(1)

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const { results } = await searchRecipes(searchTerm, 1)
      setRecipes(results)
      pageNumber.current = 1
    } catch (e) {
      console.error(e)
    }
  }

  const handleViewMoreClick = async () => {
    try {
      const nextPage = pageNumber.current + 1;
      const nextRecipes: any = await searchRecipes(searchTerm, nextPage)
      setRecipes((prevRecipes: any[]) => [...prevRecipes, ...nextRecipes.results])
      pageNumber.current = nextPage
    } catch (e) {
      console.error(e)
    }
  }


  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" required placeholder='Enter a search term' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {
        recipes.map((recipe: Recipe) =>
          <RecipeCard key={recipe?.id} recipe={recipe} />
        )
      }
      <button className="view-more" onClick={handleViewMoreClick}>View More</button>
    </div>
  )
}

export default App;
