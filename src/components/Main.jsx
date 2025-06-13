import { useState, useRef, useEffect } from "react"
import Ingredients from "./IngredientsList"
import Recipe from "./Recipe"
import { getRecipeFromMistral } from "../ai"

export default function Main(){
    // component state variable for ingredients
    const [ingredients, setIngredients] = useState(
        ["chicken", "all the main spices", "corn", "heavy cream", "pasta"]
    )

    // component state flag indicating whether or not to show recipe
    const [recipe, setRecipe] = useState('')

    const recipeSection = useRef(null)

    useEffect(() => {
        if(recipe && recipeSection.current){
            recipeSection.current.scrollIntoView({behavior: 'smooth'})
        }
    }, [recipe])

    // add ingredient form action
    function addIngredient(formData){
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    // function that interacts with AI and gets a recipe
    async function getRecipe(){
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    return (
        <main>
            <form className="add-ingredient-form" action={addIngredient}>
                <input
                    type="text"
                    placeholder="e.g. oregano" 
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 && 
                <Ingredients 
                    ref={recipeSection}
                    ingredients={ingredients} 
                    getRecipe={getRecipe} 
                />
            }
            
            {recipe && <Recipe recipe={recipe}/>}
            
        </main>
    )
}