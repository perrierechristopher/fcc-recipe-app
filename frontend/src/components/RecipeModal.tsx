import React, { useEffect, useState } from 'react'
import { RecipeSummary } from '../types';
import { getRecipeSummary } from '../API';

interface Props {
    recipeId: String;
    onClose: () => void;
}

const RecipeModal: React.FC<Props> = ({recipeId, onClose}) => {

const [recipeSummary, setRecipeSummary] = useState < RecipeSummary | null >

useEffect(()=>{
    const fetchRecipeSummary = async () => {
        try {
            const summary = await getRecipeSummary(recipeId as string)
            setRecipeSummary(summary)
        } catch (error) {
            console.log(error)
        }
    }

    fetchRecipeSummary()

}, [recipeId])

  return (
    <div className='overlay'>
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{recipeSummary?.titile}</h2>
                    <span className="close-button" onClick={onClose}>
                        &times;
                    </span>
                </div>
                <p dangerouslySetInnerHTML={{__html: recipeSummary?.summary}}></p>
            </div>
        </div>
        
    </div>
  )
}

export default RecipeModal